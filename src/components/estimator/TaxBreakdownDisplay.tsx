"use client";

import type { TaxBreakdown } from "@/lib/fiscal";

interface TaxBreakdownDisplayProps {
  breakdown: TaxBreakdown;
}

function formatLei(amount: number): string {
  return new Intl.NumberFormat("ro-RO", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

interface BreakdownRow {
  label: string;
  value: number;
  description: string;
  highlight?: boolean;
}

export function TaxBreakdownDisplay({ breakdown }: TaxBreakdownDisplayProps) {
  const rows: BreakdownRow[] = [
    {
      label: "Venit brut anual",
      value: breakdown.grossIncome,
      description: "Venitul total declarat",
    },
  ];

  if (breakdown.expenses > 0) {
    rows.push({
      label: "Cheltuieli deductibile",
      value: -breakdown.expenses,
      description: "Cheltuieli acceptate fiscal",
    });
  }

  if (breakdown.normaValue !== null) {
    rows.push({
      label: "Norma de venit aplicata",
      value: breakdown.normaValue,
      description: "Valoarea normei de venit pentru codul CAEN",
    });
  }

  rows.push(
    {
      label: "Baza impozabila",
      value: breakdown.taxableBase,
      description:
        breakdown.regime === "norma_venit"
          ? "Norma de venit (baza fixa)"
          : "Venit brut minus cheltuieli deductibile",
    },
    {
      label: "CAS (25%)",
      value: breakdown.cas,
      description: "Contributia de Asigurari Sociale -- pensie",
    },
    {
      label: "CASS (10%)",
      value: breakdown.cass,
      description: "Contributia de Asigurari Sociale de Sanatate",
    },
    {
      label: "Impozit pe venit (10%)",
      value: breakdown.incomeTax,
      description: "Impozitul pe venitul net",
    }
  );

  return (
    <div className="space-y-4">
      {/* Breakdown table */}
      <div className="rounded-xl border border-secondary-200 bg-background">
        <div className="border-b border-secondary-100 px-4 py-3">
          <h3 className="text-sm font-semibold text-foreground">
            Detaliere taxe
          </h3>
        </div>
        <div className="divide-y divide-secondary-100">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium text-foreground">{row.label}</p>
                <p className="text-xs text-secondary-400">{row.description}</p>
              </div>
              <span
                className={`text-sm font-semibold tabular-nums ${
                  row.value < 0 ? "text-error-600" : "text-foreground"
                }`}
              >
                {row.value < 0 ? "-" : ""}
                {formatLei(Math.abs(row.value))} lei
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid gap-3 sm:grid-cols-2">
        {/* Total taxes */}
        <div className="rounded-xl border border-error-200 bg-error-50 p-4">
          <p className="text-xs font-medium text-error-600">Total taxe anuale</p>
          <p className="mt-1 text-2xl font-bold tabular-nums text-error-700">
            {formatLei(breakdown.totalTax)} lei
          </p>
          <p className="mt-0.5 text-xs text-error-500">
            Rata efectiva: {breakdown.effectiveTaxRate.toFixed(1)}%
          </p>
        </div>

        {/* Net income */}
        <div className="rounded-xl border border-accent-200 bg-accent-50 p-4">
          <p className="text-xs font-medium text-accent-600">Venit net estimat</p>
          <p className="mt-1 text-2xl font-bold tabular-nums text-accent-700">
            {formatLei(breakdown.netIncome)} lei
          </p>
          <p className="mt-0.5 text-xs text-accent-500">
            Dupa plata tuturor taxelor
          </p>
        </div>
      </div>

      {/* Monthly set-aside */}
      <div className="rounded-xl border border-primary-200 bg-primary-50 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-primary-600">
              Pune deoparte lunar
            </p>
            <p className="mt-0.5 text-xs text-primary-500">
              Suma recomandata sa o economisesti lunar pentru taxe
            </p>
          </div>
          <p className="text-xl font-bold tabular-nums text-primary-700">
            {formatLei(breakdown.monthlySetAside)} lei/luna
          </p>
        </div>
      </div>
    </div>
  );
}
