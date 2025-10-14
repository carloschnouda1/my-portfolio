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
  title: "Carlos Chnouda - Full Stack Web Developer",
  description: "Full Stack Web Developer with 4 years of experience building dynamic, responsive web applications. Skilled in both front-end and back-end technologies.",
  keywords: ["Full Stack Developer", "Web Development", "React", "Next.js", "Laravel", "PHP", "JavaScript"],
  authors: [{ name: "Carlos Chnouda" }],
  creator: "Carlos Chnouda",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://carloschnouda.com",
    title: "Carlos Chnouda - Full Stack Web Developer",
    description: "Full Stack Web Developer with 4 years of experience building dynamic, responsive web applications.",
    siteName: "Carlos Chnouda Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Carlos Chnouda - Full Stack Web Developer",
    description: "Full Stack Web Developer with 4 years of experience building dynamic, responsive web applications.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
