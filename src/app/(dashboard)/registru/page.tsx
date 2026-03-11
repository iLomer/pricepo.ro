import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TransactionLedger } from "@/components/transactions";

export const dynamic = "force-dynamic";

export default async function RegistruPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/autentificare");
  }

  return (
    <div className="pb-20 lg:pb-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Registru incasari si plati</h1>
        <p className="mt-1 text-sm text-secondary-500">
          Evidenta completa a veniturilor si cheltuielilor tale. Obligatoriu pentru PFA sistem real, util pentru toti.
        </p>
      </div>
      <TransactionLedger />
    </div>
  );
}
