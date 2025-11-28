"use client";

import React, { useState, useMemo } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowUp, ArrowDown, MessageSquare, Clock, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Comment {
  id: string;
  author: string;
  body: string;
  timestamp: Date;
  votes: number;
}

interface Post {
  id: string;
  title: string;
  body: string;
  author: string;
  timestamp: Date;
  votes: number;
  comments: Comment[];
  tags: string[];
}

type SortType = "hot" | "new" | "top";

const generateSeedPosts = (): Post[] => {
  const now = new Date();
  return [
    {
      id: "1",
      title: "Welcome to Kracked Forum!",
      body: "This is a community space for developers to share ideas, ask questions, and collaborate. Feel free to create posts and engage with the community!",
      author: "admin",
      timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000),
      votes: 15,
      comments: [
        {
          id: "c1",
          author: "dev_user",
          body: "Excited to be here! Looking forward to great discussions.",
          timestamp: new Date(now.getTime() - 1.5 * 60 * 60 * 1000),
          votes: 3,
        },
      ],
      tags: ["announcement", "welcome"],
    },
    {
      id: "2",
      title: "Best practices for React state management?",
      body: "What are your go-to patterns for managing complex state in React applications? I've been using Context API but wondering if there are better approaches.",
      author: "react_dev",
      timestamp: new Date(now.getTime() - 5 * 60 * 60 * 1000),
      votes: 8,
      comments: [
        {
          id: "c2",
          author: "senior_dev",
          body: "I recommend Zustand for smaller apps and Redux Toolkit for larger ones. Context API is fine but can cause performance issues.",
          timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000),
          votes: 5,
        },
        {
          id: "c3",
          author: "react_dev",
          body: "Thanks for the suggestion! I'll check out Zustand.",
          timestamp: new Date(now.getTime() - 3.5 * 60 * 60 * 1000),
          votes: 1,
        },
      ],
      tags: ["react", "discussion"],
    },
    {
      id: "3",
      title: "Showcase: Built a cool animation library",
      body: "Just released my first open-source library for smooth animations. Check it out and let me know what you think!",
      author: "animator",
      timestamp: new Date(now.getTime() - 12 * 60 * 60 * 1000),
      votes: 22,
      comments: [],
      tags: ["showcase", "open-source"],
    },
  ];
};

const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
};

export default function ForumPage() {
  const [posts, setPosts] = useState<Post[]>(generateSeedPosts());
  const [sortType, setSortType] = useState<SortType>("hot");
  const [expandedPosts, setExpandedPosts] = useState<Set<string>>(new Set());
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>(
    {}
  );
  const [userVotes, setUserVotes] = useState<Record<string, number>>({});
  const [commentVotes, setCommentVotes] = useState<Record<string, number>>({});

  const sortedPosts = useMemo(() => {
    const sorted = [...posts];
    switch (sortType) {
      case "new":
        return sorted.sort(
          (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
        );
      case "top":
        return sorted.sort((a, b) => b.votes - a.votes);
      case "hot":
      default:
        return sorted.sort((a, b) => {
          const scoreA = a.votes + a.comments.length * 2;
          const scoreB = b.votes + b.comments.length * 2;
          return scoreB - scoreA;
        });
    }
  }, [posts, sortType]);

  const handleVote = (postId: string, direction: 1 | -1) => {
    const currentVote = userVotes[postId] || 0;
    let newVote = 0;

    if (currentVote === direction) {
      newVote = 0;
    } else {
      newVote = direction;
    }

    setUserVotes((prev) => ({ ...prev, [postId]: newVote }));
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const voteChange = newVote - currentVote;
          return { ...post, votes: post.votes + voteChange };
        }
        return post;
      })
    );
  };

  const handleCommentVote = (
    postId: string,
    commentId: string,
    direction: 1 | -1
  ) => {
    const key = `${postId}-${commentId}`;
    const currentVote = commentVotes[key] || 0;
    let newVote = 0;

    if (currentVote === direction) {
      newVote = 0;
    } else {
      newVote = direction;
    }

    setCommentVotes((prev) => ({ ...prev, [key]: newVote }));
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments.map((comment) => {
              if (comment.id === commentId) {
                const voteChange = newVote - currentVote;
                return { ...comment, votes: comment.votes + voteChange };
              }
              return comment;
            }),
          };
        }
        return post;
      })
    );
  };

  const handleAddComment = (postId: string) => {
    const commentText = commentInputs[postId]?.trim();
    if (!commentText) return;

    const newComment: Comment = {
      id: `${postId}-${Date.now()}`,
      author: "anonymous",
      body: commentText,
      timestamp: new Date(),
      votes: 0,
    };

    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return { ...post, comments: [...post.comments, newComment] };
        }
        return post;
      })
    );

    setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
    setExpandedPosts((prev) => new Set(prev).add(postId));
  };

  const toggleExpanded = (postId: string) => {
    setExpandedPosts((prev) => {
      const next = new Set(prev);
      if (next.has(postId)) {
        next.delete(postId);
      } else {
        next.add(postId);
      }
      return next;
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl pt-24">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          <span className="text-green-600 brightness-150 drop-shadow-[0_0_20px_rgba(21,128,61,0.3)]">
            Kracked
          </span>
          <span className="text-zinc-50 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            {" "}
            Forum
          </span>
        </h1>
        <p className="text-muted-foreground">
          A community space for developers to discuss, share, and collaborate.
        </p>
      </div>

      <div className="mb-6 flex gap-2">
        <Button
          variant={sortType === "hot" ? "default" : "outline"}
          size="sm"
          onClick={() => setSortType("hot")}
        >
          Hot
        </Button>
        <Button
          variant={sortType === "new" ? "default" : "outline"}
          size="sm"
          onClick={() => setSortType("new")}
        >
          New
        </Button>
        <Button
          variant={sortType === "top" ? "default" : "outline"}
          size="sm"
          onClick={() => setSortType("top")}
        >
          Top
        </Button>
      </div>

      <div className="space-y-4">
        {sortedPosts.map((post) => {
          const isExpanded = expandedPosts.has(post.id);
          const userVote = userVotes[post.id] || 0;
          const bodyPreview =
            post.body.length > 200
              ? post.body.substring(0, 200) + "..."
              : post.body;

          return (
            <Card
              key={post.id}
              className="hover:border-white/30 transition-colors"
            >
              <CardContent className="p-0">
                <div className="flex">
                  <div className="flex flex-col items-center p-4 bg-black/20 border-r border-white/10">
                    <button
                      onClick={() => handleVote(post.id, 1)}
                      className={cn(
                        "p-1 hover:bg-white/10 transition-colors",
                        userVote === 1 && "text-primary"
                      )}
                    >
                      <ArrowUp className="w-5 h-5" />
                    </button>
                    <span
                      className={cn(
                        "text-sm font-bold py-1",
                        post.votes > 0 && "text-primary",
                        post.votes < 0 && "text-destructive"
                      )}
                    >
                      {post.votes}
                    </span>
                    <button
                      onClick={() => handleVote(post.id, -1)}
                      className={cn(
                        "p-1 hover:bg-white/10 transition-colors",
                        userVote === -1 && "text-destructive"
                      )}
                    >
                      <ArrowDown className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h2
                        className="text-xl font-semibold cursor-pointer hover:text-primary transition-colors"
                        onClick={() => toggleExpanded(post.id)}
                      >
                        {post.title}
                      </h2>
                    </div>

                    <div className="text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          u/{post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {formatRelativeTime(post.timestamp)}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          {post.comments.length} comments
                        </span>
                      </span>
                    </div>

                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <div className="mb-3">
                      {isExpanded ? (
                        <p className="whitespace-pre-wrap">{post.body}</p>
                      ) : (
                        <p className="whitespace-pre-wrap">{bodyPreview}</p>
                      )}
                      {post.body.length > 200 && (
                        <button
                          onClick={() => toggleExpanded(post.id)}
                          className="text-primary hover:underline text-sm mt-1"
                        >
                          {isExpanded ? "Show less" : "Show more"}
                        </button>
                      )}
                    </div>

                    <Separator className="my-3" />

                    <div className="space-y-3">
                      {isExpanded && (
                        <>
                          {post.comments.map((comment) => {
                            const commentKey = `${post.id}-${comment.id}`;
                            const commentVote = commentVotes[commentKey] || 0;
                            return (
                              <div
                                key={comment.id}
                                className="pl-4 border-l-2 border-white/10"
                              >
                                <div className="flex items-start gap-2 mb-1">
                                  <div className="flex flex-col items-center">
                                    <button
                                      onClick={() =>
                                        handleCommentVote(
                                          post.id,
                                          comment.id,
                                          1
                                        )
                                      }
                                      className={cn(
                                        "p-0.5 hover:bg-white/10 transition-colors",
                                        commentVote === 1 && "text-primary"
                                      )}
                                    >
                                      <ArrowUp className="w-3 h-3" />
                                    </button>
                                    <span
                                      className={cn(
                                        "text-xs",
                                        comment.votes > 0 && "text-primary",
                                        comment.votes < 0 && "text-destructive"
                                      )}
                                    >
                                      {comment.votes}
                                    </span>
                                    <button
                                      onClick={() =>
                                        handleCommentVote(
                                          post.id,
                                          comment.id,
                                          -1
                                        )
                                      }
                                      className={cn(
                                        "p-0.5 hover:bg-white/10 transition-colors",
                                        commentVote === -1 && "text-destructive"
                                      )}
                                    >
                                      <ArrowDown className="w-3 h-3" />
                                    </button>
                                  </div>
                                  <div className="flex-1">
                                    <div className="text-xs text-muted-foreground mb-1">
                                      <span className="font-medium">
                                        u/{comment.author}
                                      </span>
                                      {" · "}
                                      <span>
                                        {formatRelativeTime(comment.timestamp)}
                                      </span>
                                    </div>
                                    <p className="text-sm">{comment.body}</p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}

                          <div className="pl-4 border-l-2 border-white/10 pt-2">
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={commentInputs[post.id] || ""}
                                onChange={(e) =>
                                  setCommentInputs((prev) => ({
                                    ...prev,
                                    [post.id]: e.target.value,
                                  }))
                                }
                                placeholder="Add a comment..."
                                className="flex-1 px-3 py-2 bg-input border border-white/10 rounded-none text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleAddComment(post.id);
                                  }
                                }}
                              />
                              <Button
                                size="sm"
                                onClick={() => handleAddComment(post.id)}
                                disabled={!commentInputs[post.id]?.trim()}
                              >
                                Comment
                              </Button>
                            </div>
                          </div>
                        </>
                      )}

                      {!isExpanded && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleExpanded(post.id)}
                          className="w-full"
                        >
                          <MessageSquare className="w-4 h-4 mr-2" />
                          {post.comments.length > 0
                            ? `View ${post.comments.length} comment${
                                post.comments.length !== 1 ? "s" : ""
                              }`
                            : "Add comment"}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {sortedPosts.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            No posts yet. Be the first to create one!
          </CardContent>
        </Card>
      )}
    </div>
  );
}
