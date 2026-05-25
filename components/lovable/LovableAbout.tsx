import Image from "next/image";

import { WaveDecoration } from "@/components/lovable/WaveDecoration";

type Props = {
  photoSrc?: string | null;
};

export function LovableAbout({ photoSrc }: Props) {
  return (
    <section id="about" className="px-6 py-40 md:px-16">
      <div className="grid items-center gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-secondary shadow-[var(--shadow-soft)]">
            {photoSrc ? (
              <Image
                src={photoSrc}
                alt="Sotirios Batsos — integrative psychotherapist"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 35vw"
                priority
              />
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary to-secondary/60" />
                <WaveDecoration className="absolute bottom-0 left-0 right-0 h-32 opacity-80" />
                <WaveDecoration className="absolute bottom-8 left-0 right-0 h-24 opacity-50" />
              </>
            )}
            <div className="absolute bottom-6 left-6 right-6 text-primary">
              <p className="font-serif text-2xl drop-shadow-sm">Sotirios Batsos</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-primary/70 drop-shadow-sm">
                MSc, Integrative Psychotherapist
              </p>
            </div>
          </div>
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-8 bg-accent" />
            <span className="text-muted-foreground text-xs uppercase tracking-[0.25em]">
              About
            </span>
          </div>
          <h2 className="mb-8 font-serif text-4xl leading-tight text-primary md:text-5xl">
            A practice built on listening — closely, and without hurry.
          </h2>
          <div className="space-y-5 font-light leading-relaxed text-foreground/80">
            <p>
              Sotirios Batsos is an integrative counsellor and psychotherapist
              with over a decade of clinical experience. He works with adults,
              couples, and young professionals across a range of personal and
              relational concerns.
            </p>
            <p>
              His approach is warm, considered, and grounded — combining
              classical depth work with contemporary, evidence-based methods.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8">
            {[
              { k: "10+", v: "Years in mental health" },
              { k: "Hundreds", v: "Lives walked alongside" },
              { k: "MSc", v: "Integrative training" },
            ].map((s) => (
              <div key={s.v}>
                <div className="font-serif text-3xl text-primary">{s.k}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
