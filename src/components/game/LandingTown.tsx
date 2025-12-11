"use client";

import React, { useMemo, useState, useEffect } from "react";
import { BaseGameWorld } from "./BaseGameWorld";
import {
  TILE_EMPTY,
  TILE_WALL,
  TILE_BLOG,
  TILE_JOBS,
  TILE_CODE,
  TILE_PROFILE,
  TILE_WHITEPAPER,
  TILE_X,
  MAP_WIDTH,
  MAP_HEIGHT,
} from "@/lib/game/constants";
import { BuildingConfig } from "@/lib/game/types";
import { CharacterStats, UserProfile } from "@/types/jobs";
import {
  addGroundVariety,
  addTrees,
  connectBuildingsWithRoads,
} from "@/lib/game/mapHelpers";
import { EscapeButton } from "./EscapeButton";
import { loadSprite } from "@/lib/game/sprites";
import { useSupabase } from "@/context/SupabaseContext";
import { LogOut, Eye } from "lucide-react";

interface LandingTownProps {
  onBuildingEnter: (route: string) => void;
}

export const LandingTown: React.FC<LandingTownProps> = ({
  onBuildingEnter,
}) => {
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [pageViews, setPageViews] = useState<number | null>(null);
  const { isAuthenticated, signOut, user, supabase } = useSupabase();

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 768;
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Preload house images
  useEffect(() => {
    loadSprite("/houses/HOUSE1.png").catch(() => {});
    loadSprite("/houses/HOUSE2.png").catch(() => {});
  }, []);

  // Track page views
  useEffect(() => {
    if (!supabase) return;

    const trackAndFetchPageViews = async () => {
      try {
        // Record the page view
        await supabase.from("page_views").insert({
          page_path: "/",
          visitor_id: localStorage.getItem("visitor_id") || crypto.randomUUID(),
          user_agent: navigator.userAgent,
          referrer: document.referrer || null,
        });

        // Store visitor ID for future visits
        if (!localStorage.getItem("visitor_id")) {
          localStorage.setItem("visitor_id", crypto.randomUUID());
        }

        // Fetch total page views
        const { count } = await supabase
          .from("page_views")
          .select("*", { count: "exact", head: true });

        setPageViews(count ?? 0);
      } catch (error) {
        console.error("Error tracking page views:", error);
      }
    };

    trackAndFetchPageViews();
  }, [supabase]);

  // Mock profile data
  const stats: CharacterStats = {
    name: "Dev_Hero",
    level: 5,
    hp: 85,
    maxHp: 100,
    mp: 42,
    maxMp: 50,
    gold: 150,
    class: "Code Wizard",
  };

  const userProfile: UserProfile = {
    resumeName: null,
    experiences: [],
    skills: ["TypeScript", "React", "Tailwind", "Next.js", "Node.js"],
    education: [],
    honors: [],
    certs: [],
  };

  // Generate map with all buildings
  const map = useMemo(() => {
    const newMap: number[][] = [];

    // Initialize empty map
    for (let y = 0; y < MAP_HEIGHT; y++) {
      const row: number[] = [];
      for (let x = 0; x < MAP_WIDTH; x++) {
        // Border walls
        if (x === 0 || x === MAP_WIDTH - 1 || y === 0 || y === MAP_HEIGHT - 1) {
          row.push(TILE_WALL);
        } else {
          row.push(TILE_EMPTY);
        }
      }
      newMap.push(row);
    }

    // Place Blog building (top-right)
    newMap[2][MAP_WIDTH - 5] = TILE_BLOG;
    newMap[2][MAP_WIDTH - 4] = TILE_BLOG;
    newMap[3][MAP_WIDTH - 5] = TILE_BLOG;
    newMap[3][MAP_WIDTH - 4] = TILE_BLOG;

    // Place Jobs building (top-left)
    newMap[2][3] = TILE_JOBS;
    newMap[2][4] = TILE_JOBS;
    newMap[3][3] = TILE_JOBS;
    newMap[3][4] = TILE_JOBS;

    // Place Code building (left-center)
    newMap[5][2] = TILE_CODE;
    newMap[5][3] = TILE_CODE;
    newMap[6][2] = TILE_CODE;
    newMap[6][3] = TILE_CODE;

    // Place Profile building (right-center)
    newMap[5][MAP_WIDTH - 4] = TILE_PROFILE;
    newMap[5][MAP_WIDTH - 3] = TILE_PROFILE;
    newMap[6][MAP_WIDTH - 4] = TILE_PROFILE;
    newMap[6][MAP_WIDTH - 3] = TILE_PROFILE;

    // Place Whitepaper building (bottom-center)
    newMap[MAP_HEIGHT - 3][Math.floor(MAP_WIDTH / 2) - 1] = TILE_WHITEPAPER;
    newMap[MAP_HEIGHT - 3][Math.floor(MAP_WIDTH / 2)] = TILE_WHITEPAPER;
    newMap[MAP_HEIGHT - 4][Math.floor(MAP_WIDTH / 2) - 1] = TILE_WHITEPAPER;
    newMap[MAP_HEIGHT - 4][Math.floor(MAP_WIDTH / 2)] = TILE_WHITEPAPER;

    // Place X tiles (2 tiles above spawn - spawn is at center, so Y=2 is 2 tiles above center Y=4)
    const centerX = Math.floor(MAP_WIDTH / 2);
    const xTileY = 2; // 2 tiles above spawn (spawn Y is around 4)
    newMap[xTileY][centerX - 1] = TILE_X;
    newMap[xTileY][centerX] = TILE_X;

    // Connect buildings with roads (before adding trees and variety)
    const buildingPositions = [
      [
        { x: MAP_WIDTH - 5, y: 2 },
        { x: MAP_WIDTH - 4, y: 2 },
        { x: MAP_WIDTH - 5, y: 3 },
        { x: MAP_WIDTH - 4, y: 3 },
      ], // Blog
      [
        { x: 3, y: 2 },
        { x: 4, y: 2 },
        { x: 3, y: 3 },
        { x: 4, y: 3 },
      ], // Jobs
      [
        { x: 2, y: 5 },
        { x: 3, y: 5 },
        { x: 2, y: 6 },
        { x: 3, y: 6 },
      ], // Code
      [
        { x: MAP_WIDTH - 4, y: 5 },
        { x: MAP_WIDTH - 3, y: 5 },
        { x: MAP_WIDTH - 4, y: 6 },
        { x: MAP_WIDTH - 3, y: 6 },
      ], // Profile
      [
        { x: Math.floor(MAP_WIDTH / 2) - 1, y: MAP_HEIGHT - 3 },
        { x: Math.floor(MAP_WIDTH / 2), y: MAP_HEIGHT - 3 },
        { x: Math.floor(MAP_WIDTH / 2) - 1, y: MAP_HEIGHT - 4 },
        { x: Math.floor(MAP_WIDTH / 2), y: MAP_HEIGHT - 4 },
      ], // Whitepaper
      [
        { x: Math.floor(MAP_WIDTH / 2) - 1, y: 2 },
        { x: Math.floor(MAP_WIDTH / 2), y: 2 },
      ], // X tiles
    ];
    connectBuildingsWithRoads(newMap, buildingPositions);

    // Add ground variety and trees
    addGroundVariety(newMap);
    addTrees(newMap, [
      { x: 3, y: 2 },
      { x: 4, y: 2 },
      { x: 3, y: 3 },
      { x: 4, y: 3 }, // Jobs
      { x: MAP_WIDTH - 5, y: 2 },
      { x: MAP_WIDTH - 4, y: 2 },
      { x: MAP_WIDTH - 5, y: 3 },
      { x: MAP_WIDTH - 4, y: 3 }, // Blog
      { x: 2, y: 5 },
      { x: 3, y: 5 },
      { x: 2, y: 6 },
      { x: 3, y: 6 }, // Code
      { x: MAP_WIDTH - 4, y: 5 },
      { x: MAP_WIDTH - 3, y: 5 },
      { x: MAP_WIDTH - 4, y: 6 },
      { x: MAP_WIDTH - 3, y: 6 }, // Profile
      { x: Math.floor(MAP_WIDTH / 2) - 1, y: MAP_HEIGHT - 3 },
      { x: Math.floor(MAP_WIDTH / 2), y: MAP_HEIGHT - 3 },
      { x: Math.floor(MAP_WIDTH / 2) - 1, y: MAP_HEIGHT - 4 },
      { x: Math.floor(MAP_WIDTH / 2), y: MAP_HEIGHT - 4 }, // Whitepaper
      { x: Math.floor(MAP_WIDTH / 2) - 1, y: 2 },
      { x: Math.floor(MAP_WIDTH / 2), y: 2 }, // X tiles
    ]);

    return newMap;
  }, []);

  // Define buildings configuration
  const buildings: BuildingConfig[] = useMemo(
    () => [
      {
        id: "blog",
        tileType: TILE_BLOG,
        positions: [
          { x: MAP_WIDTH - 5, y: 2 },
          { x: MAP_WIDTH - 4, y: 2 },
          { x: MAP_WIDTH - 5, y: 3 },
          { x: MAP_WIDTH - 4, y: 3 },
        ],
        label: "BLOG",
        description: "Read our latest posts and updates",
        route: "/blog",
        color: "#a855f7",
        colorDark: "#9333ea",
        imagePath: "/houses/HOUSE2.png", // Replace blog building with house2
      },
      {
        id: "new-jobs",
        tileType: TILE_JOBS,
        positions: [
          { x: 3, y: 2 },
          { x: 4, y: 2 },
          { x: 3, y: 3 },
          { x: 4, y: 3 },
        ],
        label: "JOBS",
        description: "Explore tech jobs in a playable world",
        route: "/new-jobs",
        color: "#3b82f6",
        colorDark: "#2563eb",
        imagePath: "/houses/HOUSE1.png", // Replace jobs building with house1
      },
      {
        id: "code",
        tileType: TILE_CODE,
        positions: [
          { x: 2, y: 5 },
          { x: 3, y: 5 },
          { x: 2, y: 6 },
          { x: 3, y: 6 },
        ],
        label: "CODE",
        description: "Hackathons, Open Source, and Bounties",
        route: "/code",
        color: "#06b6d4",
        colorDark: "#0891b2",
      },
      {
        id: "members",
        tileType: TILE_PROFILE,
        positions: [
          { x: MAP_WIDTH - 4, y: 5 },
          { x: MAP_WIDTH - 3, y: 5 },
          { x: MAP_WIDTH - 4, y: 6 },
          { x: MAP_WIDTH - 3, y: 6 },
        ],
        label: "MEMBERS",
        description: "View our community members",
        route: "/members",
        color: "#ec4899",
        colorDark: "#db2777",
      },
      {
        id: "whitepaper",
        tileType: TILE_WHITEPAPER,
        positions: [
          { x: Math.floor(MAP_WIDTH / 2) - 1, y: MAP_HEIGHT - 4 },
          { x: Math.floor(MAP_WIDTH / 2), y: MAP_HEIGHT - 4 },
          { x: Math.floor(MAP_WIDTH / 2) - 1, y: MAP_HEIGHT - 3 },
          { x: Math.floor(MAP_WIDTH / 2), y: MAP_HEIGHT - 3 },
        ],
        label: "WHITEPAPER",
        customLabel: "WHITE\nPAPER",
        description: "Read our project whitepaper",
        route: "/whitepaper",
        color: "#eab308",
        colorDark: "#ca8a04",
      },
      {
        id: "x",
        tileType: TILE_X,
        positions: [
          { x: Math.floor(MAP_WIDTH / 2) - 1, y: 2 },
          { x: Math.floor(MAP_WIDTH / 2), y: 2 },
        ],
        label: "X",
        description: "Join our X community",
        route: "https://x.com/i/communities/1983062242292822298",
        color: "#000000",
        colorDark: "#000000",
      },
    ],
    []
  );

  const handleBuildingEnter = (route: string) => {
    if (route === "profile-popup") {
      setShowProfilePopup(true);
    } else {
      onBuildingEnter(route);
    }
  };

  // Handle Escape key to close popups (desktop only)
  useEffect(() => {
    if (isMobile) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        if (showSignOutConfirm) {
          setShowSignOutConfirm(false);
        } else if (showProfilePopup) {
          setShowProfilePopup(false);
        }
      }
    };

    if (showProfilePopup || showSignOutConfirm) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [showProfilePopup, showSignOutConfirm, isMobile]);

  return (
    <div className="relative w-full h-full">
      <BaseGameWorld
        map={map}
        buildings={buildings}
        onBuildingEnter={handleBuildingEnter}
        initialPlayerX={(MAP_WIDTH / 2) * 40}
        initialPlayerY={(MAP_HEIGHT / 2) * 40}
        onCloseDialog={() => {
          if (showProfilePopup) {
            setShowProfilePopup(false);
          }
        }}
        canCloseDialog={showProfilePopup}
      />

      {/* Sign Out Button - Top Right */}
      {isAuthenticated && (
        <div className="absolute top-4 right-4 z-[100]">
          <button
            onClick={() => setShowSignOutConfirm(true)}
            className="cursor-pointer flex items-center gap-2 px-3 py-2 bg-gray-900/90 border-2 border-red-500/70 text-red-400 font-bold text-sm uppercase tracking-wider hover:bg-red-500/20 hover:border-red-500 transition-all pointer-events-auto"
            title={`Sign out${
              user?.user_metadata?.user_name
                ? ` (${user.user_metadata.user_name})`
                : ""
            }`}
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      )}

      {/* Sign Out Confirmation Modal */}
      {showSignOutConfirm && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setShowSignOutConfirm(false)}
          />
          <div className="relative bg-gray-900 border-4 border-red-500 p-6 max-w-sm w-full">
            <h2 className="text-xl text-red-400 font-bold mb-4 text-center">
              CONFIRM SIGN OUT
            </h2>
            <p className="text-gray-300 text-center mb-6">
              Are you sure you want to sign out?
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setShowSignOutConfirm(false)}
                className="px-6 py-2 bg-gray-700 border-2 border-gray-500 text-gray-300 font-bold uppercase tracking-wider hover:bg-gray-600 hover:border-gray-400 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowSignOutConfirm(false);
                  signOut();
                }}
                className="px-6 py-2 bg-red-900/50 border-2 border-red-500 text-red-400 font-bold uppercase tracking-wider hover:bg-red-500/30 hover:border-red-400 transition-all"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Popup */}
      {showProfilePopup && (
        <>
          <div className="absolute inset-0 bg-transparent z-40 flex items-center justify-center p-4 pointer-events-none">
            <div className="pointer-events-auto">
              <div className="bg-gray-900 border-4 border-pink-500 max-w-2xl w-full max-h-[60vh] md:max-h-[90vh] overflow-y-auto flex flex-col mb-20 md:mb-0">
                <div className="flex justify-between items-center p-4 border-b border-pink-500">
                  <h2 className="text-2xl text-pink-400 font-bold">
                    YOUR PROFILE
                  </h2>
                </div>

                <div className="flex-1 p-6 space-y-6">
                  {/* Character Stats */}
                  <div className="border-2 border-pink-700 p-4">
                    <h3 className="text-xl text-pink-400 font-bold mb-4">
                      Character Stats
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-400 text-sm">Name</p>
                        <p className="text-white text-lg">{stats.name}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Level</p>
                        <p className="text-white text-lg">{stats.level}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Class</p>
                        <p className="text-white text-lg">{stats.class}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Gold</p>
                        <p className="text-yellow-400 text-lg">{stats.gold}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">HP</p>
                        <p className="text-green-400 text-lg">
                          {stats.hp} / {stats.maxHp}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">MP</p>
                        <p className="text-blue-400 text-lg">
                          {stats.mp} / {stats.maxMp}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="border-2 border-pink-700 p-4">
                    <h3 className="text-xl text-pink-400 font-bold mb-4">
                      Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {userProfile.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="bg-pink-500/20 text-pink-300 border border-pink-500 px-3 py-1 rounded text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Experience */}
                  {userProfile.experiences.length > 0 && (
                    <div className="border-2 border-pink-700 p-4">
                      <h3 className="text-xl text-pink-400 font-bold mb-4">
                        Experience
                      </h3>
                      <div className="space-y-3">
                        {userProfile.experiences.map((exp) => (
                          <div
                            key={exp.id}
                            className="border-l-2 border-pink-500 pl-4"
                          >
                            <p className="text-white font-semibold">
                              {exp.role}
                            </p>
                            <p className="text-gray-400 text-sm">
                              {exp.company}
                            </p>
                            <p className="text-gray-500 text-xs">
                              {exp.period}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Education */}
                  {userProfile.education.length > 0 && (
                    <div className="border-2 border-pink-700 p-4">
                      <h3 className="text-xl text-pink-400 font-bold mb-4">
                        Education
                      </h3>
                      <div className="space-y-3">
                        {userProfile.education.map((edu) => (
                          <div
                            key={edu.id}
                            className="border-l-2 border-pink-500 pl-4"
                          >
                            <p className="text-white font-semibold">
                              {edu.degree}
                            </p>
                            <p className="text-gray-400 text-sm">
                              {edu.school}
                            </p>
                            <p className="text-gray-500 text-xs">{edu.year}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Certifications */}
                  {userProfile.certs.length > 0 && (
                    <div className="border-2 border-pink-700 p-4">
                      <h3 className="text-xl text-pink-400 font-bold mb-4">
                        Certifications
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {userProfile.certs.map((cert, idx) => (
                          <span
                            key={idx}
                            className="bg-pink-500/20 text-pink-300 border border-pink-500 px-3 py-1 rounded text-sm"
                          >
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Page Views Counter - Bottom Left */}
      <div className="absolute bottom-4 left-4 z-[100] pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-900/80 border-2 border-emerald-500/50 text-emerald-400">
          <Eye className="w-4 h-4" />
          <span className="font-mono text-sm mr-1">Page Visits:</span>
          <span className="font-mono text-sm">
            {pageViews !== null ? pageViews.toLocaleString() : "---"}
          </span>
        </div>
      </div>
    </div>
  );
};
