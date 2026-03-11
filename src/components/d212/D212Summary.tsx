"use client";

import type { TaxBreakdown } from "@/lib/fiscal";

interface D212SummaryProps {
  breakdown: TaxBreakdown;
  regime: string;
}

function formatLei(amount: number): string {
  return new Intl.NumberFormat("ro-RO", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

interface SummaryRow {
  section: string;
  label: string;
  value: number;
}

export function D212Summary({ breakdown, regime }: D212SummaryProps) {
  const rows: SummaryRow[] = [
    {
      section: "III",
      label: "Venit brut anual estimat",
      value: breakdown.grossIncome,
    },
  ];

  if (regime === "sistem_real") {
    rows.push({
      section: "IV",
      label: "Cheltuieli deductibile",
      value: breakdown.expenses,
    });
  }

  rows.push(
    {
      section: "V",
      label: "Venit net estimat (baza impozabila)",
      value: breakdown.taxableBase,
    },
    {
      section: "VI",
      label: "CAS datorat (25%)",
      value: breakdown.cas,
    },
    {
      section: "VII",
      label: "CASS datorat (10%)",
      value: breakdown.cass,
    },
    {
      section: "VIII",
      label: "Impozit pe venit datorat (10%)",
      value: breakdown.incomeTax,
    }
  );

  return (
    <div className="rounded-xl border border-primary-200 bg-background">
      <div className="border-b border-primary-100 bg-primary-50 px-4 py-3 lg:px-5">
        <h3 className="text-sm font-bold text-primary-800">
          Rezumat D212 -- Toate valorile calculate
        </h3>
        <p className="mt-0.5 text-xs text-primary-600">
          Aceste valori trebuie completate in Declaratia Unica (D212)
        </p>
      </div>

      <div className="divide-y divide-secondary-100">
        {rows.map((row) => (
          <div
            key={row.section + row.label}
            className="flex items-center justify-between px-4 py-3 lg:px-5"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-secondary-100 text-xs font-bold text-secondary-600">
                {row.section}
              </span>
              <span className="text-sm text-foreground">{row.label}</span>
            </div>
            <span className="text-sm font-semibold tabular-nums text-foreground">
              {formatLei(row.value)} lei
            </span>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="border-t-2 border-primary-200 bg-primary-50 px-4 py-4 lg:px-5">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-primary-800">
            Total de plata (CAS + CASS + Impozit)
          </span>
          <span className="text-lg font-bold tabular-nums text-primary-800">
            {formatLei(breakdown.totalTax)} lei
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-primary-600">Venit net dupa taxe</span>
          <span className="text-sm font-semibold tabular-nums text-accent-700">
            {formatLei(breakdown.netIncome)} lei
          </span>
        </div>
      </div>
    </div>
  );
}
