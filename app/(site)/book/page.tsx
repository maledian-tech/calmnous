import { existsSync } from "fs";
import path from "path";

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

export default function BookPage() {
  const logoSrc = resolvePublicLogoPath();
  const bookingHref = process.env.NEXT_PUBLIC_BOOKING_URL?.trim() || null;
  const simplybookUrl = process.env.NEXT_PUBLIC_SIMPLYBOOK_URL?.trim() ?? "";

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LovableSiteHeader logoSrc={logoSrc} bookingHref={bookingHref} />

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
            Whenever you&apos;re ready, the room is here.
          </h1>
          <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-foreground/70">
            Book a confidential 20-minute introductory call below, or reserve a
            full session. No commitment — simply a chance to see if this feels
            like the right space for you.
          </p>
        </div>
      </div>

      {/* Booking widget */}
      <main className="flex-1 px-6 py-14 md:px-16">
        <div>
          {simplybookUrl ? (
            <SimplyBookEmbed url={simplybookUrl} />
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-secondary/30 py-28 text-center">
              <p className="font-serif text-2xl text-primary/50">
                Online booking coming soon.
              </p>
              <p className="mt-3 max-w-sm mx-auto text-sm font-light leading-relaxed text-muted-foreground">
                In the meantime, reach out directly at{" "}
                <a
                  href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "hello@calmnous.com"}`}
                  className="font-medium text-primary underline-offset-2 hover:underline"
                >
                  {process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "hello@calmnous.com"}
                </a>
                {" "}to schedule your first session.
              </p>
              <p className="mt-6 text-xs text-muted-foreground/60">
                Set <code className="font-mono text-[0.7rem]">NEXT_PUBLIC_SIMPLYBOOK_URL</code> to activate online booking.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Practice details */}
      <div className="border-t border-border bg-secondary/30 px-6 py-14 md:px-16">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
              Practice
            </p>
            <p className="font-light text-foreground/85">
              Athens, Greece
              <br />
              &amp; online worldwide
            </p>
          </div>
          <div>
            <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
              Hours
            </p>
            <p className="font-light text-foreground/85">
              Mon — Fri
              <br />
              09:00 — 20:00
            </p>
          </div>
          <div>
            <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
              Languages
            </p>
            <p className="font-light text-foreground/85">
              English
              <br />
              Ελληνικά
            </p>
          </div>
        </div>
      </div>

      <LovableSiteFooter logoSrc={logoSrc} />
    </div>
  );
}
