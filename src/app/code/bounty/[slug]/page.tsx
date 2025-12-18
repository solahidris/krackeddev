"use client";



import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Trophy,
  Clock,
  ExternalLink,
  GitPullRequest,
  CheckCircle,
  XCircle,
  AlertCircle,
  Send,
  Github,
  LogOut,
} from "lucide-react";
import { getBountyBySlug } from "@/lib/bounty";
import {
  Bounty,
  BountyDifficulty,
  BountyStatus,
  BountySubmission,
} from "@/lib/bounty/types";
import { useSupabase } from "@/context/SupabaseContext";
import "@/styles/jobs.css";

const difficultyColors: Record<BountyDifficulty, string> = {
  beginner: "bg-green-500/20 text-green-400 border-green-500/50",
  intermediate: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
  advanced: "bg-orange-500/20 text-orange-400 border-orange-500/50",
  expert: "bg-red-500/20 text-red-400 border-red-500/50",
};

const statusColors: Record<BountyStatus, string> = {
  active: "bg-cyan-500/20 text-cyan-400 border-cyan-500/50",
  claimed: "bg-purple-500/20 text-purple-400 border-purple-500/50",
  completed: "bg-green-500/20 text-green-400 border-green-500/50",
  expired: "bg-gray-500/20 text-gray-400 border-gray-500/50",
};

const submissionStatusIcons = {
  pending: <AlertCircle className="w-4 h-4 text-yellow-400" />,
  approved: <CheckCircle className="w-4 h-4 text-green-400" />,
  rejected: <XCircle className="w-4 h-4 text-red-400" />,
};

function SubmissionCard({ submission }: { submission: BountySubmission }) {
  return (
    <div className="bg-gray-800/30 border border-gray-700 p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {submissionStatusIcons[submission.status]}
            <span className="font-mono text-sm text-white capitalize">
              {submission.status}
            </span>
          </div>
          <a
            href={submission.pullRequestUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 font-mono text-sm flex items-center gap-1"
          >
            <GitPullRequest className="w-4 h-4" />
            {submission.pullRequestUrl.replace("https://github.com/", "")}
          </a>
          <div className="text-gray-500 text-xs mt-2">
            by {submission.submittedBy} •{" "}
            {new Date(submission.submittedAt).toLocaleDateString()}
          </div>
          {submission.notes && (
            <p className="text-gray-400 text-sm mt-2">{submission.notes}</p>
          )}
        </div>
      </div>
    </div>
  );
}

// X/Twitter icon component
function XIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function BountyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();
  const { supabase, user, profile, openLoginModal, signOut } = useSupabase();

  const [bounty, setBounty] = useState<Bounty | null>(null);
  const [loading, setLoading] = useState(true);

  const [prUrl, setPrUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const [submissions, setSubmissions] = useState<BountySubmission[]>([]);

  // 1. Fetch Bounty Data (Static Fallback + DB)
  useEffect(() => {
    let cancelled = false;

    const fetchBounty = async () => {
      // First try static data
      const staticBounty = getBountyBySlug(slug);
      if (staticBounty) {
        if (!cancelled) {
          setBounty(staticBounty);
          setLoading(false);
        }
        return;
      }

      // Fallback to Database
      if (!supabase) return;

      const { data: rawData, error } = await supabase
        .from("bounties")
        .select("*")
        .eq("slug", slug)
        .single();

      const data = rawData as any;

      if (cancelled) return;

      if (error || !data) {
        console.error("Bounty not found in DB:", error);
        setLoading(false);
        return;
      }

      // Map DB data to Bounty interface
      const dbBounty: Bounty = {
        id: data.id,
        slug: data.slug,
        title: data.title,
        description: data.description || "",
        longDescription: data.long_description || data.description || "",
        reward: data.reward_amount,
        difficulty: (data.difficulty as any) || "intermediate",
        status: (data.status === "open" ? "active" : data.status) as any, // Map 'open' to 'active'
        tags: data.skills || [],
        requirements: data.requirements || [],
        repositoryUrl: data.repository_url || "",
        bountyPostUrl: "", // Not yet in DB
        submissionPostUrl: "",
        createdAt: data.created_at,
        deadline: data.deadline || new Date().toISOString(),
        submissions: [],
        // Winner mapping would go here if we had it in DB
      };

      setBounty(dbBounty);
      setLoading(false);
    };

    fetchBounty();

    return () => {
      cancelled = true;
    };
  }, [slug, supabase]);


  // 2. Fetch Submissions
  useEffect(() => {
    if (!supabase || !bounty) return;

    // Use static submissions if it's a static bounty
    setSubmissions(bounty.submissions ?? []);

    // If it's a DB bounty or we want to show real submissions for static ones too (if hybrid)
    // currently static bounties have mock submissions in data.ts which is fine.
    // We only fetch DB submissions for now.

    let cancelled = false;

    const loadSubmissions = async () => {
      const { data, error } = await supabase
        .from("bounty_submissions")
        .select(
          "id, pull_request_url, status, notes, created_at, user_id, submitter:profiles!bounty_submissions_user_id_fkey (username, full_name)"
        )
        .eq("bounty_slug", slug)
        .order("created_at", { ascending: false });

      if (cancelled) return;

      if (error) {
        console.error("Failed to load bounty submissions:", error);
        return;
      }

      const mapped: BountySubmission[] = (data ?? []).map((row: any) => {
        const submittedBy =
          row?.submitter?.username ||
          row?.submitter?.full_name ||
          (typeof row?.user_id === "string"
            ? `${row.user_id.slice(0, 8)}…`
            : "Unknown");

        return {
          id: row.id,
          bountyId: bounty.id,
          pullRequestUrl: row.pull_request_url,
          submittedBy,
          submittedAt: row.created_at ?? new Date().toISOString(),
          status: row.status,
          notes: row.notes ?? undefined,
        };
      });

      // Merge with static if needed, or just replace
      setSubmissions(mapped);
    };

    loadSubmissions();
    return () => { cancelled = true; };

  }, [bounty, slug, supabase]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent animate-spin rounded-full"></div>
      </main>
    )
  }

  if (!bounty) {
    return (
      <main className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="scanlines fixed inset-0 pointer-events-none z-50"></div>
        <div className="text-center relative z-10">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-mono text-white mb-4">
            Bounty Not Found
          </h1>
          <p className="text-gray-400 mb-6">
            The bounty you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/code/bounty"
            className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-mono"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Bounty Board
          </Link>
        </div>
      </main>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate GitHub PR URL
    const githubPrRegex = /^https:\/\/github\.com\/[\w-]+\/[\w.-]+\/pull\/\d+$/;
    if (!githubPrRegex.test(prUrl)) {
      setError(
        "Please enter a valid GitHub pull request URL (e.g., https://github.com/owner/repo/pull/123)"
      );
      return;
    }

    if (!supabase) {
      setError(
        "Submissions are temporarily unavailable (Supabase not configured)."
      );
      return;
    }

    if (!user || !bounty) {
      setError("Please sign in to submit a solution.");
      openLoginModal();
      return;
    }

    setSubmitting(true);

    const { data, error } = await supabase
      .from("bounty_submissions")
      .insert({
        bounty_slug: bounty.slug,
        bounty_title: bounty.title,
        bounty_reward: bounty.reward,
        user_id: user.id,
        pull_request_url: prUrl.trim(),
      } as any)
      .select("id, pull_request_url, status, notes, created_at, user_id")
      .single();

    if (error) {
      setSubmitting(false);
      setError(error.message);
      return;
    }

    setSubmitting(false);
    setSubmitted(true);

    if (data) {
      const submissionData = data as { id: string; pull_request_url: string; status: string; notes: string | null; created_at: string | null; user_id: string };
      const submittedBy =
        profile?.username ||
        profile?.full_name ||
        (typeof user.id === "string" ? `${user.id.slice(0, 8)}…` : "You");

      setSubmissions((prev) => [
        {
          id: submissionData.id,
          bountyId: bounty.id,
          pullRequestUrl: submissionData.pull_request_url,
          submittedBy,
          submittedAt: submissionData.created_at ?? new Date().toISOString(),
          status: (submissionData.status ?? "pending") as
            | "pending"
            | "approved"
            | "rejected",
          notes: submissionData.notes ?? undefined,
        },
        ...prev,
      ]);
    }

    setPrUrl("");
  };

  const canSubmit = bounty.status === "active" || bounty.status === "claimed";

  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);
    if (isNaN(date.getTime())) return "No Deadline";

    return date.toLocaleDateString("en-MY", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });
  };

  const isDeadlinePassed = new Date(bounty.deadline) < new Date();

  return (
    <main className="min-h-screen bg-gray-900 relative">
      <div className="scanlines fixed inset-0 pointer-events-none z-50"></div>

      {/* Header with Sign Out Button */}
      <div className="bg-gray-800/50 border-b border-gray-700 sticky top-0 z-40 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 max-w-4xl">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push("/code/bounty")}
              className="inline-flex items-center text-gray-400 hover:text-white transition-colors font-mono text-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden md:inline">Back to Bounty Board</span>
              <span className="md:hidden">Back</span>
            </button>

            <button
              onClick={() => setShowSignOutConfirm(true)}
              className="hidden md:flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-mono text-sm px-3 py-1.5 border border-gray-700 hover:border-gray-600"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Sign Out Confirmation Modal */}
      {showSignOutConfirm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] p-4">
          <div className="bg-gray-900 border-2 border-cyan-500 p-6 max-w-md w-full">
            <h2 className="text-xl font-mono text-cyan-400 mb-4">
              CONFIRM SIGN OUT
            </h2>
            <p className="text-gray-300 mb-6">
              Are you sure you want to sign out?
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowSignOutConfirm(false)}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-mono py-2 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowSignOutConfirm(false);
                  signOut();
                }}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-mono py-2 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8 relative z-10 max-w-4xl">
        {/* Mobile Sign Out Button - Inline with content */}
        <div className="md:hidden mb-4 flex justify-end">
          <button
            onClick={() => setShowSignOutConfirm(true)}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-mono text-sm px-3 py-1.5 border border-gray-700 hover:border-gray-600"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        {/* Header */}
        <div className="mb-8">
          {/* Bounty Number & Status */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-gray-500 font-mono text-sm">
              BOUNTY #{bounty.id.slice(0, 8)}
            </span>
            <span
              className={`px-3 py-1 text-xs font-mono border ${statusColors[bounty.status]
                }`}
            >
              {bounty.status.toUpperCase()}
            </span>
            <span
              className={`px-3 py-1 text-xs font-mono border ${difficultyColors[bounty.difficulty]
                }`}
            >
              {bounty.difficulty.toUpperCase()}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold font-mono text-white mb-4">
            {bounty.title}
          </h1>

          {/* Description */}
          <p className="text-gray-400 text-lg">{bounty.description}</p>

          {/* Reward Badge */}
          <div className="mt-6 inline-block bg-yellow-500 text-black px-6 py-3 font-mono font-bold text-2xl">
            RM{bounty.reward}
          </div>
        </div>

        {/* Winner Section - Show prominently for completed bounties */}
        {bounty.status === "completed" && bounty.winner && (
          <div className="mb-8">
            <div className="bg-gradient-to-r from-yellow-500/10 to-green-500/10 border-2 border-yellow-500/50 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Trophy className="w-8 h-8 text-yellow-500" />
                <h2 className="text-2xl font-mono text-yellow-400 font-bold">
                  WINNER
                </h2>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-800 border-2 border-yellow-500/50 flex items-center justify-center text-3xl">
                  🏆
                </div>
                <div>
                  <div className="text-white font-mono text-xl mb-1">
                    {bounty.winner.name}
                  </div>
                  <a
                    href={bounty.winner.xUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 font-mono flex items-center gap-2"
                  >
                    <XIcon className="w-4 h-4" />@{bounty.winner.xHandle}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
              {bounty.winner.submissionUrl && (
                <a
                  href={bounty.winner.submissionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-green-400 hover:text-green-300 font-mono text-sm"
                >
                  <CheckCircle className="w-4 h-4" />
                  View Winning Submission
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              {bounty.completedAt && (
                <div className="text-gray-500 text-xs mt-4 font-mono">
                  Completed on{" "}
                  {new Date(bounty.completedAt).toLocaleDateString("en-MY", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Meta Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Deadline */}
          <div className="bg-gray-800/30 border border-gray-700 p-4">
            <div className="flex items-center gap-3">
              <Clock
                className={`w-5 h-5 ${isDeadlinePassed ? "text-red-500" : "text-gray-500"
                  }`}
              />
              <div>
                <div className="text-gray-500 text-xs font-mono">DEADLINE</div>
                <div
                  className={`font-mono text-sm ${isDeadlinePassed ? "text-red-400" : "text-white"
                    }`}
                >
                  {formatDeadline(bounty.deadline)}
                </div>
                {isDeadlinePassed && (
                  <span className="text-red-400 text-xs font-mono">
                    (Deadline passed)
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Reward */}
          <div className="bg-gray-800/30 border border-gray-700 p-4">
            <div className="flex items-center gap-3">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <div>
                <div className="text-gray-500 text-xs font-mono">REWARD</div>
                <div className="text-white font-mono">RM{bounty.reward}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="mb-8">
          <h2 className="text-sm font-mono text-gray-500 mb-3">TAGS</h2>
          <div className="flex flex-wrap gap-2">
            {bounty.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-800 border border-gray-700 text-gray-300 font-mono text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Long Description */}
        <div className="mb-8">
          <h2 className="text-lg font-mono text-white mb-4">DETAILS</h2>
          <div className="bg-gray-800/30 border border-gray-700 p-6">
            <div className="prose prose-invert max-w-none prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-700">
              <pre className="whitespace-pre-wrap font-mono text-sm text-gray-300 leading-relaxed">
                {bounty.longDescription}
              </pre>
            </div>
          </div>
        </div>

        {/* Requirements */}
        {bounty.requirements.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-mono text-white mb-4">REQUIREMENTS</h2>
            <div className="bg-gray-800/30 border border-gray-700 p-6 space-y-3">
              {bounty.requirements.map((req, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center text-cyan-400 font-mono text-xs shrink-0">
                    {index + 1}
                  </div>
                  <span className="text-gray-300">{req}</span>
                </div>
              ))}
            </div>
          </div>
        )}


        {/* Links */}
        <div className="mb-8">
          <h2 className="text-lg font-mono text-white mb-4">LINKS</h2>
          <div className="flex flex-wrap gap-4">
            {/* Bounty Post on X */}
            {bounty.bountyPostUrl && (
              <a
                href={bounty.bountyPostUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gray-800 border border-gray-700 px-4 py-2 text-white hover:bg-gray-700 transition-colors font-mono text-sm"
              >
                <XIcon className="w-4 h-4" />
                View Bounty Post
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

            {/* Submission/Winner Post on X */}
            {bounty.submissionPostUrl && (
              <a
                href={bounty.submissionPostUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gray-800 border border-gray-700 px-4 py-2 text-white hover:bg-gray-700 transition-colors font-mono text-sm"
              >
                <XIcon className="w-4 h-4" />
                View Submission Post
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

            {/* Repository */}
            {bounty.repositoryUrl && (
              <a
                href={bounty.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gray-800 border border-gray-700 px-4 py-2 text-white hover:bg-gray-700 transition-colors font-mono text-sm"
              >
                <Github className="w-4 h-4" />
                View Repository
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

            {!bounty.repositoryUrl && !bounty.bountyPostUrl && (
              <p className="text-gray-500 text-sm font-mono">No links available for this bounty.</p>
            )}
          </div>
        </div>

        {/* Submission Form - Only for active bounties */}
        {canSubmit && (
          <div className="mb-8">
            <h2 className="text-lg font-mono text-white mb-4 flex items-center gap-2">
              <GitPullRequest className="w-5 h-5 text-cyan-400" />
              SUBMIT YOUR SOLUTION
            </h2>
            <div className="bg-gray-800/50 border-2 border-cyan-500/30 p-6">
              {submitted ? (
                <div className="text-center py-4">
                  <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-mono text-white mb-2">
                    Submission Received!
                  </h3>
                  <p className="text-gray-400 mb-4">
                    Your pull request has been submitted for review. We&apos;ll
                    notify you once it&apos;s been reviewed.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-cyan-400 hover:text-cyan-300 font-mono text-sm"
                  >
                    Submit Another PR
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <label className="block mb-2 text-gray-400 font-mono text-sm">
                    GitHub Pull Request URL
                  </label>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <input
                        type="url"
                        value={prUrl}
                        onChange={(e) => setPrUrl(e.target.value)}
                        placeholder="https://github.com/solahidris/krackeddev/pull/123"
                        className="w-full bg-gray-900 border border-gray-600 px-4 py-3 font-mono text-sm text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none"
                        required
                      />
                      {error && (
                        <p className="text-red-400 text-sm mt-2 font-mono">
                          {error}
                        </p>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-mono font-bold px-6 py-3 flex items-center gap-2 transition-colors"
                    >
                      {submitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-black border-t-transparent animate-spin rounded-full" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Submit PR
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-gray-500 text-xs mt-3 font-mono">
                    Make sure your PR follows the contribution guidelines and
                    tag @KrackedDevs on X.
                  </p>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Completed Notice */}
        {bounty.status === "completed" && (
          <div className="mb-8 bg-green-500/10 border border-green-500/30 p-6 text-center">
            <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <div className="text-green-400 font-mono text-lg mb-2">
              This bounty has been completed!
            </div>
            <p className="text-gray-400 text-sm">
              Congratulations to the winner. Check out other active bounties on
              the board.
            </p>
          </div>
        )}

        {/* Expired Notice */}
        {bounty.status === "expired" && (
          <div className="mb-8 bg-gray-800/30 border border-gray-600 p-6 text-center">
            <div className="text-gray-500 font-mono">
              This bounty has expired and is no longer accepting submissions.
            </div>
          </div>
        )}

        {/* Existing Submissions */}
        {submissions.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-mono text-white mb-4">
              SUBMISSIONS ({submissions.length})
            </h2>
            <div className="space-y-4">
              {submissions.map((submission) => (
                <SubmissionCard key={submission.id} submission={submission} />
              ))}
            </div>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="border-t border-gray-800 pt-8 flex justify-between items-center">
          <Link
            href="/code/bounty"
            className="text-gray-400 hover:text-white font-mono text-sm flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            All Bounties
          </Link>
          <Link
            href="/code"
            className="text-cyan-400 hover:text-cyan-300 font-mono text-sm"
          >
            Back to Code Hub
          </Link>
        </div>
      </div>
    </main>
  );
}
