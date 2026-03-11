import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";

export default async function OnboardingPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/autentificare");
  }

  // Check if user already has a fiscal profile
  const { data: profile } = await supabase
    .from("fiscal_profiles")
    .select("id")
    .eq("id", user.id)
    .single();

  if (profile) {
    redirect("/panou");
  }

  return (
    <main className="flex min-h-screen items-center justify-center py-12">
      <OnboardingWizard />
    </main>
  );
}
