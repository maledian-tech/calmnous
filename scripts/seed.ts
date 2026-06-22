/**
 * Seeds the homepage services into Payload (SQLite/DB from env).
 * Reconciling: removes obsolete sample slugs, then upserts the current set
 * (creating missing ones, updating existing ones so reruns stay in sync).
 * New services get a cover image from existing public assets (replace in admin).
 *
 * Usage: npm run seed
 */

import { readFileSync, statSync } from 'fs'
import { basename, join } from 'path'

import { getPayload } from 'payload'

import config from '../payload.config.ts'

const COVER_PATH_BY_SLUG: Record<string, string> = {
  'face-to-face': join(process.cwd(), 'public/hero/hero-poster.jpg'),
  online: join(process.cwd(), 'public/practice/midpage-default.jpg'),
}

/** Old sample slugs to remove so a reseed reconciles to the current set. */
const OBSOLETE_SLUGS = [
  'individual-therapy',
  'couples-relationship-counselling',
  'walk-and-talk-sessions',
  'short-term-counselling',
] as const

const SAMPLE_SERVICES = [
  {
    title: 'Face to face',
    slug: 'face-to-face',
    summary:
      'In-person sessions in a calm, confidential setting — meeting together in the same room, at a pace that lets trust build.',
    subItems: [
      'Based in Northamptonshire — or meet in person anywhere by arrangement',
      'Walk-and-talk sessions, where gentle movement outdoors makes room for what is hard to say',
    ],
    sortOrder: 10,
    published: true as const,
  },
  {
    title: 'Online',
    slug: 'online',
    summary:
      'Secure video sessions from wherever you feel most at ease — the same steady, confidential support, without the travel.',
    subItems: ['Available anywhere in the EU & UK'],
    sortOrder: 20,
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

  // Remove obsolete sample services so the homepage reconciles to the new set.
  let removed = 0
  for (const slug of OBSOLETE_SLUGS) {
    const res = await payload.delete({
      collection: 'services',
      where: { slug: { equals: slug } },
    })
    removed += res.docs.length
  }

  let created = 0
  let updated = 0

  for (const row of SAMPLE_SERVICES) {
    const subItems = row.subItems.map((text) => ({ text }))

    const existing = await payload.find({
      collection: 'services',
      where: { slug: { equals: row.slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      await payload.update({
        collection: 'services',
        id: existing.docs[0].id,
        data: {
          title: row.title,
          summary: row.summary,
          subItems,
          sortOrder: row.sortOrder,
          published: row.published,
        },
      })
      updated += 1
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
        subItems,
        sortOrder: row.sortOrder,
        published: row.published,
        ...(coverId !== undefined ? { coverImage: coverId } : {}),
      },
    })
    created += 1
  }

  console.log(
    `[seed] services: ${created} created, ${updated} updated, ${removed} obsolete removed (${SAMPLE_SERVICES.length} definitions).`,
  )

  await payload.destroy()
}

await main()
