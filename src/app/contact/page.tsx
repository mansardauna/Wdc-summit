"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  ArrowRight,
  Copy,
  Check,
} from "lucide-react";
import { DEFAULT_CMS_CONTENT, SiteCMSContent } from "@/lib/default-data";
import { SiteShell } from "@/components/NavbarAndFooter";
import {
  SunThemeCard,
  SectionPillBadge,
} from "@/components/SunSummitDesign";

interface ContactDepartment {
  id: string;
  name: string;
  email: string;
  description: string;
  defaultSubject: string;
}

const CONTACT_DEPARTMENTS: ContactDepartment[] = [
  {
    id: "summit",
    name: "General Secretariat & Delegate Relations",
    email: "summit@worlddisastercenter.org",
    description: "General summit inquiries, admissions, delegate registration, and overall coordination.",
    defaultSubject: "General Inquiry - Summit Secretariat",
  },
  {
    id: "summitmanager",
    name: "Summit Manager & Operations",
    email: "summitmanager@worlddisastercenter.org",
    description: "Executive leadership, operational escalation, protocol, and high-level management.",
    defaultSubject: "Inquiry for Summit Management",
  },
  {
    id: "summitprogram",
    name: "Summit Program & Speaker Desk",
    email: "summitprogram@worlddisastercenter.org",
    description: "Agenda sessions, keynote proposals, 20 delegate speaker slots, and academic panels.",
    defaultSubject: "Program & Speaker Query",
  },
  {
    id: "summitexperience",
    name: "Summit Experience & Hospitality",
    email: "summitexperience@worlddisastercenter.org",
    description: "Delegate hospitality, cultural excursions, evening networking, and venue experience.",
    defaultSubject: "Summit Experience Inquiry",
  },
  {
    id: "travelcoordinator",
    name: "Travel Coordinator & Visa Support",
    email: "travelcoordinator@worlddisastercenter.org",
    description: "Official stamped visa invitation letters, embassy verification, flight, and hotel logistics.",
    defaultSubject: "Visa & Travel Assistance Request",
  },
  {
    id: "stakeholders",
    name: "Stakeholder Relations & Institutional Partners",
    email: "stakeholders@worlddisastercenter.org",
    description: "University delegations, government liaisons, NGO coalitions, and institutional sponsors.",
    defaultSubject: "Stakeholder & Partnership Inquiry",
  },
  {
    id: "marcomm",
    name: "Marketing & Communications (MarComm)",
    email: "marcomm@worlddisastercenter.org",
    description: "Global outreach campaigns, youth network communications, publications, and newsletters.",
    defaultSubject: "MarComm & Outreach Inquiry",
  },
  {
    id: "design",
    name: "Creative & Brand Design Studio",
    email: "design@worlddisastercenter.org",
    description: "Visual identity, summit stage branding, media assets, collateral, and print production.",
    defaultSubject: "Creative & Design Desk Inquiry",
  },
  {
    id: "procurement",
    name: "Procurement & Vendor Logistics",
    email: "procurement@worlddisastercenter.org",
    description: "Vendor proposals, RFP tenders, AV production equipment, catering, and service contracts.",
    defaultSubject: "Procurement & Vendor Proposal",
  },
  {
    id: "media",
    name: "Media, Press & Broadcast Desk",
    email: "media@worlddisastercenter.org",
    description: "Press passes, media interview requests, press releases, filming rights, and broadcast kits.",
    defaultSubject: "Press & Media Accreditation Inquiry",
  },
  {
    id: "summitauditor",
    name: "Summit Auditor & Compliance Desk",
    email: "summitauditor@worlddisastercenter.org",
    description: "Financial integrity, audit compliance, scholarship fund transparency, and governance.",
    defaultSubject: "Audit & Compliance Query",
  },
];

export default function ContactPage() {
  const [cms, setCms] = useState<SiteCMSContent>(DEFAULT_CMS_CONTENT);
  const [selectedEmail, setSelectedEmail] = useState<string>("summit@worlddisastercenter.org");
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    category: "General Secretariat & Delegate Relations",
    subject: "General Inquiry - Summit Secretariat",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [sentId, setSentId] = useState("");
  const [sentRecipientEmail, setSentRecipientEmail] = useState("");
  const [error, setError] = useState("");

  const currentDept =
    CONTACT_DEPARTMENTS.find((d) => d.email === selectedEmail) ||
    CONTACT_DEPARTMENTS[0];

  useEffect(() => {
    fetch("/api/cms?scope=public", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (d?.cms) setCms(d.cms);
      })
      .catch(() => {});

    // Check query params if user clicked a link with specific department or email target
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const toParam = params.get("to") || params.get("email") || params.get("dept");
      if (toParam) {
        const match = CONTACT_DEPARTMENTS.find(
          (d) =>
            d.email.toLowerCase() === toParam.toLowerCase() ||
            d.id.toLowerCase() === toParam.toLowerCase()
        );
        if (match) {
          setSelectedEmail(match.email);
          setForm((prev) => ({
            ...prev,
            category: match.name,
            subject: match.defaultSubject,
          }));
        }
      }
    }
  }, []);

  function handleDepartmentChange(email: string) {
    setSelectedEmail(email);
    const dept = CONTACT_DEPARTMENTS.find((d) => d.email === email);
    if (dept) {
      setForm((prev) => ({
        ...prev,
        category: dept.name,
        // Only update subject if it's empty or was a default subject
        subject:
          !prev.subject ||
          CONTACT_DEPARTMENTS.some((d) => d.defaultSubject === prev.subject)
            ? dept.defaultSubject
            : prev.subject,
      }));
    }
  }

  function handleCopyEmail(email: string) {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2500);
  }

  const mailtoHref = `mailto:${selectedEmail}?subject=${encodeURIComponent(
    form.subject || `Inquiry for ${currentDept.name}`
  )}&body=${encodeURIComponent(
    `Dear ${currentDept.name},\n\n${form.message || ""}\n\n---\nSender: ${form.fullName || ""}\nEmail: ${form.email || ""}\nPhone: ${form.phone || "N/A"}\nCountry: ${form.country || "N/A"}`
  )}`;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          recipientEmail: selectedEmail,
          category: currentDept.name,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to send message.");
      } else {
        const id = data.contact?.id || "MSG-2027";
        setSentId(id);
        setSentRecipientEmail(selectedEmail);
        setForm({
          fullName: "",
          email: "",
          phone: "",
          country: "",
          category: currentDept.name,
          subject: currentDept.defaultSubject,
          message: "",
        });
      }
    } catch {
      setError("Network error while sending message.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <SiteShell cms={cms}>
      {/* Page Header */}
      <section className="bg-[#0B1C2E] text-white py-16 sm:py-20 px-5 sm:px-8 lg:px-14 border-b border-white/10">
        <div className="max-w-[1240px] mx-auto">
          <SectionPillBadge
            number="DESK"
            label="SECRETARIAT & DEPARTMENT DIRECTORY"
            dark
          />
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight max-w-3xl leading-[1.08] mb-5">
            Contact the Summit Secretariat & Departments
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed mb-4">
            Direct your inquiry straight to the responsible desk for Cape Town 2027. Choose your department below to ensure your message is received and answered by the appropriate team.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-mono text-[#FCE46D]">
            <span>{selectedEmail}</span>
            <span>·</span>
            <span>Cape Town International Convention Precinct</span>
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-8 lg:px-14 py-12 sm:py-16">
        <div className="max-w-[1180px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 5 Columns: Dynamic Contact Info Cards & Directory */}
            <div className="lg:col-span-5 space-y-5">
              <SunThemeCard theme="ice" watermarkPosition="bottom-right">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-[#1B2228] shrink-0 shadow-2xs">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-mono uppercase tracking-wider text-[#54626F]">
                      SELECTED DEPARTMENT DESK
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#1B2228] mt-0.5 break-all">
                      {selectedEmail}
                    </h3>
                    <p className="text-xs text-[#4A5864] mt-1 font-medium">
                      {currentDept.name}
                    </p>
                    <p className="text-xs text-[#4A5864] mt-0.5">
                      {currentDept.description}
                    </p>
                    <div className="mt-3">
                      <button
                        type="button"
                        onClick={() => handleCopyEmail(selectedEmail)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-white/90 hover:bg-white text-[#1B2228] px-3 py-1.5 text-xs font-semibold border border-slate-200 shadow-2xs transition-colors"
                      >
                        {copiedEmail === selectedEmail ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700 font-bold">Address Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Email Address</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </SunThemeCard>

              {/* Department Directory Quick Selector */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-mono uppercase font-bold text-[#1B2228] tracking-wider">
                    All 11 Departmental Desks
                  </div>
                  <span className="text-[10px] font-mono text-[#54626F]">
                    Click to switch
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-1.5 max-h-[300px] overflow-y-auto pr-1">
                  {CONTACT_DEPARTMENTS.map((dept) => {
                    const isSelected = dept.email === selectedEmail;
                    return (
                      <button
                        key={dept.email}
                        type="button"
                        onClick={() => handleDepartmentChange(dept.email)}
                        className={`text-left p-2.5 rounded-xl transition-all border ${
                          isSelected
                            ? "bg-[#0B1C2E] text-white border-[#0B1C2E] shadow-2xs"
                            : "bg-slate-50 hover:bg-slate-100 text-[#1B2228] border-slate-200/80"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-bold truncate">
                            {dept.name}
                          </span>
                          {isSelected && (
                            <span className="text-[9px] font-mono uppercase bg-[#FCE46D] text-[#0B1C2E] px-1.5 py-0.5 rounded font-bold shrink-0">
                              Active
                            </span>
                          )}
                        </div>
                        <div
                          className={`text-[11px] font-mono truncate mt-0.5 ${
                            isSelected ? "text-[#FCE46D]" : "text-[#54626F]"
                          }`}
                        >
                          {dept.email}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <SunThemeCard theme="powder" watermarkPosition="bottom-right">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-[#1B2228] shrink-0 shadow-2xs">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-[#2C3740]">
                      2027 HOST CITY & VENUE
                    </div>
                    <h3 className="text-lg font-bold text-[#1B2228] mt-0.5">
                      {cms.settings.hostCity}
                    </h3>
                    <p className="text-xs text-[#2C3740] mt-1">
                      {cms.settings.officeAddress} · {cms.settings.datesText}
                    </p>
                  </div>
                </div>
              </SunThemeCard>

              <SunThemeCard theme="slate" watermarkPosition="bottom-right">
                <div className="space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#FCE46D]">
                    FAST-TRACK LINKS
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Need Immediate Registration or Visa Support?
                  </h3>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    Confirmed participants receive a stamped visa invitation letter, official confirmation letter, and embassy confirmation email.
                  </p>
                  <div className="flex flex-wrap gap-2.5 pt-2">
                    <Link
                      href="/apply"
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#FCE46D] text-[#1B2228] px-4 py-2 text-xs font-bold"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href="/payment?package=pkg-visa-letter"
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/30 text-white px-4 py-2 text-xs font-medium hover:bg-white/10"
                    >
                      <span>Visa Letter ($99)</span>
                    </Link>
                  </div>
                </div>
              </SunThemeCard>
            </div>

            {/* Right 7 Columns: Uplifted Contact Form */}
            <div className="lg:col-span-7 bg-white rounded-[28px] p-6 sm:p-10 shadow-card border border-slate-200/70">
              {sentId ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#FCE46D] text-[#1B2228] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div className="text-xs font-mono uppercase tracking-wider text-[#54626F]">
                    INQUIRY LOGGED · REF #{sentId}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#1B2228]">
                    Message Directed to {sentRecipientEmail || selectedEmail}
                  </h2>
                  <p className="text-sm text-[#54626F] max-w-md mx-auto">
                    Thank you for reaching out to the World Disaster Center Youth Leadership Summit team. Your message has been routed to{" "}
                    <strong className="text-[#1B2228]">{sentRecipientEmail || selectedEmail}</strong> and recorded in our CMS Inbox.
                  </p>
                  <div className="pt-3 flex flex-wrap justify-center gap-3">
                    <a
                      href={`mailto:${sentRecipientEmail || selectedEmail}?subject=${encodeURIComponent(form.subject || "WDC Summit Inquiry")}`}
                      className="inline-flex items-center gap-2 rounded-full bg-[#FCE46D] hover:bg-[#F7D742] text-[#1B2228] px-6 py-2.5 text-xs font-bold transition-all shadow-xs"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Open in Email App</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setSentId("")}
                      className="rounded-full bg-[#1B2228] hover:bg-[#34434F] text-white px-6 py-2.5 text-xs font-semibold transition-all"
                    >
                      Send Another Message
                    </button>
                    <Link
                      href="/"
                      className="rounded-full border border-slate-300 px-6 py-2.5 text-xs font-medium text-[#1B2228] hover:bg-slate-50 transition-all"
                    >
                      Back to Home
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-slate-100 pb-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#1B2228] mb-1">
                      Send a Direct Message
                    </h2>
                    <p className="text-xs text-[#54626F]">
                      Select the destination department desk below. The send button and dispatch target will update automatically so your message reaches the correct team.
                    </p>
                  </div>

                  {/* Department Selector */}
                  <div>
                    <label
                      htmlFor="contact-category"
                      className="block text-xs font-bold text-[#1B2228] mb-1.5"
                    >
                      Recipient Department / Query Desk *
                    </label>
                    <select
                      id="contact-category"
                      value={selectedEmail}
                      onChange={(e) => handleDepartmentChange(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm bg-white font-medium text-[#1B2228] focus:outline-none focus:border-[#1B2228] focus-visible:ring-2 focus-visible:ring-[#1B2228] shadow-2xs"
                    >
                      {CONTACT_DEPARTMENTS.map((dept) => (
                        <option key={dept.email} value={dept.email}>
                          {dept.name} ({dept.email})
                        </option>
                      ))}
                    </select>
                    {currentDept && (
                      <div className="mt-2 flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/70 text-xs text-[#4A5864]">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1 shrink-0" />
                        <div>
                          <strong className="text-[#1B2228] font-semibold">{currentDept.name}:</strong>{" "}
                          <span>{currentDept.description}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-fullname" className="block text-xs font-semibold text-[#1B2228] mb-1">
                        Your Full Name *
                      </label>
                      <input
                        id="contact-fullname"
                        type="text"
                        required
                        aria-required="true"
                        autoComplete="name"
                        placeholder="e.g. Chloé Dubois"
                        value={form.fullName}
                        onChange={(e) =>
                          setForm({ ...form, fullName: e.target.value })
                        }
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-[#1B2228] focus-visible:ring-2 focus-visible:ring-[#1B2228]"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-semibold text-[#1B2228] mb-1">
                        Your Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        aria-required="true"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-[#1B2228] focus-visible:ring-2 focus-visible:ring-[#1B2228]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-semibold text-[#1B2228] mb-1">
                        Phone / WhatsApp
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+27 21 555 0194"
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-[#1B2228] focus-visible:ring-2 focus-visible:ring-[#1B2228]"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-country" className="block text-xs font-semibold text-[#1B2228] mb-1">
                        Country
                      </label>
                      <input
                        id="contact-country"
                        type="text"
                        autoComplete="country-name"
                        placeholder="e.g. South Africa"
                        value={form.country}
                        onChange={(e) =>
                          setForm({ ...form, country: e.target.value })
                        }
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-[#1B2228] focus-visible:ring-2 focus-visible:ring-[#1B2228]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-semibold text-[#1B2228] mb-1">
                      Subject Line *
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      required
                      placeholder="Brief subject of your message"
                      value={form.subject}
                      onChange={(e) =>
                        setForm({ ...form, subject: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-[#1B2228] focus-visible:ring-2 focus-visible:ring-[#1B2228]"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-semibold text-[#1B2228] mb-1">
                      Your Message *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      required
                      aria-required="true"
                      placeholder={`How can the ${currentDept.name} team assist you?`}
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-[#1B2228] focus-visible:ring-2 focus-visible:ring-[#1B2228]"
                    />
                  </div>

                  {error && (
                    <p role="alert" aria-live="polite" className="text-xs text-red-600 font-medium">
                      {error}
                    </p>
                  )}

                  {/* Dynamic Send Button Populated with Target Department Email */}
                  <div className="space-y-3 pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#FCE46D] hover:bg-[#F7D742] text-[#1B2228] font-bold py-4 px-6 text-sm shadow-sm transition-all disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2228] focus-visible:ring-offset-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span className="truncate">
                        {submitting
                          ? `Dispatching to ${selectedEmail}...`
                          : `Send Message to ${selectedEmail}`}
                      </span>
                    </button>

                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#54626F] px-1">
                      <span>Prefer to email from your own client?</span>
                      <a
                        href={mailtoHref}
                        className="inline-flex items-center gap-1 font-semibold text-[#0B1C2E] hover:underline"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Open {selectedEmail} in Mail App</span>
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
