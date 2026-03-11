/**
 * Fiscal calculation types for Fiskio.
 * Used by all E3 features: calendar, estimator, D212 guide.
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

/** Norma de venit entry for a CAEN code */
export interface NormaDeVenitEntry {
  /** CAEN code */
  caenCode: string;
  /** CAEN description in Romanian */
  caenDescription: string;
  /** Annual norma de venit value in lei */
  normaValue: number;
}

/** 2026 fiscal constants */
export const FISCAL_CONSTANTS_2026 = {
  /** CAS rate: 25% */
  CAS_RATE: 0.25,
  /** CASS rate: 10% */
  CASS_RATE: 0.10,
  /** Income tax rate: 10% */
  INCOME_TAX_RATE: 0.10,
  /** Minimum gross salary per month (lei) */
  MINIMUM_GROSS_SALARY_MONTHLY: 3700,
  /** Annual minimum gross salary (lei) */
  MINIMUM_GROSS_SALARY_ANNUAL: 3700 * 12,
  /** 6x minimum salary threshold for CASS */
  CASS_THRESHOLD_6X: 3700 * 6,
  /** 12x minimum salary threshold for CASS */
  CASS_THRESHOLD_12X: 3700 * 12,
  /** Fiscal year */
  FISCAL_YEAR: 2026,
} as const;
