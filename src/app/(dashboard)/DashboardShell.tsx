"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SignOutButton } from "@/components/auth/SignOutButton";
import type { FiscalRegime, EntityType } from "@/types";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Panou",
    href: "/panou",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    label: "Calendar fiscal",
    href: "/calendar",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    label: "Estimator taxe",
    href: "/estimator",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <line x1="8" y1="6" x2="16" y2="6" />
        <line x1="8" y1="10" x2="16" y2="10" />
        <line x1="8" y1="14" x2="12" y2="14" />
        <line x1="8" y1="18" x2="10" y2="18" />
      </svg>
    ),
  },
  {
    label: "Ghid D212",
    href: "/d212",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    label: "Alerte",
    href: "/alerte",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
];

const REGIME_LABELS: Record<FiscalRegime, string> = {
  norma_venit: "Norma de venit",
  sistem_real: "Sistem real",
  micro_1: "Micro 1%",
  micro_3: "Micro 3%",
};

const ENTITY_LABELS: Record<EntityType, string> = {
  pfa: "PFA",
  srl: "SRL",
};

interface DashboardShellProps {
  entityType: EntityType;
  regime: FiscalRegime;
  children: React.ReactNode;
}

export function DashboardShell({ entityType, regime, children }: DashboardShellProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function isActive(href: string): boolean {
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Top header */}
      <header className="sticky top-0 z-30 border-b border-secondary-200 bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-1.5 text-secondary-600 hover:bg-secondary-100 lg:hidden"
              aria-label={mobileMenuOpen ? "Inchide meniul" : "Deschide meniul"}
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
            <Link href="/panou" className="text-lg font-bold text-primary-700">
              Fiskio
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-secondary-500 sm:inline">
              {ENTITY_LABELS[entityType]} &middot; {REGIME_LABELS[regime]}
            </span>
            <SignOutButton />
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl">
        {/* Desktop sidebar */}
        <aside className="hidden w-60 shrink-0 border-r border-secondary-200 bg-background lg:block">
          <nav className="sticky top-[57px] flex flex-col gap-1 px-3 py-4">
            {/* Profile badge */}
            <div className="mb-4 rounded-lg bg-primary-50 px-3 py-2.5">
              <p className="text-xs font-medium text-primary-600">
                {ENTITY_LABELS[entityType]}
              </p>
              <p className="text-sm font-semibold text-primary-800">
                {REGIME_LABELS[regime]}
              </p>
            </div>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-primary-50 text-primary-700"
                    : "text-secondary-600 hover:bg-secondary-100 hover:text-secondary-900"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Mobile sidebar overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div
              className="fixed inset-0 bg-secondary-900/50"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-background shadow-lg">
              <div className="flex items-center justify-between border-b border-secondary-200 px-4 py-3">
                <span className="text-lg font-bold text-primary-700">Fiskio</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg p-1.5 text-secondary-600 hover:bg-secondary-100"
                  aria-label="Inchide meniul"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              {/* Profile badge in mobile sidebar */}
              <div className="mx-3 mt-4 rounded-lg bg-primary-50 px-3 py-2.5">
                <p className="text-xs font-medium text-primary-600">
                  {ENTITY_LABELS[entityType]}
                </p>
                <p className="text-sm font-semibold text-primary-800">
                  {REGIME_LABELS[regime]}
                </p>
              </div>
              <nav className="flex flex-col gap-1 px-3 py-4">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? "bg-primary-50 text-primary-700"
                        : "text-secondary-600 hover:bg-secondary-100 hover:text-secondary-900"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                ))}
              </nav>
            </aside>
          </div>
        )}

        {/* Main content */}
        <main className="min-h-[calc(100vh-57px)] flex-1 p-4 lg:p-6">
          {children}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-secondary-200 bg-background pb-safe lg:hidden">
        <div className="flex items-center justify-around px-2 py-1.5">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 rounded-lg px-2 py-1.5 text-xs transition-colors ${
                isActive(item.href)
                  ? "text-primary-700"
                  : "text-secondary-400 hover:text-secondary-600"
              }`}
            >
              {item.icon}
              <span className="truncate">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
