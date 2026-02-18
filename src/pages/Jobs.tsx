import { useEffect, useState } from "react";
//import { Link } from "react-router-dom";

// HOOKS
import { useListJobs } from "@/api/hooks/useListJobs";

// COMPONENTS
import { JobsCard } from "@/components/JobsCard";
import { SearchBar } from "@/components/SearchBar";
import { NavigationBar } from "../components/NavigationBar";
import { ExecutionHistory } from "@/components/ExecutionHistory";
import { AccountSection } from "@/components/AccountSection";

// UI Interface (what JobsCard expects)
interface UiJob {
  id: string;
  name: string;
  status: "healthy" | "warning" | "failed";
  quotaUsed: number;
  running: number;
  failed: number;
}

interface ExecutionHistoryItem {
  id: string;
  status: "running" | "completed" | "failed";
  jobName: string;
  runId: string;
  user: string;
  duration: string;
}

export default function Jobs() {
  const { fetchJobs, jobs: backendJobs, loading, error } = useListJobs();
  const [uiJobs, setUiJobs] = useState<UiJob[]>([]);

  // Fetch jobs on component mount
  useEffect(() => {
    fetchJobs();
  }, []);

  // Transform backend data to UI format
  useEffect(() => {
    if (backendJobs && backendJobs.length > 0) {
      const mappedJobs: UiJob[] = backendJobs.map((bJob) => ({
        // Map backend jobId to UI id
        id: bJob.jobId,
        
        // Use imageUri as name (since backend doesn't provide job name)
        name: bJob.imageUri || "Untitled Job",
        
        // Map backend status to UI status
        status: 
          bJob.status === "RUNNING" || bJob.status === "COMPLETED" 
            ? "healthy" 
            : bJob.status === "PENDING"
            ? "warning"
            : "failed",
        
        // Default values (backend doesn't provide these metrics yet)
        quotaUsed: 0,
        running: bJob.status === "RUNNING" ? 1 : 0,
        failed: bJob.status === "FAILED" ? 1 : 0,
      }));
      setUiJobs(mappedJobs);
    }
  }, [backendJobs]);

  // Sample execution history data (keep mock until backend supports it)
  const executionHistory: ExecutionHistoryItem[] = [
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

        {/* Loading and Error States */}
        {loading && (
          <div className="text-center py-10">
            <p className="text-gray-600">Loading jobs from Gateway...</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Job Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {!loading && uiJobs.length === 0 && !error && (
            <div className="col-span-2 text-center py-10">
              <p className="text-gray-500">No jobs found. Submit your first job to get started!</p>
            </div>
          )}
          
          {!loading && uiJobs.map((job) => (
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
