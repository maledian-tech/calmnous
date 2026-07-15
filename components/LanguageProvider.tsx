"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Language = "en" | "gr";

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: "en",
  setLanguage: () => {},
});

export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const stored = localStorage.getItem("calmnous-lang");
    if (stored === "en" || stored === "gr") {
      setLanguageState(stored);
    }
  }, []);

  // Keep the document language in sync so Greek all-caps drops accents
  // (per Greek casing rules) and screen readers use the right voice.
  useEffect(() => {
    document.documentElement.lang = language === "gr" ? "el" : "en";
  }, [language]);

  function setLanguage(lang: Language) {
    setLanguageState(lang);
    localStorage.setItem("calmnous-lang", lang);
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
