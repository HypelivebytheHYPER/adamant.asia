"use client";

import dynamic from "next/dynamic";

// Defer the ElevenLabs floating voice widget (and its SDK) off the critical path.
// It's a floating control, not above-the-fold, so loading it after hydration
// (ssr:false) cuts unused JavaScript + main-thread blocking and speeds up LCP.
const FloatingVoiceWidget = dynamic(
  () => import("./floating-voice-widget").then((m) => m.FloatingVoiceWidget),
  { ssr: false },
);

export function DeferredVoiceWidget() {
  return <FloatingVoiceWidget />;
}
