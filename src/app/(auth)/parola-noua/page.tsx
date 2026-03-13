"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

export default function NewPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Parola trebuie sa aiba cel putin 8 caractere");
      return;
    }

    if (password !== confirmPassword) {
      setError("Parolele nu coincid");
      return;
    }

    setIsLoading(true);
    const supabase = createClient();

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError("A aparut o eroare. Te rugam sa incerci din nou.");
      setIsLoading(false);
      return;
    }

    setSuccess(true);
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
            Parola noua
          </h1>
          <p className="mt-2 text-sm text-secondary-500">
            Alege o parola noua pentru contul tau.
          </p>
        </div>

        {success ? (
          <div className="rounded-lg border border-accent-200 bg-accent-50 p-4 text-center">
            <p className="text-sm text-accent-700">
              Parola a fost schimbata cu succes.
            </p>
            <Link
              href="/panou"
              className="mt-4 inline-block rounded-lg bg-secondary-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-secondary-800"
            >
              Mergi la panou
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
              <label htmlFor="password" className="block text-sm font-medium text-secondary-700 mb-1">
                Parola noua
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 caractere"
                autoComplete="new-password"
                className="w-full rounded-lg border border-secondary-300 bg-white px-3 py-2.5 text-secondary-900 shadow-sm placeholder:text-secondary-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-secondary-700 mb-1">
                Confirma parola
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeta parola"
                autoComplete="new-password"
                className="w-full rounded-lg border border-secondary-300 bg-white px-3 py-2.5 text-secondary-900 shadow-sm placeholder:text-secondary-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-secondary-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-secondary-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Se salveaza..." : "Salveaza parola noua"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
