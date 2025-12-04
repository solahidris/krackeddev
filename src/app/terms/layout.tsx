import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Please read these terms carefully. Learn about our terms of service, user agreements, code of conduct, and intellectual property policies.",
  openGraph: {
    title: "Terms and Conditions | Kracked Devs",
    description: "Please read these terms carefully. Learn about our terms of service and user agreements.",
    url: "/terms",
    type: "website",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "Kracked Devs Terms and Conditions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms and Conditions",
    description: "Please read these terms carefully.",
    images: ["/images/og-image-twitter.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}



