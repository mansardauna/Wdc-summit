"use client";

import React from "react";
import Link from "next/link";
import {
  Users,
  Lightbulb,
  Video,
  Cpu,
  Award,
  Mic,
  BookOpen,
  Settings,
  TrendingUp,
  Handshake,
  ArrowRight,
  Plane,
} from "lucide-react";
import { ProgrammeDay, DEFAULT_CMS_CONTENT } from "@/lib/default-data";
import CardSlider from "./CardSlider";

interface SummitProgrammeOverviewProps {
  days?: ProgrammeDay[];
  compact?: boolean;
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
    (["welcome", "innovation", "culture", "drone", "declaration", "closing"][
      index % 6
    ] as string);

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
        {/* 3D Isometric Cape Town Airport & Welcome Arch */}
        <path
          d="M20 130 Q160 85 300 130"
          stroke="#7DD3FC"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        {/* 3D Floating Delegate Pass Card */}
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
        {/* 3D Isometric Globe & Plane */}
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
        {/* 3D Holographic Earth & Keynote Stage */}
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
        {/* Floating 3D Data Cubes */}
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
        {/* 3D Media Lens, Soundwaves & Storytelling Frames */}
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
        {/* 3D Broadcast Waves */}
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
        {/* 3D Radar Grid & Autonomous Disaster Drone */}
        <ellipse
          cx="160"
          cy="118"
          rx="95"
          ry="20"
          fill="rgba(45,212,191,0.18)"
          stroke="#5EEAD4"
          strokeWidth="1.5"
        />
        {/* Radar Scan Cone */}
        <polygon
          points="160,48 95,118 225,118"
          fill="rgba(252,228,109,0.22)"
        />
        {/* 3D Quadcopter Drone Silhouette */}
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

  if (type === "declaration") {
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
        {/* 3D Signed Declaration Scroll & Debate Podium */}
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

  // Closing Experience
  return (
    <svg
      viewBox="0 0 320 150"
      fill="none"
      className="w-full h-full object-cover"
    >
      <defs>
        <linearGradient id="bgClose" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0B2545" />
          <stop offset="55%" stopColor="#1D4ED8" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>
      </defs>
      <rect width="320" height="150" fill="url(#bgClose)" />
      {/* Table Mountain 3D Silhouette + Golden Sun */}
      <circle cx="240" cy="46" r="24" fill="#FCE46D" fillOpacity="0.9" />
      <path
        d="M15 130 L65 68 L205 68 L255 130 Z"
        fill="rgba(11,37,69,0.65)"
        stroke="#93C5FD"
        strokeWidth="2"
      />
      <path
        d="M45 105 Q160 35 280 55"
        stroke="#FCE46D"
        strokeWidth="2"
        strokeDasharray="5 5"
      />
    </svg>
  );
}

function StageBadgeIcon({ iconType }: { iconType?: string }) {
  switch (iconType) {
    case "welcome":
      return <Users className="w-6 h-6 text-white" />;
    case "innovation":
      return <Lightbulb className="w-6 h-6 text-white" />;
    case "culture":
      return <Video className="w-6 h-6 text-white" />;
    case "drone":
      return <Cpu className="w-6 h-6 text-white" />;
    case "declaration":
      return <Award className="w-6 h-6 text-white" />;
    case "closing":
      return <Plane className="w-6 h-6 text-white" />;
    default:
      return <Users className="w-6 h-6 text-white" />;
  }
}

export default function SummitProgrammeOverview({
  days,
  compact = false,
}: SummitProgrammeOverviewProps) {
  const programmeDays =
    days && days.length > 0 ? days : DEFAULT_CMS_CONTENT.programme.days;

  const bottomHighlights = [
    {
      icon: <Mic className="w-6 h-6 text-[#7DD3FC]" />,
      title: "SPEECHES",
      subtitle: "From global leaders",
    },
    {
      icon: <BookOpen className="w-6 h-6 text-[#FCE46D]" />,
      title: "MASTERCLASSES",
      subtitle: "Practical learning with experts",
    },
    {
      icon: <Settings className="w-6 h-6 text-[#7DD3FC]" />,
      title: "EXHIBITIONS",
      subtitle: "Showcase solutions (morning to lunch)",
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-[#FCE46D]" />,
      title: "INVESTMENT OPPORTUNITIES",
      subtitle: "Connect with funders and partners",
    },
    {
      icon: <Handshake className="w-6 h-6 text-[#7DD3FC]" />,
      title: "NETWORKING",
      subtitle: "Build global connections",
    },
  ];

  return (
    <div className="rounded-[32px] overflow-hidden bg-white shadow-[0_24px_70px_rgba(8,32,62,0.10)] border border-slate-200/90">
      {/* =====================================================================
          TOP SUMMIT OVERVIEW HEADER BANNER (Matches Image 2 Top Banner)
         ===================================================================== */}
      <div className="relative overflow-hidden bg-[#06234B] text-white px-6 sm:px-10 lg:px-12 py-8 sm:py-10">
        {/* Table Mountain & Cape Town Backdrop on Right */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-full lg:w-1/2 opacity-30 bg-cover bg-center"
          style={{
            backgroundImage: "url('/illustrations/cape-town-circle.jpg')",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, #051F44 0%, rgba(6,35,75,0.92) 60%, rgba(6,35,75,0.55) 100%)",
          }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left: WDC Logo + Youth Leadership Summit 2027 */}
          <div className="lg:col-span-4 flex items-center gap-3.5">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 border border-sky-300/35 flex items-center justify-center shrink-0">
              <svg
                viewBox="0 0 48 48"
                fill="none"
                className="w-8 h-8 text-white"
              >
                <circle
                  cx="24"
                  cy="24"
                  r="19"
                  stroke="currentColor"
                  strokeWidth="2.2"
                />
                <ellipse
                  cx="24"
                  cy="24"
                  rx="10"
                  ry="19"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M6 18H42M6 30H42M24 5V43"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <div>
              <div className="text-xs sm:text-sm font-extrabold tracking-[0.08em] uppercase text-white">
                WORLD DISASTER CENTER
              </div>
              <div className="text-sm sm:text-base font-extrabold tracking-[0.05em] uppercase text-[#FCE46D]">
                YOUTH LEADERSHIP SUMMIT 2027
              </div>
              <div className="text-[10px] font-mono tracking-[0.16em] uppercase text-sky-200 mt-0.5">
                PEOPLE | SOLUTIONS | RESILIENT FUTURES
              </div>
            </div>
          </div>

          {/* Center: SUMMIT OVERVIEW · 11 – 15 OCTOBER 2027 */}
          <div className="lg:col-span-5 text-left lg:text-center">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-[0.06em] uppercase text-white leading-none">
              SUMMIT OVERVIEW
            </h2>
            <div className="text-base sm:text-xl font-bold tracking-[0.14em] uppercase text-[#FCE46D] mt-2">
              11 – 15 OCTOBER 2027
            </div>
            <div className="text-xs sm:text-sm font-mono tracking-[0.22em] uppercase text-sky-100 mt-1">
              CAPE TOWN, SOUTH AFRICA
            </div>
          </div>

          {/* Right: Tagline */}
          <div className="lg:col-span-3 lg:text-right">
            <div className="inline-block rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2.5 text-xs sm:text-sm italic font-medium text-sky-100 leading-snug">
              &ldquo;Youth Leadership for a Safer, More Resilient World&rdquo;
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          6-COLUMN PROGRAMME OVERVIEW BOARD (Responsive Slider + Grid)
         ===================================================================== */}
      <div className="p-5 sm:p-8 lg:p-10 bg-[#F8FBFF]">
        <CardSlider
          cardClassName="w-[86vw] sm:w-[330px] lg:w-[355px]"
          gap="gap-5"
          badge="Swipe 11–15 Oct 2027 Schedule"
        >
          {programmeDays.map((day, idx) => {
            const headerBg =
              day.headerColor ||
              [
                "#0E3F6E",
                "#005EB8",
                "#0082B3",
                "#0D7D6E",
                "#164A8A",
                "#0A6AD6",
              ][idx % 6];

            const shortParts = (day.shortDate || "OCT 2027").split(" ");
            const dayOfWeek = shortParts[0] || "OCT";
            const dayNum = shortParts[1] || String(11 + Math.min(idx, 4));

            return (
              <div
                key={day.id}
                className="h-full rounded-[24px] bg-white border border-sky-100 shadow-[0_12px_32px_rgba(8,32,62,0.06)] hover:shadow-[0_18px_42px_rgba(8,32,62,0.12)] transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Top Colored Stage Banner + Calendar Date Pill */}
                  <div
                    className="px-5 py-3.5 text-white flex items-center justify-between gap-2"
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

                    {/* White Calendar Date Box matching Image 2 */}
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
                  <div className="px-5 pt-4 pb-3 text-center min-h-[108px] flex flex-col justify-center">
                    <h3
                      className="text-sm sm:text-base font-extrabold uppercase tracking-tight leading-snug"
                      style={{ color: headerBg }}
                    >
                      {day.title}
                    </h3>
                    {day.subtitle && (
                      <p className="text-xs text-[#334E68] mt-1.5 leading-relaxed">
                        {day.subtitle}
                      </p>
                    )}
                  </div>

                  {/* 2D/3D Illustration Art Banner + Overlapping Circular Icon Badge */}
                  <div className="relative mb-7">
                    <div className="h-32 w-full overflow-hidden border-y border-slate-100">
                      <StageIllustrationArt
                        iconType={day.iconType}
                        index={idx}
                      />
                    </div>
                    <div
                      className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-4 border-white shadow-md flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
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
                          className="flex items-start gap-2 text-xs text-[#1E293B] leading-relaxed"
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

                {/* Bottom Delegate Count Callout Box matching Image 2 */}
                <div className="mx-4 mb-4 rounded-2xl bg-[#E0F2FE]/80 border border-sky-200/80 p-3.5 text-center">
                  <div className="text-[11px] font-bold text-[#0C4A6E]">
                    Number of Delegates
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
          })}
        </CardSlider>
      </div>

      {/* =====================================================================
          BOTTOM 5-PILLAR BAR (SPEECHES · MASTERCLASSES · EXHIBITIONS · INVESTMENT · NETWORKING)
          Matches the bottom bar of Image 2!
         ===================================================================== */}
      <div className="bg-[#06234B] text-white px-6 sm:px-10 py-6 border-t border-sky-400/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 lg:divide-x divide-sky-400/20">
          {bottomHighlights.map((item, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-3.5 ${
                idx > 0 ? "lg:pl-5" : ""
              }`}
            >
              <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div>
                <div className="text-xs sm:text-sm font-extrabold tracking-wide uppercase text-white">
                  {item.title}
                </div>
                <div className="text-[11px] text-sky-200/90 mt-0.5 leading-snug">
                  {item.subtitle}
                </div>
              </div>
            </div>
          ))}
        </div>

        {compact && (
          <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-sky-100">
              Explore the complete 11–15 October 2027 Cape Town syllabus, 20 delegate speaker slots, and eligibility tracks.
            </p>
            <Link
              href="/programme"
              className="inline-flex items-center gap-2 rounded-full bg-[#FCE46D] hover:bg-[#F7D742] text-[#08203E] font-bold px-6 py-2.5 text-xs sm:text-sm transition-all"
            >
              <span>Full Programme &amp; Speaker Slots</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
