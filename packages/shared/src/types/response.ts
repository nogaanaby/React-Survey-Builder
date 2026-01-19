import type { QuestionType } from "./base";

// Single answer value (for single-choice, text-input, rating, date)
export type SingleValue = string | number | null;

// Multiple answer value (for multiple-choice)
export type MultipleValue = string[];

// File answer value
export interface FileValue {
  name: string;
  size: number;
  type: string;
  url?: string;
}

// Response value union type
export type ResponseValue = SingleValue | MultipleValue | FileValue | FileValue[];

// Individual question response
export interface QuestionResponse {
  questionId: string;
  questionType: QuestionType;
  value: ResponseValue;
  answeredAt: string; // ISO timestamp
}

// Complete survey response
export interface SurveyResponse {
  id: string;
  surveyId: string;
  userId?: string;
  responses: QuestionResponse[];
  startedAt: string;
  completedAt?: string;
  status: "in-progress" | "completed" | "abandoned";
}

// Response validation result
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface ValidationError {
  questionId: string;
  message: string;
  code: "required" | "min" | "max" | "format" | "custom";
}
