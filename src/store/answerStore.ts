import { questions } from "./surveyStore";
import { generateId } from "./types";

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
