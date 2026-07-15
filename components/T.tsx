"use client";

import { useLanguage } from "@/components/LanguageProvider";

/**
 * Inline bilingual text island. Lets server-rendered markup carry both
 * languages and switch live with the header toggle, without turning the whole
 * page into a client component. For interactive/client components that already
 * call useLanguage, branch on `language` directly instead.
 */
export function T({ en, gr }: { en: string; gr: string }) {
  const { language } = useLanguage();
  return <>{language === "gr" ? gr : en}</>;
}
