import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import TuneIcon from "@mui/icons-material/Tune";
import AddIcon from "@mui/icons-material/Add";
import { Search } from "lucide-react";

export function SearchBar() {
  const location = useLocation();
  const pathname = location.pathname.replace(/\/$/, "") || "/";
  return (
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
        className="h-12 rounded-full border-gray-300 bg-white hover:bg-gray-50 font-normal text-sm transition-colors"
      >
        <TuneIcon className="w-4 h-4 text-gray-600" />
        Filter
      </Button>
      <div className="h-12 flex items-center justify-center rounded-full px-6 bg-black hover:bg-gray-900 text-white font-normal text-sm transition-colors">
        <Link
          to={pathname === "/projects" ? "/projects/create" : "/jobs/create"}
        >
          <Button size="sm" className="bg-transparent">
            <AddIcon className="w-4 h-4" />
            New {pathname === "/projects" ? "Project" : "Job"}
          </Button>
        </Link>
      </div>
    </div>
  );
}
