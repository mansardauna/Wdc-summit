"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Check, Plus, Minus, ArrowRight, CreditCard } from "lucide-react";
import { DEFAULT_CMS_CONTENT, SiteCMSContent } from "@/lib/default-data";
import { SiteShell } from "@/components/NavbarAndFooter";
import { SunThemeCard, SectionPillBadge } from "@/components/SunSummitDesign";
import CardSlider from "@/components/CardSlider";

export default function PackagesPage() {
  const [cms, setCms] = useState<SiteCMSContent>(DEFAULT_CMS_CONTENT);
  const [openFaqId, setOpenFaqId] = useState<string | null>(
    DEFAULT_CMS_CONTENT.faqsSection.items[0]?.id || null
  );

  useEffect(() => {
    fetch("/api/cms?scope=public", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (d?.cms) setCms(d.cms);
      })
      .catch(() => {});
  }, []);

  const scholarshipPackages = cms.packages.filter(
    (p) => p.active && p.category === "scholarship" && p.id !== "pkg-scholarship-app"
  );
  const paidPackages = cms.packages.filter(
    (p) => p.active && (p.category === "paid" || p.category === "addon")
  );

  return (
    <SiteShell cms={cms}>
      {/* Page Header matching /summit style */}
      <section className="bg-[#0B1C2E] text-white py-16 sm:py-20 px-5 sm:px-8 lg:px-14 border-b border-white/10">
        <div className="max-w-[1240px] mx-auto">
          <SectionPillBadge
            number={cms.scholarshipSection.sectionNumber}
            label={cms.scholarshipSection.sectionLabel}
            dark
          />
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight max-w-3xl leading-[1.08] mb-5">
            {cms.scholarshipSection.headline}
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed mb-4">
            {cms.scholarshipSection.subtitle}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-mono text-[#FCE46D]">
            <span>Fully Funded, Partially Funded &amp; Forum Access</span>
            <span>·</span>
            <span>${cms.scholarshipSection.applicationFeePrice} Application Fee</span>
          </div>
        </div>
      </section>

      {/* SECTION 09 · SCHOLARSHIP PROGRAMME */}
      <section id="scholarships" className="px-5 sm:px-8 lg:px-14 pt-12 sm:pt-16 pb-10">
        <div className="max-w-[1240px] mx-auto">
          <div className="rounded-[28px] bg-[#1E2933] text-white p-7 sm:p-10 mb-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-card">
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
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent("open-apply-modal"))}
                className="inline-flex items-center gap-2 rounded-full bg-[#FCE46D] hover:bg-[#F7D742] text-[#1B2228] font-bold px-7 py-3.5 text-xs sm:text-sm transition-all cursor-pointer"
              >
                <span>{cms.scholarshipSection.applicationFeeCta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                href="/payment?package=pkg-scholarship-app"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/25 hover:bg-white/10 text-white font-medium px-5 py-3.5 text-xs sm:text-sm transition-all"
              >
                <CreditCard className="w-4 h-4" />
                <span>Pay Fee Directly</span>
              </Link>
            </div>
          </div>

          {/* Scholarship Tiers in Responsive Slider */}
          <CardSlider
            cardClassName="w-[85vw] sm:w-[360px] lg:w-[390px]"
            gap="gap-5"
            badge="Funded Seat Options"
          >
            {scholarshipPackages.map((pkg, idx) => (
              <SunThemeCard
                key={pkg.id}
                theme={idx === 0 ? "ice" : idx === 1 ? "powder" : "white"}
                watermarkPosition="bottom-right"
                className="h-full flex flex-col justify-between"
              >
                <div>
                  {pkg.badge && (
                    <div className="text-[11px] font-mono font-bold uppercase tracking-[0.14em] text-[#455664] mb-2">
                      {pkg.badge}
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-[#1B2228] mb-1">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-[#54626F] mb-5">{pkg.subtitle}</p>

                  <ul className="space-y-2.5 mb-6">
                    {pkg.features.map((feat, fIdx) => (
                      <li
                        key={fIdx}
                        className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#2C3740]"
                      >
                        <Check className="w-4 h-4 text-[#1B2228] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#1B2228]/10">
                  {pkg.footerNote && (
                    <p className="text-[11px] text-[#54626F] mb-3">
                      {pkg.footerNote}
                    </p>
                  )}
                  <Link
                    href={`/apply?package=${pkg.id}`}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#1B2228] hover:bg-[#323E48] text-white text-xs font-semibold py-3 px-5 transition-all"
                  >
                    <span>{pkg.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </SunThemeCard>
            ))}
          </CardSlider>
        </div>
      </section>

      {/* SECTION 10 · PAID PARTICIPATION (In Responsive Slider) */}
      <section id="paid-packages" className="px-5 sm:px-8 lg:px-14 py-12">
        <div className="max-w-[1240px] mx-auto">
          <div className="max-w-3xl mb-8">
            <SectionPillBadge
              number={cms.paidSection.sectionNumber}
              label={cms.paidSection.sectionLabel}
            />
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold tracking-tight text-[#1B2228] leading-[1.12] mb-3">
              {cms.paidSection.headline}
            </h2>
            <p className="text-sm sm:text-base text-[#54626F]">
              {cms.paidSection.subtitle}
            </p>
          </div>

          <CardSlider
            cardClassName="w-[85vw] sm:w-[380px] lg:w-[420px]"
            gap="gap-5"
            badge="Direct Guaranteed Seats"
          >
            {paidPackages.map((pkg, idx) => {
              const isAddon = pkg.category === "addon";
              return (
                <SunThemeCard
                  key={pkg.id}
                  theme={idx === 0 ? "white" : idx === 1 ? "ice" : "powder"}
                  watermarkPosition="bottom-right"
                  className="h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      {pkg.badge ? (
                        <span className="inline-block rounded-full bg-[#FCE46D] px-3.5 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-[#1B2228]">
                          {pkg.badge}
                        </span>
                      ) : (
                        <span className="inline-block rounded-full bg-white/80 px-3.5 py-1 text-[11px] font-mono uppercase tracking-wider text-[#455664]">
                          {isAddon ? "ADD-ON SERVICE" : "IMMEDIATE CONFIRMATION"}
                        </span>
                      )}
                      <span className="text-xs font-mono text-[#54626F]">
                        {pkg.currency}
                      </span>
                    </div>

                    <div className="text-4xl sm:text-5xl font-extrabold text-[#1B2228] tracking-tight mb-2">
                      ${pkg.price}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#1B2228]">
                      {pkg.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#54626F] mb-5">
                      {pkg.subtitle}
                    </p>

                    <ul className="space-y-2.5 mb-7">
                      {pkg.features.map((feat, fIdx) => (
                        <li
                          key={fIdx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2C3740]"
                        >
                          <Check className="w-4 h-4 text-[#1B2228] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-200/70">
                    <Link
                      href={`/payment?package=${pkg.id}`}
                      className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#1B2228] hover:bg-[#323E48] text-white font-semibold py-3.5 px-6 text-xs sm:text-sm transition-all"
                    >
                      <span>{pkg.ctaText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href={`/apply?package=${pkg.id}`}
                      className="inline-flex items-center justify-center rounded-full border border-[#1B2228]/30 hover:bg-[#1B2228] hover:text-white text-[#1B2228] font-medium py-3.5 px-5 text-xs sm:text-sm transition-all"
                    >
                      Apply
                    </Link>
                  </div>
                </SunThemeCard>
              );
            })}
          </CardSlider>

          <p className="text-xs text-[#54626F] mt-6">{cms.paidSection.visaIncludedNote}</p>
        </div>
      </section>

      {/* SECTION 13 · FREQUENTLY ASKED QUESTIONS */}
      <section id="faq" className="px-5 sm:px-8 lg:px-14 py-12 pb-16">
        <div className="max-w-[960px] mx-auto">
          <div className="mb-10">
            <SectionPillBadge
              number={cms.faqsSection.sectionNumber}
              label={cms.faqsSection.sectionLabel}
            />
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold tracking-tight text-[#1B2228]">
              {cms.faqsSection.headline}
            </h2>
          </div>

          <div className="bg-white rounded-[28px] p-4 sm:p-8 shadow-card border border-slate-200/70 divide-y divide-slate-200/80">
            {cms.faqsSection.items.map((faq) => {
              const isOpen = openFaqId === faq.id;
              const buttonId = `faq-btn-${faq.id}`;
              const answerId = `faq-answer-${faq.id}`;
              return (
                <div key={faq.id} className="py-4 sm:py-5">
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full flex items-center justify-between gap-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2228] rounded-xl p-1 -m-1"
                  >
                    <span className="text-sm sm:text-base font-bold text-[#1B2228]">
                      {faq.question}
                    </span>
                    <span className="w-7 h-7 rounded-full bg-[#EEF5FA] text-[#1B2228] flex items-center justify-center shrink-0">
                      {isOpen ? (
                        <Minus className="w-4 h-4" aria-hidden="true" />
                      ) : (
                        <Plus className="w-4 h-4" aria-hidden="true" />
                      )}
                    </span>
                  </button>
                  {isOpen && (
                    <div
                      id={answerId}
                      role="region"
                      aria-labelledby={buttonId}
                      className="mt-3 text-xs sm:text-sm text-[#4A5864] leading-relaxed pr-8"
                    >
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
