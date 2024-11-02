import type { Metadata } from "next";

import { cn } from "@/lib/utilities/cn";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import React from "react";

import { AdminBar } from "@/components/AdminBar";
import { Footer } from "@/components/Footer/Component";
import { Header } from "@/components/Header/Component";
import { LivePreviewListener } from "@/components/LivePreviewListener";
import { Providers } from "@/lib/providers";
import { InitTheme } from "@/lib/providers/Theme/InitTheme";
import { mergeOpenGraph } from "@/lib/utilities/mergeOpenGraph";
import { draftMode } from "next/headers";

import "./globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled } = await draftMode();

  return (
    <html
      className={cn(GeistSans.variable, GeistMono.variable)}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body className="flex flex-col min-h-screen">
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />
          <LivePreviewListener />

          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SERVER_URL || "https://payloadcms.com"
  ),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: "summary_large_image",
    creator: "@payloadcms",
  },
};
