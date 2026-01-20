import { useSignals } from "@preact/signals-react/runtime";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { PickList } from "primereact/picklist";
import { Card } from "primereact/card";
import { availableLanguages, type Language } from "@survey/shared";
import { survey, updateSurveyMetadata } from "@/store";

export function SurveySettingsPanel() {
  useSignals();

  const metadata = survey.value.metadata;
  
  // Get selected languages and available (unselected) languages
  const selectedLanguages = metadata.languages || [];
  const selectedCodes = new Set(selectedLanguages.map((l) => l.code));
  const sourceLanguages = availableLanguages.filter((l) => !selectedCodes.has(l.code));

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSurveyMetadata({ title: e.target.value });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateSurveyMetadata({ description: e.target.value });
  };

  const handleStartDateChange = (e: any) => {
    updateSurveyMetadata({ 
      startDate: e.value ? e.value.toISOString() : undefined 
    });
  };

  const handleEndDateChange = (e: any) => {
    updateSurveyMetadata({ 
      endDate: e.value ? e.value.toISOString() : undefined 
    });
  };

  const handleLanguageChange = (e: any) => {
    updateSurveyMetadata({ languages: e.target });
  };

  const languageItemTemplate = (item: Language) => {
    return (
      <div className="flex items-center gap-2 p-2">
        <span className="font-semibold">{item.code.toUpperCase()}</span>
        <span>{item.name}</span>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card title="Basic Information" subTitle="Configure the main details of your survey">
        <div className="grid grid-cols-1 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="survey-title" className="font-medium">
              Survey Title *
            </label>
            <InputText
              id="survey-title"
              value={metadata.title}
              onChange={handleTitleChange}
              placeholder="Enter survey title"
              className="w-full"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="survey-description" className="font-medium">
              Description
            </label>
            <InputTextarea
              id="survey-description"
              value={metadata.description || ""}
              onChange={handleDescriptionChange}
              placeholder="Enter survey description"
              rows={4}
              className="w-full"
            />
          </div>
        </div>
      </Card>

      <Card title="Schedule" subTitle="Set the availability period for your survey">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="start-date" className="font-medium">
              Start Date
            </label>
            <Calendar
              id="start-date"
              value={metadata.startDate ? new Date(metadata.startDate) : null}
              onChange={handleStartDateChange}
              showTime
              showIcon
              placeholder="Select start date"
              className="w-full"
            />
            <small className="text-gray-500">
              When the survey becomes available to respondents
            </small>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="end-date" className="font-medium">
              End Date
            </label>
            <Calendar
              id="end-date"
              value={metadata.endDate ? new Date(metadata.endDate) : null}
              onChange={handleEndDateChange}
              showTime
              showIcon
              placeholder="Select end date"
              minDate={metadata.startDate ? new Date(metadata.startDate) : undefined}
              className="w-full"
            />
            <small className="text-gray-500">
              When the survey closes for responses
            </small>
          </div>
        </div>
      </Card>

      <Card title="Languages" subTitle="Select the languages this survey will support">
        <PickList
          source={sourceLanguages}
          target={selectedLanguages}
          onChange={handleLanguageChange}
          itemTemplate={languageItemTemplate}
          sourceHeader="Available Languages"
          targetHeader="Selected Languages"
          sourceStyle={{ height: '300px' }}
          targetStyle={{ height: '300px' }}
          showSourceControls={false}
          showTargetControls={true}
          sourceFilterPlaceholder="Search languages"
          targetFilterPlaceholder="Search selected"
          filter
          filterBy="name,code"
        />
        <small className="text-gray-500 mt-2 block">
          Use the arrows to add or remove languages. The first language in the selected list will be the default.
        </small>
      </Card>
    </div>
  );
}
