import { NextResponse } from "next/server";
import { getBrevo } from "@/lib/email/brevo";

interface FeedbackRequestBody {
  message: string;
  email?: string;
  page?: string;
}

export async function POST(request: Request) {
  let body: FeedbackRequestBody;

  try {
    body = (await request.json()) as FeedbackRequestBody;
  } catch {
    return NextResponse.json(
      { error: "Cererea nu este valida." },
      { status: 400 }
    );
  }

  const { message, email, page } = body;

  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return NextResponse.json(
      { error: "Mesajul este obligatoriu." },
      { status: 400 }
    );
  }

  if (message.trim().length > 2000) {
    return NextResponse.json(
      { error: "Mesajul este prea lung (max 2000 caractere)." },
      { status: 400 }
    );
  }

  const brevo = getBrevo();
  const replyTo = email?.trim() || undefined;

  try {
    await brevo.transactionalEmails.sendTransacEmail({
      sender: { email: "contact@prevo.ro", name: "Prevo Feedback" },
      to: [{ email: "lomer.ionut@gmail.com" }],
      replyTo: replyTo ? { email: replyTo } : undefined,
      subject: `Feedback Prevo: ${page || "/"}`,
      htmlContent: `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:560px">
        <p style="font-size:15px;color:#1c1917;white-space:pre-wrap">${message.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
        <hr style="border:none;border-top:1px solid #e7e5e4;margin:20px 0" />
        <p style="font-size:12px;color:#a8a29e">Email: ${replyTo || "nu a fost furnizat"}</p>
        <p style="font-size:12px;color:#a8a29e">Pagina: ${page || "/"}</p>
      </div>`,
    });
  } catch {
    return NextResponse.json(
      { error: "A aparut o eroare. Te rugam sa incerci din nou." },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "Multumim pentru feedback!" },
    { status: 201 }
  );
}
