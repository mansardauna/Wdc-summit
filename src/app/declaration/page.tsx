"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Check, FileCheck2, Users, Award, Globe } from "lucide-react";
import { DEFAULT_CMS_CONTENT, SiteCMSContent } from "@/lib/default-data";
import { SiteShell } from "@/components/NavbarAndFooter";
import {
  SunThemeCard,
  SectionPillBadge,
  SunburstWatermark,
} from "@/components/SunSummitDesign";

export default function DeclarationPage() {
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
      {/* Principal Outcome Hero Section */}
      <section className="px-5 sm:px-8 lg:px-14 py-12 sm:py-16">
        <div className="max-w-[1240px] mx-auto">
          <div className="relative overflow-hidden rounded-[32px] bg-[#16324A] text-white p-8 sm:p-12 lg:p-16 shadow-card">
            <SunburstWatermark
              variant="bottom-right"
              colorClass="text-[#2C5270]/45"
            />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-5">
                <SectionPillBadge
                  number={cms.declaration.sectionNumber}
                  label={cms.declaration.sectionLabel}
                  dark
                />
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.08]">
                  The WDC Global{" "}
                  <span className="text-[#FCE46D]">
                    Environmental Protection
                  </span>{" "}
                  Declaration
                </h1>
                <div className="inline-block rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-medium text-[#E4EFF7]">
                  {cms.declaration.signedBadge}
                </div>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  {cms.declaration.paragraph1}
                </p>
                <p className="text-sm sm:text-base text-white font-medium leading-relaxed">
                  {cms.declaration.paragraph2}
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <Link
                    href="/apply"
                    className="inline-flex items-center gap-2 rounded-full bg-[#FCE46D] hover:bg-[#F7D742] text-[#1B2228] font-bold px-7 py-3.5 text-sm shadow-sm transition-all"
                  >
                    <span>{cms.declaration.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/programme"
                    className="inline-flex items-center gap-2 rounded-full border border-white/30 hover:bg-white/10 text-white font-medium px-6 py-3.5 text-sm transition-all"
                  >
                    <span>See Day 05 Signing Schedule</span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-3.5">
                {cms.declaration.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl bg-[#0F2437]/90 border border-white/15 p-5 sm:p-6 flex items-start gap-4 hover:border-[#FCE46D]/50 transition-all"
                  >
                    <span className="text-xl sm:text-2xl font-bold text-[#FCE46D] font-mono shrink-0">
                      {step.number}
                    </span>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white mb-1">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signatory Working Groups Breakdown */}
      <section className="px-5 sm:px-8 lg:px-14 pb-16">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <SunThemeCard theme="ice">
            <FileCheck2 className="w-7 h-7 text-[#1B2228] mb-3" />
            <h3 className="text-xl font-bold text-[#1B2228] mb-2">
              Drafted by Delegates
            </h3>
            <p className="text-xs sm:text-sm text-[#4A5864] leading-relaxed">
              Unlike top-down communiqués, the WDC Declaration is debated in working groups across the five days in Cape Town and adopted by plenary vote on Day 05.
            </p>
          </SunThemeCard>

          <SunThemeCard theme="powder">
            <Users className="w-7 h-7 text-[#1B2228] mb-3" />
            <h3 className="text-xl font-bold text-[#1B2228] mb-2">
              Named Signatory Status
            </h3>
            <p className="text-xs sm:text-sm text-[#2C3740] leading-relaxed">
              Every confirmed delegate — across Fully Funded, Partially Funded, Funded Forum Access, Self-Funded, and Forum Access — is recorded on the official roll of signatories.
            </p>
          </SunThemeCard>

          <SunThemeCard theme="glacier">
            <Award className="w-7 h-7 text-[#1B2228] mb-3" />
            <h3 className="text-xl font-bold text-[#1B2228] mb-2">
              Official WDC Certification
            </h3>
            <p className="text-xs sm:text-sm text-[#2C3740] leading-relaxed">
              Delegates leave Cape Town with an official signatory certificate issued by the World Disaster Center to carry commitments back to their communities.
            </p>
          </SunThemeCard>
        </div>
      </section>
    </SiteShell>
  );
}
