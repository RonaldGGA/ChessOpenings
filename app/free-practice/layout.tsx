import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Free Practice Board - ChessMaster",
  description:
    "Interactive chess practice board with real-time Stockfish analysis. Practice openings, get move suggestions, and improve your chess strategy with professional training tools.",
  keywords:
    "chess practice, free chess board, Stockfish analysis, chess training, interactive chess, move analysis",
  openGraph: {
    title: "Free Chess Practice Board - ChessMaster",
    description:
      "Practice chess openings with real-time analysis and professional training tools",
    images: [
      {
        url: "/og-practice.jpg",
        width: 1200,
        height: 630,
        alt: "ChessMaster Practice Board",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
