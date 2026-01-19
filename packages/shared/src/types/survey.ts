import type { Question } from "./question";

// Survey metadata
export interface SurveyMetadata {
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
}

// Survey settings
export interface SurveySettings {
  allowAnonymous: boolean;
  showProgressBar: boolean;
  shuffleQuestions: boolean;
  oneQuestionPerPage: boolean;
  submitButtonText: string;
  thankYouMessage: string;
}

// Complete survey schema
export interface Survey {
  id: string;
  version: number;
  metadata: SurveyMetadata;
  settings: SurveySettings;
  questions: Question[];
}

// Survey data for storage/export
export interface SurveyData {
  survey: Survey;
  exportedAt: string;
}

// Default survey settings
export const defaultSurveySettings: SurveySettings = {
  allowAnonymous: true,
  showProgressBar: true,
  shuffleQuestions: false,
  oneQuestionPerPage: false,
  submitButtonText: "Submit",
  thankYouMessage: "Thank you for completing this survey!",
};

// Create empty survey
export const createEmptySurvey = (title: string = "Untitled Survey"): Survey => ({
  id: crypto.randomUUID(),
  version: 1,
  metadata: {
    title,
    description: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  settings: { ...defaultSurveySettings },
  questions: [],
});
