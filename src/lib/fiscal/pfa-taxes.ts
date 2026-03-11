/**
 * PFA tax calculation functions.
 * All functions are pure -- no side effects, no Supabase calls.
 * All monetary values are in lei, rounded to 2 decimals.
 *
 * 2026 rates:
 * - CAS: 25% of taxable base
 * - CASS: 10% of taxable base, with 6x/12x minimum wage thresholds
 * - Income tax: 10% of taxable base (after CAS/CASS deduction for sistem real)
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
 * For norma_venit: 25% of 12x minimum gross salary (if norma >= 12x min salary)
 *   or 0 if income is below 12x minimum salary threshold.
 * For sistem_real: 25% of 12x minimum gross salary (if net income >= 12x min salary)
 *   or 0 if net income is below threshold.
 *
 * CAS is mandatory if annual income >= 12x minimum gross salary.
 * The base for CAS is always 12x minimum gross salary (not actual income).
 */
export function calculateCAS(
  income: number,
  regime: FiscalRegime,
  expenses: number = 0,
  caenCode?: string
): number {
  const { CAS_RATE, MINIMUM_GROSS_SALARY_ANNUAL } = FISCAL_CONSTANTS_2026;

  const taxableBase = getTaxableBase(income, regime, expenses, caenCode);

  if (taxableBase >= MINIMUM_GROSS_SALARY_ANNUAL) {
    return round2(MINIMUM_GROSS_SALARY_ANNUAL * CAS_RATE);
  }

  return 0;
}

/**
 * Calculate CASS (Contributia de Asigurari Sociale de Sanatate) -- 10%.
 *
 * CASS thresholds (2026):
 * - Income < 6x minimum salary: no CASS due
 * - Income >= 6x and < 12x minimum salary: 10% of 6x minimum salary
 * - Income >= 12x minimum salary: 10% of 12x minimum salary
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
    CASS_THRESHOLD_12X,
  } = FISCAL_CONSTANTS_2026;

  const taxableBase = getTaxableBase(income, regime, expenses, caenCode);

  if (taxableBase >= CASS_THRESHOLD_12X) {
    return round2(CASS_THRESHOLD_12X * CASS_RATE);
  }

  if (taxableBase >= CASS_THRESHOLD_6X) {
    return round2(CASS_THRESHOLD_6X * CASS_RATE);
  }

  return 0;
}

/**
 * Calculate income tax (impozit pe venit) -- 10%.
 *
 * For norma_venit: 10% of the norma de venit value.
 * For sistem_real: 10% of (net income - CAS - CASS).
 *   CAS and CASS are deductible from the income tax base.
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
    return round2(base * INCOME_TAX_RATE);
  }

  // Sistem real: income tax base = net income - CAS - CASS
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
