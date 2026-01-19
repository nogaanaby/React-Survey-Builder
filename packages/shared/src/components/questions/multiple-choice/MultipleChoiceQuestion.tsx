import * as React from "react";
import type { QuestionFormProps, MultipleChoiceQuestion as MultipleChoiceQuestionType } from "../../../types";
import { Checkbox } from "../../ui/checkbox";
import { Label } from "../../ui/label";

export function MultipleChoiceQuestion({
  question,
  value,
  onChange,
  disabled,
}: QuestionFormProps<string[]>) {
  const q = question as MultipleChoiceQuestionType;
  const selectedValues = value ?? [];

  const handleToggle = (answerId: string) => {
    if (selectedValues.includes(answerId)) {
      onChange(selectedValues.filter((v) => v !== answerId));
    } else {
      onChange([...selectedValues, answerId]);
    }
  };

  return (
    <div className="space-y-2">
      {q.answers.map((answer) => (
        <div key={answer.id} className="flex items-center space-x-3">
          <Checkbox
            id={answer.id}
            checked={selectedValues.includes(answer.id)}
            onCheckedChange={() => handleToggle(answer.id)}
            disabled={disabled}
          />
          <Label htmlFor={answer.id} className="font-normal cursor-pointer">
            {answer.text}
          </Label>
        </div>
      ))}
    </div>
  );
}
