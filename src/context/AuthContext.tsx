import { supabase } from "../lib/supabase"
import type { Session, User } from "@supabase/supabase-js"
import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { getUserProfile, type UserProfile } from "../services/users"

interface AuthContextType {
    user: User | null
    session: Session | null
    loading: boolean
    signInWithGoogle: () => Promise<void>
    signOut: () => Promise<void>
    profile: UserProfile | null
}


// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined)


// Context function 
export function AuthProvider({ children }: { children: ReactNode }) {
    const [profile, setProfile] = useState<UserProfile | null>(null)
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!session?.user) {
            setProfile(null)
            return
        }

        getUserProfile(session.user.id)
            .then(setProfile)
            .catch(() => setProfile(null))
    }, [session])

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            setLoading(false)
        })

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => setSession(session)
        )

        return () => subscription.unsubscribe()
    }, [])

    // Signin with google
    const signInWithGoogle = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`
            }
        })

        if (error) throw error
    }

    const signOut = async () => {
        await supabase.auth.signOut()
    }


    return (
        <AuthContext.Provider value={{ profile, user: session?.user ?? null, session, loading, signInWithGoogle, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

// Funtion to use the auth context created
export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used within AuthProvider')
    return ctx
}