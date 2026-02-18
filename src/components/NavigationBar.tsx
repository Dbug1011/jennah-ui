import JennahLogo from "../assets/images/LogoBlack.png";
import { Link, useLocation } from "react-router-dom";

export function NavigationBar() {
  const location = useLocation();
  const pathname = location.pathname.replace(/\/$/, "") || "/";
  const boldNav =
    "text-sm font-bold text-black hover:text-gray-700 transition-colors";
  const normalNav =
    "text-sm font-normal text-grey-600 hover:text-black transition-colors";
  return (
    <nav className="px-8 md:px-40 py-6 bg-white border-b border-gray-100">
      <div className="flex items-center justify-between">
        <a href="/">
          <img src={JennahLogo} alt="Jennah Logo" className="h-7" />
        </a>
        <div className="flex items-center gap-12">
          <Link
            to="/projects"
            className={pathname === "/projects" ? boldNav : normalNav}
          >
            Projects
          </Link>
          <Link
            to="/projects/overview"
            className={
              pathname === "/projects/overview" || pathname === "/jobs"
                ? boldNav
                : normalNav
            }
          >
            Jobs
          </Link>
        </div>
      </div>
    </nav>
  );
}
