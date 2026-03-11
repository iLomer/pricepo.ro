interface StepTVAProps {
  value: boolean | null;
  onChange: (value: boolean) => void;
}

export function StepTVA({ value, onChange }: StepTVAProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-foreground mb-2">
        Esti platitor de TVA?
      </h2>
      <p className="text-secondary-500 mb-6">
        Daca ai depasit plafonul de 300.000 lei sau te-ai inregistrat voluntar
        in scopuri de TVA, selecteaza &quot;Platitor TVA&quot;.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => onChange(false)}
          className={`rounded-xl border-2 p-5 text-left transition-all ${
            value === false
              ? "border-primary-500 bg-primary-50"
              : "border-secondary-200 hover:border-secondary-300"
          }`}
        >
          <span
            className={`text-lg font-bold ${
              value === false ? "text-primary-700" : "text-foreground"
            }`}
          >
            Neplatitor TVA
          </span>
          <p className="mt-2 text-sm text-secondary-500">
            Nu esti inregistrat in scopuri de TVA. Majoritatea PFA-urilor si
            SRL-urilor mici sunt in aceasta categorie.
          </p>
        </button>

        <button
          type="button"
          onClick={() => onChange(true)}
          className={`rounded-xl border-2 p-5 text-left transition-all ${
            value === true
              ? "border-primary-500 bg-primary-50"
              : "border-secondary-200 hover:border-secondary-300"
          }`}
        >
          <span
            className={`text-lg font-bold ${
              value === true ? "text-primary-700" : "text-foreground"
            }`}
          >
            Platitor TVA
          </span>
          <p className="mt-2 text-sm text-secondary-500">
            Esti inregistrat in scopuri de TVA si depui deconturi de TVA
            periodic.
          </p>
        </button>
      </div>
    </div>
  );
}
