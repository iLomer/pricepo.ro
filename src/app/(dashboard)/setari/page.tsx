"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function SettingsPage() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user?.email) setEmail(user.email);
    });
  }, []);

  async function handlePasswordChange(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);

    if (newPassword.length < 8) {
      setMessage({ type: "error", text: "Parola trebuie sa aiba cel putin 8 caractere" });
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "Parolele nu coincid" });
      return;
    }

    setIsLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      setMessage({ type: "error", text: "A aparut o eroare. Te rugam sa incerci din nou." });
    } else {
      setMessage({ type: "success", text: "Parola a fost schimbata cu succes." });
      setNewPassword("");
      setConfirmPassword("");
    }
    setIsLoading(false);
  }

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="text-2xl font-bold text-secondary-900 mb-6">Setari cont</h1>

      <div className="rounded-xl border border-secondary-200 bg-white p-6 mb-6">
        <h2 className="text-lg font-semibold text-secondary-900 mb-4">Email</h2>
        <p className="text-sm text-secondary-600">{email}</p>
      </div>

      <div className="rounded-xl border border-secondary-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-secondary-900 mb-4">Schimba parola</h2>

        {message && (
          <div
            className={`mb-4 rounded-lg border p-3 text-sm ${
              message.type === "success"
                ? "border-accent-200 bg-accent-50 text-accent-700"
                : "border-error-200 bg-error-50 text-error-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-secondary-700 mb-1">
              Parola noua
            </label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Minimum 8 caractere"
              autoComplete="new-password"
              className="w-full rounded-lg border border-secondary-300 bg-white px-3 py-2.5 text-secondary-900 shadow-sm placeholder:text-secondary-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            />
          </div>

          <div>
            <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-secondary-700 mb-1">
              Confirma parola noua
            </label>
            <input
              id="confirmNewPassword"
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
            className="rounded-lg bg-secondary-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-secondary-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Se salveaza..." : "Schimba parola"}
          </button>
        </form>
      </div>
    </div>
  );
}
