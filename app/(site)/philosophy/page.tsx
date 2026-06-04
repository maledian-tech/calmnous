import { resolvePublicLogoPath } from "@/lib/resolve-public-paths";

import { LovablePhilosophy } from "@/components/lovable/LovablePhilosophy";
import { LovableSiteFooter } from "@/components/lovable/LovableSiteFooter";
import { LovableSiteHeader } from "@/components/lovable/LovableSiteHeader";

export const revalidate = 300;

export default function PhilosophyPage() {
  const logoSrc = resolvePublicLogoPath();

  return (
    <main className="min-h-screen bg-background">
      <LovableSiteHeader logoSrc={logoSrc} bookingHref={null} />
      <LovablePhilosophy />
      <LovableSiteFooter logoSrc={logoSrc} />
    </main>
  );
}
