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
    <header className="fixed left-0 right-0 top-0 z-50 px-4 py-2 md:px-12 md:py-3">
      <div
        className={`rounded-full border border-border/70 backdrop-blur-md transition-all duration-500 ${
          scrolled
            ? "bg-background/95 shadow-[var(--shadow-float)]"
            : "bg-background/88"
        }`}
      >
        <div className="grid grid-cols-[1fr_auto_1fr] items-center px-4 py-1 md:px-6 md:py-1.5">
          <Link href="/" className="flex items-center gap-2.5 justify-self-start">
            {logoSrc ? (
              <Image
                src={logoSrc}
                alt="Calmnous logo"
                width={176}
                height={40}
                className="h-8 w-auto rounded"
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
          <div className="flex items-center gap-3 justify-self-end">
            <div className="hidden items-center rounded-full border border-border/60 p-0.5 md:flex">
              <button
                onClick={() => setLanguage("en")}
                className={`rounded-full px-2.5 py-0.5 text-xs uppercase tracking-widest transition-all ${
                  language === "en"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("gr")}
                className={`rounded-full px-2.5 py-0.5 text-xs uppercase tracking-widest transition-all ${
                  language === "gr"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                EL
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
