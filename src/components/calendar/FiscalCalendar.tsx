"use client";

import type { FiscalRegime, TVAStatus } from "@/types";
import { getUpcomingDeadlines } from "@/lib/fiscal";
import { DeadlineCard } from "./DeadlineCard";

interface FiscalCalendarProps {
  regime: FiscalRegime;
  tvaStatus: TVAStatus;
}

export function FiscalCalendar({ regime, tvaStatus }: FiscalCalendarProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const deadlines = getUpcomingDeadlines(regime, tvaStatus, today, 30);

  if (deadlines.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-secondary-200 bg-background px-6 py-12 text-center">
        <div className="mb-4 rounded-full bg-accent-50 p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8 text-accent-500"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h3 className="text-base font-semibold text-foreground">
          Totul este in regula
        </h3>
        <p className="mt-1 max-w-sm text-sm text-secondary-500">
          Nu ai obligatii fiscale in urmatoarele 30 de zile. Poti sta linistit --
          te vom anunta cand se apropie un termen.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {deadlines.map((deadline) => (
        <DeadlineCard key={deadline.id} deadline={deadline} today={today} />
      ))}
    </div>
  );
}
