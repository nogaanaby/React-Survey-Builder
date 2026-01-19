import type { Survey, SurveyResponse, ResponseValue } from "../../types";

export type SurveyFormMode = "preview" | "submit";

export interface SurveyFormProps {
  /** The survey to render */
  survey: Survey;
  /** Mode: preview (disabled submit) or submit (full functionality) */
  mode: SurveyFormMode;
  /** Initial values for editing/resuming */
  initialValues?: Record<string, ResponseValue>;
  /** Called when form is submitted */
  onSubmit?: (response: SurveyResponse) => void;
  /** Called on validation error */
  onValidationError?: (errors: Record<string, string>) => void;
  /** Called when a value changes */
  onChange?: (questionId: string, value: ResponseValue) => void;
  /** Disable all inputs */
  disabled?: boolean;
  /** Additional class names */
  className?: string;
}

export interface SurveyFormState {
  values: Record<string, ResponseValue>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  currentPage: number;
}
