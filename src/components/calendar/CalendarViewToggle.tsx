"use client";

import { useState } from "react";
import type { FiscalRegime, TVAStatus, EntityType } from "@/types";
import type { TimelineEntry } from "@/lib/fiscal";
import { FiscalCalendar } from "./FiscalCalendar";
import { AnnualTimeline } from "./AnnualTimeline";

interface CalendarViewToggleProps {
  regime: FiscalRegime;
  tvaStatus: TVAStatus;
  entityType: EntityType;
  timelineEntries: TimelineEntry[];
}

export function CalendarViewToggle({
  regime,
  tvaStatus,
  entityType,
  timelineEntries,
}: CalendarViewToggleProps) {
  const [view, setView] = useState<"list" | "timeline">("timeline");

  return (
    <div className="space-y-4">
      {/* Toggle */}
      <div className="flex rounded-lg border border-secondary-200 bg-background p-1">
        <button
          onClick={() => setView("timeline")}
          className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
            view === "timeline"
              ? "bg-secondary-900 text-white"
              : "text-secondary-500 hover:text-secondary-900"
          }`}
        >
          Vezi anul intreg
        </button>
        <button
          onClick={() => setView("list")}
          className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
            view === "list"
              ? "bg-secondary-900 text-white"
              : "text-secondary-500 hover:text-secondary-900"
          }`}
        >
          Vezi pe luni
        </button>
      </div>

      {/* Content */}
      {view === "list" ? (
        <FiscalCalendar regime={regime} tvaStatus={tvaStatus} entityType={entityType} days={365} />
      ) : (
        <AnnualTimeline entries={timelineEntries} />
      )}
    </div>
  );
}
