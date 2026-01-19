import * as React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { ProgressBar } from "primereact/progressbar";
import { Message } from "primereact/message";
import { useSurveyForm } from "./hooks/useSurveyForm";
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
      <div className={className}>
        <Message
          severity="info"
          text="This survey has no questions."
          className="w-full justify-center"
        />
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{survey.metadata.title}</h1>
        {survey.metadata.description && (
          <p className="text-gray-500">{survey.metadata.description}</p>
        )}
      </div>

      {/* Progress */}
      {survey.settings.showProgressBar && (
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <ProgressBar value={progress} showValue={false} className="h-2" />
        </div>
      )}

      {/* Questions */}
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

      {/* Submit */}
      <div className="flex justify-end mt-6">
        <Button
          label={isSubmitting ? "Submitting..." : survey.settings.submitButtonText}
          icon={isSubmitting ? "pi pi-spin pi-spinner" : "pi pi-check"}
          onClick={handleFormSubmit}
          disabled={mode === "preview" || isSubmitting}
          severity="success"
          size="large"
        />
      </div>
    </div>
  );
}
