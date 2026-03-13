const features = [
  {
    title: "Calendar fiscal personalizat",
    description:
      "Toate termenele tale intr-un singur loc. Stii exact ce declaratii ai, cand le depui si ce se intampla daca intarzii.",
    icon: CalendarIcon,
    span: "md:col-span-2",
  },
  {
    title: "Estimator taxe in timp real",
    description:
      "Adaugi venitul, vezi instant cat trebuie sa pui deoparte. Fara surprize cand vine scadenta.",
    icon: CalculatorIcon,
    span: "",
  },
  {
    title: "Ghid interactiv D212",
    description:
      "Fiecare camp explicat in limba romana normala. Calculele se fac automat. Fisierul e gata de depus in SPV.",
    icon: DocumentIcon,
    span: "",
  },
  {
    title: "Monitor legislativ",
    description:
      "Fiecare modificare fiscala explicata in limba romana, cu impact concret pe situatia ta. Cu baza legala si referinta Monitorul Oficial, fara sa cauti pe 5 site-uri sau sa platesti legis.ro.",
    icon: BellIcon,
    span: "md:col-span-2",
  },
  {
    title: "Wiki fiscal cu surse",
    description:
      "Termeni fiscali explicati pe intelesul tuturor, fiecare cu baza legala verificabila. Nu \"cred ca asa e\", ci legea exacta pe care se bazeaza.",
    icon: BookIcon,
    span: "",
  },
  {
    title: "Alerte fiscale pe email",
    description:
      "Primesti un email inainte de fiecare termen fiscal. Tu alegi cand: cu 7, 3 sau 1 zi inainte. Nu mai ratezi nicio scadenta.",
    icon: AlertIcon,
    span: "",
  },
] as const;

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  );
}

function CalculatorIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
    </svg>
  );
}

function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  );
}

function BellIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
    </svg>
  );
}

function BookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  );
}

function AlertIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

export function Features() {
  return (
    <section id="functii" className="relative bg-secondary-100/50 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-secondary-400">
          Functii
        </p>
        <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-secondary-900 sm:text-4xl lg:text-5xl">
          Tot ce ai nevoie ca sa fii independent fiscal
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-secondary-500">
          Instrumente practice, nu teorie abstracta. Fiecare functie te ajuta
          sa rezolvi o problema reala.
        </p>

        <div className="mt-14 grid gap-4 sm:mt-16 md:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className={`group rounded-2xl border border-secondary-200 bg-white p-8 shadow-sm transition-all hover:border-secondary-300 hover:shadow-md ${f.span}`}
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50">
                <f.icon className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-secondary-900">
                {f.title}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-secondary-500">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-secondary-200 to-transparent" />
    </section>
  );
}
