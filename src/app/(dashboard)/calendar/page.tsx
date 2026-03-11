import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { FiscalCalendar } from "@/components/calendar";
import type { FiscalRegime, TVAStatus } from "@/types";

export default async function CalendarPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/autentificare");
  }

  const { data: profile } = await supabase
    .from("fiscal_profiles")
    .select("regime, tva_status")
    .eq("id", user.id)
    .single();

  if (!profile) {
    redirect("/onboarding");
  }

  const regime = profile.regime as FiscalRegime;
  const tvaStatus: TVAStatus = profile.tva_status ? "platitor" : "neplatitor";

  return (
    <div className="pb-20 lg:pb-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Calendar fiscal</h1>
        <p className="mt-1 text-sm text-secondary-500">
          Obligatiile tale fiscale din urmatoarele 30 de zile, personalizate pe
          regimul tau.
        </p>
      </div>

      <FiscalCalendar regime={regime} tvaStatus={tvaStatus} />
    </div>
  );
}
