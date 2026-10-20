"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DEFAULT_CMS_CONTENT, SiteCMSContent } from "@/lib/default-data";
import { SiteShell } from "@/components/NavbarAndFooter";
import { SunThemeCard, SectionPillBadge } from "@/components/SunSummitDesign";
import CardSlider from "@/components/CardSlider";

export default function PartnersPage() {
  const [cms, setCms] = useState<SiteCMSContent>(DEFAULT_CMS_CONTENT);

  useEffect(() => {
    fetch("/api/cms?scope=public", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (d?.cms) setCms(d.cms);
      })
      .catch(() => {});
  }, []);

  return (
    <SiteShell cms={cms}>
      {/* Page Header matching /summit style */}
      <section className="bg-[#0B1C2E] text-white py-16 sm:py-20 px-5 sm:px-8 lg:px-14 border-b border-white/10">
        <div className="max-w-[1240px] mx-auto">
          <SectionPillBadge
            number={cms.partnersSection.sectionNumber}
            label={cms.partnersSection.sectionLabel}
            dark
          />
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight max-w-3xl leading-[1.08] mb-5">
            {cms.partnersSection.headline}
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed mb-4">
            {cms.partnersSection.subtitle}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-mono text-[#FCE46D]">
            <span>Global Coalition &amp; Technology Ecosystem</span>
            <span>·</span>
            <span>Cape Town 2027</span>
          </div>
        </div>
      </section>

      {/* SECTION 11 · OUR PARTNERS MARQUEE */}
      <section className="pt-12 sm:pt-16 pb-10 overflow-hidden">
        {/* Infinite Scrolling Logo Marquee */}
        <div className="relative w-full overflow-hidden py-4 mb-8">
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
                className="w-[260px] sm:w-[295px] shrink-0 rounded-[24px] bg-white hover:bg-[#E8F2F9] border border-slate-200/80 p-7 text-center shadow-card transition-all flex flex-col items-center justify-between min-h-[175px]"
              >
                <div className="w-full h-20 flex items-center justify-center px-3 py-2 rounded-2xl bg-[#F8FAFC] border border-slate-100 mb-4">
                  {partner.logoUrl ? (
                    <img
                      src={partner.logoUrl}
                      alt={partner.name}
                      className="max-h-14 max-w-[195px] w-auto h-auto object-contain"
                    />
                  ) : (
                    <span className="text-lg font-extrabold text-[#1B2228]">
                      {partner.name}
                    </span>
                  )}
                </div>
                <div>
                  <div className="text-base sm:text-lg font-bold text-[#1B2228]">
                    {partner.name}
                  </div>
                  {partner.category && (
                    <div className="text-xs text-[#54626F] mt-1">
                      {partner.category}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 12 · BEYOND THE FIVE DAYS ("Impact of the Summit") */}
      <section className="px-5 sm:px-8 lg:px-14 py-12 pb-16">
        <div className="max-w-[1240px] mx-auto">
          <div className="max-w-2xl mb-8">
            <SectionPillBadge
              number={cms.impactSection.sectionNumber}
              label={cms.impactSection.sectionLabel}
            />
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold tracking-tight text-[#1B2228] leading-[1.12] mb-2">
              {cms.impactSection.headline}
            </h2>
            <p className="text-sm sm:text-base text-[#54626F]">
              {cms.impactSection.subtitle}
            </p>
          </div>

          <CardSlider
            cardClassName="w-[85vw] sm:w-[340px] lg:w-[370px]"
            gap="gap-5"
            badge="Long-Term Outcomes"
          >
            {cms.impactSection.items.map((item, idx) => {
              const isSlate = item.theme === "slate";
              return (
                <SunThemeCard
                  key={idx}
                  theme={item.theme}
                  watermarkPosition="bottom-right"
                  className="h-full"
                >
                  <div
                    className={`text-xs font-mono font-bold mb-2 ${
                      isSlate ? "text-[#FCE46D]" : "text-[#455664]"
                    }`}
                  >
                    {item.number}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2">
                    {item.title}
                  </h3>
                  <p
                    className={`text-xs sm:text-sm leading-relaxed ${
                      isSlate ? "text-slate-200" : "text-[#4A5864]"
                    }`}
                  >
                    {item.description}
                  </p>
                </SunThemeCard>
              );
            })}
          </CardSlider>

          <div className="rounded-[28px] bg-white border border-slate-200/80 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-card mt-10">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1B2228] mb-1">
                Interested in Becoming an Institutional Partner?
              </h3>
              <p className="text-xs sm:text-sm text-[#54626F]">
                Sponsor youth delegates, host a Partnership Roundtable in Cape Town (11–15 October 2027), or collaborate on climate data research.
              </p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 inline-flex items-center gap-2 rounded-full bg-[#1B2228] hover:bg-[#323E48] text-white font-semibold px-7 py-3.5 text-xs sm:text-sm transition-all"
            >
              <span>Contact Partnership Desk</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
