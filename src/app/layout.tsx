import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import MotionProvider from "@/components/providers/MotionProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VibeToApp - Transform Your App Ideas Into Reality",
  description: "AI-powered 9-step workflow to turn your app ideas into detailed specifications ready for development.",
  keywords: "app development, AI planning, project specifications, startup planning, idea validation",
  authors: [{ name: "VibeToApp" }],
  creator: "VibeToApp",
  publisher: "VibeToApp",
  metadataBase: new URL('https://vibetoapp.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "VibeToApp - Transform Your App Ideas Into Reality",
    description: "AI-powered 9-step workflow to turn your app ideas into detailed specifications ready for development.",
    url: 'https://vibetoapp.com',
    siteName: 'VibeToApp',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'VibeToApp - Transform Ideas into Concrete Plans',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "VibeToApp - Transform Your App Ideas Into Reality",
    description: "AI-powered 9-step workflow to turn your app ideas into detailed specifications ready for development.",
    images: ['/og-image.png'],
    creator: '@vibetoapp',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <MotionProvider>
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}