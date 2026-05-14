import Link from "next/link";

import { Button } from "@/components/ui/button";

type Props = {
  bookingHref: string | null;
  videoSrc: string;
  posterSrc?: string;
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

  if (isExternal) {
    return (
      <Button
        size="lg"
        asChild
        className={className}
      >
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

export function LovableHero({ bookingHref, videoSrc, posterSrc }: Props) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={posterSrc}
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/55 to-primary/20" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-transparent to-primary/40" />

      <div className="relative z-10 flex min-h-screen items-end px-6 pb-24 md:px-16 md:pb-32">
        <div className="animate-fade-up max-w-2xl text-primary-foreground">
          <div className="mb-8 flex items-center gap-3">
            <div className="h-px w-10 bg-accent" />
            <span className="text-xs uppercase tracking-[0.25em] text-accent">
              Integrative Counselling &amp; Psychotherapy
            </span>
          </div>
          <h1 className="mb-8 font-serif text-5xl leading-[1.05] text-balance md:text-7xl">
            A quiet space to think, feel, and find your way.
          </h1>
          <p className="mb-10 max-w-xl text-lg font-light leading-relaxed text-primary-foreground/85 md:text-xl">
            Calmnous offers thoughtful, confidential therapy with Sotirios Batsos
            — an integrative psychotherapist who works with what you actually
            carry, not the polished version.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <BookConsultationButton
              bookingHref={bookingHref}
              className="rounded-full bg-background px-8 text-primary hover:bg-background/90"
            />
            <Link
              href="/#philosophy"
              className="border-b border-accent pb-1 text-sm uppercase tracking-widest text-primary-foreground transition-colors hover:text-accent"
            >
              Browse services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
