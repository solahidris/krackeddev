import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Have a question? We'd love to hear from you. Get in touch with the Kracked Devs team through our contact form or email.",
  openGraph: {
    title: "Contact Us | Kracked Devs",
    description: "Have a question? We'd love to hear from you. Get in touch with the Kracked Devs team.",
    url: "/contact",
    type: "website",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "Contact Kracked Devs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us",
    description: "Have a question? We'd love to hear from you.",
    images: ["/images/og-image-twitter.png"],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}



