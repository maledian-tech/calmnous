import { T } from "@/components/T";
import { BookingFaq } from "@/components/lovable/BookingFaq";
import { LovableSiteFooter } from "@/components/lovable/LovableSiteFooter";
import { LovableSiteHeader } from "@/components/lovable/LovableSiteHeader";
import { SimplyBookEmbed } from "@/components/lovable/SimplyBookEmbed";
import { WaveDecoration } from "@/components/lovable/WaveDecoration";
import { resolvePublicLogoPath } from "@/lib/resolve-public-paths";

function IconClock() {
  return (
    <svg className="size-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function IconLocation() {
  return (
    <svg className="size-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconFee() {
  return (
    <svg className="size-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" /><path d="M15 9.5a4 4 0 1 0 0 5M12 7v10" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg className="size-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function IconGlobe() {
  return (
    <svg className="size-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

export default function BookPage() {
  const logoSrc = resolvePublicLogoPath();
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "info@calmnous.com";

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LovableSiteHeader logoSrc={logoSrc} bookingHref={null} />

      {/* Page header */}
      <div className="relative overflow-hidden border-b border-border pt-40 pb-20 px-6 md:px-16">
        <WaveDecoration className="absolute bottom-0 left-0 right-0 h-20" />
        <div className="relative">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-8 bg-accent" />
            <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              <T en="Book a session" gr="Κλείσε ραντεβού" />
            </span>
          </div>
          <h1 className="max-w-2xl font-serif text-5xl leading-tight text-primary md:text-6xl">
            <T
              en="Whenever you're ready, the space is here."
              gr="Όποτε είσαι έτοιμος, ο χώρος είναι εδώ."
            />
          </h1>
          <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-foreground/70">
            <T
              en="Book a free, confidential 15-minute introductory consultation below. There is no commitment, simply a chance to talk, ask any questions, and see whether working together feels right."
              gr="Κλείσε παρακάτω μια δωρεάν, εμπιστευτική εισαγωγική γνωριμία 15 λεπτών. Δεν υπάρχει καμία δέσμευση, απλώς μια ευκαιρία να μιλήσουμε, να κάνεις ερωτήσεις και να δούμε αν η συνεργασία μας είναι η κατάλληλη."
            />
          </p>
        </div>
      </div>

      {/* Booking widget */}
      <section className="px-6 py-20 md:px-16">
        <SimplyBookEmbed />
      </section>

      {/* What to expect + If you're unsure */}
      <section className="border-t border-border bg-secondary/30 px-6 py-24 md:px-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-8 bg-accent" />
              <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                <T en="What to expect" gr="Τι να περιμένεις" />
              </span>
            </div>
            <ul className="space-y-4 text-foreground/80 font-light leading-relaxed">
              <li className="flex gap-3">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                <T
                  en="The introductory consultation is an informal conversation with no pressure to commit."
                  gr="Η εισαγωγική γνωριμία είναι μια ανεπίσημη συζήτηση, χωρίς καμία πίεση να δεσμευτείς."
                />
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                <T
                  en="We'll talk briefly about what has been going on for you and what you may be looking for from counselling."
                  gr="Θα μιλήσουμε σύντομα για το τι συμβαίνει στη ζωή σου και τι μπορεί να αναζητάς από τη συμβουλευτική."
                />
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                <T
                  en="You're welcome to ask any questions about how I work or what sessions involve."
                  gr="Μπορείς να κάνεις όποια ερώτηση θέλεις για τον τρόπο που δουλεύω ή για το τι περιλαμβάνουν οι συνεδρίες."
                />
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                <T
                  en="This is simply a chance for us to see whether working together feels like a good fit."
                  gr="Είναι απλώς μια ευκαιρία να δούμε αν η συνεργασία μας ταιριάζει."
                />
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-background/70 px-8 py-8 shadow-[var(--shadow-soft)]">
            <div className="mb-4 h-px w-8 bg-accent" />
            <h2 className="font-serif text-2xl leading-snug text-primary">
              <T
                en="If you're unsure, that's okay."
                gr="Αν έχεις αμφιβολίες, δεν πειράζει."
              />
            </h2>
            <p className="mt-4 text-sm font-light leading-relaxed text-foreground/75">
              <T
                en="Starting counselling can come with uncertainty. You don't need to have everything figured out or know exactly what you want from therapy."
                gr="Η έναρξη της συμβουλευτικής μπορεί να συνοδεύεται από αβεβαιότητα. Δεν χρειάζεται να τα έχεις όλα ξεκαθαρισμένα ούτε να ξέρεις ακριβώς τι θέλεις από τη θεραπεία."
              />
            </p>
            <p className="mt-3 text-sm font-light leading-relaxed text-foreground/75">
              <T
                en="A conversation is enough to begin."
                gr="Μια συζήτηση αρκεί για να ξεκινήσουμε."
              />
            </p>
          </div>
        </div>
      </section>

      {/* Practical details */}
      <section className="border-t border-border px-6 py-24 md:px-16">
        <div className="mb-10 flex items-center gap-3">
          <div className="h-px w-8 bg-accent" />
          <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            <T en="Practical details" gr="Πρακτικές λεπτομέρειες" />
          </span>
        </div>
        <div className="grid items-start gap-8 sm:grid-cols-3">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <IconClock />
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                <T en="Sessions" gr="Συνεδρίες" />
              </p>
            </div>
            <p className="font-serif text-lg text-primary">
              <T en="50 minutes" gr="50 λεπτά" />
            </p>
            <p className="mt-2 text-sm font-light leading-relaxed text-foreground/75">
              <T
                en="Sessions are usually weekly. We'll agree on a regular time that works for us both."
                gr="Οι συνεδρίες είναι συνήθως εβδομαδιαίες. Θα συμφωνήσουμε σε μια σταθερή ώρα που βολεύει και τους δύο."
              />
            </p>
          </div>
          <div>
            <div className="mb-3 flex items-center gap-2">
              <IconLocation />
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                <T en="Where" gr="Πού" />
              </p>
            </div>
            <p className="font-serif text-lg text-primary">
              <T
                en="Northamptonshire, UK & online"
                gr="Northamptonshire, ΗΒ & διαδικτυακά"
              />
            </p>
            <p className="mt-2 text-sm font-light leading-relaxed text-foreground/75">
              <T
                en="Face-to-face sessions are available in Northamptonshire, UK, by prior arrangement and subject to room availability. Online sessions are available to clients in the UK and Greece via a secure video platform."
                gr="Οι δια ζώσης συνεδρίες είναι διαθέσιμες στο Northamptonshire του Ηνωμένου Βασιλείου, κατόπιν συνεννόησης και εφόσον υπάρχει διαθέσιμος χώρος. Οι διαδικτυακές συνεδρίες είναι διαθέσιμες σε άτομα στο Ηνωμένο Βασίλειο και στην Ελλάδα, μέσω ασφαλούς πλατφόρμας βίντεο."
              />
            </p>
            <p className="mt-3 text-sm font-light leading-relaxed text-foreground/75">
              <T
                en="Walk-and-talk sessions are also available in Northamptonshire by arrangement."
                gr="Συνεδρίες περπατώντας είναι επίσης διαθέσιμες στο Northamptonshire κατόπιν συνεννόησης."
              />
            </p>
          </div>
          <div>
            <div className="mb-3 flex items-center gap-2">
              <IconFee />
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                <T en="Fees" gr="Κόστος" />
              </p>
            </div>
            <dl className="divide-y divide-border border-y border-border">
              {[
                {
                  label: "Online sessions",
                  labelGr: "Διαδικτυακές συνεδρίες",
                  fee: "£55",
                },
                {
                  label: "Face-to-face sessions",
                  labelGr: "Δια ζώσης συνεδρίες",
                  fee: "£65",
                },
                {
                  label: "Walk-and-talk sessions",
                  labelGr: "Συνεδρίες περπατώντας",
                  fee: "£55",
                },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between gap-4 py-2.5"
                >
                  <dt className="text-sm font-light text-foreground/75">
                    <T en={row.label} gr={row.labelGr} />
                  </dt>
                  <dd className="font-serif text-lg tabular-nums text-primary">
                    {row.fee}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm font-light leading-relaxed text-foreground/75">
              <T
                en="Sessions are 50 minutes. The fee for face-to-face sessions includes the cost of the consulting room. The initial 15-minute consultation is free."
                gr="Οι συνεδρίες διαρκούν 50 λεπτά. Το κόστος των δια ζώσης συνεδριών περιλαμβάνει το κόστος του χώρου. Η αρχική γνωριμία 15 λεπτών είναι δωρεάν."
              />
            </p>
            <p className="mt-3 text-sm font-light leading-relaxed text-foreground/75">
              <T
                en="A limited number of reduced-fee spaces may be available for students, people who are unemployed, or those experiencing financial difficulty, subject to availability."
                gr="Ενδέχεται να υπάρχει περιορισμένος αριθμός θέσεων με μειωμένο κόστος για φοιτητές, ανέργους ή όσους αντιμετωπίζουν οικονομική δυσκολία, ανάλογα με τη διαθεσιμότητα."
              />
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border bg-secondary/30 px-6 py-24 md:px-16">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 flex items-center gap-3">
            <div className="h-px w-8 bg-accent" />
            <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              <T en="Frequently asked questions" gr="Συχνές ερωτήσεις" />
            </span>
          </div>
          <BookingFaq />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-border px-6 py-24 md:px-16">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="font-serif text-2xl leading-snug text-primary md:text-3xl">
              <T
                en="If you're not ready to book a session, you're welcome to get in touch with any questions."
                gr="Αν δεν είσαι έτοιμος να κλείσεις συνεδρία, μπορείς να επικοινωνήσεις με όποια ερώτηση έχεις."
              />
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 text-sm font-light text-foreground/80 transition-colors hover:text-primary"
              >
                <IconMail />
                {email}
              </a>
              <div className="flex items-start gap-3 text-sm font-light text-foreground/80">
                <span className="mt-0.5">
                  <IconGlobe />
                </span>
                <span>
                  <T
                    en="Northamptonshire, UK"
                    gr="Northamptonshire, Ηνωμένο Βασίλειο"
                  />
                  <br />
                  <T
                    en="Face-to-face by arrangement"
                    gr="Δια ζώσης κατόπιν συνεννόησης"
                  />
                  <br />
                  <T
                    en="Online in the UK & Greece"
                    gr="Διαδικτυακά σε Ηνωμένο Βασίλειο & Ελλάδα"
                  />
                </span>
              </div>
            </div>
          </div>
          <div className="md:text-right">
            <p className="mb-6 max-w-sm text-sm font-light leading-relaxed text-foreground/70 md:ml-auto">
              <T
                en="A first conversation can be enough to begin. There is no commitment, just an opportunity to talk and see whether working together feels right."
                gr="Μια πρώτη συζήτηση μπορεί να αρκεί για να ξεκινήσουμε. Δεν υπάρχει καμία δέσμευση, απλώς μια ευκαιρία να μιλήσουμε και να δούμε αν η συνεργασία μας είναι η κατάλληλη."
              />
            </p>
            <a
              href="#sbw-calmnous-booking"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-xs uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <T
                en="Book your free consultation"
                gr="Κλείσε τη δωρεάν γνωριμία σου"
              />
            </a>
          </div>
        </div>
      </section>

      <LovableSiteFooter logoSrc={logoSrc} />
    </div>
  );
}
