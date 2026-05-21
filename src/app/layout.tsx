import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk, Caveat } from "next/font/google";
import "./globals.css";

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

const monoFont = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

const caveatFont = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  title: "LEVEL 0",
  description: "Pick a finished portfolio. Click to edit. Export the code.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${displayFont.variable} ${monoFont.variable} ${caveatFont.variable} bg-background text-on-surface font-body-main antialiased`}>
        {children}
      </body>
    </html>
  );
}
