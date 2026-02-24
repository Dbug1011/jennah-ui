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
import { useListJobs } from "@/api/hooks/useListJobs";
import { useGetCurrentTenant } from "@/api/hooks/useGetCurrentTenant";


// INTERFACES
interface JobWithMetadata {
  $typeName: string;
  jobId: string;
  id: string;
  tenantId: string;
  imageUri: string;
  workloadName: string;
  projectName: string;
  status: string;
  createdAt: string;
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
  const [executionHistory] = useState<ExecutionHistoryItem[]>([]);
  const { fetchJobs, jobs: backendJobs, loading, error } = useListJobs();
  const { getCurrentTenant, tenant } = useGetCurrentTenant();

  useEffect(() => {
    getCurrentTenant();
    fetchJobs();
  }, []);

  // Filter to only show jobs belonging to the current tenant (client-side safety net)
  const filteredJobs = tenant
    ? (backendJobs || []).filter((j: any) => j.tenantId === tenant.tenantId)
    : (backendJobs || []);

  // Map backend jobs to UI format
  const jobs: JobWithMetadata[] = filteredJobs.map((job: any) => ({
    $typeName: "JobCardJob",
    jobId: job.jobId,
    id: job.jobId,
    tenantId: job.tenantId || "",
    imageUri: job.imageUri || "",
    workloadName: job.imageUri || job.jobId, // use imageUri as name
    projectName: job.tenantId || "",
    status: job.status || "PENDING",
    createdAt: job.createdAt || "",
  }));

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

        {loading && (
          <div className="text-center py-10">
            <p className="text-gray-500">Loading jobs...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-8 mb-20">
          {!loading && jobs.length === 0 && !error && (
            <div className="col-span-2 text-center py-10">
              <p className="text-gray-500">No jobs found. Submit your first job to get started!</p>
            </div>
          )}
          {jobs.map((job) => (
            <JobsCard
              key={job.jobId}
              job={job as any}
              onCancelled={() => fetchJobs()}
              onDeleted={() => fetchJobs()}
            />
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
