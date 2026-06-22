import { getPayload } from "payload";

import { LovableAbout } from "@/components/lovable/LovableAbout";
import { LovableApproach } from "@/components/lovable/LovableApproach";
import { LovableContact } from "@/components/lovable/LovableContact";
import { LovableHero } from "@/components/lovable/LovableHero";
import { LovablePhilosophy } from "@/components/lovable/LovablePhilosophy";
import { LovableServices } from "@/components/lovable/LovableServices";
import { LovableSiteFooter } from "@/components/lovable/LovableSiteFooter";
import { LovableSiteHeader } from "@/components/lovable/LovableSiteHeader";
import config from "@payload-config";
import { resolveAboutPhotoPath, resolvePublicLogoPath } from "@/lib/resolve-public-paths";

export const dynamic = "force-dynamic";
export const maxDuration = 30; // allow up to 30s on Vercel Pro; ignored on Hobby

/** Walk Error.cause so LibSQL/SQLite details are included in checks. */
function formatPayloadInitError(err: unknown): string {
  const parts: string[] = [];
  let e: unknown = err;
  for (let i = 0; i < 6 && e; i += 1) {
    if (e instanceof Error) {
      parts.push(e.message);
      e = e.cause;
    } else {
      parts.push(String(e));
      break;
    }
  }
  return parts.join(" | ");
}

function isSqliteSchemaDriftError(msg: string): boolean {
  if (
    msg.includes("CREATE UNIQUE INDEX") &&
    msg.includes("services") &&
    msg.includes("slug")
  ) {
    return true;
  }
  // e.g. "index payload_locked_documents_rels_order_idx already exists"
  if (/already exists/i.test(msg) && /index|CREATE INDEX/i.test(msg)) {
    return true;
  }
  return false;
}

export default async function HomePage() {
  let payload: Awaited<ReturnType<typeof getPayload>>;
  try {
    payload = await getPayload({ config });
  } catch (err) {
    const msg = formatPayloadInitError(err);
    if (isSqliteSchemaDriftError(msg)) {
      throw new Error(
        [
          "Payload could not initialise SQLite: schema/migrations are out of sync with the DB file.",
          "Typical causes: leftover indexes/tables after a version bump, interrupted migrate, or duplicate slugs.",
          "Fix (dev, data loss): stop `next dev`, run `npm run db:reset`, start dev again, then `npm run seed`.",
          "On Windows, EBUSY on reset means the DB is still open — stop the dev server first.",
          `Database: ${process.env.DATABASE_URL ?? "file:payload.db"}`,
          `Original: ${msg}`,
        ].join(" "),
        { cause: err },
      );
    }
    throw err;
  }

  const services = await payload.find({
    collection: "services",
    where: {
      published: { equals: true },
    },
    sort: "sortOrder",
    limit: 50,
    depth: 0,
  });

  const bookingHref = null; // all CTAs link to /book
  const logoSrc = resolvePublicLogoPath();

  const serviceItems = services.docs.map((doc) => ({
    id: doc.id,
    title: doc.title,
    summary: doc.summary,
    subItems: (doc.subItems ?? [])
      .map((s) => s.text?.trim())
      .filter((t): t is string => Boolean(t)),
  }));

  const aboutPhotoSrc = resolveAboutPhotoPath();

  return (
    <main className="min-h-screen bg-background">
      <LovableSiteHeader logoSrc={logoSrc} bookingHref={bookingHref} />
      <LovableHero bookingHref={bookingHref} />
      <LovablePhilosophy readMoreHref="/philosophy" />
      <LovableServices items={serviceItems} />
      <LovableAbout photoSrc={aboutPhotoSrc} readMoreHref="/about" />
      <LovableApproach />
      <LovableContact bookingHref={bookingHref} />
      <LovableSiteFooter logoSrc={logoSrc} />
    </main>
  );
}
