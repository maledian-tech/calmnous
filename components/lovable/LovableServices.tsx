import { FadeUp } from "@/components/Motion";

export type LovableServiceRow = {
  id: string | number;
  title: string;
  summary: string;
};

type Props = {
  items: LovableServiceRow[];
};

export function LovableServices({ items }: Props) {
  return (
    <section id="services" className="bg-secondary/40 px-6 py-32 md:px-16">
      <div>
        <FadeUp>
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-8 bg-accent" />
            <span className="text-muted-foreground text-xs uppercase tracking-[0.25em]">
              Services
            </span>
          </div>
          <h2 className="mb-16 max-w-2xl font-serif text-4xl leading-tight text-primary md:text-5xl">
            Ways we can work together.
          </h2>
        </FadeUp>
        {items.length === 0 ? (
          <FadeUp delay={0.1}>
            <p className="max-w-prose border-l-[3px] border-dashed border-accent py-6 pl-4 text-sm text-muted-foreground">
              No published services yet. Add them in the admin or run{" "}
              <code className="font-mono text-foreground">npm run seed</code>.
            </p>
          </FadeUp>
        ) : (
          <div className="grid gap-px bg-border md:grid-cols-2">
            {items.map((s, i) => {
              const n = String(i + 1).padStart(2, "0");
              return (
                <FadeUp key={s.id} delay={i * 0.1}>
                  <div className="group bg-background p-10 transition-colors duration-500 hover:bg-card md:p-12 h-full">
                    <div className="mb-4 flex items-baseline gap-4">
                      <span className="font-serif text-lg text-accent">{n}</span>
                      <h3 className="font-serif text-3xl text-primary">
                        {s.title}
                      </h3>
                    </div>
                    <p className="max-w-md font-light leading-relaxed text-foreground/75">
                      {s.summary}
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      Learn more <span className="h-px w-6 bg-accent" />
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
