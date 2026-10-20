"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DEFAULT_CMS_CONTENT, SiteCMSContent } from "@/lib/default-data";
import { SiteShell } from "@/components/NavbarAndFooter";
import { SunThemeCard, SectionPillBadge } from "@/components/SunSummitDesign";
import CardSlider from "@/components/CardSlider";
import SummitProgrammeOverview from "@/components/SummitProgrammeOverview";

export default function ProgrammePage() {
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
            number={cms.programme.sectionNumber}
            label="SUMMIT OVERVIEW · 11 – 15 OCTOBER 2027"
            dark
          />
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight max-w-3xl leading-[1.08] mb-5">
            Youth Leadership Summit 2027 Programme
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed mb-4">
            {cms.programme.subtitle}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-mono text-[#FCE46D]">
            <span>11–15 October 2027</span>
            <span>·</span>
            <span>Cape Town, South Africa</span>
            <span>·</span>
            <span>200 Registered Delegates</span>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 07 · THE PROGRAMME OVERVIEW (11–15 OCTOBER 2027)
          Extracted & corrected from official Youth Leadership Summit 2027 board
         ===================================================================== */}
      <section
        id="programme"
        className="px-5 sm:px-8 lg:px-14 pt-12 sm:pt-16 pb-10"
      >
        <div className="max-w-[1240px] mx-auto">
          {/* Complete 4-Stage Summit Overview Board with 2D/3D Illustrations */}
          <SummitProgrammeOverview
            days={cms.programme?.days || DEFAULT_CMS_CONTENT.programme.days}
            showHeading={false}
          />

          <div className="rounded-[26px] bg-[#1E2933] text-white p-7 sm:p-9 flex flex-col sm:flex-row items-center justify-between gap-6 mt-10 shadow-card">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-1">
                {cms.programme.bannerTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                {cms.programme.bannerSubtitle}
              </p>
            </div>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("open-apply-modal"))}
              className="shrink-0 inline-flex items-center gap-2 rounded-full bg-[#FCE46D] hover:bg-[#F7D742] text-[#1B2228] font-semibold px-7 py-3 text-xs sm:text-sm transition-all cursor-pointer"
            >
              <span>{cms.programme.bannerCta}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 06 · YOUR VOICE, ON STAGE ("The Stage Is Yours") */}
      <section id="stage" className="px-5 sm:px-8 lg:px-14 py-10">
        <div className="max-w-[1240px] mx-auto">
          <SunThemeCard
            theme="slate"
            watermarkPosition="bottom-left"
            className="p-8 sm:p-12 lg:p-14"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-4 text-center lg:text-left border-b lg:border-b-0 lg:border-r border-white/15 pb-6 lg:pb-0 lg:pr-8">
                <div className="text-7xl sm:text-8xl md:text-[108px] font-extrabold text-[#FCE46D] leading-none tracking-tight">
                  {cms.stage.bigNumber}
                </div>
                <div className="text-base sm:text-lg font-semibold text-white mt-2">
                  {cms.stage.bigNumberLabel}
                </div>
              </div>

              <div className="lg:col-span-8 space-y-5">
                <SectionPillBadge
                  number={cms.stage.sectionNumber}
                  label={cms.stage.sectionLabel}
                  dark
                />
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  {cms.stage.headline}
                </h2>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  {cms.stage.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="rounded-2xl bg-white/10 border border-white/15 p-5">
                    <div className="text-xs font-mono uppercase tracking-wider text-[#FCE46D] mb-1">
                      {cms.stage.whoTitle}
                    </div>
                    <div className="text-sm font-medium text-white">
                      {cms.stage.whoDescription}
                    </div>
                  </div>
                  <div className="rounded-2xl bg-white/10 border border-white/15 p-5">
                    <div className="text-xs font-mono uppercase tracking-wider text-[#FCE46D] mb-1">
                      {cms.stage.howManyTitle}
                    </div>
                    <div className="text-sm font-medium text-white">
                      {cms.stage.howManyDescription}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 pt-1">
                  {cms.stage.footnote}
                </p>
              </div>
            </div>
          </SunThemeCard>
        </div>
      </section>

      {/* SECTION 08 · IS THIS FOR YOU? ("Who Can Apply?") */}
      <section id="who-can-apply" className="px-5 sm:px-8 lg:px-14 py-12 pb-16">
        <div className="max-w-[1240px] mx-auto">
          <div className="max-w-2xl mb-8">
            <SectionPillBadge
              number={cms.whoCanApply.sectionNumber}
              label={cms.whoCanApply.sectionLabel}
            />
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold tracking-tight text-[#1B2228] leading-[1.12] mb-3">
              {cms.whoCanApply.headline}
            </h2>
            <p className="text-sm sm:text-base text-[#54626F]">
              {cms.whoCanApply.subtitle}
            </p>
          </div>

          <CardSlider
            cardClassName="w-[85vw] sm:w-[320px] lg:w-[350px]"
            gap="gap-5"
            badge="Eligibility Profiles"
          >
            {cms.whoCanApply.profiles.map((prof, idx) => {
              const isSlate = prof.theme === "slate";
              return (
                <SunThemeCard
                  key={idx}
                  theme={prof.theme}
                  watermarkPosition="bottom-right"
                  className="h-full"
                >
                  <div
                    className={`text-2xl sm:text-3xl font-extrabold tracking-tight mb-2 ${
                      isSlate ? "text-[#FCE46D]" : "text-[#1B2228]"
                    }`}
                  >
                    {prof.badge}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold mb-2">
                    {prof.title}
                  </h3>
                  <p
                    className={`text-xs sm:text-sm leading-relaxed ${
                      isSlate ? "text-slate-200" : "text-[#4A5864]"
                    }`}
                  >
                    {prof.description}
                  </p>
                </SunThemeCard>
              );
            })}
          </CardSlider>

          <p className="text-xs sm:text-sm text-[#54626F] max-w-3xl mt-6">
            {cms.whoCanApply.footerNote}
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
