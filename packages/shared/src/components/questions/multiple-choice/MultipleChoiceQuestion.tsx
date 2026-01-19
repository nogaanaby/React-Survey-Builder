import * as React from "react";
import { Checkbox } from "primereact/checkbox";
import type { QuestionFormProps, MultipleChoiceQuestion as MultipleChoiceQuestionType } from "../../../types";

export function MultipleChoiceQuestion({
  question,
  value,
  onChange,
  disabled,
}: QuestionFormProps<string[]>) {
  const q = question as MultipleChoiceQuestionType;
  const selectedValues = value ?? [];

  const handleToggle = (answerId: string, checked: boolean) => {
    if (checked) {
      onChange([...selectedValues, answerId]);
    } else {
      onChange(selectedValues.filter((v) => v !== answerId));
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {q.answers.map((answer) => (
        <div key={answer.id} className="flex items-center gap-3">
          <Checkbox
            inputId={answer.id}
            checked={selectedValues.includes(answer.id)}
            onChange={(e) => handleToggle(answer.id, e.checked ?? false)}
            disabled={disabled}
          />
          <label htmlFor={answer.id} className="cursor-pointer">
            {answer.text}
          </label>
        </div>
      ))}
    </div>
  );
}
