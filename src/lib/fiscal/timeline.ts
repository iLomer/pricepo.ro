/**
 * Fiscal year timeline data aggregation.
 * Maps deadlines to months with cumulative payment totals.
 *
 * Pure functions -- no side effects, no Supabase calls.
 */

import type { FiscalDeadline, TaxBreakdown } from "./types";

/** A single month entry in the annual timeline */
export interface TimelineEntry {
  /** Month index (0-11) */
  month: number;
  /** Romanian month name */
  monthName: string;
  /** Deadlines falling in this month */
  deadlines: FiscalDeadline[];
  /** Total payment amount due this month (lei) */
  paymentAmount: number;
  /** Cumulative payment amount from Jan through this month */
  cumulativeAmount: number;
  /** Whether this month has any payments due */
  isPaymentMonth: boolean;
}

const MONTH_NAMES = [
  "Ianuarie", "Februarie", "Martie", "Aprilie",
  "Mai", "Iunie", "Iulie", "August",
  "Septembrie", "Octombrie", "Noiembrie", "Decembrie",
];

/** Known payment deadline IDs mapped to TaxBreakdown fields */
const PFA_PAYMENT_MAP: Record<string, (b: TaxBreakdown) => number> = {
  "d212-early-bonus": (b) => b.totalTax,
  "d212-submission": (b) => b.totalTax,
};

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * Build an annual timeline from deadlines and optional tax breakdown.
 *
 * @param deadlines - Filtered deadlines for the user's profile
 * @param taxBreakdown - Optional PFA tax breakdown for payment amounts
 */
export function buildAnnualTimeline(
  deadlines: FiscalDeadline[],
  taxBreakdown?: TaxBreakdown
): TimelineEntry[] {
  // Group deadlines by month
  const monthDeadlines = new Map<number, FiscalDeadline[]>();
  for (let m = 0; m < 12; m++) {
    monthDeadlines.set(m, []);
  }

  for (const d of deadlines) {
    const month = d.date.getMonth();
    if (month >= 0 && month < 12) {
      monthDeadlines.get(month)!.push(d);
    }
  }

  let cumulative = 0;
  const entries: TimelineEntry[] = [];

  for (let m = 0; m < 12; m++) {
    const monthDls = monthDeadlines.get(m)!;
    let paymentAmount = 0;

    if (taxBreakdown) {
      for (const d of monthDls) {
        const mapper = PFA_PAYMENT_MAP[d.id];
        if (mapper) {
          paymentAmount = round2(mapper(taxBreakdown));
          break; // Only count once (d212-early-bonus and d212-submission are alternatives)
        }
      }
    }

    // For SRL quarterly deadlines, check if any have "plata" category
    if (!taxBreakdown) {
      for (const d of monthDls) {
        if (d.category === "plata") {
          // Amount unknown without breakdown data, leave as 0
        }
      }
    }

    cumulative = round2(cumulative + paymentAmount);

    entries.push({
      month: m,
      monthName: MONTH_NAMES[m],
      deadlines: monthDls.sort((a, b) => a.date.getTime() - b.date.getTime()),
      paymentAmount,
      cumulativeAmount: cumulative,
      isPaymentMonth: paymentAmount > 0,
    });
  }

  return entries;
}
