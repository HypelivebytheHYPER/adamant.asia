#!/usr/bin/env python3
"""Audit Adamant homepage for console errors, network failures, and layout issues."""

import sys
from playwright.sync_api import sync_playwright

URL = "http://localhost:3456"
SCREENSHOT = "/tmp/adamant-homepage.png"

console_errors = []
network_failures = []


def handle_console(msg):
    text = msg.text
    msg_type = msg.type
    entry = f"[{msg_type}] {text}"
    print(entry)
    if msg_type in ("error", "warning"):
        console_errors.append(entry)


def handle_request_finished(request):
    response = request.response()
    if response is None:
        network_failures.append(f"{request.method} {request.url} -> no response")
        return
    status = response.status
    if status >= 400:
        network_failures.append(f"{request.method} {request.url} -> {status}")


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        page.on("console", handle_console)
        page.on("requestfinished", handle_request_finished)

        print(f"Navigating to {URL}...")
        page.goto(URL)
        page.wait_for_load_state("networkidle")
        # Scroll through the page to trigger any whileInView / intersection animations.
        for pct in [0, 25, 50, 75, 100]:
            page.evaluate(f"window.scrollTo(0, document.body.scrollHeight * {pct / 100})")
            page.wait_for_timeout(400)
        page.wait_for_timeout(1500)

        print(f"Taking screenshot -> {SCREENSHOT}")
        page.screenshot(path=SCREENSHOT, full_page=True)

        # Basic layout checks
        issues = []

        # Check hero headline exists and is visible
        hero = page.locator("h1").first
        if not hero.is_visible():
            issues.append("Hero h1 is not visible")
        else:
            box = hero.bounding_box()
            print(f"Hero h1 size: {box}")
            if box and (box["width"] == 0 or box["height"] == 0):
                issues.append("Hero h1 has zero size")

        # Wait for images to decode (with a per-image timeout), then check raster images.
        # Skip SVGs (naturalWidth/height is often 0 without an explicit viewBox) and Next.js optimized images.
        page.evaluate("""
            () => Promise.all(
                Array.from(document.querySelectorAll('img')).map(img => {
                    if (img.complete) return Promise.resolve();
                    return Promise.race([
                        new Promise(resolve => { img.onload = img.onerror = resolve; }),
                        new Promise(resolve => setTimeout(resolve, 2000))
                    ]);
                })
            )
        """)
        broken_images = page.evaluate("""
            () => {
                const imgs = Array.from(document.querySelectorAll('img'));
                return imgs
                    .filter(img => {
                        if (img.offsetParent === null) return false;
                        if (!img.src || img.src.endsWith('.svg') || img.src.includes('data:image/svg')) return false;
                        if (img.src.includes('/_next/image')) return false;
                        return img.naturalWidth === 0 || img.naturalHeight === 0;
                    })
                    .map(img => ({ src: img.src, width: img.naturalWidth, height: img.naturalHeight }));
            }
        """)
        if broken_images:
            issues.append(f"Broken/empty visible raster images: {broken_images}")

        # Check sections rendered
        section_ids = ["hero", "platforms", "showcase", "problem", "solutions", "process", "model", "reviews", "faq", "contact"]
        missing_sections = [sid for sid in section_ids if not page.locator(f"#{sid}").count()]
        if missing_sections:
            issues.append(f"Missing sections: {missing_sections}")

        # Check for any elements with zero width/height that are visible (skip framework internals)
        zero_size = page.evaluate("""
            () => {
                const skipTags = new Set(['SCRIPT', 'STYLE', 'LINK', 'META', 'TITLE', 'NEXTJS-PORTAL', 'NEXT-ROUTE-ANNOUNCER']);
                const all = Array.from(document.querySelectorAll('*'));
                return all
                    .filter(el => !skipTags.has(el.tagName) && el.offsetParent !== null && el.offsetWidth === 0 && el.offsetHeight === 0)
                    .slice(0, 20)
                    .map(el => el.tagName + (el.id ? '#' + el.id : '') + (el.className ? '.' + el.className.split(' ').slice(0, 3).join('.') : ''));
            }
        """)
        if zero_size:
            issues.append(f"Visible elements with zero size: {zero_size}")

        browser.close()

    # Classify console messages: WebGL performance warnings are notes, not failures.
    webgl_warnings = [e for e in console_errors if "WebGL" in e]
    real_console_errors = [e for e in console_errors if "[error]" in e]
    real_console_warnings = [e for e in console_errors if "[warning]" in e and "WebGL" not in e]

    print("\n=== AUDIT RESULTS ===")
    print(f"Real console errors: {len(real_console_errors)}")
    for e in real_console_errors[:20]:
        print(f"  {e}")

    print(f"\nConsole warnings: {len(real_console_warnings)}")
    for e in real_console_warnings[:20]:
        print(f"  {e}")

    print(f"\nWebGL performance notes: {len(webgl_warnings)}")
    for e in webgl_warnings[:5]:
        print(f"  {e}")

    print(f"\nNetwork failures (4xx/5xx/no response): {len(network_failures)}")
    for e in network_failures[:20]:
        print(f"  {e}")

    print(f"\nLayout issues: {len(issues)}")
    for i in issues:
        print(f"  - {i}")

    if real_console_errors or network_failures or issues:
        print("\nRESULT: FAIL")
        sys.exit(1)
    print("\nRESULT: PASS (with notes)")


if __name__ == "__main__":
    main()
