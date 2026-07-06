import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://carloschnouda.info",
    title: "Carlos Chnouda - Full Stack Engineer",
    description:
      "Full Stack Engineer building scalable web & mobile apps, CMS systems, and e-commerce platforms from architecture to deployment.",
    siteName: "Carlos Chnouda Portfolio",
    images: [
      {
        url: "/meta-image.jpg",
        width: 1200,
        height: 630,
        alt: "Carlos Chnouda - Full Stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Carlos Chnouda - Full Stack Engineer",
    description:
      "Full Stack Engineer building scalable web & mobile apps, CMS systems, and e-commerce platforms from architecture to deployment.",
    images: ["/meta-image.jpg"],
  },
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
