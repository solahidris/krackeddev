import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Use the same Supabase URL as krackeddevs-widget
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://nxukkhyjasusqbzhkqdv.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

let supabaseInstance: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient | null {
  // Return existing instance if available
  if (supabaseInstance) {
    return supabaseInstance;
  }

  // Check if we have the anon key (URL has default value)
  if (!supabaseAnonKey) {
    // During build time or when env vars are missing, return null
    if (typeof window === "undefined") {
      console.warn(
        "Supabase anon key not available during build time"
      );
    } else {
      console.warn(
        "Supabase anon key is missing. Please set NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file"
      );
    }
    return null;
  }

  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });

  return supabaseInstance;
}

export const supabase = getSupabaseClient();
