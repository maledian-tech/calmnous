"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { T } from "@/components/T";

type Props = {
  logoSrc: string | null;
};

function IconMail({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function IconLifeBuoy({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="4.93" x2="9.17" y1="4.93" y2="9.17" />
      <line x1="14.83" x2="19.07" y1="14.83" y2="19.07" />
      <line x1="14.83" x2="19.07" y1="9.17" y2="4.93" />
      <line x1="4.93" x2="9.17" y1="19.07" y2="14.83" />
    </svg>
  );
}

/** Prominent, language-aware crisis helpline band shown at the top of the footer. */
function CrisisBand({ language }: { language: "en" | "gr" }) {
  return (
    <div className="mb-12 rounded-2xl border border-accent/40 bg-accent/10 px-5 py-5 md:px-8 md:py-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <span className="text-accent">
          <IconLifeBuoy className="size-6" />
        </span>
        {language === "en" ? (
          <p className="text-sm leading-relaxed text-foreground/90">
            <span className="font-semibold text-primary">
              If you are in crisis:
            </span>{" "}
            Samaritans (UK) ·{" "}
            <a
              href="tel:116123"
              className="font-semibold underline underline-offset-2 transition-colors hover:text-primary"
            >
              116 123
            </a>{" "}
            · Free, 24/7 ·{" "}
            <a
              href="https://www.samaritans.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition-colors hover:text-primary"
            >
              samaritans.org
            </a>
          </p>
        ) : (
          <p className="text-sm leading-relaxed text-foreground/90">
            <span className="font-semibold text-primary">
              Αν βρίσκεσαι σε κρίση:
            </span>{" "}
            Γραμμή SOS Δίπλα Σου ·{" "}
            <a
              href="tel:1018"
              className="font-semibold underline underline-offset-2 transition-colors hover:text-primary"
            >
              1018
            </a>{" "}
            · Δωρεάν, 24 ώρες ·{" "}
            <a
              href="https://www.psy-dds.gr"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition-colors hover:text-primary"
            >
              psy-dds.gr
            </a>
          </p>
        )}
      </div>
    </div>
  );
}

export function LovableSiteFooter({ logoSrc }: Props) {
  const { language } = useLanguage();
  const email =
    process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "hello@calmnous.com";
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim() || "";
  const instagramLabel =
    process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE?.trim() || "Instagram";

  const bacpReg =
    process.env.NEXT_PUBLIC_BACP_REGISTRATION?.trim() || "";
  const bacpLogo =
    process.env.NEXT_PUBLIC_BACP_LOGO_SRC?.trim() ||
    "/logos/bacp-logo-official.svg";
  const bpsLogo =
    process.env.NEXT_PUBLIC_BPS_LOGO_SRC?.trim() ||
    "/logos/bps-logo-official.svg";

  const bpsCaption =
    process.env.NEXT_PUBLIC_BPS_FOOTER_CAPTION?.trim() ||
    "The BPS is a leading UK body for psychology, research, and ethical practice. Visit bps.org.uk for resources and guidance.";

  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-secondary/40 px-6 py-14 md:px-16 md:py-16">
      <div>
        <CrisisBand language={language} />
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center gap-3 text-primary no-underline transition-opacity hover:opacity-85"
            >
              {logoSrc ? (
                <Image
                  src={logoSrc}
                  alt="Calmnous"
                  width={140}
                  height={36}
                  className="h-9 w-auto rounded"
                />
              ) : null}
              <span className="font-serif text-2xl tracking-tight">
                Calmnous
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm font-light leading-relaxed text-muted-foreground">
              <T
                en="Integrative counselling and psychotherapy by "
                gr="Ολιστική συμβουλευτική και ψυχοθεραπεία από τον "
              />
              <span className="font-medium text-foreground/80">
                <T en="Sotirios Batsos" gr="Σωτήριο Μπάτσο" />
              </span>
              <T
                en=" — a calm, confidential space, in person and online."
                gr=" — έναν ήρεμο, εμπιστευτικό χώρο, δια ζώσης και διαδικτυακά."
              />
            </p>
          </div>

          <div className="md:col-span-4">
            <h2 className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-primary">
              <T en="Get in touch" gr="Επικοινωνία" />
            </h2>
            <a
              href={`mailto:${email}`}
              className="mt-4 flex items-start gap-3 rounded-lg py-1 text-foreground/90 transition-colors hover:text-primary"
            >
              <span className="mt-0.5 text-accent">
                <IconMail className="size-5" />
              </span>
              <span>
                <span className="block text-sm font-medium">{email}</span>
                <span className="mt-0.5 block text-xs font-light text-muted-foreground">
                  <T
                    en="Email is usually the quickest way to reach us."
                    gr="Το email είναι συνήθως ο πιο γρήγορος τρόπος επικοινωνίας."
                  />
                </span>
              </span>
            </a>
          </div>

          <div className="md:col-span-2">
            <h2 className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-primary">
              <T en="Explore" gr="Πλοήγηση" />
            </h2>
            <nav className="mt-4 flex flex-col gap-2">
              {[
                { label: "Journal", labelGr: "Ημερολόγιο", href: "/journal" },
                { label: "Services", labelGr: "Υπηρεσίες", href: "/#services" },
                { label: "About", labelGr: "Γνωριμία", href: "/about" },
                {
                  label: "Philosophy",
                  labelGr: "Φιλοσοφία",
                  href: "/philosophy",
                },
              ].map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-sm font-light text-foreground/75 transition-colors hover:text-primary"
                >
                  <T en={l.label} gr={l.labelGr} />
                </a>
              ))}
            </nav>
          </div>
          <div className="md:col-span-2">
            {instagramUrl ? (
              <>
                <h2 className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-primary">
                  <T en="Connect" gr="Ακολούθησε" />
                </h2>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-start gap-3 rounded-lg py-1 text-foreground/90 transition-colors hover:text-primary"
                >
                  <span className="mt-0.5 text-accent">
                    <IconInstagram className="size-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium">
                      {instagramLabel}
                    </span>
                  </span>
                </a>
              </>
            ) : null}
          </div>
        </div>

        <div className="mt-14 border-t border-border pt-10">
          <p className="mb-6 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground/70">
            <T en="Professional memberships" gr="Επαγγελματικές ενώσεις" />
          </p>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
            <a
              href="https://www.bacp.co.uk/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 opacity-70 transition-opacity hover:opacity-100"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- user may supply SVG or PNG from BACP */}
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
              {/* eslint-disable-next-line @next/next/no-img-element -- user may supply SVG or PNG from BPS */}
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

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-8 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <p className="text-xs font-light text-muted-foreground">
            © {year} <span className="font-medium text-foreground/80">Calmnous</span> —{" "}
            <T
              en="integrative counselling & psychotherapy by "
              gr="ολιστική συμβουλευτική & ψυχοθεραπεία από τον "
            />
            <span className="font-medium text-foreground/80">
              <T en="Sotirios Batsos" gr="Σωτήριο Μπάτσο" />
            </span>
          </p>
          <p className="text-[0.65rem] font-medium uppercase tracking-wider text-muted-foreground/90">
            <T
              en="Confidentiality · Athens & online"
              gr="Εμπιστευτικότητα · Αθήνα & διαδικτυακά"
            />
          </p>
        </div>
      </div>
    </footer>
  );
}
