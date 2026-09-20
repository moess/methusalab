import type { Metadata } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const SITE_TITLE = "METHUSALAB — Digitale Produkt- und Workflow-Systeme";
const SITE_DESCRIPTION =
  "METHUSALAB entwickelt digitale Produkt- und Workflow-Systeme, die Teams im Alltag entlasten, wiederkehrende Arbeit reduzieren und aus komplexen Abläufen nutzbare Lösungen machen.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.methusalab.de"),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    url: "https://www.methusalab.de",
    siteName: "METHUSALAB",
    locale: "de_DE",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/assets/og-image.png",
        width: 2400,
        height: 1260,
        alt: "METHUSALAB — Digitale Produkt- und Workflow-Systeme",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/assets/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${manrope.variable} ${instrumentSerif.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Kaushan+Script&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
