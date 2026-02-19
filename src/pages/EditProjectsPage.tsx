// Components
import { Input } from "@/components/ui/input";
import { NavigationBar } from "@/components/NavigationBar";
import { NewJobForm } from "@/components/NewJobForm";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { EditProjectForm } from "@/components/EditProjectForm";
import { useParams, Link } from "react-router-dom";
import { getProjectById } from "@/data/sampleData";
import { Button } from "@/components/ui/button";

export default function EditProjectsPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const project = getProjectById(projectId || "");

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
          <h1 className="text-5xl md:text-6xl font-semibold text-black mb-4 leading-tight">
            Edit Project: {project.name}
          </h1>
          <p className="text-xl text-gray-600 font-light">
            Configure and manage your project.
          </p>
          <Link
            to="/projects"
            className="text-blue-600 hover:text-blue-800 font-medium mt-4 inline-block"
          >
            <ChevronLeftIcon className="w-4 h-4 inline mr-2" />
            Back to Projects
          </Link>
        </div>
        <EditProjectForm project={project} />
      </main>
    </div>
  );
}
