import * as React from "react";
import { Checkbox as PrimeCheckbox } from "primereact/checkbox";
import type { CheckboxProps as PrimeCheckboxProps } from "primereact/checkbox";
import { cn } from "../../utils";

export interface CheckboxProps extends Omit<PrimeCheckboxProps, "checked" | "onChange"> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  onChange?: PrimeCheckboxProps["onChange"];
}

function Checkbox({ 
  className, 
  checked, 
  onCheckedChange,
  onChange,
  ...props 
}: CheckboxProps) {
  const handleChange = (e: { checked: boolean }) => {
    onCheckedChange?.(e.checked);
    onChange?.(e as any);
  };

  return (
    <PrimeCheckbox
      checked={checked}
      onChange={handleChange}
      className={cn(className)}
      {...props}
    />
  );
}

export { Checkbox };
