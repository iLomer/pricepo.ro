"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ERROR_MESSAGES: Record<string, string> = {
  "Invalid login credentials": "Email sau parola incorecta",
  "Email not confirmed": "Emailul nu a fost confirmat. Verifica-ti casuta de email.",
  "User already registered": "Acest email este deja inregistrat",
  "Password should be at least 6 characters":
    "Parola trebuie sa aiba cel putin 6 caractere",
  "Signup requires a valid password":
    "Te rugam sa introduci o parola valida",
  "Unable to validate email address: invalid format":
    "Formatul emailului nu este valid",
};

function translateError(message: string): string {
  return ERROR_MESSAGES[message] ?? "A aparut o eroare. Te rugam sa incerci din nou.";
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

function validateEmail(email: string): string | undefined {
  if (!email.trim()) return "Emailul este obligatoriu";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Formatul emailului nu este valid";
  return undefined;
}

function validatePassword(password: string): string | undefined {
  if (!password) return "Parola este obligatorie";
  if (password.length < 8) return "Parola trebuie sa aiba cel putin 8 caractere";
  return undefined;
}

interface AuthFormProps {
  mode: "sign-in" | "sign-up";
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isSignUp = mode === "sign-up";

  function validate(): boolean {
    const newErrors: FormErrors = {};

    const emailError = validateEmail(email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword(password);
    if (passwordError) newErrors.password = passwordError;

    if (isSignUp && password !== confirmPassword) {
      newErrors.confirmPassword = "Parolele nu coincid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(null);

    if (!validate()) return;

    setIsLoading(true);

    const supabase = createClient();

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setServerError(translateError(error.message));
        setIsLoading(false);
        return;
      }

      router.push("/panou");
      router.refresh();
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setServerError(translateError(error.message));
        setIsLoading(false);
        return;
      }

      router.push("/panou");
      router.refresh();
    }
  }

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-foreground">
          {isSignUp ? "Creeaza un cont" : "Autentificare"}
        </h1>
        <p className="mt-2 text-secondary-500">
          {isSignUp
            ? "Inregistreaza-te pentru a-ti personaliza experienta fiscala"
            : "Conecteaza-te la contul tau Fiskio"}
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {serverError && (
          <div
            role="alert"
            className="rounded-lg border border-error-200 bg-error-50 p-3 text-sm text-error-700"
          >
            {serverError}
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-foreground mb-1"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="exemplu@email.com"
            autoComplete="email"
            className="w-full rounded-lg border border-secondary-300 bg-background px-3 py-2 text-foreground placeholder:text-secondary-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-error-600">{errors.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-foreground mb-1"
          >
            Parola
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimum 8 caractere"
            autoComplete={isSignUp ? "new-password" : "current-password"}
            className="w-full rounded-lg border border-secondary-300 bg-background px-3 py-2 text-foreground placeholder:text-secondary-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-error-600">{errors.password}</p>
          )}
        </div>

        {isSignUp && (
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Confirma parola
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repeta parola"
              autoComplete="new-password"
              className="w-full rounded-lg border border-secondary-300 bg-background px-3 py-2 text-foreground placeholder:text-secondary-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-error-600">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading
            ? isSignUp
              ? "Se creeaza contul..."
              : "Se conecteaza..."
            : isSignUp
              ? "Creeaza cont"
              : "Conecteaza-te"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-secondary-500">
        {isSignUp ? (
          <>
            Ai deja un cont?{" "}
            <Link
              href="/autentificare"
              className="font-medium text-primary-600 hover:text-primary-700"
            >
              Conecteaza-te
            </Link>
          </>
        ) : (
          <>
            Nu ai un cont?{" "}
            <Link
              href="/inregistrare"
              className="font-medium text-primary-600 hover:text-primary-700"
            >
              Creeaza un cont
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
