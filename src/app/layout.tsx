import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Fiskio",
    template: "%s | Fiskio",
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
  authors: [{ name: "Fiskio" }],
  openGraph: {
    type: "website",
    locale: "ro_RO",
    siteName: "Fiskio",
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
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
