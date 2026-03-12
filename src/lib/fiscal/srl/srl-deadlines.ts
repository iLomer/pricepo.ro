/**
 * SRL fiscal deadlines for 2026.
 * All deadlines for micro-enterprises (SRL micro 1%).
 *
 * Pure functions -- no side effects, no Supabase calls.
 *
 * Key deadlines:
 * - D100 (quarterly micro tax declaration + payment) - 25th of month after quarter
 * - D205 (informativa dividende/dobanzi) - end of February
 * - D300 (TVA decount) - quarterly for platitori TVA
 * - D394 (declaratie informativa) - for TVA payers, 30th of following month
 * - D390 (recapitulativa intracomunitara) - for TVA payers with EU transactions
 * - Situatii financiare anuale (bilant) - June 2, 2026 (150 zile de la incheierea exercitiului)
 * - CASS pe dividende (D212 asociat) - May 25
 * - D112 (contributii salariale) - monthly, 25th (only if company has employees)
 *
 * Dividend tax rate from 2026: 16% (was 10% in 2025, 8% in 2023-2024)
 */

import type { FiscalDeadline } from "../types";
import { SRL_CONSTANTS_2026 } from "./constants";
import { calculateQuarterlyMicroTax } from "./micro-tax";

const YEAR = SRL_CONSTANTS_2026.FISCAL_YEAR;

/** Extended deadline type that includes calculated tax amount */
export interface SRLDeadlineWithAmount extends FiscalDeadline {
  /** Calculated micro tax amount for this quarter (null if no revenue data) */
  taxAmount: number | null;
  /** Revenue for this quarter (null if no revenue data) */
  quarterRevenue: number | null;
  /** Quarter number (1-4) */
  quarter: number;
}

const QUARTER_LABELS = ["T1 (ianuarie - martie)", "T2 (aprilie - iunie)", "T3 (iulie - septembrie)", "T4 (octombrie - decembrie)"];

/**
 * Get all SRL fiscal deadlines for the current year.
 */
export function getAllSRLDeadlines(): FiscalDeadline[] {
  return [
    // ─── Annual obligations ───

    {
      id: "srl-d205",
      name: "Declaratia informativa D205",
      description:
        "Declaratia informativa privind impozitul retinut la sursa si castigurile/pierderile din anul precedent. " +
        "Include impozitul pe dividende (16%) retinut la sursa, dobanzi si alte venituri. " +
        "Se depune electronic prin SPV. Termenul este ultima zi din februarie " +
        "(2 martie 2026 deoarece 28 feb e sambata si 1 mar e duminica).",
      date: new Date(YEAR, 2, 2), // March 2 (last working day after Feb 28)
      recurrence: "annually",
      applicableRegimes: ["micro_1"],
      applicableTVAStatuses: ["platitor", "neplatitor"],
      category: "declaratie",
    },

    {
      id: "srl-cass-dividende",
      name: "CASS pe dividende - D212 asociat",
      description:
        "Daca ai incasat dividende peste 6 x salariul minim brut (24.300 lei in 2026), " +
        "ca asociat persoana fizica trebuie sa depui Declaratia Unica (D212) si sa platesti " +
        "CASS 10%. Termenul este 25 mai. Bonusul de 3% se aplica daca depui si platesti pana pe 15 aprilie.",
      date: new Date(YEAR, 4, 25), // May 25
      recurrence: "annually",
      applicableRegimes: ["micro_1"],
      applicableTVAStatuses: ["platitor", "neplatitor"],
      category: "plata",
    },

    {
      id: "srl-bilant",
      name: "Depunere situatii financiare anuale (bilant)",
      description:
        "Situatiile financiare anuale (bilant, cont de profit si pierdere) pentru anul precedent. " +
        "Se depun exclusiv online prin e-guvernare.ro, semnate cu certificat digital calificat. " +
        "Termenul este de 150 de zile de la incheierea exercitiului financiar. " +
        "Microintreprinderile depun situatii financiare simplificate. " +
        "Nedepunerea poate duce la declararea firmei ca inactiva fiscal de catre ANAF.",
      date: new Date(YEAR, 5, 2), // June 2 (May 31 is Sunday, June 1 is holiday)
      recurrence: "annually",
      applicableRegimes: ["micro_1"],
      applicableTVAStatuses: ["platitor", "neplatitor"],
      category: "declaratie",
    },

    // ─── D100 quarterly - micro tax declaration + payment ───

    {
      id: "srl-d100-q1",
      name: "D100 + plata impozit micro 1% - T1",
      description:
        `Declaratia 100 privind impozitul pe veniturile microintreprinderilor pentru ${QUARTER_LABELS[0]}. ` +
        "Se depune electronic prin SPV. In acelasi termen se plateste si impozitul micro (1%) calculat " +
        "la cifra de afaceri din trimestrul 1.",
      date: new Date(YEAR, 3, 25), // April 25
      recurrence: "quarterly",
      applicableRegimes: ["micro_1"],
      applicableTVAStatuses: ["platitor", "neplatitor"],
      category: "declaratie",
    },
    {
      id: "srl-d100-q2",
      name: "D100 + plata impozit micro 1% - T2",
      description:
        `Declaratia 100 privind impozitul pe veniturile microintreprinderilor pentru ${QUARTER_LABELS[1]}. ` +
        "Se depune electronic prin SPV. In acelasi termen se plateste si impozitul micro (1%) calculat " +
        "la cifra de afaceri din trimestrul 2.",
      date: new Date(YEAR, 6, 25), // July 25
      recurrence: "quarterly",
      applicableRegimes: ["micro_1"],
      applicableTVAStatuses: ["platitor", "neplatitor"],
      category: "declaratie",
    },
    {
      id: "srl-d100-q3",
      name: "D100 + plata impozit micro 1% - T3",
      description:
        `Declaratia 100 privind impozitul pe veniturile microintreprinderilor pentru ${QUARTER_LABELS[2]}. ` +
        "Se depune electronic prin SPV. In acelasi termen se plateste si impozitul micro (1%) calculat " +
        "la cifra de afaceri din trimestrul 3.",
      date: new Date(YEAR, 9, 25), // October 25
      recurrence: "quarterly",
      applicableRegimes: ["micro_1"],
      applicableTVAStatuses: ["platitor", "neplatitor"],
      category: "declaratie",
    },
    {
      id: "srl-d100-q4",
      name: "D100 + plata impozit micro 1% - T4",
      description:
        `Declaratia 100 privind impozitul pe veniturile microintreprinderilor pentru ${QUARTER_LABELS[3]}. ` +
        "Se depune electronic prin SPV. In acelasi termen se plateste si impozitul micro (1%) calculat " +
        "la cifra de afaceri din trimestrul 4.",
      date: new Date(YEAR + 1, 0, 25), // January 25 next year
      recurrence: "quarterly",
      applicableRegimes: ["micro_1"],
      applicableTVAStatuses: ["platitor", "neplatitor"],
      category: "declaratie",
    },

    // ─── D112 monthly - employee contributions (if company has employees) ───
    ...generateD112Deadlines(),

    // ─── TVA D300 quarterly (for platitori TVA) ───

    {
      id: "srl-d300-q1",
      name: "Decontul de TVA D300 - T1",
      description:
        "Depunerea decontului de TVA (D300) pentru trimestrul 1 (ianuarie-martie). " +
        "Se depune electronic prin SPV pana pe 25 aprilie. Include TVA colectat si TVA deductibil.",
      date: new Date(YEAR, 3, 25), // April 25
      recurrence: "quarterly",
      applicableRegimes: ["micro_1"],
      applicableTVAStatuses: ["platitor"],
      category: "tva",
    },
    {
      id: "srl-d300-q2",
      name: "Decontul de TVA D300 - T2",
      description: "Depunerea decontului de TVA (D300) pentru trimestrul 2 (aprilie-iunie).",
      date: new Date(YEAR, 6, 25), // July 25
      recurrence: "quarterly",
      applicableRegimes: ["micro_1"],
      applicableTVAStatuses: ["platitor"],
      category: "tva",
    },
    {
      id: "srl-d300-q3",
      name: "Decontul de TVA D300 - T3",
      description: "Depunerea decontului de TVA (D300) pentru trimestrul 3 (iulie-septembrie).",
      date: new Date(YEAR, 9, 25), // October 25
      recurrence: "quarterly",
      applicableRegimes: ["micro_1"],
      applicableTVAStatuses: ["platitor"],
      category: "tva",
    },
    {
      id: "srl-d300-q4",
      name: "Decontul de TVA D300 - T4",
      description: "Depunerea decontului de TVA (D300) pentru trimestrul 4 (octombrie-decembrie).",
      date: new Date(YEAR + 1, 0, 25), // January 25 next year
      recurrence: "quarterly",
      applicableRegimes: ["micro_1"],
      applicableTVAStatuses: ["platitor"],
      category: "tva",
    },

    // ─── D394 informativa (TVA payers) ───

    {
      id: "srl-d394-q1",
      name: "Declaratia informativa D394 - T1",
      description:
        "Declaratia informativa privind livrarile/prestarile si achizitiile efectuate in trimestrul 1. " +
        "Obligatorie pentru toti platitorii de TVA.",
      date: new Date(YEAR, 3, 30), // April 30
      recurrence: "quarterly",
      applicableRegimes: ["micro_1"],
      applicableTVAStatuses: ["platitor"],
      category: "tva",
    },
    {
      id: "srl-d394-q2",
      name: "Declaratia informativa D394 - T2",
      description: "Declaratia informativa privind livrarile/prestarile si achizitiile efectuate in trimestrul 2.",
      date: new Date(YEAR, 6, 30), // July 30
      recurrence: "quarterly",
      applicableRegimes: ["micro_1"],
      applicableTVAStatuses: ["platitor"],
      category: "tva",
    },
    {
      id: "srl-d394-q3",
      name: "Declaratia informativa D394 - T3",
      description: "Declaratia informativa privind livrarile/prestarile si achizitiile efectuate in trimestrul 3.",
      date: new Date(YEAR, 9, 30), // October 30
      recurrence: "quarterly",
      applicableRegimes: ["micro_1"],
      applicableTVAStatuses: ["platitor"],
      category: "tva",
    },
    {
      id: "srl-d394-q4",
      name: "Declaratia informativa D394 - T4",
      description: "Declaratia informativa privind livrarile/prestarile si achizitiile efectuate in trimestrul 4.",
      date: new Date(YEAR + 1, 0, 30), // January 30 next year
      recurrence: "quarterly",
      applicableRegimes: ["micro_1"],
      applicableTVAStatuses: ["platitor"],
      category: "tva",
    },

    // ─── D390 recapitulativa (intracomunitare, platitori TVA) ───

    {
      id: "srl-d390-q1",
      name: "Declaratia recapitulativa D390 - T1",
      description:
        "Declaratia recapitulativa privind livrarile/achizitiile intracomunitare pentru trimestrul 1. " +
        "Obligatorie doar daca ai avut operatiuni intracomunitare.",
      date: new Date(YEAR, 3, 25), // April 25
      recurrence: "quarterly",
      applicableRegimes: ["micro_1"],
      applicableTVAStatuses: ["platitor"],
      category: "tva",
    },
    {
      id: "srl-d390-q2",
      name: "Declaratia recapitulativa D390 - T2",
      description: "Declaratia recapitulativa privind livrarile/achizitiile intracomunitare pentru trimestrul 2.",
      date: new Date(YEAR, 6, 25), // July 25
      recurrence: "quarterly",
      applicableRegimes: ["micro_1"],
      applicableTVAStatuses: ["platitor"],
      category: "tva",
    },
    {
      id: "srl-d390-q3",
      name: "Declaratia recapitulativa D390 - T3",
      description: "Declaratia recapitulativa privind livrarile/achizitiile intracomunitare pentru trimestrul 3.",
      date: new Date(YEAR, 9, 25), // October 25
      recurrence: "quarterly",
      applicableRegimes: ["micro_1"],
      applicableTVAStatuses: ["platitor"],
      category: "tva",
    },
    {
      id: "srl-d390-q4",
      name: "Declaratia recapitulativa D390 - T4",
      description: "Declaratia recapitulativa privind livrarile/achizitiile intracomunitare pentru trimestrul 4.",
      date: new Date(YEAR + 1, 0, 25), // January 25 next year
      recurrence: "quarterly",
      applicableRegimes: ["micro_1"],
      applicableTVAStatuses: ["platitor"],
      category: "tva",
    },
  ];
}

/**
 * Generate monthly D112 deadlines (for SRLs with employees).
 * D112 is the monthly declaration for salary contributions (income tax, CAS, CASS on salaries).
 * Due on the 25th of the month following the salary month.
 */
function generateD112Deadlines(): FiscalDeadline[] {
  const deadlines: FiscalDeadline[] = [];

  const monthNames = [
    "ianuarie", "februarie", "martie", "aprilie",
    "mai", "iunie", "iulie", "august",
    "septembrie", "octombrie", "noiembrie", "decembrie",
  ];

  for (let month = 0; month < 12; month++) {
    const dueMonth = month + 1;
    const dueYear = dueMonth > 11 ? YEAR + 1 : YEAR;
    const adjustedDueMonth = dueMonth > 11 ? 0 : dueMonth;

    deadlines.push({
      id: `srl-d112-${month + 1}`,
      name: `D112 contributii salariale - ${monthNames[month]}`,
      description:
        `Declaratia 112 privind contributiile sociale si impozitul pe salariu pentru luna ${monthNames[month]}. ` +
        "Obligatorie doar daca SRL-ul are angajati (inclusiv administrator cu CIM). " +
        "Se depune electronic prin SPV.",
      date: new Date(dueYear, adjustedDueMonth, 25),
      recurrence: "monthly",
      applicableRegimes: ["micro_1"],
      applicableTVAStatuses: ["platitor", "neplatitor"],
      category: "declaratie",
    });
  }

  return deadlines;
}

/**
 * Get SRL D100 deadlines enriched with calculated tax amounts per quarter.
 *
 * @param quarterlyRevenues - Array of 4 numbers representing revenue for Q1-Q4.
 *   If fewer than 4 elements, remaining quarters default to 0.
 * @returns Array of SRLDeadlineWithAmount (D100 declaration deadlines only, with tax amounts)
 */
export function getSRLDeadlinesWithAmounts(
  quarterlyRevenues: number[],
): SRLDeadlineWithAmount[] {
  const allDeadlines = getAllSRLDeadlines();

  // Filter to D100 declaration deadlines only
  const d100Deadlines = allDeadlines.filter((d) => d.id.startsWith("srl-d100-"));

  return d100Deadlines.map((deadline, index) => {
    const quarter = index + 1;
    const revenue = quarterlyRevenues[index] ?? 0;
    const taxAmount = revenue > 0 ? calculateQuarterlyMicroTax(revenue) : null;

    return {
      ...deadline,
      taxAmount,
      quarterRevenue: revenue > 0 ? revenue : null,
      quarter,
    };
  });
}
