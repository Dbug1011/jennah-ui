import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

// COMPONENTS
import { JobsCard } from "@/components/JobsCard";
import { SearchBar } from "@/components/SearchBar";
import { NavigationBar } from "../components/NavigationBar";
// import { Button } from "@/components/ui/button";
// import {
//   InputGroup,
//   InputGroupAddon,
//   InputGroupInput,
// } from "@/components/ui/input-group";

import { ExecutionHistory } from "@/components/ExecutionHistory";
// import { AccountSection } from "@/components/AccountSection";
import { getJobs } from "@/data/sampleData";
import type { Job } from "@/data/sampleData";
import { useListJobs } from "@/api/hooks/useListJobs";


// INTERFACES
interface JobWithMetadata extends Job {
  $typeName: string;
  tenantId: string;
  imageUri: string;
  workloadName: string;
  projectName: string;
}

interface ExecutionHistoryItem {
  id: string;
  status:
    | "Running"
    | "Completed"
    | "Failed"
    | "Pending"
    | "Scheduled"
    | "Cancelled";
  jobName: string;
  jobId: string;
  runId: string;
  user: string;
  duration: string;
}

export default function Jobs() {
  const [jobs, setJobs] = useState<JobWithMetadata[]>([]);
  const [executionHistory, setExecutionHistory] = useState<
    ExecutionHistoryItem[]
  >([]);
  const location = useLocation();
  const { fetchJobs, loading, error } = useListJobs();

  useEffect(() => {
    console.log("🔵 Jobs page mounted, useEffect running...");
    
    // Call the API hook
    fetchJobs()
      .then((response) => {
        console.log("🟢 API Response received:", response);
      })
      .catch((err) => {
        console.error("🔴 API Error:", err);
      });
    const allJobs = getJobs();
    // Convert sample jobs to JobWithMetadata format
    const formattedJobs: JobWithMetadata[] = allJobs.map(
      (job) =>
        ({
          $typeName: "JobCardJob",
          jobId: job.jobId,
          tenantId: "tenant-1",
          imageUri: job.containerLink,
          status: job.status as any,
          createdAt: job.createdAt,
          workloadName: job.workloadName,
          projectName: job.projectName,
          // Store the id for routing
          id: job.id,
        }) as any as JobWithMetadata,
    );
    setJobs(formattedJobs);

    // Build execution history from sample data
    const history: ExecutionHistoryItem[] = allJobs.flatMap((job) =>
      job.executions.map((execution) => ({
        id: execution.id,
        status: (execution.status === "RUNNING"
          ? "Running"
          : execution.status === "COMPLETED"
            ? "Completed"
            : execution.status === "PENDING"
              ? "Pending"
              : execution.status === "SCHEDULED"
                ? "Scheduled"
                : execution.status === "FAILED"
                  ? "Failed"
                  : "Cancelled") as
          | "Running"
          | "Completed"
          | "Failed"
          | "Pending"
          | "Scheduled"
          | "Cancelled",
        jobName: job.workloadName,
        jobId: job.id,
        runId: execution.runId,
        user: execution.user,
        duration: execution.duration,
      })),
    );
    setExecutionHistory(history);
  }, [location.key]);

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
          
          {/* DEBUG BUTTON - Remove after testing */}
         
          
          {loading && <p style={{ color: 'blue', marginTop: '10px' }}>⏳ Loading jobs from API...</p>}
          {error && <p style={{ color: 'red', marginTop: '10px' }}>❌ Error: {error}</p>}
        </div>
        <SearchBar />
        <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-8 mb-20">
          {jobs.map((job) => (
            <JobsCard key={job.jobId} job={job as any} />
          ))}
        </div>
        <div className="mb-20">
          <ExecutionHistory history={executionHistory} />
        </div>
        {/* <AccountSection /> */}
      </main>
    </div>
  );
}
