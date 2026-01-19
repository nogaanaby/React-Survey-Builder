import * as React from "react";
import { InputTextarea } from "primereact/inputtextarea";
import type { InputTextareaProps } from "primereact/inputtextarea";
import { cn } from "../../utils";

export interface TextareaProps extends InputTextareaProps {}

function Textarea({ className, ...props }: TextareaProps) {
  return (
    <InputTextarea
      className={cn("w-full", className)}
      {...props}
    />
  );
}

export { Textarea };
