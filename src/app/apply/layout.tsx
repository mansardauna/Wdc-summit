import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply · Delegate & Scholarship Registration Portal",
  description:
    "Apply for the World Disaster Center Youth Leadership Summit 2027 in Cape Town. Fully funded scholarships, partially funded aid, and self-funded delegate applications open.",
  alternates: {
    canonical: "/apply",
  },
  openGraph: {
    title: "Apply · Delegate & Scholarship Portal · WDC 2027",
    description:
      "Submit your delegate profile and scholarship application for the Cape Town Youth Leadership Summit 2027.",
    url: "/apply",
    images: ["/og-image.jpg"],
  },
};

export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
