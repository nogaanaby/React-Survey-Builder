// Types
export interface Answer {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  type: "single" | "multiple";
  answers: Answer[];
}

export interface NewQuestion {
  text: string;
  type: "single" | "multiple";
}

export interface SurveyData {
  questions: Question[];
  version: number;
}

// Generate unique IDs
export const generateId = (): string => crypto.randomUUID();
