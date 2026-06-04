# Section Pages — Design Spec

**Date:** 2026-06-04  
**Project:** Calmnous  
**Status:** Approved

## Summary

Convert the single-page About and Philosophy sections into standalone routed pages while keeping them visible as previews on the home page. Remove Services from the nav (section remains on the home page).

## Nav Changes

File: `components/lovable/LovableSiteHeader.tsx`

Replace the `links` array:

| Label | Old href | New href |
|-------|----------|----------|
| Philosophy | `/#philosophy` | `/philosophy` |
| Services | `/#services` | **removed** |
| About | `/#about` | `/about` |
| Journal | `/journal` | `/journal` (unchanged) |

"Book a session" CTA button is unchanged.

## New Pages

### `/about` — `app/(site)/about/page.tsx`

- Renders `<LovableSiteHeader>`, `<LovableAbout>`, `<LovableSiteFooter>`
- Extracts `resolveAboutPhotoPath()` and `resolvePublicLogoPath()` into `lib/resolve-public-paths.ts` and imports them in both the home page and this page
- `export const revalidate = 300`
- No Payload data fetch needed

### `/philosophy` — `app/(site)/philosophy/page.tsx`

- Renders `<LovableSiteHeader>`, `<LovablePhilosophy>`, `<LovableSiteFooter>`
- `export const revalidate = 300`
- No Payload data fetch needed

Both pages pass `bookingHref={null}` to the header (same as home page).

## Component Changes

### `LovableAbout`

Add optional prop: `readMoreHref?: string`

When provided, render a small link at the bottom of the section:

```
→ Read more
```

Styled to match existing "accent line + small caps" patterns in the codebase.

### `LovablePhilosophy`

Same pattern — add optional `readMoreHref?: string` prop with an identical "→ Read more" link.

## Home Page Changes

File: `app/(site)/page.tsx`

Pass the new props:

```tsx
<LovablePhilosophy readMoreHref="/philosophy" />
<LovableAbout photoSrc={aboutPhotoSrc} readMoreHref="/about" />
```

Services section stays on the home page — no changes to `LovableServices` or its usage.

## Out of Scope

- No new content on the standalone pages (exact same content as home sections)
- No changes to the `/book` page or `SimplyBookEmbed`
- No mobile menu changes (out of scope for now)
- Services page route not created
