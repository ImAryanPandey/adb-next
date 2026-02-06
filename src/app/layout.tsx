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

export const metadata: Metadata = {
  title: {
    default: "ADB - Agency Demo Build",
    template: "%s | ADB"
  },
  description: "High-performance Next.js 16 Content Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        {/* Navbar is an Async Server Component, Next.js 16 handles this natively now */}
        <Navbar />
        <main className="flex-1 bg-gray-50/50">
          {children}
        </main>
      </body>
    </html>
  );
}