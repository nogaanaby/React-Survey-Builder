import * as React from "react";
import { Dropdown } from "primereact/dropdown";
import {
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
  
  const options = questionTypes.map((config) => ({
    label: config.label,
    value: config.type,
  }));

  return (
    <Dropdown
      value={value}
      onChange={(e) => onChange(e.value as QuestionType)}
      options={options}
      disabled={disabled}
      placeholder="Select question type"
      className="w-full"
    />
  );
}
