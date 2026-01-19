import * as React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  cn,
  type Question,
  questionRegistry,
} from "@survey/shared";
import { DragHandle } from "../../common/DragHandle";
import { DeleteButton } from "../../common/DeleteButton";
import { EditButton } from "../../common/EditButton";

interface BaseQuestionBuilderProps {
  question: Question;
  index: number;
  onEdit: () => void;
  onDelete: () => void;
  children?: React.ReactNode;
}

export function BaseQuestionBuilder({
  question,
  index,
  onEdit,
  onDelete,
  children,
}: BaseQuestionBuilderProps) {
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
  };

  const config = questionRegistry.get(question.type);
  const TypeIcon = config?.icon;

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn(
        "transition-shadow",
        isDragging && "opacity-50 shadow-lg"
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <DragHandle attributes={attributes} listeners={listeners} />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium text-muted-foreground">
                Q{index + 1}
              </span>
              {TypeIcon && <TypeIcon className="h-4 w-4 text-muted-foreground" />}
              <span className="text-xs text-muted-foreground">
                {config?.label}
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
            <EditButton onClick={onEdit} />
            <DeleteButton onClick={onDelete} />
          </div>
        </div>
      </CardHeader>

      {children && <CardContent>{children}</CardContent>}
    </Card>
  );
}
