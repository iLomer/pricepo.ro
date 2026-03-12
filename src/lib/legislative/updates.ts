/**
 * Curated legislative updates for the fiscal monitor.
 * Real Romanian fiscal legislation changes from 2024-2026.
 * Sorted newest first.
 */

import type { LegislativeUpdate } from "./types";

export const LEGISLATIVE_UPDATES: LegislativeUpdate[] = [
  {
    slug: "oug-8-2026-bonus-d212",
    title: "Bonus 3% pentru depunerea anticipata a D212",
    summary:
      "OUG 8/2026 introduce un bonus de 3% din impozitul pe venit pentru contribuabilii care depun Declaratia Unica (D212) si platesc integral pana pe 15 aprilie. Bonusul se aplica doar la impozitul pe venit, nu la CAS sau CASS.",
    impactDescription:
      "Daca ai PFA si depui D212 + platesti tot pana pe 15 aprilie, economisesti 3% din impozitul pe venit. Pentru un impozit de 5,000 lei, asta inseamna 150 lei economie. Mergi la estimatorul Prevo sa vezi exact cat economisesti.",
    publishedDate: "2026-02-15",
    effectiveDate: "2026-01-01",
    category: "oug",
    affectedEntities: ["pfa"],
    relatedWikiSlugs: ["declaratia-unica-d212", "impozit-venit-pfa"],
    tags: ["d212", "bonus", "impozit", "termen"],
  },
  {
    slug: "hg-salariu-minim-2026",
    title: "Salariul minim brut creste la 4,050 lei (ian-iun) si 4,325 lei (iul-dec)",
    summary:
      "Incepand cu 1 ianuarie 2026, salariul minim brut pe economie este 4,050 lei/luna. Din iulie 2026, creste la 4,325 lei/luna. Aceasta modificare afecteaza direct pragurile de CAS si CASS.",
    impactDescription:
      "Toate pragurile fiscale se recalculeaza: CAS obligatoriu peste 48,600 lei venit net (12 x 4,050). CASS minim: 2,430 lei/an (6 x 4,050 x 10%). Pragul CASS maxim: 291,600 lei (72 x 4,050). Verifica in estimatorul Prevo noile sume.",
    publishedDate: "2025-12-20",
    effectiveDate: "2026-01-01",
    category: "hg",
    affectedEntities: ["both"],
    relatedWikiSlugs: ["cas", "cass", "impozit-venit-pfa"],
    tags: ["salariu minim", "cas", "cass", "praguri"],
  },
  {
    slug: "oug-89-2025-salariu-minim",
    title: "OUG 89/2025 — baza de calcul CAS/CASS actualizata",
    summary:
      "OUG 89/2025 actualizeaza baza de calcul pentru CAS si CASS in functie de noul salariu minim brut. Pragurile se calculeaza pe baza valorii de la 1 ianuarie (4,050 lei), conform regulilor ANAF.",
    impactDescription:
      "Daca esti PFA, CAS si CASS se calculeaza pe baza salariului minim de la 1 ianuarie (4,050 lei), nu pe cel din iulie. Asta inseamna ca pragurile raman stabile tot anul: 48,600 lei (12x) si 97,200 lei (24x) pentru CAS.",
    publishedDate: "2025-10-01",
    effectiveDate: "2026-01-01",
    category: "oug",
    affectedEntities: ["pfa"],
    relatedWikiSlugs: ["cas", "cass"],
    tags: ["cas", "cass", "salariu minim", "praguri"],
  },
  {
    slug: "cod-fiscal-deducere-cas-cass-2024",
    title: "CAS si CASS devin cheltuieli deductibile din impozit (din 2024)",
    summary:
      "Modificare majora la Codul Fiscal: incepand cu anul fiscal 2024, contributiile CAS si CASS platite de PFA se scad din venitul net inainte de calculul impozitului pe venit de 10%. Anterior, impozitul se calcula pe venitul net fara aceasta deducere.",
    impactDescription:
      "Economie reala: daca ai venit net 100,000 lei, CAS 12,150 lei si CASS 10,000 lei, impozitul scade de la 10,000 lei la 7,785 lei. Economie de 2,215 lei/an. Estimatorul Prevo calculeaza deja cu aceasta deducere.",
    publishedDate: "2023-12-22",
    effectiveDate: "2024-01-01",
    category: "lege",
    affectedEntities: ["pfa"],
    relatedWikiSlugs: ["impozit-venit-pfa", "cas", "cass"],
    tags: ["impozit", "deducere", "cas", "cass"],
  },
  {
    slug: "legea-296-2023-micro-1-procent",
    title: "Impozit micro-intreprindere: 1% indiferent de angajati",
    summary:
      "Legea 296/2023 simplifica regimul micro-intreprinderilor. Cota unica de 1% pe venituri, indiferent daca ai sau nu angajati. Anterior, cota era 3% fara angajati si 1% cu minim un angajat.",
    impactDescription:
      "Daca ai SRL micro fara angajati, platesti acum 1% in loc de 3%. Pentru o cifra de afaceri de 200,000 lei/an, economisesti 4,000 lei. Nu mai trebuie sa angajezi pe cineva doar pentru cota redusa.",
    publishedDate: "2023-11-15",
    effectiveDate: "2024-01-01",
    category: "lege",
    affectedEntities: ["srl"],
    relatedWikiSlugs: ["micro-intreprindere"],
    tags: ["micro", "impozit", "1%", "srl"],
  },
  {
    slug: "prag-tva-395000-lei",
    title: "Pragul de inregistrare TVA creste la 395,000 lei",
    summary:
      "Incepand cu aprilie 2025, pragul de scutire de TVA creste de la 300,000 lei la 395,000 lei (echivalentul a 88,500 EUR). Poti factura pana la acest prag fara a deveni platitor de TVA.",
    impactDescription:
      "Daca ai cifra de afaceri sub 395,000 lei/an, nu esti obligat sa te inregistrezi ca platitor de TVA. Daca erai platitor si nu depaseai noul prag, poti solicita scoaterea din registrul TVA. Verifica situatia ta in calendarul Prevo.",
    publishedDate: "2025-03-15",
    effectiveDate: "2025-04-01",
    category: "lege",
    affectedEntities: ["both"],
    relatedWikiSlugs: ["tva"],
    tags: ["tva", "prag", "scutire"],
  },
  {
    slug: "oug-115-2023-tva-19",
    title: "TVA standard ramane 19% — cotele reduse actualizate",
    summary:
      "OUG 115/2023 mentine cota standard de TVA la 19%. Cotele reduse: 9% pentru alimente, medicamente, turism. 5% pentru carti, locuinte sociale. Modificari la lista produselor cu cote reduse.",
    impactDescription:
      "Daca esti platitor de TVA, cotele raman neschimbate: 19% standard, 9% si 5% reduse. Verifica daca produsele sau serviciile tale se incadreaza la o cota redusa — poate fi un avantaj competitiv.",
    publishedDate: "2023-12-15",
    effectiveDate: "2024-01-01",
    category: "oug",
    affectedEntities: ["both"],
    relatedWikiSlugs: ["tva", "d300"],
    tags: ["tva", "cote", "19%"],
  },
  {
    slug: "cass-dividende-praguri-2025",
    title: "CASS pe dividende — praguri recalculate pentru 2025-2026",
    summary:
      "Contributia CASS pe dividendele incasate de asociatii SRL se calculeaza pe baza pragurilor de salariu minim. Pentru 2026: sub 24,300 lei dividende anuale — fara CASS. Intre 24,300-48,600 lei — CASS pe baza de 6 salarii. Peste 97,200 lei — CASS pe baza de 24 salarii (maxim 9,720 lei).",
    impactDescription:
      "Planifica distribuirea dividendelor inteligent. Daca poti ramane sub 24,300 lei/an, nu platesti CASS deloc. Peste acest prag, CASS se aplica in trepte. Foloseste simulatorul de dividende Prevo pentru calcul exact.",
    publishedDate: "2025-01-10",
    effectiveDate: "2025-01-01",
    category: "lege",
    affectedEntities: ["srl"],
    relatedWikiSlugs: ["dividende-srl", "cass"],
    tags: ["cass", "dividende", "praguri", "srl"],
  },
  {
    slug: "opanaf-d212-actualizare-2026",
    title: "Formularul D212 actualizat pentru 2026",
    summary:
      "ANAF a publicat versiunea actualizata a formularului D212 (Declaratia Unica) pentru anul fiscal 2026. Noul formular include campurile actualizate pentru deducerea CAS/CASS si pentru bonusul de depunere anticipata.",
    impactDescription:
      "Descarca noul formular D212 de pe site-ul ANAF inainte de a depune. Formularul vechi nu va fi acceptat. Ghidul interactiv D212 din Prevo este deja actualizat cu noua versiune.",
    publishedDate: "2026-01-20",
    effectiveDate: "2026-01-01",
    category: "ordin_anaf",
    affectedEntities: ["pfa"],
    officialUrl: "https://www.anaf.ro/anaf/internet/ANAF/formulare",
    relatedWikiSlugs: ["declaratia-unica-d212"],
    tags: ["d212", "formular", "anaf"],
  },
  {
    slug: "impozit-dividende-16-procent",
    title: "Impozitul pe dividende ramane 16%",
    summary:
      "Cota de impozit pe dividende ramane la 16%, retinuta la sursa de catre SRL. Nu s-au anuntat modificari pentru 2026. Impozitul se declara in D112 in luna platii si se raporteaza anual in D205.",
    impactDescription:
      "Cand distribui dividende, SRL-ul retine 16% impozit si iti vireaza restul. Din 10,000 lei brute, primesti 8,400 lei. Nu uita si de CASS pe dividende care se adauga separat.",
    publishedDate: "2025-12-01",
    effectiveDate: "2026-01-01",
    category: "lege",
    affectedEntities: ["srl"],
    relatedWikiSlugs: ["dividende-srl", "d112", "d205"],
    tags: ["dividende", "impozit", "16%"],
  },
  {
    slug: "normele-de-venit-2026",
    title: "Normele de venit 2026 publicate de directiile regionale",
    summary:
      "Directiile Generale Regionale ale Finantelor Publice au publicat normele de venit pe coduri CAEN pentru anul fiscal 2026. Valorile variaza pe judete. Normele determina baza impozabila pentru PFA-urile pe norma de venit.",
    impactDescription:
      "Daca esti PFA pe norma de venit, verifica norma pentru codul tau CAEN in judetul tau pe site-ul directiei de finante. Taxele tale anuale se calculeaza pe baza acestei norme, indiferent de venitul real incasat.",
    publishedDate: "2026-01-15",
    effectiveDate: "2026-01-01",
    category: "ordin_anaf",
    affectedEntities: ["pfa"],
    relatedWikiSlugs: ["norma-de-venit", "caen"],
    tags: ["norma", "venit", "caen", "2026"],
  },
];

/** Get all legislative updates, sorted newest first */
export function getAllUpdates(): LegislativeUpdate[] {
  return [...LEGISLATIVE_UPDATES].sort(
    (a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );
}

/** Get a single update by slug */
export function getUpdateBySlug(slug: string): LegislativeUpdate | undefined {
  return LEGISLATIVE_UPDATES.find((u) => u.slug === slug);
}

/** Get updates filtered by entity type */
export function getUpdatesByEntity(entity: "pfa" | "srl"): LegislativeUpdate[] {
  return getAllUpdates().filter(
    (u) => u.affectedEntities.includes(entity) || u.affectedEntities.includes("both")
  );
}
