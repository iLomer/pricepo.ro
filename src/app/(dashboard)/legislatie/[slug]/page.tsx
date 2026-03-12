import Link from "next/link";
import { notFound } from "next/navigation";
import { getUpdateBySlug, CATEGORY_LABELS, CATEGORY_COLORS, ENTITY_LABELS } from "@/lib/legislative";
import { getTopicBySlug } from "@/lib/fiscal/biblioteca";

interface LegislativeDetailPageProps {
  params: Promise<{ slug: string }>;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function LegislativeDetailPage({ params }: LegislativeDetailPageProps) {
  const { slug } = await params;
  const update = getUpdateBySlug(slug);

  if (!update) {
    notFound();
  }

  const relatedTopics = update.relatedWikiSlugs
    .map((s) => getTopicBySlug(s))
    .filter(Boolean);

  return (
    <div className="pb-20 lg:pb-0">
      {/* Back link */}
      <Link
        href="/legislatie"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-secondary-500 hover:text-primary-600 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Inapoi la legislatie
      </Link>

      {/* Header */}
      <div className="mb-6">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${CATEGORY_COLORS[update.category]}`}>
            {CATEGORY_LABELS[update.category]}
          </span>
          {update.affectedEntities.map((entity) => (
            <span key={entity} className="rounded-full bg-secondary-100 px-2 py-0.5 text-xs font-medium text-secondary-600">
              {ENTITY_LABELS[entity]}
            </span>
          ))}
        </div>
        <h1 className="text-2xl font-bold text-foreground">{update.title}</h1>
        <p className="mt-1 text-xs text-secondary-400">
          Publicat: {formatDate(update.publishedDate)} · In vigoare din: {formatDate(update.effectiveDate)}
        </p>
      </div>

      {/* Summary */}
      <div className="rounded-xl border border-secondary-200 bg-background p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-foreground mb-3">Ce s-a schimbat</h2>
        <p className="text-[15px] leading-relaxed text-secondary-600">{update.summary}</p>
      </div>

      {/* Impact */}
      <div className="mt-4 rounded-xl border border-primary-200 bg-primary-50 p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-primary-800 mb-3">Impact asupra ta</h2>
        <p className="text-[15px] leading-relaxed text-primary-700">{update.impactDescription}</p>
      </div>

      {/* Official source */}
      {update.officialUrl && (
        <div className="mt-4">
          <a
            href={update.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-secondary-200 bg-background px-4 py-2.5 text-sm font-medium text-secondary-700 transition-colors hover:border-primary-300 hover:text-primary-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Sursa oficiala
          </a>
        </div>
      )}

      {/* Related wiki topics */}
      {relatedTopics.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-3 text-sm font-semibold text-secondary-600">
            Articole wiki relevante
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {relatedTopics.map((topic) => topic && (
              <Link
                key={topic.slug}
                href={`/wiki-fiscal/${topic.slug}`}
                className="group rounded-lg border border-secondary-200 bg-background p-4 transition-all hover:border-primary-300 hover:shadow-sm"
              >
                <p className="text-sm font-semibold text-foreground group-hover:text-primary-700 transition-colors">
                  {topic.title}
                </p>
                <p className="mt-0.5 text-xs text-secondary-500 line-clamp-1">
                  {topic.shortDescription}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Bottom back link */}
      <div className="mt-6">
        <Link
          href="/legislatie"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Toate modificarile legislative
        </Link>
      </div>
    </div>
  );
}
