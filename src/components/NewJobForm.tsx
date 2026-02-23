import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DurationSelector } from "./DurationSelector";
import { EnvVariablesTable } from "./EnvVariablesTable";
import type { EnvVar } from "./EnvVariablesTable";
import { useState } from "react";
import { SAMPLE_PROJECTS } from "@/data/sampleData"; // still used for project dropdown until backend supports it
import { useSubmitJob } from "@/api/hooks/useSubmitJob";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const resources = [
  {
    id: "small",
    name: "Small",
    desc: "For simple, short-running tasks",
    vcpu: 1,
    ram: "4 GB RAM",
  },
  {
    id: "medium",
    name: "Medium",
    desc: "For most standard workloads",
    vcpu: 4,
    ram: "16 GB RAM",
  },
  {
    id: "heavy",
    name: "Heavy",
    desc: "For demanding, high-performance jobs",
    vcpu: 16,
    ram: "64 GB RAM",
  },
  {
    id: "gpu",
    name: "GPU",
    desc: "For machine learning and parallel processing",
    vcpu: 8,
    ram: "4 GB RAM",
  },
];

export function NewJobForm() {
  const navigate = useNavigate();
  const { submitJob, loading, error } = useSubmitJob();
  const [jobName, setJobName] = useState("");
  const [containerLink, setContainerLink] = useState("");
  const [selected, setSelected] = useState("medium");
  const [duration, setDuration] = useState(0);
  const [project, setProject] = useState(SAMPLE_PROJECTS[0]?.name || "");
  const [envVars, setEnvVars] = useState<EnvVar[]>([]);

  const getResourceDetails = () => {
    const resourceMap: {
      [key: string]: { name: string; vcpu: number; ram: string };
    } = {
      small: { name: "Small", vcpu: 1, ram: "4 GB RAM" },
      medium: { name: "Medium", vcpu: 4, ram: "16 GB RAM" },
      heavy: { name: "Heavy", vcpu: 16, ram: "64 GB RAM" },
      gpu: { name: "GPU", vcpu: 8, ram: "4 GB RAM" },
    };
    return resourceMap[selected] || resourceMap["medium"];
  };

  const handleSubmit = async () => {
    if (!jobName.trim() || !containerLink.trim() || !project) return;

    try {
      // Build env vars map for the API
      const envVarsMap: Record<string, string> = {};
      envVars.forEach((ev) => {
        if (ev.key) envVarsMap[ev.key] = ev.value;
      });

      // Call the real Gateway API
      await submitJob({
        tenantId: project,
        imageUri: containerLink,
        envVars: envVarsMap,
      } as any);

      navigate("/jobs");
    } catch (err) {
      // error is already set by the hook
      console.error("Failed to submit job:", err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Job Details Section */}
      <div>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">Job Details</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Provide a unique name and container image for your job.
          </p>
        </div>
        <div className="space-y-6 bg-card rounded-lg border p-6">
          <div className="grid gap-2">
            <Label
              htmlFor="input-workload-name"
              className="text-sm font-medium"
            >
              Job Name
            </Label>
            <Input
              id="input-workload-name"
              placeholder="e.g., data-pipeline-v1"
              value={jobName}
              onChange={(e) => setJobName(e.target.value)}
              className="bg-background"
            />
            <p className="text-xs text-muted-foreground">
              Must be unique to this project.
            </p>
          </div>
          <div className="grid gap-2">
            <Label
              htmlFor="input-container-url"
              className="text-sm font-medium"
            >
              Container Link
            </Label>
            <Input
              id="input-container-url"
              placeholder="gcr.io/my-project/etl:latest"
              value={containerLink}
              onChange={(e) => setContainerLink(e.target.value)}
              className="bg-background"
            />
            <p className="text-xs text-muted-foreground">
              We recommend pinning a sha256 digest for security.
            </p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="project-select" className="text-sm font-medium">
              Project Directory
            </Label>
            <Select value={project} onValueChange={setProject}>
              <SelectTrigger
                id="project-select"
                className="w-full bg-background"
              >
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
              <SelectContent>
                {SAMPLE_PROJECTS.map((proj) => (
                  <SelectItem key={proj.id} value={proj.name}>
                    {proj.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Select the project directory for this job.
            </p>
          </div>
        </div>
      </div>

      {/* Resources Section */}
      <div>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">Resources</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Choose the compute and memory resources for this job.
          </p>
        </div>
        <div className="rounded-lg border bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[150px] font-semibold">
                  Compute Size
                </TableHead>
                <TableHead className="font-semibold">Description</TableHead>
                <TableHead className="text-right font-semibold">
                  vCPUs
                </TableHead>
                <TableHead className="text-right font-semibold">
                  Memory
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resources.map((item, index) => (
                <TableRow
                  key={item.id}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => setSelected(item.id)}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-4 w-4 rounded-full border flex items-center justify-center transition-colors ${
                          selected === item.id
                            ? "border-primary bg-primary"
                            : "border-muted-foreground"
                        }`}
                      >
                        {selected === item.id && (
                          <div className="h-2 w-2 rounded-full bg-background" />
                        )}
                      </div>
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {item.desc}
                  </TableCell>
                  <TableCell className="text-right">{item.vcpu}</TableCell>
                  <TableCell className="text-right">{item.ram}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Configuration Section */}
      <div>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">Configuration</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Set the timeout and environment variables for the job.
          </p>
        </div>
        <div className="space-y-6">
          <div className="bg-card rounded-lg border p-6">
            <DurationSelector
              value={duration}
              onChange={setDuration}
              className="m-0"
            />
          </div>
          <EnvVariablesTable items={envVars} setItems={setEnvVars} />
        </div>
      </div>

      {/* Submit Section */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
      <div className="flex w-auto pt-4">
        <Button
          onClick={handleSubmit}
          disabled={!jobName.trim() || !containerLink.trim() || !project || loading}
          size="lg"
          className="px-8"
        >
          {loading ? "Submitting..." : "Create Workload"} and Run
        </Button>
      </div>
    </div>
  );
}
