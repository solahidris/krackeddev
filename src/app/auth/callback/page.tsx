"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGitResume } from "@/app/context/GitResumeContext";
import { Suspense } from "react";

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUserFromCallback } = useGitResume();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const handleCallback = async () => {
      const username = searchParams.get("username");
      const error = searchParams.get("error");

      if (error) {
        setStatus("error");
        setErrorMessage(error);
        return;
      }

      if (username) {
        try {
          // Store the username in context and Supabase
          await setUserFromCallback(username);
          setStatus("success");

          // Redirect to home after a brief delay

          setTimeout(() => {
            router.push("/");
          }, 1500);
        } catch (err) {
          console.error("Error saving user:", err);
          setStatus("error");
          setErrorMessage("Failed to save your profile. Please try again.");
        }
      } else {
        setStatus("error");
        setErrorMessage("No username received from GitResu.me");
      }
    };

    handleCallback();
  }, [searchParams, setUserFromCallback, router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-[--background]">
      <div className="text-center space-y-6 p-8">
        {status === "loading" && (
          <>
            <div className="w-16 h-16 mx-auto border-2 border-[--neon-primary] border-t-transparent animate-spin" />
            <p className="text-[--foreground] text-lg">
              Connecting your account...
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-16 h-16 mx-auto flex items-center justify-center bg-[--neon-primary]/10 border border-[--neon-primary]">
              <svg
                className="w-8 h-8 text-[--neon-primary]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <p className="text-[--neon-primary] text-xl font-bold uppercase tracking-wider">
                Connected!
              </p>
              <p className="text-[--muted-foreground] mt-2">
                Redirecting you to Kracked Devs...
              </p>
            </div>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-16 h-16 mx-auto flex items-center justify-center bg-red-500/10 border border-red-500">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div>
              <p className="text-red-500 text-xl font-bold uppercase tracking-wider">
                Connection Failed
              </p>
              <p className="text-[--muted-foreground] mt-2">
                {errorMessage || "Something went wrong. Please try again."}
              </p>
            </div>
            <button
              onClick={() => router.push("/")}
              className="px-6 py-3 border border-[--neon-primary] text-[--neon-primary] font-semibold uppercase tracking-wider text-sm hover:bg-[--neon-primary]/10 transition-all"
            >
              Return Home
            </button>
          </>
        )}
      </div>
    </main>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center bg-[--background]">
          <div className="text-center space-y-6 p-8">
            <div className="w-16 h-16 mx-auto border-2 border-[--neon-primary] border-t-transparent animate-spin" />
            <p className="text-[--foreground] text-lg">Loading...</p>
          </div>
        </main>
      }
    >
      <CallbackContent />
    </Suspense>
  );
}

