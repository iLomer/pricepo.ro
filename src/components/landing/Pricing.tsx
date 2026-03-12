const freeFeatures = [
  "Calendar fiscal personalizat",
  "Wiki fiscal cu surse legislative",
  "3 alerte termen limita",
  "Toate regimurile: PFA + SRL",
] as const;

const proFeatures = [
  "Tot din planul Gratuit",
  "Monitor legislativ complet",
  "Estimator taxe personalizat",
  "Ghid Declaratia Unica (D212)",
  "Simulator dividende (SRL)",
  "Estimator CASS pe dividende",
  "Cash flow fiscal trimestrial",
  "Alerte nelimitate",
] as const;

function Check({ muted }: { muted?: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      className={`mt-0.5 shrink-0 ${muted ? "text-secondary-300" : "text-accent-500"}`}
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
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-secondary-400">
            Preturi
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-secondary-900 sm:text-4xl">
            Incepe gratuit, creste cand ai nevoie
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-secondary-500">
            Planul gratuit iti acopera baza. Planul Pro iti da tot ce
            trebuie ca sa nu mai depinzi de nimeni.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:mt-16 sm:grid-cols-2">
          {/* Free tier */}
          <div className="rounded-2xl border border-secondary-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold text-secondary-500">Gratuit</p>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-4xl font-bold tracking-tight text-secondary-900">
                0 lei
              </span>
              <span className="text-sm text-secondary-400">pentru totdeauna</span>
            </div>

            <p className="mt-3 text-sm text-secondary-500">
              Calendar, wiki si alerte de baza.
            </p>

            <hr className="my-6 border-secondary-200" />

            <ul className="space-y-3">
              {freeFeatures.map((f) => (
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
              className="mt-8 block rounded-lg border border-secondary-200 py-3 text-center text-sm font-medium text-secondary-700 transition-colors hover:border-secondary-300 hover:text-secondary-900"
            >
              Inscrie-te gratuit
            </a>
          </div>

          {/* Pro tier */}
          <div className="relative rounded-2xl border-2 border-secondary-900 bg-white p-8 shadow-sm">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-secondary-900 px-3 py-1 text-[11px] font-semibold text-white">
              Recomandat
            </div>

            <p className="text-sm font-semibold text-secondary-900">Pro</p>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-4xl font-bold tracking-tight text-secondary-900">
                39 lei
              </span>
              <span className="text-sm text-secondary-400">/luna</span>
            </div>
            <p className="mt-1 text-xs text-accent-600 font-medium">
              sau 299 lei/an (economisesti 169 lei)
            </p>

            <p className="mt-3 text-sm text-secondary-500">
              Tot ce ai nevoie ca sa fii independent fiscal.
            </p>

            <hr className="my-6 border-secondary-200" />

            <ul className="space-y-3">
              {proFeatures.map((f, i) => (
                <li
                  key={f}
                  className={`flex items-start gap-3 text-sm ${
                    i === 0 ? "text-secondary-400" : "text-secondary-700"
                  }`}
                >
                  <Check muted={i === 0} />
                  {f}
                </li>
              ))}
            </ul>

            <a
              href="#lista-asteptare"
              className="mt-8 block rounded-lg bg-secondary-900 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-secondary-800"
            >
              Incepe cu Pro
            </a>
          </div>
        </div>

        <p className="mt-6 text-center text-[13px] leading-relaxed text-secondary-400">
          Utilizatorii din beta vor beneficia de conditii speciale la lansarea planurilor.
        </p>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-secondary-200 to-transparent" />
    </section>
  );
}
