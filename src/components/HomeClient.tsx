"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Check,
  ArrowRight,
  ArrowUpRight,
  Send,
  CheckCircle2,
  CreditCard,
  Compass,
  Calendar,
  Award,
  Handshake,
  Users,
  MapPin,
} from "lucide-react";
import { SiteCMSContent, DEFAULT_CMS_CONTENT } from "@/lib/default-data";
import {
  SunThemeCard,
  SectionPillBadge,
} from "./SunSummitDesign";
import { SiteShell } from "./NavbarAndFooter";
import GlobalTelemetryHeroMap from "./GlobalTelemetryHeroMap";
import CardSlider from "./CardSlider";
import PartnerOrbitSection from "./PartnerOrbitSection";
import SummitProgrammeOverview from "./SummitProgrammeOverview";

export default function HomeClient({ initialCms }: { initialCms: SiteCMSContent }) {
  const [cms, setCms] = useState<SiteCMSContent>(initialCms);

  // Countdown state
  const [timeLeft, setTimeLeft] = useState({
    days: 358,
    hours: 10,
    minutes: 53,
    seconds: 59,
  });

  // Lead capture form state
  const [leadForm, setLeadForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    interestType: "Scholarship Application ($16.99)",
  });
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState(false);
  const [leadError, setLeadError] = useState("");

  useEffect(() => {
    fetch("/api/cms?scope=public", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        if (data?.cms) setCms(data.cms);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const updateTimer = () => {
      const target = new Date(
        cms.settings.countdownTargetIso || "2027-10-11T09:00:00Z"
      ).getTime();
      const now = Date.now();
      const diff = Math.max(0, target - now);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
    };
    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [cms.settings.countdownTargetIso]);

  async function handleLeadSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLeadError("");
    setLeadSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...leadForm,
          source: "Homepage Prospectus & Lead Capture",
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setLeadError(data.error || "Could not submit your details.");
      } else {
        setLeadSuccess(true);
        setLeadForm({
          fullName: "",
          email: "",
          phone: "",
          country: "",
          interestType: "Scholarship Application ($16.99)",
        });
      }
    } catch {
      setLeadError("Network error. Please try again.");
    } finally {
      setLeadSubmitting(false);
    }
  }

  return (
    <SiteShell cms={cms}>
      {/* =====================================================================
          HERO SECTION — Powered by the WDC / MICHAEL Global Telemetry Map
          & Interactive 3D Globe Background
         ===================================================================== */}
      <section className="relative w-full min-h-[640px] lg:min-h-[700px] flex flex-col justify-between overflow-hidden bg-[#061322] text-white">
        {/* Interactive Map & Globe Background */}
        <GlobalTelemetryHeroMap />

        {/* Foreground Content */}
        <div className="relative z-20 max-w-[1280px] w-full mx-auto px-5 sm:px-8 lg:px-14 pt-14 sm:pt-20 pb-14">
          <div className="max-w-2xl">
            {/* Edition Badge */}
            <div className="inline-flex items-center gap-2 rounded-md bg-[#1A82B8] px-3.5 py-1.5 text-[11px] font-mono font-bold uppercase tracking-[0.14em] text-white mb-5 shadow-sm">
              <span>{cms.hero.badge}</span>
            </div>

            <p className="text-sm sm:text-base text-slate-200 font-medium mb-3">
              <span className="italic font-normal text-slate-300">
                World Disaster Center
              </span>{" "}
              <strong className="font-bold text-white">
                {cms.settings.summitTitle}
              </strong>
            </p>

            {/* Main Headline matching PDF Page 1 & SunSummit typography */}
            <h1 className="text-5xl sm:text-6xl md:text-[72px] font-extrabold tracking-tight leading-[1.03] mb-6 text-white">
              Join the <span className="text-[#FCE46D]">first</span>
              <br />
              global
              <br />
              summit.
            </h1>

            {/* Description with bold white highlights on "Cape Town, South Africa" & "WDC Global Environmental Protection Declaration." */}
            <p className="text-sm sm:text-base md:text-[17px] text-slate-200/95 leading-relaxed mb-7 max-w-xl">
              {(cms.hero.description || "")
                .split(
                  /(Cape Town, South Africa|WDC Global Environmental Protection Declaration\.?)/g
                )
                .map((part, i) =>
                  part === "Cape Town, South Africa" ||
                  part.startsWith(
                    "WDC Global Environmental Protection Declaration"
                  ) ? (
                    <strong key={i} className="font-extrabold text-white">
                      {part}
                    </strong>
                  ) : (
                    <React.Fragment key={i}>{part}</React.Fragment>
                  )
                )}
            </p>

            {/* Meta Pills */}
            <div className="flex flex-wrap items-center gap-2.5 mb-7">
              {cms.hero.metaPills.map((pill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center rounded-full bg-[#0D2238]/85 border border-sky-300/25 px-4 py-1.5 text-xs font-medium text-slate-100 backdrop-blur-xs"
                >
                  {pill}
                </span>
              ))}
            </div>

            {/* Live Countdown Boxes */}
            <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5 max-w-md mb-8">
              {[
                { value: timeLeft.days, label: "DAYS" },
                { value: timeLeft.hours, label: "HOURS" },
                { value: timeLeft.minutes, label: "MINUTES" },
                { value: timeLeft.seconds, label: "SECONDS" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl bg-[#132C44]/90 border border-sky-400/20 px-3 py-3 text-center backdrop-blur-md"
                >
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums">
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <div className="text-[10px] font-mono tracking-[0.14em] text-sky-200/75 mt-0.5">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Primary & Secondary Buttons */}
            <div className="flex flex-wrap items-center gap-3.5">
              <Link
                href="/apply"
                className="inline-flex items-center justify-center rounded-full bg-[#FCE46D] hover:bg-[#F7D742] text-[#1B2228] font-bold px-8 py-3.5 text-sm shadow-md transition-all"
              >
                {cms.hero.primaryCta}
              </Link>
              <Link
                href="/declaration"
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 hover:bg-white/15 text-white font-semibold px-7 py-3.5 text-sm backdrop-blur-xs transition-all"
              >
                {cms.hero.secondaryCta}
              </Link>
            </div>
          </div>
        </div>

        {/* Infinite-Scrolling Yellow Ticker Bar at Bottom of Hero */}
        <div className="relative z-20 w-full bg-[#FCE46D] border-t border-[#EBD052] py-3.5 overflow-hidden select-none">
          <div className="animate-wdc-marquee items-center gap-8 whitespace-nowrap text-[11px] sm:text-xs font-extrabold tracking-[0.16em] uppercase text-[#1B2228]">
            {[
              ...cms.hero.tickerItems,
              ...cms.hero.tickerItems,
              ...cms.hero.tickerItems,
              ...cms.hero.tickerItems,
            ].map((item, idx) => (
              <span key={idx} className="inline-flex items-center gap-8">
                <span>{item}</span>
                <span className="text-[#1B2228]/45">•</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 01 · ABOUT THE SUMMIT & DIVIDED STATS BANNER CARD
          Matches the SunSummit white stats card layout!
         ===================================================================== */}
      <section className="px-5 sm:px-8 lg:px-14 pt-14 sm:pt-20 pb-10">
        <div className="max-w-[1240px] mx-auto">
          <div className="bg-white rounded-[28px] sm:rounded-[32px] p-7 sm:p-10 md:p-12 shadow-card border border-slate-200/70">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-9 border-b border-slate-200/80 items-start">
              <div className="lg:col-span-5">
                <SectionPillBadge
                  number={cms.about.sectionNumber}
                  label={cms.about.sectionLabel}
                />
                <h2 className="text-2xl sm:text-3xl md:text-[36px] font-bold tracking-tight text-[#1B2228] leading-[1.15]">
                  {cms.about.headline}
                </h2>
              </div>
              <div className="lg:col-span-7 space-y-4 text-sm sm:text-[15px] text-[#4A5864] leading-relaxed">
                <p>{cms.about.paragraph1}</p>
                <p>{cms.about.paragraph2}</p>
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    href="/packages"
                    className="inline-flex items-center gap-2 rounded-full bg-[#1B2228] hover:bg-[#323E48] text-white text-xs font-semibold px-6 py-3 transition-all"
                  >
                    <span>{cms.about.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/summit"
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#1B2228]/25 hover:bg-slate-100 text-[#1B2228] text-xs font-semibold px-5 py-3 transition-all"
                  >
                    <span>Explore Six Pillars & Host City</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/80 pt-8 gap-y-6">
              {cms.about.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className={`${idx > 0 ? "sm:pl-8" : ""} ${
                    idx < cms.about.stats.length - 1 ? "sm:pr-6" : ""
                  }`}
                >
                  <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#1B2228] mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-[#54626F] font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 02 · WHY JOIN THE SUMMIT?
          Signature SunSummit Pastel-Blue & Slate Sunburst Cards!
         ===================================================================== */}
      <section className="px-5 sm:px-8 lg:px-14 py-12 sm:py-16">
        <div className="max-w-[1240px] mx-auto">
          <div className="max-w-2xl mb-8">
            <SectionPillBadge
              number={cms.whyAttend.sectionNumber}
              label={cms.whyAttend.sectionLabel}
            />
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold tracking-tight text-[#1B2228] leading-[1.12] mb-3">
              {cms.whyAttend.headline}
            </h2>
            <p className="text-sm sm:text-base text-[#54626F]">
              {cms.whyAttend.subtitle}
            </p>
          </div>

          {/* Cards in Responsive Slider */}
          <CardSlider
            cardClassName="w-[88vw] sm:w-[460px] lg:w-[540px]"
            badge="Swipe to explore outcomes"
          >
            {cms.whyAttend.cards.map((card, index) => {
              const isSlate = card.theme === "slate";
              const cardHref =
                index === 0
                  ? "/declaration"
                  : index === 1
                  ? "/programme#stage"
                  : "/summit#pillars";
              const cardCta =
                index === 0
                  ? "Read About the Declaration"
                  : index === 1
                  ? "Explore 20 Speaker Slots"
                  : "View Full 5-Day Programme";

              return (
                <SunThemeCard
                  key={card.id}
                  theme={card.theme}
                  watermarkPosition={index === 1 ? "top-center" : "bottom-right"}
                  className="h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${
                          isSlate
                            ? "border-white/25 bg-white/10 text-[#FCE46D]"
                            : "border-[#1B2228]/20 bg-white/60 text-[#1B2228]"
                        }`}
                      >
                        {card.number}
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2.5">
                      {card.title}
                    </h3>
                    <p
                      className={`text-sm sm:text-[15px] mb-6 max-w-2xl ${
                        isSlate ? "text-slate-200" : "text-[#3D4B56]"
                      }`}
                    >
                      {card.description}
                    </p>
                    <ul className="space-y-3 mb-7">
                      {card.bullets.map((bullet, bIdx) => (
                        <li
                          key={bIdx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed"
                        >
                          <span
                            className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                              isSlate
                                ? "bg-[#FCE46D] text-[#1B2228]"
                                : "bg-white/80 text-[#1B2228]"
                            }`}
                          >
                            <Check className="w-3 h-3 stroke-[2.5]" />
                          </span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                    <Link
                      href={cardHref}
                      className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-xs font-semibold transition-all ${
                        isSlate
                          ? "border-white/40 text-white hover:bg-white hover:text-[#1B2228]"
                          : "border-[#1B2228]/40 text-[#1B2228] hover:bg-[#1B2228] hover:text-white"
                      }`}
                    >
                      <span>{cardCta}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    {index === 2 && (
                      <span className="text-xs text-slate-200/90">
                        Scholarships available.
                      </span>
                    )}
                  </div>
                </SunThemeCard>
              );
            })}
          </CardSlider>
        </div>
      </section>

      {/* =====================================================================
          SECTION 03 · MEET THE TEAM (ROTATING CIRCULAR ORBIT WITH HOVER DETAIL CARD)
          Matches Reference Image 1 ("STRATEGY, PARTNERSHIPS AND DEVELOPMENT TEAM · Meet the Team")
         ===================================================================== */}
      <PartnerOrbitSection
        eyebrow="LEADERSHIP & YOUTH DEVELOPMENT INITIATIVES"
        headline="Meet the Team"
        subtitle="The executive leadership, technical architects, and emerging youth tracks driving the World Disaster Center Youth Leadership Summit 2027 in Cape Town."
        members={
          (cms.teamSection || DEFAULT_CMS_CONTENT.teamSection).members?.length
            ? (cms.teamSection || DEFAULT_CMS_CONTENT.teamSection).members
            : DEFAULT_CMS_CONTENT.teamSection.members
        }
        showViewAllButton={true}
        viewAllHref="/opportunities"
        viewAllLabel="Explore Summit Opportunities"
      />

      {/* =====================================================================
          SECTION 04 · SUMMIT PROGRAMME OVERVIEW (11–15 OCTOBER 2027)
          Extracted & corrected from official Youth Leadership Summit 2027 overview
         ===================================================================== */}
      <section id="programme-overview" className="px-5 sm:px-8 lg:px-14 py-10 sm:py-14">
        <div className="max-w-[1240px] mx-auto">
          <SummitProgrammeOverview
            days={cms.programme?.days || DEFAULT_CMS_CONTENT.programme.days}
            compact={true}
          />
        </div>
      </section>

      {/* =====================================================================
          DEDICATED PAGES DIRECTORY & $16.99 SCHOLARSHIP CALLOUT
         ===================================================================== */}
      <section className="px-5 sm:px-8 lg:px-14 py-10">
        <div className="max-w-[1240px] mx-auto space-y-6">
          {/* $16.99 Scholarship Highlight Banner */}
          <div className="rounded-[28px] bg-[#1E2933] text-white p-7 sm:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-card">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-6">
              <div className="flex items-baseline gap-2.5">
                <span className="text-4xl sm:text-5xl font-extrabold text-[#FCE46D]">
                  ${cms.scholarshipSection.applicationFeePrice}
                </span>
                <span className="text-sm text-slate-300 font-medium">
                  {cms.scholarshipSection.applicationFeeLabel}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 max-w-xl leading-relaxed">
                {cms.scholarshipSection.applicationFeeNote}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/apply?package=pkg-scholarship-app"
                className="inline-flex items-center gap-2 rounded-full bg-[#FCE46D] hover:bg-[#F7D742] text-[#1B2228] font-bold px-7 py-3.5 text-xs sm:text-sm transition-all"
              >
                <span>{cms.scholarshipSection.applicationFeeCta}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/packages"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/25 hover:bg-white/10 text-white font-medium px-6 py-3.5 text-xs sm:text-sm transition-all"
              >
                <span>Compare All Packages</span>
              </Link>
            </div>
          </div>

          {/* Quick Navigation Cards in Slider for Mobile/Tablet */}
          <div className="pt-2">
            <div className="mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[#54626F] font-bold">
                EXPLORE SUMMIT ARCHITECTURE
              </span>
            </div>
            <CardSlider
              cardClassName="w-[78vw] sm:w-[280px] lg:w-[285px]"
              gap="gap-4"
              showArrows={true}
              showDots={true}
            >
              {[
                <Link key="summit" href="/summit" className="group block h-full">
                  <SunThemeCard theme="ice" className="h-full flex flex-col justify-between">
                    <div>
                      <Compass className="w-6 h-6 text-[#1B2228] mb-3" />
                      <h3 className="text-lg font-bold text-[#1B2228] mb-1">
                        Six Pillars & Cape Town
                      </h3>
                      <p className="text-xs text-[#4A5864] leading-relaxed mb-4">
                        Explore the six training pillars and why Cape Town hosts the 1st global edition (11–15 Oct 2027).
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#1B2228] group-hover:translate-x-1 transition-transform">
                      Explore The Summit <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </SunThemeCard>
                </Link>,

                <Link key="decl" href="/declaration" className="group block h-full">
                  <SunThemeCard theme="powder" className="h-full flex flex-col justify-between">
                    <div>
                      <Award className="w-6 h-6 text-[#1B2228] mb-3" />
                      <h3 className="text-lg font-bold text-[#1B2228] mb-1">
                        The WDC Declaration
                      </h3>
                      <p className="text-xs text-[#2C3740] leading-relaxed mb-4">
                        Learn how delegates draft, debate, and sign the Global Environmental Protection Declaration.
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#1B2228] group-hover:translate-x-1 transition-transform">
                      View Declaration <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </SunThemeCard>
                </Link>,

                <Link key="prog" href="/programme" className="group block h-full">
                  <SunThemeCard theme="glacier" className="h-full flex flex-col justify-between">
                    <div>
                      <Calendar className="w-6 h-6 text-[#1B2228] mb-3" />
                      <h3 className="text-lg font-bold text-[#1B2228] mb-1">
                        11–15 Oct Programme
                      </h3>
                      <p className="text-xs text-[#2C3740] leading-relaxed mb-4">
                        Full 11–15 October 2027 itinerary in Cape Town, 20 speaker slots, and eligibility criteria.
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#1B2228] group-hover:translate-x-1 transition-transform">
                      See Schedule <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </SunThemeCard>
                </Link>,

                <Link key="part" href="/partners" className="group block h-full">
                  <SunThemeCard theme="slate" className="h-full flex flex-col justify-between">
                    <div>
                      <Handshake className="w-6 h-6 text-[#FCE46D] mb-3" />
                      <h3 className="text-lg font-bold text-white mb-1">
                        Partners & Impact
                      </h3>
                      <p className="text-xs text-slate-200 leading-relaxed mb-4">
                        Meet the organisations behind the Summit and the long-term global youth network.
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#FCE46D] group-hover:translate-x-1 transition-transform">
                      Our Partners <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </SunThemeCard>
                </Link>,
              ]}
            </CardSlider>
          </div>
        </div>
      </section>

      {/* =====================================================================
          LEAD CAPTURE & PROSPECTUS DOWNLOAD SECTION
         ===================================================================== */}
      <section id="lead-capture" className="px-5 sm:px-8 lg:px-14 py-12 pb-16">
        <div className="max-w-[1240px] mx-auto">
          <SunThemeCard theme="powder" watermarkPosition="top-center" className="p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-3">
                <span className="inline-block rounded-full bg-white/80 px-3.5 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-[#1B2228]">
                  DELEGATE LEAD & PROSPECTUS DESK
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#1B2228]">
                  Get the 2027 Cape Town Information Pack & Scholarship Guide
                </h2>
                <p className="text-sm sm:text-base text-[#2C3740] leading-relaxed">
                  Register your interest to receive the official 11–15 October 2027 programme syllabus, scholarship application guide, and Declaration briefing paper.
                </p>
              </div>

              <div className="lg:col-span-6">
                {leadSuccess ? (
                  <div className="bg-white rounded-2xl p-6 sm:p-8 text-center space-y-3 shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-[#FCE46D] text-[#1B2228] flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-[#1B2228]">
                      You&apos;re on the 2027 Priority Delegate List!
                    </h3>
                    <p className="text-xs sm:text-sm text-[#54626F]">
                      Your details have been recorded in our Delegate Lead Desk.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3 pt-2">
                      <Link
                        href="/apply"
                        className="rounded-full bg-[#1B2228] text-white px-5 py-2.5 text-xs font-semibold"
                      >
                        Complete Application Now
                      </Link>
                      <button
                        type="button"
                        onClick={() => setLeadSuccess(false)}
                        className="rounded-full border border-slate-300 px-4 py-2.5 text-xs font-medium text-[#1B2228]"
                      >
                        Register Another Lead
                      </button>
                    </div>
                  </div>
                ) : (
                  <form
                    onSubmit={handleLeadSubmit}
                    className="bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-7 shadow-sm space-y-3.5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="lead-fullname" className="block text-xs font-semibold text-[#1B2228] mb-1">
                          Full Name *
                        </label>
                        <input
                          id="lead-fullname"
                          type="text"
                          required
                          aria-required="true"
                          autoComplete="name"
                          placeholder="e.g. Amara Okafor"
                          value={leadForm.fullName}
                          onChange={(e) =>
                            setLeadForm({ ...leadForm, fullName: e.target.value })
                          }
                          className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#1B2228] focus-visible:ring-2 focus-visible:ring-[#1B2228]"
                        />
                      </div>
                      <div>
                        <label htmlFor="lead-email" className="block text-xs font-semibold text-[#1B2228] mb-1">
                          Email Address *
                        </label>
                        <input
                          id="lead-email"
                          type="email"
                          required
                          aria-required="true"
                          autoComplete="email"
                          placeholder="you@example.com"
                          value={leadForm.email}
                          onChange={(e) =>
                            setLeadForm({ ...leadForm, email: e.target.value })
                          }
                          className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#1B2228] focus-visible:ring-2 focus-visible:ring-[#1B2228]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="lead-country" className="block text-xs font-semibold text-[#1B2228] mb-1">
                          Country / Nationality
                        </label>
                        <input
                          id="lead-country"
                          type="text"
                          autoComplete="country-name"
                          placeholder="e.g. South Africa"
                          value={leadForm.country}
                          onChange={(e) =>
                            setLeadForm({ ...leadForm, country: e.target.value })
                          }
                          className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#1B2228] focus-visible:ring-2 focus-visible:ring-[#1B2228]"
                        />
                      </div>
                      <div>
                        <label htmlFor="lead-track" className="block text-xs font-semibold text-[#1B2228] mb-1">
                          Interested Track
                        </label>
                        <select
                          id="lead-track"
                          value={leadForm.interestType}
                          onChange={(e) =>
                            setLeadForm({
                              ...leadForm,
                              interestType: e.target.value,
                            })
                          }
                          className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm bg-white focus:outline-none focus:border-[#1B2228] focus-visible:ring-2 focus-visible:ring-[#1B2228]"
                        >
                          <option value="Scholarship Application ($16.99)">
                            Scholarship Application ($16.99)
                          </option>
                          <option value="Self-Funded Delegate ($749)">
                            Self-Funded Delegate ($749)
                          </option>
                          <option value="Forum Access Pass ($349)">
                            Forum Access Pass ($349)
                          </option>
                          <option value="Visa Invitation Letter ($99)">
                            Visa Invitation Letter ($99)
                          </option>
                          <option value="Institutional Partnership">
                            Institutional Partnership
                          </option>
                        </select>
                      </div>
                    </div>

                    {leadError && (
                      <p role="alert" aria-live="polite" className="text-xs text-red-600 font-medium">{leadError}</p>
                    )}

                    <button
                      type="submit"
                      disabled={leadSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#455664] hover:bg-[#33414D] text-white font-semibold py-3 px-6 text-xs sm:text-sm transition-all disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2228] focus-visible:ring-offset-2"
                    >
                      <Send className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>
                        {leadSubmitting
                          ? "Registering Your Interest..."
                          : "Send Me the 2027 Summit Info Pack"}
                      </span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </SunThemeCard>
        </div>
      </section>

      {/* =====================================================================
          SECTION 11 · OUR PARTNERS (INFINITE SCROLLING MARQUEE WITH REAL LOGOS)
          Placed directly above the Final CTA!
         ===================================================================== */}
      <section id="partners-marquee" className="py-12 sm:py-16 overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-14 mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <SectionPillBadge
                number={cms.partnersSection.sectionNumber}
                label={cms.partnersSection.sectionLabel}
              />
              <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold tracking-tight text-[#1B2228] leading-[1.12] mb-2.5">
                {cms.partnersSection.headline}
              </h2>
              <p className="text-sm sm:text-base text-[#54626F]">
                {cms.partnersSection.subtitle}
              </p>
            </div>

            <div className="shrink-0">
              <Link
                href="/partners"
                className="inline-flex items-center gap-2 rounded-full border border-[#1B2228]/25 bg-white hover:bg-[#1B2228] text-[#1B2228] hover:text-white font-semibold px-6 py-3 text-xs sm:text-sm shadow-2xs transition-all"
              >
                <Handshake className="w-4 h-4" />
                <span>View Partners &amp; Summit Impact</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Full-Width Infinite Scrolling Logo Marquee */}
        <div className="relative w-full overflow-hidden py-3">
          {/* Left & Right Soft Gradient Masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#F4F6F8] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#F4F6F8] to-transparent z-10" />

          <div className="animate-wdc-marquee gap-5 px-3">
            {[
              ...(cms.partnersSection.partners?.length
                ? cms.partnersSection.partners
                : DEFAULT_CMS_CONTENT.partnersSection.partners),
              ...(cms.partnersSection.partners?.length
                ? cms.partnersSection.partners
                : DEFAULT_CMS_CONTENT.partnersSection.partners),
            ].map((partner, idx) => (
              <div
                key={`${partner.id}-${idx}`}
                className="w-[250px] sm:w-[285px] shrink-0 rounded-[24px] bg-white hover:bg-[#EEF6FC] border border-slate-200/80 p-6 shadow-card transition-all flex flex-col items-center justify-between text-center group"
              >
                <div className="w-full h-20 flex items-center justify-center px-3 py-2 rounded-2xl bg-[#F8FAFC] border border-slate-100 mb-4">
                  {partner.logoUrl ? (
                    <img
                      src={partner.logoUrl}
                      alt={partner.name}
                      className="max-h-14 max-w-[190px] w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <span className="text-lg font-extrabold text-[#1B2228]">
                      {partner.name}
                    </span>
                  )}
                </div>
                <div>
                  <div className="text-sm sm:text-base font-bold text-[#1B2228] leading-snug">
                    {partner.name}
                  </div>
                  {partner.category && (
                    <div className="text-[11px] font-medium text-[#54626F] mt-1">
                      {partner.category}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
