"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { ChecklistTemplate } from "@/lib/checklists";

interface ChecklistBannerProps {
  checklist: ChecklistTemplate;
}

export function ChecklistBanner({ checklist }: ChecklistBannerProps) {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [dismissed, setDismissed] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/checklists/progress?checklistId=${checklist.id}`)
      .then((res) => res.json())
      .then((data) => {
        setCompletedSteps(data.completedSteps ?? []);
        setDismissed(data.dismissed ?? false);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [checklist.id]);

  if (loading || dismissed) return null;

  const totalSteps = checklist.steps.length;
  const doneCount = completedSteps.length;
  const allDone = doneCount === totalSteps;
  const progressPct = totalSteps > 0 ? (doneCount / totalSteps) * 100 : 0;

  async function toggleStep(stepId: string) {
    const prev = completedSteps;
    const next = prev.includes(stepId)
      ? prev.filter((s) => s !== stepId)
      : [...prev, stepId];
    setCompletedSteps(next);

    try {
      await fetch("/api/checklists/progress", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checklistId: checklist.id, stepId }),
      });
    } catch {
      setCompletedSteps(prev);
    }
  }

  async function handleDismiss() {
    setDismissed(true);
    await fetch("/api/checklists/progress", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ checklistId: checklist.id, dismissed: true }),
    }).catch(() => setDismissed(false));
  }

  return (
    <div className="rounded-xl border border-primary-200 bg-primary-50/50">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between px-5 py-4"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-100">
            {allDone ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-accent-600">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-primary-600">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            )}
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-foreground">{checklist.title}</p>
            <p className="text-xs text-secondary-500">
              {allDone ? "Complet!" : `${doneCount}/${totalSteps} pasi completati`}
            </p>
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`h-4 w-4 text-secondary-400 transition-transform ${expanded ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Progress bar */}
      <div className="px-5">
        <div className="h-1.5 overflow-hidden rounded-full bg-primary-100">
          <div
            className={`h-full rounded-full transition-all ${allDone ? "bg-accent-500" : "bg-primary-500"}`}
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Steps */}
      {expanded && (
        <div className="px-5 pb-4 pt-3">
          {allDone ? (
            <div className="flex items-center justify-between rounded-lg bg-accent-50 p-3">
              <p className="text-sm font-medium text-accent-700">
                Ai terminat! Stii tot ce trebuie.
              </p>
              <button
                onClick={handleDismiss}
                className="text-xs font-medium text-secondary-500 hover:text-secondary-700"
              >
                Ascunde
              </button>
            </div>
          ) : (
            <div className="space-y-1">
              {checklist.steps.map((step) => {
                const done = completedSteps.includes(step.id);
                return (
                  <div
                    key={step.id}
                    className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-primary-100/50"
                  >
                    <button
                      onClick={() => toggleStep(step.id)}
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
                        done
                          ? "border-accent-500 bg-accent-500 text-white"
                          : "border-secondary-300 bg-white"
                      }`}
                    >
                      {done && (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${done ? "text-secondary-400 line-through" : "text-foreground"}`}>
                        {step.label}
                      </p>
                      <p className={`mt-0.5 text-xs ${done ? "text-secondary-300" : "text-secondary-500"}`}>
                        {step.description}
                      </p>
                      {step.wikiSlug && !done && (
                        <Link
                          href={`/wiki-fiscal/${step.wikiSlug}`}
                          className="mt-1 inline-flex text-xs font-medium text-primary-600 hover:text-primary-700"
                        >
                          Afla mai multe &rarr;
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
