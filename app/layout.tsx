import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import AuthProvider from "@/providers/authProvider";
import { Navigation } from "@/components/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ChessMaster - Master Chess Openings with Professional Tools",
    template: "%s",
  },
  description:
    "Free chess opening training platform with real-time analysis, interactive practice board, and comprehensive opening database. Improve your chess strategy with Stockfish analysis and professional tools.",
  keywords:
    "chess, chess openings, chess training, chess analysis, Stockfish, chess practice, chess database, ECO openings, chess strategy",
  authors: [{ name: "ChessMaster" }],
  creator: "ChessMaster",
  publisher: "ChessMaster",

  openGraph: {
    type: "website",
    locale: "en_US",
    url:
      process.env.NEXT_PUBLIC_BASE_URL ||
      "https://chess-openings-indol.vercel.app",
    siteName: "ChessMaster",
    title: "ChessMaster - Master Chess Openings with Professional Tools",
    description:
      "Free chess opening training platform with real-time analysis and comprehensive opening database.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ChessMaster - Chess Opening Training Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "ChessMaster - Master Chess Openings",
    description:
      "Free chess opening training platform with real-time analysis and comprehensive opening database.",
    images: ["/og-image.jpg"],
    creator: "@chessmaster",
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

  manifest: "/manifest.json",

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/apple-touch-icon.png",
      },
    ],
  },

  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },

  category: "games",
  classification: "chess training platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isProduction = process.env.NODE_ENV === "production";

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />

        <link
          rel="canonical"
          href={
            process.env.NEXT_PUBLIC_BASE_URL ||
            "https://chess-openings-indol.vercel.app"
          }
        />

        <meta name="theme-color" content="#0f172a" />
        <meta name="msapplication-TileColor" content="#0f172a" />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <meta name="google" content="notranslate" />

        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-linear-to-br from-slate-900 via-purple-900 to-slate-900`}
      >
        <AuthProvider>
          <Navigation />
          {children}
        </AuthProvider>
      </body>

      {/* Analytics*/}
      {isProduction && (
        <>
          <GoogleTagManager
            gtmId={process.env.NEXT_PUBLIC_GTM_ID || "GTM-NRHT8WVS"}
          />
          <GoogleAnalytics
            gaId={process.env.NEXT_PUBLIC_GA_ID || "G-0L0GZHZ3ZW"}
          />
        </>
      )}
    </html>
  );
}
