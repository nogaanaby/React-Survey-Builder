import { useState, useEffect } from "react";
import {
  SurveyForm,
  Card,
  CardContent,
  type Survey,
  type SurveyResponse,
  createEmptySurvey,
} from "@survey/shared";

// Storage key - same as builder for demo purposes
const STORAGE_KEY = "survey-builder-data";

export function SurveyPage() {
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [response, setResponse] = useState<SurveyResponse | null>(null);

  useEffect(() => {
    // Load survey from localStorage (in real app, fetch from API)
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        setSurvey(data.survey || createEmptySurvey("Demo Survey"));
      } else {
        setSurvey(createEmptySurvey("Demo Survey"));
      }
    } catch {
      setSurvey(createEmptySurvey("Demo Survey"));
    }
  }, []);

  const handleSubmit = (surveyResponse: SurveyResponse) => {
    console.log("Survey submitted:", surveyResponse);
    setResponse(surveyResponse);
    setSubmitted(true);
    
    // In real app, send to API
    // await api.submitResponse(surveyResponse);
  };

  if (!survey) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading survey...</p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto p-6">
          <Card>
            <CardContent className="pt-6 text-center space-y-4">
              <div className="text-5xl">🎉</div>
              <h1 className="text-2xl font-bold">
                {survey.settings.thankYouMessage}
              </h1>
              <p className="text-muted-foreground">
                Your response has been recorded.
              </p>
              {response && (
                <details className="text-left mt-6">
                  <summary className="cursor-pointer text-sm text-muted-foreground">
                    View your response (debug)
                  </summary>
                  <pre className="mt-2 text-xs bg-muted p-4 rounded-md overflow-auto">
                    {JSON.stringify(response, null, 2)}
                  </pre>
                </details>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto p-6">
        <Card>
          <CardContent className="pt-6">
            <SurveyForm
              survey={survey}
              mode="submit"
              onSubmit={handleSubmit}
              onValidationError={(errors) => {
                console.log("Validation errors:", errors);
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
