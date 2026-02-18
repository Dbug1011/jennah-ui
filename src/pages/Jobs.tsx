import { Link } from "react-router-dom";

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
// INTERFACES
interface Jobs {
  id: string;
  name: string;
  status: "healthy" | "warning" | "failed";
  quotaUsed: number;
  running: number;
  failed: number;
}

interface ExecutionHistory {
  id: string;
  status: "running" | "completed" | "failed";
  jobName: string;
  runId: string;
  user: string;
  duration: string;
}

export default function Jobs() {
  // Sample project data
  const jobs: Jobs[] = [
    {
      id: "1",
      name: "Job Name",
      status: "healthy",
      quotaUsed: 45,
      running: 3,
      failed: 0,
    },
    {
      id: "2",
      name: "Job Name",
      status: "healthy",
      quotaUsed: 45,
      running: 3,
      failed: 0,
    },
    {
      id: "3",
      name: "Job Name",
      status: "healthy",
      quotaUsed: 45,
      running: 3,
      failed: 0,
    },
  ];

  // Sample execution history data
  const executionHistory: ExecutionHistory[] = [
    {
      id: "1",
      status: "running",
      jobName: "Nightly Train Scheduler",
      runId: "#train-20260209-x92",
      user: "user.k",
      duration: "45s",
    },
    {
      id: "2",
      status: "completed",
      jobName: "Data Pipeline",
      runId: "#pipe-20260208-k4l",
      user: "user.j",
      duration: "2m 15s",
    },
    {
      id: "3",
      status: "failed",
      jobName: "Model Training",
      runId: "#train-20260208-p8x",
      user: "user.m",
      duration: "1m 32s",
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <NavigationBar />
      <main className="px-8 md:px-40 py-20 grow">
        <div className="mb-20">
          <h1 className="text-5xl md:text-6xl font-semibold text-black mb-4 leading-tight">
            Jobs
          </h1>
          <p className="text-xl text-gray-600 font-light">
            Monitor and manage your workflows
          </p>
        </div>
        <SearchBar />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {jobs.map((job) => (
            <JobsCard key={job.id} job={job} />
          ))}
        </div>
        <div className="mb-20">
          <ExecutionHistory history={executionHistory} />
        </div>
        <AccountSection />
      </main>
    </div>
  );
}
