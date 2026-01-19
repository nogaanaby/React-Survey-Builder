import { signal, computed, effect } from "@preact/signals-react";
import type { Question, SurveyData } from "./types";

// Storage key
const STORAGE_KEY = "survey-builder-data";
const CURRENT_VERSION = 1;

// Persistence functions
const loadFromStorage = (): Question[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const data: SurveyData = JSON.parse(stored);

    // Version check for future migrations
    if (data.version !== CURRENT_VERSION) {
      console.warn("Survey data version mismatch, using stored data as-is");
    }

    return data.questions || [];
  } catch (error) {
    console.error("Failed to load survey data from storage:", error);
    return [];
  }
};

const saveToStorage = (questionsData: Question[]): void => {
  try {
    const data: SurveyData = {
      questions: questionsData,
      version: CURRENT_VERSION,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Failed to save survey data to storage:", error);
  }
};

// Main survey state - initialize from storage
export const questions = signal<Question[]>(loadFromStorage());

// Auto-save effect - saves whenever questions change
effect(() => {
  saveToStorage(questions.value);
});

// Computed values
export const questionCount = computed(() => questions.value.length);

// Data management actions
export const exportSurveyData = (): string => {
  const data: SurveyData = {
    questions: questions.value,
    version: CURRENT_VERSION,
  };
  return JSON.stringify(data, null, 2);
};

export const importSurveyData = (jsonString: string): boolean => {
  try {
    const data: SurveyData = JSON.parse(jsonString);
    if (!Array.isArray(data.questions)) {
      throw new Error("Invalid survey data format");
    }
    questions.value = data.questions;
    return true;
  } catch (error) {
    console.error("Failed to import survey data:", error);
    return false;
  }
};

export const clearSurveyData = (): void => {
  questions.value = [];
};

// Force save (useful for manual saves)
export const forceSave = (): void => {
  saveToStorage(questions.value);
};
