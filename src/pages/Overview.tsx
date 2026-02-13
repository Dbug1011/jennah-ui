import { Link } from "react-router-dom";
import JennahLogo from '../assets/images/LogoBlack.png';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon  from '@mui/icons-material/Tune';
import MoreVertIcon from '@mui/icons-material/MoreVert';
interface Project {
  id: string;
  name: string;
  status: "healthy" | "warning" | "failed";
  quotaUsed: number;
  running: number;
  failed: number;
}

export default function Overview() {
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
    <div className="min-h-screen bg-white">
      {/* Navigation */}
    <nav className="px-6 md:px-28 py-7  border-[#767676] bg-[#EDEDED]">
        <div className="flex items-center justify-between">
          <img src={JennahLogo} alt="Jennah Logo" className="h-10" />
          <div className="flex items-center gap-6 md:gap-8">
            <Link
              to="/"
              className="text-base md:text-lg font-semibold text-[#082A46] hover:text-gray-700 transition-colors"
            >
              Projects
            </Link>
            <Link
              to="/jobs"
              className="text-base md:text-lg text-black hover:font-semibold transition-all"
            >
              Jobs
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="px-6 mt-10 md:px-28 py-8">
        {/* Page Title */}
        <h1 className="text-3xl md:text-5xl font-normal text-text-secondary mb-8 md:mb-11">
          All Projects
        </h1>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10 md:mb-11">
          <div className="flex-1 relative">
            <div className="flex items-center gap-3 px-5 py-4 rounded-[31px] border-1  border-[#767676] border-border-input bg-white hover:bg-[#EDEDED] transition-colors ">
              <SearchIcon className="w-8 h-8 text-text-placeholder flex-shrink-0" />
              <input
                type="text"
                placeholder="Search Projects"
                className="flex-1 bg-transparent border-none outline-none text-lg text-text-placeholder  placeholder:text-text-placeholder"
              />
            </div>
          </div>

          <button className="w-14 h-14 sm:w-auto sm:h-auto flex items-center justify-center p-2 rounded-md border border-[#888888] bg-white hover:bg-gray-50 transition-colors hover:bg-[#EDEDED] transition-colors ">
            <TuneIcon className="w-8 h-8 text-gray-600" />
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-8 rounded-[17px] border-1   bg-white hover:bg-[#EDEDED] transition-colors hover:shadow-md transition-shadow  hover:border-[#767676]"
            >
              <div className="flex flex-col gap-1.5">
                <h3 className="text-2xl font-semibold text-black mb-1">
                  {project.name}
                </h3>

                <div className="flex items-center gap-1 text-sm">
                  <span className="text-healthy text-base leading-none">●</span>
                  <span className="text-[#151615]">Healthy</span>
                </div>

                <div className="mt-2 space-y-0 text-sm leading-tight">
                  <div className="text-black">
                    <span className="font-semibold">Quota: </span>
                    <span className="font-normal">{project.quotaUsed}% used</span>
                  </div>
                  <div className="text-black">
                    <span className="font-semibold">Running:</span>
                    <span className="font-normal"> {project.running}</span>
                  </div>
                  <div className="text-black">
                    <span className="font-semibold">Failed: </span>
                    <span className="font-normal">{project.failed}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Account Section */}
        <div className="mt-auto pt-0 md:pt-40 sm:pt-10">
          <div className="max-w-xs">
            <p className="text-xs1 font-semibold text-black/54 tracking-[0.25px] mb-4 uppercase">
              YOUR ACCOUNT
            </p>
            <div className="flex items-center gap-4">
              <div className="w-[53px] h-[53px] rounded-full bg-[#D9D9D9] flex-shrink-0" />
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-black mb-0.5">
                  Juan Dela Cruz
                </h4>
                <p className="text-xs font-medium text-black/78">
                  cruzjuandela@gmail.com
                </p>
              </div>
              <button className="flex-shrink-0 hover:bg-gray-100 rounded p-1 transition-colors">
                <MoreVertIcon className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
