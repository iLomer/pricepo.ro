"use client";

import { useState } from "react";
import type { TaxBreakdown } from "@/lib/fiscal";
import { SPVInstructions } from "./SPVInstructions";

interface D212ExportProps {
  breakdown: TaxBreakdown;
  regime: string;
}

function formatLei(amount: number): string {
  return new Intl.NumberFormat("ro-RO", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

interface ExportRow {
  section: string;
  label: string;
  value: string;
}

function getExportRows(breakdown: TaxBreakdown, regime: string): ExportRow[] {
  const rows: ExportRow[] = [
    { section: "III", label: "Venit brut anual estimat", value: `${formatLei(breakdown.grossIncome)} lei` },
  ];

  if (regime === "sistem_real") {
    rows.push({
      section: "IV",
      label: "Cheltuieli deductibile",
      value: `${formatLei(breakdown.expenses)} lei`,
    });
  }

  rows.push(
    { section: "V", label: "Venit net estimat", value: `${formatLei(breakdown.taxableBase)} lei` },
    { section: "VI", label: "CAS datorat", value: `${formatLei(breakdown.cas)} lei` },
    { section: "VII", label: "CASS datorat", value: `${formatLei(breakdown.cass)} lei` },
    { section: "VIII", label: "Impozit pe venit", value: `${formatLei(breakdown.incomeTax)} lei` }
  );

  return rows;
}

async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function generatePDFContent(rows: ExportRow[], breakdown: TaxBreakdown): string {
  const lines = [
    "FISKIO -- Rezumat D212 (Declaratia Unica)",
    `Data generarii: ${new Date().toLocaleDateString("ro-RO")}`,
    "",
    "Contribuabil: [Completeaza cu numele tau]",
    "CUI/CNP: [Completeaza cu CUI sau CNP]",
    "",
    "=== VALORI CALCULATE ===",
    "",
  ];

  for (const row of rows) {
    lines.push(`Sectiunea ${row.section}: ${row.label}`);
    lines.push(`  Valoare: ${row.value}`);
    lines.push("");
  }

  lines.push("=== TOTAL ===");
  lines.push(`Total taxe (CAS + CASS + Impozit): ${formatLei(breakdown.totalTax)} lei`);
  lines.push(`Venit net dupa taxe: ${formatLei(breakdown.netIncome)} lei`);
  lines.push("");
  lines.push("---");
  lines.push("Generat de Fiskio (pricepo.ro)");
  lines.push("Aceste valori sunt estimative. Verifica intotdeauna cu legislatia in vigoare.");

  return lines.join("\n");
}

export function D212Export({ breakdown, regime }: D212ExportProps) {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);

  const rows = getExportRows(breakdown, regime);

  async function handleCopyValue(section: string, value: string) {
    const success = await copyToClipboard(value);
    if (success) {
      setCopiedSection(section);
      setTimeout(() => setCopiedSection(null), 2000);
    }
  }

  function handleDownloadPDF() {
    const content = generatePDFContent(rows, breakdown);
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `fiskio-d212-rezumat-${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      {/* Export summary with copy buttons */}
      <div className="rounded-xl border border-primary-200 bg-background">
        <div className="border-b border-primary-100 bg-primary-50 px-4 py-3">
          <h3 className="text-sm font-bold text-primary-800">
            Valorile tale D212 -- gata de completat
          </h3>
          <p className="mt-0.5 text-xs text-primary-600">
            Copiaza fiecare valoare in formularul oficial D212
          </p>
        </div>

        <div className="divide-y divide-secondary-100">
          {rows.map((row) => (
            <div
              key={row.section}
              className="flex items-center justify-between gap-3 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-secondary-100 text-xs font-bold text-secondary-600">
                  {row.section}
                </span>
                <div>
                  <p className="text-sm text-foreground">{row.label}</p>
                  <p className="text-sm font-semibold tabular-nums text-foreground">
                    {row.value}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleCopyValue(row.section, row.value)}
                className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  copiedSection === row.section
                    ? "bg-accent-100 text-accent-700"
                    : "border border-secondary-300 text-secondary-600 hover:bg-secondary-50"
                }`}
              >
                {copiedSection === row.section ? "Copiat" : "Copiaza"}
              </button>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="border-t-2 border-primary-200 bg-primary-50 px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-primary-800">
                Total de plata: {formatLei(breakdown.totalTax)} lei
              </p>
              <p className="text-xs text-primary-600">
                Venit net: {formatLei(breakdown.netIncome)} lei
              </p>
            </div>
            <button
              onClick={() =>
                handleCopyValue(
                  "total",
                  `Total taxe: ${formatLei(breakdown.totalTax)} lei | Venit net: ${formatLei(breakdown.netIncome)} lei`
                )
              }
              className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                copiedSection === "total"
                  ? "bg-accent-100 text-accent-700"
                  : "border border-primary-300 text-primary-700 hover:bg-primary-100"
              }`}
            >
              {copiedSection === "total" ? "Copiat" : "Copiaza tot"}
            </button>
          </div>
        </div>
      </div>

      {/* Download button */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={handleDownloadPDF}
          className="flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Descarca rezumatul D212
        </button>
        <button
          onClick={() => setShowInstructions(!showInstructions)}
          className="flex items-center justify-center gap-2 rounded-lg border border-secondary-300 px-5 py-2.5 text-sm font-medium text-secondary-600 transition-colors hover:bg-secondary-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          {showInstructions ? "Ascunde instructiunile SPV" : "Cum depun prin SPV?"}
        </button>
      </div>

      {/* SPV Instructions */}
      {showInstructions && <SPVInstructions />}
    </div>
  );
}
