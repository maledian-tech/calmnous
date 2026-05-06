/**
 * Seeds sample services into Payload (SQLite/DB from env).
 * Idempotent: skips slugs that already exist.
 * New services get a cover image from existing public assets (replace in admin).
 *
 * Usage: npm run seed
 */

import { readFileSync, statSync } from 'fs'
import { basename, join } from 'path'

import { getPayload } from 'payload'

import config from '../payload.config.ts'

const COVER_PATH_BY_SLUG: Record<string, string> = {
  'individual-therapy': join(process.cwd(), 'public/hero/hero-poster.jpg'),
  'couples-relationship-counselling': join(
    process.cwd(),
    'public/practice/midpage-default.jpg',
  ),
  'walk-and-talk-sessions': join(process.cwd(), 'public/hero/hero-poster.jpg'),
  'short-term-counselling': join(
    process.cwd(),
    'public/practice/midpage-default.jpg',
  ),
}

const SAMPLE_SERVICES = [
  {
    title: 'Individual therapy',
    slug: 'individual-therapy',
    summary:
      'A steady, confidential rhythm for unpacking stress, burnout, grief, spirals of worry, identity shifts—or simply life feeling louder than usual.',
    sortOrder: 10,
    published: true as const,
  },
  {
    title: 'Couples & relationship counselling',
    slug: 'couples-relationship-counselling',
    summary:
      'Conversations crafted to soften defensiveness, rebuild understanding, and help you practise new patterns with care—without rushing repair.',
    sortOrder: 20,
    published: true as const,
  },
  {
    title: 'Walk-and-talk sessions',
    slug: 'walk-and-talk-sessions',
    summary:
      'When sitting still feels too loaded, gentle movement outdoors can soften edges and make room for what is hard to say face-to-face in a clinic room.',
    sortOrder: 30,
    published: true as const,
  },
  {
    title: 'Short-term counselling',
    slug: 'short-term-counselling',
    summary:
      'Structured support with a clearer arc—often useful during transitions like relocation, new parenting, career change, or post-treatment recovery.',
    sortOrder: 40,
    published: true as const,
  },
] as const

async function main() {
  if (!process.env.PAYLOAD_SECRET) {
    console.error('Missing PAYLOAD_SECRET. Copy .env.example and set values.')
    process.exitCode = 1
    return
  }

  const payload = await getPayload({ config })

  let created = 0
  let skipped = 0

  for (const row of SAMPLE_SERVICES) {
    const existing = await payload.find({
      collection: 'services',
      where: { slug: { equals: row.slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      skipped += 1
      continue
    }

    let coverId: number | undefined
    const coverPath = COVER_PATH_BY_SLUG[row.slug]
    if (coverPath) {
      try {
        const buf = readFileSync(coverPath)
        const media = await payload.create({
          collection: 'media',
          data: {
            alt: `Homepage image — ${row.title}`,
          },
          file: {
            data: buf,
            mimetype: 'image/jpeg',
            name: basename(coverPath),
            size: statSync(coverPath).size,
          },
        })
        coverId = media.id as number
      } catch (err) {
        console.warn(`[seed] cover image skipped for ${row.slug}:`, err)
      }
    }

    await payload.create({
      collection: 'services',
      data: {
        title: row.title,
        slug: row.slug,
        summary: row.summary,
        sortOrder: row.sortOrder,
        published: row.published,
        ...(coverId !== undefined ? { coverImage: coverId } : {}),
      },
    })
    created += 1
  }

  console.log(
    `[seed] services: ${created} created, ${skipped} already present (${SAMPLE_SERVICES.length} definitions).`,
  )

  await payload.destroy()
}

await main()
