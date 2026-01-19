import type { ComponentType } from "react";
import type { ZodSchema } from "zod";

// Question types enum
export type QuestionType =
  | "single-choice"
  | "multiple-choice"
  | "text-input"
  | "rating-scale"
  | "date-picker"
  | "file-upload";

// Answer types enum
export type AnswerType =
  | "radio"
  | "checkbox"
  | "dropdown"
  | "text-field"
  | "textarea"
  | "slider"
  | "image-choice";

// Base props for question form components
export interface QuestionFormProps<T = unknown> {
  question: Question;
  value: T;
  onChange: (value: T) => void;
  error?: string;
  disabled?: boolean;
}

// Base props for question builder components
export interface QuestionBuilderProps {
  question: Question;
  onUpdate: (updates: Partial<Question>) => void;
  onDelete: () => void;
}

// Base props for question settings components
export interface QuestionSettingsProps {
  question: Question;
  onUpdate: (updates: Partial<Question>) => void;
}

// Base props for answer form components
export interface AnswerFormProps<T = unknown> {
  answers: Answer[];
  value: T;
  onChange: (value: T) => void;
  disabled?: boolean;
}

// Base props for answer builder components
export interface AnswerBuilderProps {
  answer: Answer;
  questionId: string;
  onUpdate: (updates: Partial<Answer>) => void;
  onDelete: () => void;
}

// Question type configuration
export interface QuestionTypeConfig<TConfig = Record<string, unknown>> {
  type: QuestionType;
  label: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  defaultAnswerType: AnswerType;
  supportedAnswerTypes: AnswerType[];
  defaultConfig: TConfig;
  formComponent: ComponentType<QuestionFormProps>;
  validationSchema: ZodSchema;
}

// Answer type configuration
export interface AnswerTypeConfig<TConfig = Record<string, unknown>> {
  type: AnswerType;
  label: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  defaultConfig: TConfig;
  formComponent: ComponentType<AnswerFormProps>;
}

// Import Question and Answer types
import type { Question, Answer } from "./question";
