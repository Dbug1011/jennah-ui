import { Link, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

// COMPONENTS
import { JobsCard } from "@/components/JobsCard";
import { SearchBar } from "@/components/SearchBar";
import { NavigationBar } from "../components/NavigationBar";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import { ExecutionHistory } from "@/components/ExecutionHistory";
import { AccountSection } from "@/components/AccountSection";
import {
  getProjectById,
  getJobsByProjectId,
  type Project,
  type Job,
} from "@/data/sampleData";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

// INTERFACES
interface JobWithMetadata extends Job {
  workloadName: string;
  projectName: string;
}

interface ExecutionHistoryItem {
  id: string;
  status: "Running" | "Completed" | "Failed";
  jobName: string;
  jobId: string;
  runId: string;
  user: string;
  duration: string;
}

export default function ViewProjectPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | undefined>(undefined);
  const [jobs, setJobs] = useState<Job[]>([]);
  const location = useLocation();

  useEffect(() => {
    if (projectId) {
      const currentProject = getProjectById(projectId);
      setProject(currentProject);

      if (currentProject) {
        const projectJobs = getJobsByProjectId(projectId);
        setJobs(projectJobs);
      }
    }
  }, [projectId, location.key]);

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <NavigationBar />
        <main className="px-8 md:px-40 py-20 grow">
          <h1 className="text-3xl font-semibold text-black">
            Project not found
          </h1>
          <Link to="/projects">
            <Button>Back to Projects</Button>
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <NavigationBar />
      <main className="px-8 md:px-40 py-20 grow">
        <div className="mb-20">
          <Link
            to="/projects"
            className="text-blue-600 hover:text-blue-800 font-medium mb-4 inline-block"
          >
            <ChevronLeftIcon className="w-4 h-4 inline mr-2" />
            Back to Projects
          </Link>
          <h1 className="text-5xl md:text-6xl font-semibold text-black mb-4 leading-tight">
            {project.name}
          </h1>
          <p className="text-xl text-gray-600 font-light">
            View jobs associated with this project.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-8 mb-20">
          {jobs.length > 0 ? (
            jobs.map((job) => <JobsCard key={job.id} job={job as any} />)
          ) : (
            <p className="text-gray-500 col-span-full">
              No jobs found for this project.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
