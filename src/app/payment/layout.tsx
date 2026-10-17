import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Checkout & Official Receipt",
  description:
    "Secure payment portal for WDC Youth Leader Summit 2027 packages and scholarship evaluation fees via Paystack & Flutterwave. Instant PDF and printable official invoice receipt.",
  alternates: {
    canonical: "/payment",
  },
  openGraph: {
    title: "Secure Checkout & Receipt · WDC Summit 2027",
    description: "Official payment processing for Cape Town 2027 packages and scholarships.",
    url: "/payment",
    images: ["/og-image.jpg"],
  },
};

export default function PaymentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
