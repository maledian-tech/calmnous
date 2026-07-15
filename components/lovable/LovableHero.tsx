"use client";

import Link from "next/link";

import { useLanguage } from "@/components/LanguageProvider";
import { FadeIn } from "@/components/Motion";
import { HeroWavesCanvas } from "@/components/lovable/HeroWavesCanvas";
import { Button } from "@/components/ui/button";

type Props = {
  bookingHref: string | null;
};

const copy = {
  en: {
    eyebrow: "Integrative Counselling & Psychotherapy",
    heading: "Therapy that meets you beneath the surface.",
    body: "Whether you are facing a challenge or seeking a deeper understanding of yourself, Calmnous offers a calm space to reflect and move forward with greater clarity. Therapy is offered by integrative counsellor and psychotherapist Sotirios Batsos.",
    book: "Book a consultation",
    help: "How I can help",
  },
  gr: {
    eyebrow: "Ολιστική Συμβουλευτική & Ψυχοθεραπεία",
    heading: "Ψυχοθεραπεία που σε συναντά κάτω από την επιφάνεια.",
    body: "Είτε αντιμετωπίζεις μια δυσκολία είτε αναζητάς μια βαθύτερη κατανόηση του εαυτού σου, το Calmnous προσφέρει έναν ήρεμο χώρο για να στοχαστείς και να προχωρήσεις με μεγαλύτερη διαύγεια. Η θεραπεία προσφέρεται από τον ολιστικό σύμβουλο και ψυχοθεραπευτή Σωτήριο Μπάτσο.",
    book: "Κλείσε ραντεβού",
    help: "Πώς μπορώ να βοηθήσω",
  },
} as const;

function BookConsultationButton({
  bookingHref,
  label,
  className,
}: {
  bookingHref: string | null;
  label: string;
  className?: string;
}) {
  return (
    <Button size="lg" asChild className={className}>
      <Link href={bookingHref ?? "/book"}>{label}</Link>
    </Button>
  );
}

export function LovableHero({ bookingHref }: Props) {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-primary">
      {/* Deep-water gradient: darker at the top, easing toward the surface. */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(215_52%_14%)] via-primary to-[hsl(215_46%_27%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,hsl(215_46%_30%/0.55),transparent_60%)]" />

      <HeroWavesCanvas />

      {/* Legibility wash behind the copy, fading out to the right. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[hsl(215_52%_14%/0.72)] via-[hsl(215_52%_14%/0.28)] to-transparent" />

      <div className="pointer-events-none relative z-10 flex min-h-screen items-end px-6 pb-24 md:px-16 md:pb-32">
        <div className="max-w-2xl text-primary-foreground">
          <FadeIn delay={0.1} className="mb-8 flex items-center gap-3">
            <div className="h-px w-10 bg-accent" />
            <span className="text-xs uppercase tracking-[0.25em] text-accent">
              {t.eyebrow}
            </span>
          </FadeIn>
          <FadeIn delay={0.3}>
            <h1 className="mb-8 font-serif text-5xl leading-[1.05] text-balance md:text-7xl">
              {t.heading}
            </h1>
          </FadeIn>
          <FadeIn delay={0.5}>
            <p className="mb-10 max-w-xl text-lg font-light leading-relaxed text-primary-foreground/85 md:text-xl">
              {t.body}
            </p>
          </FadeIn>
          <FadeIn
            delay={0.65}
            className="pointer-events-auto flex flex-wrap items-center gap-4"
          >
            <BookConsultationButton
              bookingHref={bookingHref}
              label={t.book}
              className="rounded-full bg-background px-8 text-primary hover:bg-background/90"
            />
            <Link
              href="/#services"
              className="border-b border-accent pb-1 text-sm uppercase tracking-widest text-primary-foreground transition-colors hover:text-accent"
            >
              {t.help}
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
