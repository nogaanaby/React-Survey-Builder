import * as React from "react";
import { Pencil } from "lucide-react";
import { Button, cn } from "@survey/shared";

interface EditButtonProps {
  onClick: () => void;
  className?: string;
  size?: "sm" | "default";
}

export function EditButton({ onClick, className, size = "default" }: EditButtonProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size={size === "sm" ? "icon-sm" : "icon"}
      className={cn(className)}
      onClick={onClick}
    >
      <Pencil className="h-4 w-4" />
    </Button>
  );
}
