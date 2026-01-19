import { useSignal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { addAnswer } from "@/store";

interface AnswerFormProps {
  questionId: string;
}

export function AnswerForm({ questionId }: AnswerFormProps) {
  useSignals();
  const newAnswerText = useSignal("");

  const handleAdd = () => {
    if (newAnswerText.value.trim()) {
      addAnswer(questionId, newAnswerText.value.trim());
      newAnswerText.value = "";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div className="flex items-center gap-2 mt-3">
      <InputText
        placeholder="Add new answer..."
        value={newAnswerText.value}
        onChange={(e) => (newAnswerText.value = e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1"
      />
      <Button
        label="Add"
        icon="pi pi-plus"
        onClick={handleAdd}
        disabled={!newAnswerText.value.trim()}
        severity="success"
        size="small"
      />
    </div>
  );
}
