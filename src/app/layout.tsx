import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 1. Define the Base URL (Critical for SEO/Socials)
// Uses localhost for dev, but respects your Vercel/Production URL later
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL 
  ? `https://${process.env.NEXT_PUBLIC_BASE_URL}` 
  : 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl), // ⚠️ REQUIRED for OpenGraph
  title: {
    default: "ADB - Agency Demo Build",
    template: "%s | ADB" // Apps "Post Title | ADB" automatically
  },
  description: "A high-performance, SEO-optimized content platform built with Next.js 16 and Sanity.",
  
  // 2. Default Social Sharing (Open Graph)
  openGraph: {
    title: "ADB - Agency Demo Build",
    description: "Scalable content architecture for modern agencies.",
    url: baseUrl,
    siteName: "ADB Agency Platform",
    locale: "en_US",
    type: "website",
    // Fallback image if a page doesn't have one
    images: [
      {
        url: "/og-default.png", // We will create this file in Step 2
        width: 1200,
        height: 630,
        alt: "ADB Platform Preview",
      },
    ],
  },

  // 3. Twitter Card Defaults
  twitter: {
    card: "summary_large_image",
    title: "ADB - Agency Demo Build",
    creator: "@youragency", 
  },

  // 4. Robot Instructions (Google Control)
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        {/* Navbar is an Async Server Component */}
        <Navbar />
        <main className="flex-1 bg-gray-50/50">
          {children}
        </main>
      </body>
    </html>
  );
}