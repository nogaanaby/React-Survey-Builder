import { signal, computed, effect } from "@preact/signals-react";
import { createEmptySurvey, type Survey, generateId } from "@survey/shared";

// Storage key
const STORAGE_KEY = "survey-builder-data";

// Persistence functions
const loadFromStorage = (): Survey => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return createEmptySurvey("My Survey");

    const data = JSON.parse(stored);
    return data.survey || createEmptySurvey("My Survey");
  } catch (error) {
    console.error("Failed to load survey data from storage:", error);
    return createEmptySurvey("My Survey");
  }
};

const saveToStorage = (survey: Survey): void => {
  try {
    const data = {
      survey,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Failed to save survey data to storage:", error);
  }
};

// Main survey state
export const survey = signal<Survey>(loadFromStorage());

// Auto-save effect
effect(() => {
  saveToStorage(survey.value);
});

// Computed values
export const questionCount = computed(() => survey.value.questions.length);

// Survey metadata actions
export const updateSurveyMetadata = (
  updates: Partial<Survey["metadata"]>
): void => {
  survey.value = {
    ...survey.value,
    metadata: {
      ...survey.value.metadata,
      ...updates,
      updatedAt: new Date().toISOString(),
    },
  };
};

export const updateSurveySettings = (
  updates: Partial<Survey["settings"]>
): void => {
  survey.value = {
    ...survey.value,
    settings: { ...survey.value.settings, ...updates },
    metadata: {
      ...survey.value.metadata,
      updatedAt: new Date().toISOString(),
    },
  };
};

// Data management
export const exportSurveyData = (): string => {
  return JSON.stringify(survey.value, null, 2);
};

export const importSurveyData = (jsonString: string): boolean => {
  try {
    const data = JSON.parse(jsonString);
    if (!data.id || !Array.isArray(data.questions)) {
      throw new Error("Invalid survey data format");
    }
    survey.value = data;
    return true;
  } catch (error) {
    console.error("Failed to import survey data:", error);
    return false;
  }
};

export const clearSurveyData = (): void => {
  survey.value = createEmptySurvey("My Survey");
};

export const createNewSurvey = (title: string = "Untitled Survey"): void => {
  survey.value = createEmptySurvey(title);
};
