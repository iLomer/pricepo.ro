"use client";

import { useState, useMemo } from "react";
import { calculateMicroTax, calculateDividendNet, calculateCASSDividend, SRL_CONSTANTS_2026 } from "@/lib/fiscal/srl";

function formatLei(value: number): string {
  return new Intl.NumberFormat("ro-RO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function StatCard({ label, value, sublabel, color = "primary" }: {
  label: string;
  value: string;
  sublabel?: string;
  color?: "primary" | "accent" | "error" | "warning" | "success";
}) {
  const colorMap = {
    primary: "border-primary-200 bg-primary-50",
    accent: "border-accent-200 bg-accent-50",
    error: "border-error-200 bg-error-50",
    warning: "border-warning-200 bg-warning-50",
    success: "border-success-200 bg-success-50",
  };
  const textColorMap = {
    primary: "text-primary-700",
    accent: "text-accent-700",
    error: "text-error-700",
    warning: "text-warning-700",
    success: "text-success-700",
  };

  return (
    <div className={`rounded-xl border p-4 ${colorMap[color]}`}>
      <p className="text-xs font-medium uppercase tracking-wide text-secondary-500">{label}</p>
      <p className={`mt-1 text-2xl font-bold ${textColorMap[color]}`}>{value}</p>
      {sublabel && <p className="mt-0.5 text-xs text-secondary-400">{sublabel}</p>}
    </div>
  );
}

function FlowRow({ label, amount, type, highlight }: {
  label: string;
  amount: number;
  type: "income" | "tax" | "net";
  highlight?: boolean;
}) {
  const colorClass = type === "income"
    ? "text-primary-700"
    : type === "tax"
      ? "text-error-600"
      : "text-success-700";

  const prefix = type === "tax" ? "−" : type === "income" ? "" : "";

  return (
    <div className={`flex items-center justify-between py-3 ${highlight ? "border-t-2 border-secondary-300 pt-4" : "border-t border-secondary-100"}`}>
      <span className={`text-sm ${highlight ? "font-bold text-foreground" : "text-secondary-600"}`}>{label}</span>
      <span className={`text-sm font-semibold tabular-nums ${colorClass} ${highlight ? "text-lg" : ""}`}>
        {prefix} {formatLei(amount)} lei
      </span>
    </div>
  );
}

export function SRLOverview() {
  const [annualRevenue, setAnnualRevenue] = useState<string>("");
  const [annualExpenses, setAnnualExpenses] = useState<string>("");
  const [dividendPercent, setDividendPercent] = useState<number>(100);

  const revenue = parseFloat(annualRevenue) || 0;
  const expenses = parseFloat(annualExpenses) || 0;

  const calculations = useMemo(() => {
    if (revenue <= 0) return null;

    // 1. Micro tax on revenue
    const microTax = calculateMicroTax(revenue);

    // 2. Accounting profit (revenue - expenses - micro tax)
    const accountingProfit = Math.max(0, revenue - expenses - microTax.annualTax);

    // 3. Distributable dividends (based on user's chosen percentage)
    const grossDividend = Math.round(accountingProfit * (dividendPercent / 100) * 100) / 100;

    // 4. Dividend tax + CASS
    const dividendResult = calculateDividendNet(grossDividend, grossDividend);
    const cassResult = calculateCASSDividend(grossDividend);

    // 5. Total taxes
    const totalTaxes = microTax.annualTax + dividendResult.dividendTax + cassResult.cassAmount;

    // 6. Net in hand (what the associate actually receives)
    const netInHand = dividendResult.netDividend;

    // 7. Retained in company
    const retainedInCompany = accountingProfit - grossDividend;

    // 8. Effective total tax rate (all taxes / revenue)
    const effectiveTotalRate = revenue > 0 ? Math.round((totalTaxes / revenue) * 10000) / 100 : 0;

    // 9. Monthly net estimate
    const monthlyNet = Math.round(netInHand / 12 * 100) / 100;

    return {
      microTax,
      accountingProfit,
      grossDividend,
      dividendResult,
      cassResult,
      totalTaxes,
      netInHand,
      retainedInCompany,
      effectiveTotalRate,
      monthlyNet,
    };
  }, [revenue, expenses, dividendPercent]);

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="rounded-xl border border-secondary-200 bg-background p-5">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Date financiare</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-secondary-700">
              Venituri anuale (cifra de afaceri)
            </label>
            <div className="relative">
              <input
                type="number"
                value={annualRevenue}
                onChange={(e) => setAnnualRevenue(e.target.value)}
                placeholder="ex: 200000"
                className="w-full rounded-lg border border-secondary-300 bg-background px-3 py-2.5 pr-12 text-sm text-foreground placeholder:text-secondary-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-secondary-400">lei</span>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-secondary-700">
              Cheltuieli anuale (deductibile)
            </label>
            <div className="relative">
              <input
                type="number"
                value={annualExpenses}
                onChange={(e) => setAnnualExpenses(e.target.value)}
                placeholder="ex: 50000"
                className="w-full rounded-lg border border-secondary-300 bg-background px-3 py-2.5 pr-12 text-sm text-foreground placeholder:text-secondary-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-secondary-400">lei</span>
            </div>
          </div>
        </div>

        {/* Dividend percentage slider */}
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-secondary-700">
              Procent profit distribuit ca dividende
            </label>
            <span className="text-sm font-bold text-primary-700">{dividendPercent}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={dividendPercent}
            onChange={(e) => setDividendPercent(parseInt(e.target.value))}
            className="mt-2 w-full accent-primary-600"
          />
          <div className="flex justify-between text-xs text-secondary-400">
            <span>0% (reinvestit)</span>
            <span>100% (tot ca dividende)</span>
          </div>
        </div>
      </div>

      {calculations && (
        <>
          {/* Summary Cards */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Venituri anuale"
              value={`${formatLei(revenue)} lei`}
              sublabel="Regim micro 1%"
              color="primary"
            />
            <StatCard
              label="Total taxe"
              value={`${formatLei(calculations.totalTaxes)} lei`}
              sublabel={`Rata efectiva: ${calculations.effectiveTotalRate}%`}
              color="error"
            />
            <StatCard
              label="Net in mana"
              value={`${formatLei(calculations.netInHand)} lei`}
              sublabel={`~${formatLei(calculations.monthlyNet)} lei/luna`}
              color="success"
            />
            <StatCard
              label="Retinut in firma"
              value={`${formatLei(calculations.retainedInCompany)} lei`}
              sublabel={dividendPercent < 100 ? "Reinvestit in activitate" : "Nimic retinut"}
              color="accent"
            />
          </div>

          {/* Detailed Flow */}
          <div className="rounded-xl border border-secondary-200 bg-background p-5">
            <h2 className="mb-2 text-lg font-semibold text-foreground">Fluxul banilor</h2>
            <p className="mb-4 text-xs text-secondary-400">
              De la venituri la banii din buzunar - tot traseul fiscal
            </p>

            <FlowRow label="Venituri anuale (CA)" amount={revenue} type="income" />
            <FlowRow
              label="Impozit micro (1% din CA)"
              amount={calculations.microTax.annualTax}
              type="tax"
            />
            <FlowRow label="Cheltuieli deductibile" amount={expenses} type="tax" />
            <FlowRow
              label="Profit contabil net"
              amount={calculations.accountingProfit}
              type="income"
              highlight
            />

            {dividendPercent < 100 && (
              <FlowRow
                label={`Dividende brute (${dividendPercent}% din profit)`}
                amount={calculations.grossDividend}
                type="income"
              />
            )}

            <FlowRow
              label={`Impozit dividende (${SRL_CONSTANTS_2026.DIVIDEND_TAX_RATE * 100}%)`}
              amount={calculations.dividendResult.dividendTax}
              type="tax"
            />

            {calculations.cassResult.cassApplies ? (
              <FlowRow
                label={`CASS dividende (10% - depasit pragul de ${formatLei(calculations.cassResult.threshold6x)} lei)`}
                amount={calculations.cassResult.cassAmount}
                type="tax"
              />
            ) : (
              <div className="flex items-center justify-between border-t border-secondary-100 py-3">
                <span className="text-sm text-secondary-600">CASS dividende</span>
                <span className="text-sm text-success-600">
                  Nu se aplica (sub {formatLei(calculations.cassResult.threshold6x)} lei)
                </span>
              </div>
            )}

            <FlowRow
              label="NET IN MANA (dupa toate taxele)"
              amount={calculations.netInHand}
              type="net"
              highlight
            />
          </div>

          {/* CASS Warning */}
          {calculations.cassResult.warningMessage && (
            <div className={`rounded-xl border p-4 ${calculations.cassResult.cassApplies ? "border-error-200 bg-error-50" : "border-warning-200 bg-warning-50"}`}>
              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`h-5 w-5 mt-0.5 flex-shrink-0 ${calculations.cassResult.cassApplies ? "text-error-600" : "text-warning-600"}`}>
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <div>
                  <p className={`text-sm font-semibold ${calculations.cassResult.cassApplies ? "text-error-800" : "text-warning-800"}`}>
                    {calculations.cassResult.cassApplies ? "CASS activ" : "Atentie CASS"}
                  </p>
                  <p className={`mt-1 text-sm ${calculations.cassResult.cassApplies ? "text-error-700" : "text-warning-700"}`}>
                    {calculations.cassResult.warningMessage}
                  </p>
                </div>
              </div>

              {/* CASS threshold progress bar */}
              <div className="mt-3">
                <div className="flex justify-between text-xs text-secondary-500">
                  <span>0 lei</span>
                  <span>Prag: {formatLei(calculations.cassResult.threshold6x)} lei</span>
                </div>
                <div className="mt-1 h-2.5 w-full overflow-hidden rounded-full bg-secondary-200">
                  <div
                    className={`h-full rounded-full transition-all ${calculations.cassResult.cassApplies ? "bg-error-500" : "bg-warning-500"}`}
                    style={{ width: `${Math.min(calculations.cassResult.thresholdPercentage, 100)}%` }}
                  />
                </div>
                <p className="mt-1 text-xs text-secondary-400">
                  {calculations.cassResult.thresholdPercentage.toFixed(0)}% din prag utilizat
                </p>
              </div>
            </div>
          )}

          {/* Quarterly Breakdown */}
          <div className="rounded-xl border border-secondary-200 bg-background p-5">
            <h2 className="mb-4 text-lg font-semibold text-foreground">Defalcare trimestriala</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {["T1", "T2", "T3", "T4"].map((quarter, i) => {
                const quarterRevenue = Math.round(revenue / 4 * 100) / 100;
                const quarterTax = calculations.microTax.quarterlyTax;
                return (
                  <div key={quarter} className="rounded-lg border border-secondary-100 bg-secondary-50 p-3">
                    <p className="text-xs font-semibold uppercase text-secondary-500">{quarter} {2026}</p>
                    <p className="mt-1 text-sm text-secondary-600">
                      CA: <span className="font-medium text-foreground">{formatLei(quarterRevenue)} lei</span>
                    </p>
                    <p className="text-sm text-secondary-600">
                      Impozit: <span className="font-medium text-error-600">{formatLei(quarterTax)} lei</span>
                    </p>
                    <p className="mt-1 text-xs text-secondary-400">
                      D100 - termen: {["25 apr", "25 iul", "25 oct", "25 ian 2027"][i]}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Educational Note */}
          <div className="rounded-xl border border-secondary-100 bg-secondary-50 p-4">
            <h3 className="text-sm font-semibold text-secondary-700">Cum functioneaza?</h3>
            <ul className="mt-2 space-y-1.5 text-sm text-secondary-600">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-400" />
                <span><strong>Impozitul micro</strong> (1%) se calculeaza pe cifra de afaceri, nu pe profit. Se plateste trimestrial prin D100.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-400" />
                <span><strong>Dividendele</strong> se pot distribui doar din profitul net contabil. Impozitul de {SRL_CONSTANTS_2026.DIVIDEND_TAX_RATE * 100}% se retine la sursa de catre SRL.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-400" />
                <span><strong>CASS pe dividende</strong> (10%) se datoreaza doar daca dividendele anuale depasesc 6 salarii minime brute ({formatLei(SRL_CONSTANTS_2026.CASS_DIVIDEND_THRESHOLD_6X)} lei in 2026).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-400" />
                <span><strong>Baza CASS</strong> este in trepte (6x/12x/24x salarii minime). Plafonul maxim este de 24 salarii minime ({formatLei(SRL_CONSTANTS_2026.CASS_DIVIDEND_CAP_24X)} lei). CASS maxim: {formatLei(SRL_CONSTANTS_2026.CASS_DIVIDEND_CAP_24X * 0.10)} lei.</span>
              </li>
            </ul>
          </div>
        </>
      )}

      {/* Empty State */}
      {!calculations && (
        <div className="rounded-xl border border-dashed border-secondary-300 bg-secondary-50 p-8 text-center">
          <p className="text-sm text-secondary-500">
            Introdu veniturile anuale pentru a vedea situatia financiara completa.
          </p>
        </div>
      )}
    </div>
  );
}
