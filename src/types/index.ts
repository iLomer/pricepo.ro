/**
 * Shared TypeScript types for Fiskio.
 * Add domain-specific types in separate files as the project grows.
 */

export type EntityType = "pfa" | "srl";

export type FiscalRegime =
  | "norma_venit"
  | "sistem_real"
  | "micro_1"
  | "micro_3";

export type TVAStatus = "platitor" | "neplatitor";

export interface FiscalProfile {
  id: string;
  entity_type: EntityType;
  regime: FiscalRegime;
  tva_status: boolean;
  caen_code: string;
  caen_description: string | null;
  created_at: string;
  updated_at: string;
}
