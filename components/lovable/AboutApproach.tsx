"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { FadeUp } from "@/components/Motion";

const copy = {
  en: {
    eyebrow: "The path to Calmnous",
    heading:
      "The experiences, values and conversations that shaped the therapist I am today.",
    p1: "My journey into counselling has been shaped by more than a decade working across a range of mental health settings. Along the way, I came to appreciate that meaningful change rarely comes from quick answers or one-size-fits-all approaches. It grows through understanding, trust and a therapeutic relationship where people feel safe to explore their experiences honestly.",
    p2: "That belief led to Calmnous. A practice grounded in respect, compassion and integrity, where therapy is shaped around the individual rather than a fixed method, and where there is space to slow down, reflect and move towards lasting change.",
  },
  gr: {
    eyebrow: "Η πορεία προς το Calmnous",
    heading:
      "Οι εμπειρίες, οι αξίες και οι συζητήσεις που διαμόρφωσαν τον θεραπευτή που είμαι σήμερα.",
    p1: "Η πορεία μου στη συμβουλευτική διαμορφώθηκε από περισσότερο από μια δεκαετία δουλειάς σε ένα ευρύ φάσμα πλαισίων ψυχικής υγείας. Στη διαδρομή αυτή, συνειδητοποίησα ότι η ουσιαστική αλλαγή σπάνια προκύπτει από γρήγορες απαντήσεις ή τυποποιημένες προσεγγίσεις. Αναπτύσσεται μέσα από την κατανόηση, την εμπιστοσύνη και μια θεραπευτική σχέση όπου ο άνθρωπος νιώθει ασφαλής να εξερευνήσει τις εμπειρίες του με ειλικρίνεια.",
    p2: "Αυτή η πεποίθηση οδήγησε στη δημιουργία του Calmnous. Ενός χώρου θεμελιωμένου στον σεβασμό, τη συμπόνια και την ακεραιότητα, όπου η θεραπεία διαμορφώνεται γύρω από τον άνθρωπο και όχι γύρω από μια σταθερή μέθοδο, και όπου υπάρχει χώρος να επιβραδύνεις, να στοχαστείς και να προχωρήσεις προς μια διαρκή αλλαγή.",
  },
} as const;

export function AboutApproach() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <section className="border-t border-border bg-secondary/30 px-6 py-24 md:px-16">
      <div className="grid gap-12 md:grid-cols-12">
        <FadeUp className="md:col-span-4">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-8 bg-accent" />
            <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              {t.eyebrow}
            </span>
          </div>
          <h2 className="font-serif text-4xl leading-tight text-primary md:text-5xl">
            {t.heading}
          </h2>
        </FadeUp>
        <div className="space-y-6 font-light leading-relaxed text-foreground/80 md:col-span-7 md:col-start-6">
          <FadeUp delay={0.1}>
            <p>{t.p1}</p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p>{t.p2}</p>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
