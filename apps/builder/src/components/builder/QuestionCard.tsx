import { useSignals } from "@preact/signals-react/runtime";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  type Question,
} from "@survey/shared";
import { GripVertical, Pencil, Trash2, CircleDot, CheckSquare, Type, Star } from "lucide-react";
import { AnswerList } from "./AnswerList";
import { deleteQuestion, openEditQuestionDialog } from "@/store";

interface QuestionCardProps {
  question: Question;
  index: number;
}

const typeIcons: Record<string, typeof CircleDot> = {
  "single-choice": CircleDot,
  "multiple-choice": CheckSquare,
  "text-input": Type,
  "rating-scale": Star,
};

const typeLabels: Record<string, string> = {
  "single-choice": "Single choice",
  "multiple-choice": "Multiple choice",
  "text-input": "Text input",
  "rating-scale": "Rating scale",
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

  const TypeIcon = typeIcons[question.type] || CircleDot;
  const hasAnswers = question.type === "single-choice" || question.type === "multiple-choice";

  return (
    <Card ref={setNodeRef} style={style} className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab hover:bg-muted p-1 rounded mt-1"
          >
            <GripVertical className="h-5 w-5 text-muted-foreground" />
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium text-muted-foreground">
                Q{index + 1}
              </span>
              <TypeIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {typeLabels[question.type] || question.type}
              </span>
              {question.required && (
                <span className="text-xs text-destructive">Required</span>
              )}
            </div>
            <CardTitle className="text-lg">{question.text}</CardTitle>
            {question.description && (
              <p className="text-sm text-muted-foreground mt-1">
                {question.description}
              </p>
            )}
          </div>

          <div className="flex items-center gap-1">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => openEditQuestionDialog(question.id)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="text-destructive hover:text-destructive"
              onClick={() => deleteQuestion(question.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {hasAnswers && (
        <CardContent>
          <AnswerList question={question} />
        </CardContent>
      )}
    </Card>
  );
}
