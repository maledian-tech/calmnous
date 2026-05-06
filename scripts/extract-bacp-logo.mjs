/**
 * Downloads BACP public sprite (icons.svg) and extracts the #logo symbol into
 * public/logos/bacp-logo-official.svg — same asset their site uses in the header.
 * Adds embedded fills so it renders without BACP's CSS.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outPath = path.join(root, "public/logos/bacp-logo-official.svg");
const url = "https://www.bacp.co.uk/dst/images/icons.svg";

const res = await fetch(url);
if (!res.ok) {
  console.error("Failed to fetch", url, res.status);
  process.exit(1);
}
const s = await res.text();

const m = s.match(/<symbol id="logo"[^>]*>([\s\S]*?)<\/symbol>/);
if (!m) {
  console.error('Could not find <symbol id="logo"> in icons.svg');
  process.exit(1);
}
const openTag = m[0].slice(0, m[0].indexOf(">") + 1);
const vbMatch = openTag.match(/viewBox="([^"]+)"/);
const viewBox = vbMatch ? vbMatch[1] : "0 0 200 60";
const inner = m[1];

const out = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" role="img" aria-labelledby="bacpLogoTitle">
  <title id="bacpLogoTitle">British Association for Counselling and Psychotherapy</title>
  <style type="text/css">
    .logo__copy { fill: #37246b; }
    .logo__divider { fill: #c5a059; }
  </style>
  ${inner}
</svg>
`;

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, out);
console.log("Wrote", path.relative(root, outPath));
