import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  type ReactNode,
} from "react";
import { getCurrentUser, redirectToOAuthLogin, logoutOAuth } from "@/api/auth";

export interface User {
  id: string;
  email: string;
  name: string;
  provider?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already authenticated via oauth2-proxy on mount
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const authenticatedUser = await getCurrentUser();
        if (authenticatedUser) {
          setUser(authenticatedUser);
        }
      } catch (error) {
        console.error("Failed to check authentication:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // OAuth login: redirect to oauth2-proxy which handles GitHub OAuth
      // oauth2-proxy will handle the redirect to GitHub and return with authenticated session
      redirectToOAuthLogin();
      
      // The redirect above will navigate away, but we keep this as backup
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("OAuth login failed:", error);
      setIsLoading(false);
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      // OAuth doesn't require separate registration - GitHub account IS the registration
      // Redirect to oauth2-proxy login which will create user session on GitHub auth
      redirectToOAuthLogin();
      
      // The redirect above will navigate away, but we keep this as backup
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("OAuth register failed:", error);
      setIsLoading(false);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    // Call oauth2-proxy logout endpoint to clear session cookie
    logoutOAuth();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
