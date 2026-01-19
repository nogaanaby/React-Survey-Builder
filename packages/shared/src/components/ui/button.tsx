import * as React from "react";
import { Button as PrimeButton } from "primereact/button";
import type { ButtonProps as PrimeButtonProps } from "primereact/button";
import { cn } from "../../utils";

export interface ButtonProps extends Omit<PrimeButtonProps, "size"> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const variantMap: Record<string, { severity?: "success" | "info" | "warn" | "danger" | "help" | "secondary" | "contrast"; outlined?: boolean; text?: boolean; link?: boolean }> = {
  default: { severity: "success" },
  destructive: { severity: "danger" },
  outline: { severity: "secondary", outlined: true },
  secondary: { severity: "secondary" },
  ghost: { text: true },
  link: { link: true },
};

const sizeMap: Record<string, "small" | "large" | undefined> = {
  default: undefined,
  sm: "small",
  lg: "large",
  icon: "small",
};

function Button({
  className,
  variant = "default",
  size = "default",
  children,
  ...props
}: ButtonProps) {
  const variantProps = variantMap[variant] || variantMap.default;
  const primeSize = sizeMap[size];

  return (
    <PrimeButton
      {...variantProps}
      size={primeSize}
      className={cn(
        size === "icon" && "p-button-icon-only w-9 h-9",
        className
      )}
      {...props}
    >
      {children}
    </PrimeButton>
  );
}

export { Button };
