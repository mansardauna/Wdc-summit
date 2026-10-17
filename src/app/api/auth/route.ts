import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "wdc_cms_session";
const SESSION_TOKEN = "wdc_authenticated_admin_2027";

export async function GET(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  return NextResponse.json({
    authenticated: token === SESSION_TOKEN,
  });
}

export async function POST(req: NextRequest) {
  try {
    // Accept any credentials/password
    await req.json().catch(() => ({}));

    const res = NextResponse.json({
      success: true,
      authenticated: true,
    });
    res.cookies.set(COOKIE_NAME, SESSION_TOKEN, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return res;
  } catch {
    return NextResponse.json(
      { error: "Authentication request failed." },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const res = NextResponse.json({ success: true, authenticated: false });
  res.cookies.delete(COOKIE_NAME);
  return res;
}
