"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { calculateCASSDividend } from "@/lib/fiscal/srl";
import type { CASSDividendResult } from "@/lib/fiscal/srl";

function formatLei(value: number): string {
  return new Intl.NumberFormat("ro-RO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function CASSDividendEstimator() {
  const [annualDividends, setAnnualDividends] = useState<string>("");
  const [result, setResult] = useState<CASSDividendResult | null>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const recalculate = useCallback((valueStr: string) => {
    const value = parseFloat(valueStr) || 0;
    if (value <= 0) {
      setResult(null);
      return;
    }
    setResult(calculateCASSDividend(value));
  }, []);

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      recalculate(annualDividends);
    }, 300);
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [annualDividends, recalculate]);

  const progressPercentage = result
    ? Math.min(result.thresholdPercentage, 100)
    : 0;

  const progressColor = result
    ? result.cassApplies
      ? "bg-error-500"
      : result.thresholdPercentage >= 80
        ? "bg-warning-500"
        : "bg-accent-500"
    : "bg-secondary-300";

  return (
    <div className="space-y-6">
      {/* Input */}
      <div className="rounded-xl border border-secondary-200 bg-background p-4">
        <h3 className="mb-4 text-sm font-semibold text-foreground">
          Dividende planificate
        </h3>
        <div>
          <label
            htmlFor="annualDividends"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Total dividende brute planificate in 2026 (lei)
          </label>
          <input
            id="annualDividends"
            type="number"
            min="0"
            step="1000"
            value={annualDividends}
            onChange={(e) => setAnnualDividends(e.target.value)}
            placeholder="ex: 30000"
            className="w-full rounded-lg border border-secondary-300 px-3 py-2.5 text-sm text-foreground placeholder-secondary-400 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
          <p className="mt-1 text-xs text-secondary-400">
            Suma totala a dividendelor brute pe care intentionati sa le distribuiti in 2026
          </p>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-4">
          {/* Progress bar */}
          <div className="rounded-xl border border-secondary-200 bg-background p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                Prag CASS: 6 salarii minime
              </span>
              <span className="text-sm font-medium text-secondary-600">
                {formatLei(result.threshold6x)} lei
              </span>
            </div>
            <div className="h-4 w-full overflow-hidden rounded-full bg-secondary-100">
              <div
                className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-secondary-500">
              <span>0 lei</span>
              <span>{formatLei(result.threshold6x)} lei</span>
            </div>
            <p className="mt-2 text-center text-sm font-medium text-secondary-600">
              {result.thresholdPercentage.toFixed(0)}% din prag
            </p>
          </div>

          {/* Warning banner */}
          {result.warningMessage && (
            <div
              className={`rounded-xl border p-4 ${
                result.cassApplies
                  ? "border-error-300 bg-error-50"
                  : "border-warning-300 bg-warning-50"
              }`}
            >
              <p
                className={`text-sm font-medium leading-relaxed ${
                  result.cassApplies ? "text-error-700" : "text-warning-700"
                }`}
              >
                {result.warningMessage}
              </p>
            </div>
          )}

          {/* Details card */}
          <div className="rounded-xl border border-secondary-200 bg-background p-4">
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Detalii CASS
            </h3>
            <div className="space-y-3">
              <DetailRow
                label="Dividende brute anuale"
                value={`${formatLei(result.annualDividends)} lei`}
              />
              <DetailRow
                label="Prag CASS (6 x salariul minim brut)"
                value={`${formatLei(result.threshold6x)} lei`}
              />
              <DetailRow
                label="CASS se aplica?"
                value={result.cassApplies ? "Da" : "Nu"}
                highlight={result.cassApplies}
              />
              {!result.cassApplies && (
                <DetailRow
                  label="Ramas pana la prag"
                  value={`${formatLei(result.remainingBeforeThreshold)} lei`}
                />
              )}
              {result.cassApplies && (
                <>
                  <DetailRow
                    label="Baza de calcul CASS"
                    value={`${formatLei(result.cassBase)} lei`}
                  />
                  <DetailRow
                    label="Plafon CASS (24 x salariul minim)"
                    value={`${formatLei(result.cassCap)} lei`}
                  />
                  <div className="border-t border-secondary-200 pt-3">
                    <DetailRow
                      label="CASS datorat (10%)"
                      value={`${formatLei(result.cassAmount)} lei`}
                      highlight
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Educational section */}
          <div className="rounded-xl border border-primary-200 bg-primary-50 p-4">
            <h3 className="mb-2 text-sm font-semibold text-primary-800">
              Regula 6/12/24 -- Ce trebuie sa stii
            </h3>
            <ul className="space-y-2 text-sm leading-relaxed text-primary-700">
              <li>
                Daca totalul dividendelor brute distribuite intr-un an depaseste
                6 salarii minime brute pe economie ({formatLei(result.threshold6x)} lei in 2026),
                datorezi CASS de 10%.
              </li>
              <li>
                CASS pe dividende este in trepte: baza de calcul este 6, 12 sau 24 salarii minime,
                in functie de totalul dividendelor. Plafonul maxim este de 24 salarii minime
                ({formatLei(result.cassCap)} lei in 2026) - CASS maxim: {formatLei(result.cassCap * result.cassRate)} lei.
              </li>
              <li>
                CASS pe dividende se declara de catre asociat (nu de SRL) prin
                Declaratia Unica (D212), pana pe 25 mai a anului urmator.
              </li>
              <li>
                Daca ramaneti sub pragul de {formatLei(result.threshold6x)} lei,
                nu datorati CASS pe dividende. Planificati distributiile in consecinta.
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!result && (
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
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <p className="text-sm text-secondary-500">
            Introdu totalul dividendelor planificate pentru a verifica obligatia CASS.
          </p>
        </div>
      )}
    </div>
  );
}

function DetailRow({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-secondary-600">{label}</span>
      <span
        className={`text-sm font-medium ${
          highlight ? "font-bold text-error-600" : "text-foreground"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
