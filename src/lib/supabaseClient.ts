import { createClient } from "@supabase/supabase-js";
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'

if (!PUBLIC_SUPABASE_URL) {
    throw new Error("PUBLIC_SUPABASE_URL is not defined in the environment variables.");
}
if (!PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error("PUBLIC_SUPABASE_ANON_KEY is not defined in the environment variables.");
}

export const publicSupabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
