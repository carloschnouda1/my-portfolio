import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const SITE_URL = "https://www.carloschnouda.info";
const GA_MEASUREMENT_ID = "G-M14NHXXD86";

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
  verification: {
    google: "-t2I8Pq8qb-l4GqcfYQ_XaqbulEsT6y8Zcv9UpUxbEI",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: "Carlos Chnouda - Full Stack Engineer",
    description:
      "Full Stack Engineer building scalable web & mobile apps, CMS systems, and e-commerce platforms from architecture to deployment.",
    siteName: "Carlos Chnouda Portfolio",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Carlos Chnouda — Full Stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Carlos Chnouda - Full Stack Engineer",
    description:
      "Full Stack Engineer building scalable web & mobile apps, CMS systems, and e-commerce platforms from architecture to deployment.",
    images: ["/og.png"],
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
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
