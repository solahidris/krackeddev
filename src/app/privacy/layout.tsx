import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Your privacy matters to us. Learn how Kracked Devs collects, uses, and protects your personal information. Read our comprehensive privacy policy.",
  openGraph: {
    title: "Privacy Policy | Kracked Devs",
    description: "Your privacy matters to us. Learn how Kracked Devs collects, uses, and protects your personal information.",
    url: "/privacy",
    type: "website",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "Kracked Devs Privacy Policy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy",
    description: "Your privacy matters to us. Learn how we protect your information.",
    images: ["/images/og-image-twitter.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}



