import { Link } from "react-router-dom";
import JennahLogo from "../assets/images/LogoBlack.png";
import TuneIcon from "@mui/icons-material/Tune";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import IncompleteCircleIcon from "@mui/icons-material/IncompleteCircle";
import { Button } from "@/components/ui/button";
import HighlightAltIcon from "@mui/icons-material/HighlightAlt";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import RunningWithErrorsIcon from "@mui/icons-material/RunningWithErrors";
import GppGoodIcon from "@mui/icons-material/GppGood";
import AddIcon from "@mui/icons-material/Add";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";

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
      {/* Navigation */}
      <nav className="px-8 md:px-40 py-6 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between">
          <a href="/">
            <img src={JennahLogo} alt="Jennah Logo" className="h-7" />
          </a>
          <div className="flex items-center gap-12">
            <Link
              to="/"
              className="text-sm font-normal text-black hover:text-gray-700 transition-colors"
            >
              Projects
            </Link>
            <Link
              to="/jobs"
              className="text-sm font-normal text-gray-600 hover:text-black transition-colors"
            >
              Jobs
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="px-8 md:px-40 py-20 grow">
        {/* Hero Section */}
        <div className="mb-20">
          <h1 className="text-5xl md:text-6xl font-semibold text-black mb-4 leading-tight">
            Projects
          </h1>
          <p className="text-xl text-gray-600 font-light">
            Build and manage your projects effortlessly
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <InputGroup className="flex flex-row h-12 rounded-full items-center border border-gray-200 bg-gray-50 hover:border-gray-300 transition-colors">
            <InputGroupInput
              placeholder="Search"
              className="text-sm bg-transparent"
            />
            <InputGroupAddon className="pr-4">
              <Search className="w-5 h-5 text-gray-500" />
            </InputGroupAddon>
          </InputGroup>

          <Button
            variant="outline"
            size="sm"
            className="h-12 rounded-full px-6 border-gray-300 bg-white hover:bg-gray-50 font-normal text-sm transition-colors"
          >
            <TuneIcon className="w-4 h-4 text-gray-600 mr-2" />
            Filter
          </Button>
          <Button
            size="sm"
            className="h-12 rounded-full px-6 bg-black hover:bg-gray-900 text-white font-normal text-sm transition-colors"
          >
            <AddIcon className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="w-full hover:shadow-md transition-all duration-300 border border-gray-100 bg-white overflow-hidden rounded-2xl"
            >
              <CardHeader className="pt-8 pb-4 px-8">
                <div className="flex items-start justify-between mb-6">
                  <CardTitle className="text-2xl font-semibold text-black flex items-center gap-3">
                    {project.name}
                    {project.status === "healthy" && (
                      <GppGoodIcon
                        sx={{ color: "#34C759", fontSize: "1.5rem" }}
                      />
                    )}
                  </CardTitle>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Quota Usage</span>
                    <span className="text-sm font-semibold text-black">
                      {project.quotaUsed}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Running Jobs</span>
                    <span className="text-sm font-semibold text-black">
                      {project.running}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Failed Jobs</span>
                    <span className="text-sm font-semibold text-black">
                      {project.failed}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardFooter className="bg-white p-8 w-full border-t border-gray-100">
                <Button
                  size="lg"
                  className="w-full py-6 rounded-xl bg-black hover:bg-gray-900 text-white font-normal transition-colors"
                >
                  <HighlightAltIcon className="w-4 h-4 mr-2" />
                  View Project
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Account Section */}
        <div className="pt-16 border-t border-gray-100">
          <p className="text-xs font-medium text-gray-500 tracking-widest mb-8 uppercase">
            Account
          </p>
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-linear-to-br from-black to-gray-700 shrink-0 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">JD</span>
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-black mb-1">
                Juan Dela Cruz
              </h4>
              <p className="text-sm text-gray-600">cruzjuandela@gmail.com</p>
            </div>
            <button className="shrink-0 p-3 hover:bg-gray-100 rounded-full transition-colors">
              <MoreVertIcon className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
