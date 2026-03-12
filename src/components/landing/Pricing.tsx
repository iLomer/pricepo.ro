const features = [
  "Calendar fiscal personalizat",
  "Calculatoare taxe (CAS, CASS, impozit)",
  "Alerte termen limita",
  "Ghid Declaratia Unica (D212)",
  "Simulator dividende (SRL)",
  "Estimator CASS pe dividende",
  "Cash flow fiscal trimestrial",
  "Toate regimurile: PFA + SRL",
] as const;

function Check() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      className="mt-0.5 shrink-0 text-accent-500"
    >
      <path
        d="M3.5 8.5L6.5 11.5L12.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Pricing() {
  return (
    <section id="preturi" className="relative bg-accent-50/30 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-secondary-400">
            Preturi
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-secondary-900 sm:text-4xl">
            Gratuit in perioada de beta
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-secondary-500">
            Toate functiile incluse. Fara limita de timp, fara card bancar.
            <br />
            Vrem sa construim ceva util - si avem nevoie de feedback-ul tau.
          </p>
        </div>

        <div className="mt-14 sm:mt-16">
          <div className="relative rounded-2xl border border-secondary-200 bg-white p-8 shadow-sm sm:p-10">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-secondary-900 px-3 py-1 text-[11px] font-semibold text-white">
              Acces complet
            </div>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-5xl font-bold tracking-tight text-secondary-900">
                  0 lei
                </span>
                <span className="text-sm text-secondary-400">
                  pe toata durata beta
                </span>
              </div>

              <p className="mt-3 text-center text-sm text-secondary-500">
                Tot ce ai nevoie ca sa-ti intelegi obligatiile fiscale, intr-un singur loc.
              </p>

              <hr className="my-8 border-secondary-200" />

              <ul className="grid gap-3 sm:grid-cols-2">
                {features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-sm text-secondary-700"
                  >
                    <Check />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#lista-asteptare"
                className="mt-10 block rounded-lg bg-secondary-900 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-secondary-800"
              >
                Inscrie-te gratuit
              </a>
          </div>

          <p className="mt-6 text-center text-[13px] leading-relaxed text-secondary-400">
            Vom introduce planuri premium dupa lansare, bazate pe ce aveti nevoie cu adevarat.
            <br />
            Utilizatorii din beta vor beneficia de conditii speciale.
          </p>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-secondary-200 to-transparent" />
    </section>
  );
}
