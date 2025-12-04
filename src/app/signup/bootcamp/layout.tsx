import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vibe Code Bootcamp Signup",
  description: "Sign up for the 28-day Vibe Code Bootcamp. Turn random vibes into real output. RM 999 for 28 days of intensive learning, real-world projects, and mentorship.",
  openGraph: {
    title: "Vibe Code Bootcamp Signup | Kracked Devs",
    description: "Sign up for the 28-day Vibe Code Bootcamp. Turn random vibes into real output. RM 999 for 28 days.",
    url: "/signup/bootcamp",
    type: "website",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "Vibe Code Bootcamp Signup" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vibe Code Bootcamp Signup",
    description: "Sign up for the 28-day Vibe Code Bootcamp. RM 999 for 28 days.",
    images: ["/images/og-image-twitter.png"],
  },
};

export default function BootcampSignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}



