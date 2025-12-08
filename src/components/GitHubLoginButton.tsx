'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';

interface GitHubLoginButtonProps {
  className?: string;
  variant?: 'default' | 'cyberpunk' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  children?: React.ReactNode;
}

export default function GitHubLoginButton({
  className = '',
  variant = 'default',
  size = 'default',
  children,
}: GitHubLoginButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleGitHubLogin = async () => {
    try {
      setLoading(true);

      // Check if supabase is available (similar to krackeddevs-widget)
      if (!supabase) {
        console.error('Supabase not initialized. Missing NEXT_PUBLIC_SUPABASE_ANON_KEY');
        alert('Supabase not configured. Please add NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file.\n\nGet it from: Supabase Dashboard → Settings → API → anon/public key');
        setLoading(false);
        return;
      }

      // Sign in with GitHub OAuth - get the OAuth URL
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          skipBrowserRedirect: true, // Don't redirect automatically - return URL instead
        },
      });

      if (error) {
        console.error('GitHub login error:', error);
        alert('Login failed: ' + error.message);
        setLoading(false);
        return;
      }

      if (data?.url) {
        // Open OAuth URL in a popup window (exact same as krackeddevs-widget)
        const popup = window.open(
          data.url,
          'github-login',
          'width=600,height=700,scrollbars=yes,resizable=yes'
        );

        if (!popup) {
          alert('Popup blocked. Please allow popups for this site.');
          setLoading(false);
          return;
        }

        // Listen for the popup to close or redirect (exact same logic as krackeddevs-widget)
        const checkPopup = setInterval(() => {
          if (popup.closed) {
            clearInterval(checkPopup);
            setLoading(false);
            // Check if user is now authenticated
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }

          // Check if popup redirected to our callback
          try {
            if (popup.location.href.includes('/auth/callback')) {
              clearInterval(checkPopup);
              popup.close();
              setLoading(false);
              // Reload page to show authenticated state
              setTimeout(() => {
                window.location.reload();
              }, 500);
            }
          } catch (e) {
            // Cross-origin error is expected, ignore
          }
        }, 500);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleGitHubLogin}
      disabled={loading}
      variant={variant}
      size={size}
      className={className}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Connecting...
        </>
      ) : (
        <>
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4 mr-2"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          {children || 'Connect GitHub'}
        </>
      )}
    </Button>
  );
}
