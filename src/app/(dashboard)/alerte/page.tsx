import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AlertPreferences } from "@/components/alerts";
import { FiscalCalendar } from "@/components/calendar";
import type { FiscalRegime, TVAStatus } from "@/types";

export default async function AlertsPage() {
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
        <h1 className="text-2xl font-bold text-foreground">Alerte fiscale</h1>
        <p className="mt-1 text-sm text-secondary-500">
          Configureaza alertele pe email si vezi ce termene se apropie.
        </p>
      </div>

      <div className="space-y-8">
        {/* Preferences */}
        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            Preferinte alerte
          </h2>
          <AlertPreferences />
        </section>

        {/* Upcoming deadlines preview */}
        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">
            Termene in urmatoarele 30 de zile
          </h2>
          <FiscalCalendar regime={regime} tvaStatus={tvaStatus} />
        </section>
      </div>
    </div>
  );
}
