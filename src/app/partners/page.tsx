"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DEFAULT_CMS_CONTENT, SiteCMSContent } from "@/lib/default-data";
import { SiteShell } from "@/components/NavbarAndFooter";
import { SunThemeCard, SectionPillBadge } from "@/components/SunSummitDesign";
import CardSlider from "@/components/CardSlider";
import PartnerOrbitSection from "@/components/PartnerOrbitSection";

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
      {/* SECTION 11 · ROTATING CIRCULAR PARTNER ORBIT SECTION */}
      <PartnerOrbitSection
        eyebrow="STRATEGIC PARTNERS, DATA & GLOBAL ECOSYSTEM"
        headline={cms.partnersSection.headline}
        subtitle={cms.partnersSection.subtitle}
        partners={
          cms.partnersSection.partners?.length
            ? cms.partnersSection.partners
            : DEFAULT_CMS_CONTENT.partnersSection.partners
        }
        showViewAllButton={false}
      />

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
