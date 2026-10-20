"use client";

import React, { useState, useEffect } from "react";
import {
  School,
  Globe2,
  Film,
  Mail,
  Copy,
  Check,
  ArrowRight,
  Send,
  CheckCircle2,
} from "lucide-react";
import { DEFAULT_CMS_CONTENT, SiteCMSContent } from "@/lib/default-data";
import { SiteShell } from "@/components/NavbarAndFooter";
import { SectionPillBadge, SunThemeCard } from "@/components/SunSummitDesign";

/**
 * Editorial Illustration Divider between Opportunity Sections
 */
function SectionIllustrationDivider({ trackNumber }: { trackNumber: string }) {
  return (
    <div className="py-12 sm:py-16 flex items-center justify-center">
      <div className="w-full flex items-center gap-4">
        <div className="flex-1 h-px bg-slate-200" />
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-500 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-[#005EB8]" />
          <span>CONTINUE TO TRACK {trackNumber}</span>
          <span className="w-2 h-2 rounded-full bg-[#005EB8]" />
        </div>
        <div className="flex-1 h-px bg-slate-200" />
      </div>
    </div>
  );
}

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
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SiteShell cms={cms}>
      {/* =====================================================================
          PAGE HERO · UNIFIED WITH /summit STYLE (Requirement 5 & 6)
         ===================================================================== */}
      <section className="bg-[#0B1C2E] text-white py-16 sm:py-20 px-5 sm:px-8 lg:px-14 border-b border-white/10">
        <div className="max-w-[1240px] mx-auto">
          <SectionPillBadge
            number="OPP"
            label="YOUTH DEVELOPMENT PROGRAM"
            dark
          />
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight max-w-3xl leading-[1.08] mb-5">
            Summit Opportunities
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed mb-4">
            Youth Summit Crew is a premier youth development program offering three distinct pathways for high school volunteers, emerging global ambassadors, and climate cinematographers to participate in the Cape Town Summit (11–15 October 2027).
          </p>
          <p className="text-xs sm:text-sm text-[#FCE46D] font-mono tracking-wide max-w-2xl">
            Concept notes are currently in progress. Early applications and school coordinator inquiries are open via the official Secretariat emails below.
          </p>
        </div>
      </section>

      {/* =====================================================================
          OPPORTUNITY TRACKS WRITTEN NORMALLY WITHOUT CARDS (Requirement 2)
         ===================================================================== */}
      <section className="px-5 sm:px-8 lg:px-14 py-14 sm:py-20">
        <div className="max-w-[1240px] mx-auto">
          {/* TRACK 01 · SUMMIT CREW */}
          <div id="summit-crew" className="scroll-mt-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 text-[#005EB8] px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider">
                  <School className="w-3.5 h-3.5" />
                  <span>HIGH SCHOOL VOLUNTEERS · 5 DAYS ONSITE</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1B2228] leading-[1.12]">
                  01 · Summit Crew
                </h2>
                <div className="text-base sm:text-lg font-semibold text-[#005EB8]">
                  High School Volunteer Program
                </div>

                <p className="text-sm sm:text-base text-[#4A5864] leading-relaxed">
                  High school volunteers will be onsite in Cape Town for all 5 days of the Summit (11–15 October 2027) from neighboring schools. Volunteers support delegate coordination, exhibition stages, registration desk operations, and live disaster technology demonstrations.
                </p>

                <div className="pt-2">
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#1B2228] mb-3">
                    KEY BENEFITS &amp; SCOPE
                  </div>
                  <ul className="space-y-2.5">
                    <li className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2C3740]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#005EB8] mt-2 shrink-0" />
                      <span>Earn official community service and volunteer credits recognized for school graduation and university applications</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2C3740]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#005EB8] mt-2 shrink-0" />
                      <span>Onsite access to world leaders, masterclasses, and hands-on climate disaster technologies</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2C3740]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#005EB8] mt-2 shrink-0" />
                      <span>Official Certificate of Commendation from the World Disaster Center Secretariat</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2C3740]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#005EB8] mt-2 shrink-0" />
                      <span>Open to high school students from neighboring schools across Cape Town and the Western Cape</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-xs text-amber-900 leading-relaxed">
                  <strong className="font-bold">Status:</strong> Concept note is currently in progress. Early applications and school coordinator inquiries are open.
                </div>
              </div>

              {/* Right Email Application Box */}
              <div className="lg:col-span-5 bg-slate-50 rounded-[24px] p-6 sm:p-8 border border-slate-200/90 space-y-4">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#08203E]">
                  HOW TO APPLY / INQUIRE
                </div>
                <h3 className="text-lg font-bold text-[#1B2228]">
                  Apply via Official Email
                </h3>
                <p className="text-xs text-[#54626F] leading-relaxed">
                  While the full online registration form is being configured alongside the concept notes, all applicants can register immediately by emailing the Secretariat desk.
                </p>

                <div className="rounded-xl bg-white p-3.5 border border-slate-200 space-y-1.5">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                    Recipient Address
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs sm:text-sm font-bold text-[#08203E]">
                      summit@worlddisastercenter.org
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyEmail("summit@worlddisastercenter.org")}
                      className="p-1.5 rounded-md hover:bg-slate-100 text-slate-600 transition cursor-pointer"
                      title="Copy email address"
                    >
                      {copiedEmail === "summit@worlddisastercenter.org" ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                    <span className="font-semibold text-slate-700">Subject:</span> Application: Summit Crew (High School Volunteer)
                  </div>
                </div>

                <a
                  href="mailto:summit@worlddisastercenter.org?subject=Application:%20Summit%20Crew%20(High%20School%20Volunteer)&body=Dear%20Secretariat,%0D%0A%0D%0AI%20would%20like%20to%20register%20my%20interest%20for%20the%20Summit%20Crew%20High%20School%20Volunteer%20Program%20in%20Cape%20Town%20(11–15%20October%202027).%0D%0A%0D%0AFull%20Name:%20%0D%0ASchool%20/%20Institution:%20%0D%0AGrade%20/%20Year:%20%0D%0ACity:%20Cape%20Town%0D%0APhone%20/%20WhatsApp:%20%0D%0A%0D%0AThank%20you!"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#1B2228] hover:bg-[#34434F] text-white font-bold py-3.5 px-6 text-xs sm:text-sm transition-all"
                >
                  <Mail className="w-4 h-4 text-[#FCE46D]" />
                  <span>Send Application Email</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <SectionIllustrationDivider trackNumber="02" />

          {/* TRACK 02 · WDC AMBASSADOR */}
          <div id="wdc-ambassador" className="scroll-mt-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 text-[#D97706] px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider">
                  <Globe2 className="w-3.5 h-3.5" />
                  <span>GLOBAL YOUTH COMPETITION · WORLDWIDE</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1B2228] leading-[1.12]">
                  02 · WDC Ambassador
                </h2>
                <div className="text-base sm:text-lg font-semibold text-[#D97706]">
                  WDC Leadership Summit Ambassador Competition
                </div>

                <p className="text-sm sm:text-base text-[#4A5864] leading-relaxed">
                  An international competitive search for passionate youth climate champions (ages 18–30) to represent their countries and communities. Ambassadors lead local grassroots climate initiatives, mobilize youth voices, and champion the WDC Global Environmental Protection Declaration.
                </p>

                <div className="pt-2">
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#1B2228] mb-3">
                    KEY BENEFITS &amp; SCOPE
                  </div>
                  <ul className="space-y-2.5">
                    <li className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2C3740]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] mt-2 shrink-0" />
                      <span>Official WDC Summit Youth Ambassador designation representing your home region</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2C3740]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] mt-2 shrink-0" />
                      <span>Priority nomination and consideration for fully funded delegate seats and travel grants</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2C3740]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] mt-2 shrink-0" />
                      <span>Direct mentorship from senior humanitarian strategists and disaster resilience architects</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2C3740]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] mt-2 shrink-0" />
                      <span>Opportunity to co-lead youth breakout sessions and present local climate evidence on stage</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-xs text-amber-900 leading-relaxed">
                  <strong className="font-bold">Status:</strong> Competition framework and rubric in progress. Early applicant profiles and regional ambassador inquiries are open.
                </div>
              </div>

              {/* Right Email Application Box */}
              <div className="lg:col-span-5 bg-slate-50 rounded-[24px] p-6 sm:p-8 border border-slate-200/90 space-y-4">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#08203E]">
                  HOW TO APPLY / INQUIRE
                </div>
                <h3 className="text-lg font-bold text-[#1B2228]">
                  Apply via Official Email
                </h3>
                <p className="text-xs text-[#54626F] leading-relaxed">
                  Submit your brief profile and climate background directly to the Secretariat desk.
                </p>

                <div className="rounded-xl bg-white p-3.5 border border-slate-200 space-y-1.5">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                    Recipient Address
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs sm:text-sm font-bold text-[#08203E]">
                      summit@worlddisastercenter.org
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyEmail("summit@worlddisastercenter.org")}
                      className="p-1.5 rounded-md hover:bg-slate-100 text-slate-600 transition cursor-pointer"
                      title="Copy email address"
                    >
                      {copiedEmail === "summit@worlddisastercenter.org" ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                    <span className="font-semibold text-slate-700">Subject:</span> Application: WDC Leadership Summit Ambassador Competition
                  </div>
                </div>

                <a
                  href="mailto:summit@worlddisastercenter.org?subject=Application:%20WDC%20Leadership%20Summit%20Ambassador%20Competition&body=Dear%20Secretariat,%0D%0A%0D%0AI%20would%20like%20to%20apply%20for%20the%20WDC%20Leadership%20Summit%20Ambassador%20Competition%20for%20the%202027%20Summit%20in%20Cape%20Town.%0D%0A%0D%0AFull%20Name:%20%0D%0ACountry%20of%20Residence:%20%0D%0AAge%20(18-30):%20%0D%0ABrief%20Climate%20/%20Community%20Background:%20%0D%0ALinkedIn%20/%20Portfolio%20(optional):%20%0D%0A%0D%0AThank%20you!"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#1B2228] hover:bg-[#34434F] text-white font-bold py-3.5 px-6 text-xs sm:text-sm transition-all"
                >
                  <Mail className="w-4 h-4 text-[#FCE46D]" />
                  <span>Send Ambassador Application Email</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <SectionIllustrationDivider trackNumber="03" />

          {/* TRACK 03 · CLIMATE CINEMATOGRAPHERS */}
          <div id="climate-cinematographers" className="scroll-mt-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 text-purple-800 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider">
                  <Film className="w-3.5 h-3.5" />
                  <span>CALL FOR DOCUMENTARIES &amp; VISUAL STORIES</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1B2228] leading-[1.12]">
                  03 · Climate Cinematographers
                </h2>
                <div className="text-base sm:text-lg font-semibold text-purple-800">
                  Call for Documentaries &amp; Visual Stories
                </div>

                <p className="text-sm sm:text-base text-[#4A5864] leading-relaxed">
                  An open call for independent documentary filmmakers, investigative journalists, and youth storytellers producing powerful short films, documentaries, and visual narratives on climate adaptation, disaster recovery, indigenous solutions, and frontline community resilience.
                </p>

                <div className="pt-2">
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#1B2228] mb-3">
                    KEY BENEFITS &amp; SCOPE
                  </div>
                  <ul className="space-y-2.5">
                    <li className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2C3740]">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-700 mt-2 shrink-0" />
                      <span>Selected films will be screened on the official Climate &amp; Culture Stage (Day 02) in Cape Town</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2C3740]">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-700 mt-2 shrink-0" />
                      <span>Global exposure across World Disaster Center broadcast networks, partner hubs, and media channels</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2C3740]">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-700 mt-2 shrink-0" />
                      <span>Networking and pitch sessions with international environmental documentary funders and media houses</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2C3740]">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-700 mt-2 shrink-0" />
                      <span>Complimentary Summit Delegate Accreditation and invitation to the Cape Town Reception</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-xs text-amber-900 leading-relaxed">
                  <strong className="font-bold">Status:</strong> Submission guidelines and screening schedule in progress. Pitch inquiries, work-in-progress screeners, and trailers are welcome.
                </div>
              </div>

              {/* Right Email Application Box */}
              <div className="lg:col-span-5 bg-slate-50 rounded-[24px] p-6 sm:p-8 border border-slate-200/90 space-y-4">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#08203E]">
                  HOW TO APPLY / INQUIRE
                </div>
                <h3 className="text-lg font-bold text-[#1B2228]">
                  Submit Documentary Inquiry
                </h3>
                <p className="text-xs text-[#54626F] leading-relaxed">
                  Email your screener link, synopsis, or pitch deck to the media coordinator desk.
                </p>

                <div className="rounded-xl bg-white p-3.5 border border-slate-200 space-y-1.5">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                    Recipient Address
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs sm:text-sm font-bold text-[#08203E]">
                      summit@worlddisastercenter.org
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyEmail("summit@worlddisastercenter.org")}
                      className="p-1.5 rounded-md hover:bg-slate-100 text-slate-600 transition cursor-pointer"
                      title="Copy email address"
                    >
                      {copiedEmail === "summit@worlddisastercenter.org" ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                    <span className="font-semibold text-slate-700">Subject:</span> Submission Inquiry: Climate Cinematographers Call for Documentaries
                  </div>
                </div>

                <a
                  href="mailto:summit@worlddisastercenter.org?subject=Submission%20Inquiry:%20Climate%20Cinematographers%20Call%20for%20Documentaries&body=Dear%20Secretariat,%0D%0A%0D%0AI%20would%20like%20to%20submit%20an%20inquiry%20/%20screener%20for%20the%20Climate%20Cinematographers%20Call%20for%20Documentaries.%0D%0A%0D%0AFilm%20Title:%20%0D%0ADirector%20/%20Producer:%20%0D%0ACountry:%20%0D%0AEstimated%20Runtime:%20%0D%0ATrailer%20/%20Screener%20URL:%20%0D%0ASynopsis:%20%0D%0A%0D%0AThank%20you!"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#1B2228] hover:bg-[#34434F] text-white font-bold py-3.5 px-6 text-xs sm:text-sm transition-all"
                >
                  <Mail className="w-4 h-4 text-[#FCE46D]" />
                  <span>Submit Screener / Inquiry Email</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
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
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#1B2228] hover:bg-[#34434F] text-white font-bold py-3 px-6 text-xs sm:text-sm transition-all disabled:opacity-50 cursor-pointer"
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
