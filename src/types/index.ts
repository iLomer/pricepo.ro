/**
 * Shared TypeScript types for Fiskio.
 * Add domain-specific types in separate files as the project grows.
 */

export type EntityType = "pfa" | "srl";

export type FiscalRegime =
  | "pfa-norma"
  | "pfa-real"
  | "srl-micro-1"
  | "srl-micro-3";

export type TVAStatus = "platitor" | "neplatitor";
