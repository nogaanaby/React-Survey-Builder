import * as React from "react";
import { cn } from "../../utils";
import { Label } from "../ui/label";
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
  return (
    <div
      className={cn(
        "space-y-3 p-4 rounded-lg border bg-card",
        error && "border-destructive",
        className
      )}
    >
      <div className="space-y-1">
        <Label className="text-base font-medium">
          {question.text}
          {question.required && (
            <span className="text-destructive ml-1">*</span>
          )}
        </Label>
        {question.description && (
          <p className="text-sm text-muted-foreground">
            {question.description}
          </p>
        )}
      </div>

      <div className="pt-1">{children}</div>

      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
