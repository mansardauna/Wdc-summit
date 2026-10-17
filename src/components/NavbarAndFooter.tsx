"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Menu,
  X,
  Lock,
  ArrowUpRight,
  Globe,
  Calendar,
  MapPin,
} from "lucide-react";
import { WdcBrandLogo } from "./SunSummitDesign";
import { SiteCMSContent, DEFAULT_CMS_CONTENT } from "@/lib/default-data";

export function Navbar({ cms = DEFAULT_CMS_CONTENT }: { cms?: SiteCMSContent }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [summitDropdown, setSummitDropdown] = useState(false);
  const [programmeDropdown, setProgrammeDropdown] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <header role="banner" className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-5 sm:px-8 lg:px-14 py-3.5">
      <div className="max-w-[1320px] mx-auto flex items-center justify-between gap-4">
        {/* Left: Uploaded World Disaster Center Company Logo */}
        <Link href="/" className="group" aria-label="World Disaster Center Home">
          <WdcBrandLogo
            theme="dark"
            showBadge={true}
            summitTitle={cms.settings.summitTitle}
          />
        </Link>

        {/* Center Navigation Links */}
        <nav
          aria-label="Main Navigation"
          className="hidden lg:flex items-center gap-7 text-[13.5px] font-medium text-[#2C3740]"
        >
          <Link
            href="/"
            className={`hover:text-[#1B2228] transition-colors ${
              isActive("/")
                ? "font-bold text-[#1B2228]"
                : ""
            }`}
          >
            Home
          </Link>

          {/* The Summit Page + Quick Section Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setSummitDropdown(true)}
            onMouseLeave={() => setSummitDropdown(false)}
            onFocus={() => setSummitDropdown(true)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                setSummitDropdown(false);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") setSummitDropdown(false);
            }}
          >
            <Link
              href="/summit"
              aria-haspopup="true"
              aria-expanded={summitDropdown}
              className={`flex items-center gap-1 py-1 hover:text-[#1B2228] transition-colors ${
                isActive("/summit") ? "font-bold text-[#1B2228]" : ""
              }`}
            >
              <span>The Summit</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
            </Link>
            {summitDropdown && (
              <div
                role="menu"
                aria-label="The Summit submenu"
                className="absolute left-0 top-full pt-2 w-60 z-50"
              >
                <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-2 space-y-1">
                  <Link
                    href="/summit"
                    role="menuitem"
                    className="block px-3.5 py-2 rounded-xl text-xs hover:bg-[#EEF5FA] text-[#1B2228]"
                  >
                    <div className="font-semibold">01 · About the Summit</div>
                    <div className="text-[11px] text-slate-500">Overview & Mission</div>
                  </Link>
                  <Link
                    href="/summit#pillars"
                    role="menuitem"
                    className="block px-3.5 py-2 rounded-xl text-xs hover:bg-[#EEF5FA] text-[#1B2228]"
                  >
                    <div className="font-semibold">04 · Six Pillars of Resilience</div>
                    <div className="text-[11px] text-slate-500">Training Curriculum</div>
                  </Link>
                  <Link
                    href="/summit#host-city"
                    role="menuitem"
                    className="block px-3.5 py-2 rounded-xl text-xs hover:bg-[#EEF5FA] text-[#1B2228]"
                  >
                    <div className="font-semibold">05 · Now, Why Cape Town?</div>
                    <div className="text-[11px] text-slate-500">Host City 2027</div>
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/declaration"
            className={`hover:text-[#1B2228] transition-colors ${
              isActive("/declaration") ? "font-bold text-[#1B2228]" : ""
            }`}
          >
            Declaration
          </Link>

          {/* Programme Page + Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setProgrammeDropdown(true)}
            onMouseLeave={() => setProgrammeDropdown(false)}
            onFocus={() => setProgrammeDropdown(true)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                setProgrammeDropdown(false);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") setProgrammeDropdown(false);
            }}
          >
            <Link
              href="/programme"
              aria-haspopup="true"
              aria-expanded={programmeDropdown}
              className={`flex items-center gap-1 py-1 hover:text-[#1B2228] transition-colors ${
                isActive("/programme") ? "font-bold text-[#1B2228]" : ""
              }`}
            >
              <span>Programme</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
            </Link>
            {programmeDropdown && (
              <div
                role="menu"
                aria-label="Programme submenu"
                className="absolute left-0 top-full pt-2 w-60 z-50"
              >
                <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-2 space-y-1">
                  <Link
                    href="/programme"
                    role="menuitem"
                    className="block px-3.5 py-2 rounded-xl text-xs hover:bg-[#EEF5FA] text-[#1B2228]"
                  >
                    <div className="font-semibold">07 · Five Days in Cape Town</div>
                    <div className="text-[11px] text-slate-500">Day 01 – Day 05 Schedule</div>
                  </Link>
                  <Link
                    href="/programme#stage"
                    role="menuitem"
                    className="block px-3.5 py-2 rounded-xl text-xs hover:bg-[#EEF5FA] text-[#1B2228]"
                  >
                    <div className="font-semibold">06 · 20 Delegate Speaker Slots</div>
                    <div className="text-[11px] text-slate-500">Your Voice on Stage</div>
                  </Link>
                  <Link
                    href="/programme#who-can-apply"
                    role="menuitem"
                    className="block px-3.5 py-2 rounded-xl text-xs hover:bg-[#EEF5FA] text-[#1B2228]"
                  >
                    <div className="font-semibold">08 · Who Can Apply?</div>
                    <div className="text-[11px] text-slate-500">Eligibility & Profiles</div>
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/packages"
            className={`hover:text-[#1B2228] transition-colors ${
              isActive("/packages") ? "font-bold text-[#1B2228]" : ""
            }`}
          >
            Packages
          </Link>

          <Link
            href="/partners"
            className={`hover:text-[#1B2228] transition-colors ${
              isActive("/partners") ? "font-bold text-[#1B2228]" : ""
            }`}
          >
            Partners
          </Link>

          <Link
            href="/contact"
            className={`hover:text-[#1B2228] transition-colors ${
              isActive("/contact") ? "font-bold text-[#1B2228]" : ""
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Right CTA Button */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/apply"
            className="inline-flex items-center justify-center rounded-full bg-[#465765] hover:bg-[#34434F] text-white px-6 py-2.5 text-xs font-semibold tracking-wide shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2228] focus-visible:ring-offset-2"
          >
            Apply Now
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 rounded-xl bg-slate-100 text-[#1B2228] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2228]"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
        >
          {mobileOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile Navigation"
          className="lg:hidden mt-4 pt-4 border-t border-slate-100 space-y-2 pb-2"
        >
          <div className="grid grid-cols-2 gap-2 text-xs font-medium">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 rounded-xl bg-slate-50 text-[#1B2228]"
            >
              Home
            </Link>
            <Link
              href="/summit"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 rounded-xl bg-slate-50 text-[#1B2228]"
            >
              The Summit
            </Link>
            <Link
              href="/declaration"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 rounded-xl bg-slate-50 text-[#1B2228]"
            >
              Declaration
            </Link>
            <Link
              href="/programme"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 rounded-xl bg-slate-50 text-[#1B2228]"
            >
              Programme
            </Link>
            <Link
              href="/packages"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 rounded-xl bg-slate-50 text-[#1B2228]"
            >
              Packages
            </Link>
            <Link
              href="/partners"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 rounded-xl bg-slate-50 text-[#1B2228]"
            >
              Partners
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 rounded-xl bg-slate-50 text-[#1B2228]"
            >
              Contact
            </Link>
          </div>
          <div className="pt-2">
            <Link
              href="/apply"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center py-3 rounded-full text-xs font-semibold bg-[#465765] text-white"
            >
              Apply Now
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

export function Footer({ cms = DEFAULT_CMS_CONTENT }: { cms?: SiteCMSContent }) {
  return (
    <footer role="contentinfo" className="w-full bg-[#0F1B26] text-white pt-16 pb-12 px-6 sm:px-10 lg:px-16">
      <div className="max-w-[1240px] mx-auto">
        {/* Gateway to Climate Leadership Banner */}
        <div className="relative overflow-hidden rounded-[28px] bg-[#1A2B3B] border border-white/10 p-8 sm:p-12 mb-14 text-center">
          <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#B7D3E6] mb-3">
            {cms.gatewayCta.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Your Gateway to{" "}
            <span className="text-[#FCE46D]">Climate Leadership</span>
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-200/90 mb-8">
            {cms.gatewayCta.subtitle}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 rounded-full bg-[#FCE46D] hover:bg-[#F8D849] text-[#1B2228] font-semibold px-7 py-3.5 text-sm shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FCE46D]"
            >
              <span>{cms.gatewayCta.primaryCta}</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href="/packages#faq"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 hover:bg-white/10 text-white font-medium px-7 py-3.5 text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>{cms.gatewayCta.secondaryCta}</span>
            </Link>
          </div>
        </div>

        {/* Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-white/10">
          <div className="md:col-span-5 space-y-4">
            <WdcBrandLogo
              theme="light"
              showBadge={true}
              summitTitle={cms.settings.summitTitle}
            />
            <p className="text-sm text-slate-300 pt-1">
              Together, we lead. Together, we prepare.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#FCE46D]" aria-hidden="true" />
                {cms.settings.datesText}
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#FCE46D]" aria-hidden="true" />
                {cms.settings.hostCity}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              <a
                href={`mailto:${cms.settings.contactEmail}`}
                className="text-white hover:text-[#FCE46D] underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FCE46D]"
              >
                {cms.settings.contactEmail}
              </a>{" "}
              ·{" "}
              <span className="text-slate-300">{cms.settings.websiteDomain}</span>
            </p>
          </div>

          <div className="md:col-span-3 space-y-2.5">
            <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#B7D3E6]">
              THE SUMMIT
            </div>
            <nav aria-label="Footer Summit Links">
              <ul className="space-y-2 text-sm text-slate-300">
                <li>
                  <Link href="/summit" className="hover:text-white transition">
                    About the Summit & Pillars
                  </Link>
                </li>
                <li>
                  <Link href="/declaration" className="hover:text-white transition">
                    The WDC Declaration
                  </Link>
                </li>
                <li>
                  <Link href="/programme" className="hover:text-white transition">
                    5-Day Programme & Speakers
                  </Link>
                </li>
                <li>
                  <Link href="/partners" className="hover:text-white transition">
                    Partners & Global Impact
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition">
                    Contact Secretariat
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="md:col-span-4 space-y-2.5">
            <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#B7D3E6]">
              APPLY & PORTALS
            </div>
            <nav aria-label="Footer Portal Links">
              <ul className="space-y-2 text-sm text-slate-300">
                <li>
                  <Link href="/packages" className="hover:text-white transition">
                    Scholarships ($16.99) & Paid Packages
                  </Link>
                </li>
                <li>
                  <Link href="/apply" className="hover:text-white transition">
                    Delegate Application Portal
                  </Link>
                </li>
                <li>
                  <Link href="/payment" className="hover:text-white transition">
                    Payment & Receipt Portal
                  </Link>
                </li>
                <li>
                  <Link href="/packages#faq" className="hover:text-white transition">
                    Frequently Asked Questions (FAQ)
                  </Link>
                </li>
                <li className="pt-1">
                  <Link
                    href="/admin/login"
                    className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#FCE46D] transition"
                  >
                    <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>CMS Admin Login</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="leading-relaxed max-w-4xl">{cms.gatewayCta.disclaimer}</p>
          <div className="flex items-center gap-4 shrink-0">
            <span className="inline-flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#B7D3E6]" aria-hidden="true" />
              <span>Cape Town 2027</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/**
 * Full-bleed SiteShell without the outer card wrapper!
 */
export function SiteShell({
  cms,
  children,
}: {
  cms?: SiteCMSContent;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-[#F4F6F8] text-[#1B2228] flex flex-col selection:bg-[#FCE46D] selection:text-[#1B2228]">
      <Navbar cms={cms} />
      <main id="main-content" tabIndex={-1} className="flex-1 w-full outline-none">
        {children}
      </main>
      <Footer cms={cms} />
    </div>
  );
}
