import type { ComponentType } from "react";
import type { QuestionFormProps, AnswerFormProps } from "../types";

export const FallbackQuestion: ComponentType<QuestionFormProps> = ({ question }) => (
  <div className="p-4 border border-destructive rounded-md bg-destructive/10">
    <p className="text-destructive">
      Unknown question type: {question.type}
    </p>
  </div>
);

export const FallbackAnswer: ComponentType<AnswerFormProps> = () => (
  <div className="p-4 border border-destructive rounded-md bg-destructive/10">
    <p className="text-destructive">Unknown answer type</p>
  </div>
);
