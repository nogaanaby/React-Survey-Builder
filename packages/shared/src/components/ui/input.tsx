import * as React from "react";
import { InputText } from "primereact/inputtext";
import type { InputTextProps } from "primereact/inputtext";
import { cn } from "../../utils";

export interface InputProps extends InputTextProps {}

function Input({ className, ...props }: InputProps) {
  return (
    <InputText
      className={cn("w-full", className)}
      {...props}
    />
  );
}

export { Input };
