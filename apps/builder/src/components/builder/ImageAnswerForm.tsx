import { useSignal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Dialog } from "primereact/dialog";
import { addAnswer } from "@/store";

interface ImageAnswerFormProps {
  questionId: string;
}

export function ImageAnswerForm({ questionId }: ImageAnswerFormProps) {
  useSignals();
  const isDialogOpen = useSignal(false);
  const newAnswerText = useSignal("");
  const newAnswerDescription = useSignal("");
  const newAnswerImageUrl = useSignal("");

  const handleAdd = () => {
    if (newAnswerText.value.trim()) {
      addAnswer(
        questionId, 
        newAnswerText.value.trim(), 
        newAnswerImageUrl.value || undefined,
        newAnswerDescription.value.trim() || undefined
      );
      // Reset form
      newAnswerText.value = "";
      newAnswerDescription.value = "";
      newAnswerImageUrl.value = "";
      isDialogOpen.value = false;
    }
  };

  const handleCancel = () => {
    newAnswerText.value = "";
    newAnswerDescription.value = "";
    newAnswerImageUrl.value = "";
    isDialogOpen.value = false;
  };

  const handleImageUpload = (e: any) => {
    const file = e.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        newAnswerImageUrl.value = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const dialogFooter = (
    <div className="flex justify-end gap-2">
      <Button label="Cancel" icon="pi pi-times" onClick={handleCancel} severity="secondary" outlined />
      <Button 
        label="Add Answer" 
        icon="pi pi-check" 
        onClick={handleAdd} 
        severity="success"
        disabled={!newAnswerText.value.trim()}
      />
    </div>
  );

  return (
    <>
      <Button
        label="Add Image Answer"
        icon="pi pi-plus"
        onClick={() => (isDialogOpen.value = true)}
        severity="success"
        size="small"
        className="mt-3"
      />

      <Dialog
        visible={isDialogOpen.value}
        onHide={handleCancel}
        header="Add Image Answer"
        footer={dialogFooter}
        style={{ width: '450px' }}
        modal
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-medium">Title *</label>
            <InputText
              value={newAnswerText.value}
              onChange={(e) => (newAnswerText.value = e.target.value)}
              placeholder="Answer title"
              className="w-full"
              autoFocus
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="font-medium">Description (optional)</label>
            <InputText
              value={newAnswerDescription.value}
              onChange={(e) => (newAnswerDescription.value = e.target.value)}
              placeholder="Answer description"
              className="w-full"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium">Image (optional)</label>
            {newAnswerImageUrl.value && (
              <div className="relative mb-2">
                <img 
                  src={newAnswerImageUrl.value} 
                  alt="Preview" 
                  className="w-full h-32 object-cover rounded-lg"
                />
                <Button
                  icon="pi pi-times"
                  rounded
                  severity="danger"
                  size="small"
                  className="absolute top-2 right-2"
                  onClick={() => (newAnswerImageUrl.value = "")}
                />
              </div>
            )}
            <FileUpload
              mode="basic"
              accept="image/*"
              maxFileSize={5000000}
              onSelect={handleImageUpload}
              chooseLabel="Upload Image"
              auto
              className="w-full"
            />
          </div>
        </div>
      </Dialog>
    </>
  );
}
