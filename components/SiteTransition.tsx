"use client";

import { motion } from "framer-motion";

export function SiteTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex min-h-full flex-col bg-background text-foreground"
    >
      {children}
    </motion.div>
  );
}
