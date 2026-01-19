import * as React from "react";
import { Slider as PrimeSlider } from "primereact/slider";
import type { SliderProps as PrimeSliderProps } from "primereact/slider";
import { cn } from "../../utils";

export interface SliderProps extends Omit<PrimeSliderProps, "value" | "onChange"> {
  value?: number[];
  onValueChange?: (value: number[]) => void;
  defaultValue?: number[];
}

function Slider({ 
  className, 
  value, 
  onValueChange, 
  defaultValue,
  min = 0,
  max = 100,
  ...props 
}: SliderProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue?.[0] ?? min);
  const currentValue = value?.[0] ?? internalValue;

  const handleChange = (e: { value: number | [number, number] }) => {
    const newValue = Array.isArray(e.value) ? e.value[0] : e.value;
    setInternalValue(newValue);
    onValueChange?.([newValue]);
  };

  return (
    <PrimeSlider
      value={currentValue}
      onChange={handleChange}
      min={min}
      max={max}
      className={cn("w-full", className)}
      {...props}
    />
  );
}

export { Slider };
