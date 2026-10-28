"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  CreditCard,
  Mail,
  FileEdit,
  Calendar,
  Package,
  HelpCircle,
  Settings,
  Save,
  Plus,
  Trash2,
  CheckCircle2,
  ExternalLink,
  RefreshCw,
  Download,
  Search,
  Database,
  LogOut,
} from "lucide-react";
import {
  FullDatabaseStore,
  INITIAL_STORE,
  SiteCMSContent,
  ApplicationRecord,
  LeadRecord,
  PaymentRecord,
  ContactRecord,
} from "@/lib/default-data";
import { WdcBrandLogo } from "@/components/SunSummitDesign";

type AdminTab =
  | "overview"
  | "applications"
  | "leads"
  | "payments"
  | "contacts"
  | "content"
  | "programme"
  | "packages"
  | "faqs_partners"
  | "settings";

export default function AdminCMSPage() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [store, setStore] = useState<FullDatabaseStore>(INITIAL_STORE);
  const [cms, setCms] = useState<SiteCMSContent>(INITIAL_STORE.cms);
  const [postgresConfigured, setPostgresConfigured] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");

  // Search / Filter states
  const [appFilter, setAppFilter] = useState("ALL");
  const [appSearch, setAppSearch] = useState("");
  const [selectedApp, setSelectedApp] = useState<ApplicationRecord | null>(null);

  async function loadStore() {
    setLoading(true);
    try {
      const res = await fetch("/api/cms", { cache: "no-store" });
      const data = await res.json();
      if (data?.cms) {
        setStore({
          cms: data.cms,
          applications: data.applications || [],
          leads: data.leads || [],
          payments: data.payments || [],
          contacts: data.contacts || [],
        });
        setCms(data.cms);
        setPostgresConfigured(Boolean(data.postgresConfigured));
      }
    } catch (e) {
      console.error("Failed to fetch store:", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetch("/api/auth", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (!d?.authenticated) {
          router.replace("/admin/login");
        } else {
          setAuthChecked(true);
          loadStore();
        }
      })
      .catch(() => {
        router.replace("/admin/login");
      });
  }, [router]);

  async function handleSignOut() {
    await fetch("/api/auth", { method: "DELETE" });
    router.replace("/admin/login");
  }

  function showNotification(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 3500);
  }

  async function handleSaveCMS() {
    setSaving(true);
    try {
      const res = await fetch("/api/cms", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update_cms",
          payload: cms,
        }),
      });
      if (res.ok) {
        showNotification("All CMS changes saved and published live!");
        await loadStore();
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdateApplication(
    id: string,
    updates: Partial<ApplicationRecord>
  ) {
    const res = await fetch("/api/cms", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "update_application",
        payload: { id, updates },
      }),
    });
    if (res.ok) {
      showNotification(`Application ${id} updated.`);
      await loadStore();
      if (selectedApp && selectedApp.id === id) {
        setSelectedApp({ ...selectedApp, ...updates });
      }
    }
  }

  async function handleUpdateLead(id: string, updates: Partial<LeadRecord>) {
    const res = await fetch("/api/cms", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "update_lead",
        payload: { id, updates },
      }),
    });
    if (res.ok) {
      showNotification(`Lead ${id} updated.`);
      await loadStore();
    }
  }

  async function handleUpdateContact(
    id: string,
    updates: Partial<ContactRecord>
  ) {
    const res = await fetch("/api/cms", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "update_contact",
        payload: { id, updates },
      }),
    });
    if (res.ok) {
      showNotification(`Message ${id} updated.`);
      await loadStore();
    }
  }

  async function handleUpdatePayment(
    id: string,
    updates: Partial<PaymentRecord>
  ) {
    const res = await fetch("/api/cms", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "update_payment",
        payload: { id, updates },
      }),
    });
    if (res.ok) {
      showNotification(`Payment ${id} updated.`);
      await loadStore();
    }
  }

  async function handleDeleteRecord(collection: string, id: string) {
    const res = await fetch("/api/cms", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "delete_record",
        payload: { collection, id },
      }),
    });
    if (res.ok) {
      showNotification(`Deleted ${id}.`);
      if (selectedApp?.id === id) setSelectedApp(null);
      await loadStore();
    }
  }

  function exportCSV(filename: string, rows: Record<string, unknown>[]) {
    if (!rows.length) return;
    const headers = Object.keys(rows[0]);
    const csv = [
      headers.join(","),
      ...rows.map((r) =>
        headers
          .map((h) => `"${String(r[h] ?? "").replace(/"/g, '""')}"`)
          .join(",")
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  }

  const totalRevenue = store.payments
    .filter((p) => p.status === "SUCCESS")
    .reduce((acc, p) => acc + Number(p.amount || 0), 0);

  const unreadContacts = store.contacts.filter((c) => c.status === "UNREAD").length;
  const filteredApps = store.applications.filter((a) => {
    const matchesStatus = appFilter === "ALL" || a.status === appFilter;
    const matchesSearch =
      !appSearch ||
      a.fullName.toLowerCase().includes(appSearch.toLowerCase()) ||
      a.email.toLowerCase().includes(appSearch.toLowerCase()) ||
      a.nationality.toLowerCase().includes(appSearch.toLowerCase()) ||
      a.id.toLowerCase().includes(appSearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const navItems: { id: AdminTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: "overview", label: "Dashboard Overview", icon: <LayoutDashboard className="w-4 h-4" /> },
    {
      id: "applications",
      label: "Applications",
      icon: <Users className="w-4 h-4" />,
      badge: store.applications.length,
    },
    {
      id: "leads",
      label: "Leads CRM",
      icon: <UserPlus className="w-4 h-4" />,
      badge: store.leads.length,
    },
    {
      id: "payments",
      label: "Payments & Gateways",
      icon: <CreditCard className="w-4 h-4" />,
      badge: store.payments.length,
    },
    {
      id: "contacts",
      label: "Contact Inbox",
      icon: <Mail className="w-4 h-4" />,
      badge: unreadContacts || undefined,
    },
    { id: "content", label: "Hero, About & Pillars", icon: <FileEdit className="w-4 h-4" /> },
    { id: "programme", label: "5-Day Programme", icon: <Calendar className="w-4 h-4" /> },
    { id: "packages", label: "Packages & Pricing", icon: <Package className="w-4 h-4" /> },
    { id: "faqs_partners", label: "Crew, Partners & FAQs", icon: <HelpCircle className="w-4 h-4" /> },
    { id: "settings", label: "Settings & API Keys", icon: <Settings className="w-4 h-4" /> },
  ];

  if (!authChecked) {
    return (
      <div className="min-h-screen w-full bg-[#061322] text-white flex items-center justify-center text-sm font-mono">
        Verifying Administrator Session...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#F4F6F8] flex flex-col">
      <div className="w-full flex-1 flex flex-col">
        {/* Top Admin Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <WdcBrandLogo theme="dark" showBadge={false} />
            <div className="hidden sm:block border-l border-slate-200 pl-4">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[#1B2228]">
                  Summit 2027 · Central CMS
                </span>
                <span className="rounded-full bg-[#E4EFF7] px-2.5 py-0.5 text-[10px] font-mono font-bold text-[#1B2228]">
                  {postgresConfigured ? "SUPABASE / POSTGRES LIVE" : "HYBRID DB ACTIVE"}
                </span>
              </div>
              <p className="text-xs text-[#54626F]">
                Manage content, packages, delegate applications, leads, payments, and contacts
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {toast && (
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 text-white px-4 py-1.5 text-xs font-semibold shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{toast}</span>
              </div>
            )}
            <button
              type="button"
              onClick={loadStore}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 px-3.5 py-2 text-xs font-medium text-[#1B2228]"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>
            <button
              type="button"
              onClick={handleSaveCMS}
              disabled={saving}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#FCE46D] hover:bg-[#F7D742] px-5 py-2 text-xs font-bold text-[#1B2228] shadow-2xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saving ? "Saving..." : "Save CMS Changes"}</span>
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#1B2228] hover:bg-[#323E48] text-white px-4 py-2 text-xs font-semibold"
            >
              <span>View Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 px-3.5 py-2 text-xs font-semibold"
              title="Sign Out of CMS"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </header>

        {/* Body Layout: Sidebar + Main Content */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-3 xl:col-span-2 bg-white/80 border-b lg:border-b-0 lg:border-r border-slate-200/80 p-4 space-y-1">
            {navItems.map((item) => {
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? "bg-[#1B2228] text-white shadow-2xs"
                      : "text-[#3D4B56] hover:bg-[#E4EFF7]"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </span>
                  {item.badge !== undefined && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                        active
                          ? "bg-[#FCE46D] text-[#1B2228]"
                          : "bg-slate-200 text-[#1B2228]"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </aside>

          {/* Main Workspace */}
          <div className="lg:col-span-9 xl:col-span-10 p-5 sm:p-8 overflow-y-auto">
            {/* ===============================================================
                TAB 1: OVERVIEW
               =============================================================== */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                  <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs">
                    <div className="text-xs text-[#54626F] font-medium">
                      Total Verified Revenue
                    </div>
                    <div className="text-3xl font-extrabold text-[#1B2228] mt-1">
                      ${totalRevenue.toFixed(2)}
                    </div>
                    <div className="text-[11px] text-emerald-700 font-medium mt-1">
                      {store.payments.filter((p) => p.status === "SUCCESS").length} paid transactions
                    </div>
                  </div>

                  <div className="bg-[#E4EFF7] rounded-2xl p-5 border border-white shadow-2xs">
                    <div className="text-xs text-[#2C3740] font-medium">
                      Delegate Applications
                    </div>
                    <div className="text-3xl font-extrabold text-[#1B2228] mt-1">
                      {store.applications.length}
                    </div>
                    <div className="text-[11px] text-[#455664] mt-1">
                      {store.applications.filter((a) => a.speakerSlotInterest).length} speaker slot candidates
                    </div>
                  </div>

                  <div className="bg-[#B7D3E6] rounded-2xl p-5 border border-white shadow-2xs">
                    <div className="text-xs text-[#1B2228] font-medium">
                      Captured Leads
                    </div>
                    <div className="text-3xl font-extrabold text-[#1B2228] mt-1">
                      {store.leads.length}
                    </div>
                    <div className="text-[11px] text-[#2C3740] mt-1">
                      Prospectus & application leads
                    </div>
                  </div>

                  <div className="bg-[#455664] text-white rounded-2xl p-5 shadow-2xs">
                    <div className="text-xs text-slate-200 font-medium">
                      Contact Messages
                    </div>
                    <div className="text-3xl font-extrabold text-[#FCE46D] mt-1">
                      {store.contacts.length}
                    </div>
                    <div className="text-[11px] text-slate-200 mt-1">
                      {unreadContacts} unread inquiries
                    </div>
                  </div>
                </div>

                {/* Recent Applications & Recent Payments */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <div className="bg-white rounded-2xl p-6 border border-slate-200/80">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-base text-[#1B2228]">
                        Recent Delegate Applications
                      </h3>
                      <button
                        type="button"
                        onClick={() => setActiveTab("applications")}
                        className="text-xs font-semibold text-[#455664] hover:underline"
                      >
                        Manage All →
                      </button>
                    </div>
                    <div className="space-y-3">
                      {store.applications.slice(0, 5).map((app) => (
                        <div
                          key={app.id}
                          className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs"
                        >
                          <div>
                            <div className="font-bold text-[#1B2228]">
                              {app.fullName} ({app.nationality})
                            </div>
                            <div className="text-[#54626F]">
                              {app.packageName} · ${app.amount}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold ${
                                app.paymentStatus === "PAID"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {app.paymentStatus}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full bg-[#E4EFF7] text-[#1B2228] font-mono text-[10px] font-bold">
                              {app.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border border-slate-200/80">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-base text-[#1B2228]">
                        Recent Paystack & Flutterwave Payments
                      </h3>
                      <button
                        type="button"
                        onClick={() => setActiveTab("payments")}
                        className="text-xs font-semibold text-[#455664] hover:underline"
                      >
                        View All →
                      </button>
                    </div>
                    <div className="space-y-3">
                      {store.payments.slice(0, 5).map((pay) => (
                        <div
                          key={pay.id}
                          className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs"
                        >
                          <div>
                            <div className="font-bold text-[#1B2228]">
                              {pay.customerName} · ${pay.amount} {pay.currency}
                            </div>
                            <div className="text-[#54626F] font-mono text-[11px]">
                              {pay.reference} ({pay.gateway.toUpperCase()})
                            </div>
                          </div>
                          <span
                            className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold ${
                              pay.status === "SUCCESS"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {pay.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ===============================================================
                TAB 2: APPLICATIONS MANAGER
               =============================================================== */}
            {activeTab === "applications" && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80">
                  <div>
                    <h2 className="text-xl font-bold text-[#1B2228]">
                      Delegate & Scholarship Applications ({filteredApps.length})
                    </h2>
                    <p className="text-xs text-[#54626F]">
                      Review merit scholarship essays, speaker slot proposals, and payment verification.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search name, email, country..."
                        value={appSearch}
                        onChange={(e) => setAppSearch(e.target.value)}
                        className="pl-8 pr-3 py-2 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                    <select
                      value={appFilter}
                      onChange={(e) => setAppFilter(e.target.value)}
                      className="rounded-xl border border-slate-200 px-3 py-2 text-xs bg-white"
                    >
                      <option value="ALL">All Statuses</option>
                      <option value="PENDING_PAYMENT">Pending Payment</option>
                      <option value="UNDER_REVIEW">Under Review</option>
                      <option value="ACCEPTED">Accepted</option>
                      <option value="WAITLISTED">Waitlisted</option>
                      <option value="DECLINED">Declined</option>
                    </select>
                    <button
                      type="button"
                      onClick={() =>
                        exportCSV(
                          "wdc-2027-applications.csv",
                          store.applications as unknown as Record<string, unknown>[]
                        )
                      }
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#1B2228] text-white px-3.5 py-2 text-xs font-semibold"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export CSV</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                  <div className="xl:col-span-7 space-y-3">
                    {filteredApps.map((app) => (
                      <div
                        key={app.id}
                        onClick={() => setSelectedApp(app)}
                        className={`cursor-pointer rounded-2xl p-5 border transition-all ${
                          selectedApp?.id === app.id
                            ? "bg-[#E4EFF7] border-[#1B2228]"
                            : "bg-white border-slate-200/80 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <div>
                            <span className="font-mono text-[11px] text-[#54626F] mr-2">
                              {app.id}
                            </span>
                            <span className="font-bold text-sm text-[#1B2228]">
                              {app.fullName}
                            </span>
                            <span className="text-xs text-[#54626F] ml-2">
                              · {app.nationality} (Age {app.age})
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                                app.paymentStatus === "PAID"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {app.paymentStatus} (${app.amount})
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full bg-white text-[#1B2228] border border-slate-200 text-[10px] font-mono font-bold">
                              {app.status}
                            </span>
                          </div>
                        </div>
                        <div className="text-xs text-[#3D4B56] line-clamp-2">
                          {app.motivationStatement}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Application Inspector Panel */}
                  <div className="xl:col-span-5">
                    {selectedApp ? (
                      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 sticky top-6 space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                          <div>
                            <div className="text-xs font-mono text-[#54626F]">
                              {selectedApp.id}
                            </div>
                            <h3 className="text-lg font-bold text-[#1B2228]">
                              {selectedApp.fullName}
                            </h3>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteRecord("applications", selectedApp.id)
                            }
                            className="p-2 rounded-xl text-red-600 hover:bg-red-50"
                            title="Delete Application"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-xl">
                          <div>
                            <div className="text-slate-500">Email</div>
                            <div className="font-semibold text-[#1B2228] break-all">
                              {selectedApp.email}
                            </div>
                          </div>
                          <div>
                            <div className="text-slate-500">Phone</div>
                            <div className="font-semibold text-[#1B2228]">
                              {selectedApp.phone || "N/A"}
                            </div>
                          </div>
                          <div>
                            <div className="text-slate-500">Nationality</div>
                            <div className="font-semibold text-[#1B2228]">
                              {selectedApp.nationality}
                            </div>
                          </div>
                          <div>
                            <div className="text-slate-500">Profile</div>
                            <div className="font-semibold text-[#1B2228]">
                              {selectedApp.categoryProfile}
                            </div>
                          </div>
                          <div className="col-span-2">
                            <div className="text-slate-500">Package Selected</div>
                            <div className="font-bold text-[#1B2228]">
                              {selectedApp.packageName} (${selectedApp.amount} USD)
                            </div>
                          </div>
                        </div>

                        {selectedApp.speakerSlotInterest && (
                          <div className="rounded-xl bg-[#FCE46D]/30 border border-[#FCE46D] p-3 text-xs">
                            <div className="font-bold text-[#1B2228]">
                              20 Speaker Slots Candidate
                            </div>
                            <div className="text-[#2C3740] mt-0.5">
                              Topic: {selectedApp.speakerTopic || "General Summit Topic"}
                            </div>
                          </div>
                        )}

                        <div className="text-xs space-y-1">
                          <div className="font-semibold text-[#1B2228]">
                            Motivation Statement ({selectedApp.declarationInterest}):
                          </div>
                          <p className="text-[#4A5864] bg-slate-50 p-3 rounded-xl leading-relaxed">
                            {selectedApp.motivationStatement}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-2">
                          <div>
                            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                              Admission Status
                            </label>
                            <select
                              value={selectedApp.status}
                              onChange={(e) =>
                                handleUpdateApplication(selectedApp.id, {
                                  status: e.target.value as ApplicationRecord["status"],
                                })
                              }
                              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold bg-white"
                            >
                              <option value="PENDING_PAYMENT">PENDING_PAYMENT</option>
                              <option value="UNDER_REVIEW">UNDER_REVIEW</option>
                              <option value="ACCEPTED">ACCEPTED</option>
                              <option value="WAITLISTED">WAITLISTED</option>
                              <option value="DECLINED">DECLINED</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                              Payment Status
                            </label>
                            <select
                              value={selectedApp.paymentStatus}
                              onChange={(e) =>
                                handleUpdateApplication(selectedApp.id, {
                                  paymentStatus: e.target
                                    .value as ApplicationRecord["paymentStatus"],
                                })
                              }
                              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold bg-white"
                            >
                              <option value="UNPAID">UNPAID</option>
                              <option value="PAID">PAID</option>
                              <option value="REFUNDED">REFUNDED</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                            Admin Selection Notes
                          </label>
                          <textarea
                            rows={2}
                            value={selectedApp.adminNotes || ""}
                            onChange={(e) =>
                              setSelectedApp({
                                ...selectedApp,
                                adminNotes: e.target.value,
                              })
                            }
                            onBlur={() =>
                              handleUpdateApplication(selectedApp.id, {
                                adminNotes: selectedApp.adminNotes,
                              })
                            }
                            placeholder="Add internal review notes..."
                            className="w-full rounded-xl border border-slate-200 p-2.5 text-xs"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="bg-white rounded-2xl p-8 border border-slate-200/80 text-center text-xs text-slate-500">
                        Select any application on the left to inspect essays, speaker topics, and update admission status.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ===============================================================
                TAB 3: LEADS CRM
               =============================================================== */}
            {activeTab === "leads" && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80">
                  <div>
                    <h2 className="text-xl font-bold text-[#1B2228]">
                      Prospect & Delegate Leads ({store.leads.length})
                    </h2>
                    <p className="text-xs text-[#54626F]">
                      Every visitor who requests the Summit Info Pack or starts an application is captured here.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      exportCSV(
                        "wdc-2027-leads.csv",
                        store.leads as unknown as Record<string, unknown>[]
                      )
                    }
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#1B2228] text-white px-4 py-2 text-xs font-semibold"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export Leads CSV</span>
                  </button>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-[#54626F] font-mono uppercase">
                        <th className="py-3.5 px-4">Lead Name</th>
                        <th className="py-3.5 px-4">Email & Phone</th>
                        <th className="py-3.5 px-4">Country</th>
                        <th className="py-3.5 px-4">Interested Track</th>
                        <th className="py-3.5 px-4">Source</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {store.leads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-50/80">
                          <td className="py-3.5 px-4 font-bold text-[#1B2228]">
                            {lead.fullName}
                          </td>
                          <td className="py-3.5 px-4">
                            <div>{lead.email}</div>
                            {lead.phone && (
                              <div className="text-slate-400">{lead.phone}</div>
                            )}
                          </td>
                          <td className="py-3.5 px-4">{lead.country}</td>
                          <td className="py-3.5 px-4 font-medium">
                            {lead.interestType}
                          </td>
                          <td className="py-3.5 px-4 text-slate-500">
                            {lead.source}
                          </td>
                          <td className="py-3.5 px-4">
                            <select
                              value={lead.status}
                              onChange={(e) =>
                                handleUpdateLead(lead.id, {
                                  status: e.target.value as LeadRecord["status"],
                                })
                              }
                              className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-semibold bg-white"
                            >
                              <option value="NEW">NEW</option>
                              <option value="CONTACTED">CONTACTED</option>
                              <option value="CONVERTED">CONVERTED</option>
                              <option value="ARCHIVED">ARCHIVED</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => handleDeleteRecord("leads", lead.id)}
                              className="text-red-600 hover:underline font-medium"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ===============================================================
                TAB 4: PAYMENTS & TRANSACTIONS
               =============================================================== */}
            {activeTab === "payments" && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80">
                  <div>
                    <h2 className="text-xl font-bold text-[#1B2228]">
                      Paystack & Flutterwave Transactions ({store.payments.length})
                    </h2>
                    <p className="text-xs text-[#54626F]">
                      Track all scholarship application fees ($16.99), Self-Funded ($749), Forum Access ($349), and Visa Letter ($99) payments.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      exportCSV(
                        "wdc-2027-payments.csv",
                        store.payments as unknown as Record<string, unknown>[]
                      )
                    }
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#1B2228] text-white px-4 py-2 text-xs font-semibold"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export Transactions CSV</span>
                  </button>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-[#54626F] font-mono uppercase">
                        <th className="py-3.5 px-4">Reference</th>
                        <th className="py-3.5 px-4">Delegate</th>
                        <th className="py-3.5 px-4">Package</th>
                        <th className="py-3.5 px-4">Amount</th>
                        <th className="py-3.5 px-4">Gateway</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">Manage</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {store.payments.map((pay) => (
                        <tr key={pay.id} className="hover:bg-slate-50/80">
                          <td className="py-3.5 px-4 font-mono font-bold text-[#1B2228]">
                            {pay.reference}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-[#1B2228]">
                              {pay.customerName}
                            </div>
                            <div className="text-slate-500">{pay.customerEmail}</div>
                          </td>
                          <td className="py-3.5 px-4">{pay.packageName}</td>
                          <td className="py-3.5 px-4 font-extrabold text-[#1B2228]">
                            ${pay.amount} {pay.currency}
                          </td>
                          <td className="py-3.5 px-4 uppercase font-mono">
                            {pay.gateway}
                          </td>
                          <td className="py-3.5 px-4">
                            <select
                              value={pay.status}
                              onChange={(e) =>
                                handleUpdatePayment(pay.id, {
                                  status: e.target.value as PaymentRecord["status"],
                                })
                              }
                              className={`rounded-lg border px-2.5 py-1 text-xs font-bold ${
                                pay.status === "SUCCESS"
                                  ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                                  : "bg-amber-50 border-amber-200 text-amber-800"
                              }`}
                            >
                              <option value="PENDING">PENDING</option>
                              <option value="SUCCESS">SUCCESS</option>
                              <option value="FAILED">FAILED</option>
                              <option value="REFUNDED">REFUNDED</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              type="button"
                              onClick={() =>
                                handleDeleteRecord("payments", pay.id)
                              }
                              className="text-red-600 hover:underline"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ===============================================================
                TAB 5: CONTACT INBOX
               =============================================================== */}
            {activeTab === "contacts" && (
              <div className="space-y-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80">
                  <h2 className="text-xl font-bold text-[#1B2228]">
                    Contact Page Inquiries ({store.contacts.length})
                  </h2>
                  <p className="text-xs text-[#54626F]">
                    Messages submitted via the /contact form appear here in real time.
                  </p>
                </div>

                {store.contacts.map((msg) => (
                  <div
                    key={msg.id}
                    className="bg-white rounded-2xl p-6 border border-slate-200/80 space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <span className="font-bold text-base text-[#1B2228]">
                          {msg.subject}
                        </span>
                        <span className="ml-2 rounded-full bg-[#E4EFF7] px-3 py-0.5 text-[11px] font-semibold text-[#1B2228]">
                          {msg.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <select
                          value={msg.status}
                          onChange={(e) =>
                            handleUpdateContact(msg.id, {
                              status: e.target.value as ContactRecord["status"],
                            })
                          }
                          className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold"
                        >
                          <option value="UNREAD">UNREAD</option>
                          <option value="READ">READ</option>
                          <option value="REPLIED">REPLIED</option>
                          <option value="ARCHIVED">ARCHIVED</option>
                        </select>
                        <button
                          type="button"
                          onClick={() => handleDeleteRecord("contacts", msg.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="text-xs text-[#54626F] flex flex-wrap items-center gap-2">
                      <span>
                        From: <strong className="text-[#1B2228]">{msg.fullName}</strong> (
                        <a href={`mailto:${msg.email}`} className="underline">
                          {msg.email}
                        </a>
                        ) · {msg.country || "International"} · {msg.phone}
                      </span>
                      {msg.recipientEmail && (
                        <span className="font-mono text-[11px] font-semibold text-[#0B1C2E] bg-[#FCE46D]/40 border border-[#FCE46D] px-2 py-0.5 rounded-full">
                          To: {msg.recipientEmail}
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-[#1B2228] bg-slate-50 p-4 rounded-xl leading-relaxed">
                      {msg.message}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* ===============================================================
                TAB 6: HERO, ABOUT, DECLARATION & PILLARS CONTENT EDITOR
               =============================================================== */}
            {activeTab === "content" && (
              <div className="space-y-8">
                {/* Hero Editor */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200/80 space-y-4">
                  <h3 className="text-lg font-bold text-[#1B2228] border-b pb-2">
                    Hero Section Editor
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1">
                        Top Pill Badge
                      </label>
                      <input
                        type="text"
                        value={cms.hero.badge}
                        onChange={(e) =>
                          setCms({
                            ...cms,
                            hero: { ...cms.hero, badge: e.target.value },
                          })
                        }
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1">
                        Eyebrow Subtitle
                      </label>
                      <input
                        type="text"
                        value={cms.hero.eyebrow}
                        onChange={(e) =>
                          setCms({
                            ...cms,
                            hero: { ...cms.hero, eyebrow: e.target.value },
                          })
                        }
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1">
                        Headline Line 1
                      </label>
                      <input
                        type="text"
                        value={cms.hero.headlineLine1}
                        onChange={(e) =>
                          setCms({
                            ...cms,
                            hero: { ...cms.hero, headlineLine1: e.target.value },
                          })
                        }
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1">
                        Headline Line 2
                      </label>
                      <input
                        type="text"
                        value={cms.hero.headlineLine2}
                        onChange={(e) =>
                          setCms({
                            ...cms,
                            hero: { ...cms.hero, headlineLine2: e.target.value },
                          })
                        }
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-bold"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold mb-1">
                        Hero Description
                      </label>
                      <textarea
                        rows={3}
                        value={cms.hero.description}
                        onChange={(e) =>
                          setCms({
                            ...cms,
                            hero: { ...cms.hero, description: e.target.value },
                          })
                        }
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold mb-1">
                        Mountain Hero Landscape Image URL
                      </label>
                      <input
                        type="text"
                        value={cms.hero.mountainImageUrl}
                        onChange={(e) =>
                          setCms({
                            ...cms,
                            hero: {
                              ...cms.hero,
                              mountainImageUrl: e.target.value,
                            },
                          })
                        }
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 01 About & Stats Editor */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200/80 space-y-4">
                  <h3 className="text-lg font-bold text-[#1B2228] border-b pb-2">
                    01 · About the Summit & Stats Card
                  </h3>
                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      Section Headline
                    </label>
                    <input
                      type="text"
                      value={cms.about.headline}
                      onChange={(e) =>
                        setCms({
                          ...cms,
                          about: { ...cms.about, headline: e.target.value },
                        })
                      }
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-bold"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1">
                        Paragraph 1
                      </label>
                      <textarea
                        rows={3}
                        value={cms.about.paragraph1}
                        onChange={(e) =>
                          setCms({
                            ...cms,
                            about: { ...cms.about, paragraph1: e.target.value },
                          })
                        }
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1">
                        Paragraph 2
                      </label>
                      <textarea
                        rows={3}
                        value={cms.about.paragraph2}
                        onChange={(e) =>
                          setCms({
                            ...cms,
                            about: { ...cms.about, paragraph2: e.target.value },
                          })
                        }
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    {cms.about.stats.map((st, i) => (
                      <div key={i} className="p-3 rounded-xl bg-slate-50 border">
                        <label className="block text-[10px] font-mono text-slate-500">
                          Stat #{i + 1} Value
                        </label>
                        <input
                          type="text"
                          value={st.value}
                          onChange={(e) => {
                            const next = [...cms.about.stats];
                            next[i] = { ...next[i], value: e.target.value };
                            setCms({
                              ...cms,
                              about: { ...cms.about, stats: next },
                            });
                          }}
                          className="w-full font-bold text-sm border-b bg-transparent py-1"
                        />
                        <label className="block text-[10px] font-mono text-slate-500 mt-2">
                          Label
                        </label>
                        <input
                          type="text"
                          value={st.label}
                          onChange={(e) => {
                            const next = [...cms.about.stats];
                            next[i] = { ...next[i], label: e.target.value };
                            setCms({
                              ...cms,
                              about: { ...cms.about, stats: next },
                            });
                          }}
                          className="w-full text-xs border-b bg-transparent py-1"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 04 Six Pillars Editor */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200/80 space-y-4">
                  <h3 className="text-lg font-bold text-[#1B2228] border-b pb-2">
                    04 · Six Pillars of Resilience
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cms.pillars.items.map((pil, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs font-bold">
                            Pillar {pil.number}
                          </span>
                        </div>
                        <input
                          type="text"
                          value={pil.title}
                          onChange={(e) => {
                            const next = [...cms.pillars.items];
                            next[idx] = { ...next[idx], title: e.target.value };
                            setCms({
                              ...cms,
                              pillars: { ...cms.pillars, items: next },
                            });
                          }}
                          className="w-full rounded-lg border px-3 py-1.5 text-xs font-bold bg-white"
                        />
                        <textarea
                          rows={2}
                          value={pil.description}
                          onChange={(e) => {
                            const next = [...cms.pillars.items];
                            next[idx] = {
                              ...next[idx],
                              description: e.target.value,
                            };
                            setCms({
                              ...cms,
                              pillars: { ...cms.pillars, items: next },
                            });
                          }}
                          className="w-full rounded-lg border px-3 py-1.5 text-xs bg-white"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleSaveCMS}
                    className="rounded-full bg-[#FCE46D] hover:bg-[#F7D742] text-[#1B2228] font-bold px-8 py-3 text-xs shadow-xs"
                  >
                    Save & Publish Content Changes
                  </button>
                </div>
              </div>
            )}

            {/* ===============================================================
                TAB 7: 5-DAY PROGRAMME EDITOR
               =============================================================== */}
            {activeTab === "programme" && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 border border-slate-200/80 space-y-4">
                  <h3 className="text-lg font-bold text-[#1B2228]">
                    07 · Five Days in Cape Town Schedule Editor
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cms.programme.days.map((day, dIdx) => (
                      <div
                        key={day.id}
                        className="rounded-2xl bg-slate-50 border border-slate-200 p-4 space-y-2.5"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-xs font-bold text-[#455664]">
                            {day.dayNumber}
                          </span>
                          <input
                            type="text"
                            value={day.date}
                            onChange={(e) => {
                              const next = [...cms.programme.days];
                              next[dIdx] = { ...next[dIdx], date: e.target.value };
                              setCms({
                                ...cms,
                                programme: { ...cms.programme, days: next },
                              });
                            }}
                            className="rounded-lg border px-2.5 py-1 text-xs bg-white"
                          />
                        </div>
                        <input
                          type="text"
                          value={day.title}
                          onChange={(e) => {
                            const next = [...cms.programme.days];
                            next[dIdx] = { ...next[dIdx], title: e.target.value };
                            setCms({
                              ...cms,
                              programme: { ...cms.programme, days: next },
                            });
                          }}
                          className="w-full rounded-lg border px-3 py-1.5 text-xs font-bold bg-white"
                        />
                        <label className="block text-[11px] text-slate-500">
                          Sessions (one per line):
                        </label>
                        <textarea
                          rows={5}
                          value={day.items.join("\n")}
                          onChange={(e) => {
                            const next = [...cms.programme.days];
                            next[dIdx] = {
                              ...next[dIdx],
                              items: e.target.value.split("\n"),
                            };
                            setCms({
                              ...cms,
                              programme: { ...cms.programme, days: next },
                            });
                          }}
                          className="w-full rounded-lg border px-3 py-2 text-xs bg-white"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={handleSaveCMS}
                      className="rounded-full bg-[#FCE46D] text-[#1B2228] font-bold px-7 py-3 text-xs"
                    >
                      Save Programme Schedule
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ===============================================================
                TAB 8: PACKAGES & PRICING MANAGER
               =============================================================== */}
            {activeTab === "packages" && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 border border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#1B2228]">
                      09 & 10 · Scholarships & Paid Participation Packages
                    </h3>
                    <p className="text-xs text-[#54626F]">
                      Manage pricing ($16.99, $749, $349, $99), checklists, badges, and CTA buttons.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleSaveCMS}
                    className="rounded-full bg-[#FCE46D] text-[#1B2228] font-bold px-6 py-2.5 text-xs"
                  >
                    Save All Package Changes
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {cms.packages.map((pkg, pIdx) => (
                    <div
                      key={pkg.id}
                      className="bg-white rounded-2xl p-5 border border-slate-200/80 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] uppercase px-2.5 py-0.5 rounded-full bg-[#E4EFF7] text-[#1B2228] font-bold">
                          {pkg.category}
                        </span>
                        <label className="flex items-center gap-1.5 text-xs font-medium cursor-pointer">
                          <input
                            type="checkbox"
                            checked={pkg.active}
                            onChange={(e) => {
                              const next = [...cms.packages];
                              next[pIdx] = {
                                ...next[pIdx],
                                active: e.target.checked,
                              };
                              setCms({ ...cms, packages: next });
                            }}
                          />
                          <span>Active on Site</span>
                        </label>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="col-span-2">
                          <label className="block text-[11px] text-slate-500">
                            Package Name
                          </label>
                          <input
                            type="text"
                            value={pkg.name}
                            onChange={(e) => {
                              const next = [...cms.packages];
                              next[pIdx] = { ...next[pIdx], name: e.target.value };
                              setCms({ ...cms, packages: next });
                            }}
                            className="w-full rounded-lg border px-3 py-1.5 text-xs font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-slate-500">
                            Price (USD)
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            value={pkg.price}
                            onChange={(e) => {
                              const nextPrice = Number(e.target.value);
                              const next = [...cms.packages];
                              next[pIdx] = { ...next[pIdx], price: nextPrice };
                              setCms({
                                ...cms,
                                packages: next,
                                scholarshipSection:
                                  pkg.id === "pkg-scholarship-app"
                                    ? {
                                        ...cms.scholarshipSection,
                                        applicationFeePrice: nextPrice,
                                      }
                                    : cms.scholarshipSection,
                              });
                            }}
                            className="w-full rounded-lg border px-3 py-1.5 text-xs font-extrabold"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] text-slate-500">
                            Subtitle
                          </label>
                          <input
                            type="text"
                            value={pkg.subtitle}
                            onChange={(e) => {
                              const next = [...cms.packages];
                              next[pIdx] = {
                                ...next[pIdx],
                                subtitle: e.target.value,
                              };
                              setCms({ ...cms, packages: next });
                            }}
                            className="w-full rounded-lg border px-3 py-1.5 text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-slate-500">
                            Badge Text
                          </label>
                          <input
                            type="text"
                            value={pkg.badge || ""}
                            onChange={(e) => {
                              const next = [...cms.packages];
                              next[pIdx] = {
                                ...next[pIdx],
                                badge: e.target.value,
                              };
                              setCms({ ...cms, packages: next });
                            }}
                            className="w-full rounded-lg border px-3 py-1.5 text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] text-slate-500 mb-1">
                          Included Features (one per line)
                        </label>
                        <textarea
                          rows={4}
                          value={pkg.features.join("\n")}
                          onChange={(e) => {
                            const next = [...cms.packages];
                            next[pIdx] = {
                              ...next[pIdx],
                              features: e.target.value.split("\n"),
                            };
                            setCms({ ...cms, packages: next });
                          }}
                          className="w-full rounded-lg border px-3 py-2 text-xs"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===============================================================
                TAB 9: FAQS & PARTNERS MANAGER
               =============================================================== */}
            {activeTab === "faqs_partners" && (
              <div className="space-y-8">
                {/* Youth Summit Crew (Team) Manager */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200/80 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-[#1B2228]">
                        03 · Youth Summit Crew ({(cms.teamSection || INITIAL_STORE.cms.teamSection).members.length} Total)
                      </h3>
                      <p className="text-xs text-[#54626F]">
                        Check &ldquo;Featured on Landing Page&rdquo; for the 3 core leaders shown on the homepage. All members appear on /team.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const currentTeam = cms.teamSection || INITIAL_STORE.cms.teamSection;
                        setCms({
                          ...cms,
                          teamSection: {
                            ...currentTeam,
                            members: [
                              ...currentTeam.members,
                              {
                                id: `crew-${Date.now()}`,
                                name: "New Crew Member",
                                role: "Youth Summit Crew",
                                badge: "SUMMIT CREW",
                                location: "Global",
                                bio: "Enter team member bio and responsibilities.",
                                imageUrl: "/team/sapiens-ndatabaje.png",
                                linkedinUrl: "https://www.linkedin.com/company/worlddisastercenter/",
                                email: "summit@worlddisastercenter.org",
                                theme: "ice",
                                featuredOnHome: false,
                              },
                            ],
                          },
                        });
                      }}
                      className="inline-flex items-center gap-1 rounded-full bg-[#1B2228] text-white px-4 py-1.5 text-xs font-semibold"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Crew Member
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(cms.teamSection || INITIAL_STORE.cms.teamSection).members.map((member, idx) => (
                      <div
                        key={member.id}
                        className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={member.imageUrl}
                              alt={member.name}
                              className="w-10 h-10 rounded-xl object-cover object-top bg-white border"
                            />
                            <span className="text-xs font-bold text-[#1B2228]">
                              #{idx + 1} · {member.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <label className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#1B2228] cursor-pointer">
                              <input
                                type="checkbox"
                                checked={member.featuredOnHome}
                                onChange={(e) => {
                                  const currentTeam = cms.teamSection || INITIAL_STORE.cms.teamSection;
                                  const next = [...currentTeam.members];
                                  next[idx] = { ...next[idx], featuredOnHome: e.target.checked };
                                  setCms({
                                    ...cms,
                                    teamSection: { ...currentTeam, members: next },
                                  });
                                }}
                              />
                              <span>Featured on Home</span>
                            </label>
                            <button
                              type="button"
                              onClick={() => {
                                const currentTeam = cms.teamSection || INITIAL_STORE.cms.teamSection;
                                setCms({
                                  ...cms,
                                  teamSection: {
                                    ...currentTeam,
                                    members: currentTeam.members.filter((m) => m.id !== member.id),
                                  },
                                });
                              }}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="Full Name"
                            value={member.name}
                            onChange={(e) => {
                              const currentTeam = cms.teamSection || INITIAL_STORE.cms.teamSection;
                              const next = [...currentTeam.members];
                              next[idx] = { ...next[idx], name: e.target.value };
                              setCms({
                                ...cms,
                                teamSection: { ...currentTeam, members: next },
                              });
                            }}
                            className="rounded-lg border px-2.5 py-1.5 text-xs font-bold bg-white"
                          />
                          <input
                            type="text"
                            placeholder="Role / Title"
                            value={member.role}
                            onChange={(e) => {
                              const currentTeam = cms.teamSection || INITIAL_STORE.cms.teamSection;
                              const next = [...currentTeam.members];
                              next[idx] = { ...next[idx], role: e.target.value };
                              setCms({
                                ...cms,
                                teamSection: { ...currentTeam, members: next },
                              });
                            }}
                            className="rounded-lg border px-2.5 py-1.5 text-xs bg-white"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="Photo URL (/team/...)"
                            value={member.imageUrl}
                            onChange={(e) => {
                              const currentTeam = cms.teamSection || INITIAL_STORE.cms.teamSection;
                              const next = [...currentTeam.members];
                              next[idx] = { ...next[idx], imageUrl: e.target.value };
                              setCms({
                                ...cms,
                                teamSection: { ...currentTeam, members: next },
                              });
                            }}
                            className="rounded-lg border px-2.5 py-1.5 text-xs bg-white font-mono"
                          />
                          <input
                            type="text"
                            placeholder="LinkedIn URL"
                            value={member.linkedinUrl || ""}
                            onChange={(e) => {
                              const currentTeam = cms.teamSection || INITIAL_STORE.cms.teamSection;
                              const next = [...currentTeam.members];
                              next[idx] = { ...next[idx], linkedinUrl: e.target.value };
                              setCms({
                                ...cms,
                                teamSection: { ...currentTeam, members: next },
                              });
                            }}
                            className="rounded-lg border px-2.5 py-1.5 text-xs bg-white"
                          />
                        </div>

                        <textarea
                          rows={2}
                          placeholder="Short Bio"
                          value={member.bio}
                          onChange={(e) => {
                            const currentTeam = cms.teamSection || INITIAL_STORE.cms.teamSection;
                            const next = [...currentTeam.members];
                            next[idx] = { ...next[idx], bio: e.target.value };
                            setCms({
                              ...cms,
                              teamSection: { ...currentTeam, members: next },
                            });
                          }}
                          className="w-full rounded-lg border px-2.5 py-1.5 text-xs bg-white"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Partners Manager */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200/80 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-[#1B2228]">
                      11 · Partner Organisations ({cms.partnersSection.partners.length})
                    </h3>
                    <button
                      type="button"
                      onClick={() =>
                        setCms({
                          ...cms,
                          partnersSection: {
                            ...cms.partnersSection,
                            partners: [
                              ...cms.partnersSection.partners,
                              {
                                id: `part-${Date.now()}`,
                                name: "New Partner Organisation",
                                category: "Global Resilience Partner",
                              },
                            ],
                          },
                        })
                      }
                      className="inline-flex items-center gap-1 rounded-full bg-[#1B2228] text-white px-4 py-1.5 text-xs font-semibold"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Partner
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {cms.partnersSection.partners.map((part, idx) => (
                      <div
                        key={part.id}
                        className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {part.logoUrl && (
                              <img
                                src={part.logoUrl}
                                alt={part.name}
                                className="h-6 w-12 object-contain bg-white rounded border px-1"
                              />
                            )}
                            <span className="text-[10px] font-mono text-slate-400">
                              Partner #{idx + 1}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setCms({
                                ...cms,
                                partnersSection: {
                                  ...cms.partnersSection,
                                  partners: cms.partnersSection.partners.filter(
                                    (p) => p.id !== part.id
                                  ),
                                },
                              })
                            }
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <input
                          type="text"
                          placeholder="Partner Name"
                          value={part.name}
                          onChange={(e) => {
                            const next = [...cms.partnersSection.partners];
                            next[idx] = { ...next[idx], name: e.target.value };
                            setCms({
                              ...cms,
                              partnersSection: {
                                ...cms.partnersSection,
                                partners: next,
                              },
                            });
                          }}
                          className="w-full rounded-lg border px-2.5 py-1.5 text-xs font-bold bg-white"
                        />
                        <input
                          type="text"
                          placeholder="Category"
                          value={part.category}
                          onChange={(e) => {
                            const next = [...cms.partnersSection.partners];
                            next[idx] = {
                              ...next[idx],
                              category: e.target.value,
                            };
                            setCms({
                              ...cms,
                              partnersSection: {
                                ...cms.partnersSection,
                                partners: next,
                              },
                            });
                          }}
                          className="w-full rounded-lg border px-2.5 py-1 text-xs bg-white text-slate-600"
                        />
                        <input
                          type="text"
                          placeholder="Logo URL (/partners/...)"
                          value={part.logoUrl || ""}
                          onChange={(e) => {
                            const next = [...cms.partnersSection.partners];
                            next[idx] = {
                              ...next[idx],
                              logoUrl: e.target.value,
                            };
                            setCms({
                              ...cms,
                              partnersSection: {
                                ...cms.partnersSection,
                                partners: next,
                              },
                            });
                          }}
                          className="w-full rounded-lg border px-2.5 py-1 text-xs bg-white font-mono text-slate-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* FAQs Manager */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200/80 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-[#1B2228]">
                      13 · Frequently Asked Questions ({cms.faqsSection.items.length})
                    </h3>
                    <button
                      type="button"
                      onClick={() =>
                        setCms({
                          ...cms,
                          faqsSection: {
                            ...cms.faqsSection,
                            items: [
                              ...cms.faqsSection.items,
                              {
                                id: `faq-${Date.now()}`,
                                question: "New Frequently Asked Question?",
                                answer: "Provide the answer here.",
                              },
                            ],
                          },
                        })
                      }
                      className="inline-flex items-center gap-1 rounded-full bg-[#1B2228] text-white px-4 py-1.5 text-xs font-semibold"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add FAQ
                    </button>
                  </div>

                  <div className="space-y-3">
                    {cms.faqsSection.items.map((faq, idx) => (
                      <div
                        key={faq.id}
                        className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <input
                            type="text"
                            value={faq.question}
                            onChange={(e) => {
                              const next = [...cms.faqsSection.items];
                              next[idx] = {
                                ...next[idx],
                                question: e.target.value,
                              };
                              setCms({
                                ...cms,
                                faqsSection: {
                                  ...cms.faqsSection,
                                  items: next,
                                },
                              });
                            }}
                            className="flex-1 rounded-lg border px-3 py-1.5 text-xs font-bold bg-white"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setCms({
                                ...cms,
                                faqsSection: {
                                  ...cms.faqsSection,
                                  items: cms.faqsSection.items.filter(
                                    (f) => f.id !== faq.id
                                  ),
                                },
                              })
                            }
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <textarea
                          rows={2}
                          value={faq.answer}
                          onChange={(e) => {
                            const next = [...cms.faqsSection.items];
                            next[idx] = { ...next[idx], answer: e.target.value };
                            setCms({
                              ...cms,
                              faqsSection: { ...cms.faqsSection, items: next },
                            });
                          }}
                          className="w-full rounded-lg border px-3 py-1.5 text-xs bg-white"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={handleSaveCMS}
                      className="rounded-full bg-[#FCE46D] text-[#1B2228] font-bold px-8 py-3 text-xs"
                    >
                      Save FAQs & Partners
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ===============================================================
                TAB 10: SETTINGS, PAYMENT KEYS & SUPABASE / POSTGRESQL
               =============================================================== */}
            {activeTab === "settings" && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 border border-slate-200/80 space-y-5">
                  <h3 className="text-lg font-bold text-[#1B2228] border-b pb-2">
                    General Summit & Organization Settings
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1">
                        Organization Name
                      </label>
                      <input
                        type="text"
                        value={cms.settings.orgName}
                        onChange={(e) =>
                          setCms({
                            ...cms,
                            settings: { ...cms.settings, orgName: e.target.value },
                          })
                        }
                        className="w-full rounded-xl border px-3.5 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1">
                        Summit Title
                      </label>
                      <input
                        type="text"
                        value={cms.settings.summitTitle}
                        onChange={(e) =>
                          setCms({
                            ...cms,
                            settings: {
                              ...cms.settings,
                              summitTitle: e.target.value,
                            },
                          })
                        }
                        className="w-full rounded-xl border px-3.5 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1">
                        Summit Dates Text
                      </label>
                      <input
                        type="text"
                        value={cms.settings.datesText}
                        onChange={(e) =>
                          setCms({
                            ...cms,
                            settings: {
                              ...cms.settings,
                              datesText: e.target.value,
                            },
                          })
                        }
                        className="w-full rounded-xl border px-3.5 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1">
                        Countdown Target ISO Date
                      </label>
                      <input
                        type="text"
                        value={cms.settings.countdownTargetIso}
                        onChange={(e) =>
                          setCms({
                            ...cms,
                            settings: {
                              ...cms.settings,
                              countdownTargetIso: e.target.value,
                            },
                          })
                        }
                        className="w-full rounded-xl border px-3.5 py-2 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1">
                        Official Contact Email
                      </label>
                      <input
                        type="email"
                        value={cms.settings.contactEmail}
                        onChange={(e) =>
                          setCms({
                            ...cms,
                            settings: {
                              ...cms.settings,
                              contactEmail: e.target.value,
                            },
                          })
                        }
                        className="w-full rounded-xl border px-3.5 py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1">
                        Host City
                      </label>
                      <input
                        type="text"
                        value={cms.settings.hostCity}
                        onChange={(e) =>
                          setCms({
                            ...cms,
                            settings: {
                              ...cms.settings,
                              hostCity: e.target.value,
                            },
                          })
                        }
                        className="w-full rounded-xl border px-3.5 py-2 text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Paystack & Flutterwave Configuration */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200/80 space-y-5">
                  <h3 className="text-lg font-bold text-[#1B2228] border-b pb-2">
                    Paystack & Flutterwave Payment Gateway Configuration
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1">
                        Checkout Mode
                      </label>
                      <select
                        value={cms.settings.paymentMode}
                        onChange={(e) =>
                          setCms({
                            ...cms,
                            settings: {
                              ...cms.settings,
                              paymentMode: e.target.value as "sandbox" | "live",
                            },
                          })
                        }
                        className="w-full rounded-xl border px-3.5 py-2 text-xs bg-white font-semibold"
                      >
                        <option value="sandbox">
                          Interactive Sandbox Mode (Works immediately without keys)
                        </option>
                        <option value="live">
                          Live API Redirect Mode (Uses Secret Keys below)
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1">
                        Default Selected Gateway
                      </label>
                      <select
                        value={cms.settings.defaultGateway}
                        onChange={(e) =>
                          setCms({
                            ...cms,
                            settings: {
                              ...cms.settings,
                              defaultGateway: e.target.value as
                                | "paystack"
                                | "flutterwave",
                            },
                          })
                        }
                        className="w-full rounded-xl border px-3.5 py-2 text-xs bg-white font-semibold"
                      >
                        <option value="paystack">Paystack</option>
                        <option value="flutterwave">Flutterwave</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1">
                        Paystack Public Key
                      </label>
                      <input
                        type="text"
                        placeholder="pk_live_... or pk_test_..."
                        value={cms.settings.paystackPublicKey}
                        onChange={(e) =>
                          setCms({
                            ...cms,
                            settings: {
                              ...cms.settings,
                              paystackPublicKey: e.target.value,
                            },
                          })
                        }
                        className="w-full rounded-xl border px-3.5 py-2 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1">
                        Paystack Secret Key
                      </label>
                      <input
                        type="password"
                        placeholder="sk_live_... or sk_test_..."
                        value={cms.settings.paystackSecretKey}
                        onChange={(e) =>
                          setCms({
                            ...cms,
                            settings: {
                              ...cms.settings,
                              paystackSecretKey: e.target.value,
                            },
                          })
                        }
                        className="w-full rounded-xl border px-3.5 py-2 text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1">
                        Flutterwave Public Key
                      </label>
                      <input
                        type="text"
                        placeholder="FLWPUBK-..."
                        value={cms.settings.flutterwavePublicKey}
                        onChange={(e) =>
                          setCms({
                            ...cms,
                            settings: {
                              ...cms.settings,
                              flutterwavePublicKey: e.target.value,
                            },
                          })
                        }
                        className="w-full rounded-xl border px-3.5 py-2 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1">
                        Flutterwave Secret Key
                      </label>
                      <input
                        type="password"
                        placeholder="FLWSECK-..."
                        value={cms.settings.flutterwaveSecretKey}
                        onChange={(e) =>
                          setCms({
                            ...cms,
                            settings: {
                              ...cms.settings,
                              flutterwaveSecretKey: e.target.value,
                            },
                          })
                        }
                        className="w-full rounded-xl border px-3.5 py-2 text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <div className="text-xs text-[#54626F] flex items-center gap-2">
                      <Database className="w-4 h-4 text-[#1B2228]" />
                      <span>
                        PostgreSQL / Supabase SQL schema ready at{" "}
                        <code className="bg-slate-100 px-1.5 py-0.5 rounded">
                          supabase/schema.sql
                        </code>
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleSaveCMS}
                      className="rounded-full bg-[#FCE46D] text-[#1B2228] font-bold px-8 py-3 text-xs"
                    >
                      Save Settings & Gateway Keys
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
