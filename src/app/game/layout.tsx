import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Game Zone | Kracked Devs",
  description:
    "Experimental games built by Kracked Devs. Test, play, and break things.",
  openGraph: {
    title: "Game Zone | Kracked Devs",
    description:
      "Experimental games built by Kracked Devs. Test, play, and break things.",
    url: "/game",
    type: "website",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "Kracked Devs Game Zone" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Game Zone | Kracked Devs",
    description: "Experimental games built by Kracked Devs. Test, play, and break things.",
    images: ["/images/og-image-twitter.png"],
  },
};

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
