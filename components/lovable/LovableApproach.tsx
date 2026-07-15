import { FadeUp } from "@/components/Motion";
import { T } from "@/components/T";

const steps = [
  {
    n: "I",
    title: "Reach out",
    titleGr: "Επικοινώνησε",
    desc: "A short message or call to share what brings you here.",
    descGr: "Ένα σύντομο μήνυμα ή τηλεφώνημα για να μοιραστείς τι σε φέρνει εδώ.",
  },
  {
    n: "II",
    title: "Initial consultation",
    titleGr: "Πρώτη συνάντηση",
    desc: "A 50-minute meeting to explore fit, focus, and the work ahead.",
    descGr:
      "Μια συνάντηση 50 λεπτών για να δούμε αν ταιριάζουμε, τι μας απασχολεί και τη δουλειά που ακολουθεί.",
  },
  {
    n: "III",
    title: "Ongoing sessions",
    titleGr: "Τακτικές συνεδρίες",
    desc: "Weekly conversations, in person or online, at a rhythm that suits you.",
    descGr:
      "Εβδομαδιαίες συζητήσεις, δια ζώσης ή διαδικτυακά, σε ρυθμό που σου ταιριάζει.",
  },
] as const;

export function LovableApproach() {
  return (
    <section className="bg-primary px-6 py-40 text-primary-foreground md:px-16">
      <div>
        <FadeUp>
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-8 bg-accent" />
            <span className="text-xs uppercase tracking-[0.25em] text-accent">
              <T en="The process" gr="Η διαδικασία" />
            </span>
          </div>
          <h2 className="mb-16 max-w-2xl font-serif text-4xl leading-tight md:text-5xl">
            <T
              en="How a journey with Calmnous begins."
              gr="Πώς ξεκινά μια πορεία με το Calmnous."
            />
          </h2>
        </FadeUp>
        <div className="grid gap-12 md:grid-cols-3">
          {steps.map((s, i) => (
            <FadeUp key={s.n} delay={i * 0.15}>
              <div className="border-t border-primary-foreground/20 pt-8">
                <div className="mb-4 font-serif text-2xl text-accent">{s.n}</div>
                <h3 className="mb-3 font-serif text-2xl">
                  <T en={s.title} gr={s.titleGr} />
                </h3>
                <p className="font-light leading-relaxed text-primary-foreground/70">
                  <T en={s.desc} gr={s.descGr} />
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
