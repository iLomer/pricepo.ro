"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { FiscalRegime } from "@/types";
import { calculateTotalTax, getNormaDeVenitEntry } from "@/lib/fiscal";
import type { TaxBreakdown } from "@/lib/fiscal";
import { TaxBreakdownDisplay } from "./TaxBreakdownDisplay";

interface TaxEstimatorProps {
  regime: FiscalRegime;
  caenCode: string;
}

export function TaxEstimator({ regime, caenCode }: TaxEstimatorProps) {
  const [income, setIncome] = useState<string>("");
  const [expenses, setExpenses] = useState<string>("");
  const [breakdown, setBreakdown] = useState<TaxBreakdown | null>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const normaEntry = regime === "norma_venit" ? getNormaDeVenitEntry(caenCode) : null;

  const recalculate = useCallback(
    (incomeStr: string, expensesStr: string) => {
      const incomeNum = parseFloat(incomeStr) || 0;
      const expensesNum = regime === "sistem_real" ? (parseFloat(expensesStr) || 0) : 0;

      if (incomeNum <= 0) {
        setBreakdown(null);
        return;
      }

      const result = calculateTotalTax(incomeNum, regime, expensesNum, caenCode);
      setBreakdown(result);
    },
    [regime, caenCode]
  );

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      recalculate(income, expenses);
    }, 300);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [income, expenses, recalculate]);

  return (
    <div className="space-y-6">
      {/* Regime info */}
      <div className="rounded-xl border border-secondary-200 bg-background p-4">
        <p className="text-xs font-medium text-secondary-400">Regimul tau fiscal</p>
        <p className="mt-0.5 text-sm font-semibold text-foreground">
          {regime === "norma_venit" ? "Norma de venit" : "Sistem real"}
        </p>
        {normaEntry && (
          <p className="mt-1 text-xs text-secondary-500">
            CAEN {normaEntry.caenCode}: {normaEntry.caenDescription} --
            norma {new Intl.NumberFormat("ro-RO").format(normaEntry.normaValue)} lei/an
          </p>
        )}
      </div>

      {/* Input form */}
      <div className="rounded-xl border border-secondary-200 bg-background p-4">
        <h3 className="mb-4 text-sm font-semibold text-foreground">
          Introdu veniturile
        </h3>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="income"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Venit brut anual estimat (lei)
            </label>
            <input
              id="income"
              type="number"
              min="0"
              step="100"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="ex: 120000"
              className="w-full rounded-lg border border-secondary-300 px-3 py-2.5 text-sm text-foreground placeholder-secondary-400 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            />
            <p className="mt-1 text-xs text-secondary-400">
              Totalul facturat in {new Date().getFullYear()}, inainte de taxe
            </p>
          </div>

          {regime === "sistem_real" && (
            <div>
              <label
                htmlFor="expenses"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Cheltuieli deductibile anuale (lei)
              </label>
              <input
                id="expenses"
                type="number"
                min="0"
                step="100"
                value={expenses}
                onChange={(e) => setExpenses(e.target.value)}
                placeholder="ex: 15000"
                className="w-full rounded-lg border border-secondary-300 px-3 py-2.5 text-sm text-foreground placeholder-secondary-400 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              />
              <p className="mt-1 text-xs text-secondary-400">
                Cheltuieli acceptate fiscal: chirie birou, echipamente, abonamente
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      {breakdown && <TaxBreakdownDisplay breakdown={breakdown} />}

      {/* Empty state */}
      {!breakdown && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-secondary-200 bg-background px-6 py-10 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mb-3 h-8 w-8 text-secondary-300"
          >
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <line x1="8" y1="6" x2="16" y2="6" />
            <line x1="8" y1="10" x2="16" y2="10" />
            <line x1="8" y1="14" x2="12" y2="14" />
          </svg>
          <p className="text-sm text-secondary-500">
            Introdu venitul brut anual pentru a vedea estimarea taxelor.
          </p>
        </div>
      )}
    </div>
  );
}
