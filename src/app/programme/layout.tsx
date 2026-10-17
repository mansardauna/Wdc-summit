import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "5-Day Programme & 20 Delegate Speaker Slots",
  description:
    "Review the detailed 5-day summit schedule in Cape Town (Days 01–05), keynote tracks, emergency simulations, and the 20 delegate speaker stage slots.",
  alternates: {
    canonical: "/programme",
  },
  openGraph: {
    title: "5-Day Summit Programme · Cape Town Schedule",
    description:
      "Review the complete 5-day schedule, speaker slots, and emergency simulation tracks for the WDC 2027 Summit.",
    url: "/programme",
    images: ["/og-image.jpg"],
  },
};

export default function ProgrammeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
