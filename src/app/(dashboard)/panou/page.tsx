import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { calculateTotalTax } from "@/lib/fiscal/pfa-taxes";
import { filterDeadlines, filterDeadlinesGeneric } from "@/lib/fiscal/pfa-deadlines";
import { getNormaDeVenitEntry } from "@/lib/fiscal/norma-venit";
import { getAllSRLDeadlines } from "@/lib/fiscal/srl/srl-deadlines";
import { SistemRealEstimatorCard } from "@/components/estimator/SistemRealEstimatorCard";
import { DeadlineChecklist } from "@/components/calendar/DeadlineChecklist";
import {
  getUpdatesByEntity,
  CATEGORY_LABELS as LEG_CATEGORY_LABELS,
  CATEGORY_COLORS as LEG_CATEGORY_COLORS,
} from "@/lib/legislative";
import type { FiscalRegime, TVAStatus, EntityType } from "@/types";
import type { FiscalDeadline } from "@/lib/fiscal/types";

export const dynamic = "force-dynamic";

const REGIME_LABELS: Record<FiscalRegime, string> = {
  norma_venit: "Norma de venit",
  sistem_real: "Sistem real",
  micro_1: "Micro 1%",
};

function formatLei(value: number): string {
  return new Intl.NumberFormat("ro-RO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function daysUntil(date: Date): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

function getUrgencyStyle(days: number): { badge: string; text: string; label: string } {
  if (days < 0) return { badge: "bg-secondary-100 text-secondary-500", text: "text-secondary-400", label: "Trecut" };
  if (days <= 7) return { badge: "bg-error-50 text-error-700", text: "text-error-600", label: `${days} zile` };
  if (days <= 30) return { badge: "bg-warning-50 text-warning-700", text: "text-warning-600", label: `${days} zile` };
  return { badge: "bg-secondary-100 text-secondary-600", text: "text-secondary-500", label: `${days} zile` };
}

const CATEGORY_LABELS: Record<string, { label: string; color: string }> = {
  declaratie: { label: "Declaratie", color: "bg-primary-50 text-primary-700" },
  plata: { label: "Plata", color: "bg-accent-50 text-accent-700" },
  tva: { label: "TVA", color: "bg-warning-50 text-warning-700" },
};

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/autentificare");

  const { data: profile } = await supabase
    .from("fiscal_profiles")
    .select("entity_type, regime, tva_status, caen_code, caen_description")
    .eq("id", user.id)
    .single();

  if (!profile) redirect("/onboarding");

  const regime = profile.regime as FiscalRegime;
  const tvaStatus: TVAStatus = profile.tva_status ? "platitor" : "neplatitor";
  const caenCode = profile.caen_code as string;
  const entityType = profile.entity_type as EntityType;

  // Compute tax estimate (PFA only - SRL needs revenue input)
  const isPFA = entityType === "pfa";
  const normaEntry = isPFA && regime === "norma_venit" ? getNormaDeVenitEntry(caenCode) : null;
  const incomeBase = normaEntry ? normaEntry.normaValue : 0;
  const taxBreakdown = isPFA && incomeBase > 0 ? calculateTotalTax(incomeBase, regime, 0, caenCode) : null;

  // Get all deadlines for the rest of the year - entity-type aware
  const now = new Date();
  const yearEnd = new Date(2026, 11, 31);
  const dateFilter = { regime, tvaStatus, fromDate: now, toDate: yearEnd };
  const allDeadlines = entityType === "srl"
    ? filterDeadlinesGeneric(getAllSRLDeadlines(), dateFilter)
    : filterDeadlines(dateFilter);

  const nextDeadline = allDeadlines[0] ?? null;

  return (
    <div className="pb-20 lg:pb-0">
      {/* Profile summary */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">
          Situatia ta fiscala
        </h1>
        <p className="mt-1 text-sm text-secondary-500">
          {entityType === "pfa" ? "PFA" : "SRL"} · {REGIME_LABELS[regime]}
          {caenCode && ` · CAEN ${caenCode}`}
          {profile.tva_status ? " · Platitor TVA" : ""}
        </p>
      </div>

      {/* Top row: Tax estimate + Next deadline */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Tax estimate / fiscal info card */}
        <div className="rounded-xl border border-secondary-200 bg-background p-6">
          {isPFA ? (
            <>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-medium text-secondary-500">
                  Estimare taxe anuale 2026
                </h2>
                <Link
                  href="/estimator"
                  className="text-xs font-medium text-primary-600 hover:text-primary-700"
                >
                  Calculeaza detaliat &rarr;
                </Link>
              </div>

              {taxBreakdown ? (
                <div>
                  <p className="text-3xl font-bold tabular-nums text-foreground">
                    {formatLei(taxBreakdown.totalTax)} lei
                  </p>
                  <p className="mt-1 text-sm text-secondary-400">
                    din venitul estimat de {formatLei(taxBreakdown.grossIncome)} lei
                    {normaEntry && " (norma de venit)"}
                  </p>

                  <div className="mt-5 grid grid-cols-3 gap-3">
                    <div className="rounded-lg bg-secondary-50 px-3 py-2.5">
                      <p className="text-xs text-secondary-500">CAS 25%</p>
                      <p className="mt-0.5 text-sm font-semibold tabular-nums text-foreground">
                        {formatLei(taxBreakdown.cas)} lei
                      </p>
                    </div>
                    <div className="rounded-lg bg-secondary-50 px-3 py-2.5">
                      <p className="text-xs text-secondary-500">CASS 10%</p>
                      <p className="mt-0.5 text-sm font-semibold tabular-nums text-foreground">
                        {formatLei(taxBreakdown.cass)} lei
                      </p>
                    </div>
                    <div className="rounded-lg bg-secondary-50 px-3 py-2.5">
                      <p className="text-xs text-secondary-500">Impozit 10%</p>
                      <p className="mt-0.5 text-sm font-semibold tabular-nums text-foreground">
                        {formatLei(taxBreakdown.incomeTax)} lei
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between rounded-lg border border-accent-200 bg-accent-50 px-4 py-3">
                    <span className="text-sm text-accent-700">Pune lunar deoparte</span>
                    <span className="text-sm font-bold tabular-nums text-accent-800">
                      {formatLei(taxBreakdown.monthlySetAside)} lei/luna
                    </span>
                  </div>
                </div>
              ) : regime === "sistem_real" ? (
                <SistemRealEstimatorCard caenCode={caenCode} />
              ) : (
                <div>
                  <p className="text-sm text-secondary-500">
                    Nu am gasit norma de venit pentru codul CAEN introdus.
                  </p>
                  <Link
                    href="/estimator"
                    className="mt-3 inline-flex items-center rounded-lg bg-secondary-900 px-4 py-2 text-sm font-medium text-white hover:bg-secondary-800"
                  >
                    Deschide estimatorul
                  </Link>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-medium text-secondary-500">
                  Regimul tau fiscal
                </h2>
                <Link
                  href="/srl/situatie-financiara"
                  className="text-xs font-medium text-primary-600 hover:text-primary-700"
                >
                  Situatie financiara &rarr;
                </Link>
              </div>

              <p className="text-3xl font-bold text-foreground">
                Micro 1%
              </p>
              <p className="mt-1 text-sm text-secondary-400">
                Impozit 1% pe cifra de afaceri, trimestrial via D100
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-secondary-50 px-3 py-2.5">
                  <p className="text-xs text-secondary-500">Declaratie</p>
                  <p className="mt-0.5 text-sm font-semibold text-foreground">
                    D100 trimestrial
                  </p>
                </div>
                <div className="rounded-lg bg-secondary-50 px-3 py-2.5">
                  <p className="text-xs text-secondary-500">Dividende</p>
                  <p className="mt-0.5 text-sm font-semibold text-foreground">
                    16% impozit + CASS
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Link
                  href="/srl/simulator-dividende"
                  className="rounded-lg border border-secondary-200 bg-white px-3 py-2.5 text-center text-sm font-medium text-secondary-700 transition-colors hover:border-primary-300 hover:text-primary-700"
                >
                  Simulator dividende
                </Link>
                <Link
                  href="/srl/cass-dividende"
                  className="rounded-lg border border-secondary-200 bg-white px-3 py-2.5 text-center text-sm font-medium text-secondary-700 transition-colors hover:border-primary-300 hover:text-primary-700"
                >
                  Calculator CASS
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Next deadline card */}
        <div className="rounded-xl border border-secondary-200 bg-background p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-medium text-secondary-500">
              Urmatorul termen fiscal
            </h2>
            <Link
              href="/calendar"
              className="text-xs font-medium text-primary-600 hover:text-primary-700"
            >
              Vezi calendarul &rarr;
            </Link>
          </div>

          {nextDeadline ? (
            <NextDeadlineContent deadline={nextDeadline} />
          ) : (
            <p className="text-sm text-secondary-500">
              Nu exista termene fiscale ramase in 2026.
            </p>
          )}
        </div>
      </div>

      {/* Full year deadlines checklist */}
      {allDeadlines.length > 0 && (
        <div className="mt-6">
          <DeadlineChecklist
            deadlines={allDeadlines.map((d) => ({
              id: d.id,
              name: d.name,
              date: d.date.toISOString(),
              category: d.category,
              description: d.description,
            }))}
          />
        </div>
      )}

      {/* Recent legislative changes */}
      <RecentLegislation entityType={entityType} />

      {/* Quick actions */}
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {isPFA ? (
          <>
            <QuickAction
              href="/estimator"
              title="Estimator taxe"
              description="Calculeaza CAS, CASS si impozit"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <rect x="4" y="2" width="16" height="20" rx="2" />
                  <line x1="8" y1="6" x2="16" y2="6" />
                  <line x1="8" y1="10" x2="16" y2="10" />
                  <line x1="8" y1="14" x2="12" y2="14" />
                </svg>
              }
            />
            <QuickAction
              href="/d212"
              title="Ghid D212"
              description="Completeaza Declaratia Unica"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              }
            />
          </>
        ) : (
          <>
            <QuickAction
              href="/srl/cash-flow"
              title="Cash flow"
              description="Planifica fluxul de numerar"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              }
            />
            <QuickAction
              href="/srl/decizie-asociat"
              title="Decizie asociat"
              description="Genereaza decizia de dividende"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              }
            />
          </>
        )}
        <QuickAction
          href="/alerte"
          title="Alerte email"
          description="Notificari inainte de termene"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          }
        />
      </div>
    </div>
  );
}

function NextDeadlineContent({ deadline }: { deadline: FiscalDeadline }) {
  const days = daysUntil(deadline.date);
  const urgency = getUrgencyStyle(days);
  const category = CATEGORY_LABELS[deadline.category];

  return (
    <div>
      <div className="flex items-start gap-3">
        <div className="flex flex-col items-center rounded-lg bg-secondary-50 px-3 py-2 text-center">
          <span className="text-2xl font-bold tabular-nums text-foreground">
            {deadline.date.getDate()}
          </span>
          <span className="text-xs font-medium uppercase text-secondary-500">
            {deadline.date.toLocaleDateString("ro-RO", { month: "short" })}
          </span>
        </div>
        <div className="flex-1">
          <p className="text-base font-semibold text-foreground leading-snug">
            {deadline.name}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-secondary-500">
            {deadline.description.length > 120
              ? deadline.description.slice(0, 120) + "..."
              : deadline.description}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${urgency.badge}`}>
          {days < 0 ? "Trecut" : days === 0 ? "Astazi" : `in ${days} zile`}
        </span>
        {category && (
          <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${category.color}`}>
            {category.label}
          </span>
        )}
      </div>
    </div>
  );
}

function RecentLegislation({ entityType }: { entityType: EntityType }) {
  const entity = entityType === "srl" ? "srl" : "pfa";
  const updates = getUpdatesByEntity(entity).slice(0, 3);

  if (updates.length === 0) return null;

  return (
    <div className="mt-6 rounded-xl border border-secondary-200 bg-background p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-medium text-secondary-500">
          Ce s-a schimbat recent
        </h2>
        <Link
          href="/legislatie"
          className="text-xs font-medium text-primary-600 hover:text-primary-700"
        >
          Vezi toate &rarr;
        </Link>
      </div>
      <div className="space-y-3">
        {updates.map((update) => (
          <Link
            key={update.slug}
            href={`/legislatie/${update.slug}`}
            className="group flex items-start gap-3 rounded-lg p-2 -mx-2 transition-colors hover:bg-secondary-50"
          >
            <span
              className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase ${
                LEG_CATEGORY_COLORS[update.category]
              }`}
            >
              {LEG_CATEGORY_LABELS[update.category]}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground group-hover:text-primary-700 transition-colors line-clamp-1">
                {update.title}
              </p>
              <p className="text-xs text-secondary-400">
                {new Date(update.publishedDate).toLocaleDateString("ro-RO", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function QuickAction({
  href,
  title,
  description,
  icon,
}: {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-xl border border-secondary-200 bg-background px-4 py-3.5 transition-all hover:border-primary-300 hover:shadow-sm"
    >
      <div className="rounded-lg bg-secondary-50 p-2 text-secondary-600 transition-colors group-hover:bg-primary-50 group-hover:text-primary-600">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="text-xs text-secondary-400">{description}</p>
      </div>
    </Link>
  );
}
