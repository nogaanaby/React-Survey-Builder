import * as React from "react";
import { cn } from "../../utils";
import { useSurveyForm } from "./hooks/useSurveyForm";
import { SurveyHeader } from "./SurveyHeader";
import { SurveyProgress } from "./SurveyProgress";
import { SurveyFooter } from "./SurveyFooter";
import { QuestionRenderer } from "./QuestionRenderer";
import type { SurveyFormProps } from "./SurveyForm.types";

export function SurveyForm({
  survey,
  mode,
  initialValues,
  onSubmit,
  onValidationError,
  onChange,
  disabled,
  className,
}: SurveyFormProps) {
  const {
    values,
    errors,
    isSubmitting,
    progress,
    setValue,
    handleSubmit,
  } = useSurveyForm({
    survey,
    initialValues,
    onSubmit,
    onChange,
  });

  const handleFormSubmit = () => {
    if (Object.keys(errors).some((key) => errors[key])) {
      onValidationError?.(errors);
      return;
    }
    handleSubmit();
  };

  if (survey.questions.length === 0) {
    return (
      <div className={cn("p-8 text-center text-muted-foreground", className)}>
        <p>This survey has no questions.</p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      <SurveyHeader metadata={survey.metadata} />

      {survey.settings.showProgressBar && (
        <SurveyProgress progress={progress} />
      )}

      <div className="space-y-4">
        {survey.questions.map((question) => (
          <QuestionRenderer
            key={question.id}
            question={question}
            value={values[question.id]}
            onChange={(value) => setValue(question.id, value)}
            error={errors[question.id]}
            disabled={disabled || mode === "preview"}
          />
        ))}
      </div>

      <SurveyFooter
        mode={mode}
        submitText={survey.settings.submitButtonText}
        isSubmitting={isSubmitting}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
