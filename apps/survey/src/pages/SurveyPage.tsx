import { useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Panel } from "primereact/panel";
import {
  SurveyForm,
  type Survey,
  type SurveyResponse,
} from "@survey/shared";

// Hardcoded survey for testing
const testSurvey: Survey = {
  "id": "988c51a2-1c26-4d91-8933-9eb3521c8e15",
  "version": 1,
  "metadata": {
    "title": "My Survey",
    "description": "",
    "createdAt": "2026-01-19T13:46:47.619Z",
    "updatedAt": "2026-01-19T15:02:13.350Z"
  },
  "settings": {
    "allowAnonymous": true,
    "showProgressBar": true,
    "shuffleQuestions": false,
    "oneQuestionPerPage": false,
    "submitButtonText": "Submit",
    "thankYouMessage": "Thank you for completing this survey!"
  },
  "questions": [
    {
      "id": "cc877254-29ea-4b64-a8df-f8c223854a7b",
      "type": "single-choice",
      "text": "question22",
      "description": "ssasasasa",
      "required": true,
      "answerType": "radio",
      "answers": [
        {
          "id": "132ed523-aec0-4c8b-8d2e-3de1cfd4b72b",
          "text": "aaaa"
        },
        {
          "id": "550c764a-441b-4bf8-85a5-e1b53a0e35aa",
          "text": "bbbb"
        },
        {
          "id": "4d49149b-d1f6-437c-a154-7b2eb574769c",
          "text": "cccc"
        },
        {
          "id": "07519abc-9c43-45d0-a3f5-9bccab7bee02",
          "text": "dddd"
        }
      ],
      "config": {
        "allowOther": false,
        "randomizeOrder": false
      }
    },
    {
      "id": "25bee57c-2f14-490a-93e8-2882e009fd9f",
      "type": "multiple-choice",
      "text": "question title",
      "description": undefined,
      "required": true,
      "answerType": "checkbox",
      "answers": [
        {
          "id": "2e4728f5-08d9-4f7d-8c60-674745305179",
          "text": "sdsda"
        },
        {
          "id": "c2ca8236-86c3-472e-b384-4c6df99bc020",
          "text": "zdz"
        },
        {
          "id": "ba1adcc5-2c3f-4123-af72-c41504e9fd42",
          "text": "vdsf"
        },
        {
          "id": "25d4469b-ca99-416f-bce8-92acc51d40d2",
          "text": "dsfd"
        },
        {
          "id": "01d4e4ee-3f23-454f-b7bf-f457ecd633b3",
          "text": "zcd"
        }
      ],
      "config": {
        "allowOther": false,
        "randomizeOrder": false
      }
    }
  ]
} as Survey;

export function SurveyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [response, setResponse] = useState<SurveyResponse | null>(null);

  const handleSubmit = (surveyResponse: SurveyResponse) => {
    console.log("Survey submitted:", surveyResponse);
    setResponse(surveyResponse);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-2xl font-bold mb-2">
              {testSurvey.settings.thankYouMessage}
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
            survey={testSurvey}
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
