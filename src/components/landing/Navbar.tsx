"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

const links = [
  { label: "Cum functioneaza", href: "#cum-functioneaza" },
  { label: "Functii", href: "#functii" },
  { label: "Preturi", href: "#preturi" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-secondary-200/60"
          : ""
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" aria-label="Prevo acasa">
          <Logo size="md" className="text-secondary-900" />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-secondary-400 transition-colors hover:text-secondary-900"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-5 md:flex">
          <Link
            href="/autentificare"
            className="rounded-lg bg-secondary-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-secondary-800"
          >
            Intra in cont
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="flex h-8 w-8 items-center justify-center text-secondary-500 hover:text-secondary-900 md:hidden"
          aria-label={open ? "Inchide meniul" : "Deschide meniul"}
        >
          {open ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 8h16M4 16h16" />
            </svg>
          )}
        </button>
      </nav>

      {open && (
        <div className="border-t border-secondary-200/60 bg-background/95 px-6 pb-6 pt-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm text-secondary-600 hover:text-secondary-900"
              >
                {l.label}
              </a>
            ))}
            <hr className="border-secondary-200" />
            <Link
              href="/autentificare"
              onClick={() => setOpen(false)}
              className="rounded-lg bg-secondary-900 px-4 py-2.5 text-center text-sm font-medium text-white"
            >
              Intra in cont
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
