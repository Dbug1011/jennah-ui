import { NavigationBar } from "../components/NavigationBar";
import { SearchBar } from "@/components/SearchBar";
import { useListJobs } from "@/api/hooks/useListJobs";
import { useEffect } from "react";

export default function Projects() {
  const { fetchJobs, jobs, loading, error } = useListJobs();

  useEffect(() => {
    fetchJobs();
  }, []);

  // Group jobs by tenantId to simulate "projects" until backend supports it
  const grouped = jobs.reduce(
    (acc, job) => {
      const key = job.tenantId || "unknown";
      if (!acc[key]) acc[key] = [];
      acc[key].push(job);
      return acc;
    },
    {} as Record<string, typeof jobs>,
  );

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <NavigationBar />
      <main className="px-8 md:px-40 py-20 grow">
        <div className="mb-20">
          <h1 className="text-5xl md:text-6xl font-semibold text-black mb-4 leading-tight">
            Projects
          </h1>
          <p className="text-xl text-gray-600 font-light">
            Build and manage your projects effortlessly
          </p>
        </div>
        <SearchBar />

        {/* Note: Projects are not yet in the backend — grouped by tenant for now */}
        {loading && (
          <div className="text-center py-10">
            <p className="text-gray-500">Loading...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {!loading && Object.keys(grouped).length === 0 && !error && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-2">No projects yet</p>
            <p className="text-gray-400 text-sm">
              Projects will appear here once jobs are submitted.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-8 mb-20">
          {Object.entries(grouped).map(([tenantId, tenantJobs]) => (
            <div
              key={tenantId}
              className="border border-gray-100 rounded-2xl p-8 bg-white hover:shadow-md transition-all duration-300"
            >
              <h3 className="text-lg font-semibold text-black mb-1">
                Tenant Workspace
              </h3>
              <p className="text-xs text-gray-400 mb-6 font-mono">{tenantId}</p>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Total Jobs</span>
                  <span className="font-semibold">{tenantJobs.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Running</span>
                  <span className="font-semibold text-blue-600">
                    {tenantJobs.filter((j) => j.status === "RUNNING").length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Completed</span>
                  <span className="font-semibold text-green-600">
                    {tenantJobs.filter((j) => j.status === "COMPLETED").length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Failed</span>
                  <span className="font-semibold text-red-600">
                    {tenantJobs.filter((j) => j.status === "FAILED").length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Pending</span>
                  <span className="font-semibold text-sky-600">
                    {tenantJobs.filter((j) => j.status === "PENDING").length}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
