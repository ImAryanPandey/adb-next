import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"; // Keeping these as base sans
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
    default: "Infinite Trenz - Future Tech & Digital Culture",
    template: "%s | Infinite Trenz",
  },

  description:
    "Navigating the future of technology, digital culture, and modern finance. Deep dives into what's next.",

  openGraph: {
    title: "Infinite Trenz",
    description: "Navigating the future of technology and culture.",
    url: baseUrl,
    siteName: "Infinite Trenz",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Infinite Trenz Preview",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Infinite Trenz",
    creator: "@infinitetrenz",
  },

  robots: {
    index: true,
    follow: true,
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-white text-gray-900`}
      >
        <GoogleAnalytics />
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}