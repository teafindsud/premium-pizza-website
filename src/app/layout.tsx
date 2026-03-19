import type { Metadata } from "next";
import { Inter, Playfair_Display, Great_Vibes } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  variable: "--font-cursive",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Pizza Galeria - Premium Artisan Pizza",
  description: "Experience the art of artisanal pizza at Pizza Galeria. Wood-fired, hand-stretched, and locally sourced. Every slice tells a story.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} ${greatVibes.variable} font-sans antialiased`}
      >
        <style dangerouslySetInnerHTML={{
          __html: `
            @media (max-width: 768px) {
              body {
                background-color: #FDF8F3 !important;
              }
            }
          `
        }} />
        <Header />
        {children}
      </body>
    </html>
  );
}
