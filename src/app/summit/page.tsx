"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DEFAULT_CMS_CONTENT, SiteCMSContent } from "@/lib/default-data";
import { SiteShell } from "@/components/NavbarAndFooter";
import { SunThemeCard, SectionPillBadge } from "@/components/SunSummitDesign";
import CardSlider from "@/components/CardSlider";

export default function SummitPage() {
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
      {/* Page Header */}
      <section className="bg-[#0B1C2E] text-white py-16 sm:py-20 px-5 sm:px-8 lg:px-14 border-b border-white/10">
        <div className="max-w-[1240px] mx-auto">
          <SectionPillBadge
            number={cms.about.sectionNumber}
            label={cms.about.sectionLabel}
            dark
          />
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight max-w-3xl leading-[1.08] mb-5">
            {cms.about.headline}
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed mb-4">
            {cms.about.paragraph1}
          </p>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            {cms.about.paragraph2}
          </p>
        </div>
      </section>

      {/* Stats Banner Card */}
      <section className="px-5 sm:px-8 lg:px-14 -mt-8 relative z-20 pb-8">
        <div className="max-w-[1240px] mx-auto bg-white rounded-[28px] p-7 sm:p-10 shadow-card border border-slate-200/80">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/80 gap-y-6">
            {cms.about.stats.map((stat, idx) => (
              <div
                key={idx}
                className={`${idx > 0 ? "sm:pl-8" : ""} ${
                  idx < cms.about.stats.length - 1 ? "sm:pr-6" : ""
                }`}
              >
                <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#1B2228] mb-1.5">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-[#54626F] font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 04 · SIX PILLARS OF RESILIENCE (In Responsive Slider) */}
      <section id="pillars" className="px-5 sm:px-8 lg:px-14 py-12 sm:py-16">
        <div className="max-w-[1240px] mx-auto">
          <div className="max-w-2xl mb-8">
            <SectionPillBadge
              number={cms.pillars.sectionNumber}
              label={cms.pillars.sectionLabel}
            />
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold tracking-tight text-[#1B2228] leading-[1.12] mb-3">
              {cms.pillars.headline}
            </h2>
            <p className="text-sm sm:text-base text-[#54626F]">
              {cms.pillars.subtitle}
            </p>
          </div>

          <CardSlider
            cardClassName="w-[85vw] sm:w-[360px] lg:w-[380px]"
            gap="gap-5"
            badge="Six Pillars Curriculum"
          >
            {cms.pillars.items.map((pillar, idx) => {
              const isSlate = pillar.theme === "slate";
              return (
                <SunThemeCard
                  key={idx}
                  theme={pillar.theme}
                  watermarkPosition={idx % 2 === 0 ? "bottom-right" : "top-center"}
                  className="h-full flex flex-col justify-between"
                >
                  <div>
                    <div
                      className={`text-xs font-mono font-bold mb-3 ${
                        isSlate ? "text-[#FCE46D]" : "text-[#455664]"
                      }`}
                    >
                      {pillar.number}
                    </div>
                    <h3 className="text-xl font-bold tracking-tight mb-2.5">
                      {pillar.title}
                    </h3>
                    <p
                      className={`text-sm leading-relaxed mb-6 ${
                        isSlate ? "text-slate-200" : "text-[#3D4B56]"
                      }`}
                    >
                      {pillar.description}
                    </p>
                  </div>
                  <div>
                    <Link
                      href="/programme"
                      className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
                        isSlate
                          ? "border-white/35 text-white hover:bg-white hover:text-[#1B2228]"
                          : "border-[#1B2228]/30 text-[#1B2228] hover:bg-[#1B2228] hover:text-white"
                      }`}
                    >
                      <span>View 5-Day Programme</span>
                    </Link>
                  </div>
                </SunThemeCard>
              );
            })}
          </CardSlider>
        </div>
      </section>

      {/* SECTION 05 · THE HOST CITY ("Now, Why Cape Town?") */}
      <section id="host-city" className="px-5 sm:px-8 lg:px-14 py-12 pb-16">
        <div className="max-w-[1240px] mx-auto">
          <div className="bg-white rounded-[32px] p-8 sm:p-12 shadow-card border border-slate-200/70 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <SectionPillBadge
                number={cms.hostCity.sectionNumber}
                label={cms.hostCity.sectionLabel}
              />
              <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold tracking-tight text-[#1B2228] leading-[1.12]">
                {cms.hostCity.headline}
              </h2>
              <p className="text-sm sm:text-base text-[#4A5864] leading-relaxed">
                {cms.hostCity.paragraph1}
              </p>
              <p className="text-sm sm:text-base text-[#4A5864] leading-relaxed">
                {cms.hostCity.paragraph2}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {cms.hostCity.highlights.map((h, i) => (
                  <div
                    key={i}
                    className={`rounded-2xl bg-[#F4F8FB] border border-[#DCEAF4] p-4 ${
                      i === 2 ? "sm:col-span-2" : ""
                    }`}
                  >
                    <div className="font-bold text-sm sm:text-base text-[#1B2228]">
                      {h.title}
                    </div>
                    <div className="text-xs text-[#54626F] mt-0.5">
                      {h.subtitle}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  href="/apply"
                  className="inline-flex items-center gap-2 rounded-full bg-[#FCE46D] hover:bg-[#F7D742] text-[#1B2228] font-bold px-7 py-3.5 text-xs sm:text-sm transition-all"
                >
                  <span>Apply to Join Us in Cape Town</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-[28px] overflow-hidden bg-[#1D2D3A] aspect-[4/3] shadow-lg border border-slate-200 flex flex-col justify-end">
                <div className="absolute top-10 right-12 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FCE46D] shadow-[0_0_60px_rgba(252,228,109,0.75)]" />
                <svg
                  viewBox="0 0 600 360"
                  className="w-full h-auto relative z-10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 240 L95 165 L235 160 L355 155 L465 215 L600 230 L600 360 L0 360 Z"
                    fill="#143A52"
                  />
                  <path
                    d="M0 275 Q150 260 300 275 T600 270 L600 360 L0 360 Z"
                    fill="#1E6B8C"
                  />
                  <path
                    d="M0 310 Q150 295 300 310 T600 305 L600 360 L0 360 Z"
                    fill="#4BA3C7"
                  />
                  <path
                    d="M0 335 Q150 325 300 338 T600 332 L600 360 L0 360 Z"
                    fill="#8CCAE4"
                  />
                </svg>
                <div className="absolute bottom-4 left-5 right-5 z-20 flex items-center justify-between text-xs text-white/90 bg-[#1B2228]/65 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/15">
                  <span className="font-medium">
                    Table Mountain & Atlantic Coast · Cape Town
                  </span>
                  <span className="text-[#FCE46D] font-mono">10–14 Oct 2027</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
