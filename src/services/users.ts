import { supabase } from "../lib/supabase"

export interface UserProfile {
    id: string
    name: string
    email: string
    role: 'Reader' | 'Player' | 'Admin'
    phone: string | null
    country: string | null
    email_verified: boolean
    is_active: boolean
    created_at: string
}

const PROFILE_COLUMNS = 'id, name, email, role, phone, country, email_verified, is_active, created_at'

// Fetch a single user's own profile
export async function getUserProfile(userId: string): Promise<UserProfile> {
    const { data, error } = await supabase
        .from('users')
        .select(PROFILE_COLUMNS)
        .eq('id', userId)
        .single()


    if (error) throw error
    return data
}


// Admin only: fetch all users 
export async function getAllUsers(): Promise<UserProfile[]> {
    const { data, error } = await supabase
        .from('users')
        .select(PROFILE_COLUMNS)
        .order('created_at', { ascending: false })

    if (error) throw error
    return data
}