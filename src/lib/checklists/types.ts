import type { EntityType } from "@/types";

/** A step within a checklist template */
export interface ChecklistStep {
  /** Unique step ID within the checklist */
  id: string;
  /** Step label shown to the user */
  label: string;
  /** Short description explaining why this step matters */
  description: string;
  /** Optional slug linking to a wiki-fiscal topic */
  wikiSlug?: string;
}

/** A checklist template definition */
export interface ChecklistTemplate {
  /** Unique checklist ID */
  id: string;
  /** Checklist title */
  title: string;
  /** One-line description */
  description: string;
  /** Which entity type this checklist is for */
  entityType: EntityType;
  /** Ordered list of steps */
  steps: ChecklistStep[];
}

/** User's progress on a specific checklist */
export interface UserChecklistProgress {
  userId: string;
  checklistId: string;
  completedSteps: string[];
  dismissed: boolean;
  startedAt: string;
  lastUpdatedAt: string;
}
