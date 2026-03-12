import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { FiscalCashFlow } from "@/components/srl/FiscalCashFlow";

export const dynamic = "force-dynamic";

export default async function CashFlowPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/autentificare");
  }

  return (
    <div className="pb-20 lg:pb-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Cash Flow Fiscal</h1>
        <p className="mt-1 text-sm text-secondary-500">
          Vizualizeaza obligatiile fiscale trimestriale si planifica rezervele de numerar.
        </p>
      </div>

      {/* Educational intro */}
      <div className="mb-6 rounded-xl border border-primary-200 bg-primary-50 p-4">
        <p className="text-sm leading-relaxed text-primary-700">
          Ca SRL micro-intreprindere, platesti impozit trimestrial pe cifra de afaceri
          (nu pe profit). Introdu veniturile estimate pentru a vedea cat trebuie sa pui
          deoparte in fiecare trimestru.
        </p>
      </div>

      <FiscalCashFlow />
    </div>
  );
}
