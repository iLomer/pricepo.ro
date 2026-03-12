/**
 * PFA fiscal deadlines for 2026.
 * All deadlines include: name, date, recurrence, description,
 * applicable regimes, and applicable TVA statuses.
 *
 * Pure functions -- no side effects, no Supabase calls.
 *
 * Key dates:
 * - April 15: D212 early filing + full payment = 3% bonus on income tax
 * - May 25: D212 final deadline + CAS/CASS/impozit payment
 * - D300 (TVA): monthly or quarterly, due 25th of following month
 * - D394 (informativa): for TVA payers, due 30th of following month
 * - D390 (recapitulativa): for intra-community transactions
 */

import type { FiscalRegime, TVAStatus } from "@/types";
import type { FiscalDeadline, DeadlineFilter } from "./types";
import { FISCAL_CONSTANTS_2026 } from "./types";

const YEAR = FISCAL_CONSTANTS_2026.FISCAL_YEAR;

/**
 * All PFA fiscal deadlines for the current fiscal year.
 */
export function getAllPFADeadlines(): FiscalDeadline[] {
  return [
    // ─── D212 - Declaratia Unica ───

    // Early filing with bonus
    {
      id: "d212-early-bonus",
      name: "D212 anticipat + plata integrala = bonus 3%",
      description:
        "Daca depui Declaratia Unica (D212) si platesti integral impozitul pe venit, CAS si CASS " +
        "pana pe 15 aprilie, beneficiezi de o reducere de 3% din impozitul pe venit (OUG 8/2026). " +
        "Bonusul se aplica DOAR pe impozitul pe venit, nu pe CAS/CASS.",
      date: new Date(YEAR, 3, 15), // April 15
      recurrence: "annually",
      applicableRegimes: ["norma_venit", "sistem_real"],
      applicableTVAStatuses: ["platitor", "neplatitor"],
      category: "declaratie",
    },

    // Final D212 deadline
    {
      id: "d212-submission",
      name: "Depunere D212 + plata impozit, CAS, CASS (termen final)",
      description:
        "Termenul limita pentru depunerea Declaratiei Unice privind impozitul pe venit si contributiile sociale " +
        "pentru veniturile din anul precedent. Se depune electronic prin SPV. " +
        "In acelasi termen se platesc impozitul pe venit, CAS (25%) si CASS (10%).",
      date: new Date(YEAR, 4, 25), // May 25
      recurrence: "annually",
      applicableRegimes: ["norma_venit", "sistem_real"],
      applicableTVAStatuses: ["platitor", "neplatitor"],
      category: "declaratie",
    },

    // ─── TVA D300 - Monthly deadlines (for monthly TVA filers) ───
    ...generateMonthlyTVADeadlines(),

    // ─── TVA D300 - Quarterly deadlines ───
    ...generateQuarterlyTVADeadlines(),

    // ─── D394 - Declaratia informativa (TVA payers) ───
    ...generateD394Deadlines(),

    // ─── D390 - Recapitulativa intracomunitara ───
    {
      id: "d390-q1",
      name: "Declaratia recapitulativa D390 - T1",
      description:
        "Declaratia recapitulativa privind livrarile/achizitiile intracomunitare pentru trimestrul 1. " +
        "Obligatorie doar daca ai avut operatiuni intracomunitare.",
      date: new Date(YEAR, 3, 25), // April 25
      recurrence: "quarterly",
      applicableRegimes: ["norma_venit", "sistem_real"],
      applicableTVAStatuses: ["platitor"],
      category: "tva",
    },
    {
      id: "d390-q2",
      name: "Declaratia recapitulativa D390 - T2",
      description: "Declaratia recapitulativa privind livrarile/achizitiile intracomunitare pentru trimestrul 2.",
      date: new Date(YEAR, 6, 25), // July 25
      recurrence: "quarterly",
      applicableRegimes: ["norma_venit", "sistem_real"],
      applicableTVAStatuses: ["platitor"],
      category: "tva",
    },
    {
      id: "d390-q3",
      name: "Declaratia recapitulativa D390 - T3",
      description: "Declaratia recapitulativa privind livrarile/achizitiile intracomunitare pentru trimestrul 3.",
      date: new Date(YEAR, 9, 25), // October 25
      recurrence: "quarterly",
      applicableRegimes: ["norma_venit", "sistem_real"],
      applicableTVAStatuses: ["platitor"],
      category: "tva",
    },
    {
      id: "d390-q4",
      name: "Declaratia recapitulativa D390 - T4",
      description: "Declaratia recapitulativa privind livrarile/achizitiile intracomunitare pentru trimestrul 4.",
      date: new Date(YEAR + 1, 0, 25), // January 25 next year
      recurrence: "quarterly",
      applicableRegimes: ["norma_venit", "sistem_real"],
      applicableTVAStatuses: ["platitor"],
      category: "tva",
    },
  ];
}

/**
 * Generate monthly TVA D300 deadlines (for monthly TVA filers).
 * Due on the 25th of the following month.
 */
function generateMonthlyTVADeadlines(): FiscalDeadline[] {
  const deadlines: FiscalDeadline[] = [];

  const monthNames = [
    "ianuarie", "februarie", "martie", "aprilie",
    "mai", "iunie", "iulie", "august",
    "septembrie", "octombrie", "noiembrie", "decembrie",
  ];

  for (let month = 0; month < 12; month++) {
    const dueMonth = month + 1; // Due in the following month
    const dueYear = dueMonth > 11 ? YEAR + 1 : YEAR;
    const adjustedDueMonth = dueMonth > 11 ? 0 : dueMonth;

    deadlines.push({
      id: `d300-monthly-${month + 1}`,
      name: `Decontul de TVA D300 - ${monthNames[month]}`,
      description:
        `Depunerea decontului de TVA (D300) pentru luna ${monthNames[month]} ${YEAR}. ` +
        "Se depune electronic prin SPV pana pe 25 ale lunii urmatoare.",
      date: new Date(dueYear, adjustedDueMonth, 25),
      recurrence: "monthly",
      applicableRegimes: ["norma_venit", "sistem_real"],
      applicableTVAStatuses: ["platitor"],
      category: "tva",
    });
  }

  return deadlines;
}

/**
 * Generate D394 (declaratie informativa) deadlines for TVA payers.
 * Due on the 30th of the month following the reporting period.
 * Filed quarterly (same frequency as D300 for most PFA).
 */
function generateD394Deadlines(): FiscalDeadline[] {
  return [
    {
      id: "d394-q1",
      name: "Declaratia informativa D394 - T1",
      description:
        "Declaratia informativa privind livrarile/prestarile si achizitiile efectuate in trimestrul 1. " +
        "Obligatorie pentru toti platitorii de TVA. Se depune electronic prin SPV.",
      date: new Date(YEAR, 3, 30), // April 30
      recurrence: "quarterly",
      applicableRegimes: ["norma_venit", "sistem_real"],
      applicableTVAStatuses: ["platitor"],
      category: "tva",
    },
    {
      id: "d394-q2",
      name: "Declaratia informativa D394 - T2",
      description: "Declaratia informativa privind livrarile/prestarile si achizitiile efectuate in trimestrul 2.",
      date: new Date(YEAR, 6, 30), // July 30
      recurrence: "quarterly",
      applicableRegimes: ["norma_venit", "sistem_real"],
      applicableTVAStatuses: ["platitor"],
      category: "tva",
    },
    {
      id: "d394-q3",
      name: "Declaratia informativa D394 - T3",
      description: "Declaratia informativa privind livrarile/prestarile si achizitiile efectuate in trimestrul 3.",
      date: new Date(YEAR, 9, 30), // October 30
      recurrence: "quarterly",
      applicableRegimes: ["norma_venit", "sistem_real"],
      applicableTVAStatuses: ["platitor"],
      category: "tva",
    },
    {
      id: "d394-q4",
      name: "Declaratia informativa D394 - T4",
      description: "Declaratia informativa privind livrarile/prestarile si achizitiile efectuate in trimestrul 4.",
      date: new Date(YEAR + 1, 0, 30), // January 30 next year
      recurrence: "quarterly",
      applicableRegimes: ["norma_venit", "sistem_real"],
      applicableTVAStatuses: ["platitor"],
      category: "tva",
    },
  ];
}

/**
 * Generate quarterly TVA D300 deadlines (for quarterly TVA filers).
 * Due on the 25th of the month following the quarter end.
 */
function generateQuarterlyTVADeadlines(): FiscalDeadline[] {
  return [
    {
      id: "d300-q1",
      name: "Decontul de TVA D300 - Trimestrul 1",
      description:
        "Depunerea decontului de TVA (D300) pentru trimestrul 1 (ianuarie-martie). " +
        "Se depune electronic prin SPV pana pe 25 aprilie.",
      date: new Date(YEAR, 3, 25), // April 25
      recurrence: "quarterly",
      applicableRegimes: ["norma_venit", "sistem_real"],
      applicableTVAStatuses: ["platitor"],
      category: "tva",
    },
    {
      id: "d300-q2",
      name: "Decontul de TVA D300 - Trimestrul 2",
      description:
        "Depunerea decontului de TVA (D300) pentru trimestrul 2 (aprilie-iunie). " +
        "Se depune electronic prin SPV pana pe 25 iulie.",
      date: new Date(YEAR, 6, 25), // July 25
      recurrence: "quarterly",
      applicableRegimes: ["norma_venit", "sistem_real"],
      applicableTVAStatuses: ["platitor"],
      category: "tva",
    },
    {
      id: "d300-q3",
      name: "Decontul de TVA D300 - Trimestrul 3",
      description:
        "Depunerea decontului de TVA (D300) pentru trimestrul 3 (iulie-septembrie). " +
        "Se depune electronic prin SPV pana pe 25 octombrie.",
      date: new Date(YEAR, 9, 25), // October 25
      recurrence: "quarterly",
      applicableRegimes: ["norma_venit", "sistem_real"],
      applicableTVAStatuses: ["platitor"],
      category: "tva",
    },
    {
      id: "d300-q4",
      name: "Decontul de TVA D300 - Trimestrul 4",
      description:
        "Depunerea decontului de TVA (D300) pentru trimestrul 4 (octombrie-decembrie). " +
        "Se depune electronic prin SPV pana pe 25 ianuarie anul urmator.",
      date: new Date(YEAR + 1, 0, 25), // January 25 next year
      recurrence: "quarterly",
      applicableRegimes: ["norma_venit", "sistem_real"],
      applicableTVAStatuses: ["platitor"],
      category: "tva",
    },
  ];
}

/**
 * Filter deadlines based on user's fiscal profile and date range.
 *
 * Filters by:
 * - Regime: only shows deadlines applicable to user's regime
 * - TVA status: hides TVA deadlines for non-TVA payers
 * - Date range: only deadlines within fromDate..toDate
 *
 * Returns deadlines sorted chronologically.
 */
export function filterDeadlines(filter: DeadlineFilter): FiscalDeadline[] {
  const allDeadlines = getAllPFADeadlines();

  return allDeadlines
    .filter((deadline) => {
      // Check regime applicability
      if (
        deadline.applicableRegimes.length > 0 &&
        !deadline.applicableRegimes.includes(filter.regime)
      ) {
        return false;
      }

      // Check TVA status applicability
      if (
        deadline.applicableTVAStatuses.length > 0 &&
        !deadline.applicableTVAStatuses.includes(filter.tvaStatus)
      ) {
        return false;
      }

      // Check date range
      const deadlineTime = deadline.date.getTime();
      return deadlineTime >= filter.fromDate.getTime() && deadlineTime <= filter.toDate.getTime();
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime());
}

/**
 * Get deadlines for the next N days from a given date.
 * Convenience wrapper around filterDeadlines.
 */
export function getUpcomingDeadlines(
  regime: FiscalRegime,
  tvaStatus: TVAStatus,
  fromDate: Date = new Date(),
  days: number = 30
): FiscalDeadline[] {
  const toDate = new Date(fromDate);
  toDate.setDate(toDate.getDate() + days);

  return filterDeadlines({
    regime,
    tvaStatus,
    fromDate,
    toDate,
  });
}

/**
 * Filter deadlines from any source (PFA or SRL) by regime, TVA status, and date range.
 * Returns deadlines sorted chronologically.
 */
export function filterDeadlinesGeneric(
  allDeadlines: FiscalDeadline[],
  filter: DeadlineFilter
): FiscalDeadline[] {
  return allDeadlines
    .filter((deadline) => {
      if (
        deadline.applicableRegimes.length > 0 &&
        !deadline.applicableRegimes.includes(filter.regime)
      ) {
        return false;
      }

      if (
        deadline.applicableTVAStatuses.length > 0 &&
        !deadline.applicableTVAStatuses.includes(filter.tvaStatus)
      ) {
        return false;
      }

      const deadlineTime = deadline.date.getTime();
      return deadlineTime >= filter.fromDate.getTime() && deadlineTime <= filter.toDate.getTime();
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime());
}
