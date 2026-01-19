import * as React from "react";
import { Dropdown } from "primereact/dropdown";
import type { DropdownProps } from "primereact/dropdown";
import { cn } from "../../utils";

interface SelectContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
}

const SelectContext = React.createContext<SelectContextValue>({});

export interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children?: React.ReactNode;
  disabled?: boolean;
}

function Select({ value, onValueChange, children, disabled }: SelectProps) {
  return (
    <SelectContext.Provider value={{ value, onValueChange }}>
      {children}
    </SelectContext.Provider>
  );
}

export interface SelectTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

function SelectTrigger({ className, children }: SelectTriggerProps) {
  return <>{children}</>;
}

export interface SelectValueProps {
  placeholder?: string;
}

function SelectValue({ placeholder }: SelectValueProps) {
  const context = React.useContext(SelectContext);
  return <>{context.value || placeholder}</>;
}

export interface SelectContentProps {
  children?: React.ReactNode;
}

function SelectContent({ children }: SelectContentProps) {
  return <>{children}</>;
}

export interface SelectItemProps {
  value: string;
  children?: React.ReactNode;
}

function SelectItem({ value, children }: SelectItemProps) {
  return null; // Items are handled by the Dropdown options
}

function SelectGroup({ children }: { children?: React.ReactNode }) {
  return <>{children}</>;
}

function SelectLabel({ children }: { children?: React.ReactNode }) {
  return <>{children}</>;
}

function SelectSeparator() {
  return null;
}

function SelectScrollUpButton() {
  return null;
}

function SelectScrollDownButton() {
  return null;
}

// Main dropdown component for easier use
export interface SimpleSelectProps extends Omit<DropdownProps, "onChange"> {
  onValueChange?: (value: string) => void;
}

function SimpleSelect({ 
  className, 
  value, 
  onValueChange, 
  options,
  placeholder,
  ...props 
}: SimpleSelectProps) {
  return (
    <Dropdown
      value={value}
      onChange={(e) => onValueChange?.(e.value)}
      options={options}
      placeholder={placeholder}
      className={cn("w-full", className)}
      {...props}
    />
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  SimpleSelect,
};
