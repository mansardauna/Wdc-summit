import { NextRequest, NextResponse } from "next/server";
import { addApplication, getStore } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName,
      email,
      phone,
      nationality,
      countryOfResidence,
      age,
      dateOfBirth,
      categoryProfile,
      organizationOrUniversity,
      packageId,
      scholarshipPreference,
      speakerSlotInterest,
      speakerTopic,
      motivationStatement,
      declarationInterest,
      dietaryOrAccessibility,
      referralSource,
    } = body;

    if (!fullName || !email || !nationality) {
      return NextResponse.json(
        { error: "Full name, email, and nationality are required." },
        { status: 400 }
      );
    }

    const store = await getStore();
    const selectedPkg =
      store.cms.packages.find((p) => p.id === packageId) || store.cms.packages[0];

    const record = await addApplication({
      fullName,
      email,
      phone: phone || "",
      nationality,
      countryOfResidence: countryOfResidence || nationality,
      age: Number(age) || 22,
      dateOfBirth: dateOfBirth || "",
      categoryProfile: categoryProfile || "Youth Leader (18–30)",
      organizationOrUniversity: organizationOrUniversity || "",
      packageId: selectedPkg.id,
      packageName: selectedPkg.name,
      amount: selectedPkg.price,
      scholarshipPreference: scholarshipPreference || "All 3 Funded Tiers",
      speakerSlotInterest: Boolean(speakerSlotInterest),
      speakerTopic: speakerTopic || "",
      motivationStatement: motivationStatement || "",
      declarationInterest: declarationInterest || "Climate Resilience & Policy",
      dietaryOrAccessibility: dietaryOrAccessibility || "None",
      referralSource: referralSource || "Direct Website",
      status: "PENDING_PAYMENT",
      paymentStatus: "UNPAID",
    });

    return NextResponse.json({
      success: true,
      application: record,
    });
  } catch (error) {
    console.error("POST /api/applications error:", error);
    return NextResponse.json(
      { error: "Could not submit application." },
      { status: 500 }
    );
  }
}
