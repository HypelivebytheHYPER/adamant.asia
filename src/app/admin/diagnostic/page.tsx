"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface LogEntry {
  t: string;
  lvl: "info" | "warn" | "error";
  src: string;
  msg: string;
  meta?: Record<string, unknown>;
}

interface HealthResponse {
  ok: boolean;
  status: string;
  timestamp: string;
  diagnostics: {
    telegram: {
      botTokenSet: boolean;
      chatIdSet: boolean;
      botOk: boolean;
      botName: string | null;
      error: string | null;
    };
    webhook: {
      secretSet: boolean;
      secretLength: number;
    };
  };
}

const LOG_COLORS: Record<string, string> = {
  info: "text-emerald-600",
  warn: "text-amber-600",
  error: "text-red-600",
};

const LOG_BG: Record<string, string> = {
  info: "bg-emerald-50",
  warn: "bg-amber-50",
  error: "bg-red-50",
};

export default function DiagnosticPage() {
  const [secret, setSecret] = useState<string>(() => {
    if (typeof sessionStorage === "undefined") return "";
    return sessionStorage.getItem("adamant-admin-secret") ?? "";
  });
  const [authenticated, setAuthenticated] = useState(() => {
    if (typeof sessionStorage === "undefined") return false;
    return Boolean(sessionStorage.getItem("adamant-admin-secret"));
  });
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);
  const esRef = useRef<EventSource | null>(null);
  const logsEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = useCallback(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Fetch health once on mount
  useEffect(() => {
    fetch("/api/health", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setHealth(d))
      .catch(() => {});
  }, []);

  // SSE connection
  const connectSSE = useCallback((authSecret: string) => {
    if (esRef.current) {
      esRef.current.close();
      esRef.current = null;
    }

    const url = `/api/admin/logs-sse?secret=${encodeURIComponent(authSecret)}`;
    const es = new EventSource(url);
    esRef.current = es;

    es.onopen = () => setConnected(true);

    es.onmessage = (e) => {
      try {
        const entry: LogEntry = JSON.parse(e.data);
        setLogs((prev) => {
          const next = [...prev, entry];
          if (next.length > 200) next.shift();
          return next;
        });
      } catch {
        // ignore ping/parse errors
      }
    };

    es.onerror = () => {
      setConnected(false);
      // EventSource auto-reconnects unless we explicitly close it
    };

    return () => {
      es.close();
      esRef.current = null;
      setConnected(false);
    };
  }, []);

  useEffect(() => {
    if (authenticated && secret) {
      const cleanup = connectSSE(secret);
      return cleanup;
    }
    return () => {
      if (esRef.current) {
        esRef.current.close();
        esRef.current = null;
      }
    };
  }, [authenticated, secret, connectSSE]);

  // Auto-scroll on new logs
  useEffect(() => {
    scrollToBottom();
  }, [logs, scrollToBottom]);

  const handleAuth = () => {
    if (secret.length < 10) {
      setError("Secret too short");
      return;
    }
    sessionStorage.setItem("adamant-admin-secret", secret);
    setAuthenticated(true);
    setError(null);
  };

  const handleTestTelegram = async () => {
    setTestResult("Sending...");
    try {
      const res = await fetch("/api/admin/ping-telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": secret,
        },
      });
      const data = await res.json();
      setTestResult(data.ok ? "✅ Sent" : `❌ ${data.error}`);
    } catch (e) {
      setTestResult(`❌ ${e instanceof Error ? e.message : String(e)}`);
    }
  };

  const handleClearLogs = async () => {
    try {
      await fetch("/api/admin/logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": secret,
        },
        body: JSON.stringify({ action: "clear" }),
      });
      setLogs([]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Clear failed");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adamant-admin-secret");
    if (esRef.current) {
      esRef.current.close();
      esRef.current = null;
    }
    setSecret("");
    setAuthenticated(false);
    setLogs([]);
    setConnected(false);
  };

  // Health refetch on demand
  const refreshHealth = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/health", { cache: "no-store" });
      const data = await res.json();
      if (data.ok) setHealth(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Health fetch failed");
    } finally {
      setLoading(false);
    }
  }, []);

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
        <div className="w-full max-w-sm space-y-6">
          <h1 className="text-2xl font-medium tracking-tight">Adamant Diagnostics</h1>
          <div className="space-y-3">
            <label className="block text-sm text-stone">Admin Secret</label>
            <input
              type="password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAuth()}
              placeholder="Paste your webhook secret"
              className="w-full px-4 py-3 rounded-lg border border-border bg-surface text-foreground placeholder:text-stone/50 focus:outline-none focus:border-foreground/30"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              onClick={handleAuth}
              className="w-full px-4 py-3 rounded-lg bg-foreground text-inverse font-medium hover:bg-foreground/90 transition-colors"
            >
              Enter
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-medium tracking-tight">Adamant Diagnostics</h1>
            <span
              className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs border ${
                connected
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                  : "bg-amber-50 border-amber-200 text-amber-700"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${connected ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
              {connected ? "Live" : "Reconnecting…"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={refreshHealth}
              className="px-3 py-1.5 rounded-md border border-border text-sm hover:bg-surface transition-colors"
            >
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-md border border-border text-sm text-stone hover:bg-surface transition-colors"
            >
              Log out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Health Cards */}
        {health && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <HealthCard
              title="Telegram Bot"
              status={health.diagnostics.telegram.botOk ? "ok" : "error"}
              detail={health.diagnostics.telegram.botOk ? `@${health.diagnostics.telegram.botName}` : health.diagnostics.telegram.error ?? "Unknown"}
            />
            <HealthCard
              title="Telegram Chat"
              status={health.diagnostics.telegram.chatIdSet ? "ok" : "error"}
              detail={health.diagnostics.telegram.chatIdSet ? "Configured" : "Missing"}
            />
            <HealthCard
              title="Webhook Secret"
              status={health.diagnostics.webhook.secretSet ? "ok" : "error"}
              detail={health.diagnostics.webhook.secretSet ? `${health.diagnostics.webhook.secretLength} chars` : "Missing"}
            />
            <HealthCard
              title="System"
              status={health.ok ? "ok" : "error"}
              detail={new Date(health.timestamp).toLocaleTimeString()}
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleTestTelegram}
            className="px-4 py-2 rounded-lg bg-foreground text-inverse text-sm font-medium hover:bg-foreground/90 transition-colors"
          >
            🔔 Test Telegram
          </button>
          <button
            onClick={handleClearLogs}
            className="px-4 py-2 rounded-lg border border-border text-sm hover:bg-surface transition-colors"
          >
            🗑 Clear Logs
          </button>
          {testResult && (
            <span className="text-sm text-stone">{testResult}</span>
          )}
          {loading && <span className="text-sm text-stone animate-pulse">Loading…</span>}
        </div>

        {error && (
          <div className="px-4 py-3 rounded-lg bg-red-50 text-red-700 text-sm">{error}</div>
        )}

        {/* Logs Table */}
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-border bg-surface/50 flex items-center justify-between">
            <h2 className="text-sm font-medium">Runtime Logs ({logs.length})</h2>
            <div className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${connected ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
              <span className="text-xs text-stone">{connected ? "SSE connected" : "Reconnecting…"}</span>
            </div>
          </div>
          {logs.length === 0 ? (
            <div className="px-4 py-12 text-center text-sm text-stone">
              No logs yet. Make a voice call or trigger an event.
            </div>
          ) : (
            <div className="overflow-auto max-h-[60vh]">
              <table className="w-full text-sm">
                <thead className="bg-surface/30 sticky top-0">
                  <tr className="text-left text-xs text-stone uppercase tracking-wider">
                    <th className="px-4 py-2 font-medium">Time</th>
                    <th className="px-4 py-2 font-medium w-16">Level</th>
                    <th className="px-4 py-2 font-medium">Source</th>
                    <th className="px-4 py-2 font-medium">Message</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {logs.map((log, i) => (
                    <tr key={i} className={`${LOG_BG[log.lvl] ?? ""} hover:bg-surface/30 transition-colors`}>
                      <td className="px-4 py-2 text-xs text-stone font-mono whitespace-nowrap">
                        {log.t.slice(11, 19)}
                      </td>
                      <td className="px-4 py-2">
                        <span className={`text-xs font-medium uppercase ${LOG_COLORS[log.lvl] ?? ""}`}>
                          {log.lvl}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-xs text-stone whitespace-nowrap">{log.src}</td>
                      <td className="px-4 py-2">
                        <p className="text-foreground">{log.msg}</p>
                        {log.meta && Object.keys(log.meta).length > 0 && (
                          <pre className="mt-1 text-xs text-stone font-mono bg-surface/50 rounded px-2 py-1 overflow-auto max-w-lg">
                            {JSON.stringify(log.meta, null, 2)}
                          </pre>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div ref={logsEndRef} />
            </div>
          )}
        </div>

        {/* Footer hint */}
        <p className="text-xs text-stone text-center">
          Logs are in-memory and ephemeral on Vercel serverless. SSE pushes events in real-time from the active instance.
        </p>
      </div>
    </main>
  );
}

function HealthCard({
  title,
  status,
  detail,
}: {
  title: string;
  status: "ok" | "error" | "warn";
  detail: string;
}) {
  const dot =
    status === "ok"
      ? "bg-emerald-500"
      : status === "warn"
        ? "bg-amber-500"
        : "bg-red-500";

  return (
    <div className="border border-border rounded-lg px-4 py-3 bg-surface/30">
      <div className="flex items-center gap-2 mb-1">
        <span className={`w-2 h-2 rounded-full ${dot}`} />
        <span className="text-xs text-stone uppercase tracking-wider">{title}</span>
      </div>
      <p className="text-sm font-medium truncate">{detail}</p>
    </div>
  );
}
