import { resolvePublicLogoPath } from "@/lib/resolve-public-paths";

import { LovablePhilosophy } from "@/components/lovable/LovablePhilosophy";
import { LovableSiteFooter } from "@/components/lovable/LovableSiteFooter";
import { LovableSiteHeader } from "@/components/lovable/LovableSiteHeader";
import { PageCta } from "@/components/lovable/PageCta";
import { PhilosophyPillars } from "@/components/lovable/PhilosophyPillars";
import { PhilosophyProcess } from "@/components/lovable/PhilosophyProcess";

export const revalidate = 300;

export default function PhilosophyPage() {
  const logoSrc = resolvePublicLogoPath();

  return (
    <main className="min-h-screen bg-background">
      <LovableSiteHeader logoSrc={logoSrc} bookingHref={null} />
      <LovablePhilosophy />
      <PhilosophyPillars />
      <PhilosophyProcess />
      <PageCta />
      <LovableSiteFooter logoSrc={logoSrc} />
    </main>
  );
}
