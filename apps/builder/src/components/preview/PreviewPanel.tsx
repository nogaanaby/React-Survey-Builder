import { useSignal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Panel } from "primereact/panel";
import { SurveyForm, type SurveyResponse } from "@survey/shared";
import { survey } from "@/store";

export function PreviewPanel() {
  useSignals();
  const submitted = useSignal(false);
  const response = useSignal<SurveyResponse | null>(null);

  const handleSubmit = (surveyResponse: SurveyResponse) => {
    console.log("Preview submit:", surveyResponse);
    response.value = surveyResponse;
    submitted.value = true;
  };

  const handleReset = () => {
    submitted.value = false;
    response.value = null;
  };

  if (submitted.value) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-xl font-bold mb-2">
            {survey.value.settings.thankYouMessage}
          </h2>
          <p className="text-gray-500 mb-4">
            This is a preview. In production, responses would be saved.
          </p>
          <Button
            label="Try Again"
            icon="pi pi-refresh"
            onClick={handleReset}
            severity="secondary"
            outlined
            className="mb-4"
          />
          {response.value && (
            <Panel header="Response Data" toggleable collapsed className="text-left mt-4">
              <pre className="text-xs bg-gray-100 p-4 rounded-md overflow-auto max-h-60">
                {JSON.stringify(response.value, null, 2)}
              </pre>
            </Panel>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <SurveyForm
          survey={survey.value}
          mode="submit"
          onSubmit={handleSubmit}
        />
      </Card>
    </div>
  );
}
