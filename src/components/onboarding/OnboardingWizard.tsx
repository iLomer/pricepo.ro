"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { EntityType, FiscalRegime } from "@/types";
import { ProgressIndicator } from "./ProgressIndicator";
import { StepEntityType } from "./StepEntityType";
import { StepRegime } from "./StepRegime";
import { StepTVA } from "./StepTVA";
import { StepCAEN } from "./StepCAEN";

const TOTAL_STEPS = 4;

export function OnboardingWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [entityType, setEntityType] = useState<EntityType | null>(null);
  const [regime, setRegime] = useState<FiscalRegime | null>(null);
  const [tvaStatus, setTvaStatus] = useState<boolean | null>(null);
  const [caenCode, setCaenCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function canProceed(): boolean {
    switch (currentStep) {
      case 1:
        return entityType !== null;
      case 2:
        return regime !== null;
      case 3:
        return tvaStatus !== null;
      case 4:
        return caenCode.trim().length > 0;
      default:
        return false;
    }
  }

  function handleEntityTypeChange(value: EntityType) {
    setEntityType(value);
    // Reset regime when entity type changes since options differ
    setRegime(null);
  }

  function handleNext() {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  }

  function handleBack() {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }

  async function handleSubmit() {
    if (!entityType || !regime || tvaStatus === null || !caenCode.trim()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Nu esti autentificat. Te rugam sa te conectezi din nou.");
      setIsSubmitting(false);
      return;
    }

    const { error: insertError } = await supabase
      .from("fiscal_profiles")
      .insert({
        id: user.id,
        entity_type: entityType,
        regime,
        tva_status: tvaStatus,
        caen_code: caenCode.trim(),
      });

    if (insertError) {
      setError("A aparut o eroare la salvarea profilului. Te rugam sa incerci din nou.");
      setIsSubmitting(false);
      return;
    }

    router.push("/panou");
    router.refresh();
  }

  return (
    <div className="w-full max-w-lg mx-auto px-4">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-foreground">
          Configureaza profilul fiscal
        </h1>
        <p className="mt-1 text-secondary-500">
          Personalizeaza Fiskio in functie de situatia ta fiscala
        </p>
      </div>

      <ProgressIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />

      {error && (
        <div
          role="alert"
          className="mb-4 rounded-lg border border-error-200 bg-error-50 p-3 text-sm text-error-700"
        >
          {error}
        </div>
      )}

      <div className="min-h-[280px]">
        {currentStep === 1 && (
          <StepEntityType value={entityType} onChange={handleEntityTypeChange} />
        )}
        {currentStep === 2 && entityType && (
          <StepRegime
            entityType={entityType}
            value={regime}
            onChange={setRegime}
          />
        )}
        {currentStep === 3 && <StepTVA value={tvaStatus} onChange={setTvaStatus} />}
        {currentStep === 4 && (
          <StepCAEN value={caenCode} onChange={setCaenCode} />
        )}
      </div>

      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={handleBack}
          disabled={currentStep === 1}
          className="rounded-lg border border-secondary-300 px-4 py-2 text-sm font-medium text-secondary-600 transition-colors hover:bg-secondary-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Inapoi
        </button>

        {currentStep < TOTAL_STEPS ? (
          <button
            type="button"
            onClick={handleNext}
            disabled={!canProceed()}
            className="rounded-lg bg-primary-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Continua
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canProceed() || isSubmitting}
            className="rounded-lg bg-primary-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Se salveaza..." : "Finalizeaza"}
          </button>
        )}
      </div>
    </div>
  );
}
