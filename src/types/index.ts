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

export interface Transaction {
  id: string;
  user_id: string;
  type: "incasare" | "plata";
  amount: number;
  description: string;
  category: string | null;
  document_number: string | null;
  transaction_date: string;
  created_at: string;
  updated_at: string;
}

export interface AlertPreference {
  id: string;
  user_id: string;
  email_alerts_enabled: boolean;
  alert_days_before: number[];
  created_at: string;
  updated_at: string;
}
