import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Kracked Devs",
  description: "A community of cracked developers who want to level up together.",
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <PageHero
        title="[placeholder]"
        subtitle=""
      />
    </main>
  );
}
