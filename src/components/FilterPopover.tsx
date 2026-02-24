import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import TuneIcon from "@mui/icons-material/Tune";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, X } from "lucide-react";

export interface FilterOptions {
  statuses: string[];
  projectNames: string[];
}

interface FilterPopoverProps {
  onFilterChange: (filters: FilterOptions) => void;
  availableProjects: string[];
}

const STATUS_OPTIONS = [
  { value: "RUNNING", label: "Running" },
  { value: "COMPLETED", label: "Completed" },
  { value: "PENDING", label: "Pending" },
  { value: "SCHEDULED", label: "Scheduled" },
  { value: "FAILED", label: "Failed" },
  { value: "CANCELLED", label: "Cancelled" },
];

export function FilterPopover({
  onFilterChange,
  availableProjects,
}: FilterPopoverProps) {
  const [open, setOpen] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);

  const handleStatusToggle = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  const handleProjectToggle = (project: string) => {
    setSelectedProjects((prev) =>
      prev.includes(project)
        ? prev.filter((p) => p !== project)
        : [...prev, project]
    );
  };

  const handleApplyFilters = () => {
    onFilterChange({
      statuses: selectedStatuses,
      projectNames: selectedProjects,
    });
    setOpen(false);
  };

  const handleResetFilters = () => {
    setSelectedStatuses([]);
    setSelectedProjects([]);
    onFilterChange({
      statuses: [],
      projectNames: [],
    });
  };

  const totalSelected = selectedStatuses.length + selectedProjects.length;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-12 rounded-full border-gray-300 bg-white hover:bg-gray-50 font-normal text-sm transition-colors relative"
        >
          <TuneIcon className="w-4 h-4 text-gray-600" />
          Filter
          {totalSelected > 0 && (
            <Badge className="ml-2 bg-blue-100 text-blue-700 hover:bg-blue-100">
              {totalSelected}
            </Badge>
          )}
          <ChevronDown className="w-4 h-4 ml-1 text-gray-600" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm">Filter Jobs</h3>
            {totalSelected > 0 && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                Reset
              </button>
            )}
          </div>

          {/* Status Filter */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-700 uppercase">
              Status
            </label>
            <div className="space-y-2">
              {STATUS_OPTIONS.map((status) => (
                <label
                  key={status.value}
                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  <input
                    type="checkbox"
                    checked={selectedStatuses.includes(status.value)}
                    onChange={() => handleStatusToggle(status.value)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{status.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Project Filter */}
          {availableProjects.length > 0 && (
            <>
              <div className="border-t pt-4" />
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-700 uppercase">
                  Project
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {availableProjects.map((project) => (
                    <label
                      key={project}
                      className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                    >
                      <input
                        type="checkbox"
                        checked={selectedProjects.includes(project)}
                        onChange={() => handleProjectToggle(project)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700 truncate">
                        {project || "No Project"}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Active Filters Display */}
          {totalSelected > 0 && (
            <div className="bg-blue-50 rounded p-3 space-y-2">
              {selectedStatuses.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-blue-900 mb-1">
                    Status:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {selectedStatuses.map((status) => (
                      <Badge
                        key={status}
                        variant="secondary"
                        className="text-xs"
                      >
                        {STATUS_OPTIONS.find((s) => s.value === status)?.label}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {selectedProjects.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-blue-900 mb-1">
                    Projects:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {selectedProjects.map((project) => (
                      <Badge key={project} variant="secondary" className="text-xs">
                        {project}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2 border-t">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              className="flex-1"
              onClick={handleApplyFilters}
            >
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
