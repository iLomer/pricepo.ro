interface StepCAENProps {
  value: string;
  onChange: (value: string) => void;
}

export function StepCAEN({ value, onChange }: StepCAENProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-foreground mb-2">
        Care este codul tau CAEN?
      </h2>
      <p className="text-secondary-500 mb-6">
        Codul CAEN defineste activitatea principala a afacerii tale. Il gasesti
        in certificatul de inregistrare sau pe portalul ONRC.
      </p>

      <div>
        <label
          htmlFor="caen-code"
          className="block text-sm font-medium text-foreground mb-1"
        >
          Cod CAEN
        </label>
        <input
          id="caen-code"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="ex: 6201 - Activitati de realizare a software-ului"
          className="w-full rounded-lg border border-secondary-300 bg-background px-3 py-2 text-foreground placeholder:text-secondary-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
        />
        <p className="mt-2 text-xs text-secondary-400">
          Introdu codul CAEN cu 4 cifre (ex: 6201, 6202, 7022).
        </p>
      </div>
    </div>
  );
}
