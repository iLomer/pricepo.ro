import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TaxEstimator } from "@/components/estimator";
import type { FiscalRegime } from "@/types";

export default async function EstimatorPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/autentificare");
  }

  const { data: profile } = await supabase
    .from("fiscal_profiles")
    .select("regime, caen_code")
    .eq("id", user.id)
    .single();

  if (!profile) {
    redirect("/onboarding");
  }

  const regime = profile.regime as FiscalRegime;

  return (
    <div className="pb-20 lg:pb-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Estimator taxe</h1>
        <p className="mt-1 text-sm text-secondary-500">
          Introdu venitul anual si vezi cat trebuie sa pui deoparte pentru CAS,
          CASS si impozit.
        </p>
      </div>

      <TaxEstimator regime={regime} caenCode={profile.caen_code} />
    </div>
  );
}
