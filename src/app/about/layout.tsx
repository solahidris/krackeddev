import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Kracked Devs",
  description: "Building the future of tech, one line of code at a time. Learn about our mission, values, and community of 500+ developers who believe in turning ideas into reality.",
  openGraph: {
    title: "About Kracked Devs | Our Mission & Values",
    description: "Building the future of tech, one line of code at a time. Learn about our mission, values, and community.",
    url: "/about",
    type: "website",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "About Kracked Devs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Kracked Devs",
    description: "Building the future of tech, one line of code at a time.",
    images: ["/images/og-image-twitter.png"],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}



