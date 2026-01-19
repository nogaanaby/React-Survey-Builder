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
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import type { Question, SingleChoiceQuestion, MultipleChoiceQuestion } from "@survey/shared";
import { AnswerItem } from "./AnswerItem";
import { AnswerForm } from "./AnswerForm";
import { ImageAnswerItem } from "./ImageAnswerItem";
import { ImageAnswerForm } from "./ImageAnswerForm";
import { reorderAnswers } from "@/store";

interface AnswerListProps {
  question: Question;
}

export function AnswerList({ question }: AnswerListProps) {
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
      reorderAnswers(question.id, String(active.id), String(over.id));
    }
  };

  const q = question as SingleChoiceQuestion | MultipleChoiceQuestion;
  const answers = q.answers || [];
  const answerIds = answers.map((a) => a.id);
  const isImageType = q.answerType === "image-choice";

  if (isImageType) {
    // Image answer layout - grid
    return (
      <div className="space-y-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={answerIds} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {answers.map((answer) => (
                <ImageAnswerItem
                  key={answer.id}
                  answer={answer}
                  questionId={question.id}
                  questionType={question.type}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        <ImageAnswerForm questionId={question.id} />
      </div>
    );
  }

  // Text answer layout - list
  return (
    <div className="space-y-2">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={answerIds} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {answers.map((answer) => (
              <AnswerItem
                key={answer.id}
                answer={answer}
                questionId={question.id}
                questionType={question.type}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <AnswerForm questionId={question.id} />
    </div>
  );
}
