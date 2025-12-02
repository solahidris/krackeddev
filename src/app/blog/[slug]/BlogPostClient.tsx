"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowUp, ArrowDown, BookOpen, Code2, Rocket, FileText, MessageSquare, Send } from "lucide-react";
import { posts, type BlogSection } from "../posts";
import { cn } from "@/lib/utils";

const sectionLabels: Record<BlogSection, { label: string; icon: React.ElementType }> = {
  all: { label: "All", icon: FileText },
  learning: { label: "Learning Updates", icon: BookOpen },
  code: { label: "Code Deep Dives", icon: Code2 },
  updates: { label: "Build Logs / Updates", icon: Rocket },
  other: { label: "Other Notes", icon: FileText },
};

const getSectionBadgeColor = (section: Exclude<BlogSection, "all">) => {
  switch (section) {
    case "learning":
      return "bg-green-700/20 text-green-700 border-green-700/40";
    case "code":
      return "bg-blue-700/20 text-blue-700 border-blue-700/40";
    case "updates":
      return "bg-purple-700/20 text-purple-700 border-purple-700/40";
    case "other":
      return "bg-zinc-700/20 text-zinc-700 border-zinc-700/40";
    default:
      return "bg-zinc-700/20 text-zinc-700 border-zinc-700/40";
  }
};

interface Comment {
  id: string;
  author: string;
  body: string;
  timestamp: Date;
  votes: number;
}

const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  
  return date.toLocaleDateString();
};

export default function BlogPostClient() {
  const params = useParams();
  const slug = params?.slug as string;

  const post = posts.find((p) => p.slug === slug);

  const [votes, setVotes] = useState(0);
  const [userVote, setUserVote] = useState<1 | -1 | 0>(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [commentAuthor, setCommentAuthor] = useState("");
  const [commentVotes, setCommentVotes] = useState<Record<string, number>>({});

  // Load votes and comments from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined" && post) {
      const savedVotes = localStorage.getItem(`blog-votes-${post.id}`);
      const savedUserVote = localStorage.getItem(`blog-user-vote-${post.id}`);
      const savedComments = localStorage.getItem(`blog-comments-${post.id}`);
      const savedCommentVotes = localStorage.getItem(`blog-comment-votes-${post.id}`);

      if (savedVotes) setVotes(parseInt(savedVotes, 10));
      if (savedUserVote) setUserVote(parseInt(savedUserVote, 10) as 1 | -1 | 0);
      if (savedComments) setComments(JSON.parse(savedComments));
      if (savedCommentVotes) setCommentVotes(JSON.parse(savedCommentVotes));
    }
  }, [post]);

  // Save votes and comments to localStorage
  useEffect(() => {
    if (typeof window !== "undefined" && post) {
      localStorage.setItem(`blog-votes-${post.id}`, votes.toString());
      localStorage.setItem(`blog-user-vote-${post.id}`, userVote.toString());
      localStorage.setItem(`blog-comments-${post.id}`, JSON.stringify(comments));
      localStorage.setItem(`blog-comment-votes-${post.id}`, JSON.stringify(commentVotes));
    }
  }, [votes, userVote, comments, commentVotes, post]);

  const handleVote = (direction: 1 | -1) => {
    const currentVote = userVote;
    let newVote: 1 | -1 | 0 = 0;

    if (currentVote === direction) {
      newVote = 0;
    } else {
      newVote = direction;
    }

    const voteChange = newVote - currentVote;
    setVotes((prev) => prev + voteChange);
    setUserVote(newVote);
  };

  const handleCommentVote = (commentId: string, direction: 1 | -1) => {
    const currentVote = commentVotes[commentId] || 0;
    let newVote = 0;

    if (currentVote === direction) {
      newVote = 0;
    } else {
      newVote = direction;
    }

    setCommentVotes((prev) => ({ ...prev, [commentId]: newVote }));
    setComments((prev) =>
      prev.map((comment) => {
        if (comment.id === commentId) {
          const voteChange = newVote - currentVote;
          return { ...comment, votes: comment.votes + voteChange };
        }
        return comment;
      })
    );
  };

  const handleAddComment = () => {
    if (!newComment.trim() || !commentAuthor.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: commentAuthor,
      body: newComment,
      timestamp: new Date(),
      votes: 0,
    };

    setComments((prev) => [...prev, comment]);
    setNewComment("");
    setCommentAuthor("");
  };

  if (!post) {
    return (
      <main className="min-h-screen pb-20 overflow-hidden">
        <section className="min-h-screen flex items-center justify-center relative z-10 py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 w-full max-w-4xl">
            <Card className="border-white/10 bg-black/60 backdrop-blur-md">
              <CardContent className="pt-12 pb-12 text-center">
                <h1 className="text-2xl font-bold text-green-700 mb-4">Post Not Found</h1>
                <p className="text-zinc-50/70 mb-6">
                  The blog post you're looking for doesn't exist.
                </p>
                <Link href="/blog">
                  <Button variant="ghost" className="text-green-700 hover:bg-green-700/10">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Blog
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    );
  }


  return (
    <main className="min-h-screen pb-20 overflow-hidden">
      {/* Blog Post Content Section */}
      <section className="min-h-screen flex items-start justify-center relative z-10 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 w-full max-w-4xl">
          {/* Back Button */}
          <Link href="/blog">
            <Button
              variant="ghost"
              className="mb-6 text-zinc-50/70 hover:text-green-700 hover:bg-green-700/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>

          {/* Post Card */}
          <Card className="border-white/10 bg-black/60 backdrop-blur-md">
            <CardHeader>
              {/* Voting Section */}
              <div className="flex items-start gap-6 mb-6">
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => handleVote(1)}
                    className={cn(
                      "p-2 hover:bg-green-700/20 transition-colors rounded",
                      userVote === 1 && "bg-green-700/20 text-green-700"
                    )}
                    aria-label="Upvote"
                  >
                    <ArrowUp className={cn("w-6 h-6", userVote === 1 && "text-green-700")} />
                  </button>
                  <span
                    className={cn(
                      "text-lg font-bold py-2",
                      votes > 0 && "text-green-700",
                      votes < 0 && "text-red-500"
                    )}
                  >
                    {votes}
                  </span>
                  <button
                    onClick={() => handleVote(-1)}
                    className={cn(
                      "p-2 hover:bg-red-500/20 transition-colors rounded",
                      userVote === -1 && "bg-red-500/20 text-red-500"
                    )}
                    aria-label="Downvote"
                  >
                    <ArrowDown className={cn("w-6 h-6", userVote === -1 && "text-red-500")} />
                  </button>
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3 flex-1">
                      {React.createElement(sectionLabels[post.section].icon, {
                        className: "w-6 h-6 text-green-700 flex-shrink-0",
                      })}
                      <CardTitle className="text-3xl md:text-4xl text-green-700">
                        {post.title}
                      </CardTitle>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <Badge
                      className={`text-xs px-3 py-1 rounded-full border ${getSectionBadgeColor(
                        post.section
                      )}`}
                    >
                      {sectionLabels[post.section].label}
                    </Badge>
                    <span className="text-sm text-zinc-50/60">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="prose prose-invert max-w-none">
              <div className="text-zinc-50/90 leading-relaxed space-y-4">
                <p className="text-lg text-zinc-50/80 italic">{post.summary}</p>
                <div className="border-t border-white/10 pt-6">
                  {post.content ? (
                    <div className="whitespace-pre-wrap">{post.content}</div>
                  ) : (
                    <div className="text-zinc-50/70">
                      <p>Full content coming soon...</p>
                      <p className="mt-4">
                        This post is part of our learning log where we document our journey
                        learning code, building features, and sharing insights along the way.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comments Section */}
          <Card className="border-white/10 bg-black/60 backdrop-blur-md mt-8">
            <CardHeader>
              <CardTitle className="text-2xl text-green-700 flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Comments ({comments.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add Comment Form */}
              <div className="space-y-4 p-4 bg-black/40 rounded border border-white/10">
                <div>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={commentAuthor}
                    onChange={(e) => setCommentAuthor(e.target.value)}
                    className="w-full px-4 py-2 bg-black/60 border border-white/10 rounded text-zinc-50 placeholder-zinc-500 focus:outline-none focus:border-green-700 transition-colors"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 bg-black/60 border border-white/10 rounded text-zinc-50 placeholder-zinc-500 focus:outline-none focus:border-green-700 transition-colors resize-none"
                  />
                </div>
                <Button
                  onClick={handleAddComment}
                  disabled={!newComment.trim() || !commentAuthor.trim()}
                  className="bg-green-700 hover:bg-green-600 text-zinc-50"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Post Comment
                </Button>
              </div>

              {/* Comments List */}
              {comments.length === 0 ? (
                <div className="text-center py-8 text-zinc-50/60">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No comments yet. Be the first to share your thoughts!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {comments
                    .sort((a, b) => b.votes - a.votes || b.timestamp.getTime() - a.timestamp.getTime())
                    .map((comment) => {
                      const commentUserVote = commentVotes[comment.id] || 0;
                      return (
                        <div
                          key={comment.id}
                          className="p-4 bg-black/40 rounded border border-white/10"
                        >
                          <div className="flex gap-4">
                            {/* Comment Voting */}
                            <div className="flex flex-col items-center">
                              <button
                                onClick={() => handleCommentVote(comment.id, 1)}
                                className={cn(
                                  "p-1 hover:bg-green-700/20 transition-colors rounded",
                                  commentUserVote === 1 && "bg-green-700/20 text-green-700"
                                )}
                                aria-label="Upvote comment"
                              >
                                <ArrowUp className={cn("w-4 h-4", commentUserVote === 1 && "text-green-700")} />
                              </button>
                              <span
                                className={cn(
                                  "text-sm font-medium py-1",
                                  comment.votes > 0 && "text-green-700",
                                  comment.votes < 0 && "text-red-500"
                                )}
                              >
                                {comment.votes}
                              </span>
                              <button
                                onClick={() => handleCommentVote(comment.id, -1)}
                                className={cn(
                                  "p-1 hover:bg-red-500/20 transition-colors rounded",
                                  commentUserVote === -1 && "bg-red-500/20 text-red-500"
                                )}
                                aria-label="Downvote comment"
                              >
                                <ArrowDown className={cn("w-4 h-4", commentUserVote === -1 && "text-red-500")} />
                              </button>
                            </div>

                            {/* Comment Content */}
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-semibold text-green-700">{comment.author}</span>
                                <span className="text-xs text-zinc-50/60">
                                  {formatRelativeTime(comment.timestamp)}
                                </span>
                              </div>
                              <p className="text-zinc-50/90 whitespace-pre-wrap">{comment.body}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}

