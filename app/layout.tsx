import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muhammad Shehzore — Portfolio",
  description: "AI Engineer & Full Stack Developer Portfolio",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-[#FAFAF8]`}
    >
      <body className="min-h-full flex flex-col bg-[#FAFAF8] text-neutral-900 w-full">
        {children}
        <Script
          src="https://www.theaxora.com/customwidget.min.js"
          data-key="sk_live_de63e270c58746b7"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}