"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Check,
  ShieldCheck,
  CreditCard,
  Lock,
  ArrowRight,
  CheckCircle2,
  Printer,
  Smartphone,
  Building2,
  X,
  Sparkles,
} from "lucide-react";
import {
  DEFAULT_CMS_CONTENT,
  SiteCMSContent,
  PaymentRecord,
} from "@/lib/default-data";
import { SiteShell } from "@/components/NavbarAndFooter";
import {
  SunThemeCard,
  SectionPillBadge,
} from "@/components/SunSummitDesign";

function PaymentPageContent() {
  const searchParams = useSearchParams();
  const initialPkg = searchParams.get("package") || "pkg-scholarship-app";
  const initialAppId = searchParams.get("applicationId") || "";
  const verifyRef = searchParams.get("verify") || "";

  const [cms, setCms] = useState<SiteCMSContent>(DEFAULT_CMS_CONTENT);
  const [selectedPkgId, setSelectedPkgId] = useState(initialPkg);
  const [gateway, setGateway] = useState<"paystack" | "flutterwave">("paystack");

  const [customer, setCustomer] = useState({
    name: searchParams.get("name") || "",
    email: searchParams.get("email") || "",
    phone: searchParams.get("phone") || "",
    country: searchParams.get("country") || "",
    applicationId: initialAppId,
  });

  const [initializing, setInitializing] = useState(false);
  const [error, setError] = useState("");

  // Interactive Paystack / Flutterwave Gateway Modal state
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [activePayment, setActivePayment] = useState<PaymentRecord | null>(null);
  const [paymentMethodTab, setPaymentMethodTab] = useState<"card" | "bank" | "mobile">("card");
  const [verifying, setVerifying] = useState(false);
  const [completedReceipt, setCompletedReceipt] = useState<PaymentRecord | null>(null);

  useEffect(() => {
    fetch("/api/cms?scope=public", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (d?.cms) {
          setCms(d.cms);
          if (d.cms.settings.defaultGateway) {
            setGateway(d.cms.settings.defaultGateway);
          }
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (initialPkg) setSelectedPkgId(initialPkg);
  }, [initialPkg]);

  // Auto-verify if returning from a live Paystack/Flutterwave redirect callback
  useEffect(() => {
    if (verifyRef) {
      handleVerifyPayment(verifyRef, "Verified via Live Gateway Callback");
    }
  }, [verifyRef]);

  const packages = cms.packages.filter((p) => p.active);
  const selectedPackage =
    packages.find((p) => p.id === selectedPkgId || p.slug === selectedPkgId) ||
    packages[0];

  async function handleStartCheckout(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setInitializing(true);
    try {
      const res = await fetch("/api/payments/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicationId: customer.applicationId || undefined,
          packageId: selectedPackage.id,
          customerName: customer.name,
          customerEmail: customer.email,
          customerPhone: customer.phone,
          country: customer.country,
          gateway,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not initialize payment.");
      } else if (data.mode === "live_redirect" && data.authorizationUrl) {
        window.location.href = data.authorizationUrl;
      } else {
        setActivePayment(data.payment);
        setCheckoutModalOpen(true);
      }
    } catch {
      setError("Network error while initializing payment.");
    } finally {
      setInitializing(false);
    }
  }

  async function handleVerifyPayment(reference: string, note?: string) {
    setVerifying(true);
    try {
      const res = await fetch("/api/payments/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reference,
          gatewayResponse:
            note ||
            `Approved via ${gateway.toUpperCase()} (${paymentMethodTab.toUpperCase()})`,
        }),
      });
      const data = await res.json();
      if (res.ok && data.payment) {
        setCompletedReceipt(data.payment);
        setCheckoutModalOpen(false);
      } else {
        setError(data.error || "Payment verification failed.");
      }
    } catch {
      setError("Error verifying transaction.");
    } finally {
      setVerifying(false);
    }
  }

  return (
    <SiteShell cms={cms}>
      <section className="px-5 sm:px-8 lg:px-14 py-12 sm:py-16">
        <div className="max-w-[1180px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <SectionPillBadge
              number="USD"
              label="OFFICIAL DELEGATE PAYMENT & CHECKOUT PORTAL"
            />
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1B2228] leading-[1.1] mb-3">
              Secure Your Seat & Scholarship Application
            </h1>
            <p className="text-sm sm:text-base text-[#54626F]">
              All fees are quoted in United States Dollars (USD) and processed securely via{" "}
              <strong className="text-[#1B2228]">Paystack</strong> or{" "}
              <strong className="text-[#1B2228]">Flutterwave</strong>.
            </p>
          </div>

          {completedReceipt ? (
            /* ===============================================================
               OFFICIAL PAYMENT RECEIPT VIEW
               =============================================================== */
            <SunThemeCard
              theme="white"
              watermarkPosition="bottom-right"
              className="max-w-3xl mx-auto p-8 sm:p-12"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-full bg-[#FCE46D] text-[#1B2228] flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-emerald-700 font-bold">
                      PAYMENT VERIFIED · {completedReceipt.gateway.toUpperCase()}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#1B2228]">
                      Official Summit Receipt
                    </h2>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 hover:bg-slate-100 px-4 py-2 text-xs font-semibold text-[#1B2228]"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-7 bg-[#F4F8FB] rounded-2xl p-6 border border-[#DCEAF4] text-xs sm:text-sm">
                <div>
                  <div className="text-slate-500 text-xs">Transaction Reference</div>
                  <div className="font-mono font-bold text-[#1B2228] mt-0.5">
                    {completedReceipt.reference}
                  </div>
                </div>
                <div>
                  <div className="text-slate-500 text-xs">Payment Status</div>
                  <div className="font-bold text-emerald-700 mt-0.5">
                    PAID & CONFIRMED
                  </div>
                </div>
                <div>
                  <div className="text-slate-500 text-xs">Delegate Name</div>
                  <div className="font-bold text-[#1B2228] mt-0.5">
                    {completedReceipt.customerName}
                  </div>
                </div>
                <div>
                  <div className="text-slate-500 text-xs">Email Address</div>
                  <div className="font-medium text-[#1B2228] mt-0.5">
                    {completedReceipt.customerEmail}
                  </div>
                </div>
                <div>
                  <div className="text-slate-500 text-xs">Package / Category</div>
                  <div className="font-bold text-[#1B2228] mt-0.5">
                    {completedReceipt.packageName}
                  </div>
                </div>
                <div>
                  <div className="text-slate-500 text-xs">Amount Paid</div>
                  <div className="text-xl font-extrabold text-[#1B2228] mt-0.5">
                    ${completedReceipt.amount} {completedReceipt.currency}
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#4A5864] leading-relaxed mb-7">
                Thank you for completing your payment for the{" "}
                <strong>World Disaster Center Youth Leader Summit 2027</strong>{" "}
                (10–14 October 2027, Cape Town, South Africa). Your transaction has been recorded in our central admissions and finance portal.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/"
                  className="rounded-full bg-[#1B2228] text-white px-7 py-3 text-xs sm:text-sm font-semibold"
                >
                  Back to Summit Homepage
                </Link>
                <button
                  type="button"
                  onClick={() => setCompletedReceipt(null)}
                  className="rounded-full border border-slate-300 px-6 py-3 text-xs sm:text-sm font-medium text-[#1B2228]"
                >
                  Make Another Payment
                </button>
              </div>
            </SunThemeCard>
          ) : (
            /* ===============================================================
               MAIN CHECKOUT FORM & PACKAGE SELECTOR
               =============================================================== */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left 7 Columns: Package Selector + Payer Form */}
              <div className="lg:col-span-7 bg-white rounded-[28px] p-6 sm:p-10 shadow-card border border-slate-200/70">
                <form onSubmit={handleStartCheckout} className="space-y-7">
                  {/* Step 1: Select Package */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#455664] mb-3">
                      01 · Choose Package or Fee Category
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {packages.map((pkg) => {
                        const active = selectedPackage.id === pkg.id;
                        return (
                          <button
                            key={pkg.id}
                            type="button"
                            onClick={() => setSelectedPkgId(pkg.id)}
                            className={`text-left rounded-2xl p-4 border transition-all ${
                              active
                                ? "bg-[#E4EFF7] border-[#1B2228] ring-1 ring-[#1B2228]"
                                : "bg-slate-50/80 border-slate-200 hover:bg-[#F4F8FB]"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <span className="font-bold text-xs sm:text-sm text-[#1B2228]">
                                {pkg.name}
                              </span>
                              <span className="font-extrabold text-sm bg-[#FCE46D] text-[#1B2228] px-2.5 py-0.5 rounded-full">
                                ${pkg.price}
                              </span>
                            </div>
                            <div className="text-[11px] text-[#54626F]">
                              {pkg.subtitle}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2: Delegate / Payer Details */}
                  <div className="pt-4 border-t border-slate-100">
                    <div className="text-xs font-mono uppercase tracking-wider text-[#455664] mb-3">
                      02 · Delegate Billing Details
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="pay-name" className="block text-xs font-semibold text-[#1B2228] mb-1">
                          Full Name *
                        </label>
                        <input
                          id="pay-name"
                          type="text"
                          required
                          aria-required="true"
                          autoComplete="name"
                          placeholder="Amara Okafor"
                          value={customer.name}
                          onChange={(e) =>
                            setCustomer({ ...customer, name: e.target.value })
                          }
                          className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#1B2228] focus-visible:ring-2 focus-visible:ring-[#1B2228]"
                        />
                      </div>

                      <div>
                        <label htmlFor="pay-email" className="block text-xs font-semibold text-[#1B2228] mb-1">
                          Email Address (for Receipt) *
                        </label>
                        <input
                          id="pay-email"
                          type="email"
                          required
                          aria-required="true"
                          autoComplete="email"
                          placeholder="you@example.com"
                          value={customer.email}
                          onChange={(e) =>
                            setCustomer({ ...customer, email: e.target.value })
                          }
                          className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#1B2228] focus-visible:ring-2 focus-visible:ring-[#1B2228]"
                        />
                      </div>

                      <div>
                        <label htmlFor="pay-phone" className="block text-xs font-semibold text-[#1B2228] mb-1">
                          Phone Number
                        </label>
                        <input
                          id="pay-phone"
                          type="tel"
                          autoComplete="tel"
                          placeholder="+27 82 555 0149"
                          value={customer.phone}
                          onChange={(e) =>
                            setCustomer({ ...customer, phone: e.target.value })
                          }
                          className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#1B2228] focus-visible:ring-2 focus-visible:ring-[#1B2228]"
                        />
                      </div>

                      <div>
                        <label htmlFor="pay-country" className="block text-xs font-semibold text-[#1B2228] mb-1">
                          Country
                        </label>
                        <input
                          id="pay-country"
                          type="text"
                          autoComplete="country-name"
                          placeholder="e.g. South Africa"
                          value={customer.country}
                          onChange={(e) =>
                            setCustomer({ ...customer, country: e.target.value })
                          }
                          className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#1B2228] focus-visible:ring-2 focus-visible:ring-[#1B2228]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Choose Gateway (Paystack vs Flutterwave) */}
                  <div className="pt-4 border-t border-slate-100">
                    <div className="text-xs font-mono uppercase tracking-wider text-[#455664] mb-3">
                      03 · Select Payment Gateway
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <button
                        type="button"
                        onClick={() => setGateway("paystack")}
                        className={`rounded-2xl p-4 border text-left transition-all flex items-center justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2228] ${
                          gateway === "paystack"
                            ? "bg-[#E4EFF7] border-[#1B2228] ring-1 ring-[#1B2228]"
                            : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <div>
                          <div className="font-bold text-sm text-[#1B2228] flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#00C3F7]" aria-hidden="true" />
                            <span>Paystack Checkout</span>
                          </div>
                          <div className="text-[11px] text-[#54626F] mt-0.5">
                            Cards, Bank Transfer, Apple Pay & USSD
                          </div>
                        </div>
                        <CreditCard className="w-5 h-5 text-[#1B2228]" aria-hidden="true" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setGateway("flutterwave")}
                        className={`rounded-2xl p-4 border text-left transition-all flex items-center justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2228] ${
                          gateway === "flutterwave"
                            ? "bg-[#E4EFF7] border-[#1B2228] ring-1 ring-[#1B2228]"
                            : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <div>
                          <div className="font-bold text-sm text-[#1B2228] flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#F5A623]" aria-hidden="true" />
                            <span>Flutterwave Checkout</span>
                          </div>
                          <div className="text-[11px] text-[#54626F] mt-0.5">
                            International Cards, Mobile Money & Bank
                          </div>
                        </div>
                        <CreditCard className="w-5 h-5 text-[#1B2228]" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div role="alert" aria-live="polite" className="rounded-xl bg-red-50 border border-red-200 p-3.5 text-xs text-red-700 font-medium">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={initializing}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#FCE46D] hover:bg-[#F7D742] text-[#1B2228] font-bold py-4 px-8 text-sm shadow-sm transition-all disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2228] focus-visible:ring-offset-2"
                  >
                    <Lock className="w-4 h-4" aria-hidden="true" />
                    <span>
                      {initializing
                        ? "Initializing Gateway..."
                        : `Pay $${selectedPackage.price} USD with ${
                            gateway === "paystack" ? "Paystack" : "Flutterwave"
                          }`}
                    </span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </form>
              </div>

              {/* Right 5 Columns: Order Summary */}
              <div className="lg:col-span-5 space-y-6">
                <SunThemeCard theme="slate" watermarkPosition="bottom-right">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#FCE46D]">
                      ORDER SUMMARY
                    </span>
                    <span className="text-xs font-mono text-slate-300">
                      CAPE TOWN 2027
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-1">
                    {selectedPackage.name}
                  </h3>
                  <p className="text-xs text-slate-300 mb-5">
                    {selectedPackage.subtitle}
                  </p>

                  <div className="rounded-2xl bg-white/10 border border-white/15 p-4 mb-5 flex items-baseline justify-between">
                    <span className="text-xs text-slate-200">Total Payable</span>
                    <span className="text-3xl font-extrabold text-[#FCE46D]">
                      ${selectedPackage.price}{" "}
                      <span className="text-xs font-normal text-white">USD</span>
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-white mb-2.5">
                    Included in this selection:
                  </div>
                  <ul className="space-y-2 mb-6">
                    {selectedPackage.features.map((feat, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs text-slate-200"
                      >
                        <Check className="w-3.5 h-3.5 text-[#FCE46D] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 border-t border-white/15 text-[11px] text-slate-300 space-y-1.5">
                    <p>
                      • Instant payment confirmation & official WDC receipt.
                    </p>
                    <p>
                      • Fees are non-refundable. Scholarships are awarded on merit.
                    </p>
                  </div>
                </SunThemeCard>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================================
          INTERACTIVE PAYSTACK / FLUTTERWAVE CHECKOUT MODAL
          Allows instant end-to-end payment completion and verification!
         ===================================================================== */}
      {checkoutModalOpen && activePayment && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            {/* Gateway Header */}
            <div
              className={`px-6 py-5 text-white flex items-center justify-between ${
                gateway === "paystack" ? "bg-[#091B2A]" : "bg-[#241B0B]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`w-3 h-3 rounded-full ${
                    gateway === "paystack" ? "bg-[#00C3F7]" : "bg-[#F5A623]"
                  }`}
                />
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider opacity-80">
                    {gateway === "paystack"
                      ? "PAYSTACK SECURE CHECKOUT"
                      : "FLUTTERWAVE SECURE CHECKOUT"}
                  </div>
                  <div className="text-xs text-slate-300 truncate max-w-[230px]">
                    {activePayment.customerEmail}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-extrabold text-[#FCE46D]">
                  ${activePayment.amount} USD
                </div>
                <button
                  type="button"
                  onClick={() => setCheckoutModalOpen(false)}
                  className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" /> Close
                </button>
              </div>
            </div>

            {/* Payment Method Tabs */}
            <div className="grid grid-cols-3 border-b border-slate-200 bg-slate-50 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setPaymentMethodTab("card")}
                className={`py-3 flex items-center justify-center gap-1.5 border-b-2 ${
                  paymentMethodTab === "card"
                    ? "border-[#1B2228] text-[#1B2228] bg-white"
                    : "border-transparent text-slate-500"
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Card</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethodTab("bank")}
                className={`py-3 flex items-center justify-center gap-1.5 border-b-2 ${
                  paymentMethodTab === "bank"
                    ? "border-[#1B2228] text-[#1B2228] bg-white"
                    : "border-transparent text-slate-500"
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Bank</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethodTab("mobile")}
                className={`py-3 flex items-center justify-center gap-1.5 border-b-2 ${
                  paymentMethodTab === "mobile"
                    ? "border-[#1B2228] text-[#1B2228] bg-white"
                    : "border-transparent text-slate-500"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile Money</span>
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4">
              <div className="rounded-xl bg-[#F4F8FB] border border-[#DCEAF4] p-3 text-xs text-[#2C3740]">
                <div className="font-semibold text-[#1B2228]">
                  {activePayment.packageName}
                </div>
                <div className="text-[11px] text-[#54626F] font-mono mt-0.5">
                  Ref: {activePayment.reference}
                </div>
              </div>

              {paymentMethodTab === "card" && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      defaultValue="4084 0840 8408 4081"
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Expiry
                      </label>
                      <input
                        type="text"
                        defaultValue="09 / 29"
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        defaultValue="408"
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethodTab === "bank" && (
                <div className="rounded-xl bg-slate-50 p-4 text-xs space-y-2 border border-slate-200">
                  <div className="font-semibold text-[#1B2228]">
                    Instant Bank Transfer Verification
                  </div>
                  <p className="text-slate-600">
                    Click the button below to confirm your transfer of{" "}
                    <strong>${activePayment.amount} USD</strong> for Reference{" "}
                    <span className="font-mono">{activePayment.reference}</span>.
                  </p>
                </div>
              )}

              {paymentMethodTab === "mobile" && (
                <div className="space-y-3">
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Mobile Money Number (M-Pesa / MTN / Airtel / Orange)
                  </label>
                  <input
                    type="tel"
                    defaultValue={activePayment.customerPhone || "+27 82 555 0149"}
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm"
                  />
                </div>
              )}

              <button
                type="button"
                disabled={verifying}
                onClick={() => handleVerifyPayment(activePayment.reference)}
                className="w-full rounded-full bg-[#1B2228] hover:bg-[#323E48] text-white font-bold py-3.5 px-6 text-sm transition-all disabled:opacity-50"
              >
                {verifying
                  ? "Verifying Transaction..."
                  : `Authorize & Pay $${activePayment.amount} USD`}
              </button>

              <div className="text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>256-bit SSL Encrypted · World Disaster Center</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </SiteShell>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center">Loading Payment Portal...</div>}>
      <PaymentPageContent />
    </Suspense>
  );
}
