import path from 'path'
import { fileURLToPath } from 'url'
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

const databaseUrl = process.env.DATABASE_URL?.trim() || 'file:payload.db'

function isPostgresDatabaseUrl(url: string): boolean {
  const lower = url.toLowerCase()
  return lower.startsWith('postgres://') || lower.startsWith('postgresql://')
}

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
          connectionString: databaseUrl,
        },
      })
    : sqliteAdapter({
        client: {
          url: databaseUrl,
        },
      }),
  sharp,
  plugins: [],
})
