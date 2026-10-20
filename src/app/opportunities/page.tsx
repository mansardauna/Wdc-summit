"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Award,
  Video,
  Mail,
  Copy,
  Check,
  ArrowRight,
  Sparkles,
  School,
  Globe2,
  Film,
  Send,
  CheckCircle2,
  Calendar,
  MapPin,
  Clock,
} from "lucide-react";
import { DEFAULT_CMS_CONTENT, SiteCMSContent } from "@/lib/default-data";
import { SiteShell } from "@/components/NavbarAndFooter";
import { SunThemeCard, SectionPillBadge } from "@/components/SunSummitDesign";

export default function OpportunitiesPage() {
  const [cms, setCms] = useState<SiteCMSContent>(DEFAULT_CMS_CONTENT);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  // Quick inquiry state
  const [inquiryTrack, setInquiryTrack] = useState("Summit Crew (High School Volunteers)");
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryNote, setInquiryNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch("/api/cms?scope=public", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (d?.cms) setCms(d.cms);
      })
      .catch(() => {});
  }, []);

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2500);
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: inquiryName,
          email: inquiryEmail,
          interestType: `Opportunity: ${inquiryTrack}`,
          source: `Opportunities Page - ${inquiryNote}`,
        }),
      });
      setSubmitted(true);
      setInquiryName("");
      setInquiryEmail("");
      setInquiryNote("");
    } catch {
      // Graceful fallback
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const opportunities = [
    {
      id: "summit-crew",
      number: "01",
      title: "Summit Crew",
      subtitle: "High School Volunteer Program",
      badge: "High School Volunteers · 5 Days Onsite",
      theme: "ice" as const,
      icon: <School className="w-7 h-7 text-[#005EB8]" />,
      accentBg: "bg-blue-50 border-blue-200 text-[#005EB8]",
      tagColor: "bg-[#005EB8] text-white",
      description:
        "High school volunteers will be onsite in Cape Town for all 5 days of the Summit (11–15 October 2027) from neighboring schools. Volunteers support delegate coordination, exhibition stages, registration desk operations, and live technology demonstrations.",
      highlights: [
        "Earn official community service and volunteer credits recognized for school graduation and university applications",
        "Onsite access to world leaders, masterclasses, and hands-on climate disaster technologies",
        "Official Certificate of Commendation from the World Disaster Center Secretariat",
        "Open to high school students from neighboring schools across Cape Town and the Western Cape",
      ],
      conceptNoteStatus: "Concept note is currently in progress. Early applications and school coordinator inquiries are open.",
      contactEmail: "summit@worlddisastercenter.org",
      emailSubject: "Application: Summit Crew (High School Volunteer)",
      emailBody:
        "Dear Secretariat,%0D%0A%0D%0AI would like to register my interest for the Summit Crew High School Volunteer Program in Cape Town (11–15 October 2027).%0D%0A%0D%0AFull Name: %0D%0ASchool / Institution: %0D%0AGrade / Year: %0D%0ACity: Cape Town%0D%0APhone / WhatsApp: %0D%0A%0D%0AThank you!",
    },
    {
      id: "wdc-ambassador",
      number: "02",
      title: "WDC Ambassador",
      subtitle: "WDC Leadership Summit Ambassador Competition",
      badge: "Global Youth Competition · Worldwide",
      theme: "powder" as const,
      icon: <Globe2 className="w-7 h-7 text-[#D97706]" />,
      accentBg: "bg-amber-50 border-amber-200 text-[#D97706]",
      tagColor: "bg-[#D97706] text-white",
      description:
        "An international competitive search for passionate youth climate champions (ages 18–30) to represent their countries and communities. Ambassadors lead local grassroots climate initiatives, mobilize youth voices, and champion the WDC Global Environmental Protection Declaration.",
      highlights: [
        "Official WDC Summit Youth Ambassador designation representing your home region",
        "Priority nomination and consideration for fully funded delegate seats and travel grants",
        "Direct mentorship from senior humanitarian strategists and disaster resilience architects",
        "Opportunity to co-lead youth breakout sessions and present local climate evidence on stage",
      ],
      conceptNoteStatus: "Competition framework and rubric in progress. Early applicant profiles and regional ambassador inquiries are open.",
      contactEmail: "summit@worlddisastercenter.org",
      emailSubject: "Application: WDC Leadership Summit Ambassador Competition",
      emailBody:
        "Dear Secretariat,%0D%0A%0D%0AI would like to apply for the WDC Leadership Summit Ambassador Competition for the 2027 Summit in Cape Town.%0D%0A%0D%0AFull Name: %0D%0ACountry of Residence: %0D%0AAge (18-30): %0D%0ABrief Climate / Community Background: %0D%0ALinkedIn / Portfolio (optional): %0D%0A%0D%0AThank you!",
    },
    {
      id: "climate-cinematographers",
      number: "03",
      title: "Climate Cinematographers",
      subtitle: "Call for Documentaries & Visual Stories",
      badge: "International Call for Documentaries · Film Screening",
      theme: "slate" as const,
      icon: <Film className="w-7 h-7 text-[#FCE46D]" />,
      accentBg: "bg-purple-950/80 border-purple-800 text-[#FCE46D]",
      tagColor: "bg-[#FCE46D] text-[#1B2228]",
      description:
        "An open call for independent documentary filmmakers, investigative journalists, and youth storytellers producing powerful short films, documentaries, and visual narratives on climate adaptation, disaster recovery, indigenous solutions, and frontline community resilience.",
      highlights: [
        "Selected films will be screened on the official Climate & Culture Stage (Day 02) in Cape Town",
        "Global exposure across World Disaster Center broadcast networks, partner hubs, and media channels",
        "Networking and pitch sessions with international environmental documentary funders and media houses",
        "Complimentary Summit Delegate Accreditation and invitation to the Cape Town Reception",
      ],
      conceptNoteStatus: "Submission guidelines and screening schedule in progress. Pitch inquiries, work-in-progress screeners, and trailers are welcome.",
      contactEmail: "summit@worlddisastercenter.org",
      emailSubject: "Submission Inquiry: Climate Cinematographers Call for Documentaries",
      emailBody:
        "Dear Secretariat,%0D%0A%0D%0AI would like to submit an inquiry / screener for the Climate Cinematographers Call for Documentaries.%0D%0A%0D%0AFilm Title: %0D%0ADirector / Producer: %0D%0ACountry: %0D%0AEstimated Runtime: %0D%0ATrailer / Screener URL: %0D%0ASynopsis: %0D%0A%0D%0AThank you!",
    },
  ];

  return (
    <SiteShell cms={cms}>
      {/* =====================================================================
          HERO BANNER · SUMMIT OPPORTUNITIES
         ===================================================================== */}
      <section className="relative overflow-hidden bg-[#061C38] text-white pt-16 sm:pt-20 pb-16 px-5 sm:px-8 lg:px-14">
        {/* Subtle Backdrop */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20 bg-cover bg-center"
          style={{
            backgroundImage: "url('/illustrations/cape-town-circle.jpg')",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(6,28,56,0.94) 0%, rgba(6,28,56,0.86) 65%, #061C38 100%)",
          }}
        />

        <div className="relative z-10 max-w-[1240px] mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-500/15 border border-sky-400/30 px-4 py-1.5 text-xs font-mono font-bold tracking-[0.16em] uppercase text-[#FCE46D] mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#FCE46D]" />
              <span>YOUTH DEVELOPMENT PROGRAM</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.08] mb-4">
              Summit Opportunities
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed mb-6">
              The World Disaster Center Youth Leadership Summit 2027 is a youth-first platform. We are developing three dedicated opportunity pathways for high school volunteers, global youth ambassadors, and climate cinematographers.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-sky-200">
              <span className="inline-flex items-center gap-1.5 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15">
                <Calendar className="w-3.5 h-3.5 text-[#FCE46D]" />
                11–15 October 2027
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15">
                <MapPin className="w-3.5 h-3.5 text-[#FCE46D]" />
                Cape Town, South Africa
              </span>
              <span className="inline-flex items-center gap-1.5 bg-amber-400/15 text-amber-200 px-3.5 py-1.5 rounded-full border border-amber-400/30 font-medium">
                <Clock className="w-3.5 h-3.5" />
                Concept Notes in Progress · Applications Open via Email
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          THE 3 OPPORTUNITY TRACKS
         ===================================================================== */}
      <section className="px-5 sm:px-8 lg:px-14 py-14 sm:py-20">
        <div className="max-w-[1240px] mx-auto space-y-12">
          {opportunities.map((opp) => (
            <div
              key={opp.id}
              id={opp.id}
              className="scroll-mt-28 bg-white rounded-[32px] p-6 sm:p-10 lg:p-12 border border-slate-200/90 shadow-card transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Left Details */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-slate-100 border border-slate-200 text-[#08203E] font-mono font-extrabold text-sm">
                      {opp.number}
                    </span>
                    <span
                      className={`inline-block rounded-full px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider ${opp.accentBg}`}
                    >
                      {opp.badge}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#1B2228]">
                      {opp.title}
                    </h2>
                    <p className="text-sm sm:text-base font-semibold text-[#005EB8] mt-1">
                      {opp.subtitle}
                    </p>
                  </div>

                  <p className="text-sm sm:text-base text-[#4A5864] leading-relaxed">
                    {opp.description}
                  </p>

                  <div className="pt-2">
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#1B2228] mb-3">
                      KEY BENEFITS &amp; SCOPE
                    </div>
                    <ul className="space-y-2.5">
                      {opp.highlights.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2C3740]"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#005EB8] mt-2 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Status Note */}
                  <div className="rounded-2xl bg-amber-50/80 border border-amber-200/80 p-4 text-xs text-amber-900 leading-relaxed">
                    <strong className="font-bold">Status:</strong> {opp.conceptNoteStatus}
                  </div>
                </div>

                {/* Right Action / Email Application Desk */}
                <div className="lg:col-span-5 bg-[#F8FBFF] rounded-[24px] p-6 sm:p-7 border border-sky-100 flex flex-col justify-between h-full space-y-5">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#08203E] mb-2">
                      <Mail className="w-4 h-4 text-[#005EB8]" />
                      <span>HOW TO APPLY / INQUIRE</span>
                    </div>

                    <h3 className="text-lg font-bold text-[#1B2228] mb-1">
                      Apply via Official Email
                    </h3>
                    <p className="text-xs text-[#54626F] leading-relaxed mb-4">
                      While the full online registration form is being configured alongside the concept notes, all applicants can register immediately by emailing the Secretariat desk.
                    </p>

                    <div className="rounded-xl bg-white p-3.5 border border-slate-200/80 space-y-2">
                      <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
                        Recipient Address
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs sm:text-sm font-bold text-[#08203E] break-all">
                          {opp.contactEmail}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyEmail(opp.contactEmail)}
                          className="shrink-0 p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition cursor-pointer"
                          title="Copy email address"
                        >
                          {copiedEmail === opp.contactEmail ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                        <span className="font-semibold text-slate-700">Subject:</span> {opp.emailSubject}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    <a
                      href={`mailto:${opp.contactEmail}?subject=${encodeURIComponent(
                        opp.emailSubject
                      )}&body=${opp.emailBody}`}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#08203E] hover:bg-[#133A6B] text-white font-bold py-3.5 px-6 text-xs sm:text-sm shadow-sm transition-all"
                    >
                      <Mail className="w-4 h-4 text-[#FCE46D]" />
                      <span>Send Application Email</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        setInquiryTrack(opp.title);
                        const el = document.getElementById("quick-inquiry");
                        el?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="w-full text-center text-xs font-semibold text-[#005EB8] hover:underline cursor-pointer py-1"
                    >
                      Or submit quick interest on this page ↓
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          QUICK INQUIRY / LEAD FORM (ON-PAGE APPLICATION)
         ===================================================================== */}
      <section id="quick-inquiry" className="px-5 sm:px-8 lg:px-14 pb-20">
        <div className="max-w-[1240px] mx-auto">
          <SunThemeCard theme="powder" watermarkPosition="bottom-right" className="p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-3">
                <SectionPillBadge
                  number="DESK"
                  label="DIRECT INQUIRY &amp; PRE-REGISTRATION"
                />
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#1B2228]">
                  Register Your Early Interest
                </h2>
                <p className="text-sm sm:text-base text-[#4A5864] leading-relaxed">
                  Prefer not to send an email right now? Leave your details and select your track. Our Youth Development Secretariat will notify you immediately when the finalized concept notes and application portals go live.
                </p>
                <div className="pt-2 text-xs text-[#54626F] space-y-1 font-mono">
                  <div>✓ Secretariat direct response within 48 hours</div>
                  <div>✓ Early concept note packet sent to your inbox</div>
                </div>
              </div>

              <div className="lg:col-span-6">
                {submitted ? (
                  <div className="bg-white rounded-2xl p-7 text-center space-y-3 shadow-sm border border-emerald-200">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-bold text-[#1B2228]">
                      Thank you! Your interest has been registered.
                    </h3>
                    <p className="text-xs sm:text-sm text-[#54626F]">
                      Our team will reach out via email with the finalized concept note and application guide for your selected track.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="mt-2 text-xs font-bold text-[#005EB8] hover:underline cursor-pointer"
                    >
                      Register for another track
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleInquirySubmit}
                    className="bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-7 shadow-sm border border-slate-200/80 space-y-3.5"
                  >
                    <div>
                      <label className="block text-xs font-semibold text-[#1B2228] mb-1">
                        Select Opportunity Track *
                      </label>
                      <select
                        value={inquiryTrack}
                        onChange={(e) => setInquiryTrack(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm bg-white focus:outline-none focus:border-[#08203E]"
                      >
                        <option value="Summit Crew (High School Volunteers)">
                          1. Summit Crew (High School Volunteers · 5 Days Onsite)
                        </option>
                        <option value="WDC Ambassador (Global Youth Competition)">
                          2. WDC Ambassador (Leadership Summit Ambassador Competition)
                        </option>
                        <option value="Climate Cinematographers (Call for Documentaries)">
                          3. Climate Cinematographers (Call for Documentaries)
                        </option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#1B2228] mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Tendai Moyo"
                          value={inquiryName}
                          onChange={(e) => setInquiryName(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#08203E]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#1B2228] mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="you@example.com"
                          value={inquiryEmail}
                          onChange={(e) => setInquiryEmail(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#08203E]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1B2228] mb-1">
                        School / Country / Brief Note (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Grade 11 Student in Cape Town, or Filmmaker from Nairobi"
                        value={inquiryNote}
                        onChange={(e) => setInquiryNote(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#08203E]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#08203E] hover:bg-[#133A6B] text-white font-bold py-3 px-6 text-xs sm:text-sm transition-all disabled:opacity-50 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5 text-[#FCE46D]" />
                      <span>{submitting ? "Registering..." : "Register Early Interest"}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </SunThemeCard>
        </div>
      </section>
    </SiteShell>
  );
}
