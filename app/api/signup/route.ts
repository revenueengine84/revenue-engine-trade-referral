import { NextRequest, NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  let body: { email?: string; company?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const email = body.email?.trim().slice(0, 254) ?? "";
  // Honeypot field — real users never fill this in, bots often do.
  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
  }

  const webhookUrl = process.env.GHL_INBOUND_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("GHL_INBOUND_WEBHOOK_URL is not configured; signup was not forwarded.", { email });
    return NextResponse.json({ ok: false, error: "Signups are temporarily unavailable. Please try again later." }, { status: 503 });
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        source: "revenue-engine-waitlist",
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
