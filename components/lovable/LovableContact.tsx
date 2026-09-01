import Link from "next/link";

import { T } from "@/components/T";
import { Button } from "@/components/ui/button";

type Props = {
  bookingHref: string | null;
};

function BookConsultationButton({
  bookingHref,
  className,
}: {
  bookingHref: string | null;
  className?: string;
}) {
  const href = bookingHref ?? "/book";
  const isExternal = href.startsWith("http");
  const label = <T en="Book a consultation" gr="Κλείσε ραντεβού" />;

  if (isExternal) {
    return (
      <Button size="lg" asChild className={className}>
        <a href={href} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      </Button>
    );
  }

  return (
    <Button size="lg" asChild className={className}>
      <Link href={href}>{label}</Link>
    </Button>
  );
}

export function LovableContact({ bookingHref }: Props) {
  const email =
    process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "info@calmnous.com";

  return (
    <section id="contact" className="px-6 py-40 md:px-16">
      <div className="text-center">
        <div className="mb-6 flex items-center justify-center gap-3">
          <div className="h-px w-8 bg-accent" />
          <span className="text-muted-foreground text-xs uppercase tracking-[0.25em]">
            <T en="Get in touch" gr="Επικοινωνία" />
          </span>
          <div className="h-px w-8 bg-accent" />
        </div>
        <h2 className="mb-8 font-serif text-4xl leading-tight text-balance text-primary md:text-6xl">
          <T
            en="Whenever you're ready, the space is here."
            gr="Όποτε είσαι έτοιμος, ο χώρος είναι εδώ."
          />
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-lg font-light text-foreground/75">
          <T
            en="Book a free, confidential 15-minute introductory consultation. There is no commitment, simply a chance to talk, ask any questions, and see whether working together feels right."
            gr="Κλείσε μια δωρεάν, εμπιστευτική εισαγωγική γνωριμία 15 λεπτών. Δεν υπάρχει καμία δέσμευση, απλώς μια ευκαιρία να μιλήσουμε, να κάνεις ερωτήσεις και να δούμε αν η συνεργασία μας είναι η κατάλληλη."
          />
        </p>
        <div className="mb-16 flex flex-wrap justify-center gap-4">
          <BookConsultationButton
            bookingHref={bookingHref}
            className="rounded-full bg-primary px-8 text-primary-foreground hover:bg-primary/90"
          />
          <Button
            size="lg"
            variant="outline"
            asChild
            className="rounded-full border-primary/30 px-8 text-primary hover:bg-secondary"
          >
            <a href={`mailto:${email}`}>{email}</a>
          </Button>
        </div>
        <div className="grid gap-8 border-t border-border pt-12 text-left sm:grid-cols-3">
          <div>
            <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
              <T en="Practice" gr="Έδρα" />
            </p>
            <p className="font-light text-foreground/85">
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
            </p>
          </div>
          <div>
            <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
              <T en="Hours" gr="Ώρες" />
            </p>
            <dl className="font-light text-foreground/85">
              {[
                { day: "Mon — Fri", dayGr: "Δευ — Παρ", time: "18:30 — 20:30" },
                { day: "Saturday", dayGr: "Σάββατο", time: "10:00 — 16:00" },
                { day: "Sunday", dayGr: "Κυριακή", time: "10:00 — 14:00" },
              ].map((row) => (
                <div key={row.day} className="flex justify-between gap-4">
                  <dt>
                    <T en={row.day} gr={row.dayGr} />
                  </dt>
                  <dd className="tabular-nums">{row.time}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
              <T en="Languages" gr="Γλώσσες" />
            </p>
            <p className="font-light text-foreground/85">
              <T en="English" gr="Αγγλικά" />
              <br />
              Ελληνικά
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
