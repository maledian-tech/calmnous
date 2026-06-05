import { LanguageProvider } from "@/components/LanguageProvider";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <div className="flex min-h-full flex-col bg-background text-foreground">
        {children}
      </div>
    </LanguageProvider>
  );
}
