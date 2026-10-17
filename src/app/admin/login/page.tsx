"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, ArrowRight, ShieldCheck, ArrowLeft } from "lucide-react";
import { WdcBrandLogo } from "@/components/SunSummitDesign";
import GlobalTelemetryHeroMap from "@/components/GlobalTelemetryHeroMap";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@worlddisastercenter.org");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/auth", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (d?.authenticated) {
          router.replace("/admin");
        }
      })
      .catch(() => {});
  }, [router]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Invalid credentials.");
      } else {
        router.push("/admin");
      }
    } catch {
      setError("Network error while signing in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen w-full bg-[#061322] flex flex-col justify-center items-center p-5 overflow-hidden">
      {/* Telemetry Map Background */}
      <GlobalTelemetryHeroMap />

      <div className="relative z-20 w-full max-w-md">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-300 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Summit Website</span>
          </Link>
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#FCE46D]">
            RESTRICTED PORTAL
          </span>
        </div>

        <div className="bg-white rounded-[28px] p-8 sm:p-10 shadow-2xl border border-white/20">
          <div className="mb-7">
            <WdcBrandLogo
              theme="dark"
              showBadge={false}
            />
            <h1 className="text-2xl font-extrabold text-[#1B2228] mt-5">
              CMS Administrator Sign In
            </h1>
            <p className="text-xs text-[#54626F] mt-1">
              Sign in to manage World Disaster Center Youth Leader Summit 2027 content, applications, leads, and payments.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#1B2228] mb-1.5">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@worlddisastercenter.org"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#1B2228]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1B2228] mb-1.5">
                Admin Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#1B2228]"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-xs text-red-700 font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#FCE46D] hover:bg-[#F7D742] text-[#1B2228] font-bold py-3.5 px-6 text-sm shadow-sm transition-all disabled:opacity-50"
            >
              <span>{loading ? "Authenticating..." : "Sign In to CMS"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Credentials Helper */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-[#54626F]">
            <div>
              <div className="font-semibold text-[#1B2228]">Default Admin Access:</div>
              <div className="font-mono text-[11px]">
                Pass: <strong>admin2027</strong>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setEmail("admin@worlddisastercenter.org");
                setPassword("admin2027");
              }}
              className="rounded-full bg-[#E4EFF7] hover:bg-[#D0E4F2] text-[#1B2228] px-3.5 py-1.5 text-xs font-semibold transition"
            >
              Auto-fill Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
