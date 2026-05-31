"use client";

import { ConversationProvider } from "@elevenlabs/react";

/**
 * Wraps the app with ElevenLabs ConversationProvider.
 * Required for useConversation() hook anywhere in the tree.
 */
export function VoiceAgentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ConversationProvider>{children}</ConversationProvider>;
}
