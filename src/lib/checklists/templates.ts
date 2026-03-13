import type { ChecklistTemplate } from "./types";

export const CHECKLIST_TEMPLATES: ChecklistTemplate[] = [
  {
    id: "primul-an-pfa",
    title: "Primul an ca PFA",
    description: "Tot ce trebuie sa faci fiscal in primul an de activitate ca PFA.",
    entityType: "pfa",
    steps: [
      {
        id: "inregistrare-anaf",
        label: "Inregistreaza-te la ANAF",
        description: "Depune declaratia de inregistrare fiscala (formular 070) si obtine certificatul de inregistrare.",
      },
      {
        id: "alege-regim",
        label: "Alege regimul fiscal",
        description: "Decide intre norma de venit si sistem real. Estimatorul Prevo te ajuta sa compari.",
        wikiSlug: "norma-de-venit",
      },
      {
        id: "deschide-cont-bancar",
        label: "Deschide un cont bancar dedicat",
        description: "Separa banii firmei de cei personali. Nu este obligatoriu, dar este foarte recomandat.",
      },
      {
        id: "obtine-spv",
        label: "Activeaza accesul la SPV",
        description: "Spatiul Privat Virtual al ANAF — aici depui declaratii si verifici datorii.",
        wikiSlug: "spv",
      },
      {
        id: "estimeaza-taxe",
        label: "Estimeaza taxele pentru anul curent",
        description: "Foloseste estimatorul Prevo sa vezi cat trebuie sa pui deoparte lunar pentru CAS, CASS si impozit.",
        wikiSlug: "cas",
      },
      {
        id: "depune-d212-estimare",
        label: "Depune D212 cu veniturile estimate",
        description: "Pana pe 25 mai, declari veniturile estimate pentru anul in curs si platesti contributiile.",
        wikiSlug: "declaratia-unica-d212",
      },
      {
        id: "pune-deoparte-lunar",
        label: "Pune deoparte lunar suma pentru taxe",
        description: "Recomandare: transfera lunar in contul dedicat suma calculata de estimator. Nu astepta mai.",
      },
      {
        id: "verifica-tva",
        label: "Verifica daca trebuie sa te inregistrezi la TVA",
        description: "Daca estimezi venituri peste 395,000 lei/an, te inregistrezi obligatoriu ca platitor TVA.",
        wikiSlug: "tva",
      },
      {
        id: "seteaza-alerte",
        label: "Seteaza alertele fiscale",
        description: "Activeaza alertele pe email in Prevo ca sa nu ratezi niciun termen fiscal.",
      },
    ],
  },
  {
    id: "treci-norma-sistem-real",
    title: "Treci de la norma la sistem real",
    description: "Pasii necesari cand schimbi regimul fiscal de la norma de venit la sistem real.",
    entityType: "pfa",
    steps: [
      {
        id: "compara-regimuri",
        label: "Compara cele doua regimuri in estimator",
        description: "Verifica daca la venitul si cheltuielile tale, sistemul real chiar te avantajeaza.",
        wikiSlug: "sistem-real",
      },
      {
        id: "pregateste-evidenta",
        label: "Pregateste evidenta contabila",
        description: "La sistem real ai nevoie de Registrul de incasari si plati. Poti tine evidenta in partida simpla.",
      },
      {
        id: "notifica-anaf",
        label: "Depune cererea de schimbare la ANAF",
        description: "Schimbarea de regim se face prin depunerea D212 cu optiunea pentru sistem real, pana pe 25 mai.",
        wikiSlug: "declaratia-unica-d212",
      },
      {
        id: "organizeaza-facturi",
        label: "Organizeaza facturile de cheltuieli",
        description: "Pastreaza toate facturile si bonurile. La sistem real, cheltuielile deductibile reduc impozitul.",
        wikiSlug: "sistem-real",
      },
      {
        id: "recalculeaza-taxe",
        label: "Recalculeaza taxele cu noul regim",
        description: "Introdu venitul si cheltuielile in estimatorul Prevo sa vezi cat platesti acum.",
      },
    ],
  },
  {
    id: "primul-trimestru-srl-micro",
    title: "Primul trimestru ca SRL micro",
    description: "Ce trebuie sa faci fiscal in primul trimestru dupa infiintarea SRL-ului.",
    entityType: "srl",
    steps: [
      {
        id: "verifica-micro",
        label: "Verifica eligibilitatea pentru micro",
        description: "SRL-ul trebuie sa aiba cifra de afaceri sub 100,000 EUR si sa nu fie in domenii excluse.",
        wikiSlug: "micro-intreprindere",
      },
      {
        id: "activeaza-spv-srl",
        label: "Activeaza SPV pentru SRL",
        description: "Inregistreaza SRL-ul in Spatiul Privat Virtual cu CUI-ul firmei, nu cu CNP-ul personal.",
        wikiSlug: "spv",
      },
      {
        id: "tine-evidenta-venituri",
        label: "Tine evidenta veniturilor trimestriale",
        description: "Noteaza toate veniturile incasate — impozitul micro este 1% din cifra de afaceri.",
      },
      {
        id: "depune-d100-t1",
        label: "Depune D100 pentru primul trimestru",
        description: "Pana pe 25 a lunii urmatoare trimestrului, declari si platesti 1% din venituri.",
        wikiSlug: "d100",
      },
      {
        id: "intelege-dividende",
        label: "Intelege cum functioneaza dividendele",
        description: "Dividendele sunt singura cale legala de a scoate bani din SRL. Impozit 16% + posibil CASS.",
        wikiSlug: "dividende-srl",
      },
      {
        id: "verifica-d112",
        label: "Verifica daca trebuie sa depui D112",
        description: "Daca ai angajati sau contract de administrator, depui D112 lunar pana pe 25.",
        wikiSlug: "d112",
      },
      {
        id: "seteaza-alerte-srl",
        label: "Seteaza alertele fiscale in Prevo",
        description: "Activeaza alertele pe email ca sa nu ratezi termenele trimestriale.",
      },
    ],
  },
];

/** Get checklist template by ID */
export function getChecklistById(id: string): ChecklistTemplate | undefined {
  return CHECKLIST_TEMPLATES.find((c) => c.id === id);
}

/** Get checklist templates for an entity type */
export function getChecklistsForEntity(entityType: string): ChecklistTemplate[] {
  return CHECKLIST_TEMPLATES.filter((c) => c.entityType === entityType);
}
