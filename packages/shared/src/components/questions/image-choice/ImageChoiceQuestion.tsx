import * as React from "react";
import { useRef } from "react";
import { ContextMenu } from "primereact/contextmenu";
import { Card } from "primereact/card";
import type { 
  QuestionFormProps, 
  SingleChoiceQuestion as SingleChoiceQuestionType,
  MultipleChoiceQuestion as MultipleChoiceQuestionType,
  Answer 
} from "../../../types";

interface ImageChoiceQuestionProps extends QuestionFormProps<string | string[]> {
  isMultiple?: boolean;
}

export function ImageChoiceQuestion({
  question,
  value,
  onChange,
  disabled,
}: ImageChoiceQuestionProps) {
  const q = question as SingleChoiceQuestionType | MultipleChoiceQuestionType;
  const isMultiple = question.type === "multiple-choice";
  const contextMenuRef = useRef<ContextMenu>(null);
  const [selectedAnswer, setSelectedAnswer] = React.useState<Answer | null>(null);

  // Normalize value to array for easier handling
  const selectedValues: string[] = React.useMemo(() => {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    return [value];
  }, [value]);

  const handleSelect = (answerId: string) => {
    if (disabled) return;

    if (isMultiple) {
      // Multiple choice - toggle selection
      const currentValues = selectedValues;
      if (currentValues.includes(answerId)) {
        onChange(currentValues.filter((v) => v !== answerId));
      } else {
        onChange([...currentValues, answerId]);
      }
    } else {
      // Single choice - replace selection
      onChange(answerId);
    }
  };

  const isSelected = (answerId: string) => selectedValues.includes(answerId);

  const contextMenuItems = [
    {
      label: selectedAnswer?.text || "Image",
      icon: "pi pi-image",
      disabled: true,
    },
    { separator: true },
    {
      label: selectedAnswer?.description || "No description",
      icon: "pi pi-info-circle",
      disabled: true,
    },
    { separator: true },
    {
      label: isSelected(selectedAnswer?.id || "") ? "Deselect" : "Select",
      icon: isSelected(selectedAnswer?.id || "") ? "pi pi-times" : "pi pi-check",
      command: () => {
        if (selectedAnswer) {
          handleSelect(selectedAnswer.id);
        }
      },
    },
  ];

  const handleContextMenu = (e: React.MouseEvent, answer: Answer) => {
    e.preventDefault();
    setSelectedAnswer(answer);
    contextMenuRef.current?.show(e);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <ContextMenu model={contextMenuItems} ref={contextMenuRef} />
      
      {q.answers.map((answer) => {
        const selected = isSelected(answer.id);
        
        return (
          <div
            key={answer.id}
            onClick={() => handleSelect(answer.id)}
            onContextMenu={(e) => handleContextMenu(e, answer)}
            className={`
              cursor-pointer rounded-lg overflow-hidden border-2 transition-all
              ${selected 
                ? "border-green-500 ring-2 ring-green-200 shadow-lg" 
                : "border-gray-200 hover:border-gray-300"
              }
              ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            {answer.imageUrl ? (
              <div className="relative">
                <img
                  src={answer.imageUrl}
                  alt={answer.text}
                  className="w-full h-32 object-cover"
                />
                {selected && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                    <i className="pi pi-check text-xs"></i>
                  </div>
                )}
              </div>
            ) : (
              <div className={`
                w-full h-32 flex items-center justify-center
                ${selected ? "bg-green-100" : "bg-gray-100"}
              `}>
                <i className={`pi pi-image text-3xl ${selected ? "text-green-500" : "text-gray-400"}`}></i>
              </div>
            )}
            <div className="p-3">
              <p className={`font-medium text-sm ${selected ? "text-green-700" : "text-gray-700"}`}>
                {answer.text}
              </p>
              {answer.description && (
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                  {answer.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
