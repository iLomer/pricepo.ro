/**
 * What-If regime comparison logic for PFA.
 * Compares tax burden between norma_venit and sistem_real regimes.
 *
 * Pure functions -- no side effects, no Supabase calls.
 */

import type { FiscalRegime } from "@/types";
import type { TaxBreakdown } from "./types";
import { calculateTotalTax } from "./pfa-taxes";

/** Result of comparing two fiscal regimes */
export interface ComparisonBreakdown {
  /** Tax breakdown for the user's current regime */
  current: TaxBreakdown;
  /** Tax breakdown for the comparison regime */
  comparison: TaxBreakdown;
  /** Absolute savings (positive = comparison is cheaper) */
  savings: number;
  /** Savings as a percentage of current total tax */
  savingsPercent: number;
  /** Plain Romanian recommendation string */
  recommendation: string;
}

const REGIME_LABELS: Record<FiscalRegime, string> = {
  norma_venit: "norma de venit",
  sistem_real: "sistem real",
  micro_1: "micro 1%",
};

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

function formatLei(value: number): string {
  return new Intl.NumberFormat("ro-RO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Compare tax burden between two PFA regimes.
 *
 * @param income - Annual gross income in lei
 * @param expenses - Annual deductible expenses (relevant for sistem_real)
 * @param caenCode - CAEN code (relevant for norma_venit lookup)
 * @param currentRegime - The user's current fiscal regime
 * @param compareRegime - The regime to compare against
 */
export function calculateComparisonBreakdown(
  income: number,
  expenses: number,
  caenCode: string,
  currentRegime: FiscalRegime,
  compareRegime: FiscalRegime
): ComparisonBreakdown {
  const current = calculateTotalTax(income, currentRegime, expenses, caenCode);
  const comparison = calculateTotalTax(income, compareRegime, expenses, caenCode);

  const savings = round2(current.totalTax - comparison.totalTax);
  const savingsPercent =
    current.totalTax > 0
      ? round2((savings / current.totalTax) * 100)
      : 0;

  const recommendation = buildRecommendation(
    currentRegime,
    compareRegime,
    savings,
    current,
    comparison
  );

  return {
    current,
    comparison,
    savings,
    savingsPercent,
    recommendation,
  };
}

function buildRecommendation(
  currentRegime: FiscalRegime,
  compareRegime: FiscalRegime,
  savings: number,
  current: TaxBreakdown,
  comparison: TaxBreakdown
): string {
  const currentLabel = REGIME_LABELS[currentRegime];
  const compareLabel = REGIME_LABELS[compareRegime];

  if (Math.abs(savings) < 100) {
    return `La venitul tau, diferenta dintre ${currentLabel} si ${compareLabel} este nesemnificativa (sub 100 lei/an). Alege regimul care ti se potriveste ca mod de lucru.`;
  }

  if (savings > 0) {
    // Comparison regime is cheaper
    return `La venitul tau, ${compareLabel} te-ar costa cu ${formatLei(savings)} lei mai putin pe an (taxe totale: ${formatLei(comparison.totalTax)} lei vs. ${formatLei(current.totalTax)} lei). Economisesti ${Math.abs(round2((savings / current.totalTax) * 100)).toFixed(0)}% din taxe.`;
  }

  // Current regime is cheaper
  const loss = Math.abs(savings);
  return `Regimul tau actual (${currentLabel}) este mai avantajos cu ${formatLei(loss)} lei/an. La ${compareLabel} ai plati taxe totale de ${formatLei(comparison.totalTax)} lei vs. ${formatLei(current.totalTax)} lei acum.`;
}
