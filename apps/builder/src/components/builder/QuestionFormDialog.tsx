import { useEffect } from "react";
import { signal, computed } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { questionRegistry, type QuestionType } from "@survey/shared";
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

  const handleSubmit = () => {
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
    }

    closeQuestionDialog();
  };

  const questionTypeOptions = questionRegistry.getAll().map((config) => ({
    label: config.label,
    value: config.type,
  }));

  const footerContent = (
    <div className="flex justify-end gap-2">
      <Button 
        label="Cancel" 
        icon="pi pi-times" 
        onClick={closeQuestionDialog} 
        severity="secondary"
        outlined
      />
      <Button 
        label={isEditing.value ? "Save Changes" : "Add Question"} 
        icon="pi pi-check" 
        onClick={handleSubmit}
        disabled={!questionText.value.trim()}
        severity="success"
      />
    </div>
  );

  return (
    <Dialog
      visible={isQuestionDialogOpen.value}
      onHide={closeQuestionDialog}
      header={isEditing.value ? "Edit Question" : "Add New Question"}
      footer={footerContent}
      style={{ width: '500px' }}
      modal
      draggable={false}
    >
      <p className="text-gray-500 mb-4">
        {isEditing.value
          ? "Modify the question details below."
          : "Enter the question details and select the type."}
      </p>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="question-text" className="font-medium">
            Question Text
          </label>
          <InputText
            id="question-text"
            placeholder="Enter your question..."
            value={questionText.value}
            onChange={(e) => (questionText.value = e.target.value)}
            className="w-full"
            autoFocus
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="question-description" className="font-medium">
            Description (optional)
          </label>
          <InputText
            id="question-description"
            placeholder="Add a description..."
            value={questionDescription.value}
            onChange={(e) => (questionDescription.value = e.target.value)}
            className="w-full"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="question-type" className="font-medium">
            Question Type
          </label>
          <Dropdown
            id="question-type"
            value={questionType.value}
            onChange={(e) => (questionType.value = e.value)}
            options={questionTypeOptions}
            placeholder="Select question type"
            disabled={isEditing.value}
            className="w-full"
          />
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            inputId="question-required"
            checked={questionRequired.value}
            onChange={(e) => (questionRequired.value = e.checked ?? false)}
          />
          <label htmlFor="question-required" className="cursor-pointer">
            Required question
          </label>
        </div>
      </div>
    </Dialog>
  );
}
