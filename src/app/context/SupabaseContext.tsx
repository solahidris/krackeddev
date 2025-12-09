"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { supabase } from "@/lib/supabase";
import type {
  User,
  Session,
  SupabaseClient,
  AuthChangeEvent,
  Provider,
} from "@supabase/supabase-js";
import type { Profile } from "@/types/database";

interface SupabaseContextType {
  supabase: SupabaseClient | null;
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  isAuthenticated: boolean;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  signInWithOAuth: (provider: Provider) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(
  undefined
);

export const SupabaseProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Fetch user profile from profiles table
  const fetchProfile = useCallback(async (userId: string) => {
    if (!supabase) return null;

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        // Profile might not exist yet (trigger hasn't run)
        console.log(
          "Profile not found, may be created shortly:",
          error.message
        );
        return null;
      }

      return data as Profile;
    } catch (error) {
      console.error("Error fetching profile:", error);
      return null;
    }
  }, []);

  // Refresh profile data
  const refreshProfile = useCallback(async () => {
    if (!user) return;
    const profileData = await fetchProfile(user.id);
    setProfile(profileData);
  }, [user, fetchProfile]);

  useEffect(() => {
    // Skip if supabase is not available (e.g., during build)
    const supabaseClient = supabase;
    if (!supabaseClient) {
      setLoading(false);
      return;
    }

    // Get initial session
    const initializeAuth = async () => {
      try {
        const {
          data: { session: initialSession },
        } = await supabaseClient.auth.getSession();
        setSession(initialSession);
        setUser(initialSession?.user ?? null);

        // Fetch profile if user exists
        if (initialSession?.user) {
          const profileData = await fetchProfile(initialSession.user.id);
          setProfile(profileData);
        }
      } catch (error) {
        console.error("Error getting initial session:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange(
      async (event: AuthChangeEvent, currentSession: Session | null) => {
        console.log("Auth state changed:", event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        // Fetch profile on sign in, clear on sign out
        if (currentSession?.user) {
          // Small delay to allow trigger to create profile
          setTimeout(async () => {
            const profileData = await fetchProfile(currentSession.user.id);
            setProfile(profileData);
          }, 500);
        } else {
          setProfile(null);
        }

        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchProfile]);

  const openLoginModal = useCallback(() => {
    setIsLoginModalOpen(true);
  }, []);

  const closeLoginModal = useCallback(() => {
    // Only allow closing if user is authenticated
    if (user) {
      setIsLoginModalOpen(false);
    }
  }, [user]);

  const signInWithOAuth = async (provider: Provider) => {
    if (!supabase) throw new Error("Supabase not initialized");

    // Always use the production site URL for OAuth redirects
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL || "https://krackeddevs.com";
    const redirectTo = `${siteUrl}/auth/callback`;

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo,
      },
    });
    if (error) throw error;
  };

  const signOut = async () => {
    if (!supabase) throw new Error("Supabase not initialized");
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setProfile(null);
    closeLoginModal();
  };

  // Update user profile
  const updateProfile = async (updates: Partial<Profile>) => {
    if (!supabase || !user) throw new Error("Not authenticated");

    const { error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", user.id);

    if (error) throw error;

    // Refresh profile after update
    await refreshProfile();
  };

  return (
    <SupabaseContext.Provider
      value={{
        supabase,
        user,
        profile,
        session,
        loading,
        isAuthenticated: !!user,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        signInWithOAuth,
        signOut,
        refreshProfile,
        updateProfile,
      }}
    >
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error("useSupabase must be used within a SupabaseProvider");
  }
  return context;
};
