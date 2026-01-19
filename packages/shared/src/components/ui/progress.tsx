import * as React from "react";
import { ProgressBar } from "primereact/progressbar";
import type { ProgressBarProps } from "primereact/progressbar";
import { cn } from "../../utils";

export interface ProgressProps extends Omit<ProgressBarProps, "value"> {
  value?: number;
}

function Progress({ className, value = 0, ...props }: ProgressProps) {
  return (
    <ProgressBar
      value={value}
      showValue={false}
      className={cn("h-2", className)}
      {...props}
    />
  );
}

export { Progress };
