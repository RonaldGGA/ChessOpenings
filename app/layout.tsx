import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "./providers/authProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ChessMaster - Master Chess Openings with Professional Tools",
  description: "Free chess opening training platform with real-time analysis, interactive practice board, and comprehensive opening database. Improve your chess strategy with Stockfish analysis and professional tools.",
  keywords: "chess, chess openings, chess training, chess analysis, Stockfish, chess practice, chess database, ECO openings, chess strategy",
  authors: [{ name: "ChessMaster" }],
  creator: "ChessMaster",
  publisher: "ChessMaster",
  
  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://chess-openings-indol.vercel.app",
    siteName: "ChessMaster",
    title: "ChessMaster - Master Chess Openings with Professional Tools",
    description: "Free chess opening training platform with real-time analysis and comprehensive opening database.",
    images: [
      {
        url: "og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ChessMaster - Chess Opening Training Platform",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "ChessMaster - Master Chess Openings",
    description: "Free chess opening training platform with real-time analysis and comprehensive opening database.",
    images: ["og-image.jpg"],
    creator: "@chessmaster",
  },

  // Additional SEO
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

  // Manifest for PWA
  manifest: "/manifest.json",

  // Icons
  icons: {
    icon: [
      { url: "favicon.ico" },
      { url: "icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "apple-icon.png" },
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "apple-touch-icon.png",
      },
    ],
  },

  // Verification (add your own when available)
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },

  // Other important meta
  category: "games",
  classification: "chess training platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to important domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={process.env.NEXT_PUBLIC_BASE_URL || "https://chess-openings-indol.vercel.app"} />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#0f172a" />
        <meta name="msapplication-TileColor" content="#0f172a" />
        
        {/* Viewport optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <AuthProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-linear-to-br from-slate-900 via-purple-900 to-slate-900`}
        >
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}