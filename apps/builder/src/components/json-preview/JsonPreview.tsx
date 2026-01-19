import { useSignal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import { Card, CardContent, CardHeader, CardTitle, Button } from "@survey/shared";
import { Copy, Check } from "lucide-react";
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

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Survey JSON</CardTitle>
          <Button size="sm" variant="outline" onClick={handleCopy}>
            {copied.value ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Copy JSON
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <pre className="text-sm bg-muted p-4 rounded-md overflow-auto max-h-[70vh] font-mono">
          {jsonString}
        </pre>
      </CardContent>
    </Card>
  );
}
