import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import GppGoodIcon from "@mui/icons-material/GppGood";
import HighlightAltIcon from "@mui/icons-material/HighlightAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import { getJobsByProjectId } from "@/data/sampleData";
import { useEffect, useState } from "react";

interface Project {
  id: string;
  name: string;
  status: "healthy" | "warning" | "failed";
  quotaUsed: number;
  running: number;
  failed: number;
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [totalJobs, setTotalJobs] = useState(0);
  const [runningJobs, setRunningJobs] = useState(0);
  const [failedJobs, setFailedJobs] = useState(0);
  const [pendingJobs, setPendingJobs] = useState(0);
  const [scheduledJobs, setScheduledJobs] = useState(0);

  useEffect(() => {
    // Fetch job data on component mount and when project ID changes
    const jobs = getJobsByProjectId(project.id);
    setTotalJobs(jobs.length);
    setRunningJobs(jobs.filter((job) => job.status === "RUNNING").length);
    setFailedJobs(jobs.filter((job) => job.status === "FAILED").length);
    setPendingJobs(jobs.filter((job) => job.status === "PENDING").length);
    setScheduledJobs(jobs.filter((job) => job.status === "SCHEDULED").length);
  }, [project.id]);

  return (
    <Card className="w-full hover:shadow-md transition-all duration-300 border border-gray-100 bg-white overflow-hidden rounded-2xl">
      <CardHeader className="pt-8 pb-4 px-8">
        <div className="flex items-start justify-between mb-6">
          <CardTitle className="text-2xl font-semibold text-black flex items-center gap-3">
            {project.name}
            {project.status === "healthy" && (
              <GppGoodIcon sx={{ color: "#34C759", fontSize: "1.5rem" }} />
            )}
          </CardTitle>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <span className="text-sm text-gray-600">Quota Usage</span>
            <span className="text-sm font-semibold text-black">
              {project.quotaUsed}%
            </span>
          </div>
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <span className="text-sm text-gray-600">Total Jobs</span>
            <span className="text-sm font-semibold text-black">
              {totalJobs}
            </span>
          </div>
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <span className="text-sm text-gray-600">Running Jobs</span>
            <span className="text-sm font-semibold text-black">
              {runningJobs}
            </span>
          </div>
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <span className="text-sm text-gray-600">Pending Jobs</span>
            <span className="text-sm font-semibold text-black">
              {pendingJobs}
            </span>
          </div>
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <span className="text-sm text-gray-600">Scheduled Jobs</span>
            <span className="text-sm font-semibold text-black">
              {scheduledJobs}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Failed Jobs</span>
            <span className="text-sm font-semibold text-black">
              {failedJobs}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardFooter className="flex gap-3 bg-white p-8 w-full border-t border-gray-100">
        <Link
          to={`/projects/${project.id}/edit`}
          className="flex-1 flex items-center py-2 justify-center rounded-xl bg-gray-100 border-0 hover:bg-gray-200 transition-colors"
        >
          <Button
            size="sm"
            className="bg-transparent text-black font-normal hover:bg-transparent"
          >
            <SettingsIcon className="w-4 h-4 mr-2" />
            Edit Project
          </Button>
        </Link>
        <Link
          className="flex-1 flex items-center py-2 justify-center rounded-xl bg-black hover:bg-gray-900 text-white font-normal transition-colors"
          to={`/projects/${project.id}`}
        >
          <Button size="sm" className="bg-transparent">
            <HighlightAltIcon className="w-4 h-4 mr-2" />
            View Project
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
