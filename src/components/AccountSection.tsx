import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

export function AccountSection() {
  const [open, setOpen] = useState(false);
  return (
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
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button className="shrink-0 p-3 hover:bg-gray-100 rounded-full transition-colors">
              <MoreVertIcon className="w-5 h-5 text-gray-600" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-40" align="end">
            <button
              onClick={() => {
                console.log("Logout clicked");
                setOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
            >
              Logout
            </button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
