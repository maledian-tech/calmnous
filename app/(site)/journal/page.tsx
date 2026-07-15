import Link from "next/link";
import { getPayload } from "payload";

import { T } from "@/components/T";
import { LovableSiteFooter } from "@/components/lovable/LovableSiteFooter";
import { LovableSiteHeader } from "@/components/lovable/LovableSiteHeader";
import { WaveDecoration } from "@/components/lovable/WaveDecoration";
import config from "@payload-config";
import { resolvePublicLogoPath } from "@/lib/resolve-public-paths";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

function formatDate(
  dateStr: string | null | undefined,
): { en: string; gr: string } {
  if (!dateStr) return { en: "", gr: "" };
  const opts = { day: "numeric", month: "long", year: "numeric" } as const;
  const d = new Date(dateStr);
  return {
    en: d.toLocaleDateString("en-GB", opts),
    gr: d.toLocaleDateString("el-GR", opts),
  };
}

export default async function JournalPage() {
  const payload = await getPayload({ config });

  const posts = await payload.find({
    collection: "posts",
    where: { published: { equals: true } },
    sort: "-publishedAt",
    limit: 30,
    depth: 0,
  });

  const logoSrc = resolvePublicLogoPath();
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LovableSiteHeader logoSrc={logoSrc} bookingHref={null} />

      {/* Page hero */}
      <div className="relative overflow-hidden border-b border-border pt-40 pb-20 px-6 md:px-16">
        <WaveDecoration className="absolute bottom-0 left-0 right-0 h-20" />
        <div className="relative">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-8 bg-accent" />
            <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              <T en="Journal" gr="Ημερολόγιο" />
            </span>
          </div>
          <h1 className="max-w-2xl font-serif text-5xl leading-tight text-primary md:text-6xl">
            <T en="Thoughts from the practice." gr="Σκέψεις από την πρακτική." />
          </h1>
          <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-foreground/70">
            <T
              en="Occasional writing on therapy, depth, and the quiet work of living well."
              gr="Περιστασιακά κείμενα για τη θεραπεία, το βάθος και την ήσυχη δουλειά του να ζεις καλά."
            />
          </p>
        </div>
      </div>

      {/* Posts grid */}
      <main className="flex-1 px-6 py-32 md:px-16">
        <div>
          {posts.docs.length === 0 ? (
            <div className="py-24 text-center">
              <p className="font-serif text-3xl text-primary/50">
                <T
                  en="The journal is quiet for now."
                  gr="Το ημερολόγιο είναι ήσυχο προς το παρόν."
                />
              </p>
              <p className="mt-3 text-sm font-light text-muted-foreground">
                <T
                  en="New writing will appear here when it's ready."
                  gr="Νέα κείμενα θα εμφανιστούν εδώ μόλις είναι έτοιμα."
                />
              </p>
            </div>
          ) : (
            <div className="grid gap-px bg-border md:grid-cols-2">
              {posts.docs.map((post) => {
                const date = formatDate(
                  typeof post.publishedAt === "string" ? post.publishedAt : null,
                );
                return (
                  <Link
                    key={post.id}
                    href={`/journal/${post.slug}`}
                    className="group block bg-background p-10 transition-colors duration-500 hover:bg-card md:p-12"
                  >
                    {date.en && (
                      <p className="mb-4 text-xs uppercase tracking-widest text-muted-foreground">
                        <T en={date.en} gr={date.gr} />
                      </p>
                    )}
                    <h2 className="mb-4 font-serif text-3xl leading-snug text-primary transition-colors group-hover:text-primary/80">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="max-w-md font-light leading-relaxed text-foreground/70">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      <T en="Read more" gr="Διάβασε περισσότερα" />{" "}
                      <span className="h-px w-6 bg-accent" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <LovableSiteFooter logoSrc={logoSrc} />
    </div>
  );
}
