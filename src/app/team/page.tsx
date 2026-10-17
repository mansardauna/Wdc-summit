"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  MapPin,
  ArrowUpRight,
  ArrowRight,
  Mail,
  ShieldCheck,
  Sparkles,
  Globe,
} from "lucide-react";
import {
  DEFAULT_CMS_CONTENT,
  SiteCMSContent,
  TeamMember,
} from "@/lib/default-data";
import { SiteShell } from "@/components/NavbarAndFooter";
import { SunThemeCard, SectionPillBadge } from "@/components/SunSummitDesign";
import CardSlider from "@/components/CardSlider";

export default function TeamPage() {
  const [cms, setCms] = useState<SiteCMSContent>(DEFAULT_CMS_CONTENT);
  const [filter, setFilter] = useState<"all" | "core" | "board">("all");
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    fetch("/api/cms?scope=public", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => {
        if (data?.cms) setCms(data.cms);
      })
      .catch(() => {});
  }, []);

  const teamSection = cms.teamSection || DEFAULT_CMS_CONTENT.teamSection;
  const allMembers = teamSection.members || DEFAULT_CMS_CONTENT.teamSection.members;
  const coreCrew = allMembers.filter((m) => m.featuredOnHome);
  const boardAndAdvisory = allMembers.filter((m) => !m.featuredOnHome);

  const displayedMembers =
    filter === "core"
      ? coreCrew
      : filter === "board"
      ? boardAndAdvisory
      : allMembers;

  return (
    <SiteShell cms={cms}>
      {/* =====================================================================
          HERO HEADER — YOUTH SUMMIT CREW
         ===================================================================== */}
      <section className="px-5 sm:px-8 lg:px-14 pt-10 sm:pt-14 pb-8">
        <div className="max-w-[1240px] mx-auto">
          <div className="relative overflow-hidden rounded-[32px] bg-[#0B1929] text-white p-8 sm:p-12 md:p-16 border border-sky-400/15 shadow-card">
            {/* Subtle Radial Glow */}
            <div
              className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-25 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, #38BDF8 0%, #FCE46D 50%, transparent 80%)",
              }}
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3.5 py-1.5 text-[11px] font-mono uppercase tracking-[0.16em] text-[#FCE46D] mb-4">
                  <Users className="w-3.5 h-3.5" />
                  <span>
                    {teamSection.sectionNumber} · {teamSection.sectionLabel} ·{" "}
                    TEAM MEMBERS
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl md:text-[54px] font-extrabold tracking-tight leading-[1.08] mb-4">
                  Youth Summit <span className="text-[#FCE46D]">Crew</span> &amp;
                  WDC Leadership
                </h1>

                <p className="text-sm sm:text-base md:text-lg text-slate-200/90 max-w-2xl leading-relaxed mb-6">
                  {teamSection.subtitle}
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="https://www.linkedin.com/company/worlddisastercenter/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#FCE46D] hover:bg-[#F7D742] text-[#1B2228] font-bold px-6 py-3 text-xs sm:text-sm transition-all"
                  >
                    <span>World Disaster Center on LinkedIn</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                  <Link
                    href="/apply"
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 hover:bg-white/10 text-white font-semibold px-6 py-3 text-xs sm:text-sm transition-all"
                  >
                    <span>Apply to Join Delegates in Cape Town</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Right Summary Pill Box */}
              <div className="lg:col-span-4">
                <div className="rounded-2xl bg-white/8 border border-white/15 p-6 backdrop-blur-md space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-sky-200">
                      CREW ROSTER
                    </span>
                    <span className="rounded-full bg-[#FCE46D] text-[#1B2228] text-[11px] font-extrabold px-2.5 py-0.5">
                      WDC GLOBAL
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="rounded-xl bg-white/5 p-3 border border-white/10">
                      <div className="text-sm font-extrabold text-[#FCE46D]">
                        Executive Core
                      </div>
                      <div className="text-[11px] text-slate-300 mt-0.5">
                        Summit Operations
                      </div>
                    </div>
                    <div className="rounded-xl bg-white/5 p-3 border border-white/10">
                      <div className="text-sm font-extrabold text-white">
                        Global Board
                      </div>
                      <div className="text-[11px] text-slate-300 mt-0.5">
                        Directors &amp; Advisors
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          EXECUTIVE CORE CREW
         ===================================================================== */}
      <section className="px-5 sm:px-8 lg:px-14 py-8 sm:py-12">
        <div className="max-w-[1240px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">
            <div>
              <SectionPillBadge
                number="01"
                label="EXECUTIVE & TECHNICAL LEADERSHIP"
              />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#1B2228]">
                Core Youth Summit Crew
              </h2>
            </div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#54626F]">
              EXECUTIVE LEADERSHIP
            </span>
          </div>

          <CardSlider
            cardClassName="w-[86vw] sm:w-[360px] lg:w-[392px]"
            badge="Swipe core leadership"
          >
            {coreCrew.map((member, idx) => {
              const isSlate = member.theme === "slate";
              return (
                <SunThemeCard
                  key={member.id}
                  theme={member.theme}
                  watermarkPosition={idx === 1 ? "top-center" : "bottom-right"}
                  className="h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-5">
                      <span
                        className={`text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                          isSlate
                            ? "border-white/25 bg-white/10 text-[#FCE46D]"
                            : "border-[#1B2228]/20 bg-white/75 text-[#1B2228]"
                        }`}
                      >
                        {member.badge}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-medium ${
                          isSlate ? "text-slate-300" : "text-[#4A5864]"
                        }`}
                      >
                        <MapPin className="w-3 h-3" />
                        {member.location}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 mb-5">
                      <div
                        className={`relative w-22 h-22 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 border-2 shadow-md ${
                          isSlate
                            ? "border-[#FCE46D]/70 bg-white"
                            : "border-white bg-white"
                        }`}
                      >
                        <img
                          src={member.imageUrl}
                          alt={member.name}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      <div>
                        <h3
                          className={`text-xl sm:text-2xl font-extrabold tracking-tight leading-snug ${
                            isSlate ? "text-white" : "text-[#1B2228]"
                          }`}
                        >
                          {member.name}
                        </h3>
                        <p
                          className={`text-xs sm:text-sm font-semibold mt-1 ${
                            isSlate ? "text-[#FCE46D]" : "text-[#2C3740]"
                          }`}
                        >
                          {member.role}
                        </p>
                      </div>
                    </div>

                    <p
                      className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                        isSlate ? "text-slate-200/95" : "text-[#3D4B56]"
                      }`}
                    >
                      {member.bio}
                    </p>
                  </div>

                  <div
                    className={`pt-4 border-t flex items-center justify-between gap-3 ${
                      isSlate ? "border-white/15" : "border-[#1B2228]/10"
                    }`}
                  >
                    {member.linkedinUrl ? (
                      <a
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                          isSlate
                            ? "bg-white/10 hover:bg-white text-white hover:text-[#1B2228]"
                            : "bg-white/80 hover:bg-[#1B2228] text-[#1B2228] hover:text-white"
                        }`}
                      >
                        <span>LinkedIn Profile</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span />
                    )}

                    <button
                      type="button"
                      onClick={() => setSelectedMember(member)}
                      className={`inline-flex items-center gap-1 text-xs font-bold ${
                        isSlate
                          ? "text-[#FCE46D] hover:underline"
                          : "text-[#1B2228] hover:underline"
                      }`}
                    >
                      <span>Read Bio</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </SunThemeCard>
              );
            })}
          </CardSlider>
        </div>
      </section>

      {/* =====================================================================
          TEAM MEMBERS DIRECTORY (WITH FILTER TABS & FULL SUNSUMMIT CARDS)
         ===================================================================== */}
      <section className="px-5 sm:px-8 lg:px-14 py-10 sm:py-14">
        <div className="max-w-[1240px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <SectionPillBadge
                number="02"
                label="COMPLETE TEAM DIRECTORY"
              />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#1B2228]">
                Youth Summit Crew &amp; Board Members
              </h2>
              <p className="text-sm text-[#54626F] mt-1">
                Meet the leadership team and international board directors guiding the World Disaster Center Youth Leader Summit.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white p-1.5 border border-slate-200/80 shadow-2xs self-start">
              {[
                { key: "all", label: "All Team Members" },
                { key: "core", label: "Executive Core" },
                {
                  key: "board",
                  label: "Board & Directors",
                },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setFilter(tab.key as "all" | "core" | "board")}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    filter === tab.key
                      ? "bg-[#1B2228] text-white shadow-xs"
                      : "text-[#54626F] hover:text-[#1B2228]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Responsive Grid of All Displayed Members */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedMembers.map((member, index) => {
              const isSlate = member.theme === "slate";
              return (
                <SunThemeCard
                  key={member.id}
                  theme={member.theme}
                  watermarkPosition={
                    index % 2 === 1 ? "top-center" : "bottom-right"
                  }
                  className="h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-5">
                      <span
                        className={`text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                          isSlate
                            ? "border-white/25 bg-white/10 text-[#FCE46D]"
                            : "border-[#1B2228]/20 bg-white/75 text-[#1B2228]"
                        }`}
                      >
                        0{index + 1} · {member.badge}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-medium ${
                          isSlate ? "text-slate-300" : "text-[#4A5864]"
                        }`}
                      >
                        <MapPin className="w-3 h-3" />
                        {member.location}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 mb-5">
                      <div
                        className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 border-2 shadow-md ${
                          isSlate
                            ? "border-[#FCE46D]/70 bg-white"
                            : "border-white bg-white"
                        }`}
                      >
                        <img
                          src={member.imageUrl}
                          alt={member.name}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      <div>
                        <h3
                          className={`text-xl font-extrabold tracking-tight leading-snug ${
                            isSlate ? "text-white" : "text-[#1B2228]"
                          }`}
                        >
                          {member.name}
                        </h3>
                        <p
                          className={`text-xs sm:text-sm font-semibold mt-1 ${
                            isSlate ? "text-[#FCE46D]" : "text-[#2C3740]"
                          }`}
                        >
                          {member.role}
                        </p>
                        {member.featuredOnHome && (
                          <span
                            className={`inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider mt-1.5 px-2 py-0.5 rounded-md ${
                              isSlate
                                ? "bg-[#FCE46D]/20 text-[#FCE46D]"
                                : "bg-[#1B2228]/10 text-[#1B2228]"
                            }`}
                          >
                            <Sparkles className="w-2.5 h-2.5" /> Core Summit Crew
                          </span>
                        )}
                      </div>
                    </div>

                    <p
                      className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                        isSlate ? "text-slate-200/95" : "text-[#3D4B56]"
                      }`}
                    >
                      {member.bio}
                    </p>
                  </div>

                  <div
                    className={`pt-4 border-t flex items-center justify-between gap-2 ${
                      isSlate ? "border-white/15" : "border-[#1B2228]/10"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {member.linkedinUrl && (
                        <a
                          href={member.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                            isSlate
                              ? "bg-white/10 hover:bg-white text-white hover:text-[#1B2228]"
                              : "bg-white/80 hover:bg-[#1B2228] text-[#1B2228] hover:text-white"
                          }`}
                        >
                          <span>LinkedIn</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className={`inline-flex items-center justify-center w-8 h-8 rounded-full transition-all ${
                            isSlate
                              ? "bg-white/10 hover:bg-white text-white hover:text-[#1B2228]"
                              : "bg-white/80 hover:bg-[#1B2228] text-[#1B2228] hover:text-white"
                          }`}
                          title={`Email ${member.name}`}
                        >
                          <Mail className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedMember(member)}
                      className={`inline-flex items-center gap-1 text-xs font-bold ${
                        isSlate
                          ? "text-[#FCE46D] hover:underline"
                          : "text-[#1B2228] hover:underline"
                      }`}
                    >
                      <span>Profile</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </SunThemeCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          MEMBER PROFILE MODAL
         ===================================================================== */}
      {selectedMember && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="bg-white rounded-[28px] max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={selectedMember.imageUrl}
                  alt={selectedMember.name}
                  className="w-20 h-20 rounded-2xl object-cover object-center border-2 border-[#FCE46D] bg-slate-100"
                />
                <div>
                  <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-[#1B2228] mb-1">
                    {selectedMember.badge}
                  </span>
                  <h3 className="text-2xl font-extrabold text-[#1B2228]">
                    {selectedMember.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-[#4A5864]">
                    {selectedMember.role}
                  </p>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" /> {selectedMember.location}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedMember(null)}
                className="rounded-full bg-slate-100 hover:bg-slate-200 px-3 py-1 text-xs font-bold text-[#1B2228]"
              >
                Close
              </button>
            </div>

            <p className="text-sm text-[#2C3740] leading-relaxed">
              {selectedMember.bio}
            </p>

            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                {selectedMember.linkedinUrl && (
                  <a
                    href={selectedMember.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#1B2228] text-white px-5 py-2.5 text-xs font-semibold"
                  >
                    <span>Connect on LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
                {selectedMember.email && (
                  <a
                    href={`mailto:${selectedMember.email}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 text-[#1B2228] px-4 py-2.5 text-xs font-semibold"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email</span>
                  </a>
                )}
              </div>
              <Link
                href="/apply"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#FCE46D] text-[#1B2228] px-5 py-2.5 text-xs font-bold"
              >
                <span>Apply for 2027 Summit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </SiteShell>
  );
}
