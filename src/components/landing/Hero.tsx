export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-b from-secondary-50 to-background">
      {/* Subtle warm grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute right-0 top-1/3 h-[500px] w-[500px] translate-x-1/4 rounded-full bg-gradient-to-br from-accent-200/40 to-primary-200/40 blur-[100px]" />
      <div className="pointer-events-none absolute -left-20 bottom-1/4 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-primary-100/30 to-accent-100/20 blur-[100px]" />

      {/* Decorative chevrons */}
      <svg
        className="pointer-events-none absolute right-8 top-1/2 hidden h-72 w-72 -translate-y-1/2 opacity-[0.06] lg:block"
        viewBox="0 0 40 40"
        fill="none"
      >
        <path d="M 6 2 L 26 20 L 6 38" stroke="#6EE7B7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 18 2 L 38 20 L 18 38" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      </svg>

      <div className="relative mx-auto w-full max-w-6xl px-6 pb-20 pt-32 sm:pt-40">
        <div className="max-w-3xl">
          <p className="mb-8 animate-fade-up text-[11px] font-medium uppercase tracking-[0.25em] text-primary-600">
            Educatie fiscala pentru PFA si SRL
          </p>

          <h1
            className="animate-fade-up text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.08] tracking-tight text-secondary-900"
            style={{ animationDelay: "100ms" }}
          >
            Ultima data cand
            <br />
            ai nevoie de un{" "}
            <span className="bg-gradient-to-r from-accent-500 to-primary-500 bg-clip-text text-transparent">
              contabil
            </span>
          </h1>

          <p
            className="mt-7 max-w-xl animate-fade-up text-[17px] leading-relaxed text-secondary-500"
            style={{ animationDelay: "200ms" }}
          >
            Nu mai plati lunar pentru ceva ce poti invata in cateva ore.
            Prevo iti arata exact ce declaratii ai, cand le depui si cat
            datorezi - fara frica de greseli, fara surprize de la ANAF.
          </p>

          <div
            className="mt-10 flex animate-fade-up flex-col gap-4 sm:flex-row sm:items-center"
            style={{ animationDelay: "300ms" }}
          >
            <a
              href="#lista-asteptare"
              className="inline-flex items-center justify-center rounded-lg bg-secondary-900 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-secondary-800"
            >
              Inscrie-te pe lista de asteptare
            </a>
            <a
              href="#cum-functioneaza"
              className="group inline-flex items-center justify-center gap-2 rounded-lg border border-secondary-200 px-7 py-3 text-sm font-medium text-secondary-600 transition-all hover:border-secondary-300 hover:text-secondary-900"
            >
              Afla cum functioneaza
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-0.5">
                <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          <div
            className="mt-12 flex animate-fade-up flex-wrap gap-x-8 gap-y-3"
            style={{ animationDelay: "400ms" }}
          >
            {[
              "Gratuit pentru calendar fiscal",
              "Fara abonament obligatoriu",
              "Pentru PFA si SRL",
            ].map((text) => (
              <span key={text} className="flex items-center gap-2.5 text-[13px] text-secondary-400">
                <span className="h-1 w-1 rounded-full bg-accent-500" />
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-secondary-200 to-transparent" />
    </section>
  );
}
