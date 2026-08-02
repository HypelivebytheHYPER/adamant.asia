#!/usr/bin/env node
/**
 * gsc-reauth.mjs — Interactive OAuth re-authorization for Google Search Console.
 *
 * Generates an auth URL, starts a temporary localhost redirect server, waits for
 * the browser callback, exchanges the code for tokens, and prints the refresh
 * token so it can be saved to .env.local as GSC_REFRESH_TOKEN.
 *
 * Usage:
 *   node --env-file=.env.local scripts/gsc-reauth.mjs
 *
 * If the browser doesn't open automatically, copy the printed URL into your
 * browser, authorize the app, and the redirect will complete locally.
 */

import http from "http";
import url from "url";
import { google } from "googleapis";

const PORT = Number(process.env.GSC_REAUTH_PORT || 8085);
const REDIRECT_URI = `http://127.0.0.1:${PORT}/oauth2callback`;
const SCOPE = "https://www.googleapis.com/auth/webmasters";

function buildAuth() {
  const { GSC_CLIENT_ID, GSC_CLIENT_SECRET } = process.env;
  if (!GSC_CLIENT_ID || !GSC_CLIENT_SECRET) {
    console.error("✗ Missing GSC_CLIENT_ID or GSC_CLIENT_SECRET in environment");
    process.exit(1);
  }
  return new google.auth.OAuth2(GSC_CLIENT_ID, GSC_CLIENT_SECRET, REDIRECT_URI);
}

function openBrowser(url) {
  const cmd = process.platform === "darwin" ? "open" : process.platform === "win32" ? "start" : "xdg-open";
  import("child_process").then(({ spawn }) => {
    spawn(cmd, [url], { detached: true, stdio: "ignore" }).unref();
  });
}

async function main() {
  const oauth2 = buildAuth();

  const authUrl = oauth2.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: SCOPE,
  });

  console.log("\n  GSC OAuth Re-authorization");
  console.log("  ==========================\n");
  console.log(`  Redirect URI: ${REDIRECT_URI}`);
  console.log("\n  Open this URL in your browser and authorize the app:\n");
  console.log(`  ${authUrl}\n`);

  // Try to open browser automatically
  openBrowser(authUrl);

  const code = await new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const parsed = url.parse(req.url, true);
      if (parsed.pathname !== "/oauth2callback") {
        res.writeHead(404);
        res.end("Not found");
        return;
      }

      const { code, error } = parsed.query;
      res.writeHead(200, { "Content-Type": "text/html" });

      if (error) {
        res.end(`<h1>Authorization failed</h1><p>${error}</p>`);
        server.close();
        reject(new Error(String(error)));
        return;
      }

      if (!code) {
        res.end("<h1>No authorization code received</h1>");
        server.close();
        reject(new Error("No code in callback"));
        return;
      }

      res.end("<h1>Authorization successful</h1><p>You can close this tab.</p>");
      server.close();
      resolve(String(code));
    });

    server.listen(PORT, "127.0.0.1", () => {
      console.log(`  Waiting for redirect on ${REDIRECT_URI} ...`);
    });

    server.on("error", reject);

    // Safety timeout
    setTimeout(() => {
      server.close();
      reject(new Error("Timeout: no callback received within 5 minutes"));
    }, 5 * 60 * 1000);
  });

  console.log("\n  Exchanging code for tokens...");
  const { tokens } = await oauth2.getToken(code);

  console.log("\n  ✅ Tokens received:\n");
  console.log(`  Access token:  ${tokens.access_token ? tokens.access_token.slice(0, 12) + "..." : "none"}`);
  console.log(`  Refresh token: ${tokens.refresh_token || "NOT RETURNED — you may already have a valid grant"}`);
  console.log(`  Expiry:        ${tokens.expiry_date ? new Date(tokens.expiry_date).toISOString() : "N/A"}`);

  if (tokens.refresh_token) {
    console.log("\n  Update .env.local with:\n");
    console.log(`  GSC_REFRESH_TOKEN=${tokens.refresh_token}\n`);
  } else {
    console.log("\n  No refresh token in response. Try revoking the existing grant at");
    console.log("  https://myaccount.google.com/permissions and run again.\n");
  }
}

main().catch((e) => {
  console.error("\n  Re-auth failed:", e.message, "\n");
  process.exit(1);
});
