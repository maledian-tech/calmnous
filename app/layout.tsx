import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const inter = Inter({
  variable: "--font-sans-body",
  subsets: ["latin"],
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
    "Calmnous is the integrative counselling and psychotherapy practice of Sotirios Batsos — a calm, respectful space, in person in Northamptonshire and online across the EU & UK.",
  applicationName: "Calmnous",
  authors: [{ name: "Sotirios Batsos" }],
  creator: "Sotirios Batsos",
  publisher: "Sotirios Batsos",
  openGraph: {
    title:
      "Calmnous | Integrative counselling & psychotherapy by Sotirios Batsos",
    description:
      "Integrative counselling and psychotherapy with Sotirios Batsos — in person in Northamptonshire and online across the EU & UK.",
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
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
