import fs from "fs";
import path from "path";
import { Pool } from "pg";
import {
  INITIAL_STORE,
  FullDatabaseStore,
  SiteCMSContent,
  ApplicationRecord,
  LeadRecord,
  PaymentRecord,
  ContactRecord,
} from "./default-data";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "cms-store.json");

let pgPool: Pool | null = null;
let pgInitialized = false;

function getPgPool(): Pool | null {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl || dbUrl.trim() === "") {
    return null;
  }
  if (!pgPool) {
    pgPool = new Pool({
      connectionString: dbUrl,
      ssl: dbUrl.includes("supabase") || dbUrl.includes("neon") || dbUrl.includes("sslmode=require")
        ? { rejectUnauthorized: false }
        : undefined,
    });
  }
  return pgPool;
}

async function ensurePgInitialized(pool: Pool) {
  if (pgInitialized) return;
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS cms_state_store (
        id TEXT PRIMARY KEY DEFAULT 'main',
        payload JSONB NOT NULL,
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    pgInitialized = true;
  } catch (err) {
    console.warn("PostgreSQL auto-init warning (falling back to local JSON store):", err);
  }
}

function readLocalStore(): FullDatabaseStore {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(INITIAL_STORE, null, 2), "utf-8");
      return structuredClone(INITIAL_STORE);
    }
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw) as Partial<FullDatabaseStore>;
    const mergedCms: SiteCMSContent = {
      ...INITIAL_STORE.cms,
      ...(parsed.cms || {}),
      teamSection:
        parsed.cms?.teamSection &&
        parsed.cms.teamSection.members?.length &&
        !parsed.cms.teamSection.members.some((m) => m.name.toLowerCase().includes("itegwa"))
          ? parsed.cms.teamSection
          : INITIAL_STORE.cms.teamSection,
      partnersSection:
        parsed.cms?.partnersSection?.partners?.some((p) => p.logoUrl)
          ? parsed.cms.partnersSection
          : INITIAL_STORE.cms.partnersSection,
      programme:
        parsed.cms?.programme?.days &&
        parsed.cms.programme.days.length <= 4 &&
        !parsed.cms.programme.days.some((d) => d.title?.toLowerCase().includes("arrival"))
          ? parsed.cms.programme
          : INITIAL_STORE.cms.programme,
    };
    return {
      cms: mergedCms,
      applications: parsed.applications || INITIAL_STORE.applications,
      leads: parsed.leads || INITIAL_STORE.leads,
      payments: parsed.payments || INITIAL_STORE.payments,
      contacts: parsed.contacts || INITIAL_STORE.contacts,
    };
  } catch (error) {
    console.error("Error reading local store, returning INITIAL_STORE:", error);
    return structuredClone(INITIAL_STORE);
  }
}

function writeLocalStore(store: FullDatabaseStore): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing local store:", error);
  }
}

export async function getStore(): Promise<FullDatabaseStore> {
  const pool = getPgPool();
  if (pool) {
    try {
      await ensurePgInitialized(pool);
      const res = await pool.query(`SELECT payload FROM cms_state_store WHERE id = 'main' LIMIT 1`);
      if (res.rows.length > 0 && res.rows[0].payload) {
        const pgData = res.rows[0].payload as FullDatabaseStore;
        pgData.cms = {
          ...INITIAL_STORE.cms,
          ...(pgData.cms || {}),
          teamSection:
            pgData.cms?.teamSection &&
            pgData.cms.teamSection.members?.length &&
            !pgData.cms.teamSection.members.some((m) => m.name.toLowerCase().includes("itegwa"))
              ? pgData.cms.teamSection
              : INITIAL_STORE.cms.teamSection,
          partnersSection:
            pgData.cms?.partnersSection?.partners?.some((p) => p.logoUrl)
              ? pgData.cms.partnersSection
              : INITIAL_STORE.cms.partnersSection,
          programme:
            pgData.cms?.programme?.days &&
            pgData.cms.programme.days.length <= 4 &&
            !pgData.cms.programme.days.some((d) => d.title?.toLowerCase().includes("arrival"))
              ? pgData.cms.programme
              : INITIAL_STORE.cms.programme,
        };
        return pgData;
      } else {
        const seed = readLocalStore();
        await pool.query(
          `INSERT INTO cms_state_store (id, payload, updated_at) VALUES ('main', $1, NOW()) ON CONFLICT (id) DO NOTHING`,
          [JSON.stringify(seed)]
        );
        return seed;
      }
    } catch (err) {
      console.warn("PostgreSQL read fallback to local store:", err);
    }
  }
  return readLocalStore();
}

export async function saveStore(store: FullDatabaseStore): Promise<FullDatabaseStore> {
  writeLocalStore(store);
  const pool = getPgPool();
  if (pool) {
    try {
      await ensurePgInitialized(pool);
      await pool.query(
        `INSERT INTO cms_state_store (id, payload, updated_at)
         VALUES ('main', $1, NOW())
         ON CONFLICT (id) DO UPDATE SET payload = EXCLUDED.payload, updated_at = NOW()`,
        [JSON.stringify(store)]
      );
    } catch (err) {
      console.warn("PostgreSQL write warning (saved to local store):", err);
    }
  }
  return store;
}

export async function updateCMSContent(partialCms: Partial<SiteCMSContent>): Promise<SiteCMSContent> {
  const store = await getStore();
  store.cms = {
    ...store.cms,
    ...partialCms,
  };
  await saveStore(store);
  return store.cms;
}

export async function addApplication(
  appData: Omit<ApplicationRecord, "id" | "createdAt" | "updatedAt">
): Promise<ApplicationRecord> {
  const store = await getStore();
  const id = `APP-2027-${Math.floor(1000 + Math.random() * 9000)}`;
  const now = new Date().toISOString();
  const newRecord: ApplicationRecord = {
    ...appData,
    id,
    createdAt: now,
    updatedAt: now,
  };
  store.applications.unshift(newRecord);

  // Also log as a lead automatically if not already in leads
  const existingLead = store.leads.find(
    (l) => l.email.toLowerCase() === appData.email.toLowerCase()
  );
  if (!existingLead) {
    store.leads.unshift({
      id: `LEAD-${Math.floor(1000 + Math.random() * 9000)}`,
      fullName: appData.fullName,
      email: appData.email,
      phone: appData.phone,
      country: appData.nationality || appData.countryOfResidence,
      interestType: appData.packageName,
      source: "Application Portal",
      status: "CONVERTED",
      notes: `Submitted full application (${id})`,
      createdAt: now,
    });
  }

  await saveStore(store);
  return newRecord;
}

export async function updateApplication(
  id: string,
  updates: Partial<ApplicationRecord>
): Promise<ApplicationRecord | null> {
  const store = await getStore();
  const idx = store.applications.findIndex((a) => a.id === id);
  if (idx === -1) return null;
  store.applications[idx] = {
    ...store.applications[idx],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  await saveStore(store);
  return store.applications[idx];
}

export async function addLead(
  leadData: Omit<LeadRecord, "id" | "createdAt" | "status">
): Promise<LeadRecord> {
  const store = await getStore();
  const newLead: LeadRecord = {
    ...leadData,
    id: `LEAD-${Math.floor(1000 + Math.random() * 9000)}`,
    status: "NEW",
    createdAt: new Date().toISOString(),
  };
  store.leads.unshift(newLead);
  await saveStore(store);
  return newLead;
}

export async function updateLead(
  id: string,
  updates: Partial<LeadRecord>
): Promise<LeadRecord | null> {
  const store = await getStore();
  const idx = store.leads.findIndex((l) => l.id === id);
  if (idx === -1) return null;
  store.leads[idx] = { ...store.leads[idx], ...updates };
  await saveStore(store);
  return store.leads[idx];
}

export async function createPayment(
  paymentData: Omit<PaymentRecord, "id" | "createdAt">
): Promise<PaymentRecord> {
  const store = await getStore();
  const newPayment: PaymentRecord = {
    ...paymentData,
    id: `PAY-${Math.floor(1000 + Math.random() * 9000)}`,
    createdAt: new Date().toISOString(),
  };
  store.payments.unshift(newPayment);
  await saveStore(store);
  return newPayment;
}

export async function verifyAndCompletePayment(
  reference: string,
  gatewayResponse?: string
): Promise<{ payment: PaymentRecord | null; application: ApplicationRecord | null }> {
  const store = await getStore();
  const payIdx = store.payments.findIndex((p) => p.reference === reference);
  if (payIdx === -1) {
    return { payment: null, application: null };
  }
  const now = new Date().toISOString();
  store.payments[payIdx].status = "SUCCESS";
  store.payments[payIdx].paidAt = now;
  store.payments[payIdx].gatewayResponse =
    gatewayResponse || `Verified via ${store.payments[payIdx].gateway.toUpperCase()}`;

  const payment = store.payments[payIdx];
  let updatedApp: ApplicationRecord | null = null;

  if (payment.applicationId) {
    const appIdx = store.applications.findIndex((a) => a.id === payment.applicationId);
    if (appIdx !== -1) {
      store.applications[appIdx].paymentStatus = "PAID";
      store.applications[appIdx].paymentReference = payment.reference;
      store.applications[appIdx].paymentGateway = payment.gateway;
      if (store.applications[appIdx].status === "PENDING_PAYMENT" || store.applications[appIdx].status === "LEAD") {
        store.applications[appIdx].status =
          payment.packageId.includes("scholarship") || payment.amount < 100
            ? "UNDER_REVIEW"
            : "ACCEPTED";
      }
      store.applications[appIdx].updatedAt = now;
      updatedApp = store.applications[appIdx];
    }
  }

  await saveStore(store);
  return { payment, application: updatedApp };
}

export async function addContactMessage(
  contactData: Omit<ContactRecord, "id" | "createdAt" | "status">
): Promise<ContactRecord> {
  const store = await getStore();
  const newContact: ContactRecord = {
    ...contactData,
    id: `MSG-${Math.floor(1000 + Math.random() * 9000)}`,
    status: "UNREAD",
    createdAt: new Date().toISOString(),
  };
  store.contacts.unshift(newContact);
  await saveStore(store);
  return newContact;
}

export async function updateContactMessage(
  id: string,
  updates: Partial<ContactRecord>
): Promise<ContactRecord | null> {
  const store = await getStore();
  const idx = store.contacts.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  store.contacts[idx] = { ...store.contacts[idx], ...updates };
  await saveStore(store);
  return store.contacts[idx];
}

export function isPostgresConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL && process.env.DATABASE_URL.trim() !== "");
}
