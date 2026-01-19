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
import { RadioGroup } from "@/components/ui/radio-group";
import { AnswerItem } from "./AnswerItem";
import { AnswerForm } from "./AnswerForm";
import { reorderAnswers, type Question } from "@/store";

interface AnswerListProps {
  question: Question;
}

export function AnswerList({ question }: AnswerListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      reorderAnswers(question.id, String(active.id), String(over.id));
    }
  };

  const answerIds = question.answers.map((a) => a.id);

  return (
    <div className="space-y-2">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={answerIds} strategy={verticalListSortingStrategy}>
          {question.type === "single" ? (
            <RadioGroup disabled className="space-y-2">
              {question.answers.map((answer) => (
                <AnswerItem
                  key={answer.id}
                  answer={answer}
                  questionId={question.id}
                  questionType={question.type}
                />
              ))}
            </RadioGroup>
          ) : (
            <div className="space-y-2">
              {question.answers.map((answer) => (
                <AnswerItem
                  key={answer.id}
                  answer={answer}
                  questionId={question.id}
                  questionType={question.type}
                />
              ))}
            </div>
          )}
        </SortableContext>
      </DndContext>

      <AnswerForm questionId={question.id} />
    </div>
  );
}
