"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Check,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CreditCard,
  Mic,
  FileText,
  UserCheck,
} from "lucide-react";
import {
  DEFAULT_CMS_CONTENT,
  SiteCMSContent,
  ApplicationRecord,
} from "@/lib/default-data";
import { SiteShell } from "@/components/NavbarAndFooter";
import {
  SunThemeCard,
  SectionPillBadge,
} from "@/components/SunSummitDesign";

function ApplyPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const preselectedPkg = searchParams.get("package") || "pkg-scholarship-app";

  const [cms, setCms] = useState<SiteCMSContent>(DEFAULT_CMS_CONTENT);
  const [selectedPackageId, setSelectedPackageId] = useState(preselectedPkg);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    nationality: "",
    countryOfResidence: "",
    age: "23",
    dateOfBirth: "2003-05-15",
    categoryProfile: "BA / BSc Undergraduate",
    organizationOrUniversity: "",
    scholarshipPreference: "Fully Funded (Everything Covered)",
    speakerSlotInterest: true,
    speakerTopic: "",
    motivationStatement: "",
    declarationInterest: "Climate Resilience & Early Warning Policy",
    dietaryOrAccessibility: "",
    referralSource: "World Disaster Center Website",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submittedApp, setSubmittedApp] = useState<ApplicationRecord | null>(null);

  useEffect(() => {
    fetch("/api/cms?scope=public", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (d?.cms) setCms(d.cms);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (preselectedPkg) {
      setSelectedPackageId(preselectedPkg);
    }
  }, [preselectedPkg]);

  const activePackages = cms.packages.filter((p) => p.active);
  const currentPackage =
    activePackages.find((p) => p.id === selectedPackageId || p.slug === selectedPackageId) ||
    activePackages[0];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          packageId: currentPackage.id,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to submit application.");
      } else {
        setSubmittedApp(data.application);
      }
    } catch {
      setError("Network error while saving application.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <SiteShell cms={cms}>
      <section className="px-5 sm:px-8 lg:px-14 py-12 sm:py-16">
        <div className="max-w-[1180px] mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <SectionPillBadge
              number="2027"
              label="DELEGATE & SCHOLARSHIP APPLICATION PORTAL"
            />
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1B2228] leading-[1.1] mb-4">
              Apply for the Youth Leader Summit in Cape Town
            </h1>
            <p className="text-sm sm:text-base text-[#54626F]">
              10–14 October 2027 · Ages 18–30 · All Nationalities. One application considers you for Fully Funded, Partially Funded, and Funded Forum Access scholarships, or you can book a direct Self-Funded package.
            </p>
          </div>

          {submittedApp ? (
            <SunThemeCard
              theme="white"
              watermarkPosition="bottom-right"
              className="max-w-3xl mx-auto p-8 sm:p-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#FCE46D] text-[#1B2228] flex items-center justify-center font-bold">
                  <Check className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#54626F]">
                    APPLICATION RECORDED · ID #{submittedApp.id}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#1B2228]">
                    Step 1 Complete, {submittedApp.fullName}!
                  </h2>
                </div>
              </div>

              <p className="text-sm sm:text-base text-[#4A5864] leading-relaxed mb-6">
                Your delegate profile and motivation statement have been saved in the World Disaster Center admissions system. To finalize your{" "}
                <strong className="text-[#1B2228]">{submittedApp.packageName}</strong>{" "}
                submission, please complete the{" "}
                <strong className="text-[#1B2228]">${submittedApp.amount} USD</strong>{" "}
                payment via Paystack or Flutterwave.
              </p>

              <div className="rounded-2xl bg-[#F4F8FB] border border-[#DCEAF4] p-5 mb-7 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <div className="text-[#54626F]">Application Reference</div>
                  <div className="font-mono font-bold text-sm text-[#1B2228] mt-0.5">
                    {submittedApp.id}
                  </div>
                </div>
                <div>
                  <div className="text-[#54626F]">Selected Category</div>
                  <div className="font-bold text-sm text-[#1B2228] mt-0.5">
                    {submittedApp.packageName}
                  </div>
                </div>
                <div>
                  <div className="text-[#54626F]">Amount Due</div>
                  <div className="font-bold text-lg text-[#1B2228] mt-0.5">
                    ${submittedApp.amount} USD
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() =>
                    router.push(
                      `/payment?applicationId=${submittedApp.id}&package=${
                        submittedApp.packageId
                      }&name=${encodeURIComponent(
                        submittedApp.fullName
                      )}&email=${encodeURIComponent(
                        submittedApp.email
                      )}&phone=${encodeURIComponent(
                        submittedApp.phone || ""
                      )}&country=${encodeURIComponent(submittedApp.nationality)}`
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-full bg-[#FCE46D] hover:bg-[#F7D742] text-[#1B2228] font-bold px-8 py-4 text-sm shadow-sm transition-all"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Proceed to Payment (${submittedApp.amount} USD)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <Link
                  href="/"
                  className="inline-flex items-center rounded-full border border-slate-300 px-6 py-3.5 text-xs sm:text-sm font-medium text-[#1B2228] hover:bg-slate-100"
                >
                  Return to Homepage
                </Link>
              </div>
            </SunThemeCard>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left 8 Columns: Full Application Form */}
              <div className="lg:col-span-8 bg-white rounded-[28px] p-6 sm:p-10 shadow-card border border-slate-200/70">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* 1. Track / Package Selection */}
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#455664] mb-3">
                      <Sparkles className="w-4 h-4" />
                      <span>01 · Select Your Participation Track</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activePackages.map((pkg) => {
                        const isSelected = currentPackage.id === pkg.id;
                        return (
                          <button
                            key={pkg.id}
                            type="button"
                            onClick={() => setSelectedPackageId(pkg.id)}
                            className={`text-left rounded-2xl p-4 border transition-all ${
                              isSelected
                                ? "bg-[#E4EFF7] border-[#1B2228] ring-1 ring-[#1B2228]"
                                : "bg-[#F8FAFC] border-slate-200 hover:bg-[#EEF5FA]"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span className="font-bold text-sm text-[#1B2228]">
                                {pkg.name}
                              </span>
                              <span className="font-extrabold text-sm text-[#1B2228] bg-[#FCE46D] px-2.5 py-0.5 rounded-full">
                                ${pkg.price}
                              </span>
                            </div>
                            <p className="text-[11px] text-[#54626F]">
                              {pkg.subtitle}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. Personal Information */}
                  <div className="pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#455664] mb-4">
                      <UserCheck className="w-4 h-4" />
                      <span>02 · Delegate Personal Details</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#1B2228] mb-1.5">
                          Full Name (as on Passport) *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Amara Okafor"
                          value={form.fullName}
                          onChange={(e) =>
                            setForm({ ...form, fullName: e.target.value })
                          }
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-[#1B2228]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#1B2228] mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="delegate@example.com"
                          value={form.email}
                          onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                          }
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-[#1B2228]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#1B2228] mb-1.5">
                          Phone / WhatsApp Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+27 82 555 0149"
                          value={form.phone}
                          onChange={(e) =>
                            setForm({ ...form, phone: e.target.value })
                          }
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-[#1B2228]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#1B2228] mb-1.5">
                          Nationality *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. South Africa, Nigeria, Kenya, UK..."
                          value={form.nationality}
                          onChange={(e) =>
                            setForm({ ...form, nationality: e.target.value })
                          }
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-[#1B2228]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#1B2228] mb-1.5">
                          Country of Residence *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Current country of residence"
                          value={form.countryOfResidence}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              countryOfResidence: e.target.value,
                            })
                          }
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-[#1B2228]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-[#1B2228] mb-1.5">
                            Age (18–30) *
                          </label>
                          <input
                            type="number"
                            min={18}
                            max={35}
                            required
                            value={form.age}
                            onChange={(e) =>
                              setForm({ ...form, age: e.target.value })
                            }
                            className="w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm focus:outline-none focus:border-[#1B2228]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[#1B2228] mb-1.5">
                            Date of Birth
                          </label>
                          <input
                            type="date"
                            value={form.dateOfBirth}
                            onChange={(e) =>
                              setForm({ ...form, dateOfBirth: e.target.value })
                            }
                            className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm focus:outline-none focus:border-[#1B2228]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 3. Academic / Career Profile & Speaker Slot */}
                  <div className="pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#455664] mb-4">
                      <Mic className="w-4 h-4" />
                      <span>03 · Background & 20 Delegate Speaker Slots</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#1B2228] mb-1.5">
                          Applicant Profile Category *
                        </label>
                        <select
                          value={form.categoryProfile}
                          onChange={(e) =>
                            setForm({ ...form, categoryProfile: e.target.value })
                          }
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#1B2228]"
                        >
                          <option value="BA / BSc Undergraduate">
                            BA / BSc — Undergraduate Student
                          </option>
                          <option value="MA / MSc Graduate">
                            MA / MSc — Graduate / Postgraduate
                          </option>
                          <option value="SDGs / Sustainability Enthusiast">
                            SDGs — Sustainable Development Enthusiast
                          </option>
                          <option value="Next / Career Switcher">
                            Next — Career Switcher into Climate/Humanitarian
                          </option>
                          <option value="Early-Career Professional">
                            Early-Career Resilience Leader (Ages 18–30)
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#1B2228] mb-1.5">
                          University / Organization / Community Initiative
                        </label>
                        <input
                          type="text"
                          placeholder="Where do you study or work?"
                          value={form.organizationOrUniversity}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              organizationOrUniversity: e.target.value,
                            })
                          }
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-[#1B2228]"
                        />
                      </div>
                    </div>

                    <div className="rounded-2xl bg-[#F4F8FB] border border-[#DCEAF4] p-4 space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={form.speakerSlotInterest}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              speakerSlotInterest: e.target.checked,
                            })
                          }
                          className="w-4 h-4 rounded text-[#1B2228]"
                        />
                        <span className="text-xs sm:text-sm font-semibold text-[#1B2228]">
                          Consider me for one of the 20 Delegate Speaker Slots on Day 04
                        </span>
                      </label>

                      {form.speakerSlotInterest && (
                        <div>
                          <label className="block text-xs font-medium text-[#54626F] mb-1">
                            Proposed 5-Minute Delegate Stage Topic (Optional)
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Youth-Led Flood Forecasting & Community Preparedness"
                            value={form.speakerTopic}
                            onChange={(e) =>
                              setForm({ ...form, speakerTopic: e.target.value })
                            }
                            className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#1B2228]"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 4. Motivation & Declaration Focus */}
                  <div className="pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#455664] mb-4">
                      <FileText className="w-4 h-4" />
                      <span>04 · Motivation & Declaration Contribution</span>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#1B2228] mb-1.5">
                          Which of the Six Pillars of Resilience interests you most for drafting the Declaration?
                        </label>
                        <select
                          value={form.declarationInterest}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              declarationInterest: e.target.value,
                            })
                          }
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm bg-white focus:outline-none focus:border-[#1B2228]"
                        >
                          <option value="01 · Climate Resilience">
                            01 · Climate Resilience
                          </option>
                          <option value="02 · Leadership for Resilient Futures">
                            02 · Leadership for Resilient Futures
                          </option>
                          <option value="03 · Disaster Prediction & Early Warning">
                            03 · Disaster Prediction & Early Warning
                          </option>
                          <option value="04 · Resilience in Conflict Zones">
                            04 · Resilience in Conflict Zones
                          </option>
                          <option value="05 · Humanitarian Response & Recovery">
                            05 · Humanitarian Response & Recovery
                          </option>
                          <option value="06 · Environmental Protection & Policy">
                            06 · Environmental Protection & Policy
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#1B2228] mb-1.5">
                          Why should you represent your community at the 2027 Summit in Cape Town? *
                        </label>
                        <textarea
                          rows={4}
                          required
                          placeholder="Share your passion for climate resilience, disaster readiness, or sustainable development..."
                          value={form.motivationStatement}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              motivationStatement: e.target.value,
                            })
                          }
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-[#1B2228]"
                        />
                      </div>
                    </div>
                  </div>

                  {error && (
                    <div className="rounded-xl bg-red-50 border border-red-200 p-3.5 text-xs text-red-700 font-medium">
                      {error}
                    </div>
                  )}

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <p className="text-xs text-[#54626F] max-w-md">
                      By submitting, your application is logged in our admissions portal and you will be directed to complete your{" "}
                      <strong>${currentPackage.price} USD</strong> fee via Paystack or Flutterwave.
                    </p>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-[#FCE46D] hover:bg-[#F7D742] text-[#1B2228] font-bold px-8 py-4 text-sm shadow-sm transition-all disabled:opacity-50"
                    >
                      <span>
                        {submitting
                          ? "Saving Application..."
                          : `Save & Continue to Payment ($${currentPackage.price})`}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>

              {/* Right 4 Columns: Summary Card */}
              <div className="lg:col-span-4 space-y-6 sticky top-24">
                <SunThemeCard theme="slate" watermarkPosition="bottom-right">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#FCE46D] mb-2">
                    SELECTED PACKAGE
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {currentPackage.name}
                  </h3>
                  <p className="text-xs text-slate-300 mb-4">
                    {currentPackage.subtitle}
                  </p>
                  <div className="text-4xl font-extrabold text-[#FCE46D] mb-5">
                    ${currentPackage.price}{" "}
                    <span className="text-xs font-normal text-slate-300">
                      {currentPackage.currency}
                    </span>
                  </div>

                  <ul className="space-y-2.5 border-t border-white/15 pt-4 mb-6">
                    {currentPackage.features.map((f, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs text-slate-200"
                      >
                        <Check className="w-3.5 h-3.5 text-[#FCE46D] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="rounded-xl bg-white/10 p-3.5 text-[11px] text-slate-200 leading-relaxed">
                    <ShieldCheck className="w-4 h-4 text-[#FCE46D] inline mr-1.5" />
                    Instant online checkout powered by{" "}
                    <strong>Paystack</strong> & <strong>Flutterwave</strong>.
                  </div>
                </SunThemeCard>
              </div>
            </div>
          )}
        </div>
      </section>
    </SiteShell>
  );
}

export default function ApplyPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center">Loading Application Portal...</div>}>
      <ApplyPageContent />
    </Suspense>
  );
}
