import { useSignal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { GripVertical, Pencil, Trash2, Check, X } from "lucide-react";
import { updateAnswer, deleteAnswer, type Answer } from "@/store";

interface AnswerItemProps {
  answer: Answer;
  questionId: string;
  questionType: "single" | "multiple";
}

export function AnswerItem({ answer, questionId, questionType }: AnswerItemProps) {
  useSignals();
  const isEditing = useSignal(false);
  const editText = useSignal(answer.text);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: answer.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleSave = () => {
    if (editText.value.trim()) {
      updateAnswer(questionId, answer.id, editText.value.trim());
      isEditing.value = false;
    }
  };

  const handleCancel = () => {
    editText.value = answer.text;
    isEditing.value = false;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 p-2 bg-muted/50 rounded-md group"
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab hover:bg-muted p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </button>

      {questionType === "single" ? (
        <RadioGroupItem value={answer.id} disabled className="pointer-events-none" />
      ) : (
        <Checkbox disabled className="pointer-events-none" />
      )}

      {isEditing.value ? (
        <div className="flex-1 flex items-center gap-2">
          <Input
            value={editText.value}
            onChange={(e) => (editText.value = e.target.value)}
            onKeyDown={handleKeyDown}
            className="h-8"
            autoFocus
          />
          <Button size="icon" variant="ghost" className="h-8 w-8" onClick={handleSave}>
            <Check className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" className="h-8 w-8" onClick={handleCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <>
          <span className="flex-1 text-sm">{answer.text}</span>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8"
              onClick={() => (isEditing.value = true)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-destructive hover:text-destructive"
              onClick={() => deleteAnswer(questionId, answer.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
