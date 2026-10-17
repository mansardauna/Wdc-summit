import { NextRequest, NextResponse } from "next/server";
import { verifyAndCompletePayment } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { reference, gatewayResponse } = body;

    if (!reference) {
      return NextResponse.json({ error: "Payment reference is required." }, { status: 400 });
    }

    const result = await verifyAndCompletePayment(reference, gatewayResponse);
    if (!result.payment) {
      return NextResponse.json({ error: "Payment record not found." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      payment: result.payment,
      application: result.application,
    });
  } catch (error) {
    console.error("POST /api/payments/verify error:", error);
    return NextResponse.json({ error: "Failed to verify payment." }, { status: 500 });
  }
}
