
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function RootRedirect() {
    const { user, profile, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    if (!user) return <Navigate to={"/login"} replace />;

    if (profile?.role === "Admin") return <Navigate to={"/admin"} replace />;

    // Removed the /host redirect. Readers and Players should both go to /home.
    // If you plan to build a separate /host page later, you can add it back 
    // once the route is defined in App.tsx.
    return <Navigate to={"/home"} replace />;
}