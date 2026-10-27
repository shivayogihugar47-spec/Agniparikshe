import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Agniparikshe - Put your AI-built app through the fire",
  description:
    "Agniparikshe attacks your code the way a hacker would, proves what is broken, fixes it, and tests the fix. Free and open source security scanner for AI-built apps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-background text-text font-sans flex flex-col selection:bg-brand-tint selection:text-brand">
        {children}
      </body>
    </html>
  );
}
