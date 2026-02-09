import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Navbar } from "@/components/Navbar";
import GoogleAnalytics from "@/components/GoogleAnalytics";

import "./globals.css";

/* ===============================
   Fonts
================================ */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* ===============================
   Base URL (SEO / Social)
================================ */
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `https://${process.env.NEXT_PUBLIC_BASE_URL}`
  : "http://localhost:3000";

/* ===============================
   Metadata
================================ */
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),

  title: {
    default: "ADB - Agency Demo Build",
    template: "%s | ADB",
  },

  description:
    "A high-performance, SEO-optimized content platform built with Next.js 16 and Sanity.",

  openGraph: {
    title: "ADB - Agency Demo Build",
    description: "Scalable content architecture for modern agencies.",
    url: baseUrl,
    siteName: "ADB Agency Platform",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "ADB Platform Preview",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "ADB - Agency Demo Build",
    creator: "@youragency",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

/* ===============================
   Root Layout
================================ */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        {/* ✅ GA4 (client-safe, self-guarded) */}
        <GoogleAnalytics />

        {/* ✅ Async Server Component */}
        <Navbar />

        <main className="flex-1 bg-gray-50/50">{children}</main>
      </body>
    </html>
  );
}
