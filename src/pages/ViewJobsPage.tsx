import { NavigationBar } from "@/components/NavigationBar";
import { AccountSection } from "@/components/AccountSection";
import { ViewJobForm } from "@/components/ViewJobForm";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getJobById } from "@/data/sampleData";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { Job } from "@/data/sampleData";

export default function ViewJob() {
  const { jobId } = useParams<{ jobId: string }>();
  const [job, setJob] = useState<Job | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("ViewJobsPage: Fetching job with ID:", jobId);
    const fetchedJob = getJobById(jobId || "");
    console.log("ViewJobsPage: Fetched job:", fetchedJob);
    setJob(fetchedJob);
  }, [jobId]);

  const handleBack = () => {
    navigate(-1);
  };

  if (!job) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <NavigationBar />
        <main className="px-8 md:px-40 py-20 grow">
          <h1 className="text-3xl font-semibold text-black">Job not found</h1>
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
            {job.workloadName}
          </h1>
          <p className="text-xl text-gray-600 font-light">
            View and manage your job configuration
          </p>
        </div>
        <div className="mb-20">
          <ViewJobForm
            jobId={jobId}
            jobName={job.workloadName}
            jobID={job.jobId}
            containerLink={job.containerLink}
            projectDirectory={job.projectName}
            selectedResource={job.resources}
            duration={job.duration}
            envVars={job.envVars}
            status={job.status}
            onBack={handleBack}
          />
        </div>
        {/* <AccountSection /> */}
      </main>
    </div>
  );
}
