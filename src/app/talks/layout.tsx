import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kracked Talks",
  description: "Hear from key figures in the industry. Learn about math & engineering, automation, and business value. Join our community talks featuring industry leaders and experts.",
  openGraph: {
    title: "Kracked Talks | Community Talks & Industry Insights",
    description: "Hear from key figures in the industry. Learn about math & engineering, automation, and business value.",
    url: "/talks",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kracked Talks",
    description: "Hear from key figures in the industry. Join our community talks.",
  },
};

export default function TalksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


