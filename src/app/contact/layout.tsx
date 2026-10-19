import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact the Secretariat · Delegate Inquiries & Support",
  description:
    "Get in touch with the World Disaster Center Youth Leadership Summit 2027 desk in Cape Town. Direct inquiries on scholarships, admissions, university delegations, and visa letters.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact the Summit Secretariat · WDC 2027 Cape Town",
    description:
      "Reach our delegate support desk for questions regarding scholarship eligibility, visa letters, and institutional partnerships.",
    url: "/contact",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "World Disaster Center Contact Desk Cape Town 2027",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact the Summit Secretariat · WDC 2027",
    description:
      "Official admissions desk and delegate support for the World Disaster Center Youth Leadership Summit 2027 in Cape Town.",
    images: ["/twitter-image.jpg"],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
