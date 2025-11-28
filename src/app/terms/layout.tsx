import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Please read these terms carefully. Learn about our terms of service, user agreements, code of conduct, and intellectual property policies.",
  openGraph: {
    title: "Terms and Conditions | Kracked Devs",
    description: "Please read these terms carefully. Learn about our terms of service and user agreements.",
    url: "/terms",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Terms and Conditions",
    description: "Please read these terms carefully.",
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



