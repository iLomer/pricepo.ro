"use client";

import { useState, useEffect } from "react";

interface AlertPrefsState {
  emailAlertsEnabled: boolean;
  alertDaysBefore: number[];
}

const AVAILABLE_DAYS = [
  { value: 7, label: "7 zile inainte" },
  { value: 3, label: "3 zile inainte" },
  { value: 1, label: "1 zi inainte" },
];

export function AlertPreferences() {
  const [prefs, setPrefs] = useState<AlertPrefsState>({
    emailAlertsEnabled: true,
    alertDaysBefore: [7, 3, 1],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function loadPreferences() {
      try {
        const response = await fetch("/api/alerts/preferences");
        if (response.ok) {
          const data = await response.json() as {
            email_alerts_enabled: boolean;
            alert_days_before: number[];
          };
          setPrefs({
            emailAlertsEnabled: data.email_alerts_enabled,
            alertDaysBefore: data.alert_days_before,
          });
        }
      } finally {
        setLoading(false);
      }
    }

    loadPreferences();
  }, []);

  async function savePreferences(newPrefs: AlertPrefsState) {
    setSaving(true);
    setSaved(false);

    try {
      const response = await fetch("/api/alerts/preferences", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email_alerts_enabled: newPrefs.emailAlertsEnabled,
          alert_days_before: newPrefs.alertDaysBefore,
        }),
      });

      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } finally {
      setSaving(false);
    }
  }

  function handleToggleAlerts() {
    const newPrefs = { ...prefs, emailAlertsEnabled: !prefs.emailAlertsEnabled };
    setPrefs(newPrefs);
    savePreferences(newPrefs);
  }

  function handleToggleDay(day: number) {
    const newDays = prefs.alertDaysBefore.includes(day)
      ? prefs.alertDaysBefore.filter((d) => d !== day)
      : [...prefs.alertDaysBefore, day].sort((a, b) => b - a);

    const newPrefs = { ...prefs, alertDaysBefore: newDays };
    setPrefs(newPrefs);
    savePreferences(newPrefs);
  }

  if (loading) {
    return (
      <div className="rounded-xl border border-secondary-200 bg-background p-6">
        <div className="flex items-center justify-center">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-500 border-t-transparent" />
          <span className="ml-2 text-sm text-secondary-500">Se incarca preferintele...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main toggle */}
      <div className="rounded-xl border border-secondary-200 bg-background p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Alerte pe email
            </h3>
            <p className="mt-0.5 text-xs text-secondary-500">
              Primesti un email inainte de fiecare termen fiscal
            </p>
          </div>
          <button
            onClick={handleToggleAlerts}
            disabled={saving}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ${
              prefs.emailAlertsEnabled ? "bg-primary-600" : "bg-secondary-300"
            } ${saving ? "opacity-60" : ""}`}
            role="switch"
            aria-checked={prefs.emailAlertsEnabled}
            aria-label="Activeaza alerte pe email"
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200 ${
                prefs.emailAlertsEnabled ? "translate-x-5.5" : "translate-x-0.5"
              } mt-0.5`}
            />
          </button>
        </div>
      </div>

      {/* Days before configuration */}
      {prefs.emailAlertsEnabled && (
        <div className="rounded-xl border border-secondary-200 bg-background p-4">
          <h3 className="mb-3 text-sm font-semibold text-foreground">
            Cand sa primesti alerta?
          </h3>
          <div className="space-y-2">
            {AVAILABLE_DAYS.map((day) => (
              <label
                key={day.value}
                className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-secondary-50"
              >
                <input
                  type="checkbox"
                  checked={prefs.alertDaysBefore.includes(day.value)}
                  onChange={() => handleToggleDay(day.value)}
                  disabled={saving}
                  className="h-4 w-4 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-foreground">{day.label}</span>
              </label>
            ))}
          </div>
          {prefs.alertDaysBefore.length === 0 && (
            <p className="mt-2 text-xs text-warning-600">
              Selecteaza cel putin o optiune pentru a primi alerte.
            </p>
          )}
        </div>
      )}

      {/* Save feedback */}
      {saved && (
        <div className="rounded-lg bg-accent-50 px-3 py-2 text-xs font-medium text-accent-700">
          Preferintele au fost salvate.
        </div>
      )}
    </div>
  );
}
