'use client';

import React from 'react';
import GitHubLoginButton from '@/components/GitHubLoginButton';
import { useSupabase } from '@/app/context/SupabaseContext';

export default function FloatingGitHubButton() {
  const { user, loading } = useSupabase();

  // Don't show if user is logged in or still loading
  if (loading || user) {
    return null;
  }

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-top-2 duration-300">
      <GitHubLoginButton 
        variant="cyberpunk" 
        size="sm"
        className="shadow-lg hover:shadow-xl transition-shadow"
      >
        Connect GitHub
      </GitHubLoginButton>
    </div>
  );
}
