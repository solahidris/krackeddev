import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kracked Talks Signup",
  description: "Join our community talks and learn from industry experts. Register for access to exclusive talks on math & engineering, automation, and business value.",
  openGraph: {
    title: "Kracked Talks Signup | Community Talks Registration",
    description: "Join our community talks and learn from industry experts. Register for exclusive talks.",
    url: "/signup/talks",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Kracked Talks Signup",
    description: "Join our community talks and learn from industry experts.",
  },
};

export default function TalksSignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


