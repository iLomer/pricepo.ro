import Link from "next/link";
import { notFound } from "next/navigation";
import { getTopicBySlug, CATEGORY_LABELS } from "@/lib/fiscal/biblioteca";

const CATEGORY_COLORS: Record<string, string> = {
  contributii: "bg-blue-100 text-blue-700",
  impozite: "bg-amber-100 text-amber-700",
  declaratii: "bg-emerald-100 text-emerald-700",
  regimuri: "bg-purple-100 text-purple-700",
  tva: "bg-rose-100 text-rose-700",
  srl: "bg-cyan-100 text-cyan-700",
};

interface TopicPageProps {
  params: Promise<{ slug: string }>;
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);

  if (!topic) {
    notFound();
  }

  return (
    <div className="pb-20 lg:pb-0">
      {/* Back link */}
      <Link
        href="/wiki-fiscal"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-secondary-500 hover:text-primary-600 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Inapoi la Wiki fiscal
      </Link>

      {/* Header */}
      <div className="mb-6">
        <div className="mb-2">
          <span
            className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
              CATEGORY_COLORS[topic.category] ?? "bg-gray-100 text-gray-700"
            }`}
          >
            {CATEGORY_LABELS[topic.category]}
          </span>
        </div>
        <h1 className="text-2xl font-bold text-foreground">{topic.title}</h1>
        <p className="mt-1 text-sm text-secondary-500">
          {topic.shortDescription}
        </p>
      </div>

      {/* Educational intro box */}
      <div className="mb-6 rounded-xl border border-primary-200 bg-primary-50 p-4">
        <p className="text-sm leading-relaxed text-primary-700">
          Valorile din acest articol sunt actualizate pentru anul fiscal 2026
          (salariul minim brut: 4,050 lei/luna). Verifica mereu termenele pe
          site-ul ANAF sau in calendarul fiscal Prevo.
        </p>
      </div>

      {/* Content sections */}
      <div className="rounded-xl border border-secondary-200 bg-background p-5 sm:p-6">
        {topic.content.map((section, i) => (
          <div
            key={i}
            className={
              i < topic.content.length - 1
                ? "mb-6 border-b border-secondary-100 pb-6"
                : ""
            }
          >
            <h2 className="text-lg font-semibold text-foreground mb-3">
              {section.heading}
            </h2>
            <p className="text-[15px] leading-relaxed text-secondary-600">
              {section.body}
            </p>
          </div>
        ))}
      </div>

      {/* Legislative sources as numbered footnotes */}
      {topic.sources && topic.sources.length > 0 && (
        <div className="mt-6 rounded-xl border border-secondary-200 bg-secondary-50 p-5">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-secondary-600">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
            Baza legala
          </h3>
          <ol className="space-y-2">
            {topic.sources.map((source, i) => (
              <li key={i} className="flex gap-2 text-sm">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary-200 text-xs font-medium text-secondary-600">
                  {i + 1}
                </span>
                <div>
                  <span className="font-medium text-foreground">{source.act}</span>
                  <span className="text-secondary-400"> — </span>
                  <span className="text-secondary-500">{source.relevance}</span>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-xs text-secondary-400 border-t border-secondary-200 pt-3">
            Actualizat pentru anul fiscal 2026. Textul integral este disponibil in Monitorul Oficial al Romaniei.
          </p>
        </div>
      )}

      {/* Bottom back link */}
      <div className="mt-6">
        <Link
          href="/wiki-fiscal"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Toate articolele
        </Link>
      </div>
    </div>
  );
}
