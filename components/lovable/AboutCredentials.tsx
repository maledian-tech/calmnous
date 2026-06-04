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
