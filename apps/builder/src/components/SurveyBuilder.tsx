import { useSignals } from "@preact/signals-react/runtime";
import {
  Button,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@survey/shared";
import { Plus, Hammer, Eye, Code } from "lucide-react";
import { QuestionList } from "./builder/QuestionList";
import { QuestionFormDialog } from "./builder/QuestionFormDialog";
import { PreviewPanel } from "./preview/PreviewPanel";
import { JsonPreview } from "./json-preview/JsonPreview";
import {
  survey,
  questionCount,
  openAddQuestionDialog,
} from "@/store";

export function SurveyBuilder() {
  useSignals();

  return (
    <Card className="min-h-screen border-0 rounded-none bg-background">
      <CardHeader className="max-w-5xl mx-auto w-full">
        <CardTitle className="text-3xl">
          {survey.value.metadata.title || "Survey Builder"}
        </CardTitle>
        <CardDescription>
          {questionCount.value === 0
            ? "Create your survey by adding questions"
            : `${questionCount.value} question${questionCount.value === 1 ? "" : "s"}`}
        </CardDescription>
      </CardHeader>

      <CardContent className="max-w-5xl mx-auto w-full">
        <Tabs defaultValue="builder" className="w-full">
          <Card className="mb-6 py-3">
            <CardContent className="flex items-center justify-between py-0">
              <TabsList>
                <TabsTrigger value="builder">
                  <Hammer className="h-4 w-4 mr-2" />
                  Builder
                </TabsTrigger>
                <TabsTrigger value="preview">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </TabsTrigger>
                <TabsTrigger value="json">
                  <Code className="h-4 w-4 mr-2" />
                  JSON
                </TabsTrigger>
              </TabsList>

              <Button onClick={openAddQuestionDialog}>
                <Plus className="h-4 w-4 mr-2" />
                Add Question
              </Button>
            </CardContent>
          </Card>

          <TabsContent value="builder">
            <QuestionList />
          </TabsContent>

          <TabsContent value="preview">
            <PreviewPanel />
          </TabsContent>

          <TabsContent value="json">
            <JsonPreview />
          </TabsContent>
        </Tabs>
      </CardContent>

      <QuestionFormDialog />
    </Card>
  );
}
