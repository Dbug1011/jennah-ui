import { Link } from "react-router-dom";
import { NavigationBar } from "../components/NavigationBar";
import { ProjectCard } from "@/components/ProjectCard";
import { AccountSection } from "@/components/AccountSection";
import { SearchBar } from "@/components/SearchBar";
import { SAMPLE_PROJECTS } from "@/data/sampleData";

export default function Projects() {
  const projects = SAMPLE_PROJECTS;

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
        <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-8 mb-20">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        {/* <AccountSection /> */}
      </main>
    </div>
  );
}
