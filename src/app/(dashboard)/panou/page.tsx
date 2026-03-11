import Link from "next/link";

interface FeatureCard {
  title: string;
  description: string;
  href: string;
  iconColor: string;
  icon: React.ReactNode;
}

const FEATURE_CARDS: FeatureCard[] = [
  {
    title: "Calendar fiscal",
    description:
      "Vezi toate obligatiile fiscale din urmatoarele 30 de zile, personalizate pe regimul tau.",
    href: "/calendar",
    iconColor: "bg-primary-50 text-primary-600",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    title: "Estimator taxe",
    description:
      "Introdu venitul si vezi cat trebuie sa pui deoparte pentru taxe -- CAS, CASS, impozit.",
    href: "/estimator",
    iconColor: "bg-accent-50 text-accent-600",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <line x1="8" y1="6" x2="16" y2="6" />
        <line x1="8" y1="10" x2="16" y2="10" />
        <line x1="8" y1="14" x2="12" y2="14" />
        <line x1="8" y1="18" x2="10" y2="18" />
      </svg>
    ),
  },
  {
    title: "Ghid D212",
    description:
      "Completeaza Declaratia Unica pas cu pas, cu explicatii in limba romana si calcule automate.",
    href: "/d212",
    iconColor: "bg-warning-50 text-warning-600",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    title: "Alerte",
    description:
      "Primesti notificari pe email inainte de fiecare termen fiscal -- nu mai ratezi nicio obligatie.",
    href: "/alerte",
    iconColor: "bg-error-50 text-error-600",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
];

export default function DashboardPage() {
  return (
    <div className="pb-20 lg:pb-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Panou de control</h1>
        <p className="mt-1 text-sm text-secondary-500">
          Bine ai venit in Fiskio. Alege o functionalitate pentru a incepe.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {FEATURE_CARDS.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group rounded-xl border border-secondary-200 bg-background p-5 transition-all hover:border-primary-300 hover:shadow-md"
          >
            <div className={`mb-3 inline-flex rounded-lg p-2.5 ${card.iconColor}`}>
              {card.icon}
            </div>
            <h2 className="text-base font-semibold text-foreground group-hover:text-primary-700">
              {card.title}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-secondary-500">
              {card.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
