import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const year = searchParams.get("year") || new Date().getFullYear().toString();
  const month = searchParams.get("month"); // optional filter

  let query = supabase
    .from("transactions")
    .select("*")
    .eq("user_id", user.id)
    .gte("transaction_date", `${year}-01-01`)
    .lte("transaction_date", `${year}-12-31`)
    .order("transaction_date", { ascending: false });

  if (month) {
    const m = month.padStart(2, "0");
    query = query
      .gte("transaction_date", `${year}-${m}-01`)
      .lte("transaction_date", `${year}-${m}-31`);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ transactions: data });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
  }

  const body = await request.json();
  const { type, amount, description, category, document_number, transaction_date } = body;

  if (!type || !amount || !description || !transaction_date) {
    return NextResponse.json(
      { error: "Campuri obligatorii: tip, suma, descriere, data" },
      { status: 400 }
    );
  }

  if (type !== "incasare" && type !== "plata") {
    return NextResponse.json(
      { error: "Tipul trebuie sa fie 'incasare' sau 'plata'" },
      { status: 400 }
    );
  }

  if (typeof amount !== "number" || amount <= 0) {
    return NextResponse.json(
      { error: "Suma trebuie sa fie un numar pozitiv" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("transactions")
    .insert({
      user_id: user.id,
      type,
      amount,
      description,
      category: category || null,
      document_number: document_number || null,
      transaction_date,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ transaction: data }, { status: 201 });
}
