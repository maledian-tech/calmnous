import Image from "next/image";
import Link from "next/link";

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

export function LovableSiteFooter({ logoSrc }: Props) {
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
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-6 py-14 md:px-16 md:py-16">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
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
              Integrative counselling and psychotherapy in a calm, confidential
              space — in person and online.
            </p>
          </div>

          <div className="md:col-span-4">
            <h2 className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-primary">
              Contact
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
                  Email is usually the quickest way to reach us.
                </span>
              </span>
            </a>
          </div>

          <div className="md:col-span-4">
            <h2 className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-primary">
              Connect
            </h2>
            {instagramUrl ? (
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
                  <span className="mt-0.5 block text-xs font-light text-muted-foreground">
                    Follow for occasional notes and practice updates.
                  </span>
                </span>
              </a>
            ) : (
              <p className="mt-4 text-sm font-light text-muted-foreground">
                Social links can be added when you are ready to share them
                publicly.
              </p>
            )}
          </div>
        </div>

        <div className="mt-14 border-t border-border pt-12">
          <h2 className="text-center text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-primary md:text-left">
            Professional memberships
          </h2>

          <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-12">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
              <a
                href="https://www.bacp.co.uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 self-start rounded-md bg-card p-2 shadow-[var(--shadow-soft)] ring-1 ring-border/60 transition-shadow hover:shadow-[var(--shadow-float)]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- user may supply SVG or PNG from BACP */}
                <img
                  src={bacpLogo}
                  alt="British Association for Counselling and Psychotherapy"
                  className="h-14 w-auto max-w-[220px] object-contain object-left"
                  width={220}
                  height={56}
                />
              </a>
              <div className="min-w-0 space-y-2">
                <p className="font-serif text-lg leading-snug text-primary">
                  Registered member of the British Association for Counselling
                  and Psychotherapy (BACP).
                </p>
                <p className="text-sm font-medium text-foreground/85">
                  {bacpReg ? (
                    <>
                      BACP Register membership number:{" "}
                      <span className="tabular-nums text-primary">
                        {bacpReg}
                      </span>
                    </>
                  ) : (
                    <span className="font-normal font-light text-muted-foreground">
                      BACP Register number shared on enquiry or at first
                      session.
                    </span>
                  )}
                </p>
                <p className="text-xs font-light leading-relaxed text-muted-foreground">
                  The BACP Register is accredited by the Professional Standards
                  Authority.{" "}
                  <a
                    href="https://www.bacp.co.uk/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary underline-offset-2 hover:underline"
                  >
                    bacp.co.uk
                  </a>
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
              <a
                href="https://www.bps.org.uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 self-start rounded-md bg-card p-2 shadow-[var(--shadow-soft)] ring-1 ring-border/60 transition-shadow hover:shadow-[var(--shadow-float)]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- user may supply SVG or PNG from BPS */}
                <img
                  src={bpsLogo}
                  alt="British Psychological Society"
                  className="h-14 w-auto max-w-[220px] object-contain object-left"
                  width={220}
                  height={56}
                />
              </a>
              <div className="min-w-0 space-y-2">
                <p className="font-serif text-lg leading-snug text-primary">
                  British Psychological Society (BPS)
                </p>
                <p className="text-sm font-light leading-relaxed text-foreground/80">
                  {bpsCaption}
                </p>
                <p className="text-xs font-light text-muted-foreground">
                  <a
                    href="https://www.bps.org.uk/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary underline-offset-2 hover:underline"
                  >
                    bps.org.uk
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-8 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <p className="text-xs font-light text-muted-foreground">
            © {year} Sotirios Batsos · Calmnous · Integrative counselling &amp;
            psychotherapy
          </p>
          <p className="text-[0.65rem] font-medium uppercase tracking-wider text-muted-foreground/90">
            Confidentiality · Athens &amp; online
          </p>
        </div>
      </div>
    </footer>
  );
}
