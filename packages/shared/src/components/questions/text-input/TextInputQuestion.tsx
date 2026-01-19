import * as React from "react";
import type { QuestionFormProps, TextInputQuestion as TextInputQuestionType } from "../../../types";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";

export function TextInputQuestion({
  question,
  value,
  onChange,
  disabled,
}: QuestionFormProps<string>) {
  const q = question as TextInputQuestionType;

  if (q.config.multiline || q.answerType === "textarea") {
    return (
      <Textarea
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={q.config.placeholder}
        disabled={disabled}
        rows={q.config.rows ?? 3}
        maxLength={q.config.maxLength}
      />
    );
  }

  return (
    <Input
      type="text"
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={q.config.placeholder}
      disabled={disabled}
      maxLength={q.config.maxLength}
    />
  );
}
