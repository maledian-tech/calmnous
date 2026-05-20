import { existsSync } from "fs";
import Link from "next/link";
import { notFound } from "next/navigation";
import path from "path";
import { getPayload } from "payload";

import { LovableSiteFooter } from "@/components/lovable/LovableSiteFooter";
import { LovableSiteHeader } from "@/components/lovable/LovableSiteHeader";
import { WaveDecoration } from "@/components/lovable/WaveDecoration";
import config from "@payload-config";
import { RichText } from "@payloadcms/richtext-lexical/react";

export const revalidate = 300;
export const maxDuration = 30;

const LOGO_CANDIDATES = ["calmnous-logo.jpeg", "logo.png"] as const;

function resolvePublicLogoPath(): string | null {
  for (const name of LOGO_CANDIDATES) {
    const full = path.join(process.cwd(), "public", name);
    if (existsSync(full)) return `/${name}`;
  }
  return null;
}

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "posts",
    where: {
      slug: { equals: slug },
      published: { equals: true },
    },
    limit: 1,
    depth: 0,
  });

  const post = result.docs[0];
  if (!post) notFound();

  const logoSrc = resolvePublicLogoPath();
  const date = formatDate(
    typeof post.publishedAt === "string" ? post.publishedAt : null,
  );

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LovableSiteHeader logoSrc={logoSrc} bookingHref={null} />

      {/* Article header */}
      <header className="relative overflow-hidden border-b border-border pt-40 pb-16 px-6 md:px-16">
        <WaveDecoration className="absolute bottom-0 left-0 right-0 h-16" />
        <div className="relative mx-auto max-w-3xl">
          <Link
            href="/journal"
            className="mb-10 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
          >
            <span className="h-px w-5 bg-accent" /> Journal
          </Link>
          {date && (
            <p className="mb-4 text-xs uppercase tracking-widest text-muted-foreground">
              {date}
            </p>
          )}
          <h1 className="font-serif text-4xl leading-tight text-primary md:text-5xl">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mt-6 text-xl font-light leading-relaxed text-foreground/70">
              {post.excerpt}
            </p>
          )}
        </div>
      </header>

      {/* Article body */}
      <main className="flex-1 px-6 py-16 md:px-16">
        <div className="mx-auto max-w-3xl">
          {post.content ? (
            <div className="prose prose-lg max-w-none font-light leading-relaxed text-foreground/85 [&_p]:mb-6 [&_h2]:mt-14 [&_h2]:mb-5 [&_h2]:font-serif [&_h2]:text-3xl [&_h2]:text-primary [&_blockquote]:border-l-2 [&_blockquote]:border-accent [&_blockquote]:pl-6 [&_blockquote]:font-serif [&_blockquote]:text-xl [&_blockquote]:italic [&_blockquote]:text-primary">
              <RichText data={post.content} />
            </div>
          ) : null}

          <div className="mt-20 border-t border-border pt-10">
            <Link
              href="/journal"
              className="inline-flex items-center gap-3 text-sm uppercase tracking-widest text-primary transition-colors hover:text-primary/70"
            >
              <span className="h-px w-6 bg-accent" /> Back to Journal
            </Link>
          </div>
        </div>
      </main>

      <LovableSiteFooter logoSrc={logoSrc} />
    </div>
  );
}
