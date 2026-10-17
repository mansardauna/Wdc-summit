import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner Organisations & Global Coalition",
  description:
    "Meet our coalition of multilateral humanitarian agencies, climate research institutions, and technology partners driving disaster resilience worldwide.",
  alternates: {
    canonical: "/partners",
  },
  openGraph: {
    title: "Partner Organisations & Coalition · WDC Summit 2027",
    description:
      "Collaborating with global disaster management agencies and youth-led climate organizations.",
    url: "/partners",
    images: ["/og-image.jpg"],
  },
};

export default function PartnersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
