import { LanguageProvider } from "@/components/LanguageProvider";
import { SiteTransition } from "@/components/SiteTransition";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Calmnous",
  description:
    "Integrative counselling and psychotherapy by Sotirios Batsos — in person in Northamptonshire and online across the EU & UK.",
  founder: {
    "@type": "Person",
    name: "Sotirios Batsos",
    jobTitle: "Integrative counsellor & psychotherapist",
  },
  provider: {
    "@type": "Person",
    name: "Sotirios Batsos",
  },
  areaServed: ["United Kingdom", "European Union"],
  knowsAbout: ["Counselling", "Psychotherapy", "Integrative therapy"],
};

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SiteTransition>{children}</SiteTransition>
    </LanguageProvider>
  );
}
