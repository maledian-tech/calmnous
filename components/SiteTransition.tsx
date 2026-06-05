"use client";

import { motion } from "framer-motion";

export function SiteTransition({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-col bg-background text-foreground">
      {children}
    </div>
  );
}
