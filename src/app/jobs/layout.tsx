import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kracked Jobs",
  description: "Level up your career with Kracked Jobs. Earn XP, unlock badges, climb the leaderboard, and find your dream tech job. Search and filter jobs by tech stack, location, and type.",
  openGraph: {
    title: "Kracked Jobs | Kracked Devs",
    description: "Level up your career with Kracked Jobs. Earn XP, unlock badges, and find your dream tech job.",
    url: "/jobs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kracked Jobs",
    description: "Level up your career. Earn XP, unlock badges, and climb the leaderboard!",
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
  return children;
}


