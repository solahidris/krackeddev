import type { Metadata } from "next";
import HomeClient from "../components/HomeClient";

export const metadata: Metadata = {
  title: "Want to be a Kracked Dev?",
  description: "Turn random vibes into real output in 28 days. Join the Vibe Code Bootcamp - No CS degree required, just cracked execution. Real-world projects, mentorship, and earn 'Cracked Dev' status.",
  openGraph: {
    title: "Want to be a Kracked Dev? | Kracked Devs",
    description: "Turn random vibes into real output in 28 days. Join the Vibe Code Bootcamp - No CS degree required, just cracked execution.",
    url: "/homepage",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Want to be a Kracked Dev?",
    description: "Turn random vibes into real output in 28 days. Join the Vibe Code Bootcamp.",
  },
};

export default function Homepage() {
  return <HomeClient />;
}









