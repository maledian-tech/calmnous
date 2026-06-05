import { FadeUp } from "@/components/Motion";

export function AboutApproach() {
  return (
    <section className="border-t border-border bg-secondary/30 px-6 py-24 md:px-16">
      <div className="grid gap-12 md:grid-cols-12">
        <FadeUp className="md:col-span-4">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-8 bg-accent" />
            <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              How I work
            </span>
          </div>
          <h2 className="font-serif text-4xl leading-tight text-primary md:text-5xl">
            A space that moves at your pace.
          </h2>
        </FadeUp>
        <div className="space-y-6 font-light leading-relaxed text-foreground/80 md:col-span-7 md:col-start-6">
          <FadeUp delay={0.1}>
            <p>
              My way of working is relational — which means the therapeutic
              relationship itself is central to what makes change possible. I
              bring warmth and directness in equal measure, and I try to hold the
              space in a way that feels both safe and honest.
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p>
              Sessions are not structured around exercises or worksheets. We talk.
              We explore what is alive for you right now, what patterns you keep
              returning to, what it is you are trying to move toward. Sometimes
              the most important work happens in the silences.
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p>
              I work with adults and young professionals navigating a wide range
              of concerns — anxiety, depression, relationship difficulties, grief,
              questions of identity and purpose, and the quieter kind of suffering
              that does not always have a name.
            </p>
          </FadeUp>
          <FadeUp delay={0.25}>
            <p>
              Sessions are 50 minutes, typically weekly. I offer both in-person
              appointments in Athens and online sessions via secure video call,
              for clients anywhere in the world.
            </p>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
