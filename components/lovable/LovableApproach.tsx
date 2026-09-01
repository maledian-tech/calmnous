import { FadeUp } from "@/components/Motion";
import { T } from "@/components/T";

const steps = [
  {
    n: "I",
    title: "Get in touch",
    titleGr: "Επικοινωνία",
    desc: "Send a short message to share what brings you to counselling and what you are looking for.",
    descGr:
      "Στείλε ένα σύντομο μήνυμα για να μοιραστείς τι σε φέρνει στη συμβουλευτική και τι αναζητάς.",
  },
  {
    n: "II",
    title: "Initial consultation",
    titleGr: "Πρώτη γνωριμία",
    desc: "We begin with a free 15-minute consultation to talk briefly about what brings you here, answer any questions, and see whether working together feels right.",
    descGr:
      "Ξεκινάμε με μια δωρεάν γνωριμία 15 λεπτών, για να μιλήσουμε σύντομα για το τι σε φέρνει εδώ, να απαντήσω σε τυχόν ερωτήσεις και να δούμε αν η συνεργασία μας είναι η κατάλληλη.",
  },
  {
    n: "III",
    title: "Ongoing sessions",
    titleGr: "Τακτικές συνεδρίες",
    desc: "If we decide to work together, sessions are usually weekly and can take place online or face to face, as agreed together.",
    descGr:
      "Αν αποφασίσουμε να συνεργαστούμε, οι συνεδρίες είναι συνήθως εβδομαδιαίες και μπορούν να γίνονται διαδικτυακά ή δια ζώσης, όπως συμφωνήσουμε μαζί.",
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
              en="How working with Calmnous begins."
              gr="Πώς ξεκινά η συνεργασία με το Calmnous."
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
