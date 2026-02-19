// Components
import { Input } from "@/components/ui/input";
import { NavigationBar } from "@/components/NavigationBar";
import { NewJobForm } from "@/components/NewJobForm";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { NewProjectForm } from "@/components/NewProjectForm";
export default function CreateProjectsPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <NavigationBar />
      <main className="px-8 md:px-40 py-20 grow">
        <div className="mb-20">
          <h1 className="text-5xl md:text-6xl font-semibold text-black mb-4 leading-tight">
            Create New Project
          </h1>
          <p className="text-xl text-gray-600 font-light">
            Configure and deploy a new project.
          </p>
          <a
            href="/projects"
            className="text-blue-600 hover:text-blue-800 font-medium mt-4 inline-block"
          >
            <ChevronLeftIcon className="w-4 h-4 inline mr-2" />
            Back to Projects
          </a>
        </div>
        <NewProjectForm />
      </main>
    </div>
  );
}
