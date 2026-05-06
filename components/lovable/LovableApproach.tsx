const steps = [
  {
    n: "I",
    title: "Reach out",
    desc: "A short message or call to share what brings you here.",
  },
  {
    n: "II",
    title: "Initial consultation",
    desc: "A 50-minute meeting to explore fit, focus, and the work ahead.",
  },
  {
    n: "III",
    title: "Ongoing sessions",
    desc: "Weekly conversations, in person or online, at a rhythm that suits you.",
  },
] as const;

export function LovableApproach() {
  return (
    <section className="bg-primary px-6 py-32 text-primary-foreground md:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px w-8 bg-accent" />
          <span className="text-xs uppercase tracking-[0.25em] text-accent">
            The process
          </span>
        </div>
        <h2 className="mb-16 max-w-2xl font-serif text-4xl leading-tight md:text-5xl">
          How a journey with Calmnous begins.
        </h2>
        <div className="grid gap-12 md:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.n}
              className="border-t border-primary-foreground/20 pt-8"
            >
              <div className="mb-4 font-serif text-2xl text-accent">{s.n}</div>
              <h3 className="mb-3 font-serif text-2xl">{s.title}</h3>
              <p className="font-light leading-relaxed text-primary-foreground/70">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
