import { LanguageProvider } from "@/components/LanguageProvider";
import { SiteTransition } from "@/components/SiteTransition";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <SiteTransition>{children}</SiteTransition>
    </LanguageProvider>
  );
}
