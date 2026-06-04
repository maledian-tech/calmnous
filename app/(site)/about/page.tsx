import {
  resolveAboutPhotoPath,
  resolvePublicLogoPath,
} from "@/lib/resolve-public-paths";

import { AboutApproach } from "@/components/lovable/AboutApproach";
import { AboutCredentials } from "@/components/lovable/AboutCredentials";
import { LovableAbout } from "@/components/lovable/LovableAbout";
import { LovableSiteFooter } from "@/components/lovable/LovableSiteFooter";
import { LovableSiteHeader } from "@/components/lovable/LovableSiteHeader";
import { PageCta } from "@/components/lovable/PageCta";

export const revalidate = 300;

export default function AboutPage() {
  const logoSrc = resolvePublicLogoPath();
  const photoSrc = resolveAboutPhotoPath();

  return (
    <main className="min-h-screen bg-background">
      <LovableSiteHeader logoSrc={logoSrc} bookingHref={null} />
      <LovableAbout photoSrc={photoSrc} />
      <AboutApproach />
      <AboutCredentials />
      <PageCta />
      <LovableSiteFooter logoSrc={logoSrc} />
    </main>
  );
}
