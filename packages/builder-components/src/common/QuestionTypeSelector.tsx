import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  questionRegistry,
  type QuestionType,
} from "@survey/shared";

interface QuestionTypeSelectorProps {
  value: QuestionType;
  onChange: (value: QuestionType) => void;
  disabled?: boolean;
}

export function QuestionTypeSelector({
  value,
  onChange,
  disabled,
}: QuestionTypeSelectorProps) {
  const questionTypes = questionRegistry.getAll();

  return (
    <Select
      value={value}
      onValueChange={(v) => onChange(v as QuestionType)}
      disabled={disabled}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select question type" />
      </SelectTrigger>
      <SelectContent>
        {questionTypes.map((config) => {
          const Icon = config.icon;
          return (
            <SelectItem key={config.type} value={config.type}>
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <span>{config.label}</span>
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
