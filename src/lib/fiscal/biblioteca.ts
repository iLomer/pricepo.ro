/**
 * Wiki fiscal - static content for fiscal education topics.
 * All values reflect 2026 fiscal year (salariul minim brut: 4,050 lei/luna).
 */

import type { LegislativeSource } from "./types";

export interface BibliotecaSection {
  heading: string;
  body: string;
}

export interface BibliotecaTopic {
  slug: string;
  title: string;
  shortDescription: string;
  category: "contributii" | "impozite" | "declaratii" | "regimuri" | "tva" | "srl";
  content: BibliotecaSection[];
  /** Legislative sources backing this topic */
  sources?: LegislativeSource[];
}

export const CATEGORY_LABELS: Record<string, string> = {
  contributii: "Contributii",
  impozite: "Impozite",
  declaratii: "Declaratii",
  regimuri: "Regimuri fiscale",
  tva: "TVA",
  srl: "SRL",
};

/** Ordered list of categories for display */
export const CATEGORY_ORDER: Array<keyof typeof CATEGORY_LABELS> = [
  "contributii",
  "impozite",
  "regimuri",
  "declaratii",
  "tva",
  "srl",
];

const TOPICS: BibliotecaTopic[] = [
  // ── CONTRIBUTII ──────────────────────────────────────────
  {
    slug: "cas",
    title: "CAS (Contributia de Asigurari Sociale)",
    shortDescription:
      "Contributia pentru pensie - 25% din venitul ales, cu praguri de 12 si 24 de salarii minime.",
    category: "contributii",
    content: [
      {
        heading: "Ce este CAS?",
        body: "CAS este contributia pe care o platesti la sistemul public de pensii. Gandeste-te la ea ca la o \"asigurare de pensie\" obligatorie. Daca ai venituri din activitati independente (PFA, profesii liberale), esti obligat sa o platesti cand venitul net anual depaseste 12 salarii minime brute.",
      },
      {
        heading: "Cat platesti?",
        body: "Cota este 25%. Nu se aplica la venitul tau real, ci la un venit ales de tine, care poate fi: 12 salarii minime brute (12 x 4,050 = 48,600 lei) sau 24 salarii minime brute (24 x 4,050 = 97,200 lei). Daca alegi baza de 12 salarii, platesti 25% x 48,600 = 12,150 lei pe an. Daca alegi baza de 24 salarii, platesti 25% x 97,200 = 24,300 lei pe an.",
      },
      {
        heading: "Cand esti obligat sa platesti?",
        body: "Esti obligat sa platesti CAS daca venitul net anual estimat (sau realizat) depaseste pragul de 12 salarii minime brute, adica 48,600 lei in 2026. Sub acest prag, CAS este optionala - dar daca nu o platesti, nu ti se calculeaza stagiu de cotizare la pensie.",
      },
      {
        heading: "Norma de venit vs. sistem real",
        body: "La norma de venit, venitul pe baza caruia se calculeaza CAS este norma stabilita de ANAF, nu venitul real incasat. La sistem real, venitul net este diferenta dintre veniturile incasate si cheltuielile deductibile. In ambele cazuri, daca depasesti pragul, alegi baza de calcul (12x sau 24x).",
      },
      {
        heading: "Cum se declara?",
        body: "CAS se declara prin Declaratia Unica (D212), depusa pana pe 25 mai. Plata se face tot pana pe 25 mai, pentru anul in curs. Daca depui pana pe 15 aprilie, beneficiezi de o reducere de 5% din impozit (nu din CAS).",
      },
    ],
    sources: [
      { act: "Codul Fiscal, art. 148-150 (Legea 227/2015)", relevance: "Cota CAS de 25%, pragurile de 12x si 24x salarii minime, baza de calcul pentru activitati independente" },
      { act: "HG 1.447/2025 privind salariul minim brut", relevance: "Salariul minim brut de 4,050 lei/luna, utilizat la calculul pragurilor CAS" },
    ],
  },
  {
    slug: "cass",
    title: "CASS (Contributia de Asigurari Sociale de Sanatate)",
    shortDescription:
      "Contributia pentru sanatate - 10%, cu plafon minim de 6 salarii si maxim de 72 salarii minime.",
    category: "contributii",
    content: [
      {
        heading: "Ce este CASS?",
        body: "CASS este contributia care iti da dreptul la servicii medicale gratuite in sistemul public de sanatate. Fara CASS platit, nu ai calitatea de asigurat si risti sa platesti integral consultatiile si tratamentele.",
      },
      {
        heading: "Cat platesti?",
        body: "Cota este 10%, aplicata proportional la venitul net anual realizat din activitati independente. Exista insa un plafon minim: 6 salarii minime brute (6 x 4,050 = 24,300 lei, deci minim 2,430 lei CASS pe an). Plafonul maxim este 72 salarii minime brute pe an (72 x 4,050 = 291,600 lei), deci maximum platesti 10% x 291,600 = 29,160 lei pe an, indiferent cat de mare ti-e venitul.",
      },
      {
        heading: "Calcul proportional - exemplu",
        body: "Daca ai venit net de 100,000 lei: CASS = 10% x 100,000 = 10,000 lei. Daca ai venit net de 15,000 lei (sub 6 salarii minime): tot platesti minim 2,430 lei. Daca ai venit net de 500,000 lei: platesti maxim 29,160 lei (plafonul de 72 salarii minime).",
      },
      {
        heading: "Cine este scutit?",
        body: "Sunt scutiti de CASS: persoanele care au deja calitatea de asigurat prin contractul de munca (daca esti si angajat, angajatorul iti plateste deja CASS pe salariu - dar doar daca salariul depaseste pragul). De asemenea, anumite categorii de persoane cu handicap sau veterani pot fi scutite.",
      },
      {
        heading: "Cum se declara?",
        body: "Ca si CAS, se declara prin Declaratia Unica (D212) pana pe 25 mai. CASS se datoreaza pentru anul in curs, pe baza venitului estimat, si se regularizeaza la depunerea declaratiei pentru anul urmator.",
      },
    ],
    sources: [
      { act: "Codul Fiscal, art. 170-174 (Legea 227/2015)", relevance: "Cota CASS de 10%, plafon minim 6x si maxim 72x salarii minime, calcul proportional" },
      { act: "HG 1.447/2025 privind salariul minim brut", relevance: "Salariul minim brut de 4,050 lei/luna, utilizat la calculul plafoanelor CASS" },
    ],
  },

  // ── IMPOZITE ─────────────────────────────────────────────
  {
    slug: "impozit-venit-pfa",
    title: "Impozit pe venit PFA",
    shortDescription:
      "10% din venitul net, dupa deducerea CAS si CASS - difera intre norma si sistem real.",
    category: "impozite",
    content: [
      {
        heading: "Cat este impozitul?",
        body: "Impozitul pe veniturile din activitati independente este 10%, aplicat la venitul net anual. Venitul net difera in functie de regimul fiscal ales: norma de venit sau sistem real.",
      },
      {
        heading: "Deducerea CAS si CASS (din 2024)",
        body: "Incepand cu anul fiscal 2024, CAS si CASS platite sunt cheltuieli deductibile la calculul impozitului. Asta inseamna ca le scazi din venitul net inainte de a aplica cei 10%. Exemplu: venit net 100,000 lei, CAS platit 12,150 lei, CASS platit 10,000 lei. Impozit = 10% x (100,000 - 12,150 - 10,000) = 10% x 77,850 = 7,785 lei.",
      },
      {
        heading: "La norma de venit",
        body: "Venitul impozabil este norma stabilita de ANAF pentru codul tau CAEN, nu venitul real incasat. Daca norma ta este 35,000 lei si ai platit CAS 12,150 lei + CASS 3,500 lei, impozitul este 10% x (35,000 - 12,150 - 3,500) = 1,935 lei. Avantajul: poti incasa mult peste norma si platesti acelasi impozit.",
      },
      {
        heading: "La sistem real",
        body: "Venitul net = venituri incasate minus cheltuieli deductibile. Ai nevoie de evidenta contabila si trebuie sa pastrezi toate facturile. Impozitul este 10% din (venit net - CAS - CASS). Avantajul: daca ai cheltuieli mari, platesti mai putin. Dezavantajul: e mai complex si necesita rigoare.",
      },
      {
        heading: "Cum si cand se plateste?",
        body: "Impozitul se declara prin Declaratia Unica (D212) si se plateste pana pe 25 mai. Daca depui D212 pana pe 15 aprilie, primesti o reducere de 5% din impozitul datorat. Plata se face in contul unic deschis la Trezorerie sau prin SPV.",
      },
    ],
    sources: [
      { act: "Codul Fiscal, art. 68-69 (Legea 227/2015)", relevance: "Cota impozitului pe venit de 10%, calculul venitului net, deducerea CAS si CASS din baza impozabila" },
      { act: "OUG 115/2023, art. I pct. 34", relevance: "CAS si CASS deductibile din baza impozabila incepand cu anul fiscal 2024" },
    ],
  },

  // ── REGIMURI FISCALE ─────────────────────────────────────
  {
    slug: "norma-de-venit",
    title: "Norma de venit",
    shortDescription:
      "Venit fix stabilit de ANAF per cod CAEN - nu conteaza cat incasezi real, taxele sunt fixe.",
    category: "regimuri",
    content: [
      {
        heading: "Ce este norma de venit?",
        body: "Norma de venit este un sistem simplificat de impozitare in care ANAF stabileste un venit anual fix pentru fiecare cod CAEN si judet. Nu conteaza cat incasezi real - taxele se calculeaza pe baza acestei norme. Daca incasezi 200,000 lei dar norma ta este 40,000 lei, platesti taxe pe 40,000 lei.",
      },
      {
        heading: "Cine poate folosi norma de venit?",
        body: "Doar PFA-urile care au codul CAEN inclus in lista normelor publicate de directia de finante a judetului. Nu toate activitatile au norma de venit disponibila. Normele variaza si intre judete - acelasi CAEN poate avea norme diferite in Cluj fata de Brasov.",
      },
      {
        heading: "Avantaje",
        body: "Nu ai nevoie de evidenta contabila complexa. Nu trebuie sa pastrezi facturi de cheltuieli. Stii din ianuarie cat vei plati in taxe. E ideal daca ai venituri mult peste norma - platesti taxe pe un venit mai mic decat cel real.",
      },
      {
        heading: "Dezavantaje",
        body: "Daca intr-un an ai venituri mici (sau zero), tot platesti taxe pe norma intreaga. Nu poti deduce cheltuieli. Daca norma este mare si veniturile tale sunt mici, platesti mai mult decat ai plati la sistem real.",
      },
      {
        heading: "Cum afli norma ta?",
        body: "Normele de venit se publica anual de catre Directia Generala Regionala a Finantelor Publice din judetul tau. Le gasesti pe site-ul ANAF, sectiunea \"Norme de venit\", sau poti intreba la administratia fiscala locala. In estimatorul Prevo, le actualizam automat.",
      },
    ],
    sources: [
      { act: "Codul Fiscal, art. 69 (Legea 227/2015)", relevance: "Stabilirea venitului net pe baza normelor de venit, pe coduri CAEN si judete" },
      { act: "Codul Fiscal, art. 67 alin. (2)", relevance: "Conditiile de eligibilitate pentru regimul norma de venit" },
    ],
  },
  {
    slug: "sistem-real",
    title: "Sistem real",
    shortDescription:
      "Venituri reale minus cheltuieli reale - mai complex, dar poate fi mai ieftin daca ai cheltuieli mari.",
    category: "regimuri",
    content: [
      {
        heading: "Ce este sistemul real?",
        body: "La sistem real, impozitul se calculeaza pe diferenta reala dintre veniturile incasate si cheltuielile deductibile (venit net = venituri - cheltuieli). Trebuie sa tii evidenta tuturor facturilor emise si primite.",
      },
      {
        heading: "Ce cheltuieli sunt deductibile?",
        body: "Cheltuielile legate direct de activitatea ta: materii prime, utilitati la birou, abonamente software, deplasari de afaceri, amortizarea echipamentelor, chiria spatiului de lucru (proportional cu suprafata folosita). Nu sunt deductibile: cheltuieli personale, amenzi, protocol peste limita legala.",
      },
      {
        heading: "Avantaje fata de norma",
        body: "Daca ai cheltuieli mari (echipamente, chirie, angajati prin colaborare), venitul net scade si platesti mai putine taxe. Ai flexibilitate totala - poti optimiza legal cheltuielile. Ideal pentru freelanceri cu costuri operationale semnificative.",
      },
      {
        heading: "Dezavantaje",
        body: "Necesita evidenta contabila in partida simpla. Trebuie sa pastrezi toate facturile si bonurile. E mai greu de estimat taxele din ianuarie, pentru ca depind de veniturile si cheltuielile efective. Recomandat sa folosesti un soft de contabilitate sau sa consulti un contabil macar o data pe an.",
      },
      {
        heading: "Declaratii necesare",
        body: "Depui Declaratia Unica (D212) pana pe 25 mai. Daca esti platitor de TVA, depui si D300 trimestrial. La sistem real, trebuie sa completezi Registrul de incasari si plati si sa pastrezi documentele justificative 5 ani.",
      },
    ],
    sources: [
      { act: "Codul Fiscal, art. 68 (Legea 227/2015)", relevance: "Calculul venitului net la sistem real — venituri minus cheltuieli deductibile" },
      { act: "Codul Fiscal, art. 68 alin. (4)", relevance: "Lista cheltuielilor deductibile si conditiile de deducere" },
    ],
  },

  // ── DECLARATII ───────────────────────────────────────────
  {
    slug: "declaratia-unica-d212",
    title: "Declaratia Unica (D212)",
    shortDescription:
      "Declaratia anuala pentru PFA - acopera impozit, CAS si CASS intr-un singur formular.",
    category: "declaratii",
    content: [
      {
        heading: "Ce este D212?",
        body: "Declaratia Unica (formularul 212) este documentul prin care PFA-urile declara si platesc impozitul pe venit, CAS si CASS. Un singur formular inlocuieste mai multe declaratii separate - de aici numele \"unica\".",
      },
      {
        heading: "Cine depune D212?",
        body: "Toate persoanele fizice care obtin venituri din: activitati independente (PFA), drepturi de autor, inchirieri, investitii (dividende, dobanzi), activitati agricole, sau alte surse de venit care nu sunt impozitate la sursa de un angajator.",
      },
      {
        heading: "Termenele importante",
        body: "Termenul limita este 25 mai (pentru anul in curs - estimare, si pentru anul precedent - regularizare). Daca depui pana pe 15 aprilie, primesti o reducere de 5% din impozitul pe venit datorat. Aceasta reducere nu se aplica la CAS si CASS, doar la impozit.",
      },
      {
        heading: "Cum se depune?",
        body: "Se depune exclusiv online, prin SPV (Spatiul Privat Virtual) de pe site-ul ANAF. Pasii: 1) Intri in SPV cu cont sau semnatura electronica. 2) Descarci formularul PDF inteligent de pe site-ul ANAF. 3) Completezi offline, salvezi. 4) Incarci in SPV si trimiti. Primesti numar de inregistrare ca confirmare.",
      },
      {
        heading: "Ce completezi in D212?",
        body: "Capitolul I: venituri estimate pentru anul curent (impozit, CAS, CASS). Capitolul II: venituri realizate in anul precedent (regularizare). Pentru fiecare, alegi sursa de venit, regimul fiscal, si completezi sumele. Daca ai mai multe surse de venit, le declari pe toate in acelasi formular.",
      },
    ],
    sources: [
      { act: "Codul de Procedura Fiscala, art. 120-122 (Legea 207/2015)", relevance: "Obligatia depunerii D212, termenul de 25 mai, continutul declaratiei" },
      { act: "OUG 8/2026, art. I pct. 3", relevance: "Reducerea bonusului de depunere anticipata de la 5% la 3% din impozitul pe venit (termen 15 aprilie)" },
      { act: "OPANAF 49/2019 actualizat", relevance: "Formularul D212, structura si instructiunile de completare" },
    ],
  },
  {
    slug: "d100",
    title: "D100 (Declaratia privind obligatiile de plata)",
    shortDescription:
      "Declaratia trimestriala a SRL-urilor micro - impozit pe cifra de afaceri.",
    category: "declaratii",
    content: [
      {
        heading: "Ce este D100?",
        body: "Declaratia 100 este formularul prin care SRL-urile (si alte persoane juridice) declara si platesc impozitele si contributiile datorate bugetului de stat. Pentru micro-intreprinderile, acesta este documentul principal prin care declari impozitul trimestrial pe venituri.",
      },
      {
        heading: "Cine depune D100?",
        body: "Toate SRL-urile, indiferent de regimul fiscal (micro-intreprindere sau impozit pe profit). Persoanele fizice (PFA) nu depun D100 - ele folosesc Declaratia Unica (D212).",
      },
      {
        heading: "Cand se depune?",
        body: "D100 se depune trimestrial, pana pe data de 25 a lunii urmatoare trimestrului: 25 aprilie (T1), 25 iulie (T2), 25 octombrie (T3), 25 ianuarie anul urmator (T4). Plata se face in acelasi termen.",
      },
      {
        heading: "Ce declari in D100?",
        body: "Pentru SRL micro: impozitul de 1% pe cifra de afaceri realizata in trimestrul respectiv. Daca ai avut venituri de 50,000 lei in T1, declari si platesti 500 lei (1% x 50,000). In D100 declari si alte obligatii: impozit pe dividende retinute, impozit pe salarii, contributii salariale.",
      },
      {
        heading: "Cum se depune?",
        body: "Online, prin SPV, similar cu D212. SRL-urile au obligatia de a depune toate declaratiile fiscal in format electronic. Formularul D100 se descarca de pe site-ul ANAF, se completeaza si se incarca in SPV.",
      },
    ],
    sources: [
      { act: "Codul de Procedura Fiscala, art. 107 (Legea 207/2015)", relevance: "Obligatia declararii trimestriale a impozitului pe veniturile micro-intreprinderilor" },
      { act: "Codul Fiscal, art. 56 (Legea 227/2015)", relevance: "Termenele de plata a impozitului micro — 25 a lunii urmatoare trimestrului" },
    ],
  },

  {
    slug: "d112",
    title: "D112 (Declaratia privind contributiile sociale)",
    shortDescription:
      "Declaratia lunara a SRL-urilor - impozit pe salarii, CAS, CASS si contributii angajati.",
    category: "declaratii",
    content: [
      {
        heading: "Ce este D112?",
        body: "Declaratia 112 este formularul prin care SRL-urile raporteaza lunar toate contributiile sociale si impozitul pe venit retinute de la angajati. Chiar daca ai un singur angajat (inclusiv administratorul cu contract de mandat), trebuie sa depui D112.",
      },
      {
        heading: "Cine depune D112?",
        body: "Toate SRL-urile care au angajati cu contract de munca, colaboratori cu contracte de management/mandat, sau care platesc venituri din care retin impozit la sursa (inclusiv dividende). Daca SRL-ul nu are angajati si nu distribuie dividende, nu trebuie sa depuna D112.",
      },
      {
        heading: "Ce declari in D112?",
        body: "In D112 raportezi pentru fiecare angajat: salariul brut, CAS angajat (25%) si angajator (0% in 2026 - transferat la angajat), CASS angajat (10%), impozitul pe venit retinut (10%), contributia asiguratorie pentru munca (CAM - 2.25%). Include si evidenta nominala a fiecarei persoane asigurate.",
      },
      {
        heading: "Cand se depune?",
        body: "D112 se depune lunar, pana pe data de 25 a lunii urmatoare celei pentru care se face raportarea. Exemplu: D112 pentru ianuarie se depune pana pe 25 februarie. Plata contributiilor se face in acelasi termen, in contul unic de la Trezorerie.",
      },
      {
        heading: "D112 si dividendele",
        body: "Cand SRL-ul distribuie dividende, impozitul de 16% retinut la sursa se declara tot prin D112, in luna in care s-a facut plata dividendelor. Acest lucru este separat de CASS-ul pe dividende pe care asociatul il declara personal prin D212.",
      },
    ],
    sources: [
      { act: "Codul Fiscal, art. 147 (Legea 227/2015)", relevance: "Obligatia declararii lunare a CAS, CASS si impozitului pe salarii" },
      { act: "Codul Fiscal, art. 174 alin. (5)", relevance: "Retinerea la sursa a CASS de catre angajator" },
    ],
  },
  {
    slug: "d205",
    title: "D205 (Declaratia informativa privind impozitul retinut la sursa)",
    shortDescription:
      "Declaratia anuala informativa - SRL-ul raporteaza toate veniturile platite persoanelor fizice.",
    category: "declaratii",
    content: [
      {
        heading: "Ce este D205?",
        body: "Declaratia 205 este un formular informativ anual prin care SRL-ul raporteaza catre ANAF toate veniturile platite catre persoane fizice si impozitul retinut la sursa. Gandeste-te la ea ca la un rezumat anual: ANAF stie deja din D112 lunar, dar D205 confirma totalurile.",
      },
      {
        heading: "Cine depune D205?",
        body: "Orice SRL (sau alta persoana juridica) care a platit venituri catre persoane fizice in anul precedent: dividende, chirii, drepturi de autor, premii, contracte civile. Daca ai distribuit dividende catre asociati, esti obligat sa depui D205.",
      },
      {
        heading: "Ce contine D205?",
        body: "Pentru fiecare beneficiar de venit (persoana fizica), D205 include: datele de identificare (CNP, nume), tipul venitului (dividende, chirie, etc.), venitul brut platit, impozitul retinut la sursa, si venitul net platit. Este un formular centralizator.",
      },
      {
        heading: "Cand se depune?",
        body: "D205 se depune anual, pana pe 28 februarie (sau 1 martie in ani bisecti) a anului urmator celui in care s-au facut platile. Exemplu: dividendele distribuite in 2026 se raporteaza in D205 depusa pana pe 28 februarie 2027.",
      },
      {
        heading: "Sfaturi practice",
        body: "Tine o evidenta clara a tuturor platilor catre persoane fizice pe tot parcursul anului - nu astepta februarie sa reconstruiesti informatiile. D205 trebuie sa fie coerenta cu D112-urile lunare depuse. Discrepantele pot genera notificari de la ANAF.",
      },
    ],
    sources: [
      { act: "Codul Fiscal, art. 132 alin. (2) (Legea 227/2015)", relevance: "Obligatia informativa anuala privind veniturile platite persoanelor fizice si impozitul retinut" },
      { act: "OPANAF 3.695/2016 actualizat", relevance: "Formularul D205, instructiunile de completare si termenul de depunere (28 februarie)" },
    ],
  },
  {
    slug: "d300",
    title: "D300 (Decontul de TVA)",
    shortDescription:
      "Declaratia trimestriala pentru platitorii de TVA - raportezi TVA colectat si TVA deductibil.",
    category: "declaratii",
    content: [
      {
        heading: "Ce este D300?",
        body: "Decontul de TVA (formularul 300) este declaratia prin care platitorii de TVA raporteaza TVA-ul colectat de la clienti si TVA-ul deductibil de pe facturile furnizorilor. Diferenta se plateste la stat (TVA de plata) sau se recupereaza (TVA de rambursat).",
      },
      {
        heading: "Cine depune D300?",
        body: "Toate persoanele impozabile inregistrate in scopuri de TVA - atat PFA-uri cat si SRL-uri care au depasit plafonul de 395,000 lei sau care au optat voluntar pentru TVA. Daca nu esti platitor de TVA, nu depui D300.",
      },
      {
        heading: "Cand se depune?",
        body: "De regula, trimestrial - pana pe 25 a lunii urmatoare trimestrului: 25 aprilie (T1), 25 iulie (T2), 25 octombrie (T3), 25 ianuarie (T4). Firmele mari (cifra de afaceri peste 100,000 EUR in anul precedent) depun D300 lunar. Frecventa ti se comunica de ANAF la inregistrarea in scopuri de TVA.",
      },
      {
        heading: "Ce completezi?",
        body: "In D300 treci: TVA colectat (totalul TVA-ului de pe facturile emise catre clienti), TVA deductibil (totalul TVA-ului de pe facturile primite de la furnizori), si diferenta - TVA de plata sau TVA de rambursat. Platesti diferenta in acelasi termen cu depunerea.",
      },
      {
        heading: "Exemplu practic",
        body: "In T1 ai emis facturi de 100,000 lei + 19,000 lei TVA (colectat). Ai primit facturi de la furnizori de 30,000 lei + 5,700 lei TVA (deductibil). TVA de plata = 19,000 - 5,700 = 13,300 lei. Depui D300 pana pe 25 aprilie si platesti 13,300 lei.",
      },
    ],
    sources: [
      { act: "Codul Fiscal, art. 323 (Legea 227/2015)", relevance: "Obligatia depunerii decontului de TVA, perioade fiscale (lunara/trimestriala)" },
      { act: "Codul Fiscal, art. 322 alin. (1)", relevance: "Calculul TVA de plata/rambursat — TVA colectat minus TVA deductibil" },
    ],
  },
  {
    slug: "d394",
    title: "D394 (Declaratia informativa privind livrarile si achizitiile pe teritoriul national)",
    shortDescription:
      "Declaratia trimestriala informativa - detalii despre facturile emise si primite in Romania.",
    category: "declaratii",
    content: [
      {
        heading: "Ce este D394?",
        body: "Declaratia 394 este un formular informativ prin care platitorii de TVA raporteaza detaliat toate facturile emise si primite pe teritoriul national. ANAF o foloseste ca sa verifice corespondenta intre furnizor si client - daca tu ai declarat o factura, clientul tau ar trebui sa o declare si el.",
      },
      {
        heading: "Cine depune D394?",
        body: "Toate persoanele inregistrate in scopuri de TVA (PFA sau SRL) care au efectuat livrari de bunuri sau prestari de servicii pe teritoriul Romaniei. Daca esti platitor de TVA, trebuie sa depui D394.",
      },
      {
        heading: "Ce contine D394?",
        body: "D394 contine informatii detaliate despre fiecare factura: codul fiscal al partenerului, numarul si data facturii, baza impozabila, TVA-ul, tipul operatiunii. Se completeaza separat pentru livrari (facturi emise) si achizitii (facturi primite).",
      },
      {
        heading: "Cand se depune?",
        body: "Trimestrial, pana pe data de 30 a lunii urmatoare trimestrului: 30 aprilie (T1), 30 iulie (T2), 30 octombrie (T3), 30 ianuarie (T4). Atentie: termenul e 30, nu 25 ca la D300 - sunt 5 zile in plus.",
      },
      {
        heading: "Sfaturi practice",
        body: "D394 este laborioasa daca ai multe facturi - necesita detalii per factura. Foloseste un soft de contabilitate care exporta automat D394. Verifica sa nu ai diferente intre totalurile din D394 si cele din D300 - ANAF compara automat si trimite notificari de neconcordanta.",
      },
    ],
    sources: [
      { act: "Codul Fiscal, art. 324 (Legea 227/2015)", relevance: "Obligatia declararii informatiilor privind livrarile si achizitiile efectuate pe teritoriul national" },
      { act: "OPANAF 3.769/2015 actualizat", relevance: "Formularul D394, instructiunile de completare, termenul de 30 a lunii urmatoare trimestrului" },
    ],
  },
  {
    slug: "d390",
    title: "D390 (Declaratia recapitulativa privind operatiunile intracomunitare)",
    shortDescription:
      "Declaratia pentru tranzactii cu firme din UE - obligatorie daca facturezi in alte tari din Uniunea Europeana.",
    category: "declaratii",
    content: [
      {
        heading: "Ce este D390?",
        body: "Declaratia 390 (recapitulativa) este formularul prin care raportezi toate tranzactiile cu firme din alte state membre UE. Este obligatorie daca ai livrat bunuri sau prestat servicii catre firme inregistrate in scopuri de TVA in alte tari din Uniunea Europeana.",
      },
      {
        heading: "Cine depune D390?",
        body: "Platitorii de TVA din Romania care au efectuat in cursul trimestrului: livrari intracomunitare de bunuri, prestari de servicii catre firme din UE (cu locul prestarii in alt stat membru), sau achizitii intracomunitare. Daca facturezi doar clienti din Romania, nu trebuie sa depui D390.",
      },
      {
        heading: "Exemplu tipic",
        body: "Esti freelancer IT (PFA sau SRL) si facturezi servicii catre o firma din Germania. Factura se emite fara TVA (mecanismul de taxare inversa - reverse charge). Trebuie sa raportezi aceasta operatiune in D390, mentionand codul de TVA al firmei germane si valoarea serviciului.",
      },
      {
        heading: "Cand se depune?",
        body: "Trimestrial, pana pe data de 25 a lunii urmatoare trimestrului: 25 aprilie, 25 iulie, 25 octombrie, 25 ianuarie. Daca ai livrari intracomunitare de bunuri care depasesc 50,000 EUR intr-un trimestru, depui D390 lunar.",
      },
      {
        heading: "Ce completezi?",
        body: "Pentru fiecare partener din UE: codul de TVA al partenerului, tara, tipul operatiunii (livrare de bunuri, prestare de servicii, achizitie), si valoarea totala a tranzactiilor in perioada de raportare. Se depune exclusiv online, prin SPV.",
      },
    ],
    sources: [
      { act: "Codul Fiscal, art. 325 (Legea 227/2015)", relevance: "Obligatia depunerii declaratiei recapitulative pentru operatiuni intracomunitare" },
      { act: "Codul Fiscal, art. 325 alin. (2)", relevance: "Termenul trimestrial de depunere — 25 a lunii urmatoare trimestrului" },
    ],
  },

  // ── TVA ──────────────────────────────────────────────────
  {
    slug: "tva",
    title: "TVA (Taxa pe Valoarea Adaugata)",
    shortDescription:
      "Taxa de consum - obligatorie peste 395,000 lei cifra de afaceri, cu declaratie D300 trimestriala.",
    category: "tva",
    content: [
      {
        heading: "Ce este TVA?",
        body: "TVA este o taxa pe consum pe care o colectezi de la clientii tai si o virezi la bugetul de stat. Nu este un cost al tau - esti doar intermediar. Cotele standard sunt: 19% (general), 9% (alimente, medicamente, turism), 5% (carti, locuinte sociale).",
      },
      {
        heading: "Cand devii platitor de TVA?",
        body: "Esti obligat sa te inregistrezi in scopuri de TVA cand cifra de afaceri depaseste 395,000 lei intr-un an calendaristic (sau in 12 luni consecutive). Poti opta voluntar si sub acest prag, daca ti se pare avantajos (de exemplu, daca ai multi furnizori platitori de TVA si vrei sa deduci TVA-ul de pe facturile lor).",
      },
      {
        heading: "Cum functioneaza in practica?",
        body: "Exemplu: facturezi un serviciu de 1,000 lei + 19% TVA = 1,190 lei. Clientul plateste 1,190, din care 190 este TVA colectat. Daca ai o factura de la un furnizor de 500 lei + 95 lei TVA, deduci 95 lei. La sfarsitul trimestrului, virezi la stat diferenta: 190 - 95 = 95 lei TVA de plata.",
      },
      {
        heading: "Declaratia D300",
        body: "Ca platitor de TVA, depui D300 (Decontul de TVA) trimestrial - pana pe 25 a lunii urmatoare trimestrului. In D300 raportezi TVA colectat si TVA deductibil, iar diferenta o platesti sau ti se ramburseaza.",
      },
      {
        heading: "TVA si PFA pe norma de venit",
        body: "Chiar daca esti pe norma de venit pentru impozit, daca depasesti plafonul de 395,000 lei cifra de afaceri, devii platitor de TVA. Norma de venit afecteaza doar calculul impozitului pe venit, nu si obligatia de TVA.",
      },
    ],
    sources: [
      { act: "Codul Fiscal, art. 286-331, Titlul VII (Legea 227/2015)", relevance: "Cotele TVA (19%, 9%, 5%), plafonul de scutire de 395,000 lei, inregistrarea in scopuri de TVA" },
      { act: "Codul Fiscal, art. 310 alin. (1)", relevance: "Plafonul de scutire pentru mici intreprinderi — 395,000 lei (din aprilie 2025)" },
    ],
  },

  // ── SRL ──────────────────────────────────────────────────
  {
    slug: "micro-intreprindere",
    title: "Micro-intreprindere (SRL)",
    shortDescription:
      "SRL cu impozit de 1% pe venituri - simplu, fara contabilitate de profit, pana la 100,000 EUR.",
    category: "srl",
    content: [
      {
        heading: "Ce este o micro-intreprindere?",
        body: "O micro-intreprindere este un SRL care plateste impozit pe veniturile realizate (cifra de afaceri), nu pe profit. Este cel mai simplu regim fiscal pentru SRL-uri mici. Platesti 1% din tot ce incasezi, fara sa conteze cheltuielile.",
      },
      {
        heading: "Conditii pentru regimul micro",
        body: "Ca sa fii micro-intreprindere, trebuie sa indeplinesti simultan: cifra de afaceri sub 100,000 EUR (echivalent in lei), sa nu desfasori activitati in domeniul bancar, asigurarilor sau jocurilor de noroc, si sa nu fi optat voluntar pentru impozit pe profit.",
      },
      {
        heading: "Cum se calculeaza impozitul?",
        body: "Impozitul este 1% din veniturile realizate in fiecare trimestru. Exemplu: daca ai facturat 80,000 lei in T1, platesti 800 lei impozit. Simplu. Nu ai nevoie sa calculezi profit, nu trebuie sa optimizezi cheltuieli din perspectiva fiscala.",
      },
      {
        heading: "Declaratia D100",
        body: "Impozitul se declara trimestrial prin formularul D100, pana pe data de 25 a lunii urmatoare trimestrului. Termenele: 25 aprilie (T1), 25 iulie (T2), 25 octombrie (T3), 25 ianuarie (T4).",
      },
      {
        heading: "Ce se intampla daca depasesti 100,000 EUR?",
        body: "Daca depasesti plafonul de 100,000 EUR in cursul anului, treci la impozit pe profit (16%) incepand cu trimestrul in care ai depasit. Nu mai revii la micro in acel an. In anul urmator, daca indeplinesti din nou conditiile, poti reveni la regimul micro.",
      },
    ],
    sources: [
      { act: "Codul Fiscal, art. 47-56, Titlul III (Legea 227/2015)", relevance: "Conditiile pentru regimul micro, cota de impozitare, plafonul de 100,000 EUR" },
      { act: "OUG 89/2025, art. I pct. 8", relevance: "Cota unica de 1% pe venituri, indiferent de numarul de angajati (din 2025)" },
    ],
  },
  {
    slug: "dividende-srl",
    title: "Dividende SRL",
    shortDescription:
      "Cum scoti bani din SRL - 16% impozit, CASS pe praguri, si decizia asociatului unic.",
    category: "srl",
    content: [
      {
        heading: "Ce sunt dividendele?",
        body: "Dividendele sunt profitul net al SRL-ului distribuit catre asociati (proprietari). Este singura modalitate legala de a scoate bani din SRL pentru uz personal (in afara de salariu). Nu poti pur si simplu transfera bani din contul firmei in contul personal.",
      },
      {
        heading: "Cat platesti impozit pe dividende?",
        body: "Impozitul pe dividende este 16%, retinut la sursa de catre SRL. Daca SRL-ul distribuie 10,000 lei dividende brute, retine 1,600 lei impozit si iti vireaza 8,400 lei net. SRL-ul depune D205 (declaratie informativa) pentru dividendele distribuite.",
      },
      {
        heading: "CASS pe dividende",
        body: "Din 2024, daca dividendele tale depasesc anumite praguri, datorezi CASS (10%) ca persoana fizica. Pragurile: sub 6 salarii minime anuale (sub 24,300 lei) - nu platesti CASS. Intre 6x si 12x (24,300 - 48,600 lei) - CASS la baza de 6 salarii (2,430 lei). Intre 12x si 24x (48,600 - 97,200 lei) - CASS la 12 salarii (4,860 lei). Peste 24x (peste 97,200 lei) - CASS la 24 salarii (9,720 lei).",
      },
      {
        heading: "Decizia asociatului unic",
        body: "Inainte de a distribui dividende, trebuie sa emiti o \"Decizie a asociatului unic\" (daca esti singurul proprietar) sau un proces-verbal al AGA. Documentul trebuie sa mentioneze: profitul net disponibil, suma distribuita, si data platii. Fara acest document, distribuirea nu este legala.",
      },
      {
        heading: "Cand poti distribui dividende?",
        body: "Dividendele se pot distribui dupa aprobarea situatiilor financiare anuale (de regula dupa depunerea bilantului). Poti distribui si dividende interimare (trimestrial), dar exista riscul ca la final de an profitul real sa fie mai mic decat dividendele deja distribuite, caz in care trebuie sa returnezi diferenta.",
      },
    ],
    sources: [
      { act: "Codul Fiscal, art. 97 alin. (7) (Legea 227/2015)", relevance: "Impozitul pe dividende de 16%, retinut la sursa de catre SRL" },
      { act: "Codul Fiscal, art. 174 alin. (5^1)", relevance: "CASS pe dividende — praguri de 6x, 12x si 24x salarii minime" },
      { act: "Legea 31/1990, art. 67 si art. 196^1", relevance: "Distribuirea dividendelor, decizia AGA/asociatului unic, dividende interimare" },
    ],
  },

  // ── ALTE CONCEPTE ────────────────────────────────────────
  {
    slug: "caen",
    title: "CAEN (Clasificarea Activitatilor din Economia Nationala)",
    shortDescription:
      "Codul care descrie activitatea ta - conteaza pentru norma de venit, TVA si declaratii.",
    category: "regimuri",
    content: [
      {
        heading: "Ce este codul CAEN?",
        body: "CAEN este un cod numeric de 4 cifre care clasifica activitatea economica pe care o desfasori. De exemplu: 6201 = activitati de realizare a software-ului la comanda, 7022 = activitati de consultanta pentru afaceri. Fiecare PFA sau SRL are unul sau mai multe coduri CAEN declarate.",
      },
      {
        heading: "De ce conteaza codul CAEN?",
        body: "Codul CAEN determina: daca poti folosi norma de venit (nu toate codurile au norma), cat este norma de venit in judetul tau, daca ai restrictii pentru regimul micro (SRL), si ce obligatii specifice ai (de exemplu, anumite coduri necesita autorizatii speciale).",
      },
      {
        heading: "Unde gasesti codul tau CAEN?",
        body: "Codul CAEN este trecut in: certificatul de inregistrare la Registrul Comertului, autorizatia de functionare a PFA, sau il poti cauta in Clasificarea CAEN Rev. 2 pe site-ul INS (Institutul National de Statistica) sau pe caen.ro.",
      },
      {
        heading: "Poti schimba codul CAEN?",
        body: "Da, poti adauga sau modifica coduri CAEN prin depunerea unei cereri la Registrul Comertului (pentru SRL) sau la ANAF (pentru PFA). Daca iti schimbi activitatea principala, trebuie sa actualizezi si codul CAEN principal. Modificarea poate afecta norma de venit si alte obligatii fiscale.",
      },
    ],
    sources: [
      { act: "Ordinul INS 337/2007", relevance: "Clasificarea CAEN Rev. 2 a activitatilor din economia nationala" },
      { act: "Codul Fiscal, art. 69 alin. (1) (Legea 227/2015)", relevance: "Legatura dintre codul CAEN si eligibilitatea pentru norma de venit" },
    ],
  },
  {
    slug: "spv",
    title: "SPV (Spatiul Privat Virtual)",
    shortDescription:
      "Portalul online al ANAF - aici depui declaratii, vezi datorii si comunici cu Fiscul.",
    category: "declaratii",
    content: [
      {
        heading: "Ce este SPV?",
        body: "SPV (Spatiul Privat Virtual) este portalul online al ANAF prin care contribuabilii pot depune declaratii, verifica datorii, primi notificari si comunica cu administratia fiscala. Gandeste-te la el ca la un \"internet banking\" pentru taxe.",
      },
      {
        heading: "Cum obtii acces?",
        body: "Te inregistrezi online pe site-ul ANAF (www.anaf.ro > SPV). Ai nevoie de: CNP, o adresa de email valida, si o copie a cartii de identitate. Dupa inregistrare, primesti credentialele de acces pe email. Alternativ, poti accesa SPV cu semnatura electronica calificata.",
      },
      {
        heading: "Ce poti face in SPV?",
        body: "In SPV poti: depune Declaratia Unica (D212) si alte formulare fiscale, vedea situatia obligatiilor de plata (datorii si supraplati), descarca certificate de atestare fiscala, primi notificari de la ANAF, depune cereri si petitii electronice, si vizualiza istoricul declaratiilor depuse.",
      },
      {
        heading: "SPV pentru SRL",
        body: "Si SRL-urile au acces la SPV, dar cu cont separat (pe CUI-ul firmei, nu pe CNP-ul personal). Administratorul firmei se inregistreaza ca reprezentant si poate depune D100, D300 si alte declaratii ale firmei.",
      },
      {
        heading: "Sfaturi practice",
        body: "Salveaza-ti credentialele in siguranta. Activeaza notificarile pe email ca sa nu ratezi termene. Verifica periodic \"Situatia obligatiilor de plata\" sa te asiguri ca nu ai datorii necunoscute. Daca ai probleme tehnice, suna la Call Center ANAF: 031.403.91.60.",
      },
    ],
    sources: [
      { act: "OPANAF 3.599/2019 actualizat", relevance: "Functionarea Spatiului Privat Virtual — inregistrare, depunere declaratii, comunicare electronica" },
      { act: "Codul de Procedura Fiscala, art. 79 (Legea 207/2015)", relevance: "Comunicarea electronica intre contribuabil si organul fiscal" },
    ],
  },
];

/** Get all topics */
export function getAllTopics(): BibliotecaTopic[] {
  return TOPICS;
}

/** Get a single topic by slug */
export function getTopicBySlug(slug: string): BibliotecaTopic | undefined {
  return TOPICS.find((t) => t.slug === slug);
}

/** Get topics filtered by category */
export function getTopicsByCategory(category: string): BibliotecaTopic[] {
  return TOPICS.filter((t) => t.category === category);
}
