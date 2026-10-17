import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://wdc-summit.org";

export const viewport: Viewport = {
  themeColor: "#061322",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "World Disaster Center · Youth Leader Summit 2027 (Cape Town)",
    template: "%s | WDC Youth Leader Summit 2027",
  },
  description:
    "Join the first global edition of the World Disaster Center Youth Leader Summit in Cape Town, South Africa (10–14 October 2027). Intensive simulations in disaster prediction, climate resilience, environmental governance, and emergency response.",
  applicationName: "WDC Summit 2027",
  keywords: [
    "World Disaster Center",
    "Youth Leader Summit 2027",
    "Cape Town Summit",
    "Disaster Management Training",
    "Climate Resilience",
    "Youth Leadership Scholarships",
    "Environmental Protection Declaration",
    "Emergency Response Simulation",
    "Disaster Risk Reduction",
    "Global Youth Delegates",
  ],
  authors: [{ name: "World Disaster Center", url: siteUrl }],
  creator: "World Disaster Center",
  publisher: "World Disaster Center Secretariat",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "World Disaster Center Youth Leader Summit 2027",
    title: "World Disaster Center · Youth Leader Summit 2027 (Cape Town)",
    description:
      "Join the premier global youth gathering for disaster preparedness and climate leadership in Cape Town, South Africa (10–14 October 2027). Apply for full/partial scholarships.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "World Disaster Center Youth Leader Summit 2027 Cape Town Official Banner",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "World Disaster Center · Youth Leader Summit 2027",
    description:
      "Cape Town, South Africa · 10–14 October 2027. Training the next generation of disaster response leaders, scientists, and climate innovators.",
    creator: "@WDC_Summit",
    site: "@WDC_Summit",
    images: [
      {
        url: "/twitter-image.jpg",
        alt: "World Disaster Center Youth Leader Summit 2027 Cape Town",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdEvent = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "World Disaster Center Youth Leader Summit 2027",
    description:
      "The first global edition of the World Disaster Center Youth Leader Summit bringing 200+ selected youth delegates from 75+ nations for intensive simulations in climate resilience, disaster prediction, and global environmental protection.",
    startDate: "2027-10-10T08:30:00+02:00",
    endDate: "2027-10-14T18:00:00+02:00",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Cape Town International Convention Centre (CTICC)",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Convention Square, 1 Lower Long St",
        addressLocality: "Cape Town",
        postalCode: "8001",
        addressCountry: "ZA",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -33.9175,
        longitude: 18.4284,
      },
    },
    image: [`${siteUrl}/og-image.jpg`],
    organizer: {
      "@type": "Organization",
      name: "World Disaster Center",
      url: siteUrl,
      logo: `${siteUrl}/icon-512.png`,
    },
    offers: [
      {
        "@type": "Offer",
        name: "Fully Funded & Partial Scholarship Evaluation",
        price: "16.99",
        priceCurrency: "USD",
        url: `${siteUrl}/apply`,
        availability: "https://schema.org/InStock",
        validFrom: "2026-01-01",
      },
      {
        "@type": "Offer",
        name: "Self-Funded Delegate Package",
        price: "749",
        priceCurrency: "USD",
        url: `${siteUrl}/packages`,
        availability: "https://schema.org/InStock",
      },
    ],
  };

  const jsonLdOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "World Disaster Center",
    url: siteUrl,
    logo: `${siteUrl}/icon-512.png`,
    sameAs: [
      "https://twitter.com/WDC_Summit",
      "https://www.linkedin.com/company/world-disaster-center",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+27-21-555-0199",
      contactType: "Customer Support",
      availableLanguage: ["English"],
    },
  };

  const jsonLdWebSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "World Disaster Center Youth Leader Summit 2027",
    alternateName: ["WDC Summit 2027", "WDC Youth Leader Summit Cape Town"],
    url: siteUrl,
    description:
      "Join the first global edition of the World Disaster Center Youth Leader Summit in Cape Town, South Africa (10–14 October 2027).",
    publisher: {
      "@type": "Organization",
      name: "World Disaster Center",
      url: siteUrl,
      logo: `${siteUrl}/icon-512.png`,
    },
  };

  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdEvent) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
      </head>
      <body className="font-sans antialiased text-[#1B2228] bg-white selection:bg-[#FCE46D] selection:text-[#1B2228]">
        {/* Accessibility Skip-to-content Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:bg-[#FCE46D] focus:text-[#1B2228] focus:font-bold focus:rounded-xl focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#1B2228]"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
