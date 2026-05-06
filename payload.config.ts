import path from 'path'
import { fileURLToPath } from 'url'
import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'
import { buildConfig } from 'payload'
import sharp from 'sharp'

const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [],
}

const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
}

const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'sortOrder', 'published'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'URL-friendly identifier (e.g. individual-therapy)',
      },
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Photo or illustration for the homepage services list.',
      },
    },
    {
      name: 'details',
      type: 'richText',
      admin: {
        description: 'Full description for future detail pages.',
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Lower numbers appear first on the homepage.',
      },
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'When enabled, appears on the public homepage.',
      },
    },
  ],
}

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const isProduction = process.env.NODE_ENV === 'production'
const payloadSecret =
  process.env.PAYLOAD_SECRET?.trim() ||
  (isProduction ? '' : 'calmnous-dev-only-secret-change-for-production-min-32')

if (isProduction && !payloadSecret) {
  throw new Error(
    'PAYLOAD_SECRET is required in production. Add it in Vercel: Project → Settings → Environment Variables (Production). Use a long random value (e.g. run: node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))").',
  )
}

const databaseUrl = resolveDatabaseUrl()

/** Trim BOM/quotes from pasted env vars so scheme detection works. */
function normalizeConnectionUrl(raw: string): string {
  let u = raw.trim().replace(/^\uFEFF/, '')
  if (
    (u.startsWith('"') && u.endsWith('"')) ||
    (u.startsWith("'") && u.endsWith("'"))
  ) {
    u = u.slice(1, -1).trim()
  }
  return u
}

/**
 * Vercel Postgres / Neon often set POSTGRES_URL; pooled URLs may include ?sslmode=require
 * (invalid for LibSQL — must use the Postgres adapter).
 * If production still has DATABASE_URL=file:... but POSTGRES_URL is set, prefer Postgres.
 */
function resolveDatabaseUrl(): string {
  const dbUrl = process.env.DATABASE_URL?.trim()
  const pgUrl = process.env.POSTGRES_URL?.trim()
  const prismaUrl = process.env.POSTGRES_PRISMA_URL?.trim()

  const isProd = process.env.NODE_ENV === 'production'
  const normalizedDb = dbUrl ? normalizeConnectionUrl(dbUrl) : ''
  const normalizedPg = pgUrl ? normalizeConnectionUrl(pgUrl) : ''
  const normalizedPrisma = prismaUrl ? normalizeConnectionUrl(prismaUrl) : ''

  if (
    isProd &&
    normalizedDb.toLowerCase().startsWith('file:') &&
    (normalizedPg || normalizedPrisma)
  ) {
    return normalizedPg || normalizedPrisma
  }

  for (const c of [normalizedDb, normalizedPg, normalizedPrisma]) {
    if (c) {
      return c
    }
  }
  return 'file:payload.db'
}

function isPostgresDatabaseUrl(url: string): boolean {
  if (!url) {
    return false
  }
  const lower = url.toLowerCase()
  return (
    /^postgres(ql)?:\/\//.test(lower) ||
    /^prisma\+postgres(ql)?:\/\//.test(lower)
  )
}

/** `pg` wants `postgres://`, not `prisma+postgres://`. */
function postgresPoolConnectionString(url: string): string {
  return url.replace(/^prisma\+/i, '')
}

if (
  isProduction &&
  /sslmode=/i.test(databaseUrl) &&
  !isPostgresDatabaseUrl(databaseUrl)
) {
  throw new Error(
    'DATABASE_URL includes sslmode= but is not a Postgres URL. Use postgres:// or postgresql:// (remove wrapping quotes). On Vercel, set DATABASE_URL or rely on POSTGRES_URL from the Postgres integration.',
  )
}

const postgresProdMigrations = [
  {
    name: '20260506_130355_initial',
    up: async (args: MigrateUpArgs) => {
      const { up } = await import('./migrations/20260506_130355_initial')
      return up(args)
    },
    down: async (args: MigrateDownArgs) => {
      const { down } = await import('./migrations/20260506_130355_initial')
      return down(args)
    },
  },
]

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Services],
  editor: lexicalEditor(),
  secret: payloadSecret,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: isPostgresDatabaseUrl(databaseUrl)
    ? postgresAdapter({
        pool: {
          connectionString: postgresPoolConnectionString(databaseUrl),
        },
        prodMigrations: postgresProdMigrations,
      })
    : sqliteAdapter({
        client: {
          url: databaseUrl,
        },
      }),
  sharp,
  plugins: [],
})
