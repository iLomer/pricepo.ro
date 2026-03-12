"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const CATEGORY_LABELS: Record<string, { label: string; color: string }> = {
  declaratie: { label: "Declaratie", color: "bg-primary-50 text-primary-700" },
  plata: { label: "Plata", color: "bg-accent-50 text-accent-700" },
  tva: { label: "TVA", color: "bg-warning-50 text-warning-700" },
};

// Map deadline IDs to wiki-fiscal slugs
const DEADLINE_SLUG_MAP: Record<string, string> = {
  d212: "declaratia-unica-d212",
  d100: "d100",
  d112: "d112",
  d205: "d205",
  d300: "d300",
  d394: "d394",
  d390: "d390",
};

function getSlugForDeadline(deadlineId: string): string | null {
  const lower = deadlineId.toLowerCase();
  for (const [key, slug] of Object.entries(DEADLINE_SLUG_MAP)) {
    if (lower.includes(key)) return slug;
  }
  return null;
}

function daysUntil(date: Date): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

function getUrgencyStyle(days: number): { badge: string; label: string } {
  if (days < 0)
    return { badge: "bg-secondary-100 text-secondary-500", label: "Trecut" };
  if (days <= 7)
    return { badge: "bg-error-50 text-error-700", label: `${days}z` };
  if (days <= 30)
    return { badge: "bg-warning-50 text-warning-700", label: `${days}z` };
  return { badge: "bg-secondary-100 text-secondary-600", label: `${days}z` };
}

interface DeadlineChecklistProps {
  deadlines: Array<{
    id: string;
    name: string;
    date: string; // ISO string (serialized from server)
    category: string;
    description: string;
  }>;
}

export function DeadlineChecklist({ deadlines }: DeadlineChecklistProps) {
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/deadline-completions")
      .then((r) => r.json())
      .then((data: { completedIds?: string[] }) => {
        setCompletedIds(new Set(data.completedIds ?? []));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const toggle = useCallback(
    async (deadlineId: string) => {
      const isCompleted = completedIds.has(deadlineId);
      setTogglingId(deadlineId);

      // Optimistic update
      setCompletedIds((prev) => {
        const next = new Set(prev);
        if (isCompleted) next.delete(deadlineId);
        else next.add(deadlineId);
        return next;
      });

      try {
        await fetch("/api/deadline-completions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            deadlineId,
            completed: !isCompleted,
          }),
        });
      } catch {
        // Revert on error
        setCompletedIds((prev) => {
          const next = new Set(prev);
          if (isCompleted) next.add(deadlineId);
          else next.delete(deadlineId);
          return next;
        });
      } finally {
        setTogglingId(null);
      }
    },
    [completedIds]
  );

  const completedCount = deadlines.filter((d) =>
    completedIds.has(d.id)
  ).length;

  return (
    <div>
      {/* Progress summary */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-foreground">
          Toate termenele tale din 2026
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-secondary-400">
            {completedCount}/{deadlines.length} completate
          </span>
          {deadlines.length > 0 && (
            <div className="h-1.5 w-16 overflow-hidden rounded-full bg-secondary-200">
              <div
                className="h-full rounded-full bg-accent-500 transition-all duration-300"
                style={{
                  width: `${(completedCount / deadlines.length) * 100}%`,
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-secondary-200 bg-background">
        {deadlines.map((deadline, index) => {
          const date = new Date(deadline.date);
          const days = daysUntil(date);
          const urgency = getUrgencyStyle(days);
          const category = CATEGORY_LABELS[deadline.category];
          const isCompleted = completedIds.has(deadline.id);
          const isToggling = togglingId === deadline.id;
          const slug = getSlugForDeadline(deadline.id);

          return (
            <div
              key={deadline.id}
              className={`flex items-center gap-3 px-4 py-3 ${
                index < deadlines.length - 1
                  ? "border-b border-secondary-100"
                  : ""
              } ${isCompleted ? "opacity-60" : ""}`}
            >
              {/* Checkbox */}
              <button
                onClick={() => toggle(deadline.id)}
                disabled={loading || isToggling}
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
                  isCompleted
                    ? "border-accent-500 bg-accent-500 text-white"
                    : "border-secondary-300 bg-white hover:border-accent-400"
                } disabled:opacity-50`}
                aria-label={
                  isCompleted
                    ? `Marcheaza ${deadline.name} ca necompletat`
                    : `Marcheaza ${deadline.name} ca completat`
                }
              >
                {isCompleted && (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M3.5 8.5L6.5 11.5L12.5 4.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>

              {/* Date column */}
              <div className="w-12 shrink-0 text-center">
                <p
                  className={`text-sm font-bold tabular-nums ${isCompleted ? "text-secondary-400 line-through" : "text-foreground"}`}
                >
                  {date.getDate()}
                </p>
                <p className="text-xs text-secondary-400">
                  {date.toLocaleDateString("ro-RO", { month: "short" })}
                </p>
              </div>

              {/* Name + category */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p
                    className={`truncate text-sm font-medium ${isCompleted ? "text-secondary-400 line-through" : "text-foreground"}`}
                  >
                    {deadline.name}
                  </p>
                  {slug && (
                    <Link
                      href={`/wiki-fiscal/${slug}`}
                      className="shrink-0 text-xs text-primary-500 hover:text-primary-700"
                      title="Afla mai multe"
                    >
                      ?
                    </Link>
                  )}
                </div>
                {category && (
                  <span
                    className={`mt-0.5 inline-block rounded px-1.5 py-0.5 text-[10px] font-medium ${category.color}`}
                  >
                    {category.label}
                  </span>
                )}
              </div>

              {/* Status */}
              {isCompleted ? (
                <span className="shrink-0 rounded-md bg-accent-50 px-2 py-0.5 text-xs font-medium text-accent-700">
                  Depus
                </span>
              ) : (
                <span
                  className={`shrink-0 rounded-md px-2 py-0.5 text-xs font-medium tabular-nums ${urgency.badge}`}
                >
                  {days < 0
                    ? "Trecut"
                    : days === 0
                      ? "Astazi"
                      : urgency.label}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
