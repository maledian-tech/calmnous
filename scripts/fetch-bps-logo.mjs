/**
 * Fetches bps.org.uk homepage HTML and extracts the site-header inline logo <svg>,
 * saves public/logos/bps-logo-official.svg. May need updating if their markup changes.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outPath = path.join(root, "public/logos/bps-logo-official.svg");
const url = "https://www.bps.org.uk/";

const res = await fetch(url);
if (!res.ok) {
  console.error("Failed to fetch", url, res.status);
  process.exit(1);
}
const html = await res.text();

// Prefer logo link region: <a class="...header-logo..." ...><svg ...>
const linkIdx = html.search(/header-logo|site-header-logo|bps-logo/i);
const searchFrom = linkIdx >= 0 ? linkIdx : 0;
const slice = html.slice(searchFrom, searchFrom + 120_000);
const svgMatch = slice.match(/<svg\b[^>]*>[\s\S]*?<\/svg>/i);
if (!svgMatch) {
  console.error("Could not find inline <svg> near header logo in BPS homepage");
  process.exit(1);
}
let svg = svgMatch[0];

// Normalise fill="dark" (their CSS token) to a solid brand blue
svg = svg.replace(/\bfill="dark"/gi, 'fill="#003057"');

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, svg);
console.log("Wrote", path.relative(root, outPath));
