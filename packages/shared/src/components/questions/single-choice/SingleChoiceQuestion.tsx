import * as React from "react";
import { RadioButton } from "primereact/radiobutton";
import { Dropdown } from "primereact/dropdown";
import type { QuestionFormProps, SingleChoiceQuestion as SingleChoiceQuestionType } from "../../../types";

export function SingleChoiceQuestion({
  question,
  value,
  onChange,
  disabled,
}: QuestionFormProps<string>) {
  const q = question as SingleChoiceQuestionType;

  if (q.answerType === "dropdown") {
    const options = q.answers.map((answer) => ({
      label: answer.text,
      value: answer.id,
    }));

    return (
      <Dropdown
        value={value ?? ""}
        onChange={(e) => onChange(e.value)}
        options={options}
        disabled={disabled}
        placeholder="Select an option"
        className="w-full"
      />
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {q.answers.map((answer) => (
        <div key={answer.id} className="flex items-center gap-3">
          <RadioButton
            inputId={answer.id}
            name={question.id}
            value={answer.id}
            checked={value === answer.id}
            onChange={(e) => onChange(e.value)}
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
