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

/** Shared nav icons */
const icons = {
  dashboard: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
    </svg>
  ),
  calendar: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  calculator: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <rect x="4" y="2" width="16" height="20" rx="2" /><line x1="8" y1="6" x2="16" y2="6" /><line x1="8" y1="10" x2="16" y2="10" /><line x1="8" y1="14" x2="12" y2="14" /><line x1="8" y1="18" x2="10" y2="18" />
    </svg>
  ),
  document: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  bell: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  wallet: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" /><path d="M3 5v14a2 2 0 0 0 2 2h16v-5" /><path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
    </svg>
  ),
  money: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  shield: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  chart: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  ledger: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /><line x1="8" y1="7" x2="16" y2="7" /><line x1="8" y1="11" x2="13" y2="11" />
    </svg>
  ),
};

/** PFA users: PFA-specific tools */
const PFA_NAV_ITEMS: NavItem[] = [
  { label: "Panou", href: "/panou", icon: icons.dashboard },
  { label: "Calendar fiscal", href: "/calendar", icon: icons.calendar },
  { label: "Estimator taxe", href: "/estimator", icon: icons.calculator },
  { label: "Ghid D212", href: "/d212", icon: icons.document },
  { label: "Registru", href: "/registru", icon: icons.ledger },
  { label: "Alerte", href: "/alerte", icon: icons.bell },
];

/** SRL users: one clean list, no duplication */
const SRL_NAV_ITEMS: NavItem[] = [
  { label: "Situatie financiara", href: "/srl/situatie-financiara", icon: icons.wallet },
  { label: "Simulator dividende", href: "/srl/simulator-dividende", icon: icons.money },
  { label: "CASS dividende", href: "/srl/cass-dividende", icon: icons.shield },
  { label: "Cash flow", href: "/srl/cash-flow", icon: icons.chart },
  { label: "Decizie asociat", href: "/srl/decizie-asociat", icon: icons.document },
  { label: "Registru", href: "/registru", icon: icons.ledger },
  { label: "Alerte", href: "/alerte", icon: icons.bell },
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

  const navItems = entityType === "srl" ? SRL_NAV_ITEMS : PFA_NAV_ITEMS;

  function isActive(href: string): boolean {
    if (href === "/srl") {
      return pathname === "/srl";
    }
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
            {navItems.map((item) => (
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
                {navItems.map((item) => (
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

      {/* Mobile bottom nav -- show first 5 items for quick access */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-secondary-200 bg-background pb-safe lg:hidden">
        <div className="flex items-center justify-around px-2 py-1.5">
          {navItems.slice(0, 5).map((item) => (
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
