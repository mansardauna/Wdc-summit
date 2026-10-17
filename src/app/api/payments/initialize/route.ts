import { NextRequest, NextResponse } from "next/server";
import { createPayment, getStore } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      applicationId,
      packageId,
      customerName,
      customerEmail,
      customerPhone,
      country,
      gateway,
    } = body;

    if (!customerName || !customerEmail || !packageId) {
      return NextResponse.json(
        { error: "Customer name, email, and package selection are required." },
        { status: 400 }
      );
    }

    const store = await getStore();
    const pkg =
      store.cms.packages.find((p) => p.id === packageId || p.slug === packageId) ||
      store.cms.packages[0];

    const selectedGateway: "paystack" | "flutterwave" =
      gateway === "flutterwave" ? "flutterwave" : "paystack";

    const prefix = selectedGateway === "paystack" ? "PSK" : "FLW";
    const reference = `${prefix}-WDC-${Date.now().toString().slice(-6)}-${Math.floor(
      100 + Math.random() * 900
    )}`;

    const payment = await createPayment({
      reference,
      applicationId: applicationId || undefined,
      customerName,
      customerEmail,
      customerPhone: customerPhone || "",
      country: country || "",
      packageId: pkg.id,
      packageName: pkg.name,
      amount: pkg.price,
      currency: pkg.currency || "USD",
      gateway: selectedGateway,
      status: "PENDING",
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin;
    const paystackSecret =
      store.cms.settings.paystackSecretKey || process.env.PAYSTACK_SECRET_KEY || "";
    const flutterwaveSecret =
      store.cms.settings.flutterwaveSecretKey || process.env.FLUTTERWAVE_SECRET_KEY || "";
    const isLiveMode = store.cms.settings.paymentMode === "live";

    // Attempt live Paystack API initialization if configured in live mode
    if (selectedGateway === "paystack" && isLiveMode && paystackSecret.startsWith("sk_")) {
      try {
        const psRes = await fetch("https://api.paystack.co/transaction/initialize", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${paystackSecret}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: customerEmail,
            amount: Math.round(pkg.price * 100),
            reference,
            callback_url: `${appUrl}/payment?verify=${reference}&gateway=paystack`,
            metadata: {
              customer_name: customerName,
              package_name: pkg.name,
              application_id: applicationId || "",
            },
          }),
        });
        const psData = await psRes.json();
        if (psData.status && psData.data?.authorization_url) {
          return NextResponse.json({
            success: true,
            mode: "live_redirect",
            authorizationUrl: psData.data.authorization_url,
            reference,
            payment,
          });
        }
      } catch (err) {
        console.warn("Paystack live init fallback to interactive checkout:", err);
      }
    }

    // Attempt live Flutterwave API initialization if configured in live mode
    if (selectedGateway === "flutterwave" && isLiveMode && flutterwaveSecret.startsWith("FLWSECK")) {
      try {
        const flwRes = await fetch("https://api.flutterwave.com/v3/payments", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${flutterwaveSecret}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tx_ref: reference,
            amount: pkg.price,
            currency: pkg.currency || "USD",
            redirect_url: `${appUrl}/payment?verify=${reference}&gateway=flutterwave`,
            customer: {
              email: customerEmail,
              name: customerName,
              phonenumber: customerPhone || "",
            },
            customizations: {
              title: "World Disaster Center Youth Leader Summit 2027",
              description: pkg.name,
            },
          }),
        });
        const flwData = await flwRes.json();
        if (flwData.status === "success" && flwData.data?.link) {
          return NextResponse.json({
            success: true,
            mode: "live_redirect",
            authorizationUrl: flwData.data.link,
            reference,
            payment,
          });
        }
      } catch (err) {
        console.warn("Flutterwave live init fallback to interactive checkout:", err);
      }
    }

    // Interactive checkout mode (works immediately in Sandbox or when keys aren't set yet)
    return NextResponse.json({
      success: true,
      mode: "interactive_modal",
      reference,
      payment,
      gateway: selectedGateway,
    });
  } catch (error) {
    console.error("POST /api/payments/initialize error:", error);
    return NextResponse.json(
      { error: "Failed to initialize payment." },
      { status: 500 }
    );
  }
}
