import * as React from "react";
import type { Question, ResponseValue } from "../../types";
import { questionRegistry } from "../../registry";
import { QuestionWrapper } from "./QuestionWrapper";

interface QuestionRendererProps {
  question: Question;
  value: ResponseValue;
  onChange: (value: ResponseValue) => void;
  error?: string;
  disabled?: boolean;
}

export function QuestionRenderer({
  question,
  value,
  onChange,
  error,
  disabled,
}: QuestionRendererProps) {
  const FormComponent = questionRegistry.getFormComponent(question.type);

  return (
    <QuestionWrapper question={question} error={error}>
      <FormComponent
        question={question}
        value={value}
        onChange={onChange}
        error={error}
        disabled={disabled}
      />
    </QuestionWrapper>
  );
}
