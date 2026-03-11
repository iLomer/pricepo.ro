"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function SignOutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignOut() {
    setIsLoading(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <button
      onClick={handleSignOut}
      disabled={isLoading}
      className="rounded-lg border border-secondary-300 px-3 py-1.5 text-sm font-medium text-secondary-600 transition-colors hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isLoading ? "Se deconecteaza..." : "Deconectare"}
    </button>
  );
}
