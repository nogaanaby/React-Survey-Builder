import * as React from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import type { QuestionFormProps, TextInputQuestion as TextInputQuestionType } from "../../../types";

export function TextInputQuestion({
  question,
  value,
  onChange,
  disabled,
}: QuestionFormProps<string>) {
  const q = question as TextInputQuestionType;

  if (q.config.multiline || q.answerType === "textarea") {
    return (
      <InputTextarea
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={q.config.placeholder}
        disabled={disabled}
        rows={q.config.rows ?? 3}
        maxLength={q.config.maxLength}
        className="w-full"
      />
    );
  }

  return (
    <InputText
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={q.config.placeholder}
      disabled={disabled}
      maxLength={q.config.maxLength}
      className="w-full"
    />
  );
}
