"use client";

import { useState } from "react";
import Link from "next/link";
import type { LegislativeUpdate } from "@/lib/legislative/types";
import {
  CATEGORY_LABELS,
  CATEGORY_COLORS,
  ENTITY_LABELS,
} from "@/lib/legislative/types";

type Filter = "toate" | "pfa" | "srl";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function LegislativeFilterTabs({ updates }: { updates: LegislativeUpdate[] }) {
  const [filter, setFilter] = useState<Filter>("toate");

  const filtered =
    filter === "toate"
      ? updates
      : updates.filter(
          (u) =>
            u.affectedEntities.includes(filter) ||
            u.affectedEntities.includes("both")
        );

  return (
    <>
      {/* Filter tabs */}
      <div className="mb-6 flex gap-2">
        {(["toate", "pfa", "srl"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              filter === tab
                ? "bg-primary-600 text-white"
                : "bg-secondary-100 text-secondary-600 hover:bg-secondary-200"
            }`}
          >
            {tab === "toate" ? "Toate" : tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Update cards */}
      <div className="space-y-4">
        {filtered.map((update) => (
          <Link
            key={update.slug}
            href={`/legislatie/${update.slug}`}
            className="group block rounded-xl border border-secondary-200 bg-background p-5 transition-all hover:border-primary-300 hover:shadow-sm"
          >
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  CATEGORY_COLORS[update.category]
                }`}
              >
                {CATEGORY_LABELS[update.category]}
              </span>
              {update.affectedEntities.map((entity) => (
                <span
                  key={entity}
                  className="rounded-full bg-secondary-100 px-2 py-0.5 text-xs font-medium text-secondary-600"
                >
                  {ENTITY_LABELS[entity]}
                </span>
              ))}
              <span className="text-xs text-secondary-400">
                {formatDate(update.publishedDate)}
              </span>
            </div>

            <h2 className="mb-1.5 text-[15px] font-semibold text-foreground group-hover:text-primary-700 transition-colors">
              {update.title}
            </h2>
            <p className="text-sm leading-relaxed text-secondary-500 line-clamp-2">
              {update.summary}
            </p>

            <span className="mt-3 inline-block text-xs font-medium text-primary-600">
              Citeste mai mult &rarr;
            </span>
          </Link>
        ))}

        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-secondary-500">
            Nu exista modificari legislative pentru filtrul selectat.
          </p>
        )}
      </div>
    </>
  );
}
