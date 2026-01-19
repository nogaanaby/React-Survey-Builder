import * as React from "react";
import type { QuestionFormProps, SingleChoiceQuestion as SingleChoiceQuestionType } from "../../../types";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

export function SingleChoiceQuestion({
  question,
  value,
  onChange,
  disabled,
}: QuestionFormProps<string>) {
  const q = question as SingleChoiceQuestionType;

  if (q.answerType === "dropdown") {
    return (
      <Select
        value={value ?? ""}
        onValueChange={onChange}
        disabled={disabled}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          {q.answers.map((answer) => (
            <SelectItem key={answer.id} value={answer.id}>
              {answer.text}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  return (
    <RadioGroup
      value={value ?? ""}
      onValueChange={onChange}
      disabled={disabled}
      className="space-y-2"
    >
      {q.answers.map((answer) => (
        <div key={answer.id} className="flex items-center space-x-3">
          <RadioGroupItem value={answer.id} id={answer.id} />
          <Label htmlFor={answer.id} className="font-normal cursor-pointer">
            {answer.text}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
