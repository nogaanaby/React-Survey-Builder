import { Type } from "lucide-react";
import type { QuestionTypeConfig } from "../../../types";
import { TextInputQuestion } from "./TextInputQuestion";
import { createTextInputResponseSchema } from "../../../validation";

export const textInputConfig: QuestionTypeConfig = {
  type: "text-input",
  label: "Text Input",
  description: "Free text response",
  icon: Type,
  defaultAnswerType: "text-field",
  supportedAnswerTypes: ["text-field", "textarea"],
  defaultConfig: {
    placeholder: "",
    minLength: undefined,
    maxLength: undefined,
    multiline: false,
    rows: 3,
  },
  formComponent: TextInputQuestion,
  validationSchema: createTextInputResponseSchema(),
};
