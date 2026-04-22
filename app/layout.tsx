import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "leaflet/dist/leaflet.css";
import "./globals.css";

const serif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sans = Jost({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Mein Reiseblog",
  description: "Ein persönliches Reisetagebuch mit Karte, Bildern, Audio und Geschichten.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${serif.variable} ${sans.variable}`}>{children}</body>
    </html>
  );
}