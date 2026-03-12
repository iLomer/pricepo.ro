import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const VALID_DAYS = [1, 3, 7];

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("alert_preferences")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (error && error.code !== "PGRST116") {
    return NextResponse.json({ error: "Eroare la citirea preferintelor" }, { status: 500 });
  }

  // Return defaults if no preferences exist yet
  if (!data) {
    return NextResponse.json({
      email_alerts_enabled: true,
      alert_days_before: [7, 3, 1],
    });
  }

  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  }

  let body: {
    email_alerts_enabled?: boolean;
    alert_days_before?: number[];
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body invalid" }, { status: 400 });
  }

  // Validate input
  if (
    body.email_alerts_enabled !== undefined &&
    typeof body.email_alerts_enabled !== "boolean"
  ) {
    return NextResponse.json(
      { error: "email_alerts_enabled trebuie sa fie boolean" },
      { status: 400 }
    );
  }

  if (body.alert_days_before !== undefined) {
    if (!Array.isArray(body.alert_days_before)) {
      return NextResponse.json(
        { error: "alert_days_before trebuie sa fie un array" },
        { status: 400 }
      );
    }
    const allValid = body.alert_days_before.every((d: number) => VALID_DAYS.includes(d));
    if (!allValid) {
      return NextResponse.json(
        { error: "alert_days_before poate contine doar valorile: 1, 3, 7" },
        { status: 400 }
      );
    }
  }

  const updateData: Record<string, boolean | number[]> = {};
  if (body.email_alerts_enabled !== undefined) {
    updateData.email_alerts_enabled = body.email_alerts_enabled;
  }
  if (body.alert_days_before !== undefined) {
    updateData.alert_days_before = body.alert_days_before;
  }

  // Upsert: insert if not exists, update if exists
  const { data, error } = await supabase
    .from("alert_preferences")
    .upsert(
      {
        user_id: user.id,
        ...updateData,
      },
      { onConflict: "user_id" }
    )
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { error: "Eroare la salvarea preferintelor" },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}
