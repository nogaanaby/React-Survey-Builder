import * as React from "react";
import { Button } from "../ui/button";
import { cn } from "../../utils";
import type { SurveyFormMode } from "./SurveyForm.types";

interface SurveyFooterProps {
  mode: SurveyFormMode;
  submitText: string;
  isSubmitting: boolean;
  onSubmit: () => void;
  className?: string;
}

export function SurveyFooter({
  mode,
  submitText,
  isSubmitting,
  onSubmit,
  className,
}: SurveyFooterProps) {
  return (
    <div className={cn("flex justify-end pt-4", className)}>
      <Button
        type="button"
        onClick={onSubmit}
        disabled={mode === "preview" || isSubmitting}
        size="lg"
      >
        {isSubmitting ? "Submitting..." : submitText}
      </Button>
    </div>
  );
}
