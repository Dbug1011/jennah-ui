import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import SettingsIcon from "@mui/icons-material/Settings";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Button } from "@/components/ui/button";
import GppGoodIcon from "@mui/icons-material/GppGood";

interface Job {
  id: string;
  name: string;
  status: "healthy" | "warning" | "failed";
  quotaUsed: number;
  running: number;
  failed: number;
}

interface JobsCardProps {
  job: Job;
}

export function JobsCard({ job }: JobsCardProps) {
  return (
    <Card className="w-full hover:shadow-md transition-all duration-300 border border-gray-100 bg-white overflow-hidden rounded-2xl">
      <CardHeader className="pt-8 pb-4 px-8">
        <div className="flex items-start justify-between mb-6">
          <CardTitle className="text-2xl font-semibold text-black flex items-center gap-3">
            {job.name}
            {job.status === "healthy" && (
              <GppGoodIcon sx={{ color: "#34C759", fontSize: "1.5rem" }} />
            )}
          </CardTitle>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <span className="text-sm text-gray-600">Quota Usage</span>
            <span className="text-sm font-semibold text-black">
              {job.quotaUsed}%
            </span>
          </div>
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <span className="text-sm text-gray-600">Running Jobs</span>
            <span className="text-sm font-semibold text-black">
              {job.running}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Failed Jobs</span>
            <span className="text-sm font-semibold text-black">
              {job.failed}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardFooter className="flex  gap-3 bg-white p-8 w-full border-t border-gray-100">
        <Button
          variant="outline"
          size="lg"
          className="flex-1 py-6 rounded-xl bg-gray-100 border-0 hover:bg-gray-200 text-black font-normal transition-colors"
        >
          <SettingsIcon className="w-4 h-4 mr-2" />
          Edit
        </Button>
        <Button
          size="lg"
          className="flex-1 py-6 rounded-xl bg-black hover:bg-gray-900 text-white font-normal transition-colors"
        >
          <PlayArrowIcon className="w-4 h-4 mr-2" />
          Run
        </Button>
      </CardFooter>
    </Card>
  );
}
