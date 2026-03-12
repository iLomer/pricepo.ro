import Link from "next/link";
import {
  getAllTopics,
  CATEGORY_LABELS,
  CATEGORY_ORDER,
} from "@/lib/fiscal/biblioteca";

const CATEGORY_COLORS: Record<string, string> = {
  contributii: "bg-blue-100 text-blue-700",
  impozite: "bg-amber-100 text-amber-700",
  declaratii: "bg-emerald-100 text-emerald-700",
  regimuri: "bg-purple-100 text-purple-700",
  tva: "bg-rose-100 text-rose-700",
  srl: "bg-cyan-100 text-cyan-700",
};

export default function WikiFiscalPage() {
  const topics = getAllTopics();

  // Group topics by category, in display order
  const grouped = CATEGORY_ORDER.map((cat) => ({
    key: cat,
    label: CATEGORY_LABELS[cat],
    topics: topics.filter((t) => t.category === cat),
  })).filter((g) => g.topics.length > 0);

  return (
    <div className="pb-20 lg:pb-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">
          Wiki fiscal
        </h1>
        <p className="mt-1 text-sm text-secondary-500">
          Termeni fiscali explicati pe intelesul tuturor - fara jargon, cu
          exemple practice si valori actualizate 2026.
        </p>
      </div>

      {/* Educational intro */}
      <div className="mb-8 rounded-xl border border-primary-200 bg-primary-50 p-4">
        <p className="text-sm leading-relaxed text-primary-700">
          Aici gasesti explicatii clare pentru cele mai importante concepte
          fiscale din Romania. Fiecare articol este scris in limbaj simplu, cu
          exemple concrete si valori actualizate pentru 2026.
        </p>
      </div>

      {grouped.map((group) => (
        <section key={group.key} className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            {group.label}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {group.topics.map((topic) => (
              <Link
                key={topic.slug}
                href={`/wiki-fiscal/${topic.slug}`}
                className="group rounded-xl border border-secondary-200 bg-background p-5 transition-all hover:border-primary-300 hover:shadow-sm"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      CATEGORY_COLORS[topic.category] ?? "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {CATEGORY_LABELS[topic.category]}
                  </span>
                </div>
                <h3 className="mb-1 text-[15px] font-semibold text-foreground group-hover:text-primary-700 transition-colors">
                  {topic.title}
                </h3>
                <p className="text-sm leading-relaxed text-secondary-500">
                  {topic.shortDescription}
                </p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
