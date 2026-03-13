"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { EntityType, FiscalRegime } from "@/types";

const ENTITY_OPTIONS: { value: EntityType; label: string }[] = [
  { value: "pfa", label: "PFA" },
  { value: "srl", label: "SRL" },
];

const PFA_REGIME_OPTIONS: { value: FiscalRegime; label: string }[] = [
  { value: "norma_venit", label: "Norma de venit" },
  { value: "sistem_real", label: "Sistem real" },
];

const SRL_REGIME_OPTIONS: { value: FiscalRegime; label: string }[] = [
  { value: "micro_1", label: "Micro 1%" },
];

interface ProfileData {
  entity_type: EntityType;
  regime: FiscalRegime;
  tva_status: boolean;
  caen_code: string;
  caen_description: string | null;
}

export default function SettingsPage() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [profileMsg, setProfileMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) setEmail(user.email);

      if (user) {
        const { data } = await supabase
          .from("fiscal_profiles")
          .select("entity_type, regime, tva_status, caen_code, caen_description")
          .eq("id", user.id)
          .single();

        if (data) {
          setProfile(data as ProfileData);
        }
      }
      setLoading(false);
    }

    load();
  }, []);

  async function handlePasswordChange(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPasswordMsg(null);

    if (newPassword.length < 8) {
      setPasswordMsg({ type: "error", text: "Parola trebuie sa aiba cel putin 8 caractere" });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: "error", text: "Parolele nu coincid" });
      return;
    }

    setIsPasswordLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      setPasswordMsg({ type: "error", text: "A aparut o eroare. Te rugam sa incerci din nou." });
    } else {
      setPasswordMsg({ type: "success", text: "Parola a fost schimbata cu succes." });
      setNewPassword("");
      setConfirmPassword("");
    }
    setIsPasswordLoading(false);
  }

  async function handleProfileSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!profile) return;

    setProfileMsg(null);
    setIsProfileLoading(true);

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setProfileMsg({ type: "error", text: "Nu esti autentificat." });
      setIsProfileLoading(false);
      return;
    }

    const { error } = await supabase
      .from("fiscal_profiles")
      .update({
        entity_type: profile.entity_type,
        regime: profile.regime,
        tva_status: profile.tva_status,
        caen_code: profile.caen_code,
        caen_description: profile.caen_description,
      })
      .eq("id", user.id);

    if (error) {
      setProfileMsg({ type: "error", text: "A aparut o eroare. Te rugam sa incerci din nou." });
    } else {
      setProfileMsg({ type: "success", text: "Profilul fiscal a fost actualizat." });
    }
    setIsProfileLoading(false);
  }

  function handleEntityChange(entityType: EntityType) {
    if (!profile) return;
    const regime = entityType === "srl" ? "micro_1" : "norma_venit";
    setProfile({ ...profile, entity_type: entityType, regime });
  }

  const regimeOptions = profile?.entity_type === "srl" ? SRL_REGIME_OPTIONS : PFA_REGIME_OPTIONS;

  if (loading) {
    return (
      <div className="mx-auto max-w-lg flex items-center justify-center py-20">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg pb-20 lg:pb-0">
      <h1 className="text-2xl font-bold text-secondary-900 mb-6">Setari cont</h1>

      {/* Email */}
      <div className="rounded-xl border border-secondary-200 bg-white p-6 mb-6">
        <h2 className="text-lg font-semibold text-secondary-900 mb-4">Email</h2>
        <p className="text-sm text-secondary-600">{email}</p>
      </div>

      {/* Fiscal Profile */}
      {profile && (
        <div className="rounded-xl border border-secondary-200 bg-white p-6 mb-6">
          <h2 className="text-lg font-semibold text-secondary-900 mb-4">Profil fiscal</h2>

          {profileMsg && (
            <div
              className={`mb-4 rounded-lg border p-3 text-sm ${
                profileMsg.type === "success"
                  ? "border-accent-200 bg-accent-50 text-accent-700"
                  : "border-error-200 bg-error-50 text-error-700"
              }`}
            >
              {profileMsg.text}
            </div>
          )}

          <form onSubmit={handleProfileSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                Tip entitate
              </label>
              <div className="flex gap-2">
                {ENTITY_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleEntityChange(opt.value)}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                      profile.entity_type === opt.value
                        ? "bg-secondary-900 text-white"
                        : "border border-secondary-300 bg-white text-secondary-600 hover:bg-secondary-50"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="regime" className="block text-sm font-medium text-secondary-700 mb-1">
                Regim fiscal
              </label>
              <select
                id="regime"
                value={profile.regime}
                onChange={(e) => setProfile({ ...profile, regime: e.target.value as FiscalRegime })}
                className="w-full rounded-lg border border-secondary-300 bg-white px-3 py-2.5 text-sm text-secondary-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              >
                {regimeOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1">
                Statut TVA
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setProfile({ ...profile, tva_status: false })}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    !profile.tva_status
                      ? "bg-secondary-900 text-white"
                      : "border border-secondary-300 bg-white text-secondary-600 hover:bg-secondary-50"
                  }`}
                >
                  Neplatitor TVA
                </button>
                <button
                  type="button"
                  onClick={() => setProfile({ ...profile, tva_status: true })}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    profile.tva_status
                      ? "bg-secondary-900 text-white"
                      : "border border-secondary-300 bg-white text-secondary-600 hover:bg-secondary-50"
                  }`}
                >
                  Platitor TVA
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="caen" className="block text-sm font-medium text-secondary-700 mb-1">
                Cod CAEN
              </label>
              <input
                id="caen"
                type="text"
                value={profile.caen_code}
                onChange={(e) => setProfile({ ...profile, caen_code: e.target.value })}
                placeholder="ex: 6201"
                className="w-full rounded-lg border border-secondary-300 bg-white px-3 py-2.5 text-secondary-900 shadow-sm placeholder:text-secondary-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              />
            </div>

            <button
              type="submit"
              disabled={isProfileLoading}
              className="rounded-lg bg-secondary-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-secondary-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isProfileLoading ? "Se salveaza..." : "Salveaza profilul"}
            </button>
          </form>
        </div>
      )}

      {/* Password */}
      <div className="rounded-xl border border-secondary-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-secondary-900 mb-4">Schimba parola</h2>

        {passwordMsg && (
          <div
            className={`mb-4 rounded-lg border p-3 text-sm ${
              passwordMsg.type === "success"
                ? "border-accent-200 bg-accent-50 text-accent-700"
                : "border-error-200 bg-error-50 text-error-700"
            }`}
          >
            {passwordMsg.text}
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
            disabled={isPasswordLoading}
            className="rounded-lg bg-secondary-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-secondary-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPasswordLoading ? "Se salveaza..." : "Schimba parola"}
          </button>
        </form>
      </div>
    </div>
  );
}
