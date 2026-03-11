import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getAllPFADeadlines } from "@/lib/fiscal";
import type { AlertPreference, FiscalProfile } from "@/types";

/**
 * POST /api/alerts/send
 *
 * Designed to be called by a cron job (Vercel Cron or Supabase Edge Function).
 * Checks all users with alerts enabled, finds deadlines within configured
 * days-before window, and logs the email content.
 *
 * Placeholder implementation -- actual email sending requires Resend API key.
 * When ready, replace the logging with actual Resend API calls.
 */
export async function POST(request: Request) {
  // Simple API key check for cron jobs
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  }

  const supabase = await createClient();

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

  // Placeholder: log emails instead of sending
  // TODO: Replace with actual Resend API integration
  for (const email of emailsToSend) {
    // In production, this would call Resend API:
    // await resend.emails.send({
    //   from: 'Fiskio <alerte@pricepo.ro>',
    //   to: [userEmail],
    //   subject: `Fiskio: ${email.deadlineName} - ${email.daysUntil} zile ramase`,
    //   html: `...`
    // });

    // Placeholder logging (server-side only, not console.log in client code)
    if (process.env.NODE_ENV === "development") {
      console.info(
        `[ALERT PLACEHOLDER] User ${email.userId}: ${email.deadlineName} on ${email.deadlineDate} (${email.daysUntil} days)`
      );
    }
  }

  return NextResponse.json({
    message: `Procesat ${emailsToSend.length} alerte`,
    emailsSent: emailsToSend.length,
    details: emailsToSend,
  });
}
