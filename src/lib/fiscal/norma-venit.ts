/**
 * Norma de venit reference values by CAEN code.
 * Top 20 most common PFA CAEN codes for MVP.
 *
 * Values are approximate 2026 norma de venit amounts (lei/year).
 * Actual values vary by county (judet) -- these are Bucharest/national averages.
 * In production, this should be replaced with county-specific data.
 */

import type { NormaDeVenitEntry } from "./types";

export const NORMA_DE_VENIT_VALUES: NormaDeVenitEntry[] = [
  {
    caenCode: "6201",
    caenDescription: "Activitati de realizare a software-ului la comanda",
    normaValue: 29000,
  },
  {
    caenCode: "6202",
    caenDescription: "Activitati de consultanta in tehnologia informatiei",
    normaValue: 29000,
  },
  {
    caenCode: "6209",
    caenDescription: "Alte activitati de servicii privind tehnologia informatiei",
    normaValue: 26000,
  },
  {
    caenCode: "6311",
    caenDescription: "Prelucrarea datelor, administrarea paginilor web",
    normaValue: 24000,
  },
  {
    caenCode: "7022",
    caenDescription: "Activitati de consultanta pentru afaceri si management",
    normaValue: 28000,
  },
  {
    caenCode: "7311",
    caenDescription: "Activitati ale agentiilor de publicitate",
    normaValue: 25000,
  },
  {
    caenCode: "7410",
    caenDescription: "Activitati de design specializat",
    normaValue: 22000,
  },
  {
    caenCode: "7420",
    caenDescription: "Activitati fotografice",
    normaValue: 20000,
  },
  {
    caenCode: "7021",
    caenDescription: "Activitati de consultanta in domeniul relatiilor publice",
    normaValue: 26000,
  },
  {
    caenCode: "7112",
    caenDescription: "Activitati de inginerie si consultanta tehnica",
    normaValue: 30000,
  },
  {
    caenCode: "7111",
    caenDescription: "Activitati de arhitectura",
    normaValue: 28000,
  },
  {
    caenCode: "6910",
    caenDescription: "Activitati juridice",
    normaValue: 32000,
  },
  {
    caenCode: "6920",
    caenDescription: "Activitati de contabilitate si audit financiar",
    normaValue: 30000,
  },
  {
    caenCode: "8559",
    caenDescription: "Alte forme de invatamant n.c.a.",
    normaValue: 20000,
  },
  {
    caenCode: "8621",
    caenDescription: "Activitati de asistenta medicala generala",
    normaValue: 35000,
  },
  {
    caenCode: "8623",
    caenDescription: "Activitati de asistenta stomatologica",
    normaValue: 38000,
  },
  {
    caenCode: "7490",
    caenDescription: "Alte activitati profesionale, stiintifice si tehnice n.c.a.",
    normaValue: 22000,
  },
  {
    caenCode: "9001",
    caenDescription: "Activitati de interpretare artistica (spectacole)",
    normaValue: 18000,
  },
  {
    caenCode: "9002",
    caenDescription: "Activitati suport pentru interpretare artistica",
    normaValue: 16000,
  },
  {
    caenCode: "4791",
    caenDescription: "Comert cu amanuntul prin intermediul caselor de comenzi sau prin Internet",
    normaValue: 24000,
  },
];

/**
 * Get the norma de venit value for a given CAEN code.
 * Returns null if the CAEN code is not in the reference table.
 */
export function getNormaDeVenit(caenCode: string): number | null {
  const entry = NORMA_DE_VENIT_VALUES.find((e) => e.caenCode === caenCode);
  return entry ? entry.normaValue : null;
}

/**
 * Get the full norma de venit entry for a given CAEN code.
 * Returns null if the CAEN code is not in the reference table.
 */
export function getNormaDeVenitEntry(caenCode: string): NormaDeVenitEntry | null {
  return NORMA_DE_VENIT_VALUES.find((e) => e.caenCode === caenCode) ?? null;
}

/**
 * Get all available norma de venit entries.
 */
export function getAllNormaDeVenitEntries(): NormaDeVenitEntry[] {
  return [...NORMA_DE_VENIT_VALUES];
}
