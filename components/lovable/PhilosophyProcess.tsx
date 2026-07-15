"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { FadeUp } from "@/components/Motion";

const copy = {
  en: {
    eyebrow: "What to expect",
    heading: "How we'll work together.",
    steps: [
      {
        number: "01",
        title: "First meeting",
        body: "We begin with a free 15-minute introductory call. It is an opportunity to ask questions, discuss what brings you to therapy and decide whether working together feels right. If it does, we will arrange your first session.",
      },
      {
        number: "02",
        title: "Ongoing work",
        body: "Sessions are usually weekly, allowing time for a trusting therapeutic relationship to develop. Together, we explore your experiences, deepen understanding and work towards meaningful, lasting change.",
      },
      {
        number: "03",
        title: "Ending well",
        body: "Endings are part of therapy, not an afterthought. When the time comes to finish, we approach it thoughtfully, reflecting on what has changed, what has been understood and what you take forward.",
      },
    ],
  },
  gr: {
    eyebrow: "Τι να περιμένεις",
    heading: "Πώς θα δουλέψουμε μαζί.",
    steps: [
      {
        number: "01",
        title: "Η πρώτη συνάντηση",
        body: "Ξεκινάμε με ένα δωρεάν εισαγωγικό τηλεφώνημα 15 λεπτών. Είναι μια ευκαιρία να κάνεις ερωτήσεις, να συζητήσουμε τι σε φέρνει στη θεραπεία και να αποφασίσεις αν η συνεργασία μας είναι η κατάλληλη για σένα. Αν είναι, κανονίζουμε την πρώτη σου συνεδρία.",
      },
      {
        number: "02",
        title: "Η συνέχεια της δουλειάς",
        body: "Οι συνεδρίες γίνονται συνήθως εβδομαδιαία, δίνοντας χρόνο ώστε να αναπτυχθεί μια θεραπευτική σχέση εμπιστοσύνης. Μαζί εξερευνούμε τις εμπειρίες σου, εμβαθύνουμε στην κατανόηση και εργαζόμαστε για μια ουσιαστική, διαρκή αλλαγή.",
      },
      {
        number: "03",
        title: "Ένα καλό κλείσιμο",
        body: "Τα κλεισίματα είναι μέρος της θεραπείας, όχι μια δευτερεύουσα σκέψη. Όταν έρθει η ώρα να ολοκληρώσουμε, το προσεγγίζουμε με προσοχή, αναστοχαζόμενοι τι έχει αλλάξει, τι έχει κατανοηθεί και τι παίρνεις μαζί σου.",
      },
    ],
  },
} as const;

export function PhilosophyProcess() {
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
      <div className="grid gap-10 md:grid-cols-3">
        {t.steps.map((s, i) => (
          <FadeUp key={s.number} delay={i * 0.1}>
            <div className="mb-4 font-serif text-5xl text-primary/20">{s.number}</div>
            <h3 className="mb-3 font-serif text-2xl text-primary">{s.title}</h3>
            <p className="font-light leading-relaxed text-foreground/75">{s.body}</p>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
