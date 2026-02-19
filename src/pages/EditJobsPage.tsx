// Components
import { Input } from "@/components/ui/input";
import { NavigationBar } from "@/components/NavigationBar";
import { EditJobForm } from "@/components/EditJobForm";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useParams, Link } from "react-router-dom";
import { getJobById } from "@/data/sampleData";
import { Button } from "@/components/ui/button";

export default function EditJobPage() {
  const { jobId } = useParams<{ jobId: string }>();
  const job = getJobById(jobId || "");

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
            Edit Job: {job.workloadName}
          </h1>
          <p className="text-xl text-gray-600 font-light">
            Configure and update your containerized workload.
          </p>
          <Link
            to="/jobs"
            className="text-blue-600 hover:text-blue-800 font-medium mt-4 inline-block"
          >
            <ChevronLeftIcon className="w-4 h-4 inline mr-2" />
            Back to Jobs
          </Link>
        </div>
        <EditJobForm job={job} />
      </main>
    </div>
  );
}
