import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Your privacy matters to us. Learn how Kracked Devs collects, uses, and protects your personal information. Read our comprehensive privacy policy.",
  openGraph: {
    title: "Privacy Policy | Kracked Devs",
    description: "Your privacy matters to us. Learn how Kracked Devs collects, uses, and protects your personal information.",
    url: "/privacy",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy",
    description: "Your privacy matters to us. Learn how we protect your information.",
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


