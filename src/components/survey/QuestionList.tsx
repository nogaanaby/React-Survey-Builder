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
import { QuestionCard } from "./QuestionCard";
import { questions, reorderQuestions } from "@/store/surveyStore";

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

  const questionIds = questions.value.map((q) => q.id);

  if (questions.value.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="text-lg">No questions yet</p>
        <p className="text-sm">Click "Add Question" to get started</p>
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
        <div className="space-y-4">
          {questions.value.map((question, index) => (
            <QuestionCard key={question.id} question={question} index={index} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
