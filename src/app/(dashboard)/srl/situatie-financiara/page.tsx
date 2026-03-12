import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SRLOverview } from "@/components/srl/SRLOverview";
import type { FiscalRegime } from "@/types";

export default async function SituatieFinanciaraPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/autentificare");
  }

  const { data: profile } = await supabase
    .from("fiscal_profiles")
    .select("regime")
    .eq("id", user.id)
    .single();

  if (!profile) {
    redirect("/onboarding");
  }

  const regime = profile.regime as FiscalRegime;

  if (regime !== "micro_1") {
    redirect("/panou");
  }

  return (
    <div className="pb-20 lg:pb-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Situatie financiara SRL</h1>
        <p className="mt-1 text-sm text-secondary-500">
          Vedere completa: venituri, impozit micro, dividende, CASS si net in mana - totul intr-un singur loc.
        </p>
      </div>
      <SRLOverview />
    </div>
  );
}
