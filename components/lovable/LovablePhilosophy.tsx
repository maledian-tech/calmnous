"use client";

import Link from "next/link";

import { useLanguage } from "@/components/LanguageProvider";
import { FadeUp } from "@/components/Motion";
import { WaveDecoration } from "@/components/lovable/WaveDecoration";

type Props = {
  readMoreHref?: string;
};

const copy = {
  en: {
    eyebrow: "The philosophy",
    heading: "Change begins with awareness.",
    p1: "Therapy is a space to slow down and explore your inner world with honesty and curiosity. Together, we make sense of your experiences, recognise patterns, and create the conditions for meaningful change.",
    p2: "Every person is different, so therapy should never follow a single formula. I draw from different therapeutic approaches and tailor the work to you. Whatever brings you here, you will be met with warmth, compassion and honest reflection.",
    readMore: "Read more",
  },
  gr: {
    eyebrow: "Η φιλοσοφία",
    heading: "Η αλλαγή ξεκινά με την επίγνωση.",
    p1: "Η θεραπεία είναι ένας χώρος όπου επιβραδύνεις και εξερευνάς τον εσωτερικό σου κόσμο με ειλικρίνεια και περιέργεια. Μαζί, δίνουμε νόημα στις εμπειρίες σου, αναγνωρίζουμε μοτίβα και δημιουργούμε τις προϋποθέσεις για ουσιαστική αλλαγή.",
    p2: "Κάθε άνθρωπος είναι διαφορετικός, γι' αυτό και η θεραπεία δεν πρέπει ποτέ να ακολουθεί μια ενιαία συνταγή. Αντλώ από διαφορετικές θεραπευτικές προσεγγίσεις και προσαρμόζω τη δουλειά στις δικές σου ανάγκες. Ό,τι κι αν σε φέρνει εδώ, θα σε συναντήσω με ζεστασιά, συμπόνια και ειλικρινή στοχασμό.",
    readMore: "Περισσότερα",
  },
} as const;

export function LovablePhilosophy({ readMoreHref }: Props) {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <section id="philosophy" className="relative overflow-hidden px-6 py-40 md:px-16">
      <WaveDecoration className="absolute bottom-0 left-0 right-0 h-28" />
      <div className="relative grid items-start gap-12 md:grid-cols-12">
        <FadeUp className="md:col-span-4">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-8 bg-accent" />
            <span className="text-muted-foreground text-xs uppercase tracking-[0.25em]">
              {t.eyebrow}
            </span>
          </div>
          <h2 className="font-serif text-4xl leading-tight text-primary md:text-5xl">
            {t.heading}
          </h2>
        </FadeUp>
        <div className="space-y-6 text-lg font-light leading-relaxed text-foreground/80 md:col-span-7 md:col-start-6">
          <FadeUp delay={0.1}>
            <p>{t.p1}</p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p>{t.p2}</p>
          </FadeUp>
          {readMoreHref && (
            <FadeUp delay={0.4}>
              <Link
                href={readMoreHref}
                className="group inline-flex items-center gap-3 pt-2 text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-primary"
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
