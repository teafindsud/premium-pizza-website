import type { Metadata, Viewport } from "next";
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
  title: "Premium Pizza — Artisan Wood-Fired Pizza",
  description:
    "Hand-stretched, wood-fired artisan pizzas crafted with premium ingredients. Order now or explore our menu.",
  keywords: ["pizza", "artisan pizza", "wood-fired", "premium pizza"],
  openGraph: {
    title: "Premium Pizza — Artisan Wood-Fired Pizza",
    description:
      "Hand-stretched, wood-fired artisan pizzas crafted with premium ingredients.",
    type: "website",
    siteName: "Premium Pizza",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#140A07",
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
