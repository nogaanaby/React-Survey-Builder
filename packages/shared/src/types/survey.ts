import type { Question } from "./question";

// Language definition
export interface Language {
  code: string;
  name: string;
}

// Available languages
export const availableLanguages: Language[] = [
  { code: "en", name: "English" },
  { code: "he", name: "Hebrew" },
  { code: "ar", name: "Arabic" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "zh", name: "Chinese" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "hi", name: "Hindi" },
  { code: "tr", name: "Turkish" },
  { code: "nl", name: "Dutch" },
  { code: "pl", name: "Polish" },
  { code: "sv", name: "Swedish" },
  { code: "da", name: "Danish" },
  { code: "fi", name: "Finnish" },
  { code: "no", name: "Norwegian" },
];

// Survey metadata
export interface SurveyMetadata {
  title: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  startDate?: string;
  endDate?: string;
  languages: Language[];
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
    languages: [{ code: "en", name: "English" }],
  },
  settings: { ...defaultSurveySettings },
  questions: [],
});
