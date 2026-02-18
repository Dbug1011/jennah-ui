import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ExecutionHistoryItem {
  id: string;
  status: "running" | "completed" | "failed";
  jobName: string;
  runId: string;
  user: string;
  duration: string;
}

interface ExecutionHistoryProps {
  history: ExecutionHistoryItem[];
}

export function ExecutionHistory({ history }: ExecutionHistoryProps) {
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
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      execution.status === "running"
                        ? "bg-blue-50 text-blue-700"
                        : execution.status === "completed"
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                    }`}
                  >
                    {execution.status.charAt(0).toUpperCase() +
                      execution.status.slice(1)}
                  </span>
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
                  <button className="text-gray-600 hover:text-black transition-colors font-medium text-xs">
                    {execution.status === "running"
                      ? "Stop"
                      : execution.status === "completed"
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
