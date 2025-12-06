import React from "react";
import type { Metadata, Viewport } from "next";
import { twMerge } from "tailwind-merge";
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import "@/styles/globals.css";
import "@/styles/animations.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { organizationSchema, websiteSchema, generateSchemaScript } from '@/lib/seo/schema';

// ================================================================
// Root Layout Metadata
// ================================================================
// Note: 子页面会通过各自的 layout.tsx 覆盖这些默认值
// ================================================================

export const metadata: Metadata = {
  title: "AmbigramGen.com - Free Ambigram Generator | Different Length Words Supported",
  description: "The most powerful free ambigram generator supporting different length word combinations, optimized for tattoo design. No watermark, unlimited use, high-quality SVG/PNG export.",
  keywords: "ambigram generator, free ambigram generator, ambigram maker, tattoo design, different length words, rotational ambigram, flip text generator, ambigram creator online",
  openGraph: {
    title: "AmbigramGen.com - Free Ambigram Generator",
    description: "Create stunning ambigrams with different length words - perfect for tattoos, logos, and artistic designs",
    type: "website",
    locale: "en_US",
  },
};

// ================================================================
// Viewport Configuration (Next.js 14+ 要求单独 export)
// ================================================================
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: generateSchemaScript(organizationSchema, websiteSchema)
          }}
        />
      </head>
      <body
        className={twMerge("font-sans", "bg-black text-white antialiased")}
        suppressHydrationWarning
      >
        <Header />
        <main className="min-h-screen">
          {children}
          {process.env.NODE_ENV === "production" && <GoogleAnalytics />}

        </main>
        <Footer />
      </body>
    </html>
  );
}
