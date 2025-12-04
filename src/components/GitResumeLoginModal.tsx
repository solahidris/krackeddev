"use client";

import { useGitResume } from "@/app/context/GitResumeContext";
import { X, Github, ExternalLink, LogOut } from "lucide-react";
import { useEffect, useCallback } from "react";

export const GitResumeLoginModal = () => {
  const {
    user,
    isAuthenticated,
    isLoginModalOpen,
    closeLoginModal,
    login,
    logout,
  } = useGitResume();

  // Handle escape key to close modal
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLoginModal();
      }
    },
    [closeLoginModal]
  );

  useEffect(() => {
    if (isLoginModalOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isLoginModalOpen, handleKeyDown]);

  if (!isLoginModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gitresume-modal-title"
    >
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeLoginModal}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div className="relative z-10 w-full max-w-md mx-4 animate-in fade-in-0 zoom-in-95 duration-200">
        <div className="bg-[#0a0f0a] border border-neon-primary shadow-[0_0_30px_rgba(21,128,61,0.3)]">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-neon-primary/30">
            <h2
              id="gitresume-modal-title"
              className="text-lg font-bold text-neon-primary uppercase tracking-wider"
            >
              {isAuthenticated ? "Your Profile" : "Connect Account"}
            </h2>
            <button
              onClick={closeLoginModal}
              className="p-1 text-muted-foreground] hover:text-foreground] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6">
            {isAuthenticated && user ? (
              // Logged in state
              <div className="space-y-6">
                {/* User Card */}
                <div className="flex items-center gap-4 p-4 bg-background] border border-neon-primary/20">
                  <img
                    src={user.avatarUrl}
                    alt={`${user.username}'s avatar`}
                    className="w-16 h-16 border-2 border-neon-primary"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-bold text-foreground] truncate">
                      @{user.username}
                    </p>
                    <p className="text-sm text-muted-foreground]">
                      Connected via GitResu.me
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <a
                    href={user.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-neon-primary text-primary-foreground] font-semibold uppercase tracking-wider text-sm hover:shadow-[0_0_20px_rgba(21,128,61,0.5)] transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View GitResu.me Profile
                  </a>
                  <a
                    href={`https://github.com/${user.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 border border-neon-primary/50 text-neon-primary font-semibold uppercase tracking-wider text-sm hover:bg-neon-primary/10 transition-all"
                  >
                    <Github className="w-4 h-4" />
                    View GitHub Profile
                  </a>
                  <button
                    onClick={logout}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 border border-red-500/50 text-red-500 font-semibold uppercase tracking-wider text-sm hover:bg-red-500/10 transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    Disconnect Account
                  </button>
                </div>
              </div>
            ) : (
              // Logged out state
              <div className="space-y-6">
                {/* Description */}
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-neon-primary/10 border border-neon-primary/30">
                    <Github className="w-8 h-8 text-neon-primary" />
                  </div>
                  <p className="text-foreground]">
                    Connect your GitHub account through GitResu.me to join the
                    Kracked Devs community.
                  </p>
                  <p className="text-sm text-muted-foreground]">
                    We&apos;ll only access your public GitHub profile
                    information.
                  </p>
                </div>

                {/* Login Button */}
                <button
                  onClick={login}
                  className="bg-neon-primary border border-neon-primary flex items-center justify-center gap-3 w-full px-4 py-4 text-white font-bold uppercase tracking-wider text-sm hover:shadow-[0_0_30px_rgba(21,128,61,0.6)] transition-all group"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 fill-current"
                    aria-hidden="true"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  Login with GitResu.me
                </button>

                {/* Info text */}
                <p className="text-xs text-center text-muted-foreground]">
                  By connecting, you agree to our{" "}
                  <a
                    href="/terms"
                    className="text-neon-primary hover:underline"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="/privacy"
                    className="text-neon-primary hover:underline"
                  >
                    Privacy Policy
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
