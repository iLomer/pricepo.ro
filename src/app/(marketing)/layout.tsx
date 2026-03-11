import type { Metadata } from "next";
import { Analytics } from "@/components/landing/Analytics";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

const siteUrl = "https://prevo.ro";
const title = "Prevo — Educatie fiscala pentru PFA si SRL";
const description =
  "Invata sa iti gestionezi singur taxele. Calendar fiscal personalizat, estimator taxe, ghiduri declaratii PFA si SRL. Fara contabil.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "fara contabil pfa",
    "declaratie unica pfa",
    "taxe pfa",
    "calculator taxe pfa",
    "educatie fiscala",
    "PFA",
    "SRL",
    "D212",
    "declaratie unica",
    "fiscal",
    "contabilitate PFA",
    "taxe freelancer",
    "norma de venit",
    "sistem real",
  ],
  authors: [{ name: "Prevo" }],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: siteUrl,
    siteName: "Prevo",
    title,
    description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Prevo — Educatie fiscala pentru PFA si SRL",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Prevo",
  url: siteUrl,
  description,
};

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      {children}
      <Footer />
      <Analytics />
    </div>
  );
}
