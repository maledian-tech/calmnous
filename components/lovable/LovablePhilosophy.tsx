import { WaveDecoration } from "@/components/lovable/WaveDecoration";

export function LovablePhilosophy() {
  return (
    <section id="philosophy" className="relative overflow-hidden px-6 py-40 md:px-16">
      <WaveDecoration className="absolute bottom-0 left-0 right-0 h-28" />
      <div className="relative grid items-start gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-8 bg-accent" />
            <span className="text-muted-foreground text-xs uppercase tracking-[0.25em]">
              Our philosophy
            </span>
          </div>
          <h2 className="font-serif text-4xl leading-tight text-primary md:text-5xl">
            Stillwater on top. Enough room underneath.
          </h2>
        </div>
        <div className="space-y-6 text-lg font-light leading-relaxed text-foreground/80 md:col-span-7 md:col-start-6">
          <p>
            Therapy here is not a performance. It is a slow, attentive
            conversation — one that respects the pace at which real change
            happens.
          </p>
          <p>
            We draw from psychodynamic, humanistic, and somatic traditions,
            shaped to the person in front of us. Whether you arrive in crisis or
            quiet curiosity, you are met with the same care: presence, patience,
            and honest reflection.
          </p>
          <p className="pt-4 font-serif text-2xl italic text-primary">
            &ldquo;We work with what you actually carry — not the polished
            version.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
