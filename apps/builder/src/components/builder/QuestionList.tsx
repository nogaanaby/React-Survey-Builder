import { useSignals } from "@preact/signals-react/runtime";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Message } from "primereact/message";
import { QuestionCard } from "./QuestionCard";
import { survey, reorderQuestions } from "@/store";

export function QuestionList() {
  useSignals();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      reorderQuestions(String(active.id), String(over.id));
    }
  };

  const questions = survey.value.questions;
  const questionIds = questions.map((q) => q.id);

  if (questions.length === 0) {
    return (
      <div className="text-center py-12">
        <Message
          severity="info"
          text="No questions yet. Click 'Add Question' to get started."
          className="w-full justify-center"
        />
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={questionIds} strategy={verticalListSortingStrategy}>
        <div>
          {questions.map((question, index) => (
            <QuestionCard key={question.id} question={question} index={index} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
