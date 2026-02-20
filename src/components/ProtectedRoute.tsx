import type { ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';
import { redirectToOAuthLogin } from '@/api/auth';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin text-2xl">⏳</div>
      </div>
    );
  }

  if (!user) {
    redirectToOAuthLogin();
    return null;
  }

  return <>{children}</>;
}