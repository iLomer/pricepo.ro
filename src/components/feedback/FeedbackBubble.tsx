"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { usePathname } from "next/navigation";

type Status = "idle" | "loading" | "success" | "error";

export function FeedbackBubble() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Reset form when reopening
  useEffect(() => {
    if (open && status === "success") {
      setStatus("idle");
      setMessage("");
      setEmail("");
    }
  }, [open, status]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!message.trim()) {
      setStatus("error");
      setErrorMsg("Scrie un mesaj inainte de a trimite.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: message.trim(),
          email: email.trim() || undefined,
          page: pathname,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setMessage("");
        setEmail("");
      } else {
        setStatus("error");
        setErrorMsg("A aparut o eroare. Incearca din nou.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Eroare de retea. Incearca din nou.");
    }
  }

  return (
    <div ref={panelRef} className="fixed bottom-5 right-5 z-50">
      {/* Panel */}
      {open && (
        <div className="absolute bottom-14 right-0 w-80 animate-fade-up rounded-xl border border-secondary-200 bg-white p-5 shadow-xl">
          {status === "success" ? (
            <div className="py-4 text-center">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-accent-50">
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="text-accent-600">
                  <path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-sm font-medium text-secondary-900">
                Multumim pentru feedback!
              </p>
              <p className="mt-1 text-xs text-secondary-500">
                Fiecare mesaj ne ajuta sa facem Prevo mai bun.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <p className="text-sm font-semibold text-secondary-900">
                Trimite-ne feedback
              </p>
              <p className="mt-1 text-xs text-secondary-400">
                Bug, sugestie sau intrebare - orice ne ajuta.
              </p>

              <textarea
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                placeholder="Ce ai vrea sa ne spui?"
                rows={3}
                maxLength={2000}
                disabled={status === "loading"}
                className="mt-3 w-full resize-none rounded-lg border border-secondary-200 bg-secondary-50 px-3 py-2 text-sm text-secondary-900 placeholder:text-secondary-400 focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:opacity-50"
              />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email (optional, pentru raspuns)"
                disabled={status === "loading"}
                className="mt-2 w-full rounded-lg border border-secondary-200 bg-secondary-50 px-3 py-2 text-sm text-secondary-900 placeholder:text-secondary-400 focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:opacity-50"
              />

              {status === "error" && errorMsg && (
                <p className="mt-2 text-xs text-error-600">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-3 w-full rounded-lg bg-secondary-900 py-2 text-sm font-medium text-white transition-colors hover:bg-secondary-800 disabled:opacity-50"
              >
                {status === "loading" ? "Se trimite..." : "Trimite"}
              </button>
            </form>
          )}
        </div>
      )}

      {/* Bubble button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Trimite feedback"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary-900 text-white shadow-lg transition-all hover:bg-secondary-800 hover:shadow-xl active:scale-95"
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        )}
      </button>
    </div>
  );
}
