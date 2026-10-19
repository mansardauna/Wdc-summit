"use client";

import React from "react";

/**
 * Exact vector recreation of the uploaded World Disaster Center swirling-globe logo
 * (Globe with 4 swirling orbital wind/protection rings wrapping around it)
 */
export function WdcGlobeMark({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Inner Globe Circle */}
      <circle
        cx="60"
        cy="48"
        r="24"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
      />
      {/* Continents inside the globe */}
      <path
        d="M52 25C50 30 44 33 43 39C42 45 48 48 47 54C46 58 41 60 39 63C36 56 36 42 42 32C45 28 48 26 52 25Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M64 25C71 27 78 33 80 41C81 46 77 48 73 47C68 46 64 42 62 37C60 32 61 28 64 25Z"
        fill="currentColor"
        opacity="0.95"
      />
      <path
        d="M66 56C71 56 76 59 78 63C74 68 68 71 61 72C60 67 62 56 66 56Z"
        fill="currentColor"
        opacity="0.9"
      />

      {/* Swirling Orbital Protection Rings around the Globe (matching uploaded logo) */}
      {/* Top-right to center-left main orbital ring */}
      <path
        d="M67 16C84 19 95 29 92 40C89 51 67 53 46 43C34 37 28 29 33 22"
        stroke="currentColor"
        strokeWidth="7.5"
        strokeLinecap="round"
      />
      {/* Left-upper swoop */}
      <path
        d="M35 20C22 24 19 36 30 47C36 53 45 57 53 59"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
      />
      {/* Left outer accent droplet arc */}
      <path
        d="M17 44C16 50 19 57 25 61"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
      />
      {/* Middle-lower orbital wave */}
      <path
        d="M44 68C60 75 80 73 89 63"
        stroke="currentColor"
        strokeWidth="7.5"
        strokeLinecap="round"
      />
      {/* Bottom tail orbital wave */}
      <path
        d="M55 86C69 90 83 86 89 79"
        stroke="currentColor"
        strokeWidth="7.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SunLogoIcon({ className = "w-5 h-5" }: { className?: string }) {
  return <WdcGlobeMark className={className} />;
}

export function WdcBrandLogo({
  theme = "dark",
  showBadge = true,
  summitTitle = "Youth Leadership Summit 2027",
}: {
  theme?: "dark" | "light";
  showBadge?: boolean;
  summitTitle?: string;
}) {
  const isLight = theme === "light";
  return (
    <div className="flex items-center gap-3">
      {/* Uploaded Logo Emblem + Crisp Vector Mark */}
      <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-[#4292C6] flex items-center justify-center shrink-0 shadow-xs border border-white/20">
        <img
          src="/wdc-logo.jpg"
          alt="World Disaster Center Logo"
          className="w-full h-full object-cover scale-125"
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="leading-none">
          <div
            className={`text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase ${
              isLight ? "text-white" : "text-[#1B2228]"
            }`}
          >
            WORLD DISASTER
          </div>
          <div
            className={`text-sm sm:text-base font-extrabold tracking-[0.18em] uppercase mt-0.5 ${
              isLight ? "text-white" : "text-[#1B2228]"
            }`}
          >
            CENTER
          </div>
          <div
            className={`h-[2px] w-full mt-1 rounded-full ${
              isLight ? "bg-white/80" : "bg-[#4292C6]"
            }`}
          />
        </div>

        {showBadge && (
          <>
            <span
              className={`hidden sm:inline-block h-7 w-[1px] ${
                isLight ? "bg-white/20" : "bg-slate-300"
              }`}
            />
            <span
              className={`hidden sm:inline-block text-xs font-medium leading-tight max-w-[125px] ${
                isLight ? "text-slate-300" : "text-[#54626F]"
              }`}
            >
              {summitTitle}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export function SunburstWatermark({
  variant = "bottom-right",
  colorClass = "text-[#9ABED8]/35",
}: {
  variant?: "bottom-right" | "top-center" | "bottom-left";
  colorClass?: string;
}) {
  const positionClasses =
    variant === "bottom-right"
      ? "-bottom-24 -right-20 w-[340px] h-[340px]"
      : variant === "top-center"
      ? "-top-28 left-1/2 -translate-x-1/2 w-[420px] h-[420px]"
      : "-bottom-24 -left-20 w-[340px] h-[340px]";

  return (
    <div
      className={`pointer-events-none select-none absolute ${positionClasses} ${colorClass} overflow-hidden`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 300 300" fill="none" className="w-full h-full">
        {Array.from({ length: 12 }).map((_, idx) => {
          const angle = idx * 30;
          return (
            <rect
              key={idx}
              x="141"
              y="10"
              width="18"
              height="115"
              rx="3"
              fill="currentColor"
              transform={`rotate(${angle} 150 150)`}
            />
          );
        })}
      </svg>
    </div>
  );
}

export function SectionPillBadge({
  number,
  label,
  dark = false,
}: {
  number?: string;
  label: string;
  dark?: boolean;
}) {
  return (
    <div className="inline-flex items-center gap-2.5 mb-3">
      {number && (
        <span
          className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-mono font-semibold border ${
            dark
              ? "border-white/35 text-[#FCE46D] bg-white/10"
              : "border-[#1B2228]/25 text-[#1B2228] bg-white/80"
          }`}
        >
          {number}
        </span>
      )}
      <span
        className={`inline-block rounded-full px-3.5 py-1 text-[11px] font-mono uppercase tracking-[0.14em] border ${
          dark
            ? "border-white/30 text-white/90 bg-white/5"
            : "border-[#1B2228]/40 text-[#1B2228] bg-white/60"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

export function SunThemeCard({
  theme = "ice",
  watermarkPosition = "bottom-right",
  className = "",
  children,
}: {
  theme?: "ice" | "powder" | "glacier" | "slate" | "white";
  watermarkPosition?: "bottom-right" | "top-center" | "bottom-left" | "none";
  className?: string;
  children: React.ReactNode;
}) {
  const themeStyles: Record<string, { bg: string; watermark: string }> = {
    ice: {
      bg: "bg-gradient-to-br from-[#EAF3FA] via-[#E4EFF7] to-[#D6E8F5] text-[#1B2228] border border-white/85",
      watermark: "text-[#C6DCEC]/55",
    },
    powder: {
      bg: "bg-gradient-to-br from-[#C4DDF0] via-[#B7D3E6] to-[#A6C7DF] text-[#1B2228] border border-white/70",
      watermark: "text-[#9BBCD4]/55",
    },
    glacier: {
      bg: "bg-gradient-to-br from-[#D4E8F5] via-[#C8DFEE] to-[#B7D4E8] text-[#1B2228] border border-white/75",
      watermark: "text-[#ADCBE0]/55",
    },
    slate: {
      bg: "bg-gradient-to-br from-[#4D6070] via-[#455664] to-[#374652] text-white border border-[#5D7384]",
      watermark: "text-[#586C7C]/50",
    },
    white: {
      bg: "bg-white text-[#1B2228] border border-slate-200/80",
      watermark: "text-[#E2EDF5]/60",
    },
  };

  const current = themeStyles[theme] || themeStyles.ice;

  return (
    <div
      className={`relative overflow-hidden rounded-[28px] p-7 md:p-8 shadow-card transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-cardHover ${current.bg} ${className}`}
    >
      {/* Subtle 3D Top-Left Specular Glass Highlight */}
      <div
        className="pointer-events-none absolute -top-20 -left-20 w-52 h-52 rounded-full opacity-35 blur-2xl"
        style={{
          background:
            theme === "slate"
              ? "radial-gradient(circle, rgba(125,211,252,0.35) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(255,255,255,0.95) 0%, transparent 70%)",
        }}
      />
      {watermarkPosition !== "none" && (
        <SunburstWatermark
          variant={watermarkPosition}
          colorClass={current.watermark}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

