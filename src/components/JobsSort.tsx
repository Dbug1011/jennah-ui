import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface JobsSortProps {
  sortField: string;
  sortOrder: "asc" | "desc";
  onSortChange: (field: string) => void;
  onSortOrderToggle: () => void;
}

export function JobsSort({
  sortField,
  sortOrder,
  onSortChange,
  onSortOrderToggle,
}: JobsSortProps) {
  return (
    <div className="flex gap-4 mb-8">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-600">Sort by:</span>
        <Select value={sortField} onValueChange={onSortChange}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="createdAt">Created Date</SelectItem>
            <SelectItem value="status">Status</SelectItem>
            <SelectItem value="workloadName">Workload Name</SelectItem>
            <SelectItem value="projectName">Project</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={onSortOrderToggle}
        className="gap-2 py-4.5"
      >
        {sortOrder === "asc" ? "↑ Ascending" : "↓ Descending"}
      </Button>
    </div>
  );
}
