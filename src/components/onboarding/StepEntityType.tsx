import type { EntityType } from "@/types";

interface StepEntityTypeProps {
  value: EntityType | null;
  onChange: (value: EntityType) => void;
}

const ENTITY_OPTIONS: {
  value: EntityType;
  label: string;
  description: string;
}[] = [
  {
    value: "pfa",
    label: "PFA",
    description:
      "Persoana Fizica Autorizata. Ideal pentru freelanceri, consultanti si prestatori de servicii independenti.",
  },
  {
    value: "srl",
    label: "SRL",
    description:
      "Societate cu Raspundere Limitata. Pentru microintreprinderi cu asociat unic, fara angajati.",
  },
];

export function StepEntityType({ value, onChange }: StepEntityTypeProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-foreground mb-2">
        Ce tip de entitate ai?
      </h2>
      <p className="text-secondary-500 mb-6">
        Selecteaza tipul de entitate pentru care vrei sa folosesti Fiskio.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {ENTITY_OPTIONS.map((option) => (
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
