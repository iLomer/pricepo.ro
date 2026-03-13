import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { FeedbackBubble } from "@/components/feedback/FeedbackBubble";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Prevo",
    template: "%s | Prevo",
  },
  icons: {
    icon: "/icon.svg",
  },
  description:
    "Prima platforma de educatie fiscala pentru PFA si SRL din Romania. " +
    "Calendar fiscal personalizat, estimator taxe, ghiduri declaratii.",
  keywords: [
    "PFA",
    "SRL",
    "taxe",
    "declaratie unica",
    "D212",
    "fiscal",
    "contabilitate PFA",
    "fara contabil",
  ],
  authors: [{ name: "Prevo" }],
  metadataBase: new URL("https://prevo.ro"),
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: "https://prevo.ro",
    siteName: "Prevo",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <head>
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="8e8347ae-4263-45a1-b36a-8ed18dc8a5b6"
          strategy="afterInteractive"
        />
      </head>
      <body className="antialiased">
        {children}
        <FeedbackBubble />
      </body>
    </html>
  );
}
