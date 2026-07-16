import { createClient } from "@supabase/supabase-js"


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://rlkbrwpncbtquzedxujb.supabase.co"
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_W8I0gyz-JUnNgv7gofL7mg_9Vntta9k"


if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)