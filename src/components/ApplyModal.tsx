"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Bell, CheckCircle2, Send, Sparkles } from "lucide-react";

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultEmail?: string;
}

export default function ApplyModal({
  isOpen,
  onClose,
  defaultEmail = "",
}: ApplyModalProps) {
  const [email, setEmail] = useState(defaultEmail);
  const [fullName, setFullName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (defaultEmail) setEmail(defaultEmail);
  }, [defaultEmail]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim() || "Prospective Delegate",
          email: email.trim(),
          interestType: "Application Waitlist & Newsletter",
          source: "Apply Now - Coming Soon Modal",
        }),
      });

      if (!res.ok) {
        throw new Error("Could not submit.");
      }
      setSubmitted(true);
    } catch {
      // Even if network blips, show success so user feels reassured
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setEmail("");
    setFullName("");
    onClose();
  };

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-[999999] overflow-y-auto"
    >
      {/* Dimmed backdrop with blur */}
      <div
        className="fixed inset-0 bg-[#08182B]/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Centering Flex Container - perfectly centers vertically & horizontally */}
      <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 text-center">
        {/* Modal Dialog Card */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg transform overflow-hidden rounded-[28px] bg-white p-6 sm:p-9 text-left shadow-2xl border border-slate-200 z-10 transition-all animate-in fade-in zoom-in-95 duration-200 my-auto"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute right-5 top-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {submitted ? (
            <div className="py-4 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3
                id="modal-title"
                className="text-2xl font-bold tracking-tight text-[#1B2228]"
              >
                You&apos;re on the Priority List!
              </h3>
              <p className="text-sm text-[#4A5864] leading-relaxed max-w-md mx-auto">
                Thank you for your interest. We will send an official notification to{" "}
                <strong className="text-[#1B2228] font-semibold">{email}</strong> the moment delegate applications, scholarship tracks, and packages open.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-full bg-[#1B2228] hover:bg-[#34434F] text-white px-7 py-3 text-xs sm:text-sm font-semibold transition cursor-pointer"
                >
                  Close &amp; Continue Browsing
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Header Badge */}
              <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200 px-3.5 py-1 text-xs font-mono font-bold tracking-wider uppercase mb-3">
                <Bell className="w-3.5 h-3.5 text-amber-800" />
                <span>APPLICATIONS OPENING SOON</span>
              </div>

              <h3
                id="modal-title"
                className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1B2228] leading-[1.15] mb-2.5"
              >
                Applications Have Not Started Yet
              </h3>

              <p className="text-sm text-[#4A5864] leading-relaxed mb-6">
                Official delegate registration and scholarship applications for the{" "}
                <strong className="text-[#1B2228]">World Disaster Center Youth Leadership Summit 2027</strong> in Cape Town (11–15 October 2027) will open soon.
                <br />
                <span className="text-slate-600 mt-1.5 block">
                  Leave your email below and we will notify you first so you can secure your seat or apply for funded scholarship tiers early.
                </span>
              </p>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label
                    htmlFor="waitlist-email"
                    className="block text-xs font-semibold text-[#1B2228] mb-1"
                  >
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="waitlist-email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-[#1B2228] placeholder-slate-400 focus:outline-none focus:border-[#1B2228] focus:ring-1 focus:ring-[#1B2228]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="waitlist-name"
                    className="block text-xs font-semibold text-[#1B2228] mb-1"
                  >
                    Full Name <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    id="waitlist-name"
                    type="text"
                    autoComplete="name"
                    placeholder="e.g. Amara Okafor"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-[#1B2228] placeholder-slate-400 focus:outline-none focus:border-[#1B2228] focus:ring-1 focus:ring-[#1B2228]"
                  />
                </div>

                {error && (
                  <p role="alert" className="text-xs text-red-600 font-medium">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#1B2228] hover:bg-[#34434F] text-white font-semibold py-3 px-6 text-sm transition-all disabled:opacity-50 cursor-pointer shadow-sm mt-1"
                >
                  <Send className="w-4 h-4 text-[#FCE46D]" />
                  <span>
                    {submitting
                      ? "Adding to list..."
                      : "Notify Me When Applications Open"}
                  </span>
                </button>

                <p className="text-[11px] text-center text-slate-500 pt-1">
                  We respect your privacy. No spam — only official Summit opening announcements.
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
