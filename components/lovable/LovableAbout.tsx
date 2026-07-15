"use client";

import Image from "next/image";
import Link from "next/link";

import { useLanguage } from "@/components/LanguageProvider";
import { FadeUp } from "@/components/Motion";
import { WaveDecoration } from "@/components/lovable/WaveDecoration";

type Props = {
  photoSrc?: string | null;
  readMoreHref?: string;
};

const copy = {
  en: {
    photoAlt: "Sotirios Batsos — integrative psychotherapist",
    caption: "Sotirios Batsos",
    captionRole: "MSc, Integrative Psychotherapist",
    eyebrow: "About",
    heading: "Meet Sotirios Batsos",
    p1: "I'm Sotirios Batsos, an integrative counsellor and psychotherapist with over ten years' experience supporting people across a range of mental health settings. I work with adults, offering a thoughtful and collaborative space to explore life's challenges, relationships and personal growth.",
    p2: "My approach is warm, collaborative and tailored to you. Rather than following a single therapeutic model, I draw from a range of evidence-informed approaches to support the work we do together.",
    stats: [
      { k: "10+", v: "Years supporting people in mental health" },
      { k: "MSc", v: "Counselling" },
      { k: "BSc (Hons)", v: "Psychology" },
    ],
    readMore: "Read more",
  },
  gr: {
    photoAlt: "Σωτήριος Μπάτσος — ολιστικός ψυχοθεραπευτής",
    caption: "Σωτήριος Μπάτσος",
    captionRole: "MSc, Ολιστικός Ψυχοθεραπευτής",
    eyebrow: "Γνωριμία",
    heading: "Γνώρισε τον Σωτήριο Μπάτσο",
    p1: "Είμαι ο Σωτήριος Μπάτσος, ολιστικός σύμβουλος και ψυχοθεραπευτής με πάνω από δέκα χρόνια εμπειρίας στη στήριξη ανθρώπων σε ένα ευρύ φάσμα πλαισίων ψυχικής υγείας. Εργάζομαι με ενήλικες, προσφέροντας έναν στοχαστικό και συνεργατικό χώρο για να εξερευνήσουμε τις προκλήσεις της ζωής, τις σχέσεις και την προσωπική ανάπτυξη.",
    p2: "Η προσέγγισή μου είναι ζεστή, συνεργατική και προσαρμοσμένη σε σένα. Αντί να ακολουθώ ένα μόνο θεραπευτικό μοντέλο, αντλώ από ένα φάσμα τεκμηριωμένων προσεγγίσεων για να στηρίξω τη δουλειά που κάνουμε μαζί.",
    stats: [
      { k: "10+", v: "Χρόνια στήριξης στην ψυχική υγεία" },
      { k: "MSc", v: "Συμβουλευτική" },
      { k: "BSc (Hons)", v: "Ψυχολογία" },
    ],
    readMore: "Περισσότερα",
  },
} as const;

export function LovableAbout({ photoSrc, readMoreHref }: Props) {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <section id="about" className="px-6 py-40 md:px-16">
      <div className="grid items-center gap-12 md:grid-cols-12">
        <FadeUp className="md:col-span-4">
          <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-secondary shadow-[var(--shadow-soft)]">
            {photoSrc ? (
              <Image
                src={photoSrc}
                alt={t.photoAlt}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 35vw"
                priority
              />
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary to-secondary/60" />
                <WaveDecoration className="absolute bottom-0 left-0 right-0 h-32 opacity-80" />
                <WaveDecoration className="absolute bottom-8 left-0 right-0 h-24 opacity-50" />
              </>
            )}
            <div className="absolute bottom-6 left-6 right-6 text-primary">
              <p className="font-serif text-2xl drop-shadow-sm">{t.caption}</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-primary/70 drop-shadow-sm">
                {t.captionRole}
              </p>
            </div>
          </div>
        </FadeUp>
        <div className="md:col-span-7 md:col-start-6">
          <FadeUp delay={0.1}>
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-8 bg-accent" />
              <span className="text-muted-foreground text-xs uppercase tracking-[0.25em]">
                {t.eyebrow}
              </span>
            </div>
            <h2 className="mb-8 font-serif text-4xl leading-tight text-primary md:text-5xl">
              {t.heading}
            </h2>
          </FadeUp>
          <FadeUp delay={0.2} className="space-y-5 font-light leading-relaxed text-foreground/80">
            <p>{t.p1}</p>
            <p>{t.p2}</p>
          </FadeUp>
          <FadeUp delay={0.3} className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8">
            {t.stats.map((s) => (
              <div key={s.v}>
                <div className="font-serif text-3xl text-primary">{s.k}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                  {s.v}
                </div>
              </div>
            ))}
          </FadeUp>
          {readMoreHref && (
            <FadeUp delay={0.4} className="mt-10">
              <Link
                href={readMoreHref}
                className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-primary"
              >
                {t.readMore}
                <span className="h-px w-6 bg-accent transition-all duration-300 group-hover:w-10" />
              </Link>
            </FadeUp>
          )}
        </div>
      </div>
    </section>
  );
}
