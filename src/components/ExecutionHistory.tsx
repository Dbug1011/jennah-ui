import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Job as BackendJob } from "@/gen/proto/jennah_pb";

function getStatusInfo(status: string): {
  className: string;
  label: string;
} {
  const statusMap: Record<string, { className: string; label: string }> = {
    RUNNING: {
      className:
        "bg-blue-50 text-sm text-blue-700 dark:bg-blue-950 dark:text-blue-300",
      label: "Running",
    },
    COMPLETED: {
      className:
        "bg-green-50 text-sm text-green-700 dark:bg-green-950 dark:text-green-300",
      label: "Completed",
    },
    PENDING: {
      className:
        "bg-sky-50 text-sm text-sky-700 dark:bg-sky-950 dark:text-sky-300",
      label: "Pending",
    },
    SCHEDULED: {
      className:
        "bg-purple-50 text-sm text-purple-700 dark:bg-purple-950 dark:text-purple-300",
      label: "Scheduled",
    },
    FAILED: {
      className:
        "bg-red-50 text-sm text-red-700 dark:bg-red-950 dark:text-red-300",
      label: "Failed",
    },
    CANCELLED: {
      className:
        "bg-red-50 text-sm text-red-700 dark:bg-red-950 dark:text-red-300",
      label: "Cancelled",
    },
  };

  return statusMap[status] || statusMap.PENDING;
}

type SortField = "status" | "name" | "createdAt" | "tenantId" | "updatedAt";
type SortOrder = "asc" | "desc";

interface ExecutionHistoryProps {
  jobs: BackendJob[];
}

export function ExecutionHistory({ jobs }: ExecutionHistoryProps) {
  const navigate = useNavigate();
  const [sortField, setSortField] = useState<SortField>("updatedAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const handleView = (jobId: string) => {
    navigate(`/jobs/${jobId}`);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  const sortedJobs = useMemo(() => {
    const sorted = [...jobs].sort((a, b) => {
      let aVal: any;
      let bVal: any;

      switch (sortField) {
        case "status":
          aVal = a.status?.toLowerCase() || "";
          bVal = b.status?.toLowerCase() || "";
          break;
        case "name":
          aVal = a.name?.toLowerCase() || "";
          bVal = b.name?.toLowerCase() || "";
          break;
        case "createdAt":
          aVal = new Date(a.createdAt || 0).getTime();
          bVal = new Date(b.createdAt || 0).getTime();
          break;
        case "updatedAt":
          aVal = new Date(a.updatedAt || 0).getTime();
          bVal = new Date(b.updatedAt || 0).getTime();
          break;
        case "tenantId":
          aVal = a.tenantId?.toLowerCase() || "";
          bVal = b.tenantId?.toLowerCase() || "";
          break;
        default:
          return 0;
      }

      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [jobs, sortField, sortOrder]);

  const SortableHeader = ({
    field,
    label,
    sortable = true,
  }: {
    field: SortField;
    label: string;
    sortable?: boolean;
  }) => (
    <TableHead
      className={`px-6 py-4 text-xs font-semibold text-gray-600 text-left ${
        sortable ? "cursor-pointer hover:bg-gray-50" : ""
      }`}
      onClick={() => sortable && handleSort(field)}
    >
      <div className="flex items-center gap-2">
        {label}
        {sortable && (
          <span className="text-gray-400 text-xs">
            {sortField === field ? (sortOrder === "asc" ? "▲" : "▼") : "↕"}
          </span>
        )}
      </div>
    </TableHead>
  );

  if (jobs.length === 0) {
    return (
      <div>
        <h1 className="text-3xl md:text-4xl font-semibold text-black mb-8 leading-tight">
          Execution History
        </h1>
        <div className="rounded-2xl border border-gray-100 overflow-hidden bg-white p-8 text-center">
          <p className="text-gray-500">No jobs found</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-semibold text-black mb-8 leading-tight">
        Execution History
      </h1>
      <div className="rounded-2xl border border-gray-100 overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-100 bg-white hover:bg-white">
              <SortableHeader field="status" label="Status" />
              <SortableHeader field="name" label="Job Name" />
              <TableHead className="px-6 py-4 text-xs font-semibold text-gray-600 text-left">
                Run ID
              </TableHead>
              <SortableHeader field="tenantId" label="Project" />
              <SortableHeader field="updatedAt" label="Last Run" />
              <TableHead className="px-6 py-4 text-xs font-semibold text-gray-600 text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedJobs.map((job) => (
              <TableRow
                key={job.jobId}
                className="border-b border-gray-100 hover:bg-gray-50/40 transition-colors"
              >
                <TableCell className="px-6 py-4 text-sm">
                  <Badge className={getStatusInfo(job.status).className}>
                    {getStatusInfo(job.status).label}
                  </Badge>
                </TableCell>
                <TableCell className="px-6 py-4 text-sm font-medium text-black">
                  {job.name || "Unnamed Job"}
                </TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-600">
                  {job.jobId.slice(-8)}
                </TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-600">
                  {job.tenantId}
                </TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-600">
                  {formatDate(job.updatedAt || job.createdAt)}
                </TableCell>
                <TableCell className="px-6 py-4 text-sm text-right">
                  <button
                    onClick={() =>
                      job.status?.toLowerCase() === "completed" &&
                      handleView(job.jobId)
                    }
                    disabled={job.status?.toLowerCase() !== "completed"}
                    className={`font-medium text-xs transition-colors ${
                      job.status?.toLowerCase() === "completed"
                        ? "text-gray-600 hover:text-black cursor-pointer"
                        : "text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {job.status?.toLowerCase() === "running"
                      ? "Stop"
                      : job.status?.toLowerCase() === "completed"
                        ? "View"
                        : "Retry"}
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
