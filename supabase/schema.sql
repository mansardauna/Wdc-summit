-- Supabase / PostgreSQL Schema for World Disaster Center Youth Leader Summit 2027 CMS
-- Run this in your Supabase SQL Editor or PostgreSQL database.
-- Note: The application also auto-initializes these tables when DATABASE_URL is provided.

CREATE TABLE IF NOT EXISTS cms_content (
  id TEXT PRIMARY KEY DEFAULT 'main',
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS applications (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  nationality TEXT NOT NULL,
  country_of_residence TEXT NOT NULL,
  age INTEGER,
  date_of_birth TEXT,
  category_profile TEXT NOT NULL,
  organization_or_university TEXT,
  package_id TEXT NOT NULL,
  package_name TEXT NOT NULL,
  amount NUMERIC(10, 2) NOT NULL,
  scholarship_preference TEXT,
  speaker_slot_interest BOOLEAN DEFAULT FALSE,
  speaker_topic TEXT,
  motivation_statement TEXT NOT NULL,
  declaration_interest TEXT,
  dietary_or_accessibility TEXT,
  referral_source TEXT,
  status TEXT NOT NULL DEFAULT 'PENDING_PAYMENT',
  payment_status TEXT NOT NULL DEFAULT 'UNPAID',
  payment_reference TEXT,
  payment_gateway TEXT,
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  country TEXT,
  interest_type TEXT NOT NULL DEFAULT 'General Summit Interest',
  source TEXT NOT NULL DEFAULT 'Website Lead Form',
  status TEXT NOT NULL DEFAULT 'NEW',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS payments (
  id TEXT PRIMARY KEY,
  reference TEXT UNIQUE NOT NULL,
  application_id TEXT,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  country TEXT,
  package_id TEXT NOT NULL,
  package_name TEXT NOT NULL,
  amount NUMERIC(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  gateway TEXT NOT NULL, -- 'paystack' | 'flutterwave'
  status TEXT NOT NULL DEFAULT 'PENDING', -- 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED'
  gateway_response TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  paid_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS contacts (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  country TEXT,
  subject TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'General Inquiry',
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'UNREAD', -- 'UNREAD' | 'READ' | 'REPLIED' | 'ARCHIVED'
  admin_reply_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
