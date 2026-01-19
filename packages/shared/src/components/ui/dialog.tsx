import * as React from "react";
import { Dialog as PrimeDialog } from "primereact/dialog";
import type { DialogProps as PrimeDialogProps } from "primereact/dialog";
import { cn } from "../../utils";

interface DialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DialogContext = React.createContext<DialogContextValue>({
  open: false,
  onOpenChange: () => {},
});

export interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

function Dialog({ open = false, onOpenChange = () => {}, children }: DialogProps) {
  return (
    <DialogContext.Provider value={{ open, onOpenChange }}>
      {children}
    </DialogContext.Provider>
  );
}

function DialogTrigger({ children, asChild }: { children?: React.ReactNode; asChild?: boolean }) {
  const { onOpenChange } = React.useContext(DialogContext);
  
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onClick: () => onOpenChange(true),
    });
  }
  
  return (
    <button onClick={() => onOpenChange(true)}>
      {children}
    </button>
  );
}

function DialogPortal({ children }: { children?: React.ReactNode }) {
  return <>{children}</>;
}

function DialogClose({ children, asChild }: { children?: React.ReactNode; asChild?: boolean }) {
  const { onOpenChange } = React.useContext(DialogContext);
  
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onClick: () => onOpenChange(false),
    });
  }
  
  return (
    <button onClick={() => onOpenChange(false)}>
      {children}
    </button>
  );
}

function DialogOverlay({ className }: { className?: string }) {
  return null; // PrimeReact handles overlay internally
}

export interface DialogContentProps {
  children?: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
}

function DialogContent({ children, className, showCloseButton = true }: DialogContentProps) {
  const { open, onOpenChange } = React.useContext(DialogContext);
  
  // Extract header and footer from children
  let header: React.ReactNode = null;
  let footer: React.ReactNode = null;
  const otherChildren: React.ReactNode[] = [];
  
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type === DialogHeader) {
        header = child;
      } else if (child.type === DialogFooter) {
        footer = child;
      } else {
        otherChildren.push(child);
      }
    } else {
      otherChildren.push(child);
    }
  });

  return (
    <PrimeDialog
      visible={open}
      onHide={() => onOpenChange(false)}
      header={header}
      footer={footer}
      closable={showCloseButton}
      className={cn("w-full max-w-lg", className)}
      modal
      draggable={false}
    >
      {otherChildren}
    </PrimeDialog>
  );
}

function DialogHeader({ className, children }: { className?: string; children?: React.ReactNode }) {
  return <div className={cn("flex flex-col gap-1", className)}>{children}</div>;
}

function DialogFooter({ className, children }: { className?: string; children?: React.ReactNode }) {
  return <div className={cn("flex justify-end gap-2", className)}>{children}</div>;
}

function DialogTitle({ className, children }: { className?: string; children?: React.ReactNode }) {
  return <span className={cn("text-lg font-semibold", className)}>{children}</span>;
}

function DialogDescription({ className, children }: { className?: string; children?: React.ReactNode }) {
  return <p className={cn("text-sm text-gray-500", className)}>{children}</p>;
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
