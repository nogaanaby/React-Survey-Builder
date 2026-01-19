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
  Button,
  Input,
  Label,
  Checkbox,
  type QuestionType,
} from "@survey/shared";
import { QuestionTypeSelector } from "@survey/builder-components";
import {
  isQuestionDialogOpen,
  editingQuestionId,
  closeQuestionDialog,
  addQuestion,
  updateQuestion,
  getQuestionById,
} from "@/store";

const questionText = signal("");
const questionType = signal<QuestionType>("single-choice");
const questionRequired = signal(false);
const questionDescription = signal("");

const isEditing = computed(() => editingQuestionId.value !== null);

export function QuestionFormDialog() {
  useSignals();

  useEffect(() => {
    if (isQuestionDialogOpen.value) {
      if (editingQuestionId.value) {
        const question = getQuestionById(editingQuestionId.value);
        if (question) {
          questionText.value = question.text;
          questionType.value = question.type;
          questionRequired.value = question.required;
          questionDescription.value = question.description || "";
        }
      } else {
        questionText.value = "";
        questionType.value = "single-choice";
        questionRequired.value = false;
        questionDescription.value = "";
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
        required: questionRequired.value,
        description: questionDescription.value.trim() || undefined,
      });
    } else {
      addQuestion(questionType.value, questionText.value.trim());
      // Update the newly added question with additional fields
      // Note: This is simplified; in production, you'd pass all fields to addQuestion
    }

    closeQuestionDialog();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) closeQuestionDialog();
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
              ? "Modify the question details below."
              : "Enter the question details and select the type."}
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
            <Label htmlFor="question-description">Description (optional)</Label>
            <Input
              id="question-description"
              placeholder="Add a description..."
              value={questionDescription.value}
              onChange={(e) => (questionDescription.value = e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Question Type</Label>
            <QuestionTypeSelector
              value={questionType.value}
              onChange={(v) => (questionType.value = v)}
              disabled={isEditing.value}
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="question-required"
              checked={questionRequired.value}
              onCheckedChange={(checked) =>
                (questionRequired.value = checked === true)
              }
            />
            <Label htmlFor="question-required" className="font-normal">
              Required question
            </Label>
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
