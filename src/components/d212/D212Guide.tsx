"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { FiscalRegime } from "@/types";
import {
  calculateCAS,
  calculateCASS,
  calculateIncomeTax,
  calculateTotalTax,
  getTaxableBase,
  getNormaDeVenitEntry,
  FISCAL_CONSTANTS_2026,
} from "@/lib/fiscal";
import type { TaxBreakdown } from "@/lib/fiscal";
import { D212Step } from "./D212Step";
import { D212Summary } from "./D212Summary";
import { D212Export } from "./D212Export";

interface D212GuideProps {
  regime: FiscalRegime;
  caenCode: string;
}

const SECTION_LABELS = [
  "I. Date de identificare",
  "II. Categoria de venit",
  "III. Venit brut estimat",
  "IV. Cheltuieli deductibile",
  "V. Venit net estimat",
  "VI. CAS",
  "VII. CASS",
  "VIII. Impozit pe venit",
  "Rezumat",
  "Export si depunere",
];

export function D212Guide({ regime, caenCode }: D212GuideProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [income, setIncome] = useState<string>("");
  const [expenses, setExpenses] = useState<string>("");
  const [breakdown, setBreakdown] = useState<TaxBreakdown | null>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const normaEntry = regime === "norma_venit" ? getNormaDeVenitEntry(caenCode) : null;
  const isNorma = regime === "norma_venit";

  const totalSteps = isNorma ? 9 : 10; // Skip "cheltuieli" step for norma, +1 for export

  const recalculate = useCallback(
    (incomeStr: string, expensesStr: string) => {
      const incomeNum = parseFloat(incomeStr) || 0;
      const expensesNum = isNorma ? 0 : (parseFloat(expensesStr) || 0);

      if (incomeNum <= 0) {
        setBreakdown(null);
        return;
      }

      const result = calculateTotalTax(incomeNum, regime, expensesNum, caenCode);
      setBreakdown(result);
    },
    [regime, caenCode, isNorma]
  );

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      recalculate(income, expenses);
    }, 300);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [income, expenses, recalculate]);

  const incomeNum = parseFloat(income) || 0;
  const expensesNum = isNorma ? 0 : (parseFloat(expenses) || 0);
  const taxableBase = incomeNum > 0 ? getTaxableBase(incomeNum, regime, expensesNum, caenCode) : 0;
  const casValue = incomeNum > 0 ? calculateCAS(incomeNum, regime, expensesNum, caenCode) : 0;
  const cassValue = incomeNum > 0 ? calculateCASS(incomeNum, regime, expensesNum, caenCode) : 0;
  const incomeTaxValue = incomeNum > 0 ? calculateIncomeTax(incomeNum, regime, expensesNum, caenCode) : 0;

  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <div className="rounded-xl border border-secondary-200 bg-background p-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-medium text-secondary-500">
            Progres completare D212
          </p>
          <p className="text-xs font-semibold text-primary-600">
            Sectiunea {currentStep + 1} din {totalSteps}
          </p>
        </div>
        <div className="flex gap-1">
          {Array.from({ length: totalSteps }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentStep(i)}
              className={`h-2 flex-1 rounded-full transition-colors ${
                i <= currentStep ? "bg-primary-500" : "bg-secondary-200"
              }`}
              aria-label={`Sectiunea ${i + 1}`}
            />
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {SECTION_LABELS.slice(0, totalSteps).map((label, i) => (
            <button
              key={label}
              onClick={() => setCurrentStep(i)}
              className={`rounded-full px-2.5 py-1 text-xs transition-colors ${
                i === currentStep
                  ? "bg-primary-100 font-semibold text-primary-700"
                  : "text-secondary-400 hover:text-secondary-600"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {/* Section I: Identification */}
        {currentStep === 0 && (
          <D212Step
            stepNumber={1}
            fieldLabel="Sectiunea I -- Date de identificare contribuabil"
            explanation="Completeaza cu datele tale de identificare: CNP sau CUI, nume si prenume, adresa de domiciliu. Aceste date le gasesti in certificatul de inregistrare fiscala al PFA-ului."
            whyExplanation="ANAF foloseste aceste date pentru a identifica cine depune declaratia. Asigura-te ca datele coincid cu cele din certificatul de inregistrare al PFA. Daca ti-ai schimbat adresa, actualizeaza-o mai intai la ANAF."
          >
            <div className="rounded-lg bg-secondary-50 px-3 py-2.5">
              <p className="text-xs text-secondary-500">
                Completeaza in formularul oficial D212 cu datele din certificatul de inregistrare PFA.
              </p>
            </div>
          </D212Step>
        )}

        {/* Section II: Income category */}
        {currentStep === 1 && (
          <D212Step
            stepNumber={2}
            fieldLabel="Sectiunea II -- Categoria de venit si sursa"
            explanation={
              isNorma
                ? 'Selecteaza "Venituri din activitati independente" si bifa "Norma de venit". Codul CAEN este ' +
                  caenCode +
                  (normaEntry ? " -- " + normaEntry.caenDescription : "") +
                  "."
                : 'Selecteaza "Venituri din activitati independente" si bifa "Sistem real". Codul CAEN este ' +
                  caenCode +
                  "."
            }
            whyExplanation={
              isNorma
                ? "La norma de venit, impozitul se calculeaza pe o valoare fixa stabilita de ANAF pe fiecare judet si cod CAEN, nu pe venitul real. Avantajul: platesti impozit pe norma chiar daca castigi mai mult. Dezavantajul: platesti acelasi impozit chiar daca castigi mai putin."
                : "La sistem real, impozitul se calculeaza pe diferenta dintre veniturile incasate si cheltuielile deductibile. Avantajul: poti deduce cheltuielile. Dezavantajul: trebuie sa tii evidenta tuturor cheltuielilor."
            }
          >
            <div className="rounded-lg bg-secondary-50 px-3 py-2.5">
              <p className="text-xs font-medium text-foreground">
                Regimul tau: {isNorma ? "Norma de venit" : "Sistem real"}
              </p>
              <p className="text-xs text-secondary-500">
                CAEN: {caenCode}
                {normaEntry && ` -- ${normaEntry.caenDescription}`}
              </p>
            </div>
          </D212Step>
        )}

        {/* Section III: Estimated annual income */}
        {currentStep === 2 && (
          <D212Step
            stepNumber={3}
            fieldLabel="Sectiunea III -- Venitul brut anual estimat"
            explanation={
              isNorma
                ? "Introdu venitul brut pe care estimezi ca il vei incasa anul acesta. La norma de venit, aceasta valoare nu afecteaza direct impozitul (care se calculeaza pe norma), dar este necesara pentru stabilirea pragurilor CAS si CASS."
                : "Introdu totalul veniturilor brute pe care estimezi ca le vei incasa anul acesta. Aceasta este baza de la care se pornesc toate calculele."
            }
            whyExplanation="Venitul brut este totalul facturat inainte de orice deduceri sau taxe. Include toate veniturile din activitatea PFA, inclusiv cele incasate in natura. ANAF cere o estimare -- daca la sfarsitul anului realitatea e diferita, poti depune o declaratie rectificativa."
          >
            <div className="mt-2">
              <label
                htmlFor="d212-income"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Venit brut anual estimat (lei)
              </label>
              <input
                id="d212-income"
                type="number"
                min="0"
                step="100"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                placeholder="ex: 120000"
                className="w-full rounded-lg border border-secondary-300 px-3 py-2.5 text-sm text-foreground placeholder-secondary-400 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              />
            </div>
          </D212Step>
        )}

        {/* Section IV: Deductible expenses (sistem real only) */}
        {!isNorma && currentStep === 3 && (
          <D212Step
            stepNumber={4}
            fieldLabel="Sectiunea IV -- Cheltuieli deductibile"
            explanation="Introdu totalul cheltuielilor deductibile estimate. Cheltuielile deductibile sunt cele facute exclusiv in scopul activitatii PFA si care au documente justificative (facturi, chitante)."
            whyExplanation="Cheltuielile deductibile reduc baza impozabila -- adica platesti taxe doar pe diferenta venit - cheltuieli. Exemple de cheltuieli deductibile: chiria biroului, echipamente IT, abonamente software, deplasari in interes de serviciu, contributii profesionale. Nu sunt deductibile: cheltuielile personale, amenzile, cheltuielile fara documente."
          >
            <div className="mt-2">
              <label
                htmlFor="d212-expenses"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Cheltuieli deductibile anuale estimate (lei)
              </label>
              <input
                id="d212-expenses"
                type="number"
                min="0"
                step="100"
                value={expenses}
                onChange={(e) => setExpenses(e.target.value)}
                placeholder="ex: 15000"
                className="w-full rounded-lg border border-secondary-300 px-3 py-2.5 text-sm text-foreground placeholder-secondary-400 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              />
            </div>
          </D212Step>
        )}

        {/* Section V: Net estimated income */}
        {currentStep === (isNorma ? 3 : 4) && (
          <D212Step
            stepNumber={isNorma ? 4 : 5}
            fieldLabel="Sectiunea V -- Venitul net estimat"
            explanation={
              isNorma
                ? `La norma de venit, baza impozabila este valoarea normei: ${
                    normaEntry
                      ? new Intl.NumberFormat("ro-RO").format(normaEntry.normaValue) + " lei"
                      : "valoarea normei pentru CAEN-ul tau"
                  }. Nu depinde de cat castigi efectiv.`
                : "Venitul net = Venitul brut minus cheltuielile deductibile. Aceasta este baza pe care se calculeaza impozitul pe venit."
            }
            whyExplanation={
              isNorma
                ? "Norma de venit este o valoare fixa stabilita de Directia Generala a Finantelor Publice din judetul tau. Ea difera de la judet la judet si de la CAEN la CAEN. Valorile din Fiskio sunt orientative (medie nationala). Verifica valoarea exacta pe site-ul DGFP al judetului tau."
                : "Venitul net este cifra reala pe care ANAF o foloseste pentru a calcula impozitul. Cu cat ai cheltuieli deductibile mai mari, cu atat venitul net e mai mic si platesti mai putin impozit."
            }
            value={taxableBase}
            isAutoCalculated
          />
        )}

        {/* Section VI: CAS */}
        {currentStep === (isNorma ? 4 : 5) && (
          <D212Step
            stepNumber={isNorma ? 5 : 6}
            fieldLabel="Sectiunea VI -- CAS (Contributia de Asigurari Sociale)"
            explanation={`CAS este contributia pentru pensie. Rata este ${(FISCAL_CONSTANTS_2026.CAS_RATE * 100).toFixed(0)}% din ${
              new Intl.NumberFormat("ro-RO").format(FISCAL_CONSTANTS_2026.MINIMUM_GROSS_SALARY_ANNUAL)
            } lei (12 salarii minime). Se datoreaza doar daca venitul/norma depaseste ${
              new Intl.NumberFormat("ro-RO").format(FISCAL_CONSTANTS_2026.MINIMUM_GROSS_SALARY_ANNUAL)
            } lei.`}
            whyExplanation={`CAS asigura dreptul la pensie. Baza de calcul nu este venitul real, ci plafonul de 12 salarii minime brute (${
              new Intl.NumberFormat("ro-RO").format(FISCAL_CONSTANTS_2026.MINIMUM_GROSS_SALARY_ANNUAL)
            } lei in ${FISCAL_CONSTANTS_2026.FISCAL_YEAR}). Daca venitul tau net (sau norma) este sub acest plafon, nu datorezi CAS. Daca este peste, platesti fix ${
              new Intl.NumberFormat("ro-RO").format(FISCAL_CONSTANTS_2026.MINIMUM_GROSS_SALARY_ANNUAL * FISCAL_CONSTANTS_2026.CAS_RATE)
            } lei.`}
            value={casValue}
            isAutoCalculated
          />
        )}

        {/* Section VII: CASS */}
        {currentStep === (isNorma ? 5 : 6) && (
          <D212Step
            stepNumber={isNorma ? 6 : 7}
            fieldLabel="Sectiunea VII -- CASS (Contributia de Asigurari Sociale de Sanatate)"
            explanation={`CASS este contributia pentru sanatate. Rata este ${(FISCAL_CONSTANTS_2026.CASS_RATE * 100).toFixed(0)}%. Are doua praguri: 6 salarii minime (${
              new Intl.NumberFormat("ro-RO").format(FISCAL_CONSTANTS_2026.CASS_THRESHOLD_6X)
            } lei) si 12 salarii minime (${
              new Intl.NumberFormat("ro-RO").format(FISCAL_CONSTANTS_2026.CASS_THRESHOLD_12X)
            } lei).`}
            whyExplanation={`CASS asigura dreptul la servicii medicale gratuite. Functioneaza pe praguri: sub ${
              new Intl.NumberFormat("ro-RO").format(FISCAL_CONSTANTS_2026.CASS_THRESHOLD_6X)
            } lei venit net -- nu datorezi CASS. Intre ${
              new Intl.NumberFormat("ro-RO").format(FISCAL_CONSTANTS_2026.CASS_THRESHOLD_6X)
            } si ${
              new Intl.NumberFormat("ro-RO").format(FISCAL_CONSTANTS_2026.CASS_THRESHOLD_12X)
            } lei -- platesti 10% din ${
              new Intl.NumberFormat("ro-RO").format(FISCAL_CONSTANTS_2026.CASS_THRESHOLD_6X)
            } lei = ${
              new Intl.NumberFormat("ro-RO").format(FISCAL_CONSTANTS_2026.CASS_THRESHOLD_6X * FISCAL_CONSTANTS_2026.CASS_RATE)
            } lei. Peste ${
              new Intl.NumberFormat("ro-RO").format(FISCAL_CONSTANTS_2026.CASS_THRESHOLD_12X)
            } lei -- platesti 10% din ${
              new Intl.NumberFormat("ro-RO").format(FISCAL_CONSTANTS_2026.CASS_THRESHOLD_12X)
            } lei = ${
              new Intl.NumberFormat("ro-RO").format(FISCAL_CONSTANTS_2026.CASS_THRESHOLD_12X * FISCAL_CONSTANTS_2026.CASS_RATE)
            } lei.`}
            value={cassValue}
            isAutoCalculated
          />
        )}

        {/* Section VIII: Income tax */}
        {currentStep === (isNorma ? 6 : 7) && (
          <D212Step
            stepNumber={isNorma ? 7 : 8}
            fieldLabel="Sectiunea VIII -- Impozit pe venit"
            explanation={
              isNorma
                ? `Impozitul pe venit la norma este ${(FISCAL_CONSTANTS_2026.INCOME_TAX_RATE * 100).toFixed(0)}% din valoarea normei de venit.`
                : `Impozitul pe venit la sistem real este ${(FISCAL_CONSTANTS_2026.INCOME_TAX_RATE * 100).toFixed(0)}% din venitul net minus CAS si CASS. CAS si CASS sunt deductibile din baza de impozitare.`
            }
            whyExplanation={
              isNorma
                ? "La norma de venit, impozitul se aplica direct pe valoarea normei, indiferent de venitul real. Aceasta este una din simplificarile regimului norma de venit."
                : "La sistem real, CAS si CASS platite se deduc din venitul net inainte de calculul impozitului. Formula: Impozit = 10% x (Venit net - CAS - CASS). Aceasta inseamna ca CAS si CASS efective reduc baza de impozitare."
            }
            value={incomeTaxValue}
            isAutoCalculated
          />
        )}

        {/* Summary */}
        {currentStep === (isNorma ? 7 : 8) && breakdown && (
          <D212Summary breakdown={breakdown} regime={regime} />
        )}

        {currentStep === (isNorma ? 7 : 8) && !breakdown && (
          <div className="flex flex-col items-center justify-center rounded-xl border border-secondary-200 bg-background px-6 py-10 text-center">
            <p className="text-sm text-secondary-500">
              Introdu venitul brut estimat in Sectiunea III pentru a vedea rezumatul complet.
            </p>
          </div>
        )}

        {/* Export and SPV submission */}
        {currentStep === (isNorma ? 8 : 9) && breakdown && (
          <D212Export breakdown={breakdown} regime={regime} />
        )}

        {currentStep === (isNorma ? 8 : 9) && !breakdown && (
          <div className="flex flex-col items-center justify-center rounded-xl border border-secondary-200 bg-background px-6 py-10 text-center">
            <p className="text-sm text-secondary-500">
              Completeaza venitul brut estimat in Sectiunea III pentru a putea exporta valorile.
            </p>
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="rounded-lg border border-secondary-300 px-4 py-2 text-sm font-medium text-secondary-600 transition-colors hover:bg-secondary-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Inapoi
        </button>
        <span className="text-xs text-secondary-400">
          {currentStep + 1} / {totalSteps}
        </span>
        <button
          onClick={() => setCurrentStep(Math.min(totalSteps - 1, currentStep + 1))}
          disabled={currentStep === totalSteps - 1}
          className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Urmatorul pas
        </button>
      </div>
    </div>
  );
}
