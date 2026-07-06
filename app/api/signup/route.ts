import { NextRequest, NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_DIGITS_RE = /\d/g;

export async function POST(request: NextRequest) {
  let body: { name?: string; email?: string; phone?: string; industry?: string; company?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const name = body.name?.trim().slice(0, 150) ?? "";
  const email = body.email?.trim().slice(0, 254) ?? "";
  const phone = body.phone?.trim().slice(0, 30) ?? "";
  const industry = body.industry?.trim().slice(0, 100) ?? "";

  // Honeypot field — real users never fill this in, bots often do.
  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  if (!name) {
    return NextResponse.json({ ok: false, error: "Please enter your full name." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
  }
  const phoneDigits = phone.match(PHONE_DIGITS_RE)?.length ?? 0;
  if (phoneDigits < 7) {
    return NextResponse.json({ ok: false, error: "Please enter a valid phone number." }, { status: 400 });
  }
  if (!industry) {
    return NextResponse.json({ ok: false, error: "Please select your industry." }, { status: 400 });
  }

  const webhookUrl = process.env.GHL_INBOUND_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("GHL_INBOUND_WEBHOOK_URL is not configured; signup was not forwarded.", { email });
    return NextResponse.json({ ok: false, error: "Signups are temporarily unavailable. Please try again later." }, { status: 503 });
  }

  const [firstName, ...rest] = name.split(/\s+/);
  const lastName = rest.join(" ");

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        fullName: name,
        email,
        phone,
        industry,
        source: "vouch-waitlist",
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!res.ok) {
      console.error("GHL webhook rejected the signup.", { status: res.status });
      return NextResponse.json({ ok: false, error: "Something went wrong. Please try again." }, { status: 502 });
    }
  } catch (err) {
    console.error("Failed to reach GHL webhook.", err);
    return NextResponse.json({ ok: false, error: "Something went wrong. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
