import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export function RootRedirect() {
    const { user, profile, loading } = useAuth()

    if (loading) {
        return <div>Loading...</div>
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    if (profile?.role === "Admin") {
        return <Navigate to="/admin" replace />
    }

    if (profile?.role === "Reader") {
        return <Navigate to="/host" replace />
    }

    return <Navigate to="/home" replace />
}