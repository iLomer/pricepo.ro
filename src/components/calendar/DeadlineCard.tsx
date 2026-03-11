"use client";

import type { FiscalDeadline } from "@/lib/fiscal";

interface DeadlineCardProps {
  deadline: FiscalDeadline;
  today: Date;
}

function getDaysRemaining(deadlineDate: Date, today: Date): number {
  const diffMs = deadlineDate.getTime() - today.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

function getUrgencyStyles(daysRemaining: number): {
  border: string;
  badge: string;
  badgeText: string;
  dot: string;
} {
  if (daysRemaining < 7) {
    return {
      border: "border-error-200",
      badge: "bg-error-50 text-error-700",
      badgeText: "Urgent",
      dot: "bg-error-500",
    };
  }
  if (daysRemaining < 14) {
    return {
      border: "border-warning-200",
      badge: "bg-warning-50 text-warning-700",
      badgeText: "Aproape",
      dot: "bg-warning-500",
    };
  }
  return {
    border: "border-accent-200",
    badge: "bg-accent-50 text-accent-700",
    badgeText: "In termen",
    dot: "bg-accent-500",
  };
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const CATEGORY_LABELS: Record<FiscalDeadline["category"], string> = {
  declaratie: "Declaratie",
  plata: "Plata",
  tva: "TVA",
};

export function DeadlineCard({ deadline, today }: DeadlineCardProps) {
  const daysRemaining = getDaysRemaining(deadline.date, today);
  const urgency = getUrgencyStyles(daysRemaining);

  return (
    <div
      className={`rounded-xl border bg-background p-4 transition-shadow hover:shadow-sm ${urgency.border}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="mb-1 flex items-center gap-2">
            <span className={`inline-block h-2 w-2 rounded-full ${urgency.dot}`} />
            <span className="text-xs font-medium text-secondary-400">
              {CATEGORY_LABELS[deadline.category]}
            </span>
          </div>
          <h3 className="text-sm font-semibold text-foreground">
            {deadline.name}
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-secondary-500">
            {deadline.description}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <span
            className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${urgency.badge}`}
          >
            {urgency.badgeText}
          </span>
          <p className="mt-1.5 text-xs font-medium text-secondary-600">
            {formatDate(deadline.date)}
          </p>
          <p className="text-xs text-secondary-400">
            {daysRemaining === 0
              ? "Astazi"
              : daysRemaining === 1
                ? "Maine"
                : `${daysRemaining} zile ramase`}
          </p>
        </div>
      </div>
    </div>
  );
}
