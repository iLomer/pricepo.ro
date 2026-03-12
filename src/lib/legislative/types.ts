/**
 * Legislative monitor types.
 * Used for the /legislatie feed and dashboard widget.
 */

export type LegislativeCategory = "oug" | "lege" | "hg" | "ordin_anaf";
export type AffectedEntity = "pfa" | "srl" | "both";

export interface LegislativeUpdate {
  /** URL-safe slug */
  slug: string;
  /** Title of the legislative change (Romanian) */
  title: string;
  /** Plain-Romanian summary — what changed, in 2-3 sentences */
  summary: string;
  /** Impact analysis — how this affects the user concretely */
  impactDescription: string;
  /** When it was published in Monitorul Oficial */
  publishedDate: string;
  /** When it takes effect (may differ from published) */
  effectiveDate: string;
  /** Type of legislation */
  category: LegislativeCategory;
  /** Who is affected */
  affectedEntities: AffectedEntity[];
  /** Link to official source */
  officialUrl?: string;
  /** Related wiki fiscal topic slugs for cross-linking */
  relatedWikiSlugs: string[];
  /** Searchable tags */
  tags: string[];
}

export const CATEGORY_LABELS: Record<LegislativeCategory, string> = {
  oug: "OUG",
  lege: "Lege",
  hg: "HG",
  ordin_anaf: "Ordin ANAF",
};

export const CATEGORY_COLORS: Record<LegislativeCategory, string> = {
  oug: "bg-amber-100 text-amber-700",
  lege: "bg-blue-100 text-blue-700",
  hg: "bg-emerald-100 text-emerald-700",
  ordin_anaf: "bg-purple-100 text-purple-700",
};

export const ENTITY_LABELS: Record<AffectedEntity, string> = {
  pfa: "PFA",
  srl: "SRL",
  both: "PFA + SRL",
};
