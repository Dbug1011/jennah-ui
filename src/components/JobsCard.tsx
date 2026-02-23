import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SettingsIcon from "@mui/icons-material/Settings";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { Button } from "@/components/ui/button";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import type { Job } from "@/gen/proto/jennah_pb";

interface JobCardJob extends Job {
  id: any;
  workloadName: string;
  projectName: string;
}

interface JobsCardProps {
  job: JobCardJob;
}

// Helper function to extract image name and tag from URI
function parseImageUri(uri: string): { name: string; fullPath: string } {
  const parts = uri.split("/");
  const name = parts[parts.length - 1];
  return { name, fullPath: uri };
}

// Helper function to format relative time
function formatRelativeTime(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return date.toLocaleDateString();
}

// Helper function to shorten UUID
function shortenJobId(jobId: string): string {
  return jobId.substring(0, 8) + "..." + jobId.substring(jobId.length - 4);
}

// Helper function to get status info
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

export function JobsCard({ job }: JobsCardProps) {
  const [relativeTime, setRelativeTime] = useState("");
  const { name, fullPath } = useMemo(
    () => parseImageUri(job.imageUri),
    [job.imageUri],
  );
  const statusInfo = useMemo(() => getStatusInfo(job.status), [job.status]);
  const shortJobId = useMemo(() => shortenJobId(job.jobId), [job.jobId]);
  const location = useLocation();
  const showProject = location.pathname.includes("projects/view");

  useEffect(() => {
    // Update relative time whenever job data changes
    setRelativeTime(formatRelativeTime(job.createdAt));
  }, [job.createdAt]);

  const handleCopyJobId = () => {
    navigator.clipboard.writeText(job.jobId);
  };

  return (
    <Card className="w-full hover:shadow-md transition-all duration-300 border border-gray-100 bg-white overflow-hidden rounded-2xl">
      <CardHeader className="pt-8 pb-4 px-8">
        {/* Workload Name */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-black">
            {job.workloadName}
          </h3>
        </div>

        {/* Status Badge */}
        <div className="flex items-start justify-between mb-6">
          <Badge className={statusInfo.className}>{statusInfo.label}</Badge>
        </div>

        {/* Content Rows */}
        <div className="space-y-4">
          {/* Project - Only show on projects/view page */}
          {showProject && (
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <span className="text-sm text-gray-600">Project</span>
              <span className="text-sm font-semibold text-black">
                {job.projectName}
              </span>
            </div>
          )}

          {/* Workload / Image */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <span className="text-sm text-gray-600">Workload / Image</span>
            <Popover>
              <PopoverTrigger asChild>
                <button className="text-sm font-semibold text-black hover:underline cursor-help">
                  {name}
                </button>
              </PopoverTrigger>
              <PopoverContent side="left" className="w-auto">
                <p className="text-xs text-gray-600 break-all">{fullPath}</p>
              </PopoverContent>
            </Popover>
          </div>

          {/* Job ID */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <span className="text-sm text-gray-600">Job ID</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-black">
                {shortJobId}
              </span>
              <button
                onClick={handleCopyJobId}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
                title="Copy full Job ID"
              >
                <FileCopyIcon sx={{ fontSize: "0.875rem", color: "#666" }} />
              </button>
            </div>
          </div>

          {/* Last Run */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Last Run</span>
            <span className="text-sm font-semibold text-black">
              {relativeTime}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardFooter className="flex gap-3 bg-white p-8 w-full border-t border-gray-100">
        <Link
          to={`/jobs/${job.id}`}
          className="flex-1 flex py-2 items-center justify-center rounded-xl bg-gray-100 border-0 hover:bg-gray-200 transition-colors"
        >
          <Button
            size="sm"
            className="bg-transparent text-black font-normal hover:bg-transparent"
          >
            <SettingsIcon className="w-4 h-4 mr-2" />
            View
          </Button>
        </Link>
        {/* <Button className="flex-1 flex items-center justify-center rounded-xl bg-black hover:bg-gray-900 text-white font-normal transition-colors py-6">
          <PlayArrowIcon className="w-4 h-4 mr-2" />
          Run
        </Button> */}
      </CardFooter>
    </Card>
  );
}
