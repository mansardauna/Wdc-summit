# Wdc-summit

**World Disaster Center · Youth Leader Summit 2027 (Cape Town, South Africa)**

Full-stack Next.js 15 platform featuring:
- **Interactive Global Telemetry Map & 3D Globe Hero** (`GlobalTelemetryHeroMap`)
- **Responsive Card Sliders** (`CardSlider`) across mobile, tablet, and desktop
- **Multi-Page Summit Architecture**:
  - `/` — Landing Page (Hero, Stats Banner, Why Attend Slider, Quick Portal Slider, Lead Capture)
  - `/summit` — About the Summit, Six Pillars of Resilience Slider & Host City (Cape Town)
  - `/declaration` — The WDC Global Environmental Protection Declaration
  - `/programme` — 5-Day Cape Town Schedule Slider, 20 Delegate Speaker Slots & Eligibility
  - `/packages` — Scholarship Programme ($16.99), Paid Packages ($749 / $349 / $99) & FAQ Accordion
  - `/partners` — Partner Organisations & Long-Term Impact
  - `/apply` — Delegate & Scholarship Application Portal
  - `/payment` — Paystack & Flutterwave Checkout & Printable Official Receipt
  - `/contact` — Delegate Relations & Support Desk
  - `/admin/login` & `/admin` — Protected Central CMS Dashboard (Content, Packages, Applications, Leads, Payments, Contacts, Gateway API Keys)
- **Database Support**: Hybrid PostgreSQL / Supabase (`supabase/schema.sql`) + automatic local JSON store (`data/cms-store.json`).
