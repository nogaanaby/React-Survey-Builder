import { useRef } from "react";
import { useSignal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { ContextMenu } from "primereact/contextmenu";
import { Dialog } from "primereact/dialog";
import { FileUpload } from "primereact/fileupload";
import type { Answer, QuestionType } from "@survey/shared";
import { updateAnswerFull, deleteAnswer } from "@/store";

interface ImageAnswerItemProps {
  answer: Answer;
  questionId: string;
  questionType: QuestionType;
}

export function ImageAnswerItem({ answer, questionId, questionType }: ImageAnswerItemProps) {
  useSignals();
  const contextMenuRef = useRef<ContextMenu>(null);
  const isEditing = useSignal(false);
  const editText = useSignal(answer.text);
  const editDescription = useSignal(answer.description || "");
  const editImageUrl = useSignal(answer.imageUrl || "");

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
      updateAnswerFull(questionId, answer.id, {
        text: editText.value.trim(),
        description: editDescription.value.trim() || undefined,
        imageUrl: editImageUrl.value || undefined,
      });
      isEditing.value = false;
    }
  };

  const handleCancel = () => {
    editText.value = answer.text;
    editDescription.value = answer.description || "";
    editImageUrl.value = answer.imageUrl || "";
    isEditing.value = false;
  };

  const handleImageUpload = (e: any) => {
    const file = e.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        editImageUrl.value = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const contextMenuItems = [
    {
      label: "Edit",
      icon: "pi pi-pencil",
      command: () => (isEditing.value = true),
    },
    {
      label: "Delete",
      icon: "pi pi-trash",
      className: "p-menuitem-danger",
      command: () => deleteAnswer(questionId, answer.id),
    },
  ];

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    contextMenuRef.current?.show(e);
  };

  const editDialogFooter = (
    <div className="flex justify-end gap-2">
      <Button label="Cancel" icon="pi pi-times" onClick={handleCancel} severity="secondary" outlined />
      <Button label="Save" icon="pi pi-check" onClick={handleSave} severity="success" />
    </div>
  );

  return (
    <>
      <ContextMenu model={contextMenuItems} ref={contextMenuRef} />
      
      <Dialog
        visible={isEditing.value}
        onHide={handleCancel}
        header="Edit Image Answer"
        footer={editDialogFooter}
        style={{ width: '450px' }}
        modal
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-medium">Title</label>
            <InputText
              value={editText.value}
              onChange={(e) => (editText.value = e.target.value)}
              placeholder="Answer title"
              className="w-full"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="font-medium">Description (optional)</label>
            <InputText
              value={editDescription.value}
              onChange={(e) => (editDescription.value = e.target.value)}
              placeholder="Answer description"
              className="w-full"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-medium">Image</label>
            {editImageUrl.value && (
              <div className="relative mb-2">
                <img 
                  src={editImageUrl.value} 
                  alt={editText.value} 
                  className="w-full h-32 object-cover rounded-lg"
                />
                <Button
                  icon="pi pi-times"
                  rounded
                  severity="danger"
                  size="small"
                  className="absolute top-2 right-2"
                  onClick={() => (editImageUrl.value = "")}
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

      <div
        ref={setNodeRef}
        style={style}
        onContextMenu={handleContextMenu}
        className="relative rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 transition-all cursor-pointer group"
      >
        <button
          {...attributes}
          {...listeners}
          className="absolute top-2 left-2 z-10 cursor-grab hover:bg-white/80 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity bg-white/60"
        >
          <i className="pi pi-bars text-gray-600 text-sm"></i>
        </button>

        <div className="absolute top-2 right-2 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            icon="pi pi-pencil"
            rounded
            size="small"
            severity="secondary"
            onClick={() => (isEditing.value = true)}
            className="bg-white/80"
          />
          <Button
            icon="pi pi-trash"
            rounded
            size="small"
            severity="danger"
            onClick={() => deleteAnswer(questionId, answer.id)}
            className="bg-white/80"
          />
        </div>

        {answer.imageUrl ? (
          <img
            src={answer.imageUrl}
            alt={answer.text}
            className="w-full h-24 object-cover"
          />
        ) : (
          <div className="w-full h-24 bg-gray-100 flex items-center justify-center">
            <i className="pi pi-image text-2xl text-gray-400"></i>
          </div>
        )}
        
        <div className="p-2 bg-white">
          <p className="font-medium text-sm text-gray-700 truncate">{answer.text}</p>
          {answer.description && (
            <p className="text-xs text-gray-500 truncate">{answer.description}</p>
          )}
        </div>
      </div>
    </>
  );
}
