import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import HomeScreen from "./pages/HomeScreenPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Projects from "./pages/ProjectsPage";
import Jobs from "./pages/JobsPage";
import CreateJobPage from "./pages/CreateJobPage";
import ViewProject from "./pages/ViewProjectsPage";
import EditJobPage from "./pages/EditJobsPage";
import ViewJob from "./pages/ViewJobsPage";
import CreateProjectsPage from "./pages/CreateProjectsPage";
import EditProjectsPage from "./pages/EditProjectsPage";

function App() {
  console.log("App component rendering");
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route
              path="/projects"
              element={
                <ProtectedRoute>
                  <Projects />
                </ProtectedRoute>
              }
            />
            <Route
              path="/projects/:projectId"
              element={
                <ProtectedRoute>
                  <ViewProject />
                </ProtectedRoute>
              }
            />
            <Route
              path="/projects/create"
              element={
                <ProtectedRoute>
                  <CreateProjectsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/projects/:projectId/edit"
              element={
                <ProtectedRoute>
                  <EditProjectsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/jobs"
              element={
                <ProtectedRoute>
                  <Jobs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/jobs/create"
              element={
                <ProtectedRoute>
                  <CreateJobPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/jobs/:jobId"
              element={
                <ProtectedRoute>
                  <ViewJob />
                </ProtectedRoute>
              }
            />
            <Route
              path="/jobs/:jobId/edit"
              element={
                <ProtectedRoute>
                  <EditJobPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
