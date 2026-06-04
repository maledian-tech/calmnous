# Page Content Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add rich content sections to the `/about` and `/philosophy` standalone pages — approach, credentials, pillars, modalities, process, and a shared CTA.

**Architecture:** Each new section is a standalone stateless component in `components/lovable/`. Pages import and compose them. All copy is hardcoded. No props, no data fetching.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Cormorant Garamond serif via CSS variable `font-serif`.

---

## File Map

| Action | File |
|--------|------|
| Create | `components/lovable/PageCta.tsx` |
| Create | `components/lovable/AboutApproach.tsx` |
| Create | `components/lovable/AboutCredentials.tsx` |
| Create | `components/lovable/PhilosophyPillars.tsx` |
| Create | `components/lovable/PhilosophyModalities.tsx` |
| Create | `components/lovable/PhilosophyProcess.tsx` |
| Modify | `app/(site)/about/page.tsx` |
| Modify | `app/(site)/philosophy/page.tsx` |

---

### Task 1: Create PageCta

**Files:**
- Create: `components/lovable/PageCta.tsx`

- [ ] **Step 1: Create the component**

```tsx
import Link from "next/link";

import { WaveDecoration } from "@/components/lovable/WaveDecoration";

export function PageCta() {
  return (
    <section className="relative overflow-hidden border-t border-border bg-secondary/30 px-6 py-24 md:px-16">
      <WaveDecoration className="absolute bottom-0 left-0 right-0 h-20 opacity-50" />
      <div className="relative mx-auto max-w-2xl text-center">
        <p className="font-serif text-3xl italic leading-snug text-primary md:text-4xl">
          &ldquo;A conversation is enough to begin.&rdquo;
        </p>
        <p className="mt-6 font-light leading-relaxed text-foreground/70">
          If something here has resonated, you are welcome to reach out — or
          simply book a time to talk.
        </p>
        <Link
          href="/book"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-xs uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Book a session
        </Link>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: TypeScript check**

```
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/lovable/PageCta.tsx
git commit -m "feat: add PageCta shared CTA component"
```

---

### Task 2: Create AboutApproach

**Files:**
- Create: `components/lovable/AboutApproach.tsx`

- [ ] **Step 1: Create the component**

```tsx
export function AboutApproach() {
  return (
    <section className="border-t border-border bg-secondary/30 px-6 py-24 md:px-16">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-8 bg-accent" />
            <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              How I work
            </span>
          </div>
          <h2 className="font-serif text-4xl leading-tight text-primary md:text-5xl">
            A space that moves at your pace.
          </h2>
        </div>
        <div className="space-y-6 font-light leading-relaxed text-foreground/80 md:col-span-7 md:col-start-6">
          <p>
            My way of working is relational — which means the therapeutic
            relationship itself is central to what makes change possible. I
            bring warmth and directness in equal measure, and I try to hold the
            space in a way that feels both safe and honest.
          </p>
          <p>
            Sessions are not structured around exercises or worksheets. We talk.
            We explore what is alive for you right now, what patterns you keep
            returning to, what it is you are trying to move toward. Sometimes
            the most important work happens in the silences.
          </p>
          <p>
            I work with adults and young professionals navigating a wide range
            of concerns — anxiety, depression, relationship difficulties, grief,
            questions of identity and purpose, and the quieter kind of suffering
            that does not always have a name.
          </p>
          <p>
            Sessions are 50 minutes, typically weekly. I offer both in-person
            appointments in Athens and online sessions via secure video call,
            for clients anywhere in the world.
          </p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: TypeScript check**

```
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/lovable/AboutApproach.tsx
git commit -m "feat: add AboutApproach component"
```

---

### Task 3: Create AboutCredentials

**Files:**
- Create: `components/lovable/AboutCredentials.tsx`

- [ ] **Step 1: Create the component**

```tsx
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
        <div className="md:col-span-4">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-8 bg-accent" />
            <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Training &amp; credentials
            </span>
          </div>
          <h2 className="font-serif text-4xl leading-tight text-primary md:text-5xl">
            Grounded in rigorous training.
          </h2>
        </div>
        <div className="md:col-span-7 md:col-start-6">
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
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: TypeScript check**

```
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/lovable/AboutCredentials.tsx
git commit -m "feat: add AboutCredentials component"
```

---

### Task 4: Create PhilosophyPillars

**Files:**
- Create: `components/lovable/PhilosophyPillars.tsx`

- [ ] **Step 1: Create the component**

```tsx
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
      <div className="mb-14">
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px w-8 bg-accent" />
          <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Core principles
          </span>
        </div>
        <h2 className="font-serif text-4xl leading-tight text-primary md:text-5xl">
          What guides the work.
        </h2>
      </div>
      <div className="grid gap-px bg-border md:grid-cols-3">
        {pillars.map((p) => (
          <div key={p.title} className="bg-background p-10 md:p-12">
            <div className="mb-5 h-px w-8 bg-accent" />
            <h3 className="mb-4 font-serif text-2xl text-primary">{p.title}</h3>
            <p className="font-light leading-relaxed text-foreground/75">{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: TypeScript check**

```
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/lovable/PhilosophyPillars.tsx
git commit -m "feat: add PhilosophyPillars component"
```

---

### Task 5: Create PhilosophyModalities

**Files:**
- Create: `components/lovable/PhilosophyModalities.tsx`

- [ ] **Step 1: Create the component**

```tsx
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
      <div className="mb-14">
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px w-8 bg-accent" />
          <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Therapeutic traditions
          </span>
        </div>
        <h2 className="font-serif text-4xl leading-tight text-primary md:text-5xl">
          Three traditions, one integrative practice.
        </h2>
      </div>
      <div className="grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-border">
        {modalities.map((m, i) => (
          <div
            key={m.name}
            className={i === 0 ? "md:pr-10" : i === 2 ? "md:pl-10" : "md:px-10"}
          >
            <h3 className="mb-4 font-serif text-2xl text-primary">{m.name}</h3>
            <p className="font-light leading-relaxed text-foreground/75">{m.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: TypeScript check**

```
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/lovable/PhilosophyModalities.tsx
git commit -m "feat: add PhilosophyModalities component"
```

---

### Task 6: Create PhilosophyProcess

**Files:**
- Create: `components/lovable/PhilosophyProcess.tsx`

- [ ] **Step 1: Create the component**

```tsx
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
      <div className="mb-14">
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px w-8 bg-accent" />
          <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            The process
          </span>
        </div>
        <h2 className="font-serif text-4xl leading-tight text-primary md:text-5xl">
          What the work looks like.
        </h2>
      </div>
      <div className="grid gap-10 md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.number}>
            <div className="mb-4 font-serif text-5xl text-primary/20">{s.number}</div>
            <h3 className="mb-3 font-serif text-2xl text-primary">{s.title}</h3>
            <p className="font-light leading-relaxed text-foreground/75">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: TypeScript check**

```
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/lovable/PhilosophyProcess.tsx
git commit -m "feat: add PhilosophyProcess component"
```

---

### Task 7: Wire up /about page

**Files:**
- Modify: `app/(site)/about/page.tsx`

- [ ] **Step 1: Replace file content**

```tsx
import {
  resolveAboutPhotoPath,
  resolvePublicLogoPath,
} from "@/lib/resolve-public-paths";

import { AboutApproach } from "@/components/lovable/AboutApproach";
import { AboutCredentials } from "@/components/lovable/AboutCredentials";
import { LovableAbout } from "@/components/lovable/LovableAbout";
import { LovableSiteFooter } from "@/components/lovable/LovableSiteFooter";
import { LovableSiteHeader } from "@/components/lovable/LovableSiteHeader";
import { PageCta } from "@/components/lovable/PageCta";

export const revalidate = 300;

export default function AboutPage() {
  const logoSrc = resolvePublicLogoPath();
  const photoSrc = resolveAboutPhotoPath();

  return (
    <main className="min-h-screen bg-background">
      <LovableSiteHeader logoSrc={logoSrc} bookingHref={null} />
      <LovableAbout photoSrc={photoSrc} />
      <AboutApproach />
      <AboutCredentials />
      <PageCta />
      <LovableSiteFooter logoSrc={logoSrc} />
    </main>
  );
}
```

- [ ] **Step 2: TypeScript check**

```
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add "app/(site)/about/page.tsx"
git commit -m "feat: wire up expanded /about page"
```

---

### Task 8: Wire up /philosophy page

**Files:**
- Modify: `app/(site)/philosophy/page.tsx`

- [ ] **Step 1: Replace file content**

```tsx
import { resolvePublicLogoPath } from "@/lib/resolve-public-paths";

import { LovablePhilosophy } from "@/components/lovable/LovablePhilosophy";
import { LovableSiteFooter } from "@/components/lovable/LovableSiteFooter";
import { LovableSiteHeader } from "@/components/lovable/LovableSiteHeader";
import { PageCta } from "@/components/lovable/PageCta";
import { PhilosophyModalities } from "@/components/lovable/PhilosophyModalities";
import { PhilosophyPillars } from "@/components/lovable/PhilosophyPillars";
import { PhilosophyProcess } from "@/components/lovable/PhilosophyProcess";

export const revalidate = 300;

export default function PhilosophyPage() {
  const logoSrc = resolvePublicLogoPath();

  return (
    <main className="min-h-screen bg-background">
      <LovableSiteHeader logoSrc={logoSrc} bookingHref={null} />
      <LovablePhilosophy />
      <PhilosophyPillars />
      <PhilosophyModalities />
      <PhilosophyProcess />
      <PageCta />
      <LovableSiteFooter logoSrc={logoSrc} />
    </main>
  );
}
```

- [ ] **Step 2: TypeScript check**

```
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add "app/(site)/philosophy/page.tsx"
git commit -m "feat: wire up expanded /philosophy page"
```
