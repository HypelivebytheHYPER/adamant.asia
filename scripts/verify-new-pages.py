#!/usr/bin/env python3
"""Quick smoke test for the new Adamant pages."""

from playwright.sync_api import sync_playwright

URLS = [
    ("Home", "/"),
    ("Adamant AI", "/ai"),
    ("About", "/about"),
    ("Case Studies", "/case-studies"),
    ("Insights", "/insights"),
    ("Contact", "/contact"),
]

BASE = "http://localhost:3456"


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 900})
        failed = []

        for name, path in URLS:
            print(f"Checking {name} ({path})...")
            try:
                page.goto(BASE + path)
                page.wait_for_load_state("networkidle")
                title = page.title()
                h1 = page.locator("h1").first.inner_text(timeout=5000)
                status = page.evaluate("() => document.readyState")
                print(f"  title: {title}")
                print(f"  h1: {h1[:80]}")
                print(f"  readyState: {status}")
                page.screenshot(path=f"/tmp/adamant-{name.lower().replace(' ', '-')}.png", full_page=True)
            except Exception as e:
                print(f"  FAILED: {e}")
                failed.append((name, str(e)))

        browser.close()

    print("\n=== SUMMARY ===")
    if failed:
        print(f"Failed pages: {len(failed)}")
        for name, err in failed:
            print(f"  - {name}: {err}")
        exit(1)
    print("All pages rendered successfully.")


if __name__ == "__main__":
    main()
