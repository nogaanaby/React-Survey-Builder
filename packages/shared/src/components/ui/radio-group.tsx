import * as React from "react";
import { RadioButton } from "primereact/radiobutton";
import type { RadioButtonProps } from "primereact/radiobutton";
import { cn } from "../../utils";

interface RadioGroupContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue>({});

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
}

function RadioGroup({
  className,
  value,
  onValueChange,
  name,
  disabled,
  children,
  ...props
}: RadioGroupProps) {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange, name, disabled }}>
      <div
        role="radiogroup"
        className={cn("grid gap-2", className)}
        {...props}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

export interface RadioGroupItemProps extends Omit<RadioButtonProps, "checked" | "onChange"> {
  value: string;
}

function RadioGroupItem({ className, value, ...props }: RadioGroupItemProps) {
  const context = React.useContext(RadioGroupContext);

  return (
    <RadioButton
      inputId={value}
      name={context.name}
      value={value}
      checked={context.value === value}
      onChange={(e) => context.onValueChange?.(e.value)}
      disabled={context.disabled || props.disabled}
      className={cn(className)}
      {...props}
    />
  );
}

export { RadioGroup, RadioGroupItem };
