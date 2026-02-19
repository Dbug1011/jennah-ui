import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { SAMPLE_JOBS, createProject } from "@/data/sampleData";
import { useNavigate } from "react-router-dom";

export function NewProjectForm() {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState("");
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);

  const toggleJob = (jobId: string) => {
    setSelectedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId],
    );
  };

  const handleSubmit = () => {
    if (!projectName.trim()) return;

    createProject(projectName, selectedJobs);
    navigate("/projects");
  };

  return (
    <div className="space-y-8 max-w-auto">
      {/* Project Name Section */}
      <div>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">Project Details</h2>
        </div>
        <div className="bg-card rounded-lg border p-6 space-y-6">
          <div className="grid gap-3">
            <Label htmlFor="project-name" className="text-sm font-medium">
              Project Name
            </Label>
            <Input
              id="project-name"
              placeholder="e.g., Data Analytics Platform"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="bg-background"
            />
            <p className="text-xs text-muted-foreground">
              Choose a unique, descriptive name for your project.
            </p>
          </div>
        </div>
      </div>

      {/* Jobs Checklist Section */}
      <div>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">Select Jobs</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Choose which jobs to include in this project.
          </p>
        </div>
        <div className="bg-card rounded-lg border p-6">
          <div className="space-y-4">
            {SAMPLE_JOBS.map((job) => {
              const isChecked = selectedJobs.includes(job.id);

              return (
                <div
                  key={job.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/30 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <input
                      type="checkbox"
                      id={`job-${job.id}`}
                      checked={isChecked}
                      onChange={() => toggleJob(job.id)}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                    <label
                      htmlFor={`job-${job.id}`}
                      className="text-sm font-medium cursor-pointer"
                    >
                      {job.workloadName}
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          Select the jobs you want to include in this project.
        </p>
      </div>

      {/* Submit Section */}
      <div className="flex gap-4 pt-4">
        <Button
          onClick={handleSubmit}
          disabled={!projectName.trim()}
          size="lg"
          className="px-8"
        >
          Create Project
        </Button>
        <Button
          onClick={() => navigate("/projects")}
          variant="outline"
          size="lg"
          className="px-8"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
