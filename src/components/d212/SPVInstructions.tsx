"use client";

interface SPVStep {
  stepNumber: number;
  title: string;
  description: string;
  url?: string;
}

const SPV_STEPS: SPVStep[] = [
  {
    stepNumber: 1,
    title: "Acceseaza formularul D212 pe site-ul ANAF",
    description:
      "Mergi pe site-ul ANAF la sectiunea Declaratii electronice si gaseste formularul D212 " +
      "(Declaratia Unica privind impozitul pe venit si contributiile sociale datorate de persoanele fizice).",
    url: "https://www.anaf.ro/anaf/internet/ANAF/servicii_online/declaratii_electronice",
  },
  {
    stepNumber: 2,
    title: "Descarca si deschide formularul oficial D212 (PDF editabil)",
    description:
      "Descarca formularul D212 in format PDF editabil. Deschide-l cu Adobe Acrobat Reader " +
      "(gratuit). Nu folosi alte programe PDF -- pot corupe formatul.",
  },
  {
    stepNumber: 3,
    title: "Completeaza fiecare camp folosind valorile din Fiskio",
    description:
      "Foloseste rezumatul exportat din Fiskio si completeaza fiecare sectiune din formularul D212. " +
      "Valorile sunt deja calculate -- trebuie doar sa le copiezi in campurile corespunzatoare. " +
      "Foloseste butonul 'Copiaza' de langa fiecare valoare pentru a copia rapid.",
  },
  {
    stepNumber: 4,
    title: "Valideaza formularul",
    description:
      'Dupa completare, apasa butonul "Validare" din formularul PDF. ' +
      "Daca apar erori, verifica campurile semnalate si corecteaza. " +
      "Formularul nu poate fi depus fara validare.",
  },
  {
    stepNumber: 5,
    title: "Depune declaratia prin SPV (Spatiul Privat Virtual)",
    description:
      'Acceseaza SPV la adresa de mai jos. Autentifica-te cu certificat digital sau user/parola. ' +
      'Mergi la "Depunere declaratii" si incarca fisierul D212 validat.',
    url: "https://www.e-guvernare.ro",
  },
  {
    stepNumber: 6,
    title: "Verifica statusul depunerii",
    description:
      'Dupa depunere, verifica in SPV la "Mesaje" sau "Istoric depuneri" ca declaratia a fost ' +
      "inregistrata cu succes. Vei primi un mesaj de confirmare. Pastreaza numarul de inregistrare.",
  },
];

export function SPVInstructions() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-primary-200 bg-primary-50 px-4 py-3">
        <h3 className="text-sm font-bold text-primary-800">
          Cum depui D212 prin SPV -- pas cu pas
        </h3>
        <p className="mt-0.5 text-xs text-primary-600">
          Urmeaza acesti pasi pentru a depune Declaratia Unica la ANAF
        </p>
      </div>

      {SPV_STEPS.map((step) => (
        <div
          key={step.stepNumber}
          className="rounded-xl border border-secondary-200 bg-background p-4"
        >
          <div className="flex items-start gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">
              {step.stepNumber}
            </span>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-foreground">
                {step.title}
              </h4>
              <p className="mt-1 text-xs leading-relaxed text-secondary-500">
                {step.description}
              </p>
              {step.url && (
                <a
                  href={step.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary-600 hover:text-primary-700"
                >
                  {step.url}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3 w-3"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              )}
              {/* Screenshot placeholder */}
              <div className="mt-3 flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-secondary-200 bg-secondary-50">
                <p className="text-xs text-secondary-400">
                  Captura de ecran -- va fi adaugata ulterior
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
