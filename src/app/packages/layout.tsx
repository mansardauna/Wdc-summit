import type { Metadata } from "next";
import { DEFAULT_CMS_CONTENT } from "@/lib/default-data";

export const metadata: Metadata = {
  title: "Packages, Scholarships & Frequently Asked Questions",
  description:
    "Compare fully funded scholarship application fees ($16.99) and self-funded tiers ($749 / $349 / $99). Complete FAQ regarding visas, flights, and accommodations.",
  alternates: {
    canonical: "/packages",
  },
  openGraph: {
    title: "Summit Packages & Scholarship FAQ · WDC 2027",
    description:
      "Explore scholarship opportunities, package inclusions, and comprehensive FAQs for attending the Cape Town summit.",
    url: "/packages",
    images: ["/og-image.jpg"],
  },
};

export default function PackagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: DEFAULT_CMS_CONTENT.faqsSection.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
