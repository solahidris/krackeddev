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

interface GitResumeUser {
  id?: string; // Supabase profile ID
  username: string;
  avatarUrl: string;
  profileUrl: string;
}

interface GitResumeContextType {
  user: GitResumeUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  login: () => void;
  logout: () => void;
  setUserFromCallback: (username: string) => Promise<void>;
}

const GitResumeContext = createContext<GitResumeContextType | undefined>(
  undefined
);

const STORAGE_KEY = "gitresume_user";
const GITRESUME_LOGIN_URL = "https://gitresu.me/login";
const PARTNER_ID = "krackeddevs";

// Determine the correct redirect URI based on environment
const getRedirectUri = () => {
  if (typeof window === "undefined") return "";

  const hostname = window.location.hostname;
  const protocol = window.location.protocol;

  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return `${protocol}//${hostname}:${window.location.port}/auth/callback`;
  }

  // Production
  return `${protocol}//${hostname}/auth/callback`;
};

// Save/update user profile in Supabase
const upsertUserToSupabase = async (
  username: string
): Promise<string | null> => {
  if (!supabase) {
    console.warn("Supabase not available, skipping database sync");
    return null;
  }

  try {
    const { data, error } = await supabase
      .from("profiles")
      .upsert(
        {
          github_username: username,
          avatar_url: `https://github.com/${username}.png`,
          gitresume_url: `https://gitresu.me/${username}`,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "github_username",
        }
      )
      .select("id")
      .single();

    if (error) {
      console.error("Error upserting user to Supabase:", error);
      return null;
    }

    return data?.id || null;
  } catch (error) {
    console.error("Error syncing with Supabase:", error);
    return null;
  }
};

// Fetch user profile from Supabase
const fetchUserFromSupabase = async (
  username: string
): Promise<GitResumeUser | null> => {
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, github_username, avatar_url, gitresume_url")
      .eq("github_username", username)
      .single();

    if (error || !data) return null;

    return {
      id: data.id,
      username: data.github_username,
      avatarUrl: data.avatar_url,
      profileUrl: data.gitresume_url,
    };
  } catch {
    return null;
  }
};

export const GitResumeProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<GitResumeUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Load user from localStorage on mount, then verify with Supabase
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = localStorage.getItem(STORAGE_KEY);
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);

          // Optionally refresh from Supabase in background
          const supabaseUser = await fetchUserFromSupabase(parsedUser.username);
          if (supabaseUser) {
            setUser(supabaseUser);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(supabaseUser));
          }
        }
      } catch (error) {
        console.error("Error loading GitResume user from storage:", error);
        localStorage.removeItem(STORAGE_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const openLoginModal = useCallback(() => {
    setIsLoginModalOpen(true);
  }, []);

  const closeLoginModal = useCallback(() => {
    setIsLoginModalOpen(false);
  }, []);

  const login = useCallback(() => {
    const redirectUri = getRedirectUri();
    const loginUrl = `${GITRESUME_LOGIN_URL}?partner=${PARTNER_ID}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}`;
    window.location.href = loginUrl;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    closeLoginModal();
  }, [closeLoginModal]);

  const setUserFromCallback = useCallback(async (username: string) => {
    // First, save to Supabase
    const supabaseId = await upsertUserToSupabase(username);

    const newUser: GitResumeUser = {
      id: supabaseId || undefined,
      username,
      avatarUrl: `https://github.com/${username}.png`,
      profileUrl: `https://gitresu.me/${username}`,
    };

    setUser(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
  }, []);

  return (
    <GitResumeContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        login,
        logout,
        setUserFromCallback,
      }}
    >
      {children}
    </GitResumeContext.Provider>
  );
};

export const useGitResume = () => {
  const context = useContext(GitResumeContext);
  if (!context) {
    throw new Error("useGitResume must be used within a GitResumeProvider");
  }
  return context;
};
