# Header Polish + Language Toggle + Crisis Support Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Slim the header, improve logo visibility, add an EN/GR language toggle wired to a shared context, and add a language-aware crisis support strip in the footer.

**Architecture:** A new `LanguageProvider` component holds `"en" | "gr"` state with localStorage persistence. The site layout wraps children with it. The header reads and sets language; the footer reads language to conditionally show the correct crisis line.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4

---

## File Map

| Action | File |
|--------|------|
| Create | `components/LanguageProvider.tsx` |
| Modify | `app/(site)/layout.tsx` |
| Modify | `components/lovable/LovableSiteHeader.tsx` |
| Modify | `components/lovable/LovableSiteFooter.tsx` |

---

### Task 1: Create LanguageProvider

**Files:**
- Create: `components/LanguageProvider.tsx`

- [ ] **Step 1: Create the file**

```tsx
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
```

- [ ] **Step 2: TypeScript check**

```
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/LanguageProvider.tsx
git commit -m "feat: add LanguageProvider context with localStorage persistence"
```

---

### Task 2: Wrap site layout with LanguageProvider

**Files:**
- Modify: `app/(site)/layout.tsx`

- [ ] **Step 1: Replace file content**

```tsx
import { LanguageProvider } from "@/components/LanguageProvider";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <div className="flex min-h-full flex-col bg-background text-foreground">
        {children}
      </div>
    </LanguageProvider>
  );
}
```

- [ ] **Step 2: TypeScript check**

```
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add "app/(site)/layout.tsx"
git commit -m "feat: wrap site layout with LanguageProvider"
```

---

### Task 3: Update LovableSiteHeader — slim + logo + toggle

**Files:**
- Modify: `components/lovable/LovableSiteHeader.tsx`

- [ ] **Step 1: Replace file content**

```tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useLanguage } from "@/components/LanguageProvider";
import { Button } from "@/components/ui/button";

const links = [
  { label: "Philosophy", href: "/philosophy" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/journal" },
] as const;

type Props = {
  logoSrc: string | null;
  bookingHref: string | null;
};

export function LovableSiteHeader({ logoSrc, bookingHref }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const ctaHref = bookingHref ?? "/book";

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-6 py-3 md:px-16 md:py-4">
      <div
        className={`rounded-full border border-border/70 backdrop-blur-md transition-all duration-500 ${
          scrolled
            ? "bg-background/95 shadow-[var(--shadow-float)]"
            : "bg-background/88"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-1.5 md:px-10 md:py-2">
          <Link href="/" className="flex items-center gap-2.5">
            {logoSrc ? (
              <Image
                src={logoSrc}
                alt="Calmnous logo"
                width={176}
                height={40}
                className="h-9 w-auto rounded"
                priority
              />
            ) : null}
            <span className="font-serif text-2xl font-extrabold tracking-tight text-primary drop-shadow-sm">
              Calmnous
            </span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group relative text-sm font-medium text-foreground transition-colors hover:text-primary"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 md:flex">
              <button
                onClick={() => setLanguage("en")}
                className={`flex items-center gap-1 text-xs uppercase tracking-widest transition-colors ${
                  language === "en"
                    ? "border-b border-accent font-semibold text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                🇬🇧 EN
              </button>
              <span className="text-muted-foreground/40">|</span>
              <button
                onClick={() => setLanguage("gr")}
                className={`flex items-center gap-1 text-xs uppercase tracking-widest transition-colors ${
                  language === "gr"
                    ? "border-b border-accent font-semibold text-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                🇬🇷 GR
              </button>
            </div>
            <Button
              asChild
              className="rounded-full bg-primary px-5 text-xs uppercase tracking-widest text-primary-foreground hover:bg-primary/90"
            >
              {ctaHref.startsWith("http") ? (
                <a href={ctaHref} target="_blank" rel="noopener noreferrer">
                  Book a session
                </a>
              ) : (
                <Link href={ctaHref}>Book a session</Link>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: TypeScript check**

```
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/lovable/LovableSiteHeader.tsx
git commit -m "feat: slim header, improve logo, add EN/GR language toggle"
```

---

### Task 4: Update LovableSiteFooter — add crisis strip

**Files:**
- Modify: `components/lovable/LovableSiteFooter.tsx`

- [ ] **Step 1: Add "use client" directive and useLanguage import**

Add `"use client";` as the very first line of the file (before all imports).

Add this import after the existing imports:

```tsx
import { useLanguage } from "@/components/LanguageProvider";
```

- [ ] **Step 2: Add useLanguage hook call inside the component**

Inside `LovableSiteFooter`, add this as the first line of the function body (after the existing `const email = ...` lines):

```tsx
const { language } = useLanguage();
```

- [ ] **Step 3: Add crisis strip just before the copyright div**

Find the div that starts with `<div className="mt-12 flex flex-col gap-4 border-t border-border pt-8 ...">` (the copyright row). Insert this block immediately before it:

```tsx
<div className="mt-12 border-t border-border pt-8">
  {language === "en" ? (
    <p className="text-xs text-muted-foreground">
      <span className="font-medium">If you are in crisis:</span>{" "}
      Samaritans (UK) ·{" "}
      <a
        href="tel:116123"
        className="font-medium transition-colors hover:text-primary"
      >
        116 123
      </a>{" "}
      · Free, 24/7 ·{" "}
      <a
        href="https://www.samaritans.org"
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2 transition-colors hover:text-primary"
      >
        samaritans.org
      </a>
    </p>
  ) : (
    <p className="text-xs text-muted-foreground">
      <span className="font-medium">Αν βρίσκεσαι σε κρίση:</span>{" "}
      Γραμμή SOS Δίπλα Σου ·{" "}
      <a
        href="tel:1018"
        className="font-medium transition-colors hover:text-primary"
      >
        1018
      </a>{" "}
      · Δωρεάν, 24 ώρες ·{" "}
      <a
        href="https://www.psy-dds.gr"
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2 transition-colors hover:text-primary"
      >
        psy-dds.gr
      </a>
    </p>
  )}
</div>
```

- [ ] **Step 4: Remove the `mt-12` from the existing copyright div** since the crisis strip now provides the top margin + border. Change:

```tsx
<div className="mt-12 flex flex-col gap-4 border-t border-border pt-8 text-center md:flex-row md:items-center md:justify-between md:text-left">
```

To:

```tsx
<div className="mt-6 flex flex-col gap-4 text-center md:flex-row md:items-center md:justify-between md:text-left">
```

- [ ] **Step 5: TypeScript check**

```
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 6: Commit**

```bash
git add components/lovable/LovableSiteFooter.tsx
git commit -m "feat: add language-aware crisis support strip to footer"
```
