import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join the Kracked Dev Community",
  description: "Connect with 500+ developers and level up together. Get access to exclusive Discord community, weekly talks, networking events, and early access to bootcamps and hackathons.",
  openGraph: {
    title: "Join the Kracked Dev Community",
    description: "Connect with 500+ developers and level up together. Get access to exclusive community benefits.",
    url: "/join",
    type: "website",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "Join Kracked Devs Community" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Join the Kracked Dev Community",
    description: "Connect with 500+ developers and level up together.",
    images: ["/images/og-image-twitter.png"],
  },
};

export default function JoinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}



