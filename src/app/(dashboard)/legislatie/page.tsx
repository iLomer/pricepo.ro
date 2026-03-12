import { getAllUpdates } from "@/lib/legislative";
import { isProUser } from "@/lib/stripe/subscription";
import { ProGate } from "@/components/ProGate";
import { LegislativeFilterTabs } from "./LegislativeFilterTabs";

export default async function LegislatiePage() {
  if (!(await isProUser())) {
    return <ProGate feature="Monitor legislativ" />;
  }
  const updates = getAllUpdates();

  return (
    <div className="pb-20 lg:pb-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Legislatie fiscala</h1>
        <p className="mt-1 text-sm text-secondary-500">
          Modificari legislative recente care te afecteaza — explicate in
          limbaj simplu, cu impact concret pe situatia ta.
        </p>
      </div>

      <LegislativeFilterTabs updates={updates} />
    </div>
  );
}
