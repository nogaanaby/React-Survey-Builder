import { useSignal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { survey } from "@/store";

export function JsonPreview() {
  useSignals();
  const copied = useSignal(false);

  const jsonString = JSON.stringify(survey.value, null, 2);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonString);
      copied.value = true;
      setTimeout(() => {
        copied.value = false;
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const title = (
    <div className="flex justify-between items-center">
      <span>Survey JSON</span>
      <Button
        label={copied.value ? "Copied!" : "Copy JSON"}
        icon={copied.value ? "pi pi-check" : "pi pi-copy"}
        onClick={handleCopy}
        severity={copied.value ? "success" : "secondary"}
        size="small"
        outlined
      />
    </div>
  );

  return (
    <Card title={title} subTitle="Export your survey configuration">
      <pre className="text-sm bg-gray-100 p-4 rounded-md overflow-auto max-h-[70vh] font-mono">
        {jsonString}
      </pre>
    </Card>
  );
}
