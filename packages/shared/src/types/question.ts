import type { QuestionType, AnswerType } from "./base";

// Base answer interface
export interface Answer {
  id: string;
  text: string;
  imageUrl?: string;
}

// Base question interface
export interface BaseQuestion {
  id: string;
  type: QuestionType;
  text: string;
  description?: string;
  required: boolean;
  answerType: AnswerType;
}

// Single choice question
export interface SingleChoiceQuestion extends BaseQuestion {
  type: "single-choice";
  answerType: "radio" | "dropdown";
  answers: Answer[];
  config: {
    allowOther: boolean;
    randomizeOrder: boolean;
  };
}

// Multiple choice question
export interface MultipleChoiceQuestion extends BaseQuestion {
  type: "multiple-choice";
  answerType: "checkbox";
  answers: Answer[];
  config: {
    minSelections?: number;
    maxSelections?: number;
    allowOther: boolean;
    randomizeOrder: boolean;
  };
}

// Text input question
export interface TextInputQuestion extends BaseQuestion {
  type: "text-input";
  answerType: "text-field" | "textarea";
  config: {
    placeholder?: string;
    minLength?: number;
    maxLength?: number;
    multiline: boolean;
    rows?: number;
  };
}

// Rating scale question
export interface RatingScaleQuestion extends BaseQuestion {
  type: "rating-scale";
  answerType: "slider" | "radio";
  config: {
    min: number;
    max: number;
    step: number;
    minLabel?: string;
    maxLabel?: string;
    showLabels: boolean;
  };
}

// Date picker question
export interface DatePickerQuestion extends BaseQuestion {
  type: "date-picker";
  answerType: "text-field";
  config: {
    minDate?: string;
    maxDate?: string;
    includeTime: boolean;
  };
}

// File upload question
export interface FileUploadQuestion extends BaseQuestion {
  type: "file-upload";
  answerType: "text-field";
  config: {
    acceptedTypes: string[];
    maxSize: number; // in bytes
    maxFiles: number;
  };
}

// Union type for all questions
export type Question =
  | SingleChoiceQuestion
  | MultipleChoiceQuestion
  | TextInputQuestion
  | RatingScaleQuestion
  | DatePickerQuestion
  | FileUploadQuestion;

// Helper type to create a new question
export interface NewQuestion {
  type: QuestionType;
  text: string;
  answerType?: AnswerType;
}

// Default configs for each question type
export const defaultQuestionConfigs: Record<QuestionType, unknown> = {
  "single-choice": {
    allowOther: false,
    randomizeOrder: false,
  },
  "multiple-choice": {
    minSelections: undefined,
    maxSelections: undefined,
    allowOther: false,
    randomizeOrder: false,
  },
  "text-input": {
    placeholder: "",
    minLength: undefined,
    maxLength: undefined,
    multiline: false,
    rows: 3,
  },
  "rating-scale": {
    min: 1,
    max: 5,
    step: 1,
    minLabel: "Poor",
    maxLabel: "Excellent",
    showLabels: true,
  },
  "date-picker": {
    minDate: undefined,
    maxDate: undefined,
    includeTime: false,
  },
  "file-upload": {
    acceptedTypes: ["image/*", "application/pdf"],
    maxSize: 5 * 1024 * 1024, // 5MB
    maxFiles: 1,
  },
};
