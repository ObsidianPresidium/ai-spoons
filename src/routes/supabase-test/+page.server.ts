import { publicSupabase } from "$lib/supabaseClient";

export async function load() {
    const { data } = await publicSupabase.from("instruments").select();
    console.log("Data from Supabase:", data);
    return {
        instruments: data ?? [],
    };
}