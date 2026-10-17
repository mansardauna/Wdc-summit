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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    }
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={badge || "Featured Content Slider"}
      onKeyDown={handleKeyDown}
      className="relative w-full"
    >
      {/* Slider Controls Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          {badge && (
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#54626F] bg-white/70 px-3 py-1 rounded-full border border-slate-200">
              {badge}
            </span>
          )}
          <span className="text-xs font-mono font-semibold text-[#54626F]" aria-live="polite">
            Slide {activeIndex + 1} of {children.length}
          </span>
        </div>

        {showArrows && children.length > 1 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous slide"
              className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2228] ${
                canScrollLeft || activeIndex > 0
                  ? "bg-white text-[#1B2228] border-slate-300 hover:bg-[#EEF5FA] shadow-xs active:scale-95"
                  : "bg-slate-100 text-slate-400 border-slate-200"
              }`}
            >
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next slide"
              className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2228] ${
                canScrollRight || activeIndex < children.length - 1
                  ? "bg-[#1B2228] text-white border-[#1B2228] hover:bg-[#34434F] shadow-xs active:scale-95"
                  : "bg-slate-100 text-slate-400 border-slate-200"
              }`}
            >
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      {/* Swipeable / Scrollable Slider Track */}
      <div
        ref={scrollRef}
        tabIndex={0}
        aria-label="Scrollable slider track. Use arrow keys to navigate."
        className={`flex ${gap} overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 pt-1 px-1 no-scrollbar focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2228] rounded-2xl`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {children.map((child, idx) => (
          <div
            key={idx}
            role="group"
            aria-roledescription="slide"
            aria-label={`${idx + 1} of ${children.length}`}
            className={`shrink-0 snap-start transition-opacity duration-300 ${cardClassName}`}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Dot Indicators */}
      {showDots && children.length > 1 && (
        <div
          role="tablist"
          aria-label="Slide indicators"
          className="flex items-center justify-center gap-2 pt-3"
        >
          {children.map((_, idx) => (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={activeIndex === idx}
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => scrollTo(idx)}
              className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2228] ${
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
