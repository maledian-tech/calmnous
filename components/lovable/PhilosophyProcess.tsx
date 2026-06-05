import { FadeUp } from "@/components/Motion";

const steps = [
  {
    number: "01",
    title: "The first meeting",
    body: "We begin with a 20-minute introductory call — informal, no pressure. You can ask questions, get a sense of the space, and decide whether it feels right. If it does, we arrange an initial session.",
  },
  {
    number: "02",
    title: "Ongoing work",
    body: "Regular sessions, usually weekly. Over time, a rhythm develops. We build a shared language for your experience, and the deeper work — the kind that actually changes things — becomes possible.",
  },
  {
    number: "03",
    title: "Ending well",
    body: "Endings are part of the work, not an afterthought. When the time comes to finish, we move toward it thoughtfully — reviewing what has changed, what has been understood, and what you carry forward.",
  },
];

export function PhilosophyProcess() {
  return (
    <section className="border-t border-border px-6 py-24 md:px-16">
      <FadeUp className="mb-14">
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px w-8 bg-accent" />
          <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            The process
          </span>
        </div>
        <h2 className="font-serif text-4xl leading-tight text-primary md:text-5xl">
          What the work looks like.
        </h2>
      </FadeUp>
      <div className="grid gap-10 md:grid-cols-3">
        {steps.map((s, i) => (
          <FadeUp key={s.number} delay={i * 0.1}>
            <div className="mb-4 font-serif text-5xl text-primary/20">{s.number}</div>
            <h3 className="mb-3 font-serif text-2xl text-primary">{s.title}</h3>
            <p className="font-light leading-relaxed text-foreground/75">{s.body}</p>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
