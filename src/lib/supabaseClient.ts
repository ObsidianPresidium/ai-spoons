import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

if (!process.env.PUBLIC_SUPABASE_URL) {
    throw new Error("PUBLIC_SUPABASE_URL is not defined in the environment variables.");
}
if (!process.env.PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error("PUBLIC_SUPABASE_ANON_KEY is not defined in the environment variables.");
}

export const publicSupabase = createClient(process.env.PUBLIC_SUPABASE_URL, process.env.PUBLIC_SUPABASE_ANON_KEY);
