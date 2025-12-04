import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kracked Jobs",
  description:
    "Level up your career with Kracked Jobs. Earn XP, unlock badges, climb the leaderboard, and find your dream tech job. Search and filter jobs by tech stack, location, and type.",
  openGraph: {
    title: "Kracked Jobs | Kracked Devs",
    description:
      "Level up your career with Kracked Jobs. Earn XP, unlock badges, and find your dream tech job.",
    url: "/jobs",
    type: "website",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "Kracked Jobs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kracked Jobs",
    description:
      "Level up your career. Earn XP, unlock badges, and climb the leaderboard!",
    images: ["/images/og-image-twitter.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function JobsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
