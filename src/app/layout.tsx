import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "METHUSALAB — Digitale Produkt- und Workflow-Systeme",
  description:
    "METHUSALAB entwickelt digitale Produkt- und Workflow-Systeme, die Teams im Alltag entlasten, wiederkehrende Arbeit reduzieren und aus komplexen Abläufen nutzbare Lösungen machen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={instrumentSerif.variable}>
      <body>{children}</body>
    </html>
  );
}
