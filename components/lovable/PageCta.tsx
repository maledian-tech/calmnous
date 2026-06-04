import Link from "next/link";

import { WaveDecoration } from "@/components/lovable/WaveDecoration";

export function PageCta() {
  return (
    <section className="relative overflow-hidden border-t border-border bg-secondary/30 px-6 py-24 md:px-16">
      <WaveDecoration className="absolute bottom-0 left-0 right-0 h-20 opacity-50" />
      <div className="relative mx-auto max-w-2xl text-center">
        <p className="font-serif text-3xl italic leading-snug text-primary md:text-4xl">
          &ldquo;A conversation is enough to begin.&rdquo;
        </p>
        <p className="mt-6 font-light leading-relaxed text-foreground/70">
          If something here has resonated, you are welcome to reach out — or
          simply book a time to talk.
        </p>
        <Link
          href="/book"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-xs uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Book a session
        </Link>
      </div>
    </section>
  );
}
