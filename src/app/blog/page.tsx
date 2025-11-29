"use client";

export const runtime = 'edge';

import React, { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Code2, Rocket, FileText, Menu, X } from "lucide-react";
import { posts, type BlogSection } from "./posts";

const sectionLabels: Record<BlogSection, { label: string; icon: React.ElementType }> = {
  all: { label: "All", icon: FileText },
  learning: { label: "Learning Updates", icon: BookOpen },
  code: { label: "Code Deep Dives", icon: Code2 },
  updates: { label: "Build Logs / Updates", icon: Rocket },
  other: { label: "Other Notes", icon: FileText },
};

export default function BlogPage() {
  const [selectedSection, setSelectedSection] = useState<BlogSection>("all");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const filteredPosts =
    selectedSection === "all"
      ? posts
      : posts.filter((post) => post.section === selectedSection);

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

  const SidebarContent = () => (
    <div className="space-y-2">
      {Object.entries(sectionLabels).map(([key, { label, icon: Icon }]) => {
        const sectionKey = key as BlogSection;
        const isActive = selectedSection === sectionKey;
        const IconComponent = Icon as React.ElementType;
        return (
          <button
            key={key}
            onClick={() => {
              setSelectedSection(sectionKey);
              setIsMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-none text-left transition-all duration-300 ${
              isActive
                ? "bg-green-700/20 text-green-700 border-l-4 border-green-700 shadow-[0_0_10px_rgba(21,128,61,0.3)]"
                : "text-zinc-50/70 hover:text-zinc-50 hover:bg-white/5 border-l-4 border-transparent"
            }`}
          >
            {React.createElement(IconComponent, { className: "w-5 h-5" })}
            <span className="font-medium">{label}</span>
          </button>
        );
      })}
    </div>
  );

  return (
    <main className="min-h-screen pb-20 overflow-hidden">
      {/* Blog Content Section */}
      <section className="min-h-screen flex items-start justify-center relative z-10 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 w-full">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-green-700">Posts</h2>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-zinc-50 hover:text-green-700 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>

            {/* Sidebar - Desktop */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <Card className="border-white/10 bg-black/60 backdrop-blur-md sticky top-24">
                <CardHeader>
                  <CardTitle className="text-xl text-green-700">Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <SidebarContent />
                </CardContent>
              </Card>
            </aside>

            {/* Mobile Sidebar */}
            {isMobileMenuOpen && (
              <div className="lg:hidden mb-6">
                <Card className="border-white/10 bg-black/60 backdrop-blur-md">
                  <CardHeader>
                    <CardTitle className="text-xl text-green-700">Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SidebarContent />
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Main Content */}
            <div className="flex-1">
              {/* Page Header */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-green-700 mb-2">
                  {selectedSection === "all"
                    ? "All Posts"
                    : sectionLabels[selectedSection].label}
                </h2>
                <p className="text-zinc-50/70">
                  {filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"}
                </p>
              </div>

              {/* Posts Grid */}
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {filteredPosts.map((post) => {
                    const SectionIcon = sectionLabels[post.section].icon as React.ElementType;
                    return (
                      <Link key={post.id} href={`/blog/${post.slug}`}>
                        <Card className="backdrop-blur-sm transition-all duration-300 h-full relative flex flex-col border-2 border-green-700/30 bg-black/90 hover:border-green-600 shadow-[0_0_20px_rgba(21,128,61,0.2)] hover:shadow-[0_0_30px_rgba(21,128,61,0.4)] cursor-pointer hover:scale-[1.02] group">
                          <CardHeader>
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-3">
                                {React.createElement(SectionIcon, {
                                  className: "w-6 h-6 text-green-700 group-hover:text-green-600 group-hover:scale-110 transition-transform",
                                })}
                                <CardTitle className="text-xl text-green-700 group-hover:text-green-600">
                                  {post.title}
                                </CardTitle>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 mb-3">
                              <Badge
                                className={`text-xs px-3 py-1 rounded-full border ${getSectionBadgeColor(
                                  post.section
                                )}`}
                              >
                                {sectionLabels[post.section].label}
                              </Badge>
                              <span className="text-xs text-zinc-50/60">
                                {new Date(post.date).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </span>
                            </div>
                            <CardDescription className="text-sm text-zinc-50/90">
                              {post.summary}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="flex-1 flex items-end">
                            <span className="text-sm text-green-700/80 group-hover:text-green-700 transition-colors">
                              Read more →
                            </span>
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <Card className="border-white/10 bg-black/60 backdrop-blur-md">
                  <CardContent className="pt-12 pb-12 text-center">
                    <p className="text-zinc-50/70 text-lg">
                      No posts found in this category yet.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

