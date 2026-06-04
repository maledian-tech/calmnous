import {
  resolveAboutPhotoPath,
  resolvePublicLogoPath,
} from "@/lib/resolve-public-paths";

import { LovableAbout } from "@/components/lovable/LovableAbout";
import { LovableSiteFooter } from "@/components/lovable/LovableSiteFooter";
import { LovableSiteHeader } from "@/components/lovable/LovableSiteHeader";

export const revalidate = 300;

export default function AboutPage() {
  const logoSrc = resolvePublicLogoPath();
  const photoSrc = resolveAboutPhotoPath();

  return (
    <main className="min-h-screen bg-background">
      <LovableSiteHeader logoSrc={logoSrc} bookingHref={null} />
      <LovableAbout photoSrc={photoSrc} />
      <LovableSiteFooter logoSrc={logoSrc} />
    </main>
  );
}
