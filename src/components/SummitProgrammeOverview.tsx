"use client";

import React from "react";
import {
  Users,
  Lightbulb,
  Video,
  Cpu,
  Award,
  Plane,
} from "lucide-react";
import { ProgrammeDay, DEFAULT_CMS_CONTENT } from "@/lib/default-data";
import { SectionPillBadge } from "./SunSummitDesign";
import CardSlider from "./CardSlider";

interface SummitProgrammeOverviewProps {
  days?: ProgrammeDay[];
  compact?: boolean;
  sectionNumber?: string;
  showHeading?: boolean;
}

/**
 * Custom 2D / 3D Layered Vector Illustration Art for each Programme Stage
 */
function StageIllustrationArt({
  iconType,
  index,
}: {
  iconType?: string;
  index: number;
}) {
  const type =
    iconType ||
    (["innovation", "culture", "drone", "declaration"][index % 4] as string);

  if (type === "welcome") {
    return (
      <svg
        viewBox="0 0 320 150"
        fill="none"
        className="w-full h-full object-cover"
      >
        <defs>
          <linearGradient id="bgWelcome" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0A2540" />
            <stop offset="60%" stopColor="#134E88" />
            <stop offset="100%" stopColor="#1E78B4" />
          </linearGradient>
          <radialGradient id="orbWelcome" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#FCE46D" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="320" height="150" fill="url(#bgWelcome)" />
        <circle cx="250" cy="45" r="55" fill="url(#orbWelcome)" />
        <path
          d="M20 130 Q160 85 300 130"
          stroke="#7DD3FC"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        <g transform="translate(42, 26)">
          <rect
            x="0"
            y="0"
            width="115"
            height="76"
            rx="12"
            fill="rgba(255,255,255,0.14)"
            stroke="#93C5FD"
            strokeWidth="1.5"
          />
          <circle cx="30" cy="34" r="14" fill="#FCE46D" />
          <rect x="54" y="22" width="46" height="7" rx="3.5" fill="#FFFFFF" />
          <rect x="54" y="35" width="34" height="5" rx="2.5" fill="#BAE6FD" />
          <rect x="18" y="57" width="80" height="6" rx="3" fill="#38BDF8" />
        </g>
        <g transform="translate(188, 22)">
          <circle
            cx="48"
            cy="48"
            r="36"
            fill="#0E3A66"
            stroke="#7DD3FC"
            strokeWidth="2"
          />
          <ellipse
            cx="48"
            cy="48"
            rx="18"
            ry="36"
            stroke="#38BDF8"
            strokeWidth="1.4"
          />
          <line
            x1="12"
            y1="48"
            x2="84"
            y2="48"
            stroke="#38BDF8"
            strokeWidth="1.4"
          />
          <circle cx="66" cy="30" r="5" fill="#FCE46D" />
        </g>
      </svg>
    );
  }

  if (type === "innovation") {
    return (
      <svg
        viewBox="0 0 320 150"
        fill="none"
        className="w-full h-full object-cover"
      >
        <defs>
          <linearGradient id="bgInnov" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#071E3D" />
            <stop offset="55%" stopColor="#0B4F9F" />
            <stop offset="100%" stopColor="#0088CC" />
          </linearGradient>
          <radialGradient id="glowInnov" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#071E3D" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="320" height="150" fill="url(#bgInnov)" />
        <circle cx="160" cy="70" r="75" fill="url(#glowInnov)" />
        <ellipse
          cx="160"
          cy="125"
          rx="110"
          ry="16"
          fill="rgba(56,189,248,0.22)"
          stroke="#7DD3FC"
          strokeWidth="1.5"
        />
        <circle
          cx="160"
          cy="64"
          r="38"
          fill="rgba(14,116,144,0.45)"
          stroke="#FCE46D"
          strokeWidth="2"
        />
        <ellipse
          cx="160"
          cy="64"
          rx="20"
          ry="38"
          stroke="#BAE6FD"
          strokeWidth="1.3"
        />
        <path d="M122 64H198" stroke="#BAE6FD" strokeWidth="1.3" />
        <rect
          x="52"
          y="36"
          width="28"
          height="28"
          rx="6"
          fill="#FCE46D"
          fillOpacity="0.9"
        />
        <rect
          x="238"
          y="42"
          width="32"
          height="32"
          rx="7"
          fill="#38BDF8"
          fillOpacity="0.85"
        />
      </svg>
    );
  }

  if (type === "culture") {
    return (
      <svg
        viewBox="0 0 320 150"
        fill="none"
        className="w-full h-full object-cover"
      >
        <defs>
          <linearGradient id="bgCult" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#082A47" />
            <stop offset="60%" stopColor="#006994" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
        </defs>
        <rect width="320" height="150" fill="url(#bgCult)" />
        <rect
          x="34"
          y="24"
          width="116"
          height="78"
          rx="12"
          fill="rgba(255,255,255,0.14)"
          stroke="#A5F3FC"
          strokeWidth="1.6"
        />
        <polygon points="82,46 82,78 110,62" fill="#FCE46D" />
        <circle
          cx="228"
          cy="66"
          r="34"
          fill="rgba(6,182,212,0.3)"
          stroke="#FCE46D"
          strokeWidth="2"
        />
        <circle
          cx="228"
          cy="66"
          r="50"
          stroke="#A5F3FC"
          strokeWidth="1.2"
          strokeDasharray="5 5"
        />
        <circle cx="228" cy="66" r="14" fill="#FFFFFF" />
      </svg>
    );
  }

  if (type === "drone") {
    return (
      <svg
        viewBox="0 0 320 150"
        fill="none"
        className="w-full h-full object-cover"
      >
        <defs>
          <linearGradient id="bgDrone" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#062C2B" />
            <stop offset="55%" stopColor="#0D6E6E" />
            <stop offset="100%" stopColor="#14B8A6" />
          </linearGradient>
        </defs>
        <rect width="320" height="150" fill="url(#bgDrone)" />
        <ellipse
          cx="160"
          cy="118"
          rx="95"
          ry="20"
          fill="rgba(45,212,191,0.18)"
          stroke="#5EEAD4"
          strokeWidth="1.5"
        />
        <polygon
          points="160,48 95,118 225,118"
          fill="rgba(252,228,109,0.22)"
        />
        <line
          x1="105"
          y1="42"
          x2="215"
          y2="42"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <rect
          x="138"
          y="33"
          width="44"
          height="18"
          rx="8"
          fill="#FCE46D"
          stroke="#FFFFFF"
          strokeWidth="2"
        />
        <circle cx="105" cy="42" r="12" stroke="#5EEAD4" strokeWidth="2" />
        <circle cx="215" cy="42" r="12" stroke="#5EEAD4" strokeWidth="2" />
        <circle cx="160" cy="54" r="5" fill="#F87171" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 320 150"
      fill="none"
      className="w-full h-full object-cover"
    >
      <defs>
        <linearGradient id="bgDecl" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#091E3A" />
          <stop offset="60%" stopColor="#164A8A" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
      </defs>
      <rect width="320" height="150" fill="url(#bgDecl)" />
      <rect
        x="95"
        y="18"
        width="130"
        height="96"
        rx="12"
        fill="rgba(255,255,255,0.16)"
        stroke="#FCE46D"
        strokeWidth="2"
      />
      <line
        x1="118"
        y1="42"
        x2="202"
        y2="42"
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <line
        x1="118"
        y1="58"
        x2="190"
        y2="58"
        stroke="#BAE6FD"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="118"
        y1="74"
        x2="176"
        y2="74"
        stroke="#BAE6FD"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="192" cy="86" r="12" fill="#FCE46D" />
    </svg>
  );
}

function StageBadgeIcon({ iconType }: { iconType?: string }) {
  switch (iconType) {
    case "welcome":
      return <Users className="w-5 h-5 text-white" />;
    case "innovation":
      return <Lightbulb className="w-5 h-5 text-white" />;
    case "culture":
      return <Video className="w-5 h-5 text-white" />;
    case "drone":
      return <Cpu className="w-5 h-5 text-white" />;
    case "declaration":
      return <Award className="w-5 h-5 text-white" />;
    case "closing":
      return <Plane className="w-5 h-5 text-white" />;
    default:
      return <Users className="w-5 h-5 text-white" />;
  }
}

function ProgrammeDayCard({
  day,
  idx,
}: {
  day: ProgrammeDay;
  idx: number;
}) {
  const headerBg =
    day.headerColor ||
    ["#005EB8", "#0082B3", "#0D7D6E", "#164A8A"][idx % 4];

  const shortParts = (day.shortDate || "OCT 2027").split(" ");
  const dayOfWeek = shortParts[0] || "OCT";
  const dayNum = shortParts[1] || String(11 + idx);

  return (
    <div className="h-full rounded-[28px] bg-white border border-slate-200/80 shadow-card hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      <div>
        {/* Top Colored Stage Banner + Calendar Date Pill */}
        <div
          className="px-5 py-4 text-white flex items-center justify-between gap-2"
          style={{ backgroundColor: headerBg }}
        >
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.14em] text-sky-200 font-bold">
              {day.dayNumber}
            </div>
            <div className="text-[11px] text-white/90 font-medium">
              {day.date}
            </div>
          </div>

          {/* White Calendar Date Box */}
          <div className="rounded-xl bg-white text-[#08203E] px-3 py-1.5 text-center shadow-xs shrink-0 min-w-[58px]">
            <div className="text-[9px] font-extrabold uppercase tracking-wider text-[#005EB8]">
              {dayOfWeek}
            </div>
            <div className="text-lg font-extrabold leading-none text-[#08203E] my-0.5">
              {dayNum}
            </div>
            <div className="text-[8px] font-mono font-bold uppercase text-slate-500">
              OCT 2027
            </div>
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="px-5 pt-5 pb-3 text-center min-h-[96px] flex flex-col justify-center">
          <h3
            className="text-sm sm:text-base font-extrabold uppercase tracking-tight leading-snug"
            style={{ color: headerBg }}
          >
            {day.title}
          </h3>
          {day.subtitle && (
            <p className="text-xs text-[#54626F] mt-1.5 leading-relaxed line-clamp-2">
              {day.subtitle}
            </p>
          )}
        </div>

        {/* 2D/3D Illustration Art Banner + Overlapping Circular Icon Badge */}
        <div className="relative mb-6">
          <div className="h-28 w-full overflow-hidden border-y border-slate-100">
            <StageIllustrationArt
              iconType={day.iconType}
              index={idx}
            />
          </div>
          <div
            className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-11 h-11 rounded-full border-3 border-white shadow-md flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundColor: headerBg }}
          >
            <StageBadgeIcon iconType={day.iconType} />
          </div>
        </div>

        {/* Bulleted Session List */}
        <div className="px-5 pt-2 pb-5">
          <ul className="space-y-2">
            {day.items.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-xs text-[#2C3740] leading-relaxed"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                  style={{ backgroundColor: headerBg }}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Delegate Count Callout Box */}
      <div className="mx-4 mb-4 rounded-2xl bg-[#F0F7FF] border border-sky-100 p-3.5 text-center">
        <div className="text-[10px] font-mono uppercase tracking-wider text-[#0C4A6E] font-bold">
          NUMBER OF DELEGATES
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold text-[#08203E] leading-tight my-0.5">
          {day.delegateCount || "200"}
        </div>
        <div className="text-[11px] font-semibold text-[#0369A1] leading-snug">
          {day.delegateLabel || "All registered delegates"}
        </div>
      </div>
    </div>
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
          cardClassName="w-[86vw] sm:w-[330px]"
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
