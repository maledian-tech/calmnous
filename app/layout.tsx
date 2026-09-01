import type { Metadata } from "next";
import { Cormorant_Garamond, EB_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

// Cormorant Garamond has no Greek glyphs; EB Garamond (a closely-matched
// Garamond) does. It sits after Cormorant Garamond in the serif stack so Latin
// keeps Cormorant Garamond and only Greek characters fall through to it.
const ebGaramondGreek = EB_Garamond({
  variable: "--font-serif-greek",
  subsets: ["greek"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const inter = Inter({
  variable: "--font-sans-body",
  subsets: ["latin", "greek"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default:
      "Calmnous | Integrative counselling & psychotherapy by Sotirios Batsos",
    template: "%s | Calmnous — Sotirios Batsos",
  },
  description:
    "Calmnous is the integrative counselling and psychotherapy practice of Sotirios Batsos — a calm, respectful space, face-to-face in Northamptonshire, UK, and online in the UK & Greece.",
  applicationName: "Calmnous",
  authors: [{ name: "Sotirios Batsos" }],
  creator: "Sotirios Batsos",
  publisher: "Sotirios Batsos",
  openGraph: {
    title:
      "Calmnous | Integrative counselling & psychotherapy by Sotirios Batsos",
    description:
      "Integrative counselling and psychotherapy with Sotirios Batsos — face-to-face in Northamptonshire, UK, and online in the UK & Greece.",
    siteName: "Calmnous",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} ${ebGaramondGreek.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
