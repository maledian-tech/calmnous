"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { useLanguage } from "@/components/LanguageProvider";
import { Button } from "@/components/ui/button";

const links = [
  { label: "Philosophy", href: "/philosophy" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/journal" },
] as const;

const LANGUAGES = [
  { code: "en", label: "EN", name: "English" },
  { code: "gr", label: "EL", name: "Ελληνικά" },
] as const;

type Props = {
  logoSrc: string | null;
  bookingHref: string | null;
};

function LanguageDropdown() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const active = LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Change language"
        className="flex items-center gap-1.5 rounded-full border border-border/60 px-3 py-1 text-xs uppercase tracking-widest text-foreground transition-colors hover:border-primary/40 hover:text-primary"
      >
        {active.label}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`size-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open ? (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-50 mt-2 min-w-[8rem] overflow-hidden rounded-2xl border border-border/70 bg-background/95 p-1 shadow-[var(--shadow-float)] backdrop-blur-md"
        >
          {LANGUAGES.map((l) => (
            <li key={l.code} role="option" aria-selected={l.code === language}>
              <button
                type="button"
                onClick={() => {
                  setLanguage(l.code);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                  l.code === language
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                <span className="font-medium">{l.name}</span>
                <span className="text-xs uppercase tracking-widest opacity-70">
                  {l.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export function LovableSiteHeader({ logoSrc, bookingHref }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const ctaHref = bookingHref ?? "/book";

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 py-2 md:px-12 md:py-3">
      <div
        className={`relative rounded-full border border-border/70 backdrop-blur-md transition-all duration-500 ${
          scrolled
            ? "bg-background/95 shadow-[var(--shadow-float)]"
            : "bg-background/88"
        }`}
      >
        {/* Soft gold wash behind the logo side so the wordmark stands out. */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-2/5 rounded-l-full bg-gradient-to-r from-accent/25 via-accent/10 to-transparent"
          aria-hidden
        />
        <div className="relative grid grid-cols-[1fr_auto_1fr] items-center px-4 py-1 md:px-6 md:py-1.5">
          <Link
            href="/"
            className="group flex items-center justify-self-start"
          >
            {logoSrc ? (
              <Image
                src={logoSrc}
                alt="Calmnous logo"
                width={176}
                height={44}
                className="mr-2.5 h-9 w-auto rounded-md ring-1 ring-primary/10"
                priority
              />
            ) : null}
            <span className="font-serif text-[1.7rem] font-extrabold leading-none tracking-tight text-primary">
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
          <div className="flex items-center gap-3 justify-self-end">
            <LanguageDropdown />
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
