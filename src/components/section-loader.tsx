"use client";

import dynamic from "next/dynamic";

const Process = dynamic(() => import("@/components/sections/process").then((m) => m.Process), {
  loading: () => <div className="min-h-[80vh] bg-background" />,
});

const Progress = dynamic(() => import("@/components/sections/progress").then((m) => m.Progress), {
  loading: () => <div className="min-h-[60vh] bg-foreground" />,
});

const Proof = dynamic(() => import("@/components/sections/proof").then((m) => m.Proof), {
  loading: () => <div className="min-h-[80vh] bg-background" />,
});

const Contact = dynamic(() => import("@/components/sections/contact").then((m) => m.Contact), {
  loading: () => <div className="min-h-[60vh] bg-foreground" />,
});

export function SectionLoader() {
  return (
    <>
      <Process />
      <Progress />
      <Proof />
      <Contact />
    </>
  );
}
