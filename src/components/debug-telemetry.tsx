"use client";

import { useEffect, useRef } from "react";

/**
 * Sends captured console logs to /api/telemetry on the server.
 * Helps debug voice orb issues in real browsers we can't access.
 */
export function DebugTelemetry() {
  const captured = useRef<Array<{ type: string; msg: string }>>([]);

  useEffect(() => {
    const sendLogs = () => {
      const logs = captured.current.splice(0, captured.current.length);
      if (logs.length === 0) return;
      fetch("/api/telemetry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          logs,
          userAgent: navigator.userAgent,
          url: location.href,
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => {});
    };

    const orig = {
      log: console.log,
      error: console.error,
      warn: console.warn,
      info: console.info,
    };

    const makeLogger =
      (type: string, fn: (...args: unknown[]) => void) =>
      (...args: unknown[]) => {
        captured.current.push({ type, msg: args.map(String).join(" ") });
        if (captured.current.length > 200) captured.current.shift();
        fn.apply(console, args);
      };

    console.log = makeLogger("log", orig.log);
    console.error = makeLogger("error", orig.error);
    console.warn = makeLogger("warn", orig.warn);
    console.info = makeLogger("info", orig.info);

    const interval = setInterval(sendLogs, 2000);
    window.addEventListener("beforeunload", sendLogs);

    return () => {
      clearInterval(interval);
      window.removeEventListener("beforeunload", sendLogs);
      console.log = orig.log;
      console.error = orig.error;
      console.warn = orig.warn;
      console.info = orig.info;
    };
  }, []);

  return null;
}
