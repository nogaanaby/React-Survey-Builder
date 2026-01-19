// Types
export type { Answer, Question, NewQuestion, SurveyData } from "./types";
export { generateId } from "./types";

// Survey store - main state and persistence
export {
  questions,
  questionCount,
  exportSurveyData,
  importSurveyData,
  clearSurveyData,
  forceSave,
} from "./surveyStore";

// Question store - question actions and dialog state
export {
  editingQuestionId,
  isQuestionDialogOpen,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  reorderQuestions,
  openAddQuestionDialog,
  openEditQuestionDialog,
  closeQuestionDialog,
  getQuestionById,
} from "./questionStore";

// Answer store - answer actions
export {
  addAnswer,
  updateAnswer,
  deleteAnswer,
  reorderAnswers,
} from "./answerStore";
