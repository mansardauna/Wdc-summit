import { NextRequest, NextResponse } from "next/server";
import { addContactMessage } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, phone, country, subject, category, message } = body;

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const contact = await addContactMessage({
      fullName,
      email,
      phone: phone || "",
      country: country || "",
      subject: subject || `${category || "General"} Inquiry from ${fullName}`,
      category: category || "General Inquiry",
      message,
    });

    return NextResponse.json({
      success: true,
      contact,
    });
  } catch (error) {
    console.error("POST /api/contact error:", error);
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 }
    );
  }
}
