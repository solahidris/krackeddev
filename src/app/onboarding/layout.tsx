import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding Quest | Kracked Devs",
  description: "Complete your onboarding quest and unlock your developer journey. Talk to NPCs, complete tasks, and level up!",
  openGraph: {
    title: "Onboarding Quest | Kracked Devs",
    description: "Complete your onboarding quest and unlock your developer journey.",
    url: "/onboarding",
    type: "website",
  },
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

