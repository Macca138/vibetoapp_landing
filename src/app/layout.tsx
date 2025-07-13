import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "VibeToApp - Transform Ideas into Concrete Plans",
  description: "Stop jumping into development without a plan. Our AI-powered 9-step methodology guides you from rough concepts to detailed, actionable project specifications.",
  keywords: "app development, AI planning, project specifications, startup planning",
  authors: [{ name: "VibeToApp" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}