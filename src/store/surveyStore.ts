import { signal, computed } from "@preact/signals-react";

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

// Generate unique IDs
export const generateId = (): string => crypto.randomUUID();

// Main survey state
export const questions = signal<Question[]>([]);

// UI state
export const editingQuestionId = signal<string | null>(null);
export const isQuestionDialogOpen = signal<boolean>(false);

// Computed values
export const questionCount = computed(() => questions.value.length);

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

// Answer actions
export const addAnswer = (questionId: string, answerText: string): void => {
  questions.value = questions.value.map((q) =>
    q.id === questionId
      ? {
          ...q,
          answers: [...q.answers, { id: generateId(), text: answerText }],
        }
      : q
  );
};

export const updateAnswer = (
  questionId: string,
  answerId: string,
  newText: string
): void => {
  questions.value = questions.value.map((q) =>
    q.id === questionId
      ? {
          ...q,
          answers: q.answers.map((a) =>
            a.id === answerId ? { ...a, text: newText } : a
          ),
        }
      : q
  );
};

export const deleteAnswer = (questionId: string, answerId: string): void => {
  questions.value = questions.value.map((q) =>
    q.id === questionId
      ? {
          ...q,
          answers: q.answers.filter((a) => a.id !== answerId),
        }
      : q
  );
};

export const reorderAnswers = (
  questionId: string,
  activeId: string,
  overId: string
): void => {
  const question = questions.value.find((q) => q.id === questionId);
  if (!question) return;

  const oldIndex = question.answers.findIndex((a) => a.id === activeId);
  const newIndex = question.answers.findIndex((a) => a.id === overId);

  if (oldIndex === -1 || newIndex === -1) return;

  const newAnswers = [...question.answers];
  const [removed] = newAnswers.splice(oldIndex, 1);
  newAnswers.splice(newIndex, 0, removed);

  questions.value = questions.value.map((q) =>
    q.id === questionId ? { ...q, answers: newAnswers } : q
  );
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
