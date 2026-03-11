"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ro">
      <body className="antialiased">
        <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
          <h1 className="text-6xl font-bold text-gray-900">500</h1>
          <p className="mt-4 text-xl text-gray-600">
            A aparut o eroare neasteptata.
          </p>
          <button
            onClick={() => reset()}
            className="mt-8 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            Incearca din nou
          </button>
          <p className="mt-12 text-sm text-gray-400">Fiskio</p>
        </div>
      </body>
    </html>
  );
}
