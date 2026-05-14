import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "posts" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "slug" varchar NOT NULL,
      "excerpt" varchar,
      "content" jsonb,
      "published_at" timestamp(3) with time zone,
      "published" boolean DEFAULT false,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    ALTER TABLE "payload_locked_documents_rels"
      ADD COLUMN IF NOT EXISTS "posts_id" integer;

    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint
        WHERE conname = 'payload_locked_documents_rels_posts_fk'
      ) THEN
        ALTER TABLE "payload_locked_documents_rels"
          ADD CONSTRAINT "payload_locked_documents_rels_posts_fk"
          FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
      END IF;
    END $$;

    CREATE UNIQUE INDEX IF NOT EXISTS "posts_slug_idx"
      ON "posts" USING btree ("slug");
    CREATE INDEX IF NOT EXISTS "posts_updated_at_idx"
      ON "posts" USING btree ("updated_at");
    CREATE INDEX IF NOT EXISTS "posts_created_at_idx"
      ON "posts" USING btree ("created_at");
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_posts_id_idx"
      ON "payload_locked_documents_rels" USING btree ("posts_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels"
      DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_posts_fk";

    ALTER TABLE "payload_locked_documents_rels"
      DROP COLUMN IF EXISTS "posts_id";

    DROP TABLE IF EXISTS "posts";
  `)
}
