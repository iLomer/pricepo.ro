"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("Emailul este obligatoriu");
      return;
    }

    setIsLoading(true);
    const supabase = createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/parola-noua`,
    });

    if (error) {
      setError("A aparut o eroare. Te rugam sa incerci din nou.");
      setIsLoading(false);
      return;
    }

    setSent(true);
    setIsLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary-50 px-4">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <div className="mb-6 flex justify-center">
            <Logo size="lg" className="text-secondary-900" />
          </div>
          <h1 className="text-2xl font-bold text-secondary-900">
            Reseteaza parola
          </h1>
          <p className="mt-2 text-sm text-secondary-500">
            Introdu emailul asociat contului tau si iti trimitem un link de resetare.
          </p>
        </div>

        {sent ? (
          <div className="rounded-lg border border-accent-200 bg-accent-50 p-4 text-center">
            <p className="text-sm text-accent-700">
              Am trimis un email la <strong>{email}</strong> cu un link de resetare a parolei. Verifica si folderul de spam.
            </p>
            <Link
              href="/autentificare"
              className="mt-4 inline-block text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              Inapoi la autentificare
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {error && (
              <div className="rounded-lg border border-error-200 bg-error-50 p-3 text-sm text-error-700">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemplu@email.com"
                autoComplete="email"
                className="w-full rounded-lg border border-secondary-300 bg-white px-3 py-2.5 text-secondary-900 shadow-sm placeholder:text-secondary-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-secondary-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-secondary-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Se trimite..." : "Trimite linkul de resetare"}
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-secondary-500">
          <Link href="/autentificare" className="font-medium text-primary-600 hover:text-primary-700">
            Inapoi la autentificare
          </Link>
        </p>
      </div>
    </div>
  );
}
