import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
    children: ReactNode;
    allowedRoles?: Array<"Admin" | "Reader" | "Player">;
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
    const { user, loading, profile } = useAuth();
    const location = useLocation();

    if (loading) return <div>Loading....</div>;

    if (!user) return <Navigate to={"/login"} state={{ from: location }} replace />;

    const userRole = profile?.role;

    if (allowedRoles && !allowedRoles.includes(userRole)) return <Navigate to={"/unauthorized"} replace />;

    return <>{children}</>;
}