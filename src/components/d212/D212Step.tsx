"use client";

import { useState } from "react";

interface D212StepProps {
  stepNumber: number;
  fieldLabel: string;
  explanation: string;
  whyExplanation: string;
  value?: string | number | null;
  isAutoCalculated?: boolean;
  children?: React.ReactNode;
}

function formatValue(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return "-";
  if (typeof value === "number") {
    return new Intl.NumberFormat("ro-RO", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value) + " lei";
  }
  return String(value);
}

export function D212Step({
  stepNumber,
  fieldLabel,
  explanation,
  whyExplanation,
  value,
  isAutoCalculated = false,
  children,
}: D212StepProps) {
  const [showWhy, setShowWhy] = useState(false);

  return (
    <div className="rounded-xl border border-secondary-200 bg-background p-4 lg:p-5">
      {/* Step header */}
      <div className="mb-3 flex items-start gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">
          {stepNumber}
        </span>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-foreground">
            {fieldLabel}
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-secondary-500">
            {explanation}
          </p>
        </div>
      </div>

      {/* Auto-calculated value display */}
      {isAutoCalculated && value !== undefined && value !== null && (
        <div className="mb-3 ml-10 rounded-lg bg-accent-50 px-3 py-2">
          <p className="text-xs font-medium text-accent-600">Valoare calculata automat</p>
          <p className="mt-0.5 text-base font-bold tabular-nums text-accent-700">
            {formatValue(value)}
          </p>
        </div>
      )}

      {/* Custom children (input fields, etc.) */}
      {children && <div className="ml-10">{children}</div>}

      {/* "De ce?" expandable */}
      <div className="ml-10 mt-3">
        <button
          onClick={() => setShowWhy(!showWhy)}
          className="flex items-center gap-1.5 text-xs font-medium text-primary-600 hover:text-primary-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`h-3.5 w-3.5 transition-transform ${showWhy ? "rotate-90" : ""}`}
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
          De ce?
        </button>
        {showWhy && (
          <div className="mt-2 rounded-lg bg-primary-50 px-3 py-2.5">
            <p className="text-xs leading-relaxed text-primary-700">
              {whyExplanation}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
