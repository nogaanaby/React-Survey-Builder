import * as React from "react";
import { Slider } from "primereact/slider";
import { RadioButton } from "primereact/radiobutton";
import type { QuestionFormProps, RatingScaleQuestion as RatingScaleQuestionType } from "../../../types";

export function RatingScaleQuestion({
  question,
  value,
  onChange,
  disabled,
}: QuestionFormProps<number>) {
  const q = question as RatingScaleQuestionType;
  const { min, max, step, minLabel, maxLabel, showLabels } = q.config;

  // Generate options for radio buttons
  const options = React.useMemo(() => {
    const result = [];
    for (let i = min; i <= max; i += step) {
      result.push(i);
    }
    return result;
  }, [min, max, step]);

  if (q.answerType === "slider") {
    return (
      <div className="space-y-4">
        <Slider
          value={value ?? min}
          onChange={(e) => onChange(e.value as number)}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className="w-full"
        />
        {showLabels && (
          <div className="flex justify-between text-sm text-gray-500">
            <span>{minLabel || min}</span>
            <span className="font-medium text-gray-900">
              {value ?? min}
            </span>
            <span>{maxLabel || max}</span>
          </div>
        )}
      </div>
    );
  }

  // Radio button scale
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-4">
        {options.map((opt) => (
          <div key={opt} className="flex flex-col items-center">
            <RadioButton
              inputId={`rating-${opt}`}
              name={`rating-${question.id}`}
              value={opt}
              checked={value === opt}
              onChange={(e) => onChange(e.value)}
              disabled={disabled}
            />
            <label
              htmlFor={`rating-${opt}`}
              className="text-xs mt-1 cursor-pointer"
            >
              {opt}
            </label>
          </div>
        ))}
      </div>
      {showLabels && (
        <div className="flex justify-between text-sm text-gray-500">
          <span>{minLabel}</span>
          <span>{maxLabel}</span>
        </div>
      )}
    </div>
  );
}
