import * as React from "react";
import { Progress } from "../ui/progress";
import { cn } from "../../utils";

interface SurveyProgressProps {
  progress: number;
  className?: string;
}

export function SurveyProgress({ progress, className }: SurveyProgressProps) {
  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Progress</span>
        <span>{progress}%</span>
      </div>
      <Progress value={progress} />
    </div>
  );
}
