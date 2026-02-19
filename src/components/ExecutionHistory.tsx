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

const statusMap: Record<string, { className: string; label: string }> = {
  Running: {
    className: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    label: "Running",
  },
  Completed: {
    className:
      "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
    label: "Completed",
  },
  Pending: {
    className: "bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
    label: "Pending",
  },
  Scheduled: {
    className:
      "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
    label: "Scheduled",
  },
  Failed: {
    className: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
    label: "Failed",
  },
  Cancelled: {
    className: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
    label: "Cancelled",
  },
};

interface ExecutionHistoryItem {
  id: string;
  status:
    | "Running"
    | "Completed"
    | "Pending"
    | "Scheduled"
    | "Failed"
    | "Cancelled";
  jobName: string;
  jobId: string;
  runId: string;
  user: string;
  duration: string;
}

interface ExecutionHistoryProps {
  history: ExecutionHistoryItem[];
}

export function ExecutionHistory({ history }: ExecutionHistoryProps) {
  const navigate = useNavigate();

  const handleView = (jobId: string) => {
    navigate(`/jobs/${jobId}`);
  };

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-semibold text-black mb-8 leading-tight">
        Execution History
      </h1>
      <div className="rounded-2xl border border-gray-100 overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-100 bg-white hover:bg-white">
              <TableHead className="px-6 py-4 text-xs font-semibold text-gray-600 text-left">
                Status
              </TableHead>
              <TableHead className="px-6 py-4 text-xs font-semibold text-gray-600 text-left">
                Job Name
              </TableHead>
              <TableHead className="px-6 py-4 text-xs font-semibold text-gray-600 text-left">
                Run ID
              </TableHead>
              <TableHead className="px-6 py-4 text-xs font-semibold text-gray-600 text-left">
                User
              </TableHead>
              <TableHead className="px-6 py-4 text-xs font-semibold text-gray-600 text-left">
                Duration
              </TableHead>
              <TableHead className="px-6 py-4 text-xs font-semibold text-gray-600 text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((execution) => (
              <TableRow
                key={execution.id}
                className="border-b border-gray-100 hover:bg-gray-50/40 transition-colors"
              >
                <TableCell className="px-6 py-4 text-sm">
                  <Badge className={statusMap[execution.status]?.className}>
                    {statusMap[execution.status]?.label || execution.status}
                  </Badge>
                </TableCell>
                <TableCell className="px-6 py-4 text-sm font-medium text-black">
                  {execution.jobName}
                </TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-600">
                  {execution.runId}
                </TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-600">
                  {execution.user}
                </TableCell>
                <TableCell className="px-6 py-4 text-sm text-gray-600">
                  {execution.duration}
                </TableCell>
                <TableCell className="px-6 py-4 text-sm text-right">
                  <button
                    onClick={() =>
                      execution.status === "Completed" &&
                      handleView(execution.jobId)
                    }
                    disabled={execution.status !== "Completed"}
                    className={`font-medium text-xs transition-colors ${
                      execution.status === "Completed"
                        ? "text-gray-600 hover:text-black cursor-pointer"
                        : "text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {execution.status === "Running"
                      ? "Stop"
                      : execution.status === "Completed"
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
