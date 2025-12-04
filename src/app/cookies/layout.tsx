import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How we use cookies on our platform. Learn about the types of cookies we use, how we use them, and how you can manage your cookie preferences.",
  openGraph: {
    title: "Cookie Policy | Kracked Devs",
    description: "How we use cookies on our platform. Learn about the types of cookies we use and how to manage them.",
    url: "/cookies",
    type: "website",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "Kracked Devs Cookie Policy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie Policy",
    description: "How we use cookies on our platform.",
    images: ["/images/og-image-twitter.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}



