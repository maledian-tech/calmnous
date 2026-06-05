import Link from "next/link";

import { FadeIn } from "@/components/Motion";
import { Button } from "@/components/ui/button";

const YT_ID = "1P0-EY-jRjk";
const YT_EMBED = `https://www.youtube-nocookie.com/embed/${YT_ID}?autoplay=1&mute=1&loop=1&playlist=${YT_ID}&controls=0&playsinline=1&rel=0&disablekb=1`;

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
  return (
    <Button size="lg" asChild className={className}>
      <Link href={bookingHref ?? "/book"}>Book a consultation</Link>
    </Button>
  );
}

export function LovableHero({ bookingHref }: Props) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/70" />

      <div className="absolute inset-0 hidden overflow-hidden md:block">
        <iframe
          src={YT_EMBED}
          title="Background video"
          allow="autoplay; encrypted-media"
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-0"
          style={{
            width: "max(100%, calc(100vh * 16 / 9))",
            height: "max(100%, calc(100vw * 9 / 16))",
            minWidth: "100%",
            minHeight: "100%",
          }}
          aria-hidden="true"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/55 to-primary/20" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-transparent to-primary/40" />

      <div className="relative z-10 flex min-h-screen items-end px-6 pb-24 md:px-16 md:pb-32">
        <div className="max-w-2xl text-primary-foreground">
          <FadeIn delay={0.1} className="mb-8 flex items-center gap-3">
            <div className="h-px w-10 bg-accent" />
            <span className="text-xs uppercase tracking-[0.25em] text-accent">
              Integrative Counselling &amp; Psychotherapy
            </span>
          </FadeIn>
          <FadeIn delay={0.3}>
            <h1 className="mb-8 font-serif text-5xl leading-[1.05] text-balance md:text-7xl">
              A quiet space to think, feel, and find your way.
            </h1>
          </FadeIn>
          <FadeIn delay={0.5}>
            <p className="mb-10 max-w-xl text-lg font-light leading-relaxed text-primary-foreground/85 md:text-xl">
              Calmnous offers thoughtful, confidential therapy with Sotirios Batsos
              — an integrative psychotherapist who works with what you actually
              carry, not the polished version.
            </p>
          </FadeIn>
          <FadeIn delay={0.65} className="flex flex-wrap items-center gap-4">
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
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
