import { useSignal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { addAnswer } from "@/store/surveyStore";

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
    <div className="flex items-center gap-2 mt-2">
      <Input
        placeholder="Add new answer..."
        value={newAnswerText.value}
        onChange={(e) => (newAnswerText.value = e.target.value)}
        onKeyDown={handleKeyDown}
        className="h-9"
      />
      <Button size="sm" onClick={handleAdd} disabled={!newAnswerText.value.trim()}>
        <Plus className="h-4 w-4 mr-1" />
        Add
      </Button>
    </div>
  );
}
