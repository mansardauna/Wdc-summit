"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Users } from "lucide-react";
import { ProgrammeDay, DEFAULT_CMS_CONTENT } from "@/lib/default-data";
import { SunThemeCard, SectionPillBadge } from "./SunSummitDesign";
import CardSlider from "./CardSlider";

interface SummitProgrammeOverviewProps {
  days?: ProgrammeDay[];
  compact?: boolean;
  sectionNumber?: string;
  showHeading?: boolean;
}

function ProgrammeDayCard({
  day,
  idx,
}: {
  day: ProgrammeDay;
  idx: number;
}) {
  const theme = (day.themeColor || ["ice", "powder", "glacier", "slate"][idx % 4]) as
    | "ice"
    | "powder"
    | "glacier"
    | "slate";
  const isSlate = theme === "slate";

  const cleanDayNumber = day.dayNumber.replace(/[\uFFFD]/g, "·");
  const cleanDate = (day.shortDate || day.date).replace(/[\uFFFD]/g, "·");
  const cardHref = idx === 3 ? "/declaration" : "/programme";
  const cardCta = idx === 3 ? "Declaration Details" : "Explore Day";

  return (
    <SunThemeCard
      theme={theme}
      watermarkPosition={idx === 1 ? "top-center" : "bottom-right"}
      className="h-full flex flex-col justify-between"
    >
      <div>
        {/* Top Badges: Day Number & Date */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span
            className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${
              isSlate
                ? "border-white/25 bg-white/10 text-[#FCE46D]"
                : "border-[#1B2228]/20 bg-white/60 text-[#1B2228]"
            }`}
          >
            {cleanDayNumber}
          </span>
          <span
            className={`text-[11px] font-mono font-medium ${
              isSlate ? "text-slate-300" : "text-[#54626F]"
            }`}
          >
            {cleanDate}
          </span>
        </div>

        {/* Title */}
        <h3
          className={`text-xl sm:text-2xl font-bold tracking-tight mb-2 ${
            isSlate ? "text-white" : "text-[#1B2228]"
          }`}
        >
          {day.title}
        </h3>

        {/* Subtitle / Focus Summary */}
        {day.subtitle && (
          <p
            className={`text-xs sm:text-sm mb-5 leading-relaxed ${
              isSlate ? "text-slate-200" : "text-[#3D4B56]"
            }`}
          >
            {day.subtitle}
          </p>
        )}

        {/* Session Highlights List */}
        <ul className="space-y-2.5 mb-6">
          {day.items.map((item, i) => (
            <li
              key={i}
              className={`text-xs sm:text-sm flex items-start gap-2.5 ${
                isSlate ? "text-slate-100" : "text-[#1B2228]"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${
                  isSlate ? "bg-[#FCE46D]" : "bg-[#1B2228]"
                }`}
              />
              <span className="leading-snug">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Footer: Delegate Stats & Action Link */}
      <div
        className={`pt-4 border-t flex items-center justify-between gap-2 ${
          isSlate ? "border-white/15" : "border-[#1B2228]/10"
        }`}
      >
        <span
          className={`text-xs font-mono font-medium ${
            isSlate ? "text-[#FCE46D]" : "text-[#005EB8]"
          }`}
        >
          {day.delegateCount || "200"} {day.delegateLabel || "Delegates"}
        </span>
        <Link
          href={cardHref}
          className={`inline-flex items-center gap-1 text-xs font-semibold ${
            isSlate
              ? "text-[#FCE46D] hover:text-[#FFF4A3]"
              : "text-[#1B2228] hover:text-[#005EB8]"
          } transition`}
        >
          <span>{cardCta}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </SunThemeCard>
  );
}

export default function SummitProgrammeOverview({
  days,
  sectionNumber = "04",
  showHeading = true,
}: SummitProgrammeOverviewProps) {
  const rawDays =
    days && days.length > 0 ? days : DEFAULT_CMS_CONTENT.programme.days;

  // Filter out arrival and departure/closing days, leaving the 4 core summit days
  const programmeDays = rawDays.filter(
    (day) =>
      !day.title.toLowerCase().includes("arrival") &&
      !day.title.toLowerCase().includes("closing") &&
      day.id !== "day-1" &&
      day.id !== "day-6"
  );

  return (
    <div className="w-full">
      {/* Existing Section Heading Style taking full width — Not wrapped in a card */}
      {showHeading && (
        <div className="w-full mb-8 sm:mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200/80">
            <div>
              <SectionPillBadge
                number={sectionNumber}
                label="SUMMIT OVERVIEW · 11 – 15 OCTOBER 2027"
              />
              <h2 className="text-3xl sm:text-4xl md:text-[44px] font-extrabold tracking-tight text-[#1B2228] leading-[1.08] mb-2">
                Summit Overview
              </h2>
              <p className="text-sm sm:text-base text-[#54626F] max-w-2xl leading-relaxed">
                Four days of high-impact climate innovation, media &amp; culture, disaster technology demonstrations, and the formal drafting of the WDC Youth Declaration.
              </p>
            </div>
            <div className="shrink-0 text-left md:text-right">
              <div className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-[#005EB8]">
                CAPE TOWN, SOUTH AFRICA
              </div>
              <div className="text-xs text-[#54626F] mt-0.5">
                11 – 15 October 2027
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop 4-Column Grid */}
      <div className="hidden lg:grid lg:grid-cols-4 gap-5">
        {programmeDays.map((day, idx) => (
          <ProgrammeDayCard key={day.id} day={day} idx={idx} />
        ))}
      </div>

      {/* Mobile / Tablet Responsive Card Slider */}
      <div className="lg:hidden">
        <CardSlider
          cardClassName="w-[85vw] sm:w-[360px]"
          gap="gap-5"
          badge="11–15 Oct 2027 Schedule"
        >
          {programmeDays.map((day, idx) => (
            <ProgrammeDayCard key={day.id} day={day} idx={idx} />
          ))}
        </CardSlider>
      </div>
    </div>
  );
}
