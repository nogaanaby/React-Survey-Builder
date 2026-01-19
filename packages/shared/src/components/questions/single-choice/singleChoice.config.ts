import { CircleDot } from "lucide-react";
import type { QuestionTypeConfig } from "../../../types";
import { SingleChoiceQuestion } from "./SingleChoiceQuestion";
import { singleChoiceResponseSchema } from "../../../validation";

export const singleChoiceConfig: QuestionTypeConfig = {
  type: "single-choice",
  label: "Single Choice",
  description: "Select one option from a list",
  icon: CircleDot,
  defaultAnswerType: "radio",
  supportedAnswerTypes: ["radio", "dropdown"],
  defaultConfig: {
    allowOther: false,
    randomizeOrder: false,
  },
  formComponent: SingleChoiceQuestion,
  validationSchema: singleChoiceResponseSchema,
};
