import { NavigationBar } from "@/components/NavigationBar";
import { ViewJobForm } from "@/components/ViewJobForm";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useGetJob } from "@/api/hooks/useGetJob";

export default function ViewJob() {
  const { jobId } = useParams<{ jobId: string }>();
  const { fetchJob, job, loading, error } = useGetJob();
  const navigate = useNavigate();

  useEffect(() => {
    if (jobId) fetchJob(jobId);
  }, [jobId]);

  const handleBack = () => navigate(-1);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <NavigationBar />
        <main className="px-8 md:px-40 py-20 grow">
          <p className="text-gray-500">Loading job...</p>
        </main>
      </div>
    );
  }

  if (error || (!loading && !job)) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <NavigationBar />
        <main className="px-8 md:px-40 py-20 grow">
          <h1 className="text-3xl font-semibold text-black mb-4">Job not found</h1>
          <p className="text-gray-500 mb-6">No job with ID <code className="font-mono bg-gray-100 px-1 rounded">{jobId}</code> was found.</p>
          <Link to="/jobs">
            <Button>Back to Jobs</Button>
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
          <h1 className="text-5xl md:text-6xl font-semibold text-black mb-4 leading-tight">
            {job!.name || job!.imageUri.split("/").pop()}
          </h1>
          <p className="text-xl text-gray-600 font-light">
            View and manage your job configuration
          </p>
        </div>
        <div className="mb-20">
          <ViewJobForm
            jobId={jobId}
            jobName={job!.name || job!.imageUri.split("/").pop()}
            jobID={job!.jobId}
            containerLink={job!.imageUri}
            projectDirectory={job!.tenantId}
            status={job!.status as any}
            createdAt={job!.createdAt}
            selectedResource={
              job!.machineType
                ? { name: job!.machineType, vcpu: 0, ram: job!.resourceProfile }
                : undefined
            }
            duration={0}
            envVars={(() => {
              try {
                const parsed = JSON.parse(job!.envVarsJson || "{}");
                return Object.entries(parsed).map(([key, value], i) => ({ id: String(i), key, value: String(value) }));
              } catch {
                return [];
              }
            })()}
            onBack={handleBack}
          />
        </div>
        {/* <AccountSection /> */}
      </main>
    </div>
  );
}
