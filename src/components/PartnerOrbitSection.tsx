"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowUpRight, Handshake } from "lucide-react";
import { PartnerItem } from "@/lib/default-data";

export interface OrbitNodeItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  imageUrl?: string;
  isPhoto?: boolean;
  linkUrl?: string;
}

interface PartnerOrbitSectionProps {
  eyebrow?: string;
  headline?: string;
  subtitle?: string;
  partners?: PartnerItem[];
  customNodes?: OrbitNodeItem[];
  showViewAllButton?: boolean;
  viewAllHref?: string;
  viewAllLabel?: string;
}

export default function PartnerOrbitSection({
  eyebrow = "STRATEGY, PARTNERSHIPS AND DEVELOPMENT ECOSYSTEM",
  headline = "Our Global Partners",
  subtitle = "A global coalition of organisations working behind the scenes to make the World Disaster Center Youth Leadership Summit 2027 possible.",
  partners = [],
  customNodes,
  showViewAllButton = true,
  viewAllHref = "/partners",
  viewAllLabel = "Explore Partner Ecosystem",
}: PartnerOrbitSectionProps) {
  // Convert partners or customNodes into standardized OrbitNodeItem[]
  const allItems: OrbitNodeItem[] =
    customNodes && customNodes.length > 0
      ? customNodes
      : partners.map((p) => ({
          id: p.id,
          name: p.name,
          subtitle: p.category,
          description:
            p.description ||
            `Official ${p.category.toLowerCase()} partner supporting the WDC Youth Leadership Summit 2027 in Cape Town.`,
          imageUrl: p.logoUrl,
          isPhoto: false,
          linkUrl: p.website,
        }));

  // Display 8 nodes around the orbit ring at a time (matching the 8-node symmetry in the reference design)
  const visibleCount = Math.min(8, allItems.length);
  const [pageOffset, setPageOffset] = useState(0);
  const [rotationDeg, setRotationDeg] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(2); // Default highlighted node on right side
  const [isPaused, setIsPaused] = useState(false);
  const animRef = useRef<number | null>(null);

  // Build the 8 visible nodes for the current page offset
  const visibleNodes: OrbitNodeItem[] = [];
  if (allItems.length > 0) {
    for (let i = 0; i < visibleCount; i++) {
      visibleNodes.push(allItems[(pageOffset + i) % allItems.length]);
    }
  }

  // Slow continuous orbital rotation when not hovered/paused
  useEffect(() => {
    let lastTime = performance.now();
    const tick = (now: number) => {
      const dt = now - lastTime;
      lastTime = now;
      if (!isPaused && hoveredIndex === null) {
        // Rotate slowly (~6 degrees per second = 60 seconds per full revolution)
        setRotationDeg((prev) => (prev + dt * 0.0065) % 360);
      }
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPaused, hoveredIndex]);

  const currentFocusIdx = hoveredIndex !== null ? hoveredIndex : activeIndex;
  const focusedNode = visibleNodes[currentFocusIdx] || visibleNodes[0];

  const handlePrev = () => {
    if (allItems.length <= 8) {
      setActiveIndex((prev) => (prev - 1 + visibleCount) % visibleCount);
    } else {
      setPageOffset((prev) => (prev - 1 + allItems.length) % allItems.length);
    }
  };

  const handleNext = () => {
    if (allItems.length <= 8) {
      setActiveIndex((prev) => (prev + 1) % visibleCount);
    } else {
      setPageOffset((prev) => (prev + 1) % allItems.length);
    }
  };

  return (
    <section
      id="partners-orbit"
      className="relative py-16 sm:py-24 overflow-hidden select-none"
      style={{
        background:
          "linear-gradient(180deg, #EAF4FC 0%, #F4F9FD 45%, #E3F0FA 100%)",
      }}
    >
      {/* Crisp High-Key Cape Town & Table Mountain Bay Panoramic Backdrop (No Blur) */}
      <img
        src="/illustrations/partner-section-bg.jpg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full object-cover object-center opacity-55"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(238,247,255,0.72) 0%, rgba(244,249,253,0.45) 50%, rgba(230,242,252,0.78) 100%)",
        }}
      />

      {/* 3D Floating Decorative Spheres */}
      <div
        className="pointer-events-none hidden lg:block absolute top-20 left-16 w-20 h-20 rounded-full opacity-50 blur-[1px] animate-pulse"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, #FFFFFF 0%, #93C5FD 55%, #1D4ED8 100%)",
          boxShadow: "0 20px 40px rgba(29, 78, 216, 0.18)",
        }}
      />
      <div
        className="pointer-events-none hidden lg:block absolute bottom-24 right-20 w-14 h-14 rounded-full opacity-50"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, #FEF9C3 0%, #FCE46D 60%, #CA8A04 100%)",
          boxShadow: "0 16px 32px rgba(202, 138, 4, 0.2)",
        }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-14">
        {/* Top Centered Header matching Reference Image 1 */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-[0.22em] text-[#0B2545]/80 mb-2.5">
            {eyebrow}
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-[52px] font-extrabold tracking-tight text-[#08203E] leading-[1.08] mb-3.5">
            {headline}
          </h2>
          <p className="text-sm sm:text-base md:text-[17px] text-[#2B4257] leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* ===================================================================
            ROTATING ORBITAL WHEEL CONTAINER
           =================================================================== */}
        <div
          className="relative mx-auto flex items-center justify-center w-[330px] h-[330px] sm:w-[540px] sm:h-[540px] md:w-[650px] md:h-[650px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            setIsPaused(false);
            setHoveredIndex(null);
          }}
        >
          {/* Left Navigation Arrow Button */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous partner"
            className="absolute -left-2 sm:-left-10 md:-left-16 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/90 hover:bg-white text-[#08203E] shadow-lg border border-sky-200/80 flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
          </button>

          {/* Right Navigation Arrow Button */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next partner"
            className="absolute -right-2 sm:-right-10 md:-right-16 z-30 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/90 hover:bg-white text-[#08203E] shadow-lg border border-sky-200/80 flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
          </button>

          {/* Outer Subtle Halo Ring */}
          <div className="pointer-events-none absolute w-[94%] h-[94%] rounded-full border border-sky-300/40" />

          {/* Main Orbital Connector Ring */}
          <div className="pointer-events-none absolute w-[78%] h-[78%] rounded-full border-[2.5px] border-[#93C5FD]/75 shadow-[0_0_40px_rgba(56,189,248,0.18)]" />

          {/* Rotating Layer: Connector Dots + Partner Nodes */}
          <div
            className="absolute inset-0"
            style={{
              transform: `rotate(${rotationDeg}deg)`,
              transition: isPaused ? "transform 0.35s ease-out" : "none",
            }}
          >
            {/* Small Blue Orbital Connector Dots placed between the 8 main nodes */}
            {visibleNodes.map((_, idx) => {
              const stepAngle = 360 / visibleCount;
              const dotAngle1 = idx * stepAngle + stepAngle * 0.36 - 90;
              const dotAngle2 = idx * stepAngle + stepAngle * 0.64 - 90;
              const rPercent = 39; // matches 78% diameter / 2
              const x1 = 50 + rPercent * Math.cos((dotAngle1 * Math.PI) / 180);
              const y1 = 50 + rPercent * Math.sin((dotAngle1 * Math.PI) / 180);
              const x2 = 50 + rPercent * Math.cos((dotAngle2 * Math.PI) / 180);
              const y2 = 50 + rPercent * Math.sin((dotAngle2 * Math.PI) / 180);

              return (
                <React.Fragment key={`dots-${idx}`}>
                  <span
                    className="pointer-events-none absolute w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#93C5FD] shadow-xs"
                    style={{ left: `${x1}%`, top: `${y1}%` }}
                  />
                  <span
                    className="pointer-events-none absolute w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#93C5FD] shadow-xs"
                    style={{ left: `${x2}%`, top: `${y2}%` }}
                  />
                </React.Fragment>
              );
            })}

            {/* 8 Circular Nodes on the Orbit Ring */}
            {visibleNodes.map((node, idx) => {
              const stepAngle = 360 / visibleCount;
              const baseAngleDeg = idx * stepAngle - 90; // Start at 12 o'clock
              const rPercent = 39;
              const leftPct =
                50 + rPercent * Math.cos((baseAngleDeg * Math.PI) / 180);
              const topPct =
                50 + rPercent * Math.sin((baseAngleDeg * Math.PI) / 180);

              // Calculate actual screen angle (incorporating current rotation) to position the hover card smartly
              const screenAngleDeg =
                ((baseAngleDeg + rotationDeg) % 360 + 360) % 360;
              const isRightHalf =
                screenAngleDeg <= 90 || screenAngleDeg >= 270;

              const isFocused = currentFocusIdx === idx;

              return (
                <div
                  key={`${node.id}-${idx}`}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                  style={{
                    left: `${leftPct}%`,
                    top: `${topPct}%`,
                  }}
                >
                  {/* Counter-rotate so node content & popup card remain 100% upright */}
                  <div
                    className="relative flex items-center justify-center"
                    style={{
                      transform: `rotate(${-rotationDeg}deg)`,
                      transition: isPaused ? "transform 0.35s ease-out" : "none",
                    }}
                  >
                    {/* Circular Partner / Member Node */}
                    <button
                      type="button"
                      onMouseEnter={() => {
                        setHoveredIndex(idx);
                        setActiveIndex(idx);
                      }}
                      onClick={() => {
                        setActiveIndex(idx);
                        setHoveredIndex(idx);
                      }}
                      aria-label={node.name}
                      className={`group relative w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-white flex items-center justify-center overflow-hidden transition-all duration-300 cursor-pointer ${
                        isFocused
                          ? "ring-4 sm:ring-[5px] ring-[#2563EB] border-4 border-white scale-110 shadow-[0_14px_34px_rgba(37,99,235,0.38)] z-30"
                          : "ring-4 ring-[#BAE6FD]/90 border-2 border-white hover:scale-105 shadow-md"
                      }`}
                    >
                      {node.imageUrl ? (
                        node.isPhoto ? (
                          <img
                            src={node.imageUrl}
                            alt={node.name}
                            className="w-full h-full object-cover object-center"
                          />
                        ) : (
                          <div className="w-full h-full p-2.5 sm:p-4 flex items-center justify-center bg-white">
                            <img
                              src={node.imageUrl}
                              alt={node.name}
                              className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>
                        )
                      ) : (
                        <span className="text-[11px] sm:text-xs font-extrabold text-[#08203E] px-2 text-center leading-tight">
                          {node.name}
                        </span>
                      )}
                    </button>

                    {/* Desktop Floating Detail Card next to the Hovered/Active Node (matches Image 1!) */}
                    {isFocused && (
                      <div
                        className={`hidden md:block absolute top-1/2 -translate-y-1/2 z-40 w-[245px] lg:w-[265px] rounded-2xl bg-white/98 backdrop-blur-md p-4 lg:p-5 shadow-[0_18px_45px_rgba(8,32,62,0.16)] border border-sky-200/90 text-left transition-all duration-200 ${
                          isRightHalf
                            ? "left-[calc(100%+16px)]"
                            : "right-[calc(100%+16px)]"
                        }`}
                      >
                        <div className="text-base font-extrabold text-[#08203E] leading-snug">
                          {node.name}
                        </div>
                        <div className="text-xs font-semibold text-[#2563EB] mt-0.5">
                          {node.subtitle}
                        </div>
                        <div className="w-9 h-[2px] bg-[#60A5FA] my-2.5 rounded-full" />
                        <p className="text-xs text-[#334E68] leading-relaxed">
                          {node.description}
                        </p>
                        {node.linkUrl && (
                          <a
                            href={node.linkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-[#08203E] hover:text-[#2563EB] mt-2.5"
                          >
                            <span>Official Partner</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* =================================================================
              CENTRAL CAPE TOWN SUMMIT EMBLEM PORTAL (Matches Image 1 Center!)
             ================================================================= */}
          <div className="relative z-10 w-[165px] h-[165px] sm:w-[265px] sm:h-[265px] md:w-[320px] md:h-[320px] rounded-full overflow-hidden border-[5px] sm:border-[7px] border-white ring-4 sm:ring-8 ring-[#BAE6FD]/75 shadow-[0_20px_60px_rgba(8,32,62,0.28)] flex flex-col items-center justify-start text-center">
            {/* Cape Town & Table Mountain Photo Backdrop */}
            <img
              src="/illustrations/table-mountain-center.jpg"
              alt="World Disaster Center Youth Leadership Summit 2027 Cape Town"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            {/* Subtle Royal Navy Top Sky Gradient for Crisp White Typography */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(6,28,66,0.78) 0%, rgba(11,52,110,0.48) 45%, rgba(11,52,110,0.05) 75%, rgba(6,28,66,0.2) 100%)",
              }}
            />

            {/* WDC Emblem & Typography inside Center Circle */}
            <div className="relative z-10 pt-4 sm:pt-7 md:pt-9 px-3 flex flex-col items-center text-white">
              {/* WDC Wireframe Globe Icon */}
              <svg
                viewBox="0 0 48 48"
                fill="none"
                className="w-7 h-7 sm:w-11 sm:h-11 md:w-12 md:h-12 mb-1.5 sm:mb-2.5 text-white drop-shadow-xs"
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
                  strokeWidth="1.6"
                />
                <circle cx="35" cy="12" r="2.2" fill="#FCE46D" />
              </svg>

              <div className="text-[9px] sm:text-xs md:text-[13px] font-extrabold tracking-[0.18em] uppercase text-white drop-shadow-xs">
                WORLD DISASTER CENTER
              </div>
              <div className="text-[8px] sm:text-[10px] md:text-[11px] font-semibold tracking-[0.2em] uppercase text-sky-100 mt-0.5 sm:mt-1">
                YOUTH LEADERSHIP SUMMIT 2027
              </div>
              <div className="text-[8px] sm:text-[10px] font-mono tracking-[0.24em] uppercase text-[#FCE46D] mt-0.5 sm:mt-1 font-bold">
                CAPE TOWN · OCT 11–15
              </div>
            </div>
          </div>
        </div>

        {/* Mobile / Tablet Active Partner Detail Card (Always accessible on smaller screens) */}
        {focusedNode && (
          <div className="md:hidden mt-6 max-w-sm mx-auto rounded-2xl bg-white/95 backdrop-blur-md p-5 shadow-lg border border-sky-200 text-center">
            <div className="text-base font-extrabold text-[#08203E]">
              {focusedNode.name}
            </div>
            <div className="text-xs font-semibold text-[#2563EB] mt-0.5">
              {focusedNode.subtitle}
            </div>
            <div className="w-9 h-[2px] bg-[#60A5FA] my-2.5 mx-auto rounded-full" />
            <p className="text-xs text-[#334E68] leading-relaxed">
              {focusedNode.description}
            </p>
          </div>
        )}

        {/* Pagination Dots matching Reference Image 1 */}
        <div className="flex items-center justify-center gap-2.5 mt-8 sm:mt-10">
          {visibleNodes.map((node, idx) => {
            const isSelected = currentFocusIdx === idx;
            return (
              <button
                key={`dot-${node.id}-${idx}`}
                type="button"
                aria-label={`Select ${node.name}`}
                onClick={() => {
                  setActiveIndex(idx);
                  setHoveredIndex(idx);
                }}
                className={`rounded-full transition-all cursor-pointer ${
                  isSelected
                    ? "w-3.5 h-3.5 bg-[#08203E] scale-110"
                    : "w-3 h-3 bg-[#93C5FD]/65 hover:bg-[#60A5FA]"
                }`}
              />
            );
          })}
        </div>

        {/* Optional Bottom Action Link */}
        {showViewAllButton && (
          <div className="mt-8 text-center">
            <Link
              href={viewAllHref}
              className="inline-flex items-center gap-2 rounded-full bg-[#08203E] hover:bg-[#12345E] text-white font-semibold px-7 py-3.5 text-xs sm:text-sm shadow-md transition-all hover:-translate-y-0.5"
            >
              <Handshake className="w-4 h-4 text-[#FCE46D]" />
              <span>{viewAllLabel}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
