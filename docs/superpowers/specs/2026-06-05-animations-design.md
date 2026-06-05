# Calming Animations — Design Spec

**Date:** 2026-06-05  
**Status:** Approved

## Library

`framer-motion` — install with `npm install framer-motion`

## Shared Primitives

File: `components/Motion.tsx`

Two reusable `"use client"` components:

### FadeUp
Fades in + rises 20px, triggers once when scrolled into view. Respects `useReducedMotion()` — when reduced motion is preferred, renders children immediately with no animation.

Props: `children`, optional `delay?: number` (default 0), optional `className?: string`

Config:
- `initial`: `{ opacity: 0, y: 20 }`
- `whileInView`: `{ opacity: 1, y: 0 }`
- `viewport`: `{ once: true, margin: "-50px" }`
- `transition`: `{ duration: 0.5, ease: "easeOut", delay }`

### StaggerChildren
Wraps a container and staggers direct children. Each child fades up with a 0.1s inter-child delay.

Props: `children`, optional `className?: string`, optional `stagger?: number` (default 0.1)

Uses Framer Motion `variants` with `staggerChildren` on the container and `FadeUp`-style motion on each child via `motion.div` with `variants`.

## Page Transition

File: `app/(site)/layout.tsx`

Wrap the inner `<div>` with a `motion.div`:
- `initial`: `{ opacity: 0 }`
- `animate`: `{ opacity: 1 }`
- `transition`: `{ duration: 0.3, ease: "easeOut" }`

The layout is already a server component — the `motion.div` makes it a client boundary. Extract a `SiteTransition` client component to keep layout as a server component.

File: `components/SiteTransition.tsx` — `"use client"`, renders `motion.div` wrapping children.

## Animation Targets

### LovableHero (`components/lovable/LovableHero.tsx`)
- Hero heading: `FadeUp delay={0}`
- Subtext paragraph: `FadeUp delay={0.15}`
- CTA button: `FadeUp delay={0.25}`
- On mount (not scroll-triggered) — use `animate` not `whileInView`

### LovablePhilosophy (`components/lovable/LovablePhilosophy.tsx`)
- Section label + heading (left col): `FadeUp`
- Body paragraphs (right col): `FadeUp delay={0.1}`
- Quote: `FadeUp delay={0.2}`

### LovableServices (`components/lovable/LovableServices.tsx`)
- Section heading: `FadeUp`
- Service cards container: `StaggerChildren`

### LovableAbout (`components/lovable/LovableAbout.tsx`)
- Photo card: `FadeUp`
- Section label + heading: `FadeUp delay={0.1}`
- Bio paragraphs: `FadeUp delay={0.2}`
- Stats row: `StaggerChildren`

### LovableApproach (`components/lovable/LovableApproach.tsx`)
- Heading: `FadeUp`
- Content: `FadeUp delay={0.1}`

### PhilosophyPillars (`components/lovable/PhilosophyPillars.tsx`)
- Section heading: `FadeUp`
- Pillars grid: `StaggerChildren`

### PhilosophyModalities (`components/lovable/PhilosophyModalities.tsx`)
- Section heading: `FadeUp`
- Modality columns: `StaggerChildren`

### PhilosophyProcess (`components/lovable/PhilosophyProcess.tsx`)
- Section heading: `FadeUp`
- Steps: `StaggerChildren`

### AboutApproach (`components/lovable/AboutApproach.tsx`)
- Heading: `FadeUp`
- Paragraphs: `FadeUp delay={0.1}`

### AboutCredentials (`components/lovable/AboutCredentials.tsx`)
- Heading: `FadeUp`
- Credential list: `StaggerChildren`

### PageCta (`components/lovable/PageCta.tsx`)
- Quote + text + button: `FadeUp` staggered

## Out of Scope
- No hover animations on nav links or buttons (already have CSS transitions)
- No animated counters on stats numbers
- No scroll-linked parallax
