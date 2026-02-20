/**
 * OAuth2-Proxy Authentication Service
 * Handles user authentication via oauth2-proxy built-in endpoints
 */

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  provider: string;
}

/**
 * Get the current authenticated user directly from the proxy
 * oauth2-proxy exposes a /oauth2/userinfo endpoint that returns session details securely
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    // Ask the proxy directly instead of relying on the backend gateway
    const response = await fetch("/oauth2/userinfo", {
      credentials: "include", // Important: include cookies for session validation
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    
    // OAuth2 proxy returns { "user": "email@domain.com" } by default
    return {
      id: data.user, 
      email: data.user,
      name: data.user.split('@')[0], // Creates a clean display name from the email prefix
      provider: "github"
    };
  } catch (error) {
    console.error("Failed to get current user:", error);
    return null;
  }
}

export function redirectToOAuthLogin(): void {

  const currentPath = window.location.pathname;
  const isAuthPage = currentPath === "/auth/login" || currentPath === "/auth/register" || currentPath === "/";
  const returnUrl = encodeURIComponent(isAuthPage ? "/projects" : currentPath);
  window.location.href = `/oauth2/sign_in?rd=${returnUrl}`;
}

export async function logoutOAuth(): Promise<void> {
  window.location.href = "/oauth2/sign_out?rd=%2Fauth%2Flogin";
}


export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return user !== null;
}