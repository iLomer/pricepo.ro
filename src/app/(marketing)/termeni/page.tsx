import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termeni si conditii",
};

export default function TermeniPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 pb-24 pt-32 sm:pt-40">
      <h1 className="text-3xl font-bold tracking-tight text-secondary-900">
        Termeni si conditii
      </h1>
      <p className="mt-2 text-sm text-secondary-400">
        Ultima actualizare: 11 martie 2026
      </p>

      <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-secondary-600">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-secondary-900">
            1. Informatii generale
          </h2>
          <p>
            Prevo (prevo.ro) este o platforma de educatie fiscala destinata
            persoanelor fizice autorizate (PFA) si societatilor cu raspundere
            limitata (SRL) din Romania. Platforma ofera instrumente de calcul,
            calendare fiscale si ghiduri informative.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-secondary-900">
            2. Natura informatiilor
          </h2>
          <p>
            Informatiile furnizate prin Prevo au caracter exclusiv educativ si
            informativ. Prevo nu ofera consultanta fiscala, juridica sau
            contabila. Calculele si informatiile prezentate pot contine erori si
            nu substituie sfatul unui profesionist autorizat.
          </p>
          <p className="mt-3">
            Utilizatorul este singurul responsabil pentru deciziile fiscale
            luate pe baza informatiilor din platforma.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-secondary-900">
            3. Cont si acces
          </h2>
          <p>
            Pentru a utiliza platforma, este necesara crearea unui cont cu o
            adresa de email valida. Utilizatorul este responsabil pentru
            securitatea credentialelor de acces.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-secondary-900">
            4. Disponibilitate
          </h2>
          <p>
            Prevo se afla in perioada de beta. Ne rezervam dreptul de a modifica,
            suspenda sau intrerupe serviciul in orice moment, fara notificare
            prealabila.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-secondary-900">
            5. Limitarea raspunderii
          </h2>
          <p>
            Prevo nu isi asuma raspunderea pentru eventualele pierderi financiare,
            penalitati sau consecinte rezultate din utilizarea informatiilor din
            platforma. Utilizatorul foloseste platforma pe propriul risc.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-secondary-900">
            6. Modificari
          </h2>
          <p>
            Ne rezervam dreptul de a modifica acesti termeni in orice moment.
            Modificarile intra in vigoare la momentul publicarii pe aceasta
            pagina.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-secondary-900">
            7. Contact
          </h2>
          <p>
            Pentru orice intrebari legate de acesti termeni, ne poti contacta
            prin bula de feedback disponibila pe site.
          </p>
        </section>
      </div>
    </main>
  );
}
