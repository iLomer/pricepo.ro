import { NextResponse } from "next/server";
import { createClient as createServerClient } from "@supabase/supabase-js";
import { getAllPFADeadlines } from "@/lib/fiscal";
import { getBrevo } from "@/lib/email/brevo";
import { buildDeadlineAlertEmail } from "@/lib/email/templates";
import type { AlertPreference, FiscalProfile } from "@/types";

/**
 * GET /api/alerts/send
 *
 * Called by Vercel Cron daily at 07:00 UTC.
 * Checks all users with alerts enabled, finds deadlines within configured
 * days-before window, and sends email reminders via Resend.
 */
export async function GET(request: Request) {
  // Vercel Cron sends CRON_SECRET via Authorization header
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    return NextResponse.json({ error: "CRON_SECRET nu este configurat" }, { status: 500 });
  }

  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  }

  // Use service role client so we can read all users and use admin API
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

  // Get all users with email alerts enabled
  const { data: preferences, error: prefError } = await supabase
    .from("alert_preferences")
    .select("*")
    .eq("email_alerts_enabled", true);

  if (prefError) {
    return NextResponse.json(
      { error: "Eroare la citirea preferintelor" },
      { status: 500 }
    );
  }

  if (!preferences || preferences.length === 0) {
    return NextResponse.json({
      message: "Niciun utilizator cu alerte activate",
      emailsSent: 0,
    });
  }

  const allDeadlines = getAllPFADeadlines();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const emailsToSend: Array<{
    userId: string;
    deadlineName: string;
    deadlineDate: string;
    daysUntil: number;
  }> = [];

  for (const pref of preferences as AlertPreference[]) {
    // Get user's fiscal profile to filter deadlines
    const { data: profile } = await supabase
      .from("fiscal_profiles")
      .select("regime, tva_status")
      .eq("id", pref.user_id)
      .single();

    if (!profile) continue;

    const typedProfile = profile as Pick<FiscalProfile, "regime" | "tva_status">;
    const tvaStatus = typedProfile.tva_status ? "platitor" : "neplatitor";

    for (const deadline of allDeadlines) {
      // Check regime applicability
      if (
        deadline.applicableRegimes.length > 0 &&
        !deadline.applicableRegimes.includes(typedProfile.regime)
      ) {
        continue;
      }

      // Check TVA status
      if (
        deadline.applicableTVAStatuses.length > 0 &&
        !deadline.applicableTVAStatuses.includes(tvaStatus)
      ) {
        continue;
      }

      // Check if deadline is within any of the configured alert windows
      const daysUntil = Math.ceil(
        (deadline.date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysUntil > 0 && pref.alert_days_before.includes(daysUntil)) {
        emailsToSend.push({
          userId: pref.user_id,
          deadlineName: deadline.name,
          deadlineDate: deadline.date.toLocaleDateString("ro-RO"),
          daysUntil,
        });
      }
    }
  }

  // Group emails by user
  const emailsByUser = new Map<string, typeof emailsToSend>();
  for (const entry of emailsToSend) {
    const list = emailsByUser.get(entry.userId) ?? [];
    list.push(entry);
    emailsByUser.set(entry.userId, list);
  }

  // Fetch user emails and send via Brevo
  const brevo = getBrevo();
  let sent = 0;

  for (const [userId, deadlines] of emailsByUser) {
    // Get user email from auth.users via admin API
    const { data: { user } } = await supabase.auth.admin.getUserById(userId);
    if (!user?.email) continue;

    const html = buildDeadlineAlertEmail(
      deadlines.map((d) => ({
        deadlineName: d.deadlineName,
        deadlineDate: d.deadlineDate,
        daysUntil: d.daysUntil,
      }))
    );

    const subject =
      deadlines.length === 1
        ? `${deadlines[0].deadlineName} — ${deadlines[0].daysUntil} ${deadlines[0].daysUntil === 1 ? "zi ramasa" : "zile ramase"}`
        : `${deadlines.length} termene fiscale se apropie`;

    try {
      await brevo.transactionalEmails.sendTransacEmail({
        sender: { email: "contact@prevo.ro", name: "Prevo" },
        to: [{ email: user.email }],
        subject,
        htmlContent: html,
      });
      sent++;
    } catch {
      // Continue sending to other users if one fails
    }
  }

  return NextResponse.json({
    message: `Procesat ${emailsToSend.length} alerte, trimise ${sent} emailuri`,
    emailsSent: sent,
  });
}
