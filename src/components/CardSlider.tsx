"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CardSliderProps {
  children: React.ReactNode[];
  cardClassName?: string;
  gap?: string;
  showDots?: boolean;
  showArrows?: boolean;
  autoPlay?: boolean;
  interval?: number;
  badge?: string;
}

export default function CardSlider({
  children,
  cardClassName = "w-[85vw] sm:w-[420px] lg:w-[480px]",
  gap = "gap-5",
  showDots = true,
  showArrows = true,
  autoPlay = false,
  interval = 5000,
  badge,
}: CardSliderProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);

    const childWidth = el.firstElementChild?.clientWidth || 300;
    const index = Math.round(el.scrollLeft / childWidth);
    setActiveIndex(Math.min(Math.max(0, index), children.length - 1));
  }, [children.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener("scroll", checkScroll);
  }, [checkScroll]);

  const scrollTo = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const items = el.children;
    if (items[index]) {
      (items[index] as HTMLElement).scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      scrollTo(activeIndex - 1);
    } else {
      scrollTo(children.length - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < children.length - 1) {
      scrollTo(activeIndex + 1);
    } else {
      scrollTo(0);
    }
  };

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      handleNext();
    }, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, activeIndex, children.length]);

  return (
    <div className="relative w-full">
      {/* Slider Controls Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          {badge && (
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#54626F] bg-white/70 px-3 py-1 rounded-full border border-slate-200">
              {badge}
            </span>
          )}
          <span className="text-xs font-mono font-semibold text-[#54626F]">
            {activeIndex + 1} / {children.length}
          </span>
        </div>

        {showArrows && children.length > 1 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous card"
              className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
                canScrollLeft || activeIndex > 0
                  ? "bg-white text-[#1B2228] border-slate-300 hover:bg-[#EEF5FA] shadow-xs active:scale-95"
                  : "bg-slate-100 text-slate-400 border-slate-200"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next card"
              className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
                canScrollRight || activeIndex < children.length - 1
                  ? "bg-[#1B2228] text-white border-[#1B2228] hover:bg-[#34434F] shadow-xs active:scale-95"
                  : "bg-slate-100 text-slate-400 border-slate-200"
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Swipeable / Scrollable Slider Track */}
      <div
        ref={scrollRef}
        className={`flex ${gap} overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 pt-1 px-1 no-scrollbar`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {children.map((child, idx) => (
          <div
            key={idx}
            className={`shrink-0 snap-start transition-opacity duration-300 ${cardClassName}`}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Dot Indicators */}
      {showDots && children.length > 1 && (
        <div className="flex items-center justify-center gap-2 pt-3">
          {children.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === idx
                  ? "w-7 bg-[#1B2228]"
                  : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
