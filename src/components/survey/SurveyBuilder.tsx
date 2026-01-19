import { useSignals } from "@preact/signals-react/runtime";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { QuestionList } from "./QuestionList";
import { QuestionForm } from "./QuestionForm";
import { openAddQuestionDialog, questionCount } from "@/store/surveyStore";

export function SurveyBuilder() {
  useSignals();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto p-6">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Survey Builder</h1>
              <p className="text-muted-foreground mt-1">
                {questionCount.value === 0
                  ? "Create your survey by adding questions"
                  : `${questionCount.value} question${questionCount.value === 1 ? "" : "s"}`}
              </p>
            </div>
            <Button onClick={openAddQuestionDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Add Question
            </Button>
          </div>
        </header>

        <main>
          <QuestionList />
        </main>

        <QuestionForm />
      </div>
    </div>
  );
}
