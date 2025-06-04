import { createClient } from "@supabase/supabase-js";
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { SUPABASE_SERVICE_KEY } from '$env/static/private';

if (!PUBLIC_SUPABASE_URL) {
    throw new Error("PUBLIC_SUPABASE_URL is not defined in the environment variables.");
}
if (!SUPABASE_SERVICE_KEY) {
    throw new Error("SUPABASE_SERVICE_KEY is not defined in the environment variables.");
}

export const serviceSupabase = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_KEY);