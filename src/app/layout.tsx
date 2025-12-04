import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { SupabaseProvider } from "./context/SupabaseContext";
import { GitResumeProvider } from "./context/GitResumeContext";
import { GitResumeLoginModal } from "@/components/GitResumeLoginModal";
import { Toaster } from "sonner";
import { MusicPlayer } from "@/components/game/MusicPlayer";
import { SoundToggle } from "@/components/game/SoundToggle";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://krackeddevs.com/"
  ),
  title: {
    default: "Kracked Devs",
    template: "%s | Kracked Devs",
  },
  description:
    "A community of cracked developers who want to level up together. Join our bootcamps, hackathons, and community talks.",
  keywords: [
    "developer community",
    "coding bootcamp",
    "web development",
    "programming",
    "tech community",
    "developer education",
  ],
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
    description:
      "A community of cracked developers who want to level up together. Join our bootcamps, hackathons, and community talks.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kracked Devs - A Community of Cracked Developers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kracked Devs - A Community of Cracked Developers",
    description:
      "A community of cracked developers who want to level up together.",
    images: ["/images/og-image-twitter.png"],
    creator: "@KrackedDevs",
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
        <SupabaseProvider>
          <GitResumeProvider>
            <MusicPlayer startPlaying={true} />
            <SoundToggle />
            <Navbar />
            <div className="flex-grow">{children}</div>
            {/* <Footer /> */}
            <Toaster theme="dark" position="top-center" offset={16} />
            <GitResumeLoginModal />
          </GitResumeProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
