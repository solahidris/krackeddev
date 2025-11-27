import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Kracked Devs",
  description: "Building the future of tech, one line of code at a time. Learn about our mission, values, and community of 500+ developers who believe in turning ideas into reality.",
  openGraph: {
    title: "About Kracked Devs | Our Mission & Values",
    description: "Building the future of tech, one line of code at a time. Learn about our mission, values, and community.",
    url: "/about",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "About Kracked Devs",
    description: "Building the future of tech, one line of code at a time.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


