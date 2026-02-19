import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import {
  SAMPLE_JOBS,
  SAMPLE_PROJECTS,
  updateProject,
  type Project,
} from "@/data/sampleData";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface JobFormItem {
  id: string;
  name: string;
  existingProject?: string;
}

interface EditProjectFormProps {
  project?: Project;
}

export function EditProjectForm({ project }: EditProjectFormProps) {
  const navigate = useNavigate();
  const sampleJobsData: JobFormItem[] = SAMPLE_JOBS.map((job) => ({
    id: job.id,
    name: job.workloadName,
    existingProject: job.projectName,
  }));

  const [projectName, setProjectName] = useState(project?.name || "");
  const [selectedJobs, setSelectedJobs] = useState<string[]>(
    project?.jobs || [],
  );
  const [projectDirectory, setProjectDirectory] = useState(project?.id || "");

  const toggleJob = (jobId: string) => {
    setSelectedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId],
    );
  };

  const handleSubmit = () => {
    console.log("EditProjectForm handleSubmit called", {
      project: project?.id,
      projectName,
      projectDirectory,
      selectedJobs,
    });
    if (!project || !projectName.trim() || !projectDirectory) {
      console.warn("Form validation failed", {
        project: !!project,
        projectName: projectName.trim(),
        projectDirectory,
      });
      return;
    }

    console.log("Calling updateProject...");
    updateProject(project.id, {
      name: projectName,
      jobs: selectedJobs,
    });
    console.log("UpdateProject complete, navigating...");
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

      <div>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">Select Jobs</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Choose which jobs to include in this project.
          </p>
        </div>
        <div className="bg-card rounded-lg border p-6">
          <div className="space-y-4">
            {sampleJobsData.map((job) => {
              const isIncluded = !!job.existingProject;
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
                      {job.name}
                    </label>
                  </div>
                  {isIncluded && job.existingProject !== project?.name && (
                    <Badge className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                      Already Included in another project
                    </Badge>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          Jobs already included in another project cannot be added.
        </p>
      </div>

      {/* Submit Section */}
      <div className="flex gap-4 pt-4">
        <Button
          onClick={handleSubmit}
          disabled={
            !projectName.trim() ||
            !projectDirectory ||
            selectedJobs.length === 0
          }
          size="lg"
          className="px-8"
        >
          {project ? "Update Project" : "Create Project"}
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
