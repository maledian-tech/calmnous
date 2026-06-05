import { FadeUp } from "@/components/Motion";

const pillars = [
  {
    title: "Presence",
    body: "I bring my full attention to every session — not managing you from a distance, but genuinely here, with whatever you carry. That quality of being met matters as much as any technique.",
  },
  {
    title: "Depth",
    body: "Lasting change usually requires going further — into the patterns, the history, the beliefs about self that have shaped how you move through the world. That is the work I am most interested in.",
  },
  {
    title: "Pace",
    body: "Real change is rarely fast. I do not rush toward resolution. We work at the pace that feels honest for you, trusting that what needs to emerge will — when the conditions are right.",
  },
];

export function PhilosophyPillars() {
  return (
    <section className="border-t border-border px-6 py-24 md:px-16">
      <FadeUp className="mb-14">
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px w-8 bg-accent" />
          <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Core principles
          </span>
        </div>
        <h2 className="font-serif text-4xl leading-tight text-primary md:text-5xl">
          What guides the work.
        </h2>
      </FadeUp>
      <div className="grid gap-px bg-border md:grid-cols-3">
        {pillars.map((p, i) => (
          <FadeUp key={p.title} delay={i * 0.1}>
            <div className="bg-background p-10 md:p-12 h-full">
              <div className="mb-5 h-px w-8 bg-accent" />
              <h3 className="mb-4 font-serif text-2xl text-primary">{p.title}</h3>
              <p className="font-light leading-relaxed text-foreground/75">{p.body}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
