import { CheckSquare } from "lucide-react";
import type { QuestionTypeConfig } from "../../../types";
import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion";
import { createMultipleChoiceResponseSchema } from "../../../validation";

export const multipleChoiceConfig: QuestionTypeConfig = {
  type: "multiple-choice",
  label: "Multiple Choice",
  description: "Select multiple options from a list",
  icon: CheckSquare,
  defaultAnswerType: "checkbox",
  supportedAnswerTypes: ["checkbox"],
  defaultConfig: {
    minSelections: undefined,
    maxSelections: undefined,
    allowOther: false,
    randomizeOrder: false,
  },
  formComponent: MultipleChoiceQuestion,
  validationSchema: createMultipleChoiceResponseSchema(),
};
