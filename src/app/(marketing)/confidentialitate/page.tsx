import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politica de confidentialitate",
};

export default function ConfidentialitatePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 pb-24 pt-32 sm:pt-40">
      <h1 className="text-3xl font-bold tracking-tight text-secondary-900">
        Politica de confidentialitate
      </h1>
      <p className="mt-2 text-sm text-secondary-400">
        Ultima actualizare: 11 martie 2026
      </p>

      <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-secondary-600">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-secondary-900">
            1. Ce date colectam
          </h2>
          <ul className="mt-2 list-inside list-disc space-y-1.5">
            <li>
              <strong>Cont:</strong> adresa de email, parola (criptata)
            </li>
            <li>
              <strong>Profil fiscal:</strong> tipul entitatii (PFA/SRL), regimul
              fiscal, statutul TVA, codul CAEN
            </li>
            <li>
              <strong>Feedback:</strong> mesajul trimis, email (optional), pagina
              de pe care a fost trimis
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-secondary-900">
            2. Cum folosim datele
          </h2>
          <p>
            Datele colectate sunt utilizate exclusiv pentru functionarea
            platformei: personalizarea calendarului fiscal, calculul estimarilor
            de taxe si imbunatatirea produsului pe baza feedback-ului.
          </p>
          <p className="mt-3">
            Nu vindem, nu inchiriem si nu distribuim datele personale catre
            terti.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-secondary-900">
            3. Unde stocam datele
          </h2>
          <p>
            Datele sunt stocate in baze de date gestionate de Supabase
            (infrastructura cloud). Autentificarea este gestionata prin Supabase
            Auth cu criptare standard.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-secondary-900">
            4. Cookie-uri
          </h2>
          <p>
            Prevo foloseste doar cookie-uri esentiale pentru autentificare si
            mentinerea sesiunii. Nu folosim cookie-uri de tracking sau publicitate.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-secondary-900">
            5. Drepturile tale (GDPR)
          </h2>
          <p>
            Conform Regulamentului General privind Protectia Datelor (GDPR), ai
            dreptul de a:
          </p>
          <ul className="mt-2 list-inside list-disc space-y-1.5">
            <li>Accesa datele tale personale</li>
            <li>Solicita rectificarea datelor incorecte</li>
            <li>Solicita stergerea datelor (&ldquo;dreptul de a fi uitat&rdquo;)</li>
            <li>Solicita portabilitatea datelor</li>
            <li>Retrage consimtamantul in orice moment</li>
          </ul>
          <p className="mt-3">
            Pentru exercitarea acestor drepturi, contacteaza-ne la{" "}
            <a href="mailto:contact@prevo.ro" className="text-primary-600 hover:text-primary-700">contact@prevo.ro</a>{" "}
            sau prin bula de feedback disponibila pe site.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-secondary-900">
            6. Modificari
          </h2>
          <p>
            Aceasta politica poate fi actualizata periodic. Modificarile intra
            in vigoare la momentul publicarii pe aceasta pagina.
          </p>
        </section>
      </div>
    </main>
  );
}
