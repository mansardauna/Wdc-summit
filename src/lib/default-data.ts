export interface PackageItem {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: "scholarship" | "paid" | "addon";
  badge?: string;
  highlight?: boolean;
  price: number;
  currency: string;
  ctaText: string;
  description: string;
  features: string[];
  footerNote?: string;
  active: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface PartnerItem {
  id: string;
  name: string;
  category: string;
  website?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  badge: string;
  location: string;
  bio: string;
  imageUrl: string;
  linkedinUrl?: string;
  email?: string;
  theme: "ice" | "powder" | "glacier" | "slate";
  featuredOnHome: boolean;
}

export interface ProgrammeDay {
  id: string;
  dayNumber: string;
  date: string;
  title: string;
  themeColor: "ice" | "powder" | "glacier" | "slate";
  items: string[];
}

export interface ApplicationRecord {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  nationality: string;
  countryOfResidence: string;
  age: number;
  dateOfBirth: string;
  categoryProfile: string;
  organizationOrUniversity: string;
  packageId: string;
  packageName: string;
  amount: number;
  scholarshipPreference: string;
  speakerSlotInterest: boolean;
  speakerTopic: string;
  motivationStatement: string;
  declarationInterest: string;
  dietaryOrAccessibility: string;
  referralSource: string;
  status: "LEAD" | "PENDING_PAYMENT" | "UNDER_REVIEW" | "ACCEPTED" | "WAITLISTED" | "DECLINED";
  paymentStatus: "UNPAID" | "PAID" | "REFUNDED";
  paymentReference?: string;
  paymentGateway?: "paystack" | "flutterwave";
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeadRecord {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  country: string;
  interestType: string;
  source: string;
  status: "NEW" | "CONTACTED" | "CONVERTED" | "ARCHIVED";
  notes?: string;
  createdAt: string;
}

export interface PaymentRecord {
  id: string;
  reference: string;
  applicationId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  country?: string;
  packageId: string;
  packageName: string;
  amount: number;
  currency: string;
  gateway: "paystack" | "flutterwave";
  status: "PENDING" | "SUCCESS" | "FAILED" | "REFUNDED";
  gatewayResponse?: string;
  createdAt: string;
  paidAt?: string;
}

export interface ContactRecord {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  country?: string;
  subject: string;
  category: string;
  message: string;
  status: "UNREAD" | "READ" | "REPLIED" | "ARCHIVED";
  adminReplyNotes?: string;
  createdAt: string;
}

export interface SiteCMSContent {
  settings: {
    orgName: string;
    summitTitle: string;
    editionBadge: string;
    datesText: string;
    countdownTargetIso: string;
    hostCity: string;
    ageRange: string;
    speakerSlotsCount: number;
    contactEmail: string;
    websiteDomain: string;
    officeAddress: string;
    whatsappOrPhone: string;
    announcementBar: string;
    paymentMode: "sandbox" | "live";
    defaultGateway: "paystack" | "flutterwave";
    paystackPublicKey: string;
    paystackSecretKey: string;
    flutterwavePublicKey: string;
    flutterwaveSecretKey: string;
    supabaseConnectedNote: string;
  };
  hero: {
    badge: string;
    eyebrow: string;
    headlineLine1: string;
    headlineLine2: string;
    description: string;
    metaPills: string[];
    primaryCta: string;
    secondaryCta: string;
    tickerItems: string[];
    mountainImageUrl: string;
  };
  about: {
    sectionNumber: string;
    sectionLabel: string;
    headline: string;
    paragraph1: string;
    paragraph2: string;
    ctaText: string;
    stats: {
      value: string;
      label: string;
    }[];
  };
  whyAttend: {
    sectionNumber: string;
    sectionLabel: string;
    headline: string;
    subtitle: string;
    cards: {
      id: string;
      number: string;
      title: string;
      description: string;
      theme: "ice" | "powder" | "glacier" | "slate";
      bullets: string[];
    }[];
  };
  declaration: {
    sectionNumber: string;
    sectionLabel: string;
    headline: string;
    signedBadge: string;
    paragraph1: string;
    paragraph2: string;
    ctaText: string;
    steps: {
      number: string;
      title: string;
      description: string;
    }[];
  };
  pillars: {
    sectionNumber: string;
    sectionLabel: string;
    headline: string;
    subtitle: string;
    items: {
      number: string;
      title: string;
      description: string;
      theme: "ice" | "powder" | "glacier" | "slate";
    }[];
  };
  hostCity: {
    sectionNumber: string;
    sectionLabel: string;
    headline: string;
    paragraph1: string;
    paragraph2: string;
    highlights: {
      title: string;
      subtitle: string;
    }[];
  };
  stage: {
    sectionNumber: string;
    sectionLabel: string;
    headline: string;
    bigNumber: string;
    bigNumberLabel: string;
    description: string;
    whoTitle: string;
    whoDescription: string;
    howManyTitle: string;
    howManyDescription: string;
    footnote: string;
  };
  programme: {
    sectionNumber: string;
    sectionLabel: string;
    headline: string;
    subtitle: string;
    days: ProgrammeDay[];
    bannerTitle: string;
    bannerSubtitle: string;
    bannerCta: string;
  };
  whoCanApply: {
    sectionNumber: string;
    sectionLabel: string;
    headline: string;
    subtitle: string;
    profiles: {
      badge: string;
      title: string;
      description: string;
      theme: "ice" | "powder" | "glacier" | "slate";
    }[];
    footerNote: string;
  };
  scholarshipSection: {
    sectionNumber: string;
    sectionLabel: string;
    headline: string;
    subtitle: string;
    applicationFeePrice: number;
    applicationFeeLabel: string;
    applicationFeeNote: string;
    applicationFeeCta: string;
  };
  paidSection: {
    sectionNumber: string;
    sectionLabel: string;
    headline: string;
    subtitle: string;
    visaIncludedNote: string;
  };
  packages: PackageItem[];
  partnersSection: {
    sectionNumber: string;
    sectionLabel: string;
    headline: string;
    subtitle: string;
    partners: PartnerItem[];
  };
  impactSection: {
    sectionNumber: string;
    sectionLabel: string;
    headline: string;
    subtitle: string;
    items: {
      number: string;
      title: string;
      description: string;
      theme: "ice" | "powder" | "glacier" | "slate";
    }[];
  };
  faqsSection: {
    sectionNumber: string;
    sectionLabel: string;
    headline: string;
    items: FAQItem[];
  };
  teamSection: {
    sectionNumber: string;
    sectionLabel: string;
    headline: string;
    subtitle: string;
    ctaText: string;
    members: TeamMember[];
  };
  gatewayCta: {
    eyebrow: string;
    headline: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    disclaimer: string;
  };
}

export interface FullDatabaseStore {
  cms: SiteCMSContent;
  applications: ApplicationRecord[];
  leads: LeadRecord[];
  payments: PaymentRecord[];
  contacts: ContactRecord[];
}

export const DEFAULT_CMS_CONTENT: SiteCMSContent = {
  settings: {
    orgName: "World Disaster Center",
    summitTitle: "Youth Leader Summit 2027",
    editionBadge: "1ST GLOBAL EDITION · SPRING SUMMIT",
    datesText: "10–14 October 2027",
    countdownTargetIso: "2027-10-10T09:00:00Z",
    hostCity: "Cape Town, South Africa",
    ageRange: "Ages 18–30",
    speakerSlotsCount: 20,
    contactEmail: "summit@worlddisastercenter.org",
    websiteDomain: "worlddisastercenter.org",
    officeAddress: "Cape Town International Convention Precinct, Cape Town, South Africa",
    whatsappOrPhone: "+27 21 555 0194",
    announcementBar: "Applications for the 2027 World Disaster Center Youth Leader Summit in Cape Town are now open.",
    paymentMode: "sandbox",
    defaultGateway: "paystack",
    paystackPublicKey: "",
    paystackSecretKey: "",
    flutterwavePublicKey: "",
    flutterwaveSecretKey: "",
    supabaseConnectedNote: "Hybrid PostgreSQL / Supabase + Local Persistence Active",
  },
  hero: {
    badge: "1ST GLOBAL EDITION · SPRING SUMMIT",
    eyebrow: "World Disaster Center Youth Leader Summit 2027",
    headlineLine1: "Join the First",
    headlineLine2: "Global Summit.",
    description:
      "A spring summit that lands in a different part of the globe every year. This year, Cape Town, South Africa. Five days to train as a youth leader in climate resilience, disaster prediction and resilience in conflict zones, and to put your name to the WDC Global Environmental Protection Declaration.",
    metaPills: [
      "10–14 October 2027",
      "Cape Town, South Africa",
      "Ages 18–30",
      "20 delegate speaker slots",
    ],
    primaryCta: "Apply Now",
    secondaryCta: "The Declaration →",
    tickerItems: [
      "CLIMATE RESILIENCE",
      "LEADERSHIP",
      "DISASTER PREDICTION",
      "RESILIENCE IN CONFLICT ZONES",
      "FULLY FUNDED SEATS",
      "SPRING 2027",
    ],
    mountainImageUrl:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=85",
  },
  about: {
    sectionNumber: "01",
    sectionLabel: "ABOUT THE SUMMIT",
    headline: "Where Youth Leaders Learn to Get Ahead of Disaster",
    paragraph1:
      "The World Disaster Center Youth Leader Summit trains the next generation to prepare for, respond to and recover from the shocks that define this century. Over five days, delegates aged 18–30 work on climate resilience, leadership, disaster prediction and resilience in conflict zones.",
    paragraph2:
      "It is the first edition of a global summit that takes place every spring in a different part of the globe. In 2027 it comes to Cape Town, South Africa, and it closes with delegates signing the WDC Global Environmental Protection Declaration.",
    ctaText: "See Scholarships & Packages",
    stats: [
      { value: "20", label: "Delegate speaker slots" },
      { value: "3", label: "Scholarship tiers" },
      { value: "5", label: "Days in Cape Town" },
      { value: "18–30", label: "Age range, every nationality" },
    ],
  },
  whyAttend: {
    sectionNumber: "02",
    sectionLabel: "WHY ATTEND?",
    headline: "Why Join the Summit?",
    subtitle:
      "Be part of the first global gathering of youth leaders built around climate resilience and disaster readiness. It comes down to three things.",
    cards: [
      {
        id: "why-1",
        number: "01",
        title: "Sign the Declaration",
        description:
          "The Summit's principal outcome, drafted and signed by the delegates themselves.",
        theme: "ice",
        bullets: [
          "Sign the WDC Global Environmental Protection Declaration as a named signatory",
          "Represent youth voices on climate and disaster resilience",
          "Turn commitments into action you carry back to your community",
        ],
      },
      {
        id: "why-2",
        number: "02",
        title: "Take the stage",
        description:
          "Twenty delegates get a chance to speak at the Summit.",
        theme: "powder",
        bullets: [
          "20 speaker slots open to Fully Funded and Partially Funded delegates",
          "Share your work with the whole Summit",
          "Build your profile among climate and resilience leaders",
        ],
      },
      {
        id: "why-3",
        number: "03",
        title: "Take it home",
        description:
          "What stays with you long after the closing ceremony in Cape Town.",
        theme: "slate",
        bullets: [
          "Train in four core skills: climate resilience, leadership, disaster prediction and conflict-zone resilience",
          "Network with youth leaders from around the world",
          "Gain international exposure and official certification",
          "Experience Cape Town beyond the conference room",
        ],
      },
    ],
  },
  declaration: {
    sectionNumber: "03",
    sectionLabel: "THE PRINCIPAL OUTCOME",
    headline: "The WDC Global Environmental Protection Declaration",
    signedBadge: "Signed in Cape Town · 14 October 2027",
    paragraph1:
      "The principal outcome of the Summit is a collective statement on protecting the planet and the people who live on it, drafted, debated and signed by the delegates themselves.",
    paragraph2:
      "Every confirmed delegate takes part in the drafting process and becomes a named signatory.",
    ctaText: "Become a Signatory",
    steps: [
      {
        number: "01",
        title: "Your name on the record",
        description:
          "Recorded as a signatory of a global environmental declaration adopted in Cape Town.",
      },
      {
        number: "02",
        title: "You shape the text",
        description:
          "Working groups and plenary debate during the Summit. The wording is argued, not handed down.",
      },
      {
        number: "03",
        title: "You join a standing network",
        description:
          "A global network of youth leaders committed to delivering on what the Declaration promises.",
      },
      {
        number: "04",
        title: "An official certificate",
        description:
          "A signatory certificate issued by the World Disaster Center.",
      },
    ],
  },
  pillars: {
    sectionNumber: "04",
    sectionLabel: "WHAT YOU WILL TRAIN IN",
    headline: "Six Pillars of Resilience",
    subtitle:
      "Every session, workshop and dialogue across the five days sits under one of six connected pillars.",
    items: [
      {
        number: "01",
        title: "Climate Resilience",
        description:
          "Adaptation, protection and recovery strategies for communities on the front line of a changing climate.",
        theme: "ice",
      },
      {
        number: "02",
        title: "Leadership for Resilient Futures",
        description:
          "Decision-making, diplomacy and team leadership under pressure, taught as practical skills.",
        theme: "powder",
      },
      {
        number: "03",
        title: "Disaster Prediction",
        description:
          "How data and early warning turn hazards into preparation, from earthquakes and floods to storms.",
        theme: "glacier",
      },
      {
        number: "04",
        title: "Resilience in Conflict Zones",
        description:
          "Protecting people and building recovery where displacement, violence and environmental shocks overlap.",
        theme: "slate",
      },
      {
        number: "05",
        title: "Humanitarian Response & Recovery",
        description:
          "Coordination before, during and after a crisis, from the first alert to long-term recovery.",
        theme: "ice",
      },
      {
        number: "06",
        title: "Environmental Protection & Policy",
        description:
          "Turning science and community knowledge into commitments, the foundation of the Declaration.",
        theme: "powder",
      },
    ],
  },
  hostCity: {
    sectionNumber: "05",
    sectionLabel: "THE HOST CITY",
    headline: "Now, Why Cape Town?",
    paragraph1:
      "Climate pressure is part of daily life in Cape Town: water scarcity, wildfire on the mountain slopes and winter flooding in low-lying settlements. It is a working classroom for climate resilience, which makes it the right place to open a global summit about readiness.",
    paragraph2:
      "The Youth Leader Summit is a spring summit. Each year it moves to a different part of the globe, so every edition is hosted on the front line of a different challenge.",
    highlights: [
      {
        title: "10–14 October 2027",
        subtitle: "Five days, in person",
      },
      {
        title: "Cape Town, South Africa",
        subtitle: "Host city, 1st edition",
      },
      {
        title: "A new region every spring",
        subtitle: "Different part of the globe each year",
      },
    ],
  },
  stage: {
    sectionNumber: "06",
    sectionLabel: "YOUR VOICE, ON STAGE",
    headline: "The Stage Is Yours",
    bigNumber: "20",
    bigNumberLabel: "Delegate speaker slots",
    description:
      "Twenty delegates from the Fully Funded and Partially Funded groups will have the chance to speak at the Summit. This is a summit where youth leaders are not only in the audience.",
    whoTitle: "Who",
    whoDescription: "Fully Funded and Partially Funded delegates",
    howManyTitle: "How many",
    howManyDescription: "20 speaking slots across the programme",
    footnote:
      "Guest faculty and partner voices will be announced in phases ahead of the Summit.",
  },
  programme: {
    sectionNumber: "07",
    sectionLabel: "THE PROGRAMME",
    headline: "Five Days in Cape Town",
    subtitle: "Indicative programme, subject to confirmation.",
    days: [
      {
        id: "day-1",
        dayNumber: "Day 01",
        date: "Sunday · 10 October 2027",
        title: "Arrival & Opening",
        themeColor: "ice",
        items: [
          "Delegate registration & welcome kit",
          "Official opening ceremony",
          "Inaugural keynote: youth leaders and climate resilience",
          "Delegate introductions & country roll call",
          "Welcome reception",
        ],
      },
      {
        id: "day-2",
        dayNumber: "Day 02",
        date: "Monday · 11 October 2027",
        title: "Climate & Leadership",
        themeColor: "powder",
        items: [
          "Morning plenary on climate resilience",
          "Leadership workshop: decisions under pressure",
          "Breakouts on adaptation and environmental protection",
          "Networking reception",
        ],
      },
      {
        id: "day-3",
        dayNumber: "Day 03",
        date: "Tuesday · 12 October 2027",
        title: "Prediction & Early Warning",
        themeColor: "glacier",
        items: [
          "Plenary: from data to early warning",
          "Hands-on disaster prediction lab",
          "Breakouts on community preparedness",
          "Partnership roundtables",
        ],
      },
      {
        id: "day-4",
        dayNumber: "Day 04",
        date: "Wednesday · 13 October 2027",
        title: "Conflict Zones & the City",
        themeColor: "ice",
        items: [
          "Session on resilience in conflict zones",
          "Site visit in Cape Town (venue TBC)",
          "Delegate stage: the 20 speakers",
          "Cultural evening",
        ],
      },
      {
        id: "day-5",
        dayNumber: "Day 05",
        date: "Thursday · 14 October 2027",
        title: "Declaration & Closing",
        themeColor: "slate",
        items: [
          "Working groups on the Declaration text",
          "Plenary debate & adoption of the Declaration",
          "Signing ceremony: every delegate a named signatory",
          "Certificate ceremony",
          "Group photograph & farewell dinner",
        ],
      },
    ],
    bannerTitle: "You leave a signatory.",
    bannerSubtitle:
      "Your name on the Declaration, an official certificate in hand and a network of youth leaders behind you.",
    bannerCta: "Apply Now",
  },
  whoCanApply: {
    sectionNumber: "08",
    sectionLabel: "IS THIS FOR YOU?",
    headline: "Who Can Apply?",
    subtitle:
      "A youth summit built for the majority of the globe. If you are between 18 and 30 and care about the planet, there is a place for you.",
    profiles: [
      {
        badge: "18–30",
        title: "Ages 18 to 30",
        description:
          "From first-year students to early-career professionals, a youth summit built around the global majority.",
        theme: "ice",
      },
      {
        badge: "Worldwide",
        title: "All nationalities",
        description: "Open to applicants from every country.",
        theme: "powder",
      },
      {
        badge: "BA / BSc",
        title: "Undergraduates",
        description:
          "Students from any discipline who want to lead on climate and resilience.",
        theme: "glacier",
      },
      {
        badge: "MA / MSc",
        title: "Graduates",
        description:
          "Recent graduates and postgraduates, in any field.",
        theme: "ice",
      },
      {
        badge: "SDGs",
        title: "Sustainable development enthusiasts",
        description:
          "Anyone driven by climate, environment, development or disaster readiness.",
        theme: "powder",
      },
      {
        badge: "Next",
        title: "Career switchers",
        description:
          "Moving into climate, humanitarian or sustainability work? This is your on-ramp.",
        theme: "slate",
      },
    ],
    footerNote:
      "Applicants passionate about sustainable development, climate resilience, disaster readiness and peace are encouraged to apply. Scholarships are awarded on merit through the application and selection process.",
  },
  scholarshipSection: {
    sectionNumber: "09",
    sectionLabel: "SCHOLARSHIP PROGRAMME",
    headline: "One Application. Three Chances at a Funded Seat.",
    subtitle:
      "The Summit offers three funded categories. Scholarships are awarded on merit through the application and selection process, not first come, first served.",
    applicationFeePrice: 16.99,
    applicationFeeLabel: "application fee",
    applicationFeeNote:
      "One application considers you for Fully Funded, Partially Funded and Funded Forum Access. Non-refundable; payment does not guarantee selection.",
    applicationFeeCta: "Start Your Application",
  },
  paidSection: {
    sectionNumber: "10",
    sectionLabel: "PAID PARTICIPATION",
    headline: "Join On Your Own Terms",
    subtitle:
      "Not applying for a scholarship, or would rather secure your place directly? These are booked immediately, with no selection process and no waiting. All fees are quoted in United States Dollars.",
    visaIncludedNote:
      "The Visa Invitation Letter is also included at no extra charge in every delegate package above.",
  },
  packages: [
    {
      id: "pkg-scholarship-app",
      slug: "scholarship-application",
      name: "Scholarship Application (All 3 Tiers)",
      subtitle: "Considers you for Fully Funded, Partially Funded & Funded Forum Access",
      category: "scholarship",
      badge: "EVERYTHING COVERED · MERIT AWARD",
      highlight: true,
      price: 16.99,
      currency: "USD",
      ctaText: "Start Your Application",
      description:
        "One merit application considers you across all three funded scholarship categories: Fully Funded, Partially Funded, and Funded Forum Access.",
      features: [
        "Stamped visa invitation letter",
        "All meals during the Summit",
        "Summit materials & delegate kit",
        "WDC Global Environmental Protection Declaration: signatory status",
        "Site visit in Cape Town (venue TBC)",
        "Networking reception & Workshop access",
        "Official international certification",
        "Airfare support (Fully Funded tier)",
        "Accommodation during the Summit (Fully & Partially Funded tiers)",
        "Eligible for one of 20 speaker slots",
      ],
      footerNote: "Awarded on merit through the application process",
      active: true,
    },
    {
      id: "pkg-fully-funded",
      slug: "fully-funded-scholarship",
      name: "Fully Funded",
      subtitle: "Scholarship · awarded on merit",
      category: "scholarship",
      badge: "EVERYTHING COVERED",
      highlight: true,
      price: 16.99,
      currency: "USD",
      ctaText: "Apply for Scholarship ($16.99)",
      description:
        "Covers airfare support, accommodation in Cape Town, meals, delegate kit, and full programme access.",
      features: [
        "Stamped visa invitation letter",
        "All meals during the Summit",
        "Summit materials & delegate kit",
        "WDC Global Environmental Protection Declaration: signatory status",
        "Site visit in Cape Town (venue TBC)",
        "Networking reception",
        "Workshop & session access",
        "Official international certification",
        "Airfare support",
        "Accommodation during the Summit",
        "Eligible for one of 20 speaker slots",
      ],
      footerNote: "Awarded on merit through the application process",
      active: true,
    },
    {
      id: "pkg-partially-funded",
      slug: "partially-funded-scholarship",
      name: "Partially Funded",
      subtitle: "Scholarship · awarded on merit",
      category: "scholarship",
      badge: "YOUR STAY COVERED",
      highlight: false,
      price: 16.99,
      currency: "USD",
      ctaText: "Apply for Scholarship ($16.99)",
      description:
        "Covers accommodation during the Summit, all meals, delegate kit, and full programme access.",
      features: [
        "Stamped visa invitation letter",
        "All meals during the Summit",
        "Summit materials & delegate kit",
        "WDC Global Environmental Protection Declaration: signatory status",
        "Site visit in Cape Town (venue TBC)",
        "Networking reception",
        "Workshop & session access",
        "Official international certification",
        "Airfare arranged by the delegate",
        "Accommodation during the Summit",
        "Eligible for one of 20 speaker slots",
      ],
      footerNote: "Awarded on merit through the application process",
      active: true,
    },
    {
      id: "pkg-funded-forum",
      slug: "funded-forum-access",
      name: "Funded Forum Access",
      subtitle: "Scholarship · awarded on merit",
      category: "scholarship",
      badge: "PROGRAMME COVERED",
      highlight: false,
      price: 16.99,
      currency: "USD",
      ctaText: "Apply for Scholarship ($16.99)",
      description:
        "Covers full Summit programme tuition, all meals, materials, site visit, and signatory status.",
      features: [
        "Stamped visa invitation letter",
        "All meals during the Summit",
        "Summit materials & delegate kit",
        "WDC Global Environmental Protection Declaration: signatory status",
        "Site visit in Cape Town (venue TBC)",
        "Networking reception",
        "Workshop & session access",
        "Official international certification",
        "Airfare arranged by the delegate",
        "Accommodation arranged by the delegate",
      ],
      footerNote: "Awarded on merit through the application process",
      active: true,
    },
    {
      id: "pkg-self-funded",
      slug: "self-funded-delegate",
      name: "Self-Funded Delegate",
      subtitle: "Accommodation included",
      category: "paid",
      badge: "MOST COMPLETE",
      highlight: true,
      price: 749,
      currency: "USD",
      ctaText: "Book Your Seat",
      description:
        "Guaranteed immediate seat with accommodation during the Summit, all meals, and signatory status.",
      features: [
        "Stamped visa invitation letter",
        "All meals during the Summit",
        "Summit materials & delegate kit",
        "WDC Global Environmental Protection Declaration: signatory status",
        "Site visit in Cape Town (venue TBC)",
        "Networking reception",
        "Workshop & session access",
        "Official international certification",
        "Full delegate registration",
        "Accommodation during the Summit",
      ],
      active: true,
    },
    {
      id: "pkg-forum-access",
      slug: "forum-access-pass",
      name: "Forum Access Pass",
      subtitle: "Sessions, panels & the Declaration",
      category: "paid",
      highlight: false,
      price: 349,
      currency: "USD",
      ctaText: "Book Your Pass",
      description:
        "Immediate guaranteed pass to all Summit sessions, panels, meals, and Declaration signatory status.",
      features: [
        "Stamped visa invitation letter",
        "All meals during the Summit",
        "Summit materials & delegate kit",
        "WDC Global Environmental Protection Declaration: signatory status",
        "Site visit in Cape Town (venue TBC)",
        "Networking reception",
        "Workshop & session access",
        "Official international certification",
        "Access to all Summit sessions",
        "Accommodation arranged by the delegate",
      ],
      active: true,
    },
    {
      id: "pkg-visa-letter",
      slug: "visa-invitation-letter",
      name: "Visa Invitation Letter",
      subtitle: "Standalone add-on service",
      category: "addon",
      highlight: false,
      price: 99,
      currency: "USD",
      ctaText: "Get Invitation Letter",
      description:
        "Official stamped visa invitation package with embassy confirmation and upgrade option.",
      features: [
        "Stamped invitation letter",
        "Official confirmation letter",
        "Confirmation email to the embassy",
        "Visa application guidance",
        "Option to upgrade to a full package",
      ],
      active: true,
    },
  ],
  partnersSection: {
    sectionNumber: "11",
    sectionLabel: "OUR PARTNERS",
    headline: "Organisations Behind the Summit",
    subtitle:
      "The Youth Leader Summit is built with partners across climate, data, research and technology.",
    partners: [
      { id: "part-1", name: "EcoPeace", category: "Environmental Peacebuilding" },
      { id: "part-2", name: "Global Climate Collective", category: "Climate Action Network" },
      { id: "part-3", name: "Google", category: "Technology & AI Forecasting" },
      { id: "part-4", name: "UN Data Systems", category: "Global Humanitarian Data" },
      { id: "part-5", name: "Ben-Gurion University of the Negev", category: "Drylands & Climate Research" },
      { id: "part-6", name: "ClimateBase", category: "Climate Careers & Talent" },
    ],
  },
  impactSection: {
    sectionNumber: "12",
    sectionLabel: "BEYOND THE FIVE DAYS",
    headline: "Impact of the Summit",
    subtitle:
      "The Summit is designed to create lasting impact long after the closing ceremony.",
    items: [
      {
        number: "01",
        title: "Youth Empowerment & Leadership",
        description:
          "Delegates build leadership, decision-making and critical thinking skills.",
        theme: "ice",
      },
      {
        number: "02",
        title: "Disaster Readiness",
        description:
          "Skills in prediction, early warning and community preparedness that last beyond the event.",
        theme: "powder",
      },
      {
        number: "03",
        title: "Resilience in Conflict Zones",
        description:
          "Practical approaches to protecting people where conflict and environmental shocks collide.",
        theme: "glacier",
      },
      {
        number: "04",
        title: "International Networking",
        description:
          "Cross-border partnerships and long-term collaborations between delegates.",
        theme: "slate",
      },
      {
        number: "05",
        title: "A Summit That Travels",
        description:
          "Every spring the Summit moves to a new region, widening the network with each edition.",
        theme: "powder",
      },
    ],
  },
  faqsSection: {
    sectionNumber: "13",
    sectionLabel: "FREQUENTLY ASKED QUESTIONS",
    headline: "Everything You Need to Know",
    items: [
      {
        id: "faq-1",
        question: "What is the World Disaster Center Youth Leader Summit?",
        answer:
          "A global summit organised by the World Disaster Center for youth leaders aged 18 to 30. The 2027 edition takes place in Cape Town, South Africa, and trains delegates in climate resilience, leadership, disaster prediction and resilience in conflict zones.",
      },
      {
        id: "faq-2",
        question: "When and where does it take place?",
        answer:
          "10–14 October 2027 in Cape Town, South Africa. It is a spring summit that moves to a different part of the globe every year.",
      },
      {
        id: "faq-3",
        question: "What is the WDC Global Environmental Protection Declaration?",
        answer:
          "The principal outcome of the Summit: a collective statement drafted, debated and signed by the delegates themselves. Every confirmed delegate takes part in the drafting process and becomes a named signatory, with a certificate issued by the World Disaster Center.",
      },
      {
        id: "faq-4",
        question: "Is the Summit fully funded?",
        answer:
          "Fully Funded, Partially Funded and Funded Forum Access scholarships are available, alongside paid Self-Funded and Forum Access categories. Scholarships are awarded on merit through the application and selection process.",
      },
      {
        id: "faq-5",
        question: "What are the fees for each category?",
        answer:
          "Scholarships (Fully Funded, Partially Funded and Funded Forum Access): $16.99, one application fee for all three. Self-Funded Delegate: $749. Forum Access Pass: $349. Visa Invitation Letter (add-on): $99. All fees are quoted in United States Dollars.",
      },
      {
        id: "faq-6",
        question: "Does paying the application fee guarantee selection?",
        answer:
          "No. Fees are non-refundable and payment does not guarantee selection. Scholarships are awarded on merit through the application process.",
      },
      {
        id: "faq-7",
        question: "Who can apply?",
        answer:
          "Anyone aged 18 to 30, of any nationality: undergraduates, graduates, people interested in sustainable development and people switching careers into climate, humanitarian or sustainability work.",
      },
      {
        id: "faq-8",
        question: "How do the 20 speaker slots work?",
        answer:
          "Twenty delegates from the Fully Funded and Partially Funded groups will have the chance to speak at the Summit.",
      },
      {
        id: "faq-9",
        question: "What is the difference between Self-Funded and Forum Access?",
        answer:
          "Self-Funded ($749) includes accommodation during the Summit; Forum Access ($349) does not, and accommodation is arranged by the delegate. Everything else, including signatory status, all meals and the certificate, is the same in both.",
      },
      {
        id: "faq-10",
        question: "Does the Summit provide visa support?",
        answer:
          "Yes. Confirmed participants receive a stamped invitation letter, an official confirmation letter, a confirmation email to the embassy and visa application guidance. Approval remains at the discretion of the relevant embassy and is the applicant's responsibility.",
      },
    ],
  },
  teamSection: {
    sectionNumber: "03",
    sectionLabel: "YOUTH SUMMIT CREW",
    headline: "Meet the Youth Summit Crew",
    subtitle:
      "The executive leadership, strategy directors, technical architects, and global board members of the World Disaster Center driving the 2027 Youth Leader Summit in Cape Town.",
    ctaText: "Meet All 7 Crew Members",
    members: [
      {
        id: "crew-1",
        name: "Sapiens Ndatabaje",
        role: "Founder and CEO, World Disaster Center",
        badge: "FOUNDER & CEO",
        location: "Paris / Washington, D.C.",
        bio: "Multidisciplinary humanitarian and disaster-technology leader with over 15 years of field experience across 24 countries (including UN OCHA Regional Information Management). Founder of the World Disaster Center and architect of the MICHAEL and EAGLE global disaster intelligence platforms.",
        imageUrl: "/team/sapiens-ndatabaje.png",
        linkedinUrl: "https://www.linkedin.com/in/sapiens-ndatabaye-227425165/",
        email: "sndatabaye@worlddisastercenter.org",
        theme: "slate",
        featuredOnHome: true,
      },
      {
        id: "crew-2",
        name: "Susan Remane",
        role: "Director: Strategy & Development",
        badge: "STRATEGY & DEVELOPMENT",
        location: "United States",
        bio: "Multinational program strategy and organizational development leader with over 20 years of experience in strategic research, stakeholder engagement, institutional governance, and international summit & program delivery.",
        imageUrl: "/team/susan-remane.png",
        linkedinUrl: "https://www.linkedin.com/company/worlddisastercenter/",
        email: "summit@worlddisastercenter.org",
        theme: "ice",
        featuredOnHome: true,
      },
      {
        id: "crew-3",
        name: "Abdulrahman Monsur",
        role: "Technical Lead",
        badge: "TECHNICAL LEAD",
        location: "Global Digital Operations",
        bio: "Full-stack software engineer and technical lead spearheading the World Disaster Center Youth Leader Summit digital infrastructure, delegate telemetry portals, real-time application systems, and web architecture.",
        imageUrl: "/team/abdulrahman-monsur.jpg",
        linkedinUrl: "https://www.linkedin.com/in/monsur-alao-abdulrahman-3517913ab",
        email: "summit@worlddisastercenter.org",
        theme: "powder",
        featuredOnHome: true,
      },
      {
        id: "crew-4",
        name: "Jonathan Itegwa",
        role: "Board Director · Humanitarian Operations",
        badge: "BOARD & FIELD OPS",
        location: "Cameroon",
        bio: "Seasoned humanitarian leader and project management expert with extensive experience in strategy development, program implementation, and cross-cultural field operations across Africa, serving as Head of Mission at Première Urgence Internationale.",
        imageUrl: "/team/jonathan-itegwa.png",
        linkedinUrl: "https://www.linkedin.com/in/jonathan-itegwa-965466108/",
        email: "jitegwa@worlddisastercenter.org",
        theme: "glacier",
        featuredOnHome: false,
      },
      {
        id: "crew-5",
        name: "Maria Horvat Kohutova",
        role: "Board Director · Climate Migration & Policy",
        badge: "CLIMATE & MIGRATION",
        location: "Germany",
        bio: "Research consultant specializing in climate migration, human rights, and international project management. With over a decade of experience across global foundations, she guides youth policy and civic engagement initiatives.",
        imageUrl: "/team/maria-kohutova.png",
        linkedinUrl: "https://www.linkedin.com/in/maria-horvat-kohutova/",
        email: "mkohutova@worlddisastercenter.org",
        theme: "ice",
        featuredOnHome: false,
      },
      {
        id: "crew-6",
        name: "Dr. Ndifanji Melia Namacha",
        role: "Board Director · Global Health & Resilience",
        badge: "HEALTH RESILIENCE",
        location: "Malawi",
        bio: "Physician (MBBS, MBA) and global health researcher with deep expertise in health systems resilience, policy development, digital health innovation, and international donor engagement in climate-vulnerable regions.",
        imageUrl: "/team/ndifanji-namacha.png",
        linkedinUrl: "https://www.linkedin.com/in/ndifanji-melia-namacha-mbbs-mba-001a62123/",
        email: "nnamacha@worlddisastercenter.org",
        theme: "powder",
        featuredOnHome: false,
      },
      {
        id: "crew-7",
        name: "Johnny (Scot) Walker",
        role: "Board Director · Global Advisory & Partnerships",
        badge: "STRATEGIC ADVISORY",
        location: "United States",
        bio: "International board advisor and strategic leader supporting World Disaster Center's global institutional partnerships, disaster readiness frameworks, and cross-border youth leadership networks.",
        imageUrl: "/team/scot-walker.png",
        linkedinUrl: "https://www.linkedin.com/in/scot-walker/",
        email: "office@worlddisastercenter.org",
        theme: "slate",
        featuredOnHome: false,
      },
    ],
  },
  gatewayCta: {
    eyebrow: "APPLY FOR THE WORLD DISASTER CENTER YOUTH LEADER SUMMIT 2027",
    headline: "Your Gateway to Climate Leadership",
    subtitle:
      "10–14 October 2027 · Cape Town, South Africa · Ages 18–30 · Fully Funded, Partially Funded and Funded Forum Access scholarships available.",
    primaryCta: "Apply Now",
    secondaryCta: "Read the FAQ",
    disclaimer:
      "© 2027 World Disaster Center. All rights reserved. Fees are non-refundable and do not guarantee selection. Site visits are subject to scheduling and security clearance. Visa approval remains at the discretion of the relevant embassy.",
  },
};

export const INITIAL_STORE: FullDatabaseStore = {
  cms: DEFAULT_CMS_CONTENT,
  applications: [
    {
      id: "APP-2027-1001",
      fullName: "Amara Okafor",
      email: "amara.okafor@climateyouth.org",
      phone: "+234 803 555 0182",
      nationality: "Nigeria",
      countryOfResidence: "Nigeria",
      age: 24,
      dateOfBirth: "2002-06-14",
      categoryProfile: "MA / MSc Graduate",
      organizationOrUniversity: "University of Lagos Climate Lab",
      packageId: "pkg-scholarship-app",
      packageName: "Scholarship Application (All 3 Tiers)",
      amount: 16.99,
      scholarshipPreference: "Fully Funded",
      speakerSlotInterest: true,
      speakerTopic: "Community-Led Early Flood Warning Networks in Coastal West Africa",
      motivationStatement:
        "Leading urban flood resilience initiatives across coastal settlements and eager to co-draft the WDC Global Environmental Protection Declaration in Cape Town.",
      declarationInterest: "Urban Flood Adaptation & Early Warning Systems",
      dietaryOrAccessibility: "None",
      referralSource: "Global Climate Collective",
      status: "ACCEPTED",
      paymentStatus: "PAID",
      paymentReference: "PSK-WDC-982341",
      paymentGateway: "paystack",
      adminNotes: "Strong speaker candidate for Day 04 Delegate Stage.",
      createdAt: "2026-10-15T10:20:00Z",
      updatedAt: "2026-10-15T10:25:00Z",
    },
    {
      id: "APP-2027-1002",
      fullName: "Lucas van der Merwe",
      email: "lucas.vdm@uct-resilience.za",
      phone: "+27 82 555 0149",
      nationality: "South Africa",
      countryOfResidence: "South Africa",
      age: 27,
      dateOfBirth: "1999-03-22",
      categoryProfile: "SDGs / Sustainability Professional",
      organizationOrUniversity: "Western Cape Water & Wildfire Initiative",
      packageId: "pkg-self-funded",
      packageName: "Self-Funded Delegate",
      amount: 749,
      scholarshipPreference: "N/A - Direct Self-Funded",
      speakerSlotInterest: false,
      speakerTopic: "",
      motivationStatement:
        "Working directly on drought and wildfire mitigation on the Cape Peninsula. Excited to welcome international delegates and contribute policy insights.",
      declarationInterest: "Wildfire & Drought Resilience Frameworks",
      dietaryOrAccessibility: "Vegetarian",
      referralSource: "University Partner",
      status: "ACCEPTED",
      paymentStatus: "PAID",
      paymentReference: "FLW-WDC-774129",
      paymentGateway: "flutterwave",
      adminNotes: "Confirmed Self-Funded Delegate.",
      createdAt: "2026-10-16T14:12:00Z",
      updatedAt: "2026-10-16T14:15:00Z",
    },
    {
      id: "APP-2027-1003",
      fullName: "Sofia Martinez",
      email: "sofia.m@andesclimate.pe",
      phone: "+51 987 555 321",
      nationality: "Peru",
      countryOfResidence: "Peru",
      age: 22,
      dateOfBirth: "2004-11-08",
      categoryProfile: "BA / BSc Undergraduate",
      organizationOrUniversity: "Pontificia Universidad Católica del Perú",
      packageId: "pkg-scholarship-app",
      packageName: "Scholarship Application (All 3 Tiers)",
      amount: 16.99,
      scholarshipPreference: "Partially Funded",
      speakerSlotInterest: true,
      speakerTopic: "Glacial Melt Monitoring and Indigenous Water Stewardship",
      motivationStatement:
        "Building youth brigades for disaster readiness in Andean mountain communities.",
      declarationInterest: "Indigenous Knowledge in Environmental Policy",
      dietaryOrAccessibility: "None",
      referralSource: "Social Media",
      status: "UNDER_REVIEW",
      paymentStatus: "PAID",
      paymentReference: "PSK-WDC-985110",
      paymentGateway: "paystack",
      adminNotes: "Application under merit review.",
      createdAt: "2026-10-17T08:40:00Z",
      updatedAt: "2026-10-17T08:42:00Z",
    },
  ],
  leads: [
    {
      id: "LEAD-101",
      fullName: "Daniel Mensah",
      email: "d.mensah@accratech.gh",
      phone: "+233 24 555 0199",
      country: "Ghana",
      interestType: "Scholarship Programme ($16.99)",
      source: "Homepage Hero Lead Capture",
      status: "NEW",
      notes: "Requested scholarship brochure and Declaration syllabus.",
      createdAt: "2026-10-16T11:30:00Z",
    },
    {
      id: "LEAD-102",
      fullName: "Elena Rostova",
      email: "elena.rostova@geneva-humanitarian.ch",
      phone: "+41 79 555 0123",
      country: "Switzerland",
      interestType: "Self-Funded Delegate ($749)",
      source: "Packages Section Inquiry",
      status: "CONTACTED",
      notes: "Interested in group sponsorship for 3 youth delegates.",
      createdAt: "2026-10-17T09:15:00Z",
    },
  ],
  payments: [
    {
      id: "PAY-1001",
      reference: "PSK-WDC-982341",
      applicationId: "APP-2027-1001",
      customerName: "Amara Okafor",
      customerEmail: "amara.okafor@climateyouth.org",
      customerPhone: "+234 803 555 0182",
      country: "Nigeria",
      packageId: "pkg-scholarship-app",
      packageName: "Scholarship Application (All 3 Tiers)",
      amount: 16.99,
      currency: "USD",
      gateway: "paystack",
      status: "SUCCESS",
      gatewayResponse: "Approved via Paystack Card Checkout",
      createdAt: "2026-10-15T10:22:00Z",
      paidAt: "2026-10-15T10:25:00Z",
    },
    {
      id: "PAY-1002",
      reference: "FLW-WDC-774129",
      applicationId: "APP-2027-1002",
      customerName: "Lucas van der Merwe",
      customerEmail: "lucas.vdm@uct-resilience.za",
      customerPhone: "+27 82 555 0149",
      country: "South Africa",
      packageId: "pkg-self-funded",
      packageName: "Self-Funded Delegate",
      amount: 749,
      currency: "USD",
      gateway: "flutterwave",
      status: "SUCCESS",
      gatewayResponse: "Approved via Flutterwave International Checkout",
      createdAt: "2026-10-16T14:13:00Z",
      paidAt: "2026-10-16T14:15:00Z",
    },
    {
      id: "PAY-1003",
      reference: "PSK-WDC-985110",
      applicationId: "APP-2027-1003",
      customerName: "Sofia Martinez",
      customerEmail: "sofia.m@andesclimate.pe",
      customerPhone: "+51 987 555 321",
      country: "Peru",
      packageId: "pkg-scholarship-app",
      packageName: "Scholarship Application (All 3 Tiers)",
      amount: 16.99,
      currency: "USD",
      gateway: "paystack",
      status: "SUCCESS",
      gatewayResponse: "Approved via Paystack Checkout",
      createdAt: "2026-10-17T08:41:00Z",
      paidAt: "2026-10-17T08:42:00Z",
    },
  ],
  contacts: [
    {
      id: "MSG-1001",
      fullName: "Dr. Tariq Al-Mansoor",
      email: "t.almansoor@resilience-institute.org",
      phone: "+971 50 555 0174",
      country: "United Arab Emirates",
      subject: "University Delegation & Partnership Inquiry",
      category: "Partnership & Sponsorship",
      message:
        "We would like to sponsor 5 undergraduate delegates for the Cape Town 2027 Summit and explore joining the partner roundtables on Day 03.",
      status: "UNREAD",
      createdAt: "2026-10-17T11:05:00Z",
    },
    {
      id: "MSG-1002",
      fullName: "Chloé Dubois",
      email: "chloe.dubois@sciencespo-climate.fr",
      phone: "+33 6 55 50 18 90",
      country: "France",
      subject: "Question regarding Visa Invitation Letter timeline",
      category: "Visa Support",
      message:
        "Hello WDC team, how soon after booking the Forum Access Pass ($349) do I receive the stamped visa invitation letter for the South African embassy?",
      status: "READ",
      adminReplyNotes: "Sent details: issued within 48 hours of confirmed registration.",
      createdAt: "2026-10-16T16:45:00Z",
    },
  ],
};
