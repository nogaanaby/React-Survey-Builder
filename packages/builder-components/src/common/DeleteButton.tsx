import * as React from "react";
import { Trash2 } from "lucide-react";
import { Button, cn } from "@survey/shared";

interface DeleteButtonProps {
  onClick: () => void;
  className?: string;
  size?: "sm" | "default";
}

export function DeleteButton({ onClick, className, size = "default" }: DeleteButtonProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size={size === "sm" ? "icon-sm" : "icon"}
      className={cn("text-destructive hover:text-destructive hover:bg-destructive/10", className)}
      onClick={onClick}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}
