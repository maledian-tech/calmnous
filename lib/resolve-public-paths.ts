import { existsSync } from "fs";
import path from "path";

const LOGO_CANDIDATES = ["calmnous-logo.jpeg", "logo.png"] as const;

export function resolvePublicLogoPath(): string | null {
  for (const name of LOGO_CANDIDATES) {
    const full = path.join(process.cwd(), "public", name);
    if (existsSync(full)) return `/${name}`;
  }
  return null;
}
