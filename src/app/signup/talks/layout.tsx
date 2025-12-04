import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kracked Talks Signup",
  description: "Join our community talks and learn from industry experts. Register for access to exclusive talks on math & engineering, automation, and business value.",
  openGraph: {
    title: "Kracked Talks Signup | Community Talks Registration",
    description: "Join our community talks and learn from industry experts. Register for exclusive talks.",
    url: "/signup/talks",
    type: "website",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "Kracked Talks Signup" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kracked Talks Signup",
    description: "Join our community talks and learn from industry experts.",
    images: ["/images/og-image-twitter.png"],
  },
};

export default function TalksSignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}



