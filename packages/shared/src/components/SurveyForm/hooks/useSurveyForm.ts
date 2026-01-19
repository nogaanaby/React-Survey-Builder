import { useState, useCallback, useMemo } from "react";
import type { Survey, ResponseValue, SurveyResponse } from "../../../types";
import type { SurveyFormState } from "../SurveyForm.types";
import { generateId } from "../../../utils";

interface UseSurveyFormOptions {
  survey: Survey;
  initialValues?: Record<string, ResponseValue>;
  onSubmit?: (response: SurveyResponse) => void;
  onChange?: (questionId: string, value: ResponseValue) => void;
}

export function useSurveyForm({
  survey,
  initialValues = {},
  onSubmit,
  onChange,
}: UseSurveyFormOptions) {
  const [state, setState] = useState<SurveyFormState>({
    values: initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
    currentPage: 0,
  });

  const setValue = useCallback(
    (questionId: string, value: ResponseValue) => {
      setState((prev) => ({
        ...prev,
        values: { ...prev.values, [questionId]: value },
        touched: { ...prev.touched, [questionId]: true },
        errors: { ...prev.errors, [questionId]: "" }, // Clear error on change
      }));
      onChange?.(questionId, value);
    },
    [onChange]
  );

  const setError = useCallback((questionId: string, error: string) => {
    setState((prev) => ({
      ...prev,
      errors: { ...prev.errors, [questionId]: error },
    }));
  }, []);

  const validate = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    for (const question of survey.questions) {
      const value = state.values[question.id];

      // Required validation
      if (question.required) {
        const isEmpty =
          value === undefined ||
          value === null ||
          value === "" ||
          (Array.isArray(value) && value.length === 0);

        if (isEmpty) {
          newErrors[question.id] = "This question is required";
          isValid = false;
        }
      }

      // Type-specific validation can be added here
    }

    setState((prev) => ({ ...prev, errors: newErrors }));
    return isValid;
  }, [survey.questions, state.values]);

  const handleSubmit = useCallback(async () => {
    if (!validate()) {
      return;
    }

    setState((prev) => ({ ...prev, isSubmitting: true }));

    const response: SurveyResponse = {
      id: generateId(),
      surveyId: survey.id,
      responses: survey.questions.map((q) => ({
        questionId: q.id,
        questionType: q.type,
        value: state.values[q.id] ?? null,
        answeredAt: new Date().toISOString(),
      })),
      startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      status: "completed",
    };

    try {
      await onSubmit?.(response);
    } finally {
      setState((prev) => ({ ...prev, isSubmitting: false }));
    }
  }, [survey, state.values, validate, onSubmit]);

  const progress = useMemo(() => {
    const answered = survey.questions.filter(
      (q) =>
        state.values[q.id] !== undefined &&
        state.values[q.id] !== null &&
        state.values[q.id] !== "" &&
        !(Array.isArray(state.values[q.id]) && (state.values[q.id] as unknown[]).length === 0)
    ).length;
    return Math.round((answered / survey.questions.length) * 100) || 0;
  }, [survey.questions, state.values]);

  const nextPage = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentPage: Math.min(prev.currentPage + 1, survey.questions.length - 1),
    }));
  }, [survey.questions.length]);

  const prevPage = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentPage: Math.max(prev.currentPage - 1, 0),
    }));
  }, []);

  return {
    values: state.values,
    errors: state.errors,
    touched: state.touched,
    isSubmitting: state.isSubmitting,
    currentPage: state.currentPage,
    progress,
    setValue,
    setError,
    validate,
    handleSubmit,
    nextPage,
    prevPage,
  };
}
