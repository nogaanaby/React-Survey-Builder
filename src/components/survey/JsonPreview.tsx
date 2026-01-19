import { useSignals } from "@preact/signals-react/runtime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { questions, exportSurveyData } from "@/store";
import { useSignal } from "@preact/signals-react";

export function JsonPreview() {
  useSignals();
  const copied = useSignal(false);

  const jsonString = JSON.stringify(questions.value, null, 2);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(exportSurveyData());
      copied.value = true;
      setTimeout(() => {
        copied.value = false;
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Card className="h-fit sticky top-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">JSON Preview</CardTitle>
          <Button
            size="sm"
            variant="ghost"
            className="h-8 px-2"
            onClick={handleCopy}
          >
            {copied.value ? (
              <>
                <Check className="h-4 w-4 mr-1" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <pre className="text-xs bg-muted p-3 rounded-md overflow-auto max-h-[70vh] font-mono">
          {questions.value.length === 0 ? (
            <span className="text-muted-foreground">
              {`{\n  "questions": []\n}`}
            </span>
          ) : (
            jsonString
          )}
        </pre>
      </CardContent>
    </Card>
  );
}
