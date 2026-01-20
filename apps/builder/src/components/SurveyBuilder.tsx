import { useState } from "react";
import { useSignals } from "@preact/signals-react/runtime";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";
import { QuestionList } from "./builder/QuestionList";
import { QuestionFormDialog } from "./builder/QuestionFormDialog";
import { PreviewPanel } from "./preview/PreviewPanel";
import { JsonPreview } from "./json-preview/JsonPreview";
import { SurveySettingsPanel } from "./settings/SurveySettingsPanel";
import {
  survey,
  questionCount,
  openAddQuestionDialog,
} from "@/store";

export function SurveyBuilder() {
  useSignals();
  const [activeIndex, setActiveIndex] = useState(0);

  const title = (
    <div className="flex justify-between items-center">
      <span>{survey.value.metadata.title || "Survey Builder"}</span>
      <Button 
        label="Add Question" 
        icon="pi pi-plus" 
        onClick={openAddQuestionDialog}
        severity="success"
      />
    </div>
  );

  const subTitle = questionCount.value === 0
    ? "Create your survey by adding questions"
    : `${questionCount.value} question${questionCount.value === 1 ? "" : "s"}`;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto">
        <Card title={title} subTitle={subTitle}>
          <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
            <TabPanel header="Settings" leftIcon="pi pi-cog mr-2">
              <SurveySettingsPanel />
            </TabPanel>
            <TabPanel header="Builder" leftIcon="pi pi-wrench mr-2">
              <QuestionList />
            </TabPanel>
            <TabPanel header="Preview" leftIcon="pi pi-eye mr-2">
              <PreviewPanel />
            </TabPanel>
            <TabPanel header="JSON" leftIcon="pi pi-code mr-2">
              <JsonPreview />
            </TabPanel>
          </TabView>
        </Card>
      </div>

      <QuestionFormDialog />
    </div>
  );
}
