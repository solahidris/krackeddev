import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://kracked-dev.com'),
  title: {
    default: "Kracked Devs",
    template: "%s | Kracked Devs"
  },
  description: "A community of cracked developers who want to level up together. Join our bootcamps, hackathons, and community talks.",
  keywords: ["developer community", "coding bootcamp", "web development", "programming", "tech community", "developer education"],
  authors: [{ name: "Kracked Devs" }],
  creator: "Kracked Devs",
  publisher: "Kracked Devs",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Kracked Devs",
    title: "Kracked Devs - A Community of Cracked Developers",
    description: "A community of cracked developers who want to level up together. Join our bootcamps, hackathons, and community talks.",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Kracked Devs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kracked Devs - A Community of Cracked Developers",
    description: "A community of cracked developers who want to level up together.",
    images: ["/android-chrome-512x512.png"],
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
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          "min-h-screen bg-background font-mono antialiased flex flex-col"
        )}
      >
        <Navbar />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
