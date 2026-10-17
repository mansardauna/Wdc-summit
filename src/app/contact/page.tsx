"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
  Globe,
  Send,
  CheckCircle2,
  Calendar,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import { DEFAULT_CMS_CONTENT, SiteCMSContent } from "@/lib/default-data";
import { SiteShell } from "@/components/NavbarAndFooter";
import {
  SunThemeCard,
  SectionPillBadge,
} from "@/components/SunSummitDesign";

export default function ContactPage() {
  const [cms, setCms] = useState<SiteCMSContent>(DEFAULT_CMS_CONTENT);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    category: "Scholarship Programme ($16.99)",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [sentId, setSentId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/cms?scope=public", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (d?.cms) setCms(d.cms);
      })
      .catch(() => {});
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to send message.");
      } else {
        setSentId(data.contact?.id || "MSG-2027");
        setForm({
          fullName: "",
          email: "",
          phone: "",
          country: "",
          category: "Scholarship Programme ($16.99)",
          subject: "",
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
      <section className="px-5 sm:px-8 lg:px-14 py-12 sm:py-16">
        <div className="max-w-[1180px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <SectionPillBadge number="24/7" label="DELEGATE RELATIONS & SUPPORT" />
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1B2228] leading-[1.1] mb-4">
              Contact the World Disaster Center Summit Desk
            </h1>
            <p className="text-sm sm:text-base text-[#54626F]">
              Have questions about scholarship eligibility, group university delegations, visa invitation letters, or institutional partnerships for Cape Town 2027? Reach out to our team below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 5 Columns: SunSummit Styled Contact Info Cards */}
            <div className="lg:col-span-5 space-y-5">
              <SunThemeCard theme="ice" watermarkPosition="bottom-right">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-[#1B2228] shrink-0 shadow-2xs">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-[#54626F]">
                      OFFICIAL EMAIL DESK
                    </div>
                    <h3 className="text-lg font-bold text-[#1B2228] mt-0.5">
                      {cms.settings.contactEmail}
                    </h3>
                    <p className="text-xs text-[#4A5864] mt-1">
                      Admissions, scholarships, and visa letter verification.
                    </p>
                  </div>
                </div>
              </SunThemeCard>

              <SunThemeCard theme="powder" watermarkPosition="bottom-right">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-[#1B2228] shrink-0 shadow-2xs">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-[#2C3740]">
                      2027 HOST CITY
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

            {/* Right 7 Columns: Working Contact Form */}
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
                    Message Received by the Summit Secretariat
                  </h2>
                  <p className="text-sm text-[#54626F] max-w-md mx-auto">
                    Thank you for contacting the World Disaster Center Youth Leader Summit 2027 team. Your inquiry has been delivered to our CMS Inbox and we will respond to your email shortly.
                  </p>
                  <div className="pt-3 flex justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSentId("")}
                      className="rounded-full bg-[#1B2228] text-white px-6 py-2.5 text-xs font-semibold"
                    >
                      Send Another Message
                    </button>
                    <Link
                      href="/"
                      className="rounded-full border border-slate-300 px-6 py-2.5 text-xs font-medium text-[#1B2228]"
                    >
                      Back to Home
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#1B2228] mb-1">
                    Send a Direct Message
                  </h2>
                  <p className="text-xs text-[#54626F] mb-4">
                    All messages go directly to our Delegate Relations team and can be managed in the CMS.
                  </p>

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
                        Email Address *
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-category" className="block text-xs font-semibold text-[#1B2228] mb-1">
                        Inquiry Topic
                      </label>
                      <select
                        id="contact-category"
                        value={form.category}
                        onChange={(e) =>
                          setForm({ ...form, category: e.target.value })
                        }
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#1B2228] focus-visible:ring-2 focus-visible:ring-[#1B2228]"
                      >
                        <option value="Scholarship Programme ($16.99)">
                          Scholarship Programme ($16.99)
                        </option>
                        <option value="Paid Delegate Packages ($749 / $349)">
                          Paid Delegate Packages ($749 / $349)
                        </option>
                        <option value="Visa Invitation Letter Support">
                          Visa Invitation Letter Support
                        </option>
                        <option value="20 Delegate Speaker Slots">
                          20 Delegate Speaker Slots
                        </option>
                        <option value="Partnership & Sponsorship">
                          Partnership & University Delegation
                        </option>
                        <option value="General Inquiry">General Inquiry</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="contact-subject" className="block text-xs font-semibold text-[#1B2228] mb-1">
                        Subject Line
                      </label>
                      <input
                        id="contact-subject"
                        type="text"
                        placeholder="Brief subject of your message"
                        value={form.subject}
                        onChange={(e) =>
                          setForm({ ...form, subject: e.target.value })
                        }
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-[#1B2228] focus-visible:ring-2 focus-visible:ring-[#1B2228]"
                      />
                    </div>
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
                      placeholder="How can the World Disaster Center Youth Leader Summit team assist you?"
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

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#FCE46D] hover:bg-[#F7D742] text-[#1B2228] font-bold py-4 px-8 text-sm shadow-sm transition-all disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2228] focus-visible:ring-offset-2"
                  >
                    <Send className="w-4 h-4" aria-hidden="true" />
                    <span>
                      {submitting ? "Sending Inquiry..." : "Send Message to WDC Team"}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
