import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join Our Team",
  description: "We're building something special. Check back soon for exciting opportunities for talented developers. Join our community to stay updated on job openings.",
  openGraph: {
    title: "Join Our Team | Kracked Devs Careers",
    description: "We're building something special. Check back soon for exciting opportunities for talented developers.",
    url: "/jobs",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Join Our Team",
    description: "We're building something special. Check back soon for opportunities.",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function JobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

