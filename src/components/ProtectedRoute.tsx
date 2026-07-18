import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import type { ReactNode } from "react"

interface ProtectedRouteProps {
    children: ReactNode
    allowedRoles?: Array<"Admin" | "Reader" | "Player">
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
    const { user, profile, loading } = useAuth()
    const location = useLocation()

    if (loading) {
        return <div>Loading...</div>
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    if (allowedRoles && (!profile || !allowedRoles.includes(profile.role))) {
        return <Navigate to="/unauthorized" replace />
    }

    return <>{children}</>
}