import { useState } from "react";
import Background from "../assets/images/bg/2.png";
import AppHeader from "../components/AppHeader";
import { useAuth } from "@/context/AuthContext";
import { redirectToOAuthLogin } from "@/api/auth";

export default function LoginPage() {
  const [error, setError] = useState("");
  const { isLoading } = useAuth();

  const handleOAuthLogin = async () => {
    setError("");
    try {
      // Redirect to oauth2-proxy which will handle GitHub OAuth
      redirectToOAuthLogin();
    } catch (err) {
      setError(err instanceof Error ? err.message : "OAuth login failed");
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
      <main className="flex-1 flex flex-col gap-3 items-center justify-center z-[1] mt-10 max-[900px]:mt-0 max-[900px]:px-[10%]">
       <div className="flex-col flex gap-3 justify-center items-center text-center mb-2 max-[600px]:mb-4">
        <h1 className="text-[3.2rem] font-light text-white text-center  leading-[1.1] font-sans tracking-[-1px] [text-shadow:0_2px_16px_rgba(0,0,0,0.18)] max-[600px]:text-[2rem]">
          Continue with Github
        </h1>
        <p className="text-[rgba(255,255,255,0.7)]  text-sm font-sans">
              Use your GitHub account to access Jennah
            </p>
            </div>
        <div className="flex flex-col items-center w-full max-w-[480px] mx-auto mb-8 max-[600px]:max-w-[98vw]">
          {error && (
            <div className="w-full bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}
          
         

          <button
            onClick={handleOAuthLogin}
            disabled={isLoading}
            className="bg-[#238636] hover:bg-[#2ea043] text-white rounded-full py-4 w-full max-w-[240px] text-[1.3rem] font-semibold border-none outline-none mt-3 mb-6 cursor-pointer transition-colors duration-200 font-sans max-[600px]:text-base max-[600px]:py-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <>
                <span className="animate-spin">⏳</span>
                Signing in...
              </>
            ) : (
              <>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Sign in
              </>
            )}
          </button>

          <p className="text-[rgba(255,255,255,0.7)] text-sm text-center font-sans">
            First time? A new account will be created automatically.
          </p>
        </div>
      </main>
    </div>
  );
}
