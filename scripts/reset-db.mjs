/**
 * Deletes the local SQLite file used by Payload (default: payload.db).
 * On Windows, EBUSY means another process still has the file open — stop `next dev` first.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

function sqlitePathFromDatabaseUrl() {
  const raw = process.env.DATABASE_URL?.trim();
  if (!raw || !raw.startsWith("file:")) {
    return path.join(root, "payload.db");
  }
  // file:payload.db | file:relative.db | file:/C:/abs.db
  const rest = raw.slice("file:".length);
  if (path.isAbsolute(rest)) {
    return rest;
  }
  return path.join(root, rest);
}

const dbFile = sqlitePathFromDatabaseUrl();

try {
  fs.unlinkSync(dbFile);
  console.log(`Removed ${path.relative(root, dbFile) || dbFile}`);
  process.exit(0);
} catch (e) {
  if (e && typeof e === "object" && e.code === "ENOENT") {
    console.log("No database file to remove:", path.relative(root, dbFile) || dbFile);
    process.exit(0);
  }
  if (e && typeof e === "object" && e.code === "EBUSY") {
    console.error(
      [
        `Cannot delete ${path.relative(root, dbFile)} — file is in use (EBUSY).`,
        "Stop the dev server (next dev), close Payload/admin tabs, then run: npm run db:reset",
      ].join("\n"),
    );
    process.exit(1);
  }
  throw e;
}
