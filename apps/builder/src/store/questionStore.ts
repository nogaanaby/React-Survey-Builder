import { signal } from "@preact/signals-react";
import {
  generateId,
  type Question,
  type QuestionType,
  type AnswerType,
  questionRegistry,
  defaultQuestionConfigs,
} from "@survey/shared";
import { survey } from "./surveyStore";

// UI state
export const editingQuestionId = signal<string | null>(null);
export const isQuestionDialogOpen = signal<boolean>(false);

// Question actions
export const addQuestion = (
  type: QuestionType,
  text: string,
  answerType?: AnswerType
): void => {
  const config = questionRegistry.get(type);
  const defaultConfig = defaultQuestionConfigs[type] || {};

  const newQuestion: Question = {
    id: generateId(),
    type,
    text,
    description: "",
    required: false,
    answerType: answerType || config?.defaultAnswerType || "radio",
    answers: type === "single-choice" || type === "multiple-choice" ? [] : undefined,
    config: defaultConfig,
  } as Question;

  survey.value = {
    ...survey.value,
    questions: [...survey.value.questions, newQuestion],
    metadata: {
      ...survey.value.metadata,
      updatedAt: new Date().toISOString(),
    },
  };
};

export const updateQuestion = (
  questionId: string,
  updates: Partial<Question>
): void => {
  survey.value = {
    ...survey.value,
    questions: survey.value.questions.map((q) =>
      q.id === questionId ? { ...q, ...updates } : q
    ),
    metadata: {
      ...survey.value.metadata,
      updatedAt: new Date().toISOString(),
    },
  };
};

export const deleteQuestion = (questionId: string): void => {
  survey.value = {
    ...survey.value,
    questions: survey.value.questions.filter((q) => q.id !== questionId),
    metadata: {
      ...survey.value.metadata,
      updatedAt: new Date().toISOString(),
    },
  };
};

export const reorderQuestions = (activeId: string, overId: string): void => {
  const questions = [...survey.value.questions];
  const oldIndex = questions.findIndex((q) => q.id === activeId);
  const newIndex = questions.findIndex((q) => q.id === overId);

  if (oldIndex === -1 || newIndex === -1) return;

  const [removed] = questions.splice(oldIndex, 1);
  questions.splice(newIndex, 0, removed);

  survey.value = {
    ...survey.value,
    questions,
    metadata: {
      ...survey.value.metadata,
      updatedAt: new Date().toISOString(),
    },
  };
};

// Dialog actions
export const openAddQuestionDialog = (): void => {
  editingQuestionId.value = null;
  isQuestionDialogOpen.value = true;
};

export const openEditQuestionDialog = (questionId: string): void => {
  editingQuestionId.value = questionId;
  isQuestionDialogOpen.value = true;
};

export const closeQuestionDialog = (): void => {
  editingQuestionId.value = null;
  isQuestionDialogOpen.value = false;
};

// Get question by ID
export const getQuestionById = (questionId: string): Question | undefined => {
  return survey.value.questions.find((q) => q.id === questionId);
};
