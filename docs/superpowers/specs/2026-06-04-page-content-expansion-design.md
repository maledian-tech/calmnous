# Page Content Expansion — Design Spec

**Date:** 2026-06-04  
**Project:** Calmnous  
**Status:** Approved

## Summary

Add rich content sections to the standalone `/about` and `/philosophy` pages. Each new section is its own component in `components/lovable/`. All copy follows the site's calm, unhurried, serif-first tone.

## New Components

All components are static (no props, no data fetching). Copy is hardcoded. Styling follows existing patterns: `px-6 py-24 md:px-16`, accent lines, Cormorant Garamond headings, navy/cream palette.

### AboutApproach
**File:** `components/lovable/AboutApproach.tsx`  
"How I work" — 3–4 paragraphs on Sotirios's therapeutic style: warmth, unhurried pacing, depth-oriented, meeting people where they are. Left-aligned prose with a serif heading. Light `bg-secondary/30` background to create visual separation.

### AboutCredentials
**File:** `components/lovable/AboutCredentials.tsx`  
Training and professional memberships. Two columns: left has text credentials (MSc, training institutes, years of practice), right has BACP + BPS logos reusing `NEXT_PUBLIC_BACP_LOGO_SRC` and `NEXT_PUBLIC_BPS_LOGO_SRC` env vars already in the footer. Clean bordered card aesthetic.

### AboutCta
**File:** `components/lovable/AboutCta.tsx`  
Closing strip: serif italic quote + "Book a session" button linking to `/book`. Same visual pattern as the `LovableContact` section. Shared with the Philosophy page.

### PhilosophyPillars
**File:** `components/lovable/PhilosophyPillars.tsx`  
3 named principles displayed in a 3-column grid:
- **Presence** — full attention, no agenda
- **Depth** — working with what lies beneath the surface
- **Pace** — change happens slowly; that is honoured here

Each pillar has a short accent line, a serif title, and 2–3 sentences.

### PhilosophyModalities
**File:** `components/lovable/PhilosophyModalities.tsx`  
The three therapeutic traditions — Psychodynamic · Humanistic · Somatic — in a 3-column panel with a dividing border between columns. Each has a heading and a short paragraph explaining what it brings to the work.

### PhilosophyProcess
**File:** `components/lovable/PhilosophyProcess.tsx`  
"What a session looks like" — 3 numbered steps: First Meeting → Ongoing Work → Ending Well. Calm and reassuring tone. Steps rendered as a vertical or horizontal timeline with serif numerals.

## Page Assembly

### `/about` (`app/(site)/about/page.tsx`)
```
LovableSiteHeader
LovableAbout          (existing)
AboutApproach         (new)
AboutCredentials      (new)
AboutCta              (new)
LovableSiteFooter
```

### `/philosophy` (`app/(site)/philosophy/page.tsx`)
```
LovableSiteHeader
LovablePhilosophy     (existing)
PhilosophyPillars     (new)
PhilosophyModalities  (new)
PhilosophyProcess     (new)
PhilosophyCta         (new — same component as AboutCta, renamed PageCta)
LovableSiteFooter
```

## Shared CTA Component

`AboutCta` and `PhilosophyCta` are the same component — name it `PageCta` and use it on both pages.

**File:** `components/lovable/PageCta.tsx`

## Out of Scope
- No CMS integration — all copy is hardcoded
- No new routes or nav changes
- No changes to the home page
