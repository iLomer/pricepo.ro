"use client";

import { useState } from "react";
import type { TimelineEntry } from "@/lib/fiscal";

interface AnnualTimelineProps {
  entries: TimelineEntry[];
}

function formatLei(amount: number): string {
  return new Intl.NumberFormat("ro-RO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

const MONTH_SHORT = [
  "Ian", "Feb", "Mar", "Apr", "Mai", "Iun",
  "Iul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const CATEGORY_STYLES: Record<string, { label: string; color: string }> = {
  declaratie: { label: "Declaratie", color: "bg-primary-50 text-primary-700" },
  plata: { label: "Plata", color: "bg-accent-50 text-accent-700" },
  tva: { label: "TVA", color: "bg-warning-50 text-warning-700" },
};

export function AnnualTimeline({ entries }: AnnualTimelineProps) {
  const currentMonth = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const maxPayment = Math.max(...entries.map((e) => e.paymentAmount), 1);
  const totalTaxes = entries[entries.length - 1]?.cumulativeAmount ?? 0;

  const peakMonth = entries.reduce((max, e) =>
    e.paymentAmount > max.paymentAmount ? e : max
  , entries[0]);

  const selectedEntry = selectedMonth !== null ? entries[selectedMonth] : null;

  return (
    <div className="space-y-4">
      {/* Timeline bars */}
      <div className="rounded-xl border border-secondary-200 bg-background p-4 sm:p-6">
        <p className="mb-3 text-xs text-secondary-400">Apasa pe o luna pentru a vedea termenele</p>
        <div className="flex gap-1 sm:gap-2 overflow-x-auto pb-2 snap-x snap-mandatory">
          {entries.map((entry) => {
            const barHeight = entry.paymentAmount > 0
              ? Math.max(8, (entry.paymentAmount / maxPayment) * 100)
              : 0;
            const isCurrent = entry.month === currentMonth;
            const isPeak = entry === peakMonth && entry.paymentAmount > 0;
            const isSelected = entry.month === selectedMonth;
            const hasDeadlines = entry.deadlines.length > 0;

            return (
              <button
                key={entry.month}
                onClick={() => setSelectedMonth(isSelected ? null : entry.month)}
                className={`flex min-w-[48px] flex-1 snap-center flex-col items-center gap-1 rounded-lg px-1 py-2 transition-all ${
                  isSelected
                    ? "bg-secondary-900 ring-2 ring-secondary-900"
                    : isCurrent
                      ? "bg-primary-50 ring-1 ring-primary-200 hover:bg-primary-100"
                      : "hover:bg-secondary-50"
                }`}
              >
                {/* Bar area */}
                <div className="flex h-28 w-full flex-col items-center justify-end">
                  {entry.paymentAmount > 0 && (
                    <>
                      <p className={`mb-1 text-[10px] font-medium tabular-nums ${isSelected ? "text-white/70" : "text-secondary-500"}`}>
                        {formatLei(entry.paymentAmount)}
                      </p>
                      <div
                        className={`w-full max-w-[28px] rounded-t transition-all ${
                          isSelected
                            ? "bg-white/80"
                            : isPeak
                              ? "bg-warning-400"
                              : isCurrent
                                ? "bg-primary-400"
                                : "bg-accent-400"
                        }`}
                        style={{ height: `${barHeight}%` }}
                      />
                    </>
                  )}
                  {entry.paymentAmount === 0 && hasDeadlines && (
                    <div className="mb-1 flex gap-0.5">
                      {entry.deadlines.slice(0, 3).map((_, i) => (
                        <div key={i} className={`h-1.5 w-1.5 rounded-full ${isSelected ? "bg-white/60" : "bg-secondary-300"}`} />
                      ))}
                    </div>
                  )}
                </div>

                {/* Month label */}
                <p className={`text-xs font-medium ${
                  isSelected ? "text-white" : isCurrent ? "text-primary-700" : "text-secondary-500"
                }`}>
                  {MONTH_SHORT[entry.month]}
                </p>

                {/* Deadline count */}
                {hasDeadlines && (
                  <p className={`text-[10px] ${isSelected ? "text-white/60" : "text-secondary-400"}`}>
                    {entry.deadlines.length}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected month deadlines */}
      {selectedEntry && (
        <div className="rounded-xl border border-secondary-200 bg-background p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">
              {selectedEntry.monthName} 2026
            </h3>
            <span className="text-xs text-secondary-400">
              {selectedEntry.deadlines.length} {selectedEntry.deadlines.length === 1 ? "termen" : "termene"}
            </span>
          </div>

          {selectedEntry.deadlines.length === 0 ? (
            <p className="text-sm text-secondary-500">Niciun termen fiscal in aceasta luna.</p>
          ) : (
            <div className="space-y-3">
              {selectedEntry.deadlines.map((d) => {
                const cat = CATEGORY_STYLES[d.category];
                return (
                  <div key={d.id} className="flex items-start gap-3 rounded-lg border border-secondary-100 p-3">
                    <div className="flex flex-col items-center rounded-lg bg-secondary-50 px-2.5 py-1.5 text-center">
                      <span className="text-lg font-bold tabular-nums text-foreground">
                        {d.date.getDate()}
                      </span>
                      <span className="text-[10px] font-medium uppercase text-secondary-500">
                        {MONTH_SHORT[d.date.getMonth()]}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{d.name}</p>
                      <p className="mt-0.5 text-xs text-secondary-500 line-clamp-2">{d.description}</p>
                      {cat && (
                        <span className={`mt-1.5 inline-block rounded-md px-2 py-0.5 text-[10px] font-medium ${cat.color}`}>
                          {cat.label}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Summary row */}
      {!selectedEntry && (
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-secondary-200 bg-background p-4">
            <p className="text-xs font-medium text-secondary-500">Total taxe 2026</p>
            <p className="mt-1 text-2xl font-bold tabular-nums text-foreground">
              {formatLei(totalTaxes)} lei
            </p>
          </div>

          {peakMonth && peakMonth.paymentAmount > 0 && (
            <div className="rounded-xl border border-warning-200 bg-warning-50 p-4">
              <p className="text-xs font-medium text-warning-600">Luna cu cea mai mare plata</p>
              <p className="mt-1 text-2xl font-bold tabular-nums text-warning-700">
                {peakMonth.monthName} — {formatLei(peakMonth.paymentAmount)} lei
              </p>
              <p className="mt-1 text-xs text-warning-500">
                Pune deoparte {formatLei(Math.ceil(peakMonth.paymentAmount / (peakMonth.month || 1)))} lei/luna pana atunci
              </p>
            </div>
          )}
        </div>
      )}

      {/* Cumulative progress */}
      {!selectedEntry && totalTaxes > 0 && (
        <div className="rounded-xl border border-secondary-200 bg-background p-4">
          <p className="mb-3 text-xs font-medium text-secondary-500">Cumulat pe anul 2026</p>
          <div className="flex items-end gap-px">
            {entries.map((entry) => {
              const pct = totalTaxes > 0 ? (entry.cumulativeAmount / totalTaxes) * 100 : 0;
              const isCurrent = entry.month === currentMonth;
              return (
                <div key={entry.month} className="flex flex-1 flex-col items-center gap-1">
                  <div className="relative h-16 w-full">
                    <div
                      className={`absolute bottom-0 w-full rounded-t-sm transition-all ${
                        isCurrent ? "bg-primary-300" : "bg-secondary-200"
                      }`}
                      style={{ height: `${pct}%` }}
                    />
                  </div>
                  <p className="text-[9px] text-secondary-400">{MONTH_SHORT[entry.month]}</p>
                </div>
              );
            })}
          </div>
          <p className="mt-2 text-right text-xs text-secondary-400">
            {formatLei(totalTaxes)} lei total
          </p>
        </div>
      )}
    </div>
  );
}
