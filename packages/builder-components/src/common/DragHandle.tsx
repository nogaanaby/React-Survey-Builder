import * as React from "react";
import { GripVertical } from "lucide-react";
import { cn } from "@survey/shared";

interface DragHandleProps {
  attributes?: Record<string, unknown>;
  listeners?: Record<string, unknown>;
  className?: string;
}

export function DragHandle({ attributes, listeners, className }: DragHandleProps) {
  return (
    <button
      type="button"
      {...attributes}
      {...listeners}
      className={cn(
        "cursor-grab hover:bg-muted p-1 rounded transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-ring",
        className
      )}
    >
      <GripVertical className="h-5 w-5 text-muted-foreground" />
    </button>
  );
}
