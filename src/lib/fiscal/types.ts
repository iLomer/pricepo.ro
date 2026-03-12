/**
 * Fiscal calculation types for Prevo.
 * Used by all E3 features: calendar, estimator, D212 guide.
 *
 * 2026 rates and thresholds based on:
 * - OUG 8/2026, OUG 89/2025
 * - Minimum gross salary: 4,050 lei/month (Jan-Jun), 4,325 lei/month (Jul-Dec)
 * - Thresholds calculated on Jan 1 minimum salary (4,050 lei)
 */

import type { FiscalRegime, TVAStatus } from "@/types";

/** Breakdown of all PFA taxes for a given income */
export interface TaxBreakdown {
  /** Gross annual income entered by user */
  grossIncome: number;
  /** Deductible expenses (sistem real only, 0 for norma) */
  expenses: number;
  /** Net income used for tax base (gross - expenses for sistem real, norma value for norma) */
  taxableBase: number;
  /** CAS -- Contributia de Asigurari Sociale (25%) */
  cas: number;
  /** CASS -- Contributia de Asigurari Sociale de Sanatate (10%) */
  cass: number;
  /** Impozit pe venit (10%) */
  incomeTax: number;
  /** Total taxes: CAS + CASS + impozit */
  totalTax: number;
  /** Net income after all taxes: gross - expenses - totalTax */
  netIncome: number;
  /** Effective tax rate as a percentage (totalTax / grossIncome * 100) */
  effectiveTaxRate: number;
  /** Monthly set-aside suggestion (totalTax / 12) */
  monthlySetAside: number;
  /** Regime used for calculation */
  regime: FiscalRegime;
  /** Norma de venit value used (only for norma_venit regime, null otherwise) */
  normaValue: number | null;
}

/** A fiscal deadline definition */
export interface FiscalDeadline {
  /** Unique identifier */
  id: string;
  /** Deadline name (Romanian) */
  name: string;
  /** Full description explaining what this deadline is about */
  description: string;
  /** The date of this deadline in the current fiscal year */
  date: Date;
  /** Whether this deadline recurs (monthly, quarterly, annually) */
  recurrence: "monthly" | "quarterly" | "annually";
  /** Which fiscal regimes this deadline applies to (empty = all) */
  applicableRegimes: FiscalRegime[];
  /** Which TVA statuses this deadline applies to (empty = all) */
  applicableTVAStatuses: TVAStatus[];
  /** Category for grouping */
  category: "declaratie" | "plata" | "tva";
}

/** Filter criteria for deadlines */
export interface DeadlineFilter {
  /** User's fiscal regime */
  regime: FiscalRegime;
  /** User's TVA status */
  tvaStatus: TVAStatus;
  /** Start date for filtering (inclusive) */
  fromDate: Date;
  /** End date for filtering (inclusive) */
  toDate: Date;
}

/** A legislative source citation */
export interface LegislativeSource {
  /** Act name, e.g. "Codul Fiscal (Legea 227/2015)" or "OUG 89/2025" */
  act: string;
  /** What this act regulates in context of the topic */
  relevance: string;
  /** Monitorul Oficial reference, e.g. "M.Of. nr. 688 din 10.09.2015" */
  monitorOficial?: string;
}

/** Norma de venit entry for a CAEN code */
export interface NormaDeVenitEntry {
  /** CAEN code */
  caenCode: string;
  /** CAEN description in Romanian */
  caenDescription: string;
  /** Annual norma de venit value in lei */
  normaValue: number;
}

/**
 * 2026 fiscal constants for PFA.
 *
 * Minimum gross salary: 4,050 lei/month (Jan-Jun 2026), 4,325 lei/month (Jul-Dec 2026).
 * Thresholds use the Jan 1 value (4,050 lei) per ANAF rules.
 *
 * CAS (pensie) - 25%:
 *   Below 12x: 0 (optional)
 *   12x - 24x: 25% of 12x minimum salaries
 *   Above 24x: 25% of 24x minimum salaries
 *
 * CASS (sanatate) - 10%:
 *   Below 6x: 10% of 6x (minimum floor, unless also employed)
 *   6x - 72x: 10% of actual income
 *   Above 72x: 10% of 72x (cap)
 *
 * Income tax - 10% of taxable base (after CAS + CASS deductions)
 */
export const FISCAL_CONSTANTS_2026 = {
  /** CAS rate: 25% */
  CAS_RATE: 0.25,
  /** CASS rate: 10% */
  CASS_RATE: 0.10,
  /** Income tax rate: 10% */
  INCOME_TAX_RATE: 0.10,
  /** Minimum gross salary per month (lei) - Jan-Jun 2026 */
  MINIMUM_GROSS_SALARY_MONTHLY: 4050,
  /** Annual minimum gross salary (lei) - 4,050 x 12 */
  MINIMUM_GROSS_SALARY_ANNUAL: 4050 * 12,
  /** 6x minimum salary threshold (CASS minimum floor) */
  CASS_THRESHOLD_6X: 4050 * 6,
  /** 12x minimum salary threshold (CAS trigger) */
  CAS_THRESHOLD_12X: 4050 * 12,
  /** 24x minimum salary threshold (CAS upper tier) */
  CAS_THRESHOLD_24X: 4050 * 24,
  /** 72x minimum salary (CASS cap) */
  CASS_CAP_72X: 4050 * 72,
  /** TVA registration threshold (lei) - from April 2025 */
  TVA_THRESHOLD: 395000,
  /** Fiscal year */
  FISCAL_YEAR: 2026,
} as const;
