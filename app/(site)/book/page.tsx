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
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "hello@calmnous.com";

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
              en="Whenever you're ready, the room is here."
              gr="Όποτε είσαι έτοιμος, ο χώρος είναι εδώ."
            />
          </h1>
          <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-foreground/70">
            <T
              en="Book a confidential 20-minute introductory call below, or reserve a full session. No commitment — simply a chance to see if this feels like the right space for you."
              gr="Κλείσε παρακάτω ένα εμπιστευτικό εισαγωγικό τηλεφώνημα 20 λεπτών ή κράτησε μια πλήρη συνεδρία. Χωρίς δέσμευση — απλώς μια ευκαιρία να δεις αν αυτός ο χώρος είναι ο σωστός για σένα."
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
                  en="The introductory call is a relaxed, informal conversation — no pressure, no agenda."
                  gr="Το εισαγωγικό τηλεφώνημα είναι μια χαλαρή, ανεπίσημη συζήτηση — χωρίς πίεση, χωρίς ατζέντα."
                />
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                <T
                  en="We'll talk about what's been going on for you, and what you might be looking for from therapy."
                  gr="Θα μιλήσουμε για το τι συμβαίνει στη ζωή σου και τι μπορεί να αναζητάς από τη θεραπεία."
                />
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                <T
                  en="You're welcome to ask questions and get a sense of whether this feels like the right space."
                  gr="Μπορείς να κάνεις ερωτήσεις και να νιώσεις αν αυτός ο χώρος είναι ο σωστός για σένα."
                />
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                <T
                  en="There's no pressure to commit — it's simply a chance to see if it feels like a good fit."
                  gr="Δεν υπάρχει καμία πίεση να δεσμευτείς — είναι απλώς μια ευκαιρία να δεις αν ταιριάζουμε."
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
                en="It's completely normal to feel uncertain about starting therapy. You don't need to be certain or have everything figured out."
                gr="Είναι απόλυτα φυσιολογικό να νιώθεις αβεβαιότητα για την έναρξη της θεραπείας. Δεν χρειάζεται να είσαι σίγουρος ή να τα έχεις όλα ξεκαθαρισμένα."
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
        <div className="grid gap-8 sm:grid-cols-3">
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
                en="We'll agree on a time and frequency that works for you — weekly sessions are most common."
                gr="Θα συμφωνήσουμε σε ώρα και συχνότητα που σου ταιριάζει — οι εβδομαδιαίες συνεδρίες είναι οι πιο συνηθισμένες."
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
              <T en="Athens & online" gr="Αθήνα & διαδικτυακά" />
            </p>
            <p className="mt-2 text-sm font-light leading-relaxed text-foreground/75">
              <T
                en="In person in Athens, Greece — or online, anywhere in the world via a secure video platform."
                gr="Δια ζώσης στην Αθήνα — ή διαδικτυακά, οπουδήποτε στον κόσμο μέσω ασφαλούς πλατφόρμας βίντεο."
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
            <p className="font-serif text-lg text-primary">
              <T en="Discussed together" gr="Το συζητάμε μαζί" />
            </p>
            <p className="mt-2 text-sm font-light leading-relaxed text-foreground/75">
              <T
                en="Fees are discussed during the introductory call. Reduced rates may be available — please ask."
                gr="Το κόστος συζητείται στο εισαγωγικό τηλεφώνημα. Ενδέχεται να υπάρχουν μειωμένες χρεώσεις — ρώτησέ με."
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
                en="If booking doesn't feel like the right step yet, you're welcome to get in touch."
                gr="Αν η κράτηση δεν σου φαίνεται ακόμη το σωστό βήμα, μη διστάσεις να επικοινωνήσεις."
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
              <div className="flex items-center gap-3 text-sm font-light text-foreground/80">
                <IconGlobe />
                <T
                  en="Athens, Greece & online worldwide"
                  gr="Αθήνα, Ελλάδα & διαδικτυακά παγκοσμίως"
                />
              </div>
            </div>
          </div>
          <div className="md:text-right">
            <p className="mb-6 max-w-sm text-sm font-light leading-relaxed text-foreground/70 md:ml-auto">
              <T
                en="A first conversation is enough to begin. There is no commitment required — simply a chance to see how it feels."
                gr="Μια πρώτη συζήτηση αρκεί για να ξεκινήσουμε. Δεν απαιτείται καμία δέσμευση — απλώς μια ευκαιρία να δεις πώς νιώθεις."
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
