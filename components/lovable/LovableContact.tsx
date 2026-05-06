import Link from "next/link";

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
  const href = bookingHref ?? "#contact";
  const isExternal = href.startsWith("http");

  if (isExternal) {
    return (
      <Button size="lg" asChild className={className}>
        <a href={href} target="_blank" rel="noopener noreferrer">
          Book a consultation
        </a>
      </Button>
    );
  }

  return (
    <Button size="lg" asChild className={className}>
      <Link href={href}>Book a consultation</Link>
    </Button>
  );
}

export function LovableContact({ bookingHref }: Props) {
  return (
    <section id="contact" className="px-6 py-32 md:px-16">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-6 flex items-center justify-center gap-3">
          <div className="h-px w-8 bg-accent" />
          <span className="text-muted-foreground text-xs uppercase tracking-[0.25em]">
            Get in touch
          </span>
          <div className="h-px w-8 bg-accent" />
        </div>
        <h2 className="mb-8 font-serif text-4xl leading-tight text-balance text-primary md:text-6xl">
          Whenever you&apos;re ready, the room is here.
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-lg font-light text-foreground/75">
          Book a confidential 20-minute introductory call. No commitment —
          simply a chance to see if this feels like the right space for you.
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
            <a href="mailto:hello@calmnous.com">hello@calmnous.com</a>
          </Button>
        </div>
        <div className="mx-auto grid max-w-3xl gap-8 border-t border-border pt-12 text-left sm:grid-cols-3">
          <div>
            <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
              Practice
            </p>
            <p className="font-light text-foreground/85">
              Athens, Greece
              <br />
              &amp; online worldwide
            </p>
          </div>
          <div>
            <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
              Hours
            </p>
            <p className="font-light text-foreground/85">
              Mon — Fri
              <br />
              09:00 — 20:00
            </p>
          </div>
          <div>
            <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
              Languages
            </p>
            <p className="font-light text-foreground/85">
              English
              <br />
              Ελληνικά
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
