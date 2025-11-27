import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kracked Hackathon",
  description: "Go crazy. Win AI credits. Grand Prize: RM 1,200 in AI Credits. Earn points for submissions, bug reports, and community help. Top 10 get interviewed automatically.",
  openGraph: {
    title: "Kracked Hackathon | Win AI Credits & Get Hired",
    description: "Go crazy. Win AI credits. Grand Prize: RM 1,200 in AI Credits. Earn points and get interviewed.",
    url: "/hackathon",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kracked Hackathon",
    description: "Go crazy. Win AI credits. Grand Prize: RM 1,200 in AI Credits.",
  },
};

export default function HackathonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


