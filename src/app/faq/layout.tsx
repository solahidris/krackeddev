import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Kracked Devs hackathon, bootcamps, and community. Find answers to common questions about participation, prizes, and more.",
  openGraph: {
    title: "FAQ | Kracked Devs",
    description: "Frequently asked questions about Kracked Devs hackathon, bootcamps, and community.",
    url: "/faq",
    type: "website",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "Kracked Devs FAQ" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ",
    description: "Frequently asked questions about Kracked Devs.",
    images: ["/images/og-image-twitter.png"],
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

