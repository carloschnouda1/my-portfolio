import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";

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
    url: "https://carloschnouda.info",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            try {
              const savedTheme = localStorage.getItem('theme');
              let theme = 'system'; // Default to system
              
              if (savedTheme && (savedTheme === 'system' || savedTheme === 'light' || savedTheme === 'dark')) {
                theme = savedTheme;
              }
              
              // Determine the actual display theme
              let displayTheme;
              if (theme === 'system') {
                displayTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              } else {
                displayTheme = theme;
              }
              
              document.documentElement.setAttribute('data-theme', displayTheme);
              if (displayTheme === 'light') {
                document.documentElement.style.setProperty('--background', '#ffffff');
                document.documentElement.style.setProperty('--foreground', '#1a1a1a');
                document.documentElement.style.setProperty('--primary', '#a855f7');
                document.documentElement.style.setProperty('--secondary', '#667eea');
                document.documentElement.style.setProperty('--accent', '#4facfe');
              } else {
                document.documentElement.style.setProperty('--background', '#0a0a0a');
                document.documentElement.style.setProperty('--foreground', '#ededed');
                document.documentElement.style.setProperty('--primary', '#a855f7');
                document.documentElement.style.setProperty('--secondary', '#667eea');
                document.documentElement.style.setProperty('--accent', '#4facfe');
              }
            } catch (e) {}
          `}
        </Script>
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
