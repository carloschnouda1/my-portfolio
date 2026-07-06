import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const SITE_URL = "https://www.carloschnouda.info";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Carlos Chnouda - Full Stack Engineer",
  description:
    "Full Stack Engineer building scalable web & mobile apps, CMS systems, and e-commerce platforms with Laravel, Next.js, TypeScript, React, and React Native — from architecture to deployment.",
  keywords: [
    "Full Stack Engineer",
    "Laravel",
    "Next.js",
    "TypeScript",
    "React",
    "React Native",
    "Web Development",
    "CMS",
    "E-commerce",
  ],
  authors: [{ name: "Carlos Chnouda" }],
  creator: "Carlos Chnouda",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: "Carlos Chnouda - Full Stack Engineer",
    description:
      "Full Stack Engineer building scalable web & mobile apps, CMS systems, and e-commerce platforms from architecture to deployment.",
    siteName: "Carlos Chnouda Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Carlos Chnouda - Full Stack Engineer",
    description:
      "Full Stack Engineer building scalable web & mobile apps, CMS systems, and e-commerce platforms from architecture to deployment.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d0e26",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
