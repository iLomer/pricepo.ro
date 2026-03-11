"use client";

import { useState, useEffect, useCallback } from "react";
import type { Transaction } from "@/types";

function formatLei(value: number): string {
  return new Intl.NumberFormat("ro-RO", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("ro-RO", { day: "2-digit", month: "short", year: "numeric" });
}

const CATEGORIES = [
  "Servicii",
  "Produse",
  "Chirie",
  "Utilitati",
  "Transport",
  "Echipamente",
  "Software",
  "Marketing",
  "Consultanta",
  "Salarii",
  "Taxe si impozite",
  "Altele",
];

const MONTHS = [
  "Toate", "Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie",
  "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie",
];

interface AddFormData {
  type: "incasare" | "plata";
  amount: string;
  description: string;
  category: string;
  document_number: string;
  transaction_date: string;
}

const emptyForm: AddFormData = {
  type: "incasare",
  amount: "",
  description: "",
  category: "",
  document_number: "",
  transaction_date: new Date().toISOString().split("T")[0],
};

export function TransactionLedger() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(0); // 0 = all
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<AddFormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ year: year.toString() });
    if (month > 0) params.set("month", month.toString());

    const res = await fetch(`/api/transactions?${params}`);
    const data = await res.json();

    if (res.ok) {
      setTransactions(data.transactions);
    }
    setLoading(false);
  }, [year, month]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const params = new URLSearchParams({ year: year.toString() });
      if (month > 0) params.set("month", month.toString());
      const res = await fetch(`/api/transactions?${params}`);
      const data = await res.json();
      if (!cancelled && res.ok) {
        setTransactions(data.transactions);
      }
      if (!cancelled) setLoading(false);
    }
    load();
    return () => { cancelled = true; };
  }, [year, month]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        amount: parseFloat(form.amount),
      }),
    });

    if (res.ok) {
      setForm(emptyForm);
      setShowForm(false);
      fetchTransactions();
    } else {
      const data = await res.json();
      setError(data.error || "Eroare la salvare");
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    const res = await fetch(`/api/transactions/${id}`, { method: "DELETE" });
    if (res.ok) {
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    }
    setDeletingId(null);
  }

  // Totals
  const totalIncasari = transactions
    .filter((t) => t.type === "incasare")
    .reduce((sum, t) => sum + Number(t.amount), 0);
  const totalPlati = transactions
    .filter((t) => t.type === "plata")
    .reduce((sum, t) => sum + Number(t.amount), 0);
  const sold = totalIncasari - totalPlati;

  return (
    <div className="space-y-4">
      {/* Filters + Add button */}
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
          className="rounded-lg border border-secondary-300 bg-background px-3 py-2 text-sm"
        >
          {[2024, 2025, 2026, 2027].map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        <select
          value={month}
          onChange={(e) => setMonth(parseInt(e.target.value))}
          className="rounded-lg border border-secondary-300 bg-background px-3 py-2 text-sm"
        >
          {MONTHS.map((m, i) => (
            <option key={i} value={i}>{m}</option>
          ))}
        </select>
        <button
          onClick={() => setShowForm(!showForm)}
          className="ml-auto rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors"
        >
          {showForm ? "Anuleaza" : "+ Adauga tranzactie"}
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-success-200 bg-success-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-secondary-500">Total incasari</p>
          <p className="mt-1 text-xl font-bold text-success-700">{formatLei(totalIncasari)} lei</p>
        </div>
        <div className="rounded-xl border border-error-200 bg-error-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-secondary-500">Total plati</p>
          <p className="mt-1 text-xl font-bold text-error-700">{formatLei(totalPlati)} lei</p>
        </div>
        <div className={`rounded-xl border p-4 ${sold >= 0 ? "border-primary-200 bg-primary-50" : "border-warning-200 bg-warning-50"}`}>
          <p className="text-xs font-medium uppercase tracking-wide text-secondary-500">Sold</p>
          <p className={`mt-1 text-xl font-bold ${sold >= 0 ? "text-primary-700" : "text-warning-700"}`}>
            {formatLei(sold)} lei
          </p>
        </div>
      </div>

      {/* Add Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="rounded-xl border border-secondary-200 bg-background p-5 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-secondary-700">Tip *</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, type: "incasare" })}
                  className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                    form.type === "incasare"
                      ? "border-success-500 bg-success-50 text-success-700"
                      : "border-secondary-300 text-secondary-600 hover:bg-secondary-50"
                  }`}
                >
                  Incasare
                </button>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, type: "plata" })}
                  className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                    form.type === "plata"
                      ? "border-error-500 bg-error-50 text-error-700"
                      : "border-secondary-300 text-secondary-600 hover:bg-secondary-50"
                  }`}
                >
                  Plata
                </button>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-secondary-700">Suma (lei) *</label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                required
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                placeholder="0.00"
                className="w-full rounded-lg border border-secondary-300 bg-background px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-secondary-700">Descriere *</label>
            <input
              type="text"
              required
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="ex: Factura servicii consultanta"
              className="w-full rounded-lg border border-secondary-300 bg-background px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-secondary-700">Categorie</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full rounded-lg border border-secondary-300 bg-background px-3 py-2 text-sm"
              >
                <option value="">-- Selecteaza --</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-secondary-700">Nr. document</label>
              <input
                type="text"
                value={form.document_number}
                onChange={(e) => setForm({ ...form, document_number: e.target.value })}
                placeholder="ex: F-2026-001"
                className="w-full rounded-lg border border-secondary-300 bg-background px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-secondary-700">Data *</label>
              <input
                type="date"
                required
                value={form.transaction_date}
                onChange={(e) => setForm({ ...form, transaction_date: e.target.value })}
                className="w-full rounded-lg border border-secondary-300 bg-background px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-error-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-primary-600 px-5 py-2 text-sm font-medium text-white hover:bg-primary-700 disabled:opacity-50 transition-colors"
          >
            {saving ? "Se salveaza..." : "Salveaza"}
          </button>
        </form>
      )}

      {/* Transaction List */}
      {loading ? (
        <div className="py-12 text-center text-sm text-secondary-400">Se incarca...</div>
      ) : transactions.length === 0 ? (
        <div className="rounded-xl border border-dashed border-secondary-300 bg-secondary-50 p-8 text-center">
          <p className="text-sm text-secondary-500">
            Nu ai tranzactii inregistrate {month > 0 ? `in ${MONTHS[month].toLowerCase()} ${year}` : `in ${year}`}.
          </p>
          <p className="mt-1 text-xs text-secondary-400">
            Apasa &quot;+ Adauga tranzactie&quot; pentru a incepe.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-secondary-200">
          <table className="w-full text-sm">
            <thead className="bg-secondary-50 text-left">
              <tr>
                <th className="px-4 py-3 font-medium text-secondary-600">Data</th>
                <th className="px-4 py-3 font-medium text-secondary-600">Descriere</th>
                <th className="px-4 py-3 font-medium text-secondary-600 hidden sm:table-cell">Categorie</th>
                <th className="px-4 py-3 font-medium text-secondary-600 hidden md:table-cell">Nr. doc.</th>
                <th className="px-4 py-3 text-right font-medium text-secondary-600">Suma</th>
                <th className="px-4 py-3 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-100">
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-secondary-50 transition-colors">
                  <td className="px-4 py-3 text-secondary-600 whitespace-nowrap">
                    {formatDate(t.transaction_date)}
                  </td>
                  <td className="px-4 py-3 text-foreground">
                    <div className="flex items-center gap-2">
                      <span className={`inline-block h-2 w-2 rounded-full flex-shrink-0 ${
                        t.type === "incasare" ? "bg-success-500" : "bg-error-500"
                      }`} />
                      {t.description}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-secondary-500 hidden sm:table-cell">
                    {t.category || "—"}
                  </td>
                  <td className="px-4 py-3 text-secondary-500 hidden md:table-cell font-mono text-xs">
                    {t.document_number || "—"}
                  </td>
                  <td className={`px-4 py-3 text-right font-semibold tabular-nums whitespace-nowrap ${
                    t.type === "incasare" ? "text-success-700" : "text-error-600"
                  }`}>
                    {t.type === "plata" ? "−" : "+"} {formatLei(Number(t.amount))} lei
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDelete(t.id)}
                      disabled={deletingId === t.id}
                      className="rounded p-1 text-secondary-400 hover:text-error-600 hover:bg-error-50 transition-colors disabled:opacity-50"
                      title="Sterge"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
