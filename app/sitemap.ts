import type { MetadataRoute } from "next";
import { getPayload } from "payload";

import config from "@payload-config";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/book`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/philosophy`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/journal`, changeFrequency: "weekly", priority: 0.7 },
  ];

  try {
    const payload = await getPayload({ config });
    const posts = await payload.find({
      collection: "posts",
      where: { published: { equals: true } },
      limit: 1000,
      depth: 0,
      select: { slug: true, updatedAt: true },
    });
    for (const post of posts.docs) {
      if (!post.slug) continue;
      pages.push({
        url: `${SITE_URL}/journal/${post.slug}`,
        lastModified: post.updatedAt,
        changeFrequency: "yearly",
        priority: 0.6,
      });
    }
  } catch {
    // Database unavailable — still serve the static pages.
  }

  return pages;
}
