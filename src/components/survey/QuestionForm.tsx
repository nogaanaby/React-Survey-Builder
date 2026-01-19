import { useEffect } from "react";
import { signal, computed } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  isQuestionDialogOpen,
  editingQuestionId,
  closeQuestionDialog,
  addQuestion,
  updateQuestion,
  getQuestionById,
} from "@/store/surveyStore";

const questionText = signal("");
const questionType = signal<"single" | "multiple">("single");

const isEditing = computed(() => editingQuestionId.value !== null);

export function QuestionForm() {
  useSignals();

  // Reset form when dialog opens
  useEffect(() => {
    if (isQuestionDialogOpen.value) {
      if (editingQuestionId.value) {
        const question = getQuestionById(editingQuestionId.value);
        if (question) {
          questionText.value = question.text;
          questionType.value = question.type;
        }
      } else {
        questionText.value = "";
        questionType.value = "single";
      }
    }
  }, [isQuestionDialogOpen.value, editingQuestionId.value]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.value.trim()) return;

    if (isEditing.value && editingQuestionId.value) {
      updateQuestion(editingQuestionId.value, {
        text: questionText.value.trim(),
        type: questionType.value,
      });
    } else {
      addQuestion({
        text: questionText.value.trim(),
        type: questionType.value,
      });
    }

    closeQuestionDialog();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeQuestionDialog();
    }
  };

  return (
    <Dialog open={isQuestionDialogOpen.value} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditing.value ? "Edit Question" : "Add New Question"}
          </DialogTitle>
          <DialogDescription>
            {isEditing.value
              ? "Modify the question text and type below."
              : "Enter the question text and select the answer type."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="question-text">Question Text</Label>
            <Input
              id="question-text"
              placeholder="Enter your question..."
              value={questionText.value}
              onChange={(e) => (questionText.value = e.target.value)}
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="question-type">Question Type</Label>
            <Select
              value={questionType.value}
              onValueChange={(value: "single" | "multiple") => (questionType.value = value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single Choice (Radio)</SelectItem>
                <SelectItem value="multiple">Multiple Choice (Checkbox)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={closeQuestionDialog}>
              Cancel
            </Button>
            <Button type="submit" disabled={!questionText.value.trim()}>
              {isEditing.value ? "Save Changes" : "Add Question"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
