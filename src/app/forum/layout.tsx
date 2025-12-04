import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kracked Forum",
  description: "A community forum for developers to discuss, share, and collaborate.",
  openGraph: {
    title: "Kracked Forum",
    description: "A community forum for developers to discuss, share, and collaborate.",
    type: "website",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "Kracked Forum" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kracked Forum",
    description: "A community forum for developers to discuss, share, and collaborate.",
    images: ["/images/og-image-twitter.png"],
  },
};

export default function ForumLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

