import { FadeUp } from "@/components/Motion";
import { T } from "@/components/T";

export type LovableServiceRow = {
  id: string | number;
  title: string;
  summary: string;
  subItems?: string[];
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
              <T en="Services" gr="Υπηρεσίες" />
            </span>
          </div>
          <h2 className="mb-16 max-w-2xl font-serif text-4xl leading-tight text-primary md:text-5xl">
            <T en="Ways we can work together." gr="Τρόποι να συνεργαστούμε." />
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
                    {s.subItems && s.subItems.length > 0 ? (
                      <ul className="mt-6 flex max-w-md flex-col gap-3">
                        {s.subItems.map((item, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-3 text-sm font-light leading-relaxed text-foreground/80"
                          >
                            <span className="mt-2 h-px w-5 shrink-0 bg-accent" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
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
