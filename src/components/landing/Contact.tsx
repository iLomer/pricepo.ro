export function Contact() {
  return (
    <section id="contact" className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-secondary-400">
              Contact
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-secondary-900 sm:text-4xl">
              Vorbeste cu noi
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-secondary-500">
              Ai o intrebare despre Prevo, despre taxe, sau vrei sa ne spui ce
              functie ti-ar fi utila? Suntem curiosi sa auzim.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary-600"
                >
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-secondary-900">
                  Feedback rapid
                </p>
                <p className="mt-1 text-sm leading-relaxed text-secondary-500">
                  Apasa pe bula din coltul din dreapta-jos al ecranului.
                  Bug, sugestie, intrebare - orice ne ajuta sa facem Prevo mai bun.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-50">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-accent-600"
                >
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87" />
                  <path d="M16 3.13a4 4 0 010 7.75" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-secondary-900">
                  Comunitate
                </p>
                <p className="mt-1 text-sm leading-relaxed text-secondary-500">
                  Construim Prevo impreuna cu utilizatorii din beta.
                  Feedback-ul tau influenteaza direct ce functii construim urmatoarele.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-warning-50">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-warning-600"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-secondary-900">
                  Ai gasit o eroare fiscala?
                </p>
                <p className="mt-1 text-sm leading-relaxed text-secondary-500">
                  Informatiile fiscale corecte sunt prioritatea noastra #1.
                  Daca observi ceva gresit, spune-ne imediat prin bula de feedback.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-secondary-200 to-transparent" />
    </section>
  );
}
