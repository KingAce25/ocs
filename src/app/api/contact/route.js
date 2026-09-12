import { NextResponse } from "next/server";
import { createClient } from "@@/lib/supabase/server";
import { createAdminClient } from "@@/lib/supabase/admin";

const REASONS = new Set([
  "General enquiry",
  "Enlistment / joining OCS",
  "Event registration",
  "Media submission",
  "Chapter information",
  "Other",
]);

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const { name, email, chapter, reason, message } = body ?? {};

  if (!name?.trim() || !email?.trim() || !reason || !message?.trim()) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Invalid email address." },
      { status: 400 },
    );
  }
  if (!REASONS.has(reason)) {
    return NextResponse.json({ error: "Invalid reason." }, { status: 400 });
  }
  if (message.trim().length < 20) {
    return NextResponse.json({ error: "Message too short." }, { status: 400 });
  }

  const supabase = await createClient();

  // 1. Store in Supabase — public insert policy covers this, user-context client is fine
  const { error: insertError } = await supabase
    .from("contact_submissions")
    .insert({
      name: name.trim(),
      email: email.trim(),
      chapter: chapter || null,
      reason,
      message: message.trim(),
    });

  if (insertError) {
    console.error("contact_submissions insert failed:", insertError.message);
    return NextResponse.json(
      { error: "Could not save your message." },
      { status: 500 },
    );
  }

  // 2. Notify admins — use the service-role client since an anonymous
  // visitor has no RLS access to read profiles.
  const adminSupabase = createAdminClient();

  const { data: settings, error: settingsError } = await adminSupabase
    .from("site_settings")
    .select("notify_contact_form")
    .eq("id", 1)
    .single();

  if (settingsError) {
    console.error("Failed to fetch site_settings:", settingsError.message);
  } else if (settings?.notify_contact_form) {
    const { data: admins, error: adminsError } = await adminSupabase
      .from("profiles")
      .select("email")
      .in("role", ["super_admin", "admin"])
      .not("email", "is", null);

    if (adminsError) {
      console.error("Failed to fetch admin emails:", adminsError.message);
    } else if (admins?.length) {
      try {
        await sendNotificationEmail({
          to: admins.map((a) => a.email),
          name,
          email,
          chapter,
          reason,
          message,
        });
      } catch (emailError) {
        // Don't fail the request — the submission is already saved
        console.error("Notification email failed:", emailError);
      }
    } else {
      console.warn(
        "notify_contact_form is on but no admin profiles have an email set.",
      );
    }
  }

  return NextResponse.json({ ok: true });
}

async function sendNotificationEmail({
  to,
  name,
  email,
  chapter,
  reason,
  message,
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not set — skipping notification email.");
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "OCS Website <noreply@ocs.org>",
      to,
      reply_to: email,
      subject: `New contact form submission — ${reason}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Chapter: ${chapter || "—"}`,
        `Reason: ${reason}`,
        "",
        message,
      ].join("\n"),
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Resend API error (${res.status}): ${text}`);
  }
}
