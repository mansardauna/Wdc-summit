import { NextRequest, NextResponse } from "next/server";
import {
  getStore,
  saveStore,
  updateCMSContent,
  updateApplication,
  updateLead,
  updateContactMessage,
  isPostgresConfigured,
} from "@/lib/db";
import { INITIAL_STORE } from "@/lib/default-data";

export async function GET(req: NextRequest) {
  try {
    const store = await getStore();
    const { searchParams } = new URL(req.url);
    const scope = searchParams.get("scope");

    if (scope === "public") {
      // Mask secret keys for public frontend requests
      const safeCms = structuredClone(store.cms);
      safeCms.settings.paystackSecretKey = safeCms.settings.paystackSecretKey ? "••••••••" : "";
      safeCms.settings.flutterwaveSecretKey = safeCms.settings.flutterwaveSecretKey ? "••••••••" : "";
      return NextResponse.json({
        cms: safeCms,
        postgresConfigured: isPostgresConfigured(),
      });
    }

    return NextResponse.json({
      ...store,
      postgresConfigured: isPostgresConfigured(),
    });
  } catch (error) {
    console.error("GET /api/cms error:", error);
    return NextResponse.json({ error: "Failed to load CMS store" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, payload } = body;

    if (action === "update_cms") {
      const updated = await updateCMSContent(payload);
      return NextResponse.json({ success: true, cms: updated });
    }

    if (action === "update_application") {
      const { id, updates } = payload;
      const updated = await updateApplication(id, updates);
      return NextResponse.json({ success: true, application: updated });
    }

    if (action === "update_lead") {
      const { id, updates } = payload;
      const updated = await updateLead(id, updates);
      return NextResponse.json({ success: true, lead: updated });
    }

    if (action === "update_contact") {
      const { id, updates } = payload;
      const updated = await updateContactMessage(id, updates);
      return NextResponse.json({ success: true, contact: updated });
    }

    if (action === "update_payment") {
      const { id, updates } = payload;
      const store = await getStore();
      const idx = store.payments.findIndex((p) => p.id === id);
      if (idx !== -1) {
        store.payments[idx] = { ...store.payments[idx], ...updates };
        await saveStore(store);
      }
      return NextResponse.json({ success: true, payment: store.payments[idx] });
    }

    if (action === "delete_record") {
      const { collection, id } = payload;
      const store = await getStore();
      if (collection === "applications") {
        store.applications = store.applications.filter((a) => a.id !== id);
      } else if (collection === "leads") {
        store.leads = store.leads.filter((l) => l.id !== id);
      } else if (collection === "contacts") {
        store.contacts = store.contacts.filter((c) => c.id !== id);
      } else if (collection === "payments") {
        store.payments = store.payments.filter((p) => p.id !== id);
      }
      await saveStore(store);
      return NextResponse.json({ success: true });
    }

    if (action === "reset_defaults") {
      const fresh = structuredClone(INITIAL_STORE);
      await saveStore(fresh);
      return NextResponse.json({ success: true, store: fresh });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (error) {
    console.error("PUT /api/cms error:", error);
    return NextResponse.json({ error: "Failed to update CMS store" }, { status: 500 });
  }
}
