import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Background from "../assets/images/bg/2.png";
import MailIcon from "@mui/icons-material/Mail";
import { grey } from "@mui/material/colors";
import PasswordIcon from "@mui/icons-material/Password";
import AppHeader from "../components/AppHeader";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      navigate("/projects");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col font-sans relative"
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <AppHeader />
      <main className="flex-1 flex flex-col items-center justify-center z-[1] mt-10 max-[900px]:mt-0 max-[900px]:px-[10%]">
        <h1 className="text-[3.2rem] font-light text-white text-center mb-12 leading-[1.1] font-sans tracking-[-1px] [text-shadow:0_2px_16px_rgba(0,0,0,0.18)] max-[600px]:text-[2rem]">
          Welcome to
          <br />
          Jennah
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center w-full max-w-[480px] mx-auto mb-8 max-[600px]:max-w-[98vw]"
        >
          {error && (
            <div className="w-full bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}
          <label
            className="text-white text-[1.1rem] font-medium mb-2 self-start font-sans"
            htmlFor="email"
          >
            Email Address
          </label>
          <div className="flex items-center w-full bg-[rgba(255,255,255,0.08)] border-[1.5px] border-white rounded-full mb-6 px-[18px] h-14 max-[600px]:h-11 max-[600px]:px-2">
            <MailIcon
              sx={{ color: grey[100] }}
              fontSize="medium"
              className="mr-[10px]"
            />
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // placeholder="alphabet@gmail.com"
              autoComplete="email"
              disabled={isLoading}
              className="bg-transparent border-none outline-none text-white text-[1.2rem] font-sans p-0 placeholder:text-white placeholder:opacity-80 placeholder:text-[1.1rem] h-full focus-visible:ring-0 focus-visible:border-transparent"
            />
          </div>
          <label
            className="text-white text-[1.1rem] font-medium mb-2 self-start font-sans"
            htmlFor="password"
          >
            Password
          </label>
          <div className="flex items-center w-full bg-[rgba(255,255,255,0.08)] border-[1.5px] border-white rounded-full mb-6 px-[18px] h-14 max-[600px]:h-11 max-[600px]:px-2">
            <PasswordIcon
              sx={{ color: grey[100] }}
              fontSize="medium"
              className="mr-[10px]"
            />
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=""
              autoComplete="current-password"
              disabled={isLoading}
              className="bg-transparent border-none outline-none text-white text-[1.2rem] font-sans p-0 placeholder:text-white placeholder:opacity-80 placeholder:text-[1.1rem] h-full focus-visible:ring-0 focus-visible:border-transparent"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#0a4a6e] text-white rounded-full py-4 w-full max-w-[240px] text-[1.3rem] font-semibold border-none outline-none mt-3 mb-6 cursor-pointer transition-colors duration-200 font-sans hover:bg-[#0077ff] max-[600px]:text-base max-[600px]:py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="text-white text-[1.1rem] text-center mt-4">
          Don't have an account?{" "}
          <Link
            to="/auth/register"
            className="text-[#b3e0ff] underline font-medium ml-1 hover:text-white"
          >
            Sign up
          </Link>
        </div>
      </main>
    </div>
  );
}
