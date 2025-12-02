"use client";

import React, { useMemo, useState, useEffect } from 'react';
import { BaseGameWorld } from './BaseGameWorld';
import { TILE_EMPTY, TILE_WALL, TILE_BLOG, TILE_BACK_TO_TOWN, MAP_WIDTH, MAP_HEIGHT } from '@/lib/game/constants';
import { addGroundVariety, addTrees, connectBuildingsWithRoads } from '@/lib/game/mapHelpers';
import { BuildingConfig } from '@/lib/game/types';
import { posts } from '@/lib/blog';

interface BlogSceneProps {
  onBack: () => void;
}

export const BlogScene: React.FC<BlogSceneProps> = ({ onBack }) => {
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [showPostPopup, setShowPostPopup] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  // Generate map
  const map = useMemo(() => {
    const newMap: number[][] = [];

    for (let y = 0; y < MAP_HEIGHT; y++) {
      const row: number[] = [];
      for (let x = 0; x < MAP_WIDTH; x++) {
        if (x === 0 || x === MAP_WIDTH - 1 || y === 0 || y === MAP_HEIGHT - 1) {
          row.push(TILE_WALL);
        } else {
          row.push(TILE_EMPTY);
        }
      }
      newMap.push(row);
    }

    // Place blog buildings representing posts
    const centerX = Math.floor(MAP_WIDTH / 2);
    const startY = 2;
    posts.slice(0, 4).forEach((post, idx) => {
      const x = centerX - 2 + (idx % 2) * 3;
      const y = startY + Math.floor(idx / 2) * 2;
      if (x >= 1 && x < MAP_WIDTH - 1 && y >= 1 && y < MAP_HEIGHT - 1) {
        newMap[y][x] = TILE_BLOG;
        newMap[y][x + 1] = TILE_BLOG;
        newMap[y + 1][x] = TILE_BLOG;
        newMap[y + 1][x + 1] = TILE_BLOG;
      }
    });

    // Place back to town building (bottom-left)
    newMap[MAP_HEIGHT - 2][1] = TILE_BACK_TO_TOWN;
    newMap[MAP_HEIGHT - 2][2] = TILE_BACK_TO_TOWN;
    newMap[MAP_HEIGHT - 3][1] = TILE_BACK_TO_TOWN;
    newMap[MAP_HEIGHT - 3][2] = TILE_BACK_TO_TOWN;

    // Connect buildings with roads
    const buildingPositions = [
      ...posts.slice(0, 4).map((post, idx) => {
        const centerX = Math.floor(MAP_WIDTH / 2);
        const startY = 2;
        const x = centerX - 2 + (idx % 2) * 3;
        const y = startY + Math.floor(idx / 2) * 2;
        return [
          { x, y }, { x: x + 1, y }, { x, y: y + 1 }, { x: x + 1, y: y + 1 }
        ];
      }),
      [{ x: 1, y: MAP_HEIGHT - 2 }, { x: 2, y: MAP_HEIGHT - 2 },
       { x: 1, y: MAP_HEIGHT - 3 }, { x: 2, y: MAP_HEIGHT - 3 }]
    ];
    connectBuildingsWithRoads(newMap, buildingPositions);

    // Add ground variety and trees
    addGroundVariety(newMap);
    const flatBuildingPositions = buildingPositions.flat();
    addTrees(newMap, flatBuildingPositions);

    return newMap;
  }, []);

  const buildings: BuildingConfig[] = useMemo(() => {
    const centerX = Math.floor(MAP_WIDTH / 2);
    const startY = 2;
    const blogBuildings = posts.slice(0, 4).map((post, idx) => {
      const x = centerX - 2 + (idx % 2) * 3;
      const y = startY + Math.floor(idx / 2) * 2;
      const date = new Date(post.date);
      const month = date.toLocaleDateString('en-US', { month: 'short' });
      const day = date.getDate();
      const customLabel = `${month}\n${day}`;
      
      return {
        id: `blog-${post.id}`,
        tileType: TILE_BLOG,
        positions: [
          { x, y },
          { x: x + 1, y },
          { x, y: y + 1 },
          { x: x + 1, y: y + 1 },
        ],
        label: post.title.substring(0, 15),
        description: post.summary.substring(0, 50) + '...',
        route: `blog-${post.id}`,
        color: '#a855f7',
        colorDark: '#9333ea',
        customLabel: customLabel,
        customData: post,
      };
    });
    
    return [
      ...blogBuildings,
      {
        id: 'back-to-town',
        tileType: TILE_BACK_TO_TOWN,
        positions: [
          { x: 1, y: MAP_HEIGHT - 3 },
          { x: 2, y: MAP_HEIGHT - 3 },
          { x: 1, y: MAP_HEIGHT - 2 },
          { x: 2, y: MAP_HEIGHT - 2 },
        ],
        label: 'BACK TO TOWN',
        description: 'Return to the main town',
        route: '/',
        color: '#ef4444',
        colorDark: '#dc2626',
        autoNavigate: true,
      },
    ];
  }, []);

  const handleBuildingEnter = (route: string) => {
    if (route.startsWith('blog-')) {
      const postId = route.replace('blog-', '');
      const post = posts.find(p => p.id === postId);
      if (post) {
        setSelectedPost(post);
        setShowPostPopup(true);
      }
    } else if (route === '/') {
      onBack();
    }
  };

  // Handle Escape key to close popup (desktop only)
  useEffect(() => {
    if (!showPostPopup || isMobile) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setShowPostPopup(false);
        setSelectedPost(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showPostPopup, isMobile]);

  return (
    <div className="relative w-full h-screen">
      <BaseGameWorld
        map={map}
        buildings={buildings}
        onBuildingEnter={handleBuildingEnter}
        initialPlayerX={(MAP_WIDTH / 2) * 40}
        initialPlayerY={(MAP_HEIGHT / 2) * 40}
        onCloseDialog={() => {
          setShowPostPopup(false);
          setSelectedPost(null);
        }}
        canCloseDialog={showPostPopup}
      />

      {/* Blog Post Popup */}
      {showPostPopup && selectedPost && (
        <>
          {/* Backdrop - Desktop only */}
          {!isMobile && <div className="fixed inset-0 bg-black/50 z-30" />}
          <div className={`absolute inset-0 bg-transparent z-40 flex items-center justify-center pointer-events-none ${
            isMobile ? 'p-0' : 'p-2 md:p-4'
          }`}>
            <div className="pointer-events-auto">
              <div className={`bg-gray-900 ${
                isMobile 
                  ? 'w-full max-h-[60vh] border-4 border-purple-500 mb-20' 
                  : 'border-4 border-purple-500 max-w-4xl w-full max-h-[90vh]'
              } flex flex-col overflow-hidden`}>
                <div className="flex justify-between items-center p-2 md:p-4 border-b border-purple-500">
                  <div>
                    <h2 className="text-lg md:text-2xl text-purple-400 font-bold">{selectedPost.title}</h2>
                    <p className="text-gray-400 text-xs md:text-sm mt-1">
                      {new Date(selectedPost.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 md:p-6">
                  <div className="prose prose-invert max-w-none">
                    <p className="text-purple-300 mb-4 md:mb-6 text-base md:text-lg">{selectedPost.summary}</p>
                    {selectedPost.content ? (
                      <div className="text-white">
                        {selectedPost.content.split(/\n\n+/).map((para: string, idx: number) => {
                          if (!para.trim()) return null;
                          
                          // Check if it's a heading
                          if (para.trim().startsWith('##')) {
                            const heading = para.replace(/^##+\s*/, '').trim();
                            return (
                              <h3 key={idx} className="text-purple-400 text-lg md:text-xl font-bold mt-4 md:mt-6 mb-2 md:mb-3">
                                {heading}
                              </h3>
                            );
                          }
                          
                          // Check if it's a code block
                          if (para.trim().startsWith('```')) {
                            const codeContent = para.split('\n').slice(1, -1).join('\n');
                            return (
                              <pre key={idx} className="bg-gray-800 p-3 md:p-4 rounded mb-3 md:mb-4 overflow-x-auto">
                                <code className="text-green-400 text-xs md:text-sm font-mono">{codeContent}</code>
                              </pre>
                            );
                          }
                          
                          // Check if it's a list item
                          if (para.trim().startsWith('-') || para.trim().startsWith('*')) {
                            const items = para.split('\n').filter(line => line.trim());
                            return (
                              <ul key={idx} className="list-disc list-inside mb-3 md:mb-4 space-y-1 md:space-y-2 ml-2 md:ml-4">
                                {items.map((item, itemIdx) => (
                                  <li key={itemIdx} className="text-gray-300 text-sm md:text-base">
                                    {item.replace(/^[-*]\s*/, '').trim()}
                                  </li>
                                ))}
                              </ul>
                            );
                          }
                          
                          // Regular paragraph
                          return (
                            <p key={idx} className="mb-3 md:mb-4 text-gray-300 leading-relaxed text-sm md:text-base">
                              {para.trim()}
                            </p>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-gray-400">Content coming soon...</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <EscapeButton onClose={() => { setShowPostPopup(false); setSelectedPost(null); }} />
          <div className="absolute inset-0 bg-transparent z-40 flex items-center justify-center p-4 pointer-events-none">
          <div className="pointer-events-auto">
          <div className="bg-gray-900 border-4 border-purple-500 max-w-4xl w-full max-h-[60vh] md:max-h-[90vh] flex flex-col mb-20 md:mb-0">
            <div className="flex justify-between items-center p-4 border-b border-purple-500">
              <div>
                <h2 className="text-2xl text-purple-400 font-bold">{selectedPost.title}</h2>
                <p className="text-gray-400 text-sm mt-1">
                  {new Date(selectedPost.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <button
                onClick={() => {
                  setShowPostPopup(false);
                  setSelectedPost(null);
                }}
                className="text-white hover:text-red-400 text-xl"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="prose prose-invert max-w-none">
                <p className="text-purple-300 mb-6 text-lg">{selectedPost.summary}</p>
                {selectedPost.content ? (
                  <div className="text-white">
                    {selectedPost.content.split(/\n\n+/).map((para: string, idx: number) => {
                      if (!para.trim()) return null;
                      
                      // Check if it's a heading
                      if (para.trim().startsWith('##')) {
                        const heading = para.replace(/^##+\s*/, '').trim();
                        return (
                          <h3 key={idx} className="text-purple-400 text-xl font-bold mt-6 mb-3">
                            {heading}
                          </h3>
                        );
                      }
                      
                      // Check if it's a code block
                      if (para.trim().startsWith('```')) {
                        const codeContent = para.split('\n').slice(1, -1).join('\n');
                        return (
                          <pre key={idx} className="bg-gray-800 p-4 rounded mb-4 overflow-x-auto">
                            <code className="text-green-400 text-sm font-mono">{codeContent}</code>
                          </pre>
                        );
                      }
                      
                      // Check if it's a list item
                      if (para.trim().startsWith('-') || para.trim().startsWith('*')) {
                        const items = para.split('\n').filter(line => line.trim());
                        return (
                          <ul key={idx} className="list-disc list-inside mb-4 space-y-2 ml-4">
                            {items.map((item, itemIdx) => (
                              <li key={itemIdx} className="text-gray-300">
                                {item.replace(/^[-*]\s*/, '').trim()}
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      
                      // Regular paragraph
                      return (
                        <p key={idx} className="mb-4 text-gray-300 leading-relaxed">
                          {para.trim()}
                        </p>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          </div>
          </div>
        </>
      )}

    </div>
  );
};

