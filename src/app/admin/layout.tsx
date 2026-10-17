import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin CMS Portal · World Disaster Center",
  description: "Secure management console for WDC Summit 2027 applications, leads, and CMS content.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
