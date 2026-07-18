import { useEffect, useState } from "react";
import { getUserProfile, type UserProfile } from "../services/users";


export function useUserProfile(userId: string | undefined) {
    const [profile, setProfile] = useState<UserProfile | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)


    useEffect(() => {
        if (!userId) {
            setProfile(null)
            setLoading(false)
            return
        }

        setLoading(true)
        getUserProfile(userId)
            .then(setProfile)
            .catch(setError)
            .finally(() => setLoading(false))
    }, [userId])

    return { profile, loading, error }
}