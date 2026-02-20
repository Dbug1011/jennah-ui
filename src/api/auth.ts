/**
 * OAuth2-Proxy Authentication Service
 * Handles user authentication via oauth2-proxy headers
 */

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  provider: string;
}

/**
 * Get the current authenticated user from oauth2-proxy headers
 * oauth2-proxy injects these headers after successful GitHub OAuth:
 * - X-Forwarded-Email: user's email
 * - X-Forwarded-User: user's GitHub username
 * - X-Forwarded-Access-Token: user's OAuth token
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    // Make a request to a protected endpoint to trigger oauth2-proxy validation
    // oauth2-proxy will redirect to GitHub OAuth if not authenticated
    const response = await fetch("/api/check-auth", {
      credentials: "include", // Important: include cookies for session validation
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.user || null;
  } catch (error) {
    console.error("Failed to get current user:", error);
    return null;
  }
}

/**
 * Redirect to oauth2-proxy login endpoint
 * This will redirect to GitHub OAuth if user is not authenticated
 */
export function redirectToOAuthLogin(): void {
  // oauth2-proxy listens on port 4180 in the sidecar
  // It will handle the redirect to GitHub OAuth
  window.location.href = "/oauth2/sign_in?rd=" + encodeURIComponent(window.location.pathname);
}

/**
 * Logout via oauth2-proxy
 * This clears the oauth2-proxy session cookie
 */
export async function logoutOAuth(): Promise<void> {
  try {
    await fetch("/oauth2/sign_out", {
      method: "GET",
      credentials: "include",
    });
    // Redirect to home after logout
    window.location.href = "/";
  } catch (error) {
    console.error("Failed to logout:", error);
  }
}

/**
 * Check if user is authenticated by attempting to access a protected resource
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return user !== null;
}
