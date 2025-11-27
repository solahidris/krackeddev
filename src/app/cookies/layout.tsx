import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How we use cookies on our platform. Learn about the types of cookies we use, how we use them, and how you can manage your cookie preferences.",
  openGraph: {
    title: "Cookie Policy | Kracked Devs",
    description: "How we use cookies on our platform. Learn about the types of cookies we use and how to manage them.",
    url: "/cookies",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Cookie Policy",
    description: "How we use cookies on our platform.",
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


