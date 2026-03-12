import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("deadline_completions")
    .select("deadline_id")
    .eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ error: "Eroare server" }, { status: 500 });
  }

  return NextResponse.json({
    completedIds: (data ?? []).map((r) => r.deadline_id),
  });
}

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  }

  let body: { deadlineId: string; completed: boolean };
  try {
    body = (await request.json()) as { deadlineId: string; completed: boolean };
  } catch {
    return NextResponse.json({ error: "Cerere invalida" }, { status: 400 });
  }

  const { deadlineId, completed } = body;

  if (!deadlineId || typeof deadlineId !== "string") {
    return NextResponse.json({ error: "deadlineId lipseste" }, { status: 400 });
  }

  if (completed) {
    const { error } = await supabase.from("deadline_completions").upsert(
      { user_id: user.id, deadline_id: deadlineId },
      { onConflict: "user_id,deadline_id" }
    );
    if (error) {
      return NextResponse.json({ error: "Eroare server" }, { status: 500 });
    }
  } else {
    const { error } = await supabase
      .from("deadline_completions")
      .delete()
      .eq("user_id", user.id)
      .eq("deadline_id", deadlineId);
    if (error) {
      return NextResponse.json({ error: "Eroare server" }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}
