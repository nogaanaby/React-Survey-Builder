import * as React from "react";
import { Card } from "primereact/card";
import { Message } from "primereact/message";
import type { Question } from "../../types";

interface QuestionWrapperProps {
  question: Question;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

export function QuestionWrapper({
  question,
  error,
  children,
  className,
}: QuestionWrapperProps) {
  const title = (
    <span>
      {question.text}
      {question.required && (
        <span className="text-red-500 ml-1">*</span>
      )}
    </span>
  );

  return (
    <Card title={title} subTitle={question.description} className={className}>
      <div className="pt-2">{children}</div>
      {error && (
        <Message severity="error" text={error} className="mt-2 w-full" />
      )}
    </Card>
  );
}
