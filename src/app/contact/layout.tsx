import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Have a question? We'd love to hear from you. Get in touch with the Kracked Devs team through our contact form or email.",
  openGraph: {
    title: "Contact Us | Kracked Devs",
    description: "Have a question? We'd love to hear from you. Get in touch with the Kracked Devs team.",
    url: "/contact",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact Us",
    description: "Have a question? We'd love to hear from you.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

