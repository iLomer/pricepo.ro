/**
 * SRL-specific fiscal types for Prevo.
 * Used by all E7 SRL features: dividend simulator, CASS estimator, cash flow, D100 calendar.
 *
 * 2026: OUG 89/2025 eliminated micro 3% - all micros pay 1% flat.
 */

/** Micro tax regime type - only micro_1 exists from 2026 */
export type SRLMicroRegime = "micro_1";

/** Breakdown of SRL micro tax calculation */
export interface SRLMicroTaxBreakdown {
  /** Total annual revenue (cifra de afaceri) */
  annualRevenue: number;
  /** Tax rate applied (0.01) */
  taxRate: number;
  /** Annual micro tax amount */
  annualTax: number;
  /** Quarterly micro tax amounts (Q1-Q4) */
  quarterlyTax: number;
  /** Monthly set-aside recommendation */
  monthlySetAside: number;
  /** Effective tax rate as percentage */
  effectiveTaxRate: number;
}

/** Breakdown of dividend net calculation after all taxes */
export interface DividendBreakdown {
  /** Gross dividend amount declared */
  grossDividend: number;
  /** Dividend tax amount (16%) */
  dividendTax: number;
  /** Dividend tax rate applied */
  dividendTaxRate: number;
  /** Whether CASS applies to this dividend */
  cassApplies: boolean;
  /** CASS amount on dividends (10% if applicable) */
  cassAmount: number;
  /** Total deductions (dividend tax + CASS) */
  totalDeductions: number;
  /** Net amount in hand after all taxes */
  netDividend: number;
  /** Effective tax rate as percentage (total deductions / gross * 100) */
  effectiveTaxRate: number;
  /** Running total of dividends this year (including this one) */
  annualDividendsTotal: number;
}

/** Result of CASS dividend threshold calculation */
export interface CASSDividendResult {
  /** Total annual dividends used for calculation */
  annualDividends: number;
  /** Whether CASS obligation applies */
  cassApplies: boolean;
  /** CASS amount to pay (0 if below threshold) */
  cassAmount: number;
  /** The CASS rate applied (10%) */
  cassRate: number;
  /** The base used for CASS calculation */
  cassBase: number;
  /** The 6x minimum wage threshold */
  threshold6x: number;
  /** Amount remaining before crossing the 6x threshold (0 if already over) */
  remainingBeforeThreshold: number;
  /** Percentage of 6x threshold used (0-100+) */
  thresholdPercentage: number;
  /** The CASS cap (24x minimum wages for dividends) */
  cassCap: number;
  /** Warning message in Romanian (null if no warning) */
  warningMessage: string | null;
}

/** SRL fiscal constants for a given year */
export interface SRLFiscalConstants {
  /** Micro tax rate (1% for all micros from 2026) */
  MICRO_TAX_RATE: number;
  /** Dividend tax rate (16% from 2026) */
  DIVIDEND_TAX_RATE: number;
  /** CASS rate on dividends */
  CASS_DIVIDEND_RATE: number;
  /** Minimum gross salary per month (lei) */
  MINIMUM_GROSS_SALARY_MONTHLY: number;
  /** CASS threshold: 6x minimum gross salary (annual) */
  CASS_DIVIDEND_THRESHOLD_6X: number;
  /** CASS threshold: 12x minimum gross salary */
  CASS_DIVIDEND_THRESHOLD_12X: number;
  /** CASS cap: 24x minimum gross salary (for dividends) */
  CASS_DIVIDEND_CAP_24X: number;
  /** Revenue ceiling for micro status (EUR) */
  MICRO_REVENUE_CEILING_EUR: number;
  /** Fiscal year */
  FISCAL_YEAR: number;
}
