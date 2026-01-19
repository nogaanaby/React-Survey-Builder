import { useSignal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import type { Answer, QuestionType } from "@survey/shared";
import { updateAnswer, deleteAnswer } from "@/store";

interface AnswerItemProps {
  answer: Answer;
  questionId: string;
  questionType: QuestionType;
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
    if (e.key === "Enter") handleSave();
    else if (e.key === "Escape") handleCancel();
  };

  const answerIcon = questionType === "single-choice" ? "pi pi-circle" : "pi pi-stop";

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 p-2 bg-gray-50 rounded-md group hover:bg-gray-100 transition-colors"
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab hover:bg-gray-200 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <i className="pi pi-bars text-gray-400 text-sm"></i>
      </button>

      <i className={`${answerIcon} text-gray-400 text-sm`}></i>

      {isEditing.value ? (
        <div className="flex-1 flex items-center gap-2">
          <InputText
            value={editText.value}
            onChange={(e) => (editText.value = e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 p-inputtext-sm"
            autoFocus
          />
          <Button
            icon="pi pi-check"
            rounded
            text
            severity="success"
            size="small"
            onClick={handleSave}
          />
          <Button
            icon="pi pi-times"
            rounded
            text
            severity="secondary"
            size="small"
            onClick={handleCancel}
          />
        </div>
      ) : (
        <>
          <span className="flex-1 text-sm">{answer.text}</span>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              icon="pi pi-pencil"
              rounded
              text
              severity="secondary"
              size="small"
              onClick={() => (isEditing.value = true)}
            />
            <Button
              icon="pi pi-trash"
              rounded
              text
              severity="danger"
              size="small"
              onClick={() => deleteAnswer(questionId, answer.id)}
            />
          </div>
        </>
      )}
    </div>
  );
}
