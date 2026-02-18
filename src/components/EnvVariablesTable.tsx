import React from "react";
import { Plus, X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export type EnvVar = {
  id: string; // Unique ID for React rendering (not sent to API)
  key: string;
  value: string;
  error?: string; // Optional error message (e.g., "Inaccessible")
};

interface EnvVariablesTableProps {
  items: EnvVar[];
  setItems: (items: EnvVar[]) => void;
  className?: string;
}

export function EnvVariablesTable({
  items,
  setItems,
  className,
}: EnvVariablesTableProps) {
  console.log("EnvVariablesTable rendered with props:", { items, className });
  const handleAdd = () => {
    setItems([...items, { id: crypto.randomUUID(), key: "", value: "" }]);
  };

  const handleRemove = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleChange = (
    id: string,
    field: "key" | "value",
    newValue: string,
  ) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, [field]: newValue, error: undefined }
          : item,
      ),
    );
  };

  return (
    <div className={cn("grid gap-4", className)}>
      <h3 className="text-lg font-semibold leading-none tracking-tight">
        Environment Variables
      </h3>

      <div className="rounded-md border bg-card">
        {/* Header */}
        <div className="grid grid-cols-12 gap-4 px-4 py-2.5">
          <div className="col-span-5">
            <p className="text-sm font-medium text-muted-foreground">Key</p>
          </div>
          <div className="col-span-6">
            <p className="text-sm font-medium text-muted-foreground">Value</p>
          </div>
        </div>

        <div className="border-b" />

        {/* Rows */}
        {items.map((item, index) => (
          <React.Fragment key={item.id}>
            <div className="grid grid-cols-12 gap-4 items-start px-4 py-3 group">
              {/* Key Input */}
              <div className="col-span-5">
                <Input
                  placeholder="e.g. DB_HOST"
                  value={item.key}
                  onChange={(e) => handleChange(item.id, "key", e.target.value)}
                  className="bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>

              {/* Value Input */}
              <div className="col-span-6">
                <div className="relative">
                  <Input
                    placeholder="Value"
                    value={item.value}
                    onChange={(e) =>
                      handleChange(item.id, "value", e.target.value)
                    }
                    className={cn(
                      "bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0",
                      item.error && "text-destructive",
                    )}
                  />
                  {item.error && (
                    <div className="absolute inset-y-0 right-0 flex items-center gap-1.5 pointer-events-none">
                      <AlertCircle className="h-4 w-4 text-destructive" />
                    </div>
                  )}
                </div>
              </div>

              {/* Delete Action */}
              <div className="col-span-1 flex items-center justify-end">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemove(item.id)}
                  className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                  <span className="sr-only">Remove variable</span>
                </Button>
              </div>
            </div>
            {index < items.length - 1 && <div className="border-b" />}
          </React.Fragment>
        ))}

        {/* Empty State */}
        {items.length === 0 && (
          <div className="h-24 flex items-center justify-center">
            <p className="text-sm text-muted-foreground">
              No environment variables configured.
            </p>
          </div>
        )}
      </div>

      {/* Add Button */}
      <div className="flex justify-start">
        <Button
          variant="ghost"
          onClick={handleAdd}
          className="text-primary hover:text-primary hover:bg-muted pl-2 gap-1 h-auto py-2"
        >
          <Plus className="h-4 w-4" />
          Add variable
        </Button>
      </div>
    </div>
  );
}
