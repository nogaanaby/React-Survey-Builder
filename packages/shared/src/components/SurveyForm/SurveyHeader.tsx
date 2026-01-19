import * as React from "react";
import type { SurveyMetadata } from "../../types";
import { cn } from "../../utils";

interface SurveyHeaderProps {
  metadata: SurveyMetadata;
  className?: string;
}

export function SurveyHeader({ metadata, className }: SurveyHeaderProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <h1 className="text-2xl font-bold">{metadata.title}</h1>
      {metadata.description && (
        <p className="text-muted-foreground">{metadata.description}</p>
      )}
    </div>
  );
}
