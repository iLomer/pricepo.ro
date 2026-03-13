const steps = [
  {
    number: "01",
    title: "Completeaza profilul fiscal",
    description:
      "In 5 minute ne spui ce tip de entitate ai (PFA/SRL), regimul fiscal, statutul TVA si codul CAEN. Atat.",
  },
  {
    number: "02",
    title: "Primesti calendarul tau personalizat",
    description:
      "Prevo iti arata exact ce declaratii ai de depus, termenele limita si cat datorezi. Fara surprize.",
  },
  {
    number: "03",
    title: "Inveti pe masura ce faci",
    description:
      "Fiecare declaratie vine cu ghid interactiv: ce inseamna fiecare camp, cum completezi, ce sume treci. Tu depui, nu altcineva.",
  },
  {
    number: "04",
    title: "Devii independent fiscal",
    description:
      "Dupa primul ciclu fiscal, stii exact ce ai de facut. Prevo ramane instrumentul tau, nu o dependenta.",
  },
] as const;

export function HowItWorks() {
  return (
    <section id="cum-functioneaza" className="relative bg-secondary-50 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-secondary-400">
          Cum functioneaza
        </p>
        <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-secondary-900 sm:text-4xl lg:text-5xl">
          Nu facem noi in locul tau. Te invatam sa faci singur.
        </h2>

        <div className="relative mt-16 grid gap-10 sm:mt-20 md:grid-cols-4 md:gap-6">
          <div className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-accent-400/40 via-primary-400/20 to-transparent md:block" />

          {steps.map((step) => (
            <div key={step.number} className="relative md:pr-4">
              <div className="relative z-10 mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-accent-200 bg-accent-50 font-mono text-base font-semibold text-accent-700">
                {step.number}
              </div>

              <h3 className="text-lg font-semibold text-secondary-900">
                {step.title}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-secondary-500">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-secondary-200 to-transparent" />
    </section>
  );
}
