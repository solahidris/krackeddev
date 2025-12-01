import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

let supabaseInstance: SupabaseClient | null = null;

function getSupabaseClient() {
  // Return existing instance if available
  if (supabaseInstance) {
    return supabaseInstance;
  }

  // Check if we're in a browser environment or have the env vars
  if (!supabaseUrl || !supabaseAnonKey) {
    // During build time, return a mock client that won't be used
    if (typeof window === "undefined") {
      console.warn(
        "Supabase environment variables not available during build time"
      );
      // Return a mock that won't actually be called during build
      return null as any;
    }
    throw new Error("Missing Supabase environment variables");
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
