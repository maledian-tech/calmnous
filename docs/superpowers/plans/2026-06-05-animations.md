# Calming Animations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add subtle scroll-triggered and mount-based fade animations across the site using Framer Motion.

**Architecture:** Two shared primitives (`FadeUp` for scroll-triggered, `FadeIn` for mount-based) in `components/Motion.tsx`. A `SiteTransition` client wrapper handles the page fade. All animations respect `useReducedMotion()`. Existing server components do NOT need `"use client"` — Next.js handles client boundaries when client components are imported.

**Tech Stack:** Next.js 16, React 19, TypeScript, `framer-motion`

---

## File Map

| Action | File |
|--------|------|
| Install | `framer-motion` package |
| Create | `components/Motion.tsx` |
| Create | `components/SiteTransition.tsx` |
| Modify | `app/(site)/layout.tsx` |
| Modify | `components/lovable/LovableHero.tsx` |
| Modify | `components/lovable/LovablePhilosophy.tsx` |
| Modify | `components/lovable/LovableServices.tsx` |
| Modify | `components/lovable/LovableAbout.tsx` |
| Modify | `components/lovable/LovableApproach.tsx` |
| Modify | `components/lovable/PhilosophyPillars.tsx` |
| Modify | `components/lovable/PhilosophyModalities.tsx` |
| Modify | `components/lovable/PhilosophyProcess.tsx` |
| Modify | `components/lovable/AboutApproach.tsx` |
| Modify | `components/lovable/AboutCredentials.tsx` |
| Modify | `components/lovable/PageCta.tsx` |

---

### Task 1: Install Framer Motion + create animation primitives

**Files:**
- Create: `components/Motion.tsx`
- Create: `components/SiteTransition.tsx`

- [ ] **Step 1: Install framer-motion**

```bash
npm install framer-motion
```

Expected: package added to `node_modules` and `package.json`

- [ ] **Step 2: Create `components/Motion.tsx`**

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

export function FadeUp({ children, delay = 0, className }: Props) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function FadeIn({ children, delay = 0, className }: Props) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 3: Create `components/SiteTransition.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";

export function SiteTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex min-h-full flex-col bg-background text-foreground"
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 4: TypeScript check**

```
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 5: Commit**

```bash
git add components/Motion.tsx components/SiteTransition.tsx package.json package-lock.json
git commit -m "feat: add Framer Motion animation primitives"
```

---

### Task 2: Page transition + Hero animations

**Files:**
- Modify: `app/(site)/layout.tsx`
- Modify: `components/lovable/LovableHero.tsx`

- [ ] **Step 1: Update `app/(site)/layout.tsx`**

Replace entire file:

```tsx
import { LanguageProvider } from "@/components/LanguageProvider";
import { SiteTransition } from "@/components/SiteTransition";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <SiteTransition>{children}</SiteTransition>
    </LanguageProvider>
  );
}
```

- [ ] **Step 2: Update `components/lovable/LovableHero.tsx`**

Replace entire file:

```tsx
import Link from "next/link";

import { FadeIn } from "@/components/Motion";
import { Button } from "@/components/ui/button";

const YT_ID = "1P0-EY-jRjk";
const YT_EMBED = `https://www.youtube.com/embed/${YT_ID}?autoplay=1&mute=1&loop=1&playlist=${YT_ID}&controls=0&playsinline=1&rel=0&modestbranding=1&disablekb=1`;

type Props = {
  bookingHref: string | null;
};

function BookConsultationButton({
  bookingHref,
  className,
}: {
  bookingHref: string | null;
  className?: string;
}) {
  return (
    <Button size="lg" asChild className={className}>
      <Link href={bookingHref ?? "/book"}>Book a consultation</Link>
    </Button>
  );
}

export function LovableHero({ bookingHref }: Props) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/70" />

      <div className="absolute inset-0 hidden overflow-hidden md:block">
        <iframe
          src={YT_EMBED}
          title="Background video"
          allow="autoplay; encrypted-media"
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-0"
          style={{
            width: "max(100%, calc(100vh * 16 / 9))",
            height: "max(100%, calc(100vw * 9 / 16))",
            minWidth: "100%",
            minHeight: "100%",
          }}
          aria-hidden="true"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/55 to-primary/20" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-transparent to-primary/40" />

      <div className="relative z-10 flex min-h-screen items-end px-6 pb-24 md:px-16 md:pb-32">
        <div className="max-w-2xl text-primary-foreground">
          <FadeIn delay={0.1} className="mb-8 flex items-center gap-3">
            <div className="h-px w-10 bg-accent" />
            <span className="text-xs uppercase tracking-[0.25em] text-accent">
              Integrative Counselling &amp; Psychotherapy
            </span>
          </FadeIn>
          <FadeIn delay={0.3}>
            <h1 className="mb-8 font-serif text-5xl leading-[1.05] text-balance md:text-7xl">
              A quiet space to think, feel, and find your way.
            </h1>
          </FadeIn>
          <FadeIn delay={0.5}>
            <p className="mb-10 max-w-xl text-lg font-light leading-relaxed text-primary-foreground/85 md:text-xl">
              Calmnous offers thoughtful, confidential therapy with Sotirios Batsos
              — an integrative psychotherapist who works with what you actually
              carry, not the polished version.
            </p>
          </FadeIn>
          <FadeIn delay={0.65} className="flex flex-wrap items-center gap-4">
            <BookConsultationButton
              bookingHref={bookingHref}
              className="rounded-full bg-background px-8 text-primary hover:bg-background/90"
            />
            <Link
              href="/#philosophy"
              className="border-b border-accent pb-1 text-sm uppercase tracking-widest text-primary-foreground transition-colors hover:text-accent"
            >
              Browse services
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: TypeScript check**

```
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add "app/(site)/layout.tsx" components/lovable/LovableHero.tsx
git commit -m "feat: page transition + hero entrance animations"
```

---

### Task 3: Animate home page sections

**Files:**
- Modify: `components/lovable/LovablePhilosophy.tsx`
- Modify: `components/lovable/LovableServices.tsx`
- Modify: `components/lovable/LovableAbout.tsx`
- Modify: `components/lovable/LovableApproach.tsx`

- [ ] **Step 1: Update `components/lovable/LovablePhilosophy.tsx`**

Replace entire file:

```tsx
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
```

- [ ] **Step 2: Update `components/lovable/LovableServices.tsx`**

Replace entire file:

```tsx
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
```

Note: Added `h-full` to the inner div so grid cells stretch correctly when wrapped in motion.div.

- [ ] **Step 3: Update `components/lovable/LovableAbout.tsx`**

Replace entire file:

```tsx
import Image from "next/image";
import Link from "next/link";

import { FadeUp } from "@/components/Motion";
import { WaveDecoration } from "@/components/lovable/WaveDecoration";

type Props = {
  photoSrc?: string | null;
  readMoreHref?: string;
};

export function LovableAbout({ photoSrc, readMoreHref }: Props) {
  return (
    <section id="about" className="px-6 py-40 md:px-16">
      <div className="grid items-center gap-12 md:grid-cols-12">
        <FadeUp className="md:col-span-4">
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
        </FadeUp>
        <div className="md:col-span-7 md:col-start-6">
          <FadeUp delay={0.1}>
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-8 bg-accent" />
              <span className="text-muted-foreground text-xs uppercase tracking-[0.25em]">
                About
              </span>
            </div>
            <h2 className="mb-8 font-serif text-4xl leading-tight text-primary md:text-5xl">
              A practice built on listening — closely, and without hurry.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2} className="space-y-5 font-light leading-relaxed text-foreground/80">
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
          </FadeUp>
          <FadeUp delay={0.3} className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8">
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
          </FadeUp>
          {readMoreHref && (
            <FadeUp delay={0.4} className="mt-10">
              <Link
                href={readMoreHref}
                className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-primary"
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
```

- [ ] **Step 4: Update `components/lovable/LovableApproach.tsx`**

Replace entire file:

```tsx
import { FadeUp } from "@/components/Motion";

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
    <section className="bg-primary px-6 py-40 text-primary-foreground md:px-16">
      <div>
        <FadeUp>
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-8 bg-accent" />
            <span className="text-xs uppercase tracking-[0.25em] text-accent">
              The process
            </span>
          </div>
          <h2 className="mb-16 max-w-2xl font-serif text-4xl leading-tight md:text-5xl">
            How a journey with Calmnous begins.
          </h2>
        </FadeUp>
        <div className="grid gap-12 md:grid-cols-3">
          {steps.map((s, i) => (
            <FadeUp key={s.n} delay={i * 0.15}>
              <div className="border-t border-primary-foreground/20 pt-8">
                <div className="mb-4 font-serif text-2xl text-accent">{s.n}</div>
                <h3 className="mb-3 font-serif text-2xl">{s.title}</h3>
                <p className="font-light leading-relaxed text-primary-foreground/70">
                  {s.desc}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: TypeScript check**

```
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 6: Commit**

```bash
git add components/lovable/LovablePhilosophy.tsx components/lovable/LovableServices.tsx components/lovable/LovableAbout.tsx components/lovable/LovableApproach.tsx
git commit -m "feat: animate home page sections"
```

---

### Task 4: Animate Philosophy page sections

**Files:**
- Modify: `components/lovable/PhilosophyPillars.tsx`
- Modify: `components/lovable/PhilosophyModalities.tsx`
- Modify: `components/lovable/PhilosophyProcess.tsx`

- [ ] **Step 1: Replace `components/lovable/PhilosophyPillars.tsx`**

```tsx
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
```

- [ ] **Step 2: Replace `components/lovable/PhilosophyModalities.tsx`**

```tsx
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
```

- [ ] **Step 3: Replace `components/lovable/PhilosophyProcess.tsx`**

```tsx
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
```

- [ ] **Step 4: TypeScript check**

```
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 5: Commit**

```bash
git add components/lovable/PhilosophyPillars.tsx components/lovable/PhilosophyModalities.tsx components/lovable/PhilosophyProcess.tsx
git commit -m "feat: animate philosophy page sections"
```

---

### Task 5: Animate About page sections

**Files:**
- Modify: `components/lovable/AboutApproach.tsx`
- Modify: `components/lovable/AboutCredentials.tsx`
- Modify: `components/lovable/PageCta.tsx`

- [ ] **Step 1: Replace `components/lovable/AboutApproach.tsx`**

```tsx
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
```

- [ ] **Step 2: Replace `components/lovable/AboutCredentials.tsx`**

```tsx
import { FadeUp } from "@/components/Motion";

export function AboutCredentials() {
  const bacpLogo =
    process.env.NEXT_PUBLIC_BACP_LOGO_SRC?.trim() ||
    "/logos/bacp-logo-official.svg";
  const bpsLogo =
    process.env.NEXT_PUBLIC_BPS_LOGO_SRC?.trim() ||
    "/logos/bps-logo-official.svg";
  const bacpReg = process.env.NEXT_PUBLIC_BACP_REGISTRATION?.trim() || "";

  return (
    <section className="border-t border-border px-6 py-24 md:px-16">
      <div className="grid gap-16 md:grid-cols-12">
        <FadeUp className="md:col-span-4">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-8 bg-accent" />
            <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Training &amp; credentials
            </span>
          </div>
          <h2 className="font-serif text-4xl leading-tight text-primary md:text-5xl">
            Grounded in rigorous training.
          </h2>
        </FadeUp>
        <FadeUp delay={0.1} className="md:col-span-7 md:col-start-6">
          <ul className="space-y-5 font-light leading-relaxed text-foreground/80">
            {[
              "MSc in Integrative Psychotherapy and Counselling",
              "Over a decade of clinical experience with adults, couples, and young professionals",
              "Trained in psychodynamic, humanistic, and somatic approaches",
              "Ongoing commitment to continuing professional development and supervision",
            ].map((item) => (
              <li key={item} className="flex gap-4">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-14 border-t border-border pt-10">
            <p className="mb-6 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground/70">
              Professional memberships
            </p>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
              <a
                href="https://www.bacp.co.uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 opacity-70 transition-opacity hover:opacity-100"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={bacpLogo}
                  alt="British Association for Counselling and Psychotherapy"
                  className="h-10 w-auto max-w-[160px] object-contain object-left"
                  width={160}
                  height={40}
                />
                {bacpReg && (
                  <span className="text-xs font-light tabular-nums text-muted-foreground">
                    #{bacpReg}
                  </span>
                )}
              </a>
              <a
                href="https://www.bps.org.uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 opacity-70 transition-opacity hover:opacity-100"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={bpsLogo}
                  alt="British Psychological Society"
                  className="h-10 w-auto max-w-[160px] object-contain object-left"
                  width={160}
                  height={40}
                />
              </a>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Replace `components/lovable/PageCta.tsx`**

```tsx
import Link from "next/link";

import { FadeUp } from "@/components/Motion";
import { WaveDecoration } from "@/components/lovable/WaveDecoration";

export function PageCta() {
  return (
    <section className="relative overflow-hidden border-t border-border bg-secondary/30 px-6 py-24 md:px-16">
      <WaveDecoration className="absolute bottom-0 left-0 right-0 h-20 opacity-50" />
      <div className="relative mx-auto max-w-2xl text-center">
        <FadeUp>
          <p className="font-serif text-3xl italic leading-snug text-primary md:text-4xl">
            &ldquo;A conversation is enough to begin.&rdquo;
          </p>
        </FadeUp>
        <FadeUp delay={0.15}>
          <p className="mt-6 font-light leading-relaxed text-foreground/70">
            If something here has resonated, you are welcome to reach out — or
            simply book a time to talk.
          </p>
        </FadeUp>
        <FadeUp delay={0.3}>
          <Link
            href="/book"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-xs uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Book a session
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: TypeScript check**

```
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 5: Commit**

```bash
git add components/lovable/AboutApproach.tsx components/lovable/AboutCredentials.tsx components/lovable/PageCta.tsx
git commit -m "feat: animate about page sections"
```
