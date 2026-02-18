import { Link } from "react-router-dom";
import { NavigationBar } from "../components/NavigationBar";
import { ProjectCard } from "@/components/ProjectCard";
import { AccountSection } from "@/components/AccountSection";
import { SearchBar } from "@/components/SearchBar";

interface Project {
  id: string;
  name: string;
  status: "healthy" | "warning" | "failed";
  quotaUsed: number;
  running: number;
  failed: number;
}

export default function Projects() {
  // Sample project data
  const projects: Project[] = [
    {
      id: "1",
      name: "Project Name",
      status: "healthy",
      quotaUsed: 45,
      running: 3,
      failed: 0,
    },
    {
      id: "2",
      name: "Project Name",
      status: "healthy",
      quotaUsed: 45,
      running: 3,
      failed: 0,
    },
    {
      id: "3",
      name: "Project Name",
      status: "healthy",
      quotaUsed: 45,
      running: 3,
      failed: 0,
    },
  ];

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <AccountSection />
      </main>
    </div>
  );
}
