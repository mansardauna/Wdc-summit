import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Summit · Mission, Pillars & Host City",
  description:
    "Explore the World Disaster Center Youth Leader Summit 2027 in Cape Town. Discover the 6 Pillars of Resilience and why Cape Town was chosen as the premier host city.",
  alternates: {
    canonical: "/summit",
  },
  openGraph: {
    title: "The Summit · Mission, Pillars & Cape Town 2027",
    description:
      "Explore the 6 Pillars of Resilience and why Cape Town was chosen to host the inaugural WDC Youth Leader Summit 2027.",
    url: "/summit",
    images: ["/og-image.jpg"],
  },
};

export default function SummitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
