import * as React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import type { TabViewProps, TabPanelProps } from "primereact/tabview";
import { cn } from "../../utils";

interface TabsContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextValue>({});

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

function Tabs({ 
  className, 
  defaultValue, 
  value, 
  onValueChange, 
  children,
  ...props 
}: TabsProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue || "");
  const currentValue = value ?? internalValue;
  
  const handleValueChange = (newValue: string) => {
    setInternalValue(newValue);
    onValueChange?.(newValue);
  };

  return (
    <TabsContext.Provider value={{ value: currentValue, onValueChange: handleValueChange }}>
      <div className={cn("w-full", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

function TabsList({ className, children, ...props }: TabsListProps) {
  return (
    <div 
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
}

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

function TabsTrigger({ className, value, children, ...props }: TabsTriggerProps) {
  const context = React.useContext(TabsContext);
  const isActive = context.value === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={() => context.onValueChange?.(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        isActive 
          ? "bg-white text-gray-900 shadow-sm" 
          : "hover:bg-gray-50 hover:text-gray-900",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

function TabsContent({ className, value, children, ...props }: TabsContentProps) {
  const context = React.useContext(TabsContext);
  
  if (context.value !== value) {
    return null;
  }

  return (
    <div
      role="tabpanel"
      className={cn("mt-2 ring-offset-white focus-visible:outline-none", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
