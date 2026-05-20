import { existsSync } from "fs";
import path from "path";

import { BookingFaq } from "@/components/lovable/BookingFaq";
import { LovableSiteFooter } from "@/components/lovable/LovableSiteFooter";
import { LovableSiteHeader } from "@/components/lovable/LovableSiteHeader";
import { SimplyBookEmbed } from "@/components/lovable/SimplyBookEmbed";
import { WaveDecoration } from "@/components/lovable/WaveDecoration";

const LOGO_CANDIDATES = ["calmnous-logo.jpeg", "logo.png"] as const;

function resolvePublicLogoPath(): string | null {
  for (const name of LOGO_CANDIDATES) {
    const full = path.join(process.cwd(), "public", name);
    if (existsSync(full)) return `/${name}`;
  }
  return null;
}

function IconClock() {
  return (
    <svg className="size-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function IconLocation() {
  return (
    <svg className="size-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconFee() {
  return (
    <svg className="size-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" /><path d="M15 9.5a4 4 0 1 0 0 5M12 7v10" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg className="size-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function IconGlobe() {
  return (
    <svg className="size-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

export default function BookPage() {
  const logoSrc = resolvePublicLogoPath();
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "hello@calmnous.com";

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LovableSiteHeader logoSrc={logoSrc} bookingHref={null} />

      {/* Page header */}
      <div className="relative overflow-hidden border-b border-border pt-40 pb-20 px-6 md:px-16">
        <WaveDecoration className="absolute bottom-0 left-0 right-0 h-20" />
        <div className="relative">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-8 bg-accent" />
            <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Book a session
            </span>
          </div>
          <h1 className="max-w-2xl font-serif text-5xl leading-tight text-primary md:text-6xl">
            Whenever you&apos;re ready,<br className="hidden md:block" /> the room is here.
          </h1>
          <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-foreground/70">
            Book a confidential 20-minute introductory call below, or reserve a
            full session. No commitment — simply a chance to see if this feels
            like the right space for you.
          </p>
        </div>
      </div>

      {/* Booking widget */}
      <section className="px-6 py-14 md:px-16">
        <SimplyBookEmbed />
      </section>

      {/* What to expect + If you're unsure */}
      <section className="border-t border-border bg-secondary/30 px-6 py-16 md:px-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-8 bg-accent" />
              <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">What to expect</span>
            </div>
            <ul className="space-y-4 text-foreground/80 font-light leading-relaxed">
              <li className="flex gap-3">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                The introductory call is a relaxed, informal conversation — no pressure, no agenda.
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                We&apos;ll talk about what&apos;s been going on for you, and what you might be looking for from therapy.
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                You&apos;re welcome to ask questions and get a sense of whether this feels like the right space.
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                There&apos;s no pressure to commit — it&apos;s simply a chance to see if it feels like a good fit.
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-background/70 px-8 py-8 shadow-[var(--shadow-soft)]">
            <div className="mb-4 h-px w-8 bg-accent" />
            <h2 className="font-serif text-2xl leading-snug text-primary">
              If you&apos;re unsure, that&apos;s okay.
            </h2>
            <p className="mt-4 text-sm font-light leading-relaxed text-foreground/75">
              It&apos;s completely normal to feel uncertain about starting therapy. You don&apos;t need to be certain
              or have everything figured out.
            </p>
            <p className="mt-3 text-sm font-light leading-relaxed text-foreground/75">
              A conversation is enough to begin.
            </p>
          </div>
        </div>
      </section>

      {/* Practical details */}
      <section className="border-t border-border px-6 py-16 md:px-16">
        <div className="mb-10 flex items-center gap-3">
          <div className="h-px w-8 bg-accent" />
          <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Practical details</span>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <IconClock />
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Sessions</p>
            </div>
            <p className="font-serif text-lg text-primary">50 minutes</p>
            <p className="mt-2 text-sm font-light leading-relaxed text-foreground/75">
              We&apos;ll agree on a time and frequency that works for you — weekly sessions are most common.
            </p>
          </div>
          <div>
            <div className="mb-3 flex items-center gap-2">
              <IconLocation />
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Where</p>
            </div>
            <p className="font-serif text-lg text-primary">Athens &amp; online</p>
            <p className="mt-2 text-sm font-light leading-relaxed text-foreground/75">
              In person in Athens, Greece — or online, anywhere in the world via a secure video platform.
            </p>
          </div>
          <div>
            <div className="mb-3 flex items-center gap-2">
              <IconFee />
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Fees</p>
            </div>
            <p className="font-serif text-lg text-primary">Discussed together</p>
            <p className="mt-2 text-sm font-light leading-relaxed text-foreground/75">
              Fees are discussed during the introductory call. Reduced rates may be available — please ask.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border bg-secondary/30 px-6 py-16 md:px-16">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 flex items-center gap-3">
            <div className="h-px w-8 bg-accent" />
            <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Frequently asked questions
            </span>
          </div>
          <BookingFaq />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-border px-6 py-16 md:px-16">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="font-serif text-2xl leading-snug text-primary md:text-3xl">
              If booking doesn&apos;t feel like the right step yet, you&apos;re welcome to get in touch.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 text-sm font-light text-foreground/80 transition-colors hover:text-primary"
              >
                <IconMail />
                {email}
              </a>
              <div className="flex items-center gap-3 text-sm font-light text-foreground/80">
                <IconGlobe />
                Athens, Greece &amp; online worldwide
              </div>
            </div>
          </div>
          <div className="md:text-right">
            <p className="mb-6 max-w-sm text-sm font-light leading-relaxed text-foreground/70 md:ml-auto">
              A first conversation is enough to begin. There is no commitment required — simply a chance to see how it feels.
            </p>
            <a
              href="#sbw-calmnous-booking"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-xs uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Book your free consultation
            </a>
          </div>
        </div>
      </section>

      <LovableSiteFooter logoSrc={logoSrc} />
    </div>
  );
}
