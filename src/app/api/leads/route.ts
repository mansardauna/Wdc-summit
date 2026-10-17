import { NextRequest, NextResponse } from "next/server";
import { addLead } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, phone, country, interestType, source, notes } = body;

    if (!fullName || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    const lead = await addLead({
      fullName,
      email,
      phone: phone || "",
      country: country || "International",
      interestType: interestType || "Scholarship & Summit Prospectus",
      source: source || "Website Lead Capture",
      notes: notes || "",
    });

    return NextResponse.json({
      success: true,
      lead,
    });
  } catch (error) {
    console.error("POST /api/leads error:", error);
    return NextResponse.json(
      { error: "Failed to save lead." },
      { status: 500 }
    );
  }
}
