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
    const body = await req.json();
    const { email, password } = body;

    const validPassword = process.env.CMS_ADMIN_PASSWORD || "admin2027";
    const validEmail = process.env.CMS_ADMIN_EMAIL || "admin@worlddisastercenter.org";

    const isEmailMatch =
      !email ||
      email.toLowerCase().trim() === validEmail.toLowerCase() ||
      email.toLowerCase().trim() === "admin";

    if (isEmailMatch && password === validPassword) {
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
    }

    return NextResponse.json(
      { error: "Invalid administrator email or password." },
      { status: 401 }
    );
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
