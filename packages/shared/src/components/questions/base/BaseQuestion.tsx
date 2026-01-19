import * as React from "react";
import type { QuestionFormProps } from "../../../types";

export function BaseQuestion({ question }: QuestionFormProps) {
  return (
    <div className="p-4 border border-dashed rounded-md text-muted-foreground">
      <p>Base question component for: {question.type}</p>
      <p className="text-sm">Override this with a specific implementation</p>
    </div>
  );
}
