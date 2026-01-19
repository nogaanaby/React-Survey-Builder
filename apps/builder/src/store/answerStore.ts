import { generateId, type Answer } from "@survey/shared";
import { survey } from "./surveyStore";

// Answer actions
export const addAnswer = (questionId: string, text: string): void => {
  const newAnswer: Answer = {
    id: generateId(),
    text,
  };

  survey.value = {
    ...survey.value,
    questions: survey.value.questions.map((q) => {
      if (q.id !== questionId) return q;
      if (!("answers" in q)) return q;
      return {
        ...q,
        answers: [...(q.answers || []), newAnswer],
      };
    }),
    metadata: {
      ...survey.value.metadata,
      updatedAt: new Date().toISOString(),
    },
  };
};

export const updateAnswer = (
  questionId: string,
  answerId: string,
  text: string
): void => {
  survey.value = {
    ...survey.value,
    questions: survey.value.questions.map((q) => {
      if (q.id !== questionId) return q;
      if (!("answers" in q)) return q;
      return {
        ...q,
        answers: (q.answers || []).map((a) =>
          a.id === answerId ? { ...a, text } : a
        ),
      };
    }),
    metadata: {
      ...survey.value.metadata,
      updatedAt: new Date().toISOString(),
    },
  };
};

export const deleteAnswer = (questionId: string, answerId: string): void => {
  survey.value = {
    ...survey.value,
    questions: survey.value.questions.map((q) => {
      if (q.id !== questionId) return q;
      if (!("answers" in q)) return q;
      return {
        ...q,
        answers: (q.answers || []).filter((a) => a.id !== answerId),
      };
    }),
    metadata: {
      ...survey.value.metadata,
      updatedAt: new Date().toISOString(),
    },
  };
};

export const reorderAnswers = (
  questionId: string,
  activeId: string,
  overId: string
): void => {
  const question = survey.value.questions.find((q) => q.id === questionId);
  if (!question || !("answers" in question)) return;

  const answers = [...(question.answers || [])];
  const oldIndex = answers.findIndex((a) => a.id === activeId);
  const newIndex = answers.findIndex((a) => a.id === overId);

  if (oldIndex === -1 || newIndex === -1) return;

  const [removed] = answers.splice(oldIndex, 1);
  answers.splice(newIndex, 0, removed);

  survey.value = {
    ...survey.value,
    questions: survey.value.questions.map((q) =>
      q.id === questionId ? { ...q, answers } : q
    ),
    metadata: {
      ...survey.value.metadata,
      updatedAt: new Date().toISOString(),
    },
  };
};
