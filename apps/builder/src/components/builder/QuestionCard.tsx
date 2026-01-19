import { useSignals } from "@preact/signals-react/runtime";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import type { Question } from "@survey/shared";
import { AnswerList } from "./AnswerList";
import { deleteQuestion, openEditQuestionDialog } from "@/store";

interface QuestionCardProps {
  question: Question;
  index: number;
}

const typeLabels: Record<string, string> = {
  "single-choice": "Single choice",
  "multiple-choice": "Multiple choice",
  "text-input": "Text input",
  "rating-scale": "Rating scale",
};

const typeIcons: Record<string, string> = {
  "single-choice": "pi pi-circle",
  "multiple-choice": "pi pi-check-square",
  "text-input": "pi pi-pencil",
  "rating-scale": "pi pi-star",
};

export function QuestionCard({ question, index }: QuestionCardProps) {
  useSignals();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: question.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const hasAnswers = question.type === "single-choice" || question.type === "multiple-choice";

  const title = (
    <div className="flex items-start gap-3">
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab hover:bg-gray-100 p-2 rounded mt-1"
      >
        <i className="pi pi-bars text-gray-400"></i>
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-gray-500">
            Q{index + 1}
          </span>
          <i className={`${typeIcons[question.type] || "pi pi-question"} text-gray-400 text-sm`}></i>
          <span className="text-xs text-gray-500">
            {typeLabels[question.type] || question.type}
          </span>
          {question.required && (
            <span className="text-xs text-red-500 font-medium">Required</span>
          )}
        </div>
        <span className="text-lg font-semibold">{question.text}</span>
      </div>

      <div className="flex items-center gap-1">
        <Button
          icon="pi pi-pencil"
          rounded
          text
          severity="secondary"
          onClick={() => openEditQuestionDialog(question.id)}
          tooltip="Edit"
          tooltipOptions={{ position: 'top' }}
        />
        <Button
          icon="pi pi-trash"
          rounded
          text
          severity="danger"
          onClick={() => deleteQuestion(question.id)}
          tooltip="Delete"
          tooltipOptions={{ position: 'top' }}
        />
      </div>
    </div>
  );

  return (
    <div ref={setNodeRef} style={style} className="mb-4">
      <Card title={title} subTitle={question.description}>
        {hasAnswers && <AnswerList question={question} />}
      </Card>
    </div>
  );
}
