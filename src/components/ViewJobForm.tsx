import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft } from "lucide-react";

interface EnvVar {
  id: string;
  key: string;
  value: string;
  error?: string;
}

interface ViewJobFormProps {
  jobId?: string;
  jobName?: string;
  jobID?: string;
  containerLink?: string;
  projectDirectory?: string;
  selectedResource?: {
    name: string;
    vcpu: number;
    ram: string;
  };
  duration?: number;
  envVars?: EnvVar[];
  status?:
    | "RUNNING"
    | "COMPLETED"
    | "PENDING"
    | "SCHEDULED"
    | "FAILED"
    | "CANCELLED";
  onBack?: () => void;
}

const statusMap: Record<string, { className: string; label: string }> = {
  RUNNING: {
    className: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    label: "Running",
  },
  COMPLETED: {
    className:
      "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
    label: "Completed",
  },
  PENDING: {
    className: "bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
    label: "Pending",
  },
  SCHEDULED: {
    className:
      "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
    label: "Scheduled",
  },
  FAILED: {
    className: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
    label: "Failed",
  },
  CANCELLED: {
    className: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
    label: "Cancelled",
  },
};

export function ViewJobForm({
  jobId,
  jobName,
  jobID,
  containerLink,
  projectDirectory,
  selectedResource,
  duration,
  envVars,
  status,
  onBack,
}: ViewJobFormProps) {
  const finalJobName = jobName;
  const finalJobID = jobID;
  const finalContainerLink = containerLink;
  const finalProjectDirectory = projectDirectory;
  const finalSelectedResource = selectedResource;
  const finalDuration = duration;
  const finalEnvVars = envVars;
  const finalStatus = status;
  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) return `${hours}h ${minutes}m ${secs}s`;
    if (minutes > 0) return `${minutes}m ${secs}s`;
    return `${secs}s`;
  };

  return (
    <div className="space-y-8 max-w-auto">
      {/* Header */}
      {/* <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-3xl font-semibold">{finalJobName}</h1>
            {finalStatus && (
              <Badge className={statusMap[finalStatus]?.className}>
                {statusMap[finalStatus]?.label}
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            View and manage your job configuration
          </p>
        </div>
        {onBack && (
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        )}
      </div> */}

      {/* Job Details Section */}
      <div>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">Job Details</h2>
        </div>
        <div className="space-y-6 bg-card rounded-lg border p-6">
          <div className="grid gap-2">
            <span className="text-xs font-medium text-muted-foreground uppercase">
              Job ID
            </span>
            <p className="text-base font-medium">{finalJobID}</p>
          </div>
          <div className="h-px bg-border" />
          <div className="grid gap-2">
            <span className="text-xs font-medium text-muted-foreground uppercase">
              Container Link
            </span>
            <p className="text-base font-medium break-all">
              {finalContainerLink}
            </p>
          </div>
          <div className="h-px bg-border" />
          <div className="grid gap-2">
            <span className="text-xs font-medium text-muted-foreground uppercase">
              Project Directory
            </span>
            <p className="text-base font-medium">{finalProjectDirectory}</p>
          </div>
        </div>
      </div>

      {/* Resources Section */}
      <div>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">Resources</h2>
        </div>
        <div className="rounded-lg border bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-semibold">Compute Size</TableHead>
                <TableHead className="text-right font-semibold">
                  vCPUs
                </TableHead>
                <TableHead className="text-right font-semibold">
                  Memory
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="hover:bg-transparent">
                <TableCell className="font-medium">
                  {finalSelectedResource?.name}
                </TableCell>
                <TableCell className="text-right">
                  {finalSelectedResource?.vcpu}
                </TableCell>
                <TableCell className="text-right">
                  {finalSelectedResource?.ram}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Configuration Section */}
      <div>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">Configuration</h2>
        </div>
        <div className="space-y-6">
          <div className="bg-card rounded-lg border p-6">
            <div className="grid gap-2">
              <span className="text-xs font-medium text-muted-foreground uppercase">
                Timeout Duration
              </span>
              <p className="text-base font-medium">
                {formatDuration(finalDuration || 0)}
              </p>
            </div>
          </div>
          <div className="rounded-lg border bg-card overflow-hidden">
            <div className="p-6 border-b">
              <h3 className="text-sm font-semibold">Environment Variables</h3>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="font-semibold">Key</TableHead>
                  <TableHead className="font-semibold">Value</TableHead>
                  <TableHead className="text-right font-semibold">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(finalEnvVars || []).map((envVar) => {
                  return (
                    <TableRow key={envVar.id}>
                      <TableCell className="font-medium">
                        {envVar.key}
                      </TableCell>
                      <TableCell className="text-muted-foreground break-all">
                        {envVar.value}
                      </TableCell>
                      <TableCell className="text-right">
                        {envVar.error ? (
                          <Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">
                            {envVar.error}
                          </Badge>
                        ) : (
                          <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                            Valid
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4">
        {onBack && (
          <Button size="lg" variant="outline" className="px-8" onClick={onBack}>
            Cancel
          </Button>
        )}
        {/* <Button size="lg" variant="outline" className="px-8" asChild>
          <Link to={`/jobs/${jobId}/edit`}>Edit</Link>
        </Button> */}
        {/* <Button size="lg" className="px-8">
          Run Job
        </Button> */}
      </div>
    </div>
  );
}
