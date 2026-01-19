import { signal } from "@preact/signals-react";
import { questions } from "./surveyStore";
import { generateId, type Question, type NewQuestion } from "./types";

// UI state for question dialog
export const editingQuestionId = signal<string | null>(null);
export const isQuestionDialogOpen = signal<boolean>(false);

// Question actions
export const addQuestion = (question: NewQuestion): void => {
  questions.value = [
    ...questions.value,
    {
      id: generateId(),
      text: question.text,
      type: question.type,
      answers: [],
    },
  ];
};

export const updateQuestion = (
  questionId: string,
  updates: Partial<Pick<Question, "text" | "type">>
): void => {
  questions.value = questions.value.map((q) =>
    q.id === questionId ? { ...q, ...updates } : q
  );
};

export const deleteQuestion = (questionId: string): void => {
  questions.value = questions.value.filter((q) => q.id !== questionId);
};

export const reorderQuestions = (activeId: string, overId: string): void => {
  const oldIndex = questions.value.findIndex((q) => q.id === activeId);
  const newIndex = questions.value.findIndex((q) => q.id === overId);

  if (oldIndex === -1 || newIndex === -1) return;

  const newQuestions = [...questions.value];
  const [removed] = newQuestions.splice(oldIndex, 1);
  newQuestions.splice(newIndex, 0, removed);

  questions.value = newQuestions;
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

// Get question by ID (helper)
export const getQuestionById = (questionId: string): Question | undefined => {
  return questions.value.find((q) => q.id === questionId);
};
