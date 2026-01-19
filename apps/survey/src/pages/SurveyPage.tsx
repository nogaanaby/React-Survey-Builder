import { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Panel } from "primereact/panel";
import { ProgressSpinner } from "primereact/progressspinner";
import {
  SurveyForm,
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <ProgressSpinner />
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-2xl font-bold mb-2">
              {survey.settings.thankYouMessage}
            </h1>
            <p className="text-gray-500 mb-4">
              Your response has been recorded.
            </p>
            {response && (
              <Panel header="Your Response (Debug)" toggleable collapsed className="text-left mt-4">
                <pre className="text-xs bg-gray-100 p-4 rounded-md overflow-auto">
                  {JSON.stringify(response, null, 2)}
                </pre>
              </Panel>
            )}
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <Card>
          <SurveyForm
            survey={survey}
            mode="submit"
            onSubmit={handleSubmit}
            onValidationError={(errors) => {
              console.log("Validation errors:", errors);
            }}
          />
        </Card>
      </div>
    </div>
  );
}
