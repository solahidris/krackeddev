import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kracked Forum",
  description: "A community forum for developers to discuss, share, and collaborate.",
  openGraph: {
    title: "Kracked Forum",
    description: "A community forum for developers to discuss, share, and collaborate.",
    type: "website",
  },
};

export default function ForumLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

