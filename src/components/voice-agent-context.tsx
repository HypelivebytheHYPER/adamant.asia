"use client";

import type { ConnectionType } from "@elevenlabs/client";
import { createContext, useContext } from "react";

export interface VoiceAgentState {
  status: "idle" | "connecting" | "connected" | "disconnected" | "error";
  isSpeaking: boolean;
  isListening: boolean;
  isMuted: boolean;
  getOutputByteFrequencyData: () => Uint8Array;
  startSession: (opts: { agentId: string; connectionType?: ConnectionType }) => void;
  endSession: () => void;
  setMuted: (muted: boolean) => void;
}

const VoiceAgentContext = createContext<VoiceAgentState | null>(null);

export function VoiceAgentContextProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: VoiceAgentState;
}) {
  return (
    <VoiceAgentContext.Provider value={value}>
      {children}
    </VoiceAgentContext.Provider>
  );
}

export function useVoiceAgent() {
  const ctx = useContext(VoiceAgentContext);
  if (!ctx) {
    throw new Error("useVoiceAgent must be used inside VoiceAgentContextProvider");
  }
  return ctx;
}
