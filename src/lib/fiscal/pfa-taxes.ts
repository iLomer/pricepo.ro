/**
 * PFA tax calculation functions.
 * All functions are pure -- no side effects, no Supabase calls.
 * All monetary values are in lei, rounded to 2 decimals.
 *
 * 2026 rates (OUG 8/2026, OUG 89/2025):
 * - CAS: 25% - 0 below 12x, 25% of 12x for 12-24x, 25% of 24x above 24x
 * - CASS: 10% - 10% of 6x (floor) below 6x, 10% of actual 6-72x, 10% of 72x (cap)
 * - Income tax: 10% of taxable base (after CAS + CASS deduction)
 * - Bonus: 3% discount on income tax if D212 filed + paid by April 15
 */

import type { FiscalRegime } from "@/types";
import type { TaxBreakdown } from "./types";
import { FISCAL_CONSTANTS_2026 } from "./types";
import { getNormaDeVenit } from "./norma-venit";

/** Round a number to 2 decimal places */
function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * Calculate CAS (Contributia de Asigurari Sociale) -- 25%.
 *
 * CAS is mandatory if annual taxable base >= 12x minimum gross salary.
 * - Below 12x (48,600 lei): 0 (optional)
 * - 12x to 24x (48,600 - 97,200 lei): 25% of 12x = 12,150 lei
 * - Above 24x (97,200 lei): 25% of 24x = 24,300 lei
 */
export function calculateCAS(
  income: number,
  regime: FiscalRegime,
  expenses: number = 0,
  caenCode?: string
): number {
  const { CAS_RATE, CAS_THRESHOLD_12X, CAS_THRESHOLD_24X } = FISCAL_CONSTANTS_2026;

  const taxableBase = getTaxableBase(income, regime, expenses, caenCode);

  if (taxableBase >= CAS_THRESHOLD_24X) {
    return round2(CAS_THRESHOLD_24X * CAS_RATE);
  }

  if (taxableBase >= CAS_THRESHOLD_12X) {
    return round2(CAS_THRESHOLD_12X * CAS_RATE);
  }

  return 0;
}

/**
 * Calculate CASS (Contributia de Asigurari Sociale de Sanatate) -- 10%.
 *
 * CASS 2026 rules:
 * - Below 6x (24,300 lei): 10% of 6x = 2,430 lei (minimum floor)
 *   Exception: 0 if also employed and paying CASS through salary - we can't know this,
 *   so we always show the minimum floor with a note.
 * - 6x to 72x (24,300 - 291,600 lei): 10% of actual taxable base
 * - Above 72x (291,600 lei): 10% of 72x = 29,160 lei (cap)
 */
export function calculateCASS(
  income: number,
  regime: FiscalRegime,
  expenses: number = 0,
  caenCode?: string
): number {
  const {
    CASS_RATE,
    CASS_THRESHOLD_6X,
    CASS_CAP_72X,
  } = FISCAL_CONSTANTS_2026;

  const taxableBase = getTaxableBase(income, regime, expenses, caenCode);

  // If no income at all, no CASS
  if (taxableBase <= 0) return 0;

  // Cap at 72x
  if (taxableBase >= CASS_CAP_72X) {
    return round2(CASS_CAP_72X * CASS_RATE);
  }

  // Proportional between 6x and 72x
  if (taxableBase >= CASS_THRESHOLD_6X) {
    return round2(taxableBase * CASS_RATE);
  }

  // Below 6x: minimum floor of 10% of 6x
  return round2(CASS_THRESHOLD_6X * CASS_RATE);
}

/**
 * Calculate income tax (impozit pe venit) -- 10%.
 *
 * For norma_venit: 10% of the norma de venit value.
 * For sistem_real: 10% of (net income - CAS - CASS).
 *   Both CAS and CASS are deductible from the income tax base (since 2024).
 */
export function calculateIncomeTax(
  income: number,
  regime: FiscalRegime,
  expenses: number = 0,
  caenCode?: string
): number {
  const { INCOME_TAX_RATE } = FISCAL_CONSTANTS_2026;

  if (regime === "norma_venit") {
    const normaValue = caenCode ? getNormaDeVenit(caenCode) : null;
    const base = normaValue ?? income;
    // For norma, CAS and CASS are NOT deducted from the norma base for income tax
    // Income tax = 10% of norma value directly
    return round2(base * INCOME_TAX_RATE);
  }

  // Sistem real: income tax base = net income - CAS - CASS (both deductible since 2024)
  const netIncome = Math.max(0, income - expenses);
  const cas = calculateCAS(income, regime, expenses, caenCode);
  const cass = calculateCASS(income, regime, expenses, caenCode);
  const incomeTaxBase = Math.max(0, netIncome - cas - cass);

  return round2(incomeTaxBase * INCOME_TAX_RATE);
}

/**
 * Get the taxable base depending on regime.
 *
 * For norma_venit: the norma de venit value for the CAEN code (or income if CAEN not found).
 * For sistem_real: gross income minus deductible expenses.
 */
export function getTaxableBase(
  income: number,
  regime: FiscalRegime,
  expenses: number = 0,
  caenCode?: string
): number {
  if (regime === "norma_venit") {
    const normaValue = caenCode ? getNormaDeVenit(caenCode) : null;
    return normaValue ?? income;
  }

  // Sistem real
  return Math.max(0, income - expenses);
}

/**
 * Calculate complete tax breakdown for a PFA.
 *
 * Returns all components: CAS, CASS, income tax, total tax, net income,
 * effective tax rate, and monthly set-aside suggestion.
 */
export function calculateTotalTax(
  income: number,
  regime: FiscalRegime,
  expenses: number = 0,
  caenCode?: string
): TaxBreakdown {
  const cas = calculateCAS(income, regime, expenses, caenCode);
  const cass = calculateCASS(income, regime, expenses, caenCode);
  const incomeTax = calculateIncomeTax(income, regime, expenses, caenCode);

  const totalTax = round2(cas + cass + incomeTax);
  const netIncome = round2(income - expenses - totalTax);
  const effectiveTaxRate = income > 0 ? round2((totalTax / income) * 100) : 0;
  const monthlySetAside = round2(totalTax / 12);

  const taxableBase = getTaxableBase(income, regime, expenses, caenCode);
  const normaValue = regime === "norma_venit" && caenCode
    ? getNormaDeVenit(caenCode)
    : null;

  return {
    grossIncome: round2(income),
    expenses: round2(expenses),
    taxableBase: round2(taxableBase),
    cas,
    cass,
    incomeTax,
    totalTax,
    netIncome,
    effectiveTaxRate,
    monthlySetAside,
    regime,
    normaValue,
  };
}
