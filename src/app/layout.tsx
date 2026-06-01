import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GlowUp — Inglés para profesionales de belleza",
  description: "Aprende inglés para recepción de clínicas de belleza. Ejercicios diarios, frases útiles y pronunciación.",
  metadataBase: new URL("https://glowup.franciscocucullu.com"),
  openGraph: {
    title: "GlowUp",
    description: "English for beauty clinic professionals — daily exercises, pronunciation practice, and essential phrases for reception, appointments and client care.",
    url: "https://glowup.franciscocucullu.com",
    siteName: "GlowUp",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GlowUp",
    description: "English for beauty clinic professionals — daily exercises, pronunciation practice, and essential phrases.",
    images: ["/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#c4956a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col" style={{ background: '#fdf8f5', color: '#3e2723' }}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
