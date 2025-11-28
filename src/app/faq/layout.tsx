import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Kracked Devs hackathon, bootcamps, and community. Find answers to common questions about participation, prizes, and more.",
  openGraph: {
    title: "FAQ | Kracked Devs",
    description: "Frequently asked questions about Kracked Devs hackathon, bootcamps, and community.",
    url: "/faq",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "FAQ",
    description: "Frequently asked questions about Kracked Devs.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

