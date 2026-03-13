import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getChecklistById } from "@/lib/checklists";

export async function GET(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  }

  const url = new URL(request.url);
  const checklistId = url.searchParams.get("checklistId");

  if (!checklistId) {
    return NextResponse.json(
      { error: "checklistId este obligatoriu" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("checklist_progress")
    .select("*")
    .eq("user_id", user.id)
    .eq("checklist_id", checklistId)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    completedSteps: data?.completed_steps ?? [],
    dismissed: data?.dismissed ?? false,
  });
}

export async function PUT(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  }

  let body: { checklistId: string; stepId?: string; dismissed?: boolean };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Cererea nu este valida." },
      { status: 400 }
    );
  }

  const { checklistId, stepId, dismissed } = body;

  if (!checklistId) {
    return NextResponse.json(
      { error: "checklistId este obligatoriu" },
      { status: 400 }
    );
  }

  // Validate checklist exists
  const template = getChecklistById(checklistId);
  if (!template) {
    return NextResponse.json(
      { error: "Checklist invalid" },
      { status: 400 }
    );
  }

  // Get current progress
  const { data: existing } = await supabase
    .from("checklist_progress")
    .select("*")
    .eq("user_id", user.id)
    .eq("checklist_id", checklistId)
    .maybeSingle();

  const currentSteps: string[] = (existing?.completed_steps as string[]) ?? [];

  // Handle dismiss
  if (dismissed !== undefined) {
    if (existing) {
      const { error } = await supabase
        .from("checklist_progress")
        .update({ dismissed, updated_at: new Date().toISOString() })
        .eq("user_id", user.id)
        .eq("checklist_id", checklistId);

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    } else {
      const { error } = await supabase
        .from("checklist_progress")
        .insert({
          user_id: user.id,
          checklist_id: checklistId,
          completed_steps: [],
          dismissed,
        });

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }

    return NextResponse.json({ dismissed });
  }

  // Handle step toggle
  if (!stepId) {
    return NextResponse.json(
      { error: "stepId sau dismissed este obligatoriu" },
      { status: 400 }
    );
  }

  // Validate step exists in template
  if (!template.steps.some((s) => s.id === stepId)) {
    return NextResponse.json(
      { error: "Step invalid" },
      { status: 400 }
    );
  }

  // Toggle step
  const updatedSteps = currentSteps.includes(stepId)
    ? currentSteps.filter((s) => s !== stepId)
    : [...currentSteps, stepId];

  if (existing) {
    const { error } = await supabase
      .from("checklist_progress")
      .update({
        completed_steps: updatedSteps,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id)
      .eq("checklist_id", checklistId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  } else {
    const { error } = await supabase
      .from("checklist_progress")
      .insert({
        user_id: user.id,
        checklist_id: checklistId,
        completed_steps: updatedSteps,
      });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ completedSteps: updatedSteps });
}
