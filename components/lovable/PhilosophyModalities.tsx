import { FadeUp } from "@/components/Motion";

const modalities = [
  {
    name: "Psychodynamic",
    body: "Drawing on the depth tradition — the unconscious, early relational patterns, and the way the past lives in the present. This approach attends to what is not said as much as what is, and to the meaning beneath the symptom.",
  },
  {
    name: "Humanistic",
    body: "Rooted in the belief that every person has an innate capacity for growth and self-understanding. The relationship is the primary vehicle of change. Warmth, unconditional regard, and genuine encounter are not techniques — they are the therapy.",
  },
  {
    name: "Somatic",
    body: "The body holds what the mind has not yet processed. Somatic approaches bring gentle attention to physical sensation, breath, and posture — recognising that healing is not only a cognitive process, but one that moves through the whole person.",
  },
];

export function PhilosophyModalities() {
  return (
    <section className="border-t border-border bg-secondary/30 px-6 py-24 md:px-16">
      <FadeUp className="mb-14">
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px w-8 bg-accent" />
          <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Therapeutic traditions
          </span>
        </div>
        <h2 className="font-serif text-4xl leading-tight text-primary md:text-5xl">
          Three traditions, one integrative practice.
        </h2>
      </FadeUp>
      <div className="grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-border">
        {modalities.map((m, i) => (
          <FadeUp
            key={m.name}
            delay={i * 0.1}
            className={i === 0 ? "md:pr-10" : i === 2 ? "md:pl-10" : "md:px-10"}
          >
            <h3 className="mb-4 font-serif text-2xl text-primary">{m.name}</h3>
            <p className="font-light leading-relaxed text-foreground/75">{m.body}</p>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
