import Link from "next/link";

import { FadeUp } from "@/components/Motion";
import { WaveDecoration } from "@/components/lovable/WaveDecoration";

type Props = {
  readMoreHref?: string;
};

export function LovablePhilosophy({ readMoreHref }: Props) {
  return (
    <section id="philosophy" className="relative overflow-hidden px-6 py-40 md:px-16">
      <WaveDecoration className="absolute bottom-0 left-0 right-0 h-28" />
      <div className="relative grid items-start gap-12 md:grid-cols-12">
        <FadeUp className="md:col-span-4">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-8 bg-accent" />
            <span className="text-muted-foreground text-xs uppercase tracking-[0.25em]">
              Our philosophy
            </span>
          </div>
          <h2 className="font-serif text-4xl leading-tight text-primary md:text-5xl">
            Stillwater on top. Enough room underneath.
          </h2>
        </FadeUp>
        <div className="space-y-6 text-lg font-light leading-relaxed text-foreground/80 md:col-span-7 md:col-start-6">
          <FadeUp delay={0.1}>
            <p>
              Therapy here is not a performance. It is a slow, attentive
              conversation — one that respects the pace at which real change
              happens.
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p>
              We draw from psychodynamic, humanistic, and somatic traditions,
              shaped to the person in front of us. Whether you arrive in crisis or
              quiet curiosity, you are met with the same care: presence, patience,
              and honest reflection.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="pt-4 font-serif text-2xl italic text-primary">
              &ldquo;We work with what you actually carry — not the polished
              version.&rdquo;
            </p>
          </FadeUp>
          {readMoreHref && (
            <FadeUp delay={0.4}>
              <Link
                href={readMoreHref}
                className="group inline-flex items-center gap-3 pt-2 text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-primary"
              >
                Read more
                <span className="h-px w-6 bg-accent transition-all duration-300 group-hover:w-10" />
              </Link>
            </FadeUp>
          )}
        </div>
      </div>
    </section>
  );
}
