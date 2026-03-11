import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { D212Guide } from "@/components/d212";
import type { FiscalRegime } from "@/types";

export default async function D212Page() {
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
        <h1 className="text-2xl font-bold text-foreground">
          Ghid interactiv D212
        </h1>
        <p className="mt-1 text-sm text-secondary-500">
          Completeaza Declaratia Unica pas cu pas. Fiecare camp este explicat, iar
          valorile sunt calculate automat.
        </p>
      </div>

      <D212Guide regime={regime} caenCode={profile.caen_code} />
    </div>
  );
}
