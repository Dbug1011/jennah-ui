import initialData from "./initialData.json";

// Sample data interfaces and constants
export interface EnvVar {
  id: string;
  key: string;
  value: string;
  error?: string;
}

export interface JobExecution {
  id: string;
  runId: string;
  status:
    | "RUNNING"
    | "COMPLETED"
    | "PENDING"
    | "SCHEDULED"
    | "FAILED"
    | "CANCELLED";
  startTime: string;
  endTime?: string;
  duration: string;
  user: string;
}

export interface Job {
  id: string;
  jobId: string;
  workloadName: string;
  containerLink: string;
  projectName: string;
  status:
    | "RUNNING"
    | "COMPLETED"
    | "PENDING"
    | "SCHEDULED"
    | "FAILED"
    | "CANCELLED";
  createdAt: string;
  last_run: string;
  resources: {
    name: string;
    vcpu: number;
    ram: string;
  };
  duration: number;
  envVars: EnvVar[];
  executions: JobExecution[];
}

export interface Project {
  id: string;
  name: string;
  status: "healthy" | "warning" | "failed";
  quotaUsed: number;
  running: number;
  failed: number;
  jobs: string[];
}

// In-memory storage
let SAMPLE_PROJECTS: Project[] = [];
let SAMPLE_JOBS: Job[] = [];
let initialized = false;

// Initialize on first load
function initializeOnce() {
  if (!initialized) {
    const storedProjects = localStorage.getItem("jennah_projects");
    SAMPLE_PROJECTS = storedProjects
      ? JSON.parse(storedProjects)
      : [...initialData.projects];

    const storedJobs = localStorage.getItem("jennah_jobs");
    SAMPLE_JOBS = storedJobs ? JSON.parse(storedJobs) : [...initialData.jobs];

    initialized = true;
  }
}

// Call initialization on module load
initializeOnce();

// Persistence functions
function saveProjects() {
  localStorage.setItem("jennah_projects", JSON.stringify(SAMPLE_PROJECTS));
}

function saveJobs() {
  localStorage.setItem("jennah_jobs", JSON.stringify(SAMPLE_JOBS));
}

// Reload from localStorage
function reloadProjects() {
  const stored = localStorage.getItem("jennah_projects");
  if (stored) {
    const loaded = JSON.parse(stored);
    // Clear and replace contents instead of reassigning
    SAMPLE_PROJECTS.length = 0;
    SAMPLE_PROJECTS.push(...loaded);
  }
}

function reloadJobs() {
  const stored = localStorage.getItem("jennah_jobs");
  if (stored) {
    const loaded = JSON.parse(stored);
    // Clear and replace contents instead of reassigning
    SAMPLE_JOBS.length = 0;
    SAMPLE_JOBS.push(...loaded);
  }
}

// Export accessor functions that always return current data
export function getProjects(): Project[] {
  reloadProjects();
  return SAMPLE_PROJECTS;
}

export function getJobs(): Job[] {
  reloadJobs();
  return SAMPLE_JOBS;
}

// Helper function to get job by ID
export function getJobById(jobId: string): Job | undefined {
  reloadJobs();
  return SAMPLE_JOBS.find((job) => job.id === jobId);
}

// Helper function to get project by ID
export function getProjectById(projectId: string): Project | undefined {
  reloadProjects();
  return SAMPLE_PROJECTS.find((project) => project.id === projectId);
}

// Helper function to get jobs by project ID
export function getJobsByProjectId(projectId: string): Job[] {
  reloadJobs();
  reloadProjects();
  const project = SAMPLE_PROJECTS.find((p) => p.id === projectId);
  if (!project) return [];
  return SAMPLE_JOBS.filter((job) => project.jobs.includes(job.id));
}

// Helper function to get job executions
export function getJobExecutions(jobId: string): JobExecution[] {
  reloadJobs();
  const job = SAMPLE_JOBS.find((j) => j.id === jobId);
  return job?.executions || [];
}

// Database-like CRUD operations for Projects
export function createProject(name: string, jobIds: string[]): Project {
  reloadProjects();
  const newProject: Project = {
    id: `project-${Date.now()}`,
    name,
    status: "healthy",
    quotaUsed: 0,
    running: 0,
    failed: 0,
    jobs: jobIds,
  };
  SAMPLE_PROJECTS.push(newProject);
  saveProjects();
  return newProject;
}

export function updateProject(
  projectId: string,
  updates: Partial<Project>,
): Project | undefined {
  reloadProjects();
  const project = SAMPLE_PROJECTS.find((p) => p.id === projectId);
  if (!project) {
    console.error(`Project with id ${projectId} not found`);
    return undefined;
  }

  console.log(`Updating project ${projectId}:`, updates);
  Object.assign(project, updates);
  saveProjects();
  console.log(`Project updated:`, project);
  return project;
}

export function deleteProject(projectId: string): boolean {
  reloadProjects();
  const index = SAMPLE_PROJECTS.findIndex((p) => p.id === projectId);
  if (index === -1) return false;

  SAMPLE_PROJECTS.splice(index, 1);
  saveProjects();
  return true;
}

// Database-like CRUD operations for Jobs
export function createJob(
  workloadName: string,
  containerLink: string,
  projectName: string,
  resources: { name: string; vcpu: number; ram: string },
  duration: number,
  envVars: EnvVar[],
): Job {
  reloadJobs();
  const newJob: Job = {
    id: workloadName.toLowerCase(),
    jobId: `${workloadName.toLowerCase()}-${Math.floor(Math.random() * 10000)}`,
    workloadName,
    containerLink,
    projectName,
    status: "PENDING",
    createdAt: new Date().toISOString(),
    last_run: new Date().toISOString(),
    resources,
    duration,
    envVars,
    executions: [],
  };
  SAMPLE_JOBS.push(newJob);
  saveJobs();
  return newJob;
}

export function updateJob(
  jobId: string,
  updates: Partial<Job>,
): Job | undefined {
  reloadJobs();
  const jobIndex = SAMPLE_JOBS.findIndex((j) => j.id === jobId);
  if (jobIndex === -1) {
    console.error(`Job with id ${jobId} not found`);
    return undefined;
  }

  const job = SAMPLE_JOBS[jobIndex];
  console.log(`Updating job ${jobId}:`, updates);
  Object.assign(job, updates);
  SAMPLE_JOBS[jobIndex] = job;
  saveJobs();
  console.log(`Job updated:`, job);
  return job;
}

export function deleteJob(jobId: string): boolean {
  reloadJobs();
  reloadProjects();
  const index = SAMPLE_JOBS.findIndex((j) => j.id === jobId);
  if (index === -1) return false;

  // Also remove from projects
  SAMPLE_PROJECTS.forEach((project) => {
    const jobIndex = project.jobs.indexOf(jobId);
    if (jobIndex !== -1) {
      project.jobs.splice(jobIndex, 1);
    }
  });

  SAMPLE_JOBS.splice(index, 1);
  saveJobs();
  saveProjects();
  return true;
}

// Legacy exports for backward compatibility
export { SAMPLE_PROJECTS, SAMPLE_JOBS };
