import * as React from "react";
import type { QuestionFormProps, RatingScaleQuestion as RatingScaleQuestionType } from "../../../types";
import { Slider } from "../../ui/slider";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Label } from "../../ui/label";
import { cn } from "../../../utils";

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
          value={value !== undefined ? [value] : [min]}
          onValueChange={(v) => onChange(v[0])}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
        />
        {showLabels && (
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{minLabel || min}</span>
            <span className="font-medium text-foreground">
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
      <RadioGroup
        value={value?.toString() ?? ""}
        onValueChange={(v) => onChange(parseInt(v, 10))}
        disabled={disabled}
        className="flex flex-wrap gap-2"
      >
        {options.map((opt) => (
          <div key={opt} className="flex flex-col items-center">
            <RadioGroupItem
              value={opt.toString()}
              id={`rating-${opt}`}
              className={cn(
                "h-10 w-10",
                value === opt && "border-primary"
              )}
            />
            <Label
              htmlFor={`rating-${opt}`}
              className="text-xs mt-1 cursor-pointer"
            >
              {opt}
            </Label>
          </div>
        ))}
      </RadioGroup>
      {showLabels && (
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{minLabel}</span>
          <span>{maxLabel}</span>
        </div>
      )}
    </div>
  );
}
