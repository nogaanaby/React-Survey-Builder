import { useSignals } from "@preact/signals-react/runtime";
import { SurveyForm, Card, CardContent } from "@survey/shared";
import { survey } from "@/store";

export function PreviewPanel() {
  useSignals();

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardContent className="pt-6">
          <SurveyForm
            survey={survey.value}
            mode="preview"
            onSubmit={(response) => {
              console.log("Preview submit:", response);
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
