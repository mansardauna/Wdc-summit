import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The WDC Declaration · Environmental Protection Charter",
  description:
    "Read the WDC Global Environmental Protection Declaration drafted and adopted by summit delegates across 75+ nations in Cape Town, South Africa.",
  alternates: {
    canonical: "/declaration",
  },
  openGraph: {
    title: "The WDC Declaration · Environmental Protection Charter",
    description:
      "Drafted and adopted by youth leaders across 75+ countries at the 2027 Cape Town Summit.",
    url: "/declaration",
    images: ["/og-image.jpg"],
  },
};

export default function DeclarationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
