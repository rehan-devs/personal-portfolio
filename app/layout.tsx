import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Muhammad Rehan | Full Stack Developer",
  description:
    "Full Stack Developer specializing in React, Next.js, Node.js, and Python. Building pixel-perfect, high-performance web applications from Pakistan.",
  keywords: [
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Web Developer",
    "Frontend Developer",
    "Backend Developer",
    "Pakistan",
    "Freelancer",
    "Muhammad Rehan",
    "Portfolio",
    "TypeScript",
    "Node.js",
    "Python",
  ],
  authors: [{ name: "Muhammad Rehan" }],
  creator: "Muhammad Rehan",
  openGraph: {
    title: "Muhammad Rehan | Full Stack Developer",
    description:
      "Building pixel-perfect, high-performance web applications. Specializing in React, Next.js, Node.js, and Python.",
    url: "https://rehandevs.vercel.app",
    siteName: "Rehan.dev",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Rehan | Full Stack Developer",
    description:
      "Building pixel-perfect, high-performance web applications.",
    creator: "@rehandevs",
  },
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0a0a0b" />
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}