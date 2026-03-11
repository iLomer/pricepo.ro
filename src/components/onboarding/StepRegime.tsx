import type { EntityType, FiscalRegime } from "@/types";

interface StepRegimeProps {
  entityType: EntityType;
  value: FiscalRegime | null;
  onChange: (value: FiscalRegime) => void;
}

interface RegimeOption {
  value: FiscalRegime;
  label: string;
  description: string;
}

const PFA_REGIMES: RegimeOption[] = [
  {
    value: "norma_venit",
    label: "Norma de venit",
    description:
      "Impozitul se calculeaza pe baza unei norme fixe stabilite de ANAF, nu pe veniturile reale. Ideal daca ai venituri mai mari decat norma.",
  },
  {
    value: "sistem_real",
    label: "Sistem real",
    description:
      "Impozitul se calculeaza pe veniturile nete reale (venituri minus cheltuieli). Ideal daca ai cheltuieli deductibile semnificative.",
  },
];

const SRL_REGIMES: RegimeOption[] = [
  {
    value: "micro_1",
    label: "Microintreprindere 1%",
    description:
      "Impozit de 1% pe venituri. Aplicabil SRL-urilor cu cel putin un angajat si venituri sub 500.000 EUR.",
  },
  {
    value: "micro_3",
    label: "Microintreprindere 3%",
    description:
      "Impozit de 3% pe venituri. Aplicabil SRL-urilor fara angajati sau celor care opteaza pentru aceasta cota.",
  },
];

export function StepRegime({ entityType, value, onChange }: StepRegimeProps) {
  const options = entityType === "pfa" ? PFA_REGIMES : SRL_REGIMES;

  return (
    <div>
      <h2 className="text-xl font-semibold text-foreground mb-2">
        Ce regim fiscal ai?
      </h2>
      <p className="text-secondary-500 mb-6">
        Selecteaza regimul fiscal aplicabil{" "}
        {entityType === "pfa" ? "PFA-ului" : "SRL-ului"} tau.
      </p>

      <div className="grid gap-4">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`rounded-xl border-2 p-5 text-left transition-all ${
              value === option.value
                ? "border-primary-500 bg-primary-50"
                : "border-secondary-200 hover:border-secondary-300"
            }`}
          >
            <span
              className={`text-lg font-bold ${
                value === option.value
                  ? "text-primary-700"
                  : "text-foreground"
              }`}
            >
              {option.label}
            </span>
            <p className="mt-2 text-sm text-secondary-500">
              {option.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
