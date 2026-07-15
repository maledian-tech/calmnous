"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { FadeUp } from "@/components/Motion";

const copy = {
  en: {
    eyebrow: "Values",
    heading: "The values that guide my work.",
    pillars: [
      {
        title: "Respect",
        body: "Every person deserves to be heard with dignity and without judgement.",
      },
      {
        title: "Compassion",
        body: "Meaningful change begins with kindness, especially towards the parts of yourself that feel most difficult to accept.",
      },
      {
        title: "Integrity",
        body: "I am committed to working honestly, ethically and transparently, creating a therapeutic relationship built on trust and openness.",
      },
    ],
  },
  gr: {
    eyebrow: "Αξίες",
    heading: "Οι αξίες που καθοδηγούν τη δουλειά μου.",
    pillars: [
      {
        title: "Σεβασμός",
        body: "Κάθε άνθρωπος αξίζει να ακούγεται με αξιοπρέπεια και χωρίς κριτική.",
      },
      {
        title: "Συμπόνια",
        body: "Η ουσιαστική αλλαγή ξεκινά με καλοσύνη — ιδιαίτερα προς τις πλευρές του εαυτού σου που είναι πιο δύσκολο να αποδεχτείς.",
      },
      {
        title: "Ακεραιότητα",
        body: "Δεσμεύομαι να εργάζομαι με ειλικρίνεια, ήθος και διαφάνεια, δημιουργώντας μια θεραπευτική σχέση βασισμένη στην εμπιστοσύνη και το άνοιγμα.",
      },
    ],
  },
} as const;

export function PhilosophyPillars() {
  const { language } = useLanguage();
  const t = copy[language];

  return (
    <section className="border-t border-border px-6 py-24 md:px-16">
      <FadeUp className="mb-14">
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
      <div className="grid gap-px bg-border md:grid-cols-3">
        {t.pillars.map((p, i) => (
          <FadeUp key={p.title} delay={i * 0.1}>
            <div className="bg-background p-10 md:p-12 h-full">
              <div className="mb-5 h-px w-8 bg-accent" />
              <h3 className="mb-4 font-serif text-2xl text-primary">{p.title}</h3>
              <p className="font-light leading-relaxed text-foreground/75">{p.body}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
