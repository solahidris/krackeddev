"use client";

import React, { useMemo, useState, useEffect } from 'react';
import { BaseGameWorld } from './BaseGameWorld';
import { TILE_EMPTY, TILE_WALL, TILE_WHITEPAPER, TILE_BACK_TO_TOWN, TILE_SYSTEM, TILE_LEVELS, MAP_WIDTH, MAP_HEIGHT } from '@/lib/game/constants';
import { addGroundVariety, addTrees, connectBuildingsWithRoads } from '@/lib/game/mapHelpers';
import { BuildingConfig } from '@/lib/game/types';

interface WhitepaperSceneProps {
  onBack: () => void;
}

export const WhitepaperScene: React.FC<WhitepaperSceneProps> = ({ onBack }) => {
  const [showPDF, setShowPDF] = useState(false);
  const [showSystem, setShowSystem] = useState(false);
  const [showLevels, setShowLevels] = useState(false);
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

    // Place whitepaper building at top center (like blog posts)
    const centerX = Math.floor(MAP_WIDTH / 2);
    const startY = 2;
    const x = centerX - 1;
    const y = startY;
    if (x >= 1 && x < MAP_WIDTH - 1 && y >= 1 && y < MAP_HEIGHT - 1) {
      newMap[y][x] = TILE_WHITEPAPER;
      newMap[y][x + 1] = TILE_WHITEPAPER;
      newMap[y + 1][x] = TILE_WHITEPAPER;
      newMap[y + 1][x + 1] = TILE_WHITEPAPER;
    }

    // Place system building to the right of whitepaper
    const systemX = centerX + 2;
    const systemY = startY;
    if (systemX >= 1 && systemX < MAP_WIDTH - 1 && systemY >= 1 && systemY < MAP_HEIGHT - 1) {
      newMap[systemY][systemX] = TILE_SYSTEM;
      newMap[systemY][systemX + 1] = TILE_SYSTEM;
      newMap[systemY + 1][systemX] = TILE_SYSTEM;
      newMap[systemY + 1][systemX + 1] = TILE_SYSTEM;
    }

    // Place levels building to the left of whitepaper
    const levelsX = centerX - 4;
    const levelsY = startY;
    if (levelsX >= 1 && levelsX < MAP_WIDTH - 1 && levelsY >= 1 && levelsY < MAP_HEIGHT - 1) {
      newMap[levelsY][levelsX] = TILE_LEVELS;
      newMap[levelsY][levelsX + 1] = TILE_LEVELS;
      newMap[levelsY + 1][levelsX] = TILE_LEVELS;
      newMap[levelsY + 1][levelsX + 1] = TILE_LEVELS;
    }

    // Place back to town building (bottom-left)
    newMap[MAP_HEIGHT - 2][1] = TILE_BACK_TO_TOWN;
    newMap[MAP_HEIGHT - 2][2] = TILE_BACK_TO_TOWN;
    newMap[MAP_HEIGHT - 3][1] = TILE_BACK_TO_TOWN;
    newMap[MAP_HEIGHT - 3][2] = TILE_BACK_TO_TOWN;

    // Connect buildings with roads
    const buildingPositions = [
      [{ x: centerX - 1, y: startY }, { x: centerX, y: startY },
       { x: centerX - 1, y: startY + 1 }, { x: centerX, y: startY + 1 }],
      [{ x: systemX, y: systemY }, { x: systemX + 1, y: systemY },
       { x: systemX, y: systemY + 1 }, { x: systemX + 1, y: systemY + 1 }],
      [{ x: levelsX, y: levelsY }, { x: levelsX + 1, y: levelsY },
       { x: levelsX, y: levelsY + 1 }, { x: levelsX + 1, y: levelsY + 1 }],
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
    const x = centerX - 1;
    const y = startY;
    const systemX = centerX + 2;
    const systemY = startY;
    const levelsX = centerX - 4;
    const levelsY = startY;
    
    return [
      {
        id: 'whitepaper',
        tileType: TILE_WHITEPAPER,
        positions: [
          { x, y },
          { x: x + 1, y },
          { x, y: y + 1 },
          { x: x + 1, y: y + 1 },
        ],
        label: 'WHITEPAPER',
        customLabel: 'WHITE\nPAPER',
        description: 'Read our project whitepaper',
        route: 'whitepaper',
        color: '#eab308',
        colorDark: '#ca8a04',
      },
      {
        id: 'system',
        tileType: TILE_SYSTEM,
        positions: [
          { x: systemX, y: systemY },
          { x: systemX + 1, y: systemY },
          { x: systemX, y: systemY + 1 },
          { x: systemX + 1, y: systemY + 1 },
        ],
        label: 'SYSTEM',
        description: 'View rewards & progression system',
        route: 'system',
        color: '#a855f7',
        colorDark: '#9333ea',
      },
      {
        id: 'levels',
        tileType: TILE_LEVELS,
        positions: [
          { x: levelsX, y: levelsY },
          { x: levelsX + 1, y: levelsY },
          { x: levelsX, y: levelsY + 1 },
          { x: levelsX + 1, y: levelsY + 1 },
        ],
        label: 'LEVELS',
        description: 'View complete leveling tasks library',
        route: 'levels',
        color: '#3b82f6',
        colorDark: '#2563eb',
      },
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
        customLabel: 'BACK\nTO\nTOWN',
        description: 'Return to the main town',
        route: '/',
        color: '#ef4444',
        colorDark: '#dc2626',
        autoNavigate: true,
      },
    ];
  }, []);

  const handleBuildingEnter = (route: string) => {
    if (route === '/') {
      onBack();
    } else if (route === 'whitepaper') {
      setShowPDF(true);
    } else if (route === 'system') {
      setShowSystem(true);
    } else if (route === 'levels') {
      setShowLevels(true);
    }
  };

  // Handle Escape key to close popup (desktop only)
  useEffect(() => {
    if ((!showPDF && !showSystem && !showLevels) || isMobile) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setShowPDF(false);
        setShowSystem(false);
        setShowLevels(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showPDF, showSystem, showLevels, isMobile]);

  return (
    <div className="relative w-full h-screen">
      <BaseGameWorld
        map={map}
        buildings={buildings}
        onBuildingEnter={handleBuildingEnter}
        initialPlayerX={(MAP_WIDTH / 2) * 40}
        initialPlayerY={(MAP_HEIGHT / 2) * 40}
        onCloseDialog={() => {
          setShowPDF(false);
          setShowSystem(false);
          setShowLevels(false);
        }}
        canCloseDialog={showPDF || showSystem || showLevels}
      />

      {/* PDF Viewer Overlay */}
      {showPDF && (
        <>
          {/* Backdrop - Desktop only */}
          {!isMobile && <div className="fixed inset-0 bg-black/50 z-30" />}
          <div className="absolute inset-0 bg-transparent z-40 flex items-center justify-center p-2 md:p-4 pointer-events-none">
            <div className="pointer-events-auto">
              <div className={`bg-gray-900 border-4 border-yellow-500 max-w-4xl w-full overflow-y-auto p-4 md:p-6 ${
                isMobile ? 'max-h-[60vh] mb-20' : 'max-h-[80vh]'
              }`}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl text-yellow-400 font-bold">WHITEPAPER</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <div className="text-white space-y-4 md:space-y-6">
                      <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-2 md:mb-4">KRACKED DEVS WHITEPAPER v1.0</h1>
                        <p className="text-xl md:text-2xl font-semibold text-yellow-300 mb-2 md:mb-3">Play. Learn. Get Hired. Build Together.</p>
                        <p className="text-gray-300 text-sm md:text-base mb-1">Published: December 2025</p>
                        <p className="text-gray-300 text-sm md:text-base mb-1">Location: Malaysia</p>
                        <p className="text-gray-300 text-sm md:text-base mb-4 md:mb-6">Status: Public - Community & Investor Edition</p>
                      </div>

                      <div className="border-t border-yellow-500/30 pt-4 md:pt-6">
                        <h2 className="text-xl md:text-2xl font-bold text-yellow-400 mb-3 md:mb-4">EXECUTIVE SUMMARY</h2>
                        <p className="text-gray-300 mb-3 md:mb-4 text-sm md:text-base">
                          Kracked Devs is a gamified developer community platform solving three critical problems in Southeast Asia's tech ecosystem:
                        </p>
                        <ol className="list-decimal list-inside space-y-2 md:space-y-3 ml-2 md:ml-4 mb-4 md:mb-6">
                          <li className="text-gray-300 text-sm md:text-base">
                            <strong className="text-yellow-300">For Junior Developers:</strong> No clear path from zero experience to employment. Traditional bootcamps are expensive, rigid, and produce portfolio-less graduates.
                          </li>
                          <li className="text-gray-300 text-sm md:text-base">
                            <strong className="text-yellow-300">For Companies:</strong> No efficient talent pipeline. Finding junior developers with proven skills and built portfolios is expensive and time-consuming.
                          </li>
                          <li className="text-gray-300 text-sm md:text-base">
                            <strong className="text-yellow-300">For Communities:</strong> Most developer communities die after launch because they lack engagement mechanics and real incentives to stay.
                          </li>
                        </ol>
                        <p className="text-gray-300 mb-3 md:mb-4 text-sm md:text-base">
                          <strong className="text-yellow-300">Our Solution:</strong> A retro 2D game where developers build their portfolios, learn vibe coding (AI-assisted development), earn real income through mentoring and project work, and companies access pre-screened talent ready to hire.
                        </p>
                        <p className="text-gray-300 mb-3 md:mb-4 text-sm md:text-base">
                          <strong className="text-yellow-300">Market Opportunity:</strong> Malaysia has 50,000+ junior developers looking for first jobs. Tech companies report 40% of job postings unfilled due to talent gaps. We're capturing both sides of this marketplace.
                        </p>
                      </div>

                      <div className="border-t border-yellow-500/30 pt-4 md:pt-6">
                        <h2 className="text-xl md:text-2xl font-bold text-yellow-400 mb-3 md:mb-4">PROBLEM STATEMENT</h2>
                        <h3 className="text-lg md:text-xl font-semibold text-yellow-300 mb-3 md:mb-4">The Developer Crisis in Malaysia & SEA</h3>
                        
                        <div className="mb-4 md:mb-6">
                          <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">Problem 1: The Portfolio Gap</h4>
                          <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-3 md:mb-4">
                            <li className="text-gray-300 text-sm md:text-base">Fresh graduates have no real projects to show employers</li>
                            <li className="text-gray-300 text-sm md:text-base">Bootcamps teach theory, not real-world development</li>
                            <li className="text-gray-300 text-sm md:text-base">Building projects alone takes months without guidance</li>
                            <li className="text-gray-300 text-sm md:text-base">"Resume-driven" hiring still dominates despite skill gaps</li>
                          </ul>
                        </div>

                        <div className="mb-4 md:mb-6">
                          <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">Problem 2: Community Fatigue</h4>
                          <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-3 md:mb-4">
                            <li className="text-gray-300 text-sm md:text-base">Discord communities grow to 1,000+ members and then die</li>
                            <li className="text-gray-300 text-sm md:text-base">No incentive for members to stay beyond initial hype</li>
                            <li className="text-gray-300 text-sm md:text-base">Mentorship is ad-hoc and inconsistent</li>
                            <li className="text-gray-300 text-sm md:text-base">No way to monetize community participation</li>
                          </ul>
                        </div>

                        <div className="mb-4 md:mb-6">
                          <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">Problem 3: Talent Acquisition Inefficiency</h4>
                          <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-3 md:mb-4">
                            <li className="text-gray-300 text-sm md:text-base">Companies spend 3-6 months hiring one junior developer</li>
                            <li className="text-gray-300 text-sm md:text-base">LinkedIn/traditional job boards waste time on unqualified candidates</li>
                            <li className="text-gray-300 text-sm md:text-base">No way to validate actual coding ability during recruitment</li>
                            <li className="text-gray-300 text-sm md:text-base">Hiring costs offset savings from "junior" salary bands</li>
                          </ul>
                        </div>

                        <div className="mb-4 md:mb-6">
                          <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">Why Gamification Solves This</h4>
                          <p className="text-gray-300 mb-3 md:mb-4 text-sm md:text-base">
                            Gaming creates habit formation. 87% of gamified learning platforms show 30%+ higher engagement than non-gamified alternatives. By wrapping the entire developer journey in a game:
                          </p>
                          <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-3 md:mb-4">
                            <li className="text-gray-300 text-sm md:text-base">Members log in daily (habit formation)</li>
                            <li className="text-gray-300 text-sm md:text-base">Progress is visible (psychological reward)</li>
                            <li className="text-gray-300 text-sm md:text-base">Community is embedded (social accountability)</li>
                            <li className="text-gray-300 text-sm md:text-base">Real rewards exist (mentoring income, project pay, job opportunities)</li>
                          </ul>
                        </div>
                      </div>

                      <div className="border-t border-yellow-500/30 pt-4 md:pt-6">
                        <h2 className="text-xl md:text-2xl font-bold text-yellow-400 mb-3 md:mb-4">OUR SOLUTION: KRACKED DEVS ECOSYSTEM</h2>
                        <h3 className="text-lg md:text-xl font-semibold text-yellow-300 mb-3 md:mb-4">What We Built</h3>
                        <p className="text-gray-300 mb-3 md:mb-4 text-sm md:text-base">
                          A retro 2D Pokemon-style game hub where:
                        </p>
                        <ol className="list-decimal list-inside space-y-2 md:space-y-3 ml-2 md:ml-4 mb-4 md:mb-6">
                          <li className="text-gray-300 text-sm md:text-base">
                            <strong className="text-yellow-300">New Members Join (Level 1-5):</strong> Onboarding takes 1-2 days. They create an avatar, link social media, set up GitHub, and get introduced to vibe coding.
                          </li>
                          <li className="text-gray-300 text-sm md:text-base">
                            <strong className="text-yellow-300">Members Learn (Level 6-10):</strong> Real mentors teach vibe coding bootcamp. Members build 2-3 portfolio projects with AI assistance while earning XP and cosmetics.
                          </li>
                          <li className="text-gray-300 text-sm md:text-base">
                            <strong className="text-yellow-300">Members Contribute (Level 11-20):</strong> Members take on real projects posted by companies. Solo and team projects. They earn cosmetics, in-game currency, and real money (RM50-500 per project).
                          </li>
                          <li className="text-gray-300 text-sm md:text-base">
                            <strong className="text-yellow-300">Members Become Mentors (Level 25+):</strong> Proven developers apply to mentor others. They earn RM30-100/hour from mentoring sessions, all tracked in-game.
                          </li>
                          <li className="text-gray-300 text-sm md:text-base">
                            <strong className="text-yellow-300">Members Get Hired (Level 30+):</strong> Portfolio visible to employers. Hiring managers browse profiles, interview candidates directly on platform. Commission-based revenue model for Kracked Devs.
                          </li>
                          <li className="text-gray-300 text-sm md:text-base">
                            <strong className="text-yellow-300">Hired Members Become Ambassadors:</strong> Alumni get special badge, referral bonuses (RM100-1000), and ongoing engagement through exclusive content. They recruit next generation.
                          </li>
                        </ol>
                        <h3 className="text-lg md:text-xl font-semibold text-yellow-300 mb-3 md:mb-4">The Loop</h3>
                        <p className="text-gray-300 mb-2 md:mb-3 text-sm md:text-base font-mono">
                          Join → Learn → Build → Mentor → Hire → Refer → Repeat
                        </p>
                        <p className="text-gray-300 mb-2 md:mb-3 text-sm md:text-base font-mono">
                          ↓ ↓ ↓ ↓ ↓ ↓
                        </p>
                        <p className="text-gray-300 mb-3 md:mb-4 text-sm md:text-base font-mono">
                          XP Badges Portfolio Income Job RM100-1000
                        </p>
                        <p className="text-gray-300 text-sm md:text-base">
                          Each step is gamified. Each step builds toward employment. Each step strengthens community.
                        </p>
                      </div>

                      <div className="border-t border-yellow-500/30 pt-4 md:pt-6">
                        <h2 className="text-xl md:text-2xl font-bold text-yellow-400 mb-3 md:mb-4">WHY KRACKED DEVS IS UNIQUE</h2>
                        
                        <div className="space-y-4 md:space-y-6 mb-4 md:mb-6">
                          <div>
                            <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">1. No Competitors in SEA</h4>
                            <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-3 md:mb-4">
                              <li className="text-gray-300 text-sm md:text-base">Duolingo: Learning only, no employment</li>
                              <li className="text-gray-300 text-sm md:text-base">LeetCode: Competitive coding, not career dev</li>
                              <li className="text-gray-300 text-sm md:text-base">Discord: Social, not gamified</li>
                              <li className="text-gray-300 text-sm md:text-base">LinkedIn: Job board, no learning or community</li>
                              <li className="text-gray-300 text-sm md:text-base">We're: Learning + Community + Gamification + Jobs + Income = First mover advantage</li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">2. Aligned Incentives</h4>
                            <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-3 md:mb-4">
                              <li className="text-gray-300 text-sm md:text-base">Members want jobs → They stay engaged</li>
                              <li className="text-gray-300 text-sm md:text-base">Companies want talent → They pay for access</li>
                              <li className="text-gray-300 text-sm md:text-base">Mentors want income → They teach well</li>
                              <li className="text-gray-300 text-sm md:text-base">Kracked Devs wants growth → Everyone benefits</li>
                              <li className="text-gray-300 text-sm md:text-base">No contradiction. System compounds over time.</li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">3. Vibe Coding = Modern Dev Path</h4>
                            <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-3 md:mb-4">
                              <li className="text-gray-300 text-sm md:text-base">2025: AI coding tools are mainstream (ChatGPT, Cursor, Claude)</li>
                              <li className="text-gray-300 text-sm md:text-base">Junior devs CAN build real apps in weeks, not months</li>
                              <li className="text-gray-300 text-sm md:text-base">Learning manual coding takes 6-12 months</li>
                              <li className="text-gray-300 text-sm md:text-base">Learning to use AI coding takes 1-2 months</li>
                              <li className="text-gray-300 text-sm md:text-base">We're teaching the 2025 way, not the 2015 way</li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">4. Community as Moat</h4>
                            <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-3 md:mb-4">
                              <li className="text-gray-300 text-sm md:text-base">Easy to copy features (badges, XP, etc.)</li>
                              <li className="text-gray-300 text-sm md:text-base">Hard to copy community</li>
                              <li className="text-gray-300 text-sm md:text-base">500+ active members = strong network effects</li>
                              <li className="text-gray-300 text-sm md:text-base">First to build = biggest advantage</li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">5. Real Revenue Model</h4>
                            <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-3 md:mb-4">
                              <li className="text-gray-300 text-sm md:text-base">B2B (Companies): RM500-2000 per job posting + commission per hire</li>
                              <li className="text-gray-300 text-sm md:text-base">B2C (Mentors): Kracked takes 30% of mentoring fees</li>
                              <li className="text-gray-300 text-sm md:text-base">B2C (Projects): Kracked takes 15-20% of project payments</li>
                              <li className="text-gray-300 text-sm md:text-base">No ads. No VC dependency. Profitable by Year 2.</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-yellow-500/30 pt-4 md:pt-6">
                        <h2 className="text-xl md:text-2xl font-bold text-yellow-400 mb-3 md:mb-4">FOR MEMBERS: WHY YOU SHOULD JOIN</h2>
                        <h3 className="text-lg md:text-xl font-semibold text-yellow-300 mb-3 md:mb-4">You Get</h3>
                        
                        <div className="mb-4 md:mb-6">
                          <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">1. Guided Path to Employment</h4>
                          <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-3 md:mb-4">
                            <li className="text-gray-300 text-sm md:text-base">Clear levels (1-30+) = clear career progression</li>
                            <li className="text-gray-300 text-sm md:text-base">Mentors at every stage (not just Discord chaos)</li>
                            <li className="text-gray-300 text-sm md:text-base">Real projects to build (portfolio building)</li>
                            <li className="text-gray-300 text-sm md:text-base">Employer introductions (interview prep, job offers)</li>
                          </ul>
                        </div>

                        <div className="mb-4 md:mb-6">
                          <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">2. Real Income (Not Just XP)</h4>
                          <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-3 md:mb-4">
                            <li className="text-gray-300 text-sm md:text-base">Mentoring: RM30-100/hour (Levels 25+)</li>
                            <li className="text-gray-300 text-sm md:text-base">Project work: RM50-500 per project (Levels 21+)</li>
                            <li className="text-gray-300 text-sm md:text-base">Referral bonuses: RM100-1000 (when you refer hires)</li>
                            <li className="text-gray-300 text-sm md:text-base">Combine these: RM500-2000/month possible by month 4-6</li>
                          </ul>
                        </div>

                        <div className="mb-4 md:mb-6">
                          <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">3. Community Support</h4>
                          <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-3 md:mb-4">
                            <li className="text-gray-300 text-sm md:text-base">No struggle alone</li>
                            <li className="text-gray-300 text-sm md:text-base">Mentors who've been where you are</li>
                            <li className="text-gray-300 text-sm md:text-base">Peer support (1,000+ members eventually)</li>
                            <li className="text-gray-300 text-sm md:text-base">Accountability (someone knows your goal)</li>
                          </ul>
                        </div>

                        <div className="mb-4 md:mb-6">
                          <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">4. Fun</h4>
                          <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-3 md:mb-4">
                            <li className="text-gray-300 text-sm md:text-base">Yeah, it's a game. Dark green hub. Retro aesthetic.</li>
                            <li className="text-gray-300 text-sm md:text-base">Cosmetics. Pets. Badges. Leaderboards.</li>
                            <li className="text-gray-300 text-sm md:text-base">Why grind leetcode when you can grind something that leads to a job?</li>
                            <li className="text-gray-300 text-sm md:text-base">Developer comedy + learning &gt; boring tutorials</li>
                          </ul>
                        </div>

                        <div className="mb-4 md:mb-6">
                          <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">5. Permanent Record</h4>
                          <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-3 md:mb-4">
                            <li className="text-gray-300 text-sm md:text-base">Your portfolio lives on our platform</li>
                            <li className="text-gray-300 text-sm md:text-base">Employers see your badges, projects, mentor score</li>
                            <li className="text-gray-300 text-sm md:text-base">Proof of learning &gt; resume claims</li>
                            <li className="text-gray-300 text-sm md:text-base">Alumni status = permanent badge + referral income potential</li>
                          </ul>
                        </div>

                        <h3 className="text-lg md:text-xl font-semibold text-yellow-300 mb-3 md:mb-4">Success Timeline</h3>
                        <div className="overflow-x-auto mb-4 md:mb-6">
                          <table className="w-full text-sm md:text-base border-collapse">
                            <thead>
                              <tr className="border-b border-yellow-500/30">
                                <th className="text-left text-yellow-300 p-2">Timeline</th>
                                <th className="text-left text-yellow-300 p-2">What Happens</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-yellow-500/20">
                                <td className="text-gray-300 p-2">Week 1</td>
                                <td className="text-gray-300 p-2">Create avatar. Setup GitHub. Join Discord. Build your first project with AI.</td>
                              </tr>
                              <tr className="border-b border-yellow-500/20">
                                <td className="text-gray-300 p-2">Month 1</td>
                                <td className="text-gray-300 p-2">Level 10. Completed bootcamp. 2 projects in portfolio. Ready for feedback.</td>
                              </tr>
                              <tr className="border-b border-yellow-500/20">
                                <td className="text-gray-300 p-2">Month 2-3</td>
                                <td className="text-gray-300 p-2">Level 20. Intermediate projects. Specialization chosen (frontend/backend/full-stack).</td>
                              </tr>
                              <tr className="border-b border-yellow-500/20">
                                <td className="text-gray-300 p-2">Month 4-6</td>
                                <td className="text-gray-300 p-2">Level 25+. Mentoring others OR taking contract projects. Earning RM500+/month. Job offers coming.</td>
                              </tr>
                              <tr>
                                <td className="text-gray-300 p-2">Month 6-8</td>
                                <td className="text-gray-300 p-2">HIRED. Get paid (RM3,000-5,000/month entry job). Stay in Kracked Devs, mentor others, earn RM500-1000 extra/month.</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <p className="text-gray-300 text-sm md:text-base italic">
                          Some members get hired faster. Some take 8-12 months. Depends on starting level and commitment.
                        </p>
                      </div>

                      <div className="border-t border-yellow-500/30 pt-4 md:pt-6">
                        <h2 className="text-xl md:text-2xl font-bold text-yellow-400 mb-3 md:mb-4">FOR COMPANIES: WHY YOU SHOULD PARTNER</h2>
                        <h3 className="text-lg md:text-xl font-semibold text-yellow-300 mb-3 md:mb-4">The Problem We Solve For You</h3>
                        
                        <div className="mb-4 md:mb-6">
                          <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">Before Kracked Devs:</h4>
                          <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-3 md:mb-4">
                            <li className="text-gray-300 text-sm md:text-base">Post on LinkedIn → 500 unqualified applications</li>
                            <li className="text-gray-300 text-sm md:text-base">HR screens 100 resumes → 10 interviews → 2 offers → 1 hire accepted</li>
                            <li className="text-gray-300 text-sm md:text-base">Time: 3-6 months per junior hire</li>
                            <li className="text-gray-300 text-sm md:text-base">Cost: RM5,000-15,000 (HR, recruiter fees)</li>
                            <li className="text-gray-300 text-sm md:text-base">Uncertainty: Will they actually ship code?</li>
                          </ul>
                        </div>

                        <div className="mb-4 md:mb-6">
                          <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">With Kracked Devs:</h4>
                          <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-3 md:mb-4">
                            <li className="text-gray-300 text-sm md:text-base">Post project/job on our platform → Browse 100+ portfolios</li>
                            <li className="text-gray-300 text-sm md:text-base">Each portfolio has: actual code (GitHub), mentorship score, projects completed, peers' feedback</li>
                            <li className="text-gray-300 text-sm md:text-base">Hire in 2-4 weeks</li>
                            <li className="text-gray-300 text-sm md:text-base">Cost: RM500-2000 job posting + 15% commission on salary (only if hire succeeds)</li>
                            <li className="text-gray-300 text-sm md:text-base">Certainty: You've seen their code. You've seen their growth. You know their mentor's opinion.</li>
                          </ul>
                        </div>

                        <h3 className="text-lg md:text-xl font-semibold text-yellow-300 mb-3 md:mb-4">How It Works</h3>
                        
                        <div className="mb-4 md:mb-6">
                          <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">Step 1: Post Job or Project</h4>
                          <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-3 md:mb-4">
                            <li className="text-gray-300 text-sm md:text-base">"Hiring junior React developer" OR "Contract work: Build product filter feature"</li>
                            <li className="text-gray-300 text-sm md:text-base">RM500-2000 posting fee (one-time)</li>
                            <li className="text-gray-300 text-sm md:text-base">Posted to Kracked Devs job board</li>
                          </ul>
                        </div>

                        <div className="mb-4 md:mb-6">
                          <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">Step 2: Browse Vetted Candidates</h4>
                          <p className="text-gray-300 mb-2 md:mb-3 text-sm md:text-base">Each candidate profile shows:</p>
                          <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-3 md:mb-4">
                            <li className="text-gray-300 text-sm md:text-base">GitHub portfolio (links to live projects)</li>
                            <li className="text-gray-300 text-sm md:text-base">Bootcamp completion status</li>
                            <li className="text-gray-300 text-sm md:text-base">Mentor rating ("Azim rated this developer 4.8/5 stars")</li>
                            <li className="text-gray-300 text-sm md:text-base">Project history ("Completed 3 projects, avg rating 4.7/5")</li>
                            <li className="text-gray-300 text-sm md:text-base">Specialization ("Frontend React focus")</li>
                            <li className="text-gray-300 text-sm md:text-base">Blog posts / learning journey</li>
                          </ul>
                        </div>

                        <div className="mb-4 md:mb-6">
                          <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">Step 3: Interview</h4>
                          <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-3 md:mb-4">
                            <li className="text-gray-300 text-sm md:text-base">Reach out directly to candidate</li>
                            <li className="text-gray-300 text-sm md:text-base">Vet skill level + culture fit</li>
                            <li className="text-gray-300 text-sm md:text-base">No more guessing</li>
                          </ul>
                        </div>

                        <div className="mb-4 md:mb-6">
                          <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">Step 4: Hire</h4>
                          <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-3 md:mb-4">
                            <li className="text-gray-300 text-sm md:text-base">If hired: Kracked Devs gets 15% commission (one-time, from salary OR project fee)</li>
                            <li className="text-gray-300 text-sm md:text-base">Example: Hire junior dev at RM4,000/month salary → Kracked gets RM600 (first month only) → Cracked Dev gets promoted to alumni, earns referral bonuses</li>
                            <li className="text-gray-300 text-sm md:text-base">Example: Contract project RM2,000 → Cracked gets RM300</li>
                          </ul>
                        </div>

                        <div className="mb-4 md:mb-6">
                          <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">Step 5: Referral Loop</h4>
                          <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-3 md:mb-4">
                            <li className="text-gray-300 text-sm md:text-base">Hired alumni mentors others → Others get hired → You can hire from next cohort</li>
                            <li className="text-gray-300 text-sm md:text-base">Network effect compounds</li>
                          </ul>
                        </div>

                        <h3 className="text-lg md:text-xl font-semibold text-yellow-300 mb-3 md:mb-4">Why Companies Love This</h3>
                        <ol className="list-decimal list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-4 md:mb-6">
                          <li className="text-gray-300 text-sm md:text-base">Speed: 2-4 weeks vs 3-6 months</li>
                          <li className="text-gray-300 text-sm md:text-base">Quality: Pre-screened, portfolio-proven candidates</li>
                          <li className="text-gray-300 text-sm md:text-base">Cost: RM500-2000 + 15% commission only if successful = risk-based pricing</li>
                          <li className="text-gray-300 text-sm md:text-base">Community: Build employer brand with junior devs (they talk about their company + Kracked Devs to friends)</li>
                          <li className="text-gray-300 text-sm md:text-base">Talent Pipeline: Refer more hires, save more costs, get them faster next time</li>
                        </ol>

                        <h3 className="text-lg md:text-xl font-semibold text-yellow-300 mb-3 md:mb-4">Example Economics (For Company)</h3>
                        <div className="mb-4 md:mb-6 p-4 bg-gray-800 border border-yellow-500/30 rounded">
                          <p className="text-gray-300 text-sm md:text-base mb-2 font-semibold">Typical Hiring (without Kracked):</p>
                          <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-3 md:mb-4 text-sm md:text-base">
                            <li className="text-gray-300">LinkedIn posting: Free but gets 500 bad applications</li>
                            <li className="text-gray-300">HR screening: RM2,000 (100 hours @ RM20/hr)</li>
                            <li className="text-gray-300">Recruitment agency: RM3,000-5,000 (15-25% of salary)</li>
                            <li className="text-gray-300">Interview rounds: RM1,000 (3 x 4-hour interview cycles)</li>
                            <li className="text-gray-300">Total: RM6,000-8,000 for ONE junior dev</li>
                            <li className="text-gray-300">Time: 3-6 months</li>
                          </ul>
                          <p className="text-gray-300 text-sm md:text-base mb-2 font-semibold">Kracked Devs Hiring (same scenario):</p>
                          <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-3 md:mb-4 text-sm md:text-base">
                            <li className="text-gray-300">Job posting: RM500</li>
                            <li className="text-gray-300">10 portfolios reviewed by hiring manager: 2 hours (free, easy, they're vetted)</li>
                            <li className="text-gray-300">3 interviews with pre-screened candidates: 4 hours (free, efficient)</li>
                            <li className="text-gray-300">Commission (on hire): RM600 (one-time, 15% of RM4,000/month salary)</li>
                            <li className="text-gray-300">Total: RM1,100 for ONE junior dev</li>
                            <li className="text-gray-300">Time: 2-4 weeks</li>
                          </ul>
                          <p className="text-gray-300 text-sm md:text-base font-semibold text-yellow-300">
                            Savings: RM4,900-6,900 per hire + 1-4 months faster
                          </p>
                          <p className="text-gray-300 text-sm md:text-base">
                            ROI: If you hire 5 juniors/year via Kracked instead of traditional methods, save RM24,500-34,500 + 5-20 months accelerated hiring
                          </p>
                        </div>

                        <h3 className="text-lg md:text-xl font-semibold text-yellow-300 mb-3 md:mb-4">Success Stories (Will Build Over Time)</h3>
                        <p className="text-gray-300 text-sm md:text-base mb-3 md:mb-4">
                          We'll feature companies publicly:
                        </p>
                        <div className="mb-4 md:mb-6 p-4 bg-gray-800 border border-yellow-500/30 rounded italic">
                          <p className="text-gray-300 text-sm md:text-base">
                            "Shopee hired 3 junior developers via Kracked Devs in Q1 2025. Cost: RM2,500. Time: 6 weeks. All 3 still employed, promoted twice."
                          </p>
                        </div>
                        <p className="text-gray-300 text-sm md:text-base">
                          This becomes marketing for Kracked Devs AND proof for other companies.
                        </p>
                      </div>

                      <div className="border-t border-yellow-500/30 pt-4 md:pt-6">
                        <h2 className="text-xl md:text-2xl font-bold text-yellow-400 mb-3 md:mb-4">BUSINESS MODEL & REVENUE STREAMS</h2>
                        <h3 className="text-lg md:text-xl font-semibold text-yellow-300 mb-3 md:mb-4">Revenue Breakdown</h3>
                        
                        <div className="overflow-x-auto mb-4 md:mb-6">
                          <table className="w-full text-xs md:text-sm border-collapse">
                            <thead>
                              <tr className="border-b border-yellow-500/30">
                                <th className="text-left text-yellow-300 p-2">Stream</th>
                                <th className="text-left text-yellow-300 p-2">Unit Economics</th>
                                <th className="text-left text-yellow-300 p-2">Projected Annual (Year 1)</th>
                                <th className="text-left text-yellow-300 p-2">Projected Annual (Year 3)</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-yellow-500/20">
                                <td className="text-gray-300 p-2">Job Postings</td>
                                <td className="text-gray-300 p-2">RM500-2000 per posting</td>
                                <td className="text-gray-300 p-2">RM50K (100 postings)</td>
                                <td className="text-gray-300 p-2">RM500K (500 postings)</td>
                              </tr>
                              <tr className="border-b border-yellow-500/20">
                                <td className="text-gray-300 p-2">Recruitment Commission</td>
                                <td className="text-gray-300 p-2">15% of first month salary</td>
                                <td className="text-gray-300 p-2">RM100K (50 hires @ RM4K avg)</td>
                                <td className="text-gray-300 p-2">RM1.5M (250 hires)</td>
                              </tr>
                              <tr className="border-b border-yellow-500/20">
                                <td className="text-gray-300 p-2">Mentoring Fees</td>
                                <td className="text-gray-300 p-2">30% commission on RM30-100/hr</td>
                                <td className="text-gray-300 p-2">RM40K (20 mentors, 200 sessions/yr)</td>
                                <td className="text-gray-300 p-2">RM300K (100 mentors)</td>
                              </tr>
                              <tr className="border-b border-yellow-500/20">
                                <td className="text-gray-300 p-2">Project Revenue</td>
                                <td className="text-gray-300 p-2">15-20% commission on contract work</td>
                                <td className="text-gray-300 p-2">RM30K (20 projects @ RM1K avg)</td>
                                <td className="text-gray-300 p-2">RM400K (200 projects)</td>
                              </tr>
                              <tr className="border-b border-yellow-500/20">
                                <td className="text-gray-300 p-2">Premium Features (Future)</td>
                                <td className="text-gray-300 p-2">RM50-100/month per premium user</td>
                                <td className="text-gray-300 p-2">RM0 (launch phase)</td>
                                <td className="text-gray-300 p-2">RM200K (4000 premium users)</td>
                              </tr>
                              <tr>
                                <td className="text-yellow-300 font-semibold p-2">TOTAL REVENUE</td>
                                <td className="text-yellow-300 font-semibold p-2">—</td>
                                <td className="text-yellow-300 font-semibold p-2">RM220K</td>
                                <td className="text-yellow-300 font-semibold p-2">RM2.9M</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <h3 className="text-lg md:text-xl font-semibold text-yellow-300 mb-3 md:mb-4">Unit Economics</h3>
                        <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-4 md:mb-6">
                          <li className="text-gray-300 text-sm md:text-base">Customer Acquisition Cost (CAC): RM50-100 per member (via social + influencers)</li>
                          <li className="text-gray-300 text-sm md:text-base">Lifetime Value (LTV): RM500-1000 per member (if 2% become hiring managers, rest mentor)</li>
                          <li className="text-gray-300 text-sm md:text-base">LTV:CAC Ratio: 5:1 to 10:1 ✅ Healthy</li>
                        </ul>

                        <h3 className="text-lg md:text-xl font-semibold text-yellow-300 mb-3 md:mb-4">Profitability Timeline</h3>
                        <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-4 md:mb-6">
                          <li className="text-gray-300 text-sm md:text-base">Year 1: Break-even or slight loss (heavy investment in content + mentors)</li>
                          <li className="text-gray-300 text-sm md:text-base">Year 2: Profitable on operations (RM200K+ margin)</li>
                          <li className="text-gray-300 text-sm md:text-base">Year 3: Healthy margins (35-40% after reinvestment)</li>
                        </ul>
                      </div>

                      <div className="border-t border-yellow-500/30 pt-4 md:pt-6">
                        <h2 className="text-xl md:text-2xl font-bold text-yellow-400 mb-3 md:mb-4">GO-TO-MARKET STRATEGY</h2>
                        
                        <div className="space-y-4 md:space-y-6 mb-4 md:mb-6">
                          <div>
                            <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">Phase 1: Beta Launch (Dec 2025 - Feb 2026)</h4>
                            <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-3 md:mb-4">
                              <li className="text-gray-300 text-sm md:text-base">Target: 500 beta testers (Discord + Twitter organic growth)</li>
                              <li className="text-gray-300 text-sm md:text-base">Goal: Test retention, gather feedback, launch Levels 1-5</li>
                              <li className="text-gray-300 text-sm md:text-base">Cost: Minimal (internal team effort)</li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">Phase 2: Early Adoption (Mar 2026 - Jun 2026)</h4>
                            <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-3 md:mb-4">
                              <li className="text-gray-300 text-sm md:text-base">Target: 2,000 active members</li>
                              <li className="text-gray-300 text-sm md:text-base">Goal: Launch Levels 6-10 bootcamp. Sign first 5 companies.</li>
                              <li className="text-gray-300 text-sm md:text-base">Cost: RM100K (mentors, content, ads)</li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">Phase 3: Growth (Jul 2026 - Dec 2026)</h4>
                            <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-3 md:mb-4">
                              <li className="text-gray-300 text-sm md:text-base">Target: 5,000+ active members. 50+ hires. RM500K revenue.</li>
                              <li className="text-gray-300 text-sm md:text-base">Goal: Become "the" junior dev community in Malaysia.</li>
                              <li className="text-gray-300 text-sm md:text-base">Cost: RM200K (scale marketing, team hiring)</li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">Phase 4: Scale (2027+)</h4>
                            <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-3 md:mb-4">
                              <li className="text-gray-300 text-sm md:text-base">Target: 10,000+ members. Expand to Singapore + Thailand.</li>
                              <li className="text-gray-300 text-sm md:text-base">Goal: Profitable operations. Potential Series A if pursuing venture.</li>
                              <li className="text-gray-300 text-sm md:text-base">Cost: RM500K+ (team, platform development, regional expansion)</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-yellow-500/30 pt-4 md:pt-6">
                        <h2 className="text-xl md:text-2xl font-bold text-yellow-400 mb-3 md:mb-4">METRICS WE TRACK</h2>
                        
                        <div className="mb-4 md:mb-6">
                          <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">Member Metrics</h4>
                          <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-3 md:mb-4">
                            <li className="text-gray-300 text-sm md:text-base">Daily Active Users (DAU)</li>
                            <li className="text-gray-300 text-sm md:text-base">Monthly Active Users (MAU)</li>
                            <li className="text-gray-300 text-sm md:text-base">Onboarding completion rate (% reaching Level 5)</li>
                            <li className="text-gray-300 text-sm md:text-base">Level 10 completion rate (bootcamp graduation)</li>
                            <li className="text-gray-300 text-sm md:text-base">Average time to Level 30 (hire-ready)</li>
                            <li className="text-gray-300 text-sm md:text-base">Retention: 30-day, 90-day, 180-day</li>
                            <li className="text-gray-300 text-sm md:text-base">Mentee satisfaction (5-star reviews)</li>
                          </ul>
                        </div>

                        <div className="mb-4 md:mb-6">
                          <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">Employment Metrics</h4>
                          <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-3 md:mb-4">
                            <li className="text-gray-300 text-sm md:text-base">Members hired (count)</li>
                            <li className="text-gray-300 text-sm md:text-base">Average time to hire (weeks)</li>
                            <li className="text-gray-300 text-sm md:text-base">Average starting salary (RM)</li>
                            <li className="text-gray-300 text-sm md:text-base">Alumni referral rate (% hiring others)</li>
                            <li className="text-gray-300 text-sm md:text-base">Company retention (repeat hiring)</li>
                          </ul>
                        </div>

                        <div className="mb-4 md:mb-6">
                          <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">Revenue Metrics</h4>
                          <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-3 md:mb-4">
                            <li className="text-gray-300 text-sm md:text-base">Revenue per company</li>
                            <li className="text-gray-300 text-sm md:text-base">Revenue per mentoring hour</li>
                            <li className="text-gray-300 text-sm md:text-base">Commission revenue vs posting revenue</li>
                            <li className="text-gray-300 text-sm md:text-base">Customer acquisition cost (CAC)</li>
                            <li className="text-gray-300 text-sm md:text-base">Lifetime value (LTV)</li>
                            <li className="text-gray-300 text-sm md:text-base">Churn rate</li>
                          </ul>
                        </div>

                        <div className="mb-4 md:mb-6">
                          <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">Community Metrics</h4>
                          <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-3 md:mb-4">
                            <li className="text-gray-300 text-sm md:text-base">Mentor ratio (members : mentors)</li>
                            <li className="text-gray-300 text-sm md:text-base">Project completion rate</li>
                            <li className="text-gray-300 text-sm md:text-base">Average rating (projects, mentors, companies)</li>
                            <li className="text-gray-300 text-sm md:text-base">Content creation (tutorials, blog posts, etc)</li>
                          </ul>
                        </div>
                      </div>

                      <div className="border-t border-yellow-500/30 pt-4 md:pt-6">
                        <h2 className="text-xl md:text-2xl font-bold text-yellow-400 mb-3 md:mb-4">COMPETITIVE ADVANTAGES</h2>
                        
                        <div className="space-y-4 md:space-y-6 mb-4 md:mb-6">
                          <div>
                            <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">1. First-Mover in Malaysia</h4>
                            <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-3 md:mb-4">
                              <li className="text-gray-300 text-sm md:text-base">No competitor doing this in SEA</li>
                              <li className="text-gray-300 text-sm md:text-base">By Year 2, community network effects = moat</li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">2. Founder Product Fit</h4>
                            <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-3 md:mb-4">
                              <li className="text-gray-300 text-sm md:text-base">Built by developers, for developers</li>
                              <li className="text-gray-300 text-sm md:text-base">Understand pain points (not outsider guessing)</li>
                              <li className="text-gray-300 text-sm md:text-base">Team has bootcamp + hiring experience</li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">3. Vibe Coding Focus</h4>
                            <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-3 md:mb-4">
                              <li className="text-gray-300 text-sm md:text-base">Teaching modern dev path (AI-first)</li>
                              <li className="text-gray-300 text-sm md:text-base">Not 2015 bootcamp curriculum</li>
                              <li className="text-gray-300 text-sm md:text-base">Way faster to employment</li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">4. Alignment of Incentives</h4>
                            <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-3 md:mb-4">
                              <li className="text-gray-300 text-sm md:text-base">Members want jobs (motivated to learn)</li>
                              <li className="text-gray-300 text-sm md:text-base">Companies want talent (pay for access)</li>
                              <li className="text-gray-300 text-sm md:text-base">Mentors want income (teach well)</li>
                              <li className="text-gray-300 text-sm md:text-base">Kracked wants growth (help everyone succeed)</li>
                              <li className="text-gray-300 text-sm md:text-base">Zero-sum removed. Positive-sum game.</li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">5. Retro Aesthetic</h4>
                            <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-3 md:mb-4">
                              <li className="text-gray-300 text-sm md:text-base">Pokemon Gameboy style = highly shareable</li>
                              <li className="text-gray-300 text-sm md:text-base">Unique brand = memorable</li>
                              <li className="text-gray-300 text-sm md:text-base">Meme-able = viral potential</li>
                              <li className="text-gray-300 text-sm md:text-base">Nostalgia + gaming = engagement</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-yellow-500/30 pt-4 md:pt-6">
                        <h2 className="text-xl md:text-2xl font-bold text-yellow-400 mb-3 md:mb-4">RISKS & MITIGATION</h2>
                        
                        <div className="overflow-x-auto mb-4 md:mb-6">
                          <table className="w-full text-xs md:text-sm border-collapse">
                            <thead>
                              <tr className="border-b border-yellow-500/30">
                                <th className="text-left text-yellow-300 p-2">Risk</th>
                                <th className="text-left text-yellow-300 p-2">Impact</th>
                                <th className="text-left text-yellow-300 p-2">Mitigation</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-yellow-500/20">
                                <td className="text-gray-300 p-2">Low user engagement</td>
                                <td className="text-gray-300 p-2">Members join, drop off</td>
                                <td className="text-gray-300 p-2">Daily challenges, mentoring, real income incentives, social mechanics</td>
                              </tr>
                              <tr className="border-b border-yellow-500/20">
                                <td className="text-gray-300 p-2">Poor code quality</td>
                                <td className="text-gray-300 p-2">Companies lose trust</td>
                                <td className="text-gray-300 p-2">Mentor vetting, code review system, project grading</td>
                              </tr>
                              <tr className="border-b border-yellow-500/20">
                                <td className="text-gray-300 p-2">Mentor shortage</td>
                                <td className="text-gray-300 p-2">Can't scale bootcamp</td>
                                <td className="text-gray-300 p-2">Launch mentor training program, offer RM30-100/hr, alumni become mentors</td>
                              </tr>
                              <tr className="border-b border-yellow-500/20">
                                <td className="text-gray-300 p-2">Company skepticism</td>
                                <td className="text-gray-300 p-2">No job postings</td>
                                <td className="text-gray-300 p-2">Early pilots with 2-3 known companies, case studies, direct sales</td>
                              </tr>
                              <tr className="border-b border-yellow-500/20">
                                <td className="text-gray-300 p-2">Retention challenges</td>
                                <td className="text-gray-300 p-2">Community "dies"</td>
                                <td className="text-gray-300 p-2">Multi-path engagement (learning, mentoring, projects, leaderboards), no FOMO</td>
                              </tr>
                              <tr>
                                <td className="text-gray-300 p-2">Scaling costs</td>
                                <td className="text-gray-300 p-2">Unprofitable at scale</td>
                                <td className="text-gray-300 p-2">Commission-based model (only pay when result achieved), mentors handle training (not Kracked staff)</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="border-t border-yellow-500/30 pt-4 md:pt-6">
                        <h2 className="text-xl md:text-2xl font-bold text-yellow-400 mb-3 md:mb-4">LONG-TERM VISION</h2>
                        
                        <div className="space-y-4 md:space-y-6 mb-4 md:mb-6">
                          <div>
                            <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">Year 1-2: Regional Hub (Malaysia)</h4>
                            <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-3 md:mb-4">
                              <li className="text-gray-300 text-sm md:text-base">5,000-10,000 members</li>
                              <li className="text-gray-300 text-sm md:text-base">50-100 companies hiring</li>
                              <li className="text-gray-300 text-sm md:text-base">RM2-3M annual revenue</li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">Year 3-5: Southeast Asia Expansion</h4>
                            <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-3 md:mb-4">
                              <li className="text-gray-300 text-sm md:text-base">Expand to Singapore, Thailand, Philippines</li>
                              <li className="text-gray-300 text-sm md:text-base">50,000+ members region-wide</li>
                              <li className="text-gray-300 text-sm md:text-base">Regional tech talent marketplace</li>
                              <li className="text-gray-300 text-sm md:text-base">Potential Series A / B funding</li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">Year 5+: Global AI-Assisted Dev Platform</h4>
                            <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-3 md:mb-4">
                              <li className="text-gray-300 text-sm md:text-base">Platform agnostic (not just web dev)</li>
                              <li className="text-gray-300 text-sm md:text-base">Machine learning matching (members → jobs)</li>
                              <li className="text-gray-300 text-sm md:text-base">Embedded recruitment suite (ATS for companies)</li>
                              <li className="text-gray-300 text-sm md:text-base">Licensing to other countries/regions</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-yellow-500/30 pt-4 md:pt-6">
                        <h2 className="text-xl md:text-2xl font-bold text-yellow-400 mb-3 md:mb-4">CALL TO ACTION</h2>
                        
                        <div className="mb-4 md:mb-6">
                          <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">For Developers</h4>
                          <p className="text-gray-300 text-sm md:text-base mb-2 font-semibold">Join the Beta:</p>
                          <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-3 md:mb-4">
                            <li className="text-gray-300 text-sm md:text-base">Go to krackeddevs.com</li>
                            <li className="text-gray-300 text-sm md:text-base">Join Discord</li>
                            <li className="text-gray-300 text-sm md:text-base">Play Levels 1-5 (1-2 days)</li>
                            <li className="text-gray-300 text-sm md:text-base">Get hired within 6 months</li>
                          </ul>
                        </div>

                        <div className="mb-4 md:mb-6">
                          <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">For Companies</h4>
                          <p className="text-gray-300 text-sm md:text-base mb-2 font-semibold">Post Your First Role:</p>
                          <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-3 md:mb-4">
                            <li className="text-gray-300 text-sm md:text-base">Email: hiring@krackeddevs.com</li>
                            <li className="text-gray-300 text-sm md:text-base">Share: Job description + desired level (junior, mid-level, contractor)</li>
                            <li className="text-gray-300 text-sm md:text-base">We'll: List on platform + push to relevant members</li>
                            <li className="text-gray-300 text-sm md:text-base">Cost: RM500-2000 posting + 15% commission</li>
                          </ul>
                        </div>

                        <div className="mb-4 md:mb-6">
                          <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">For Mentors</h4>
                          <p className="text-gray-300 text-sm md:text-base mb-2 font-semibold">Earn While You Help:</p>
                          <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-3 md:mb-4">
                            <li className="text-gray-300 text-sm md:text-base">Level 25+ developers: Apply at krackeddevs.com/mentor</li>
                            <li className="text-gray-300 text-sm md:text-base">Earn: RM30-100/hour for 1:1 sessions</li>
                            <li className="text-gray-300 text-sm md:text-base">Impact: Help next generation + build reputation</li>
                          </ul>
                        </div>

                        <div className="mb-4 md:mb-6">
                          <h4 className="text-lg md:text-xl font-semibold text-yellow-300 mb-2 md:mb-3">For Investors</h4>
                          <p className="text-gray-300 text-sm md:text-base mb-2 font-semibold">Fund the Future of Dev Talent:</p>
                          <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-3 md:mb-4">
                            <li className="text-gray-300 text-sm md:text-base">We're building the infrastructure</li>
                            <li className="text-gray-300 text-sm md:text-base">You're betting on the idea that tech talent is broken</li>
                            <li className="text-gray-300 text-sm md:text-base">Profitable path to market (commission-based, not ad-based)</li>
                            <li className="text-gray-300 text-sm md:text-base">Founder-led, operator-heavy team</li>
                            <li className="text-gray-300 text-sm md:text-base">Email: investors@krackeddevs.com</li>
                          </ul>
                        </div>
                      </div>

                      <div className="border-t border-yellow-500/30 pt-4 md:pt-6">
                        <h2 className="text-xl md:text-2xl font-bold text-yellow-400 mb-3 md:mb-4">CONCLUSION</h2>
                        <p className="text-gray-300 text-sm md:text-base mb-3 md:mb-4">
                          The developer talent gap in Malaysia is real. Bootcamps fail because they don't engage. Job boards fail because they don't educate. Communities fail because they lack incentives.
                        </p>
                        <p className="text-gray-300 text-sm md:text-base mb-3 md:mb-4">
                          Kracked Devs fixes all three.
                        </p>
                        <p className="text-gray-300 text-sm md:text-base mb-3 md:mb-4">
                          By combining gamification + real income + employment pathways + company partnerships, we're creating the system developers wish existed.
                        </p>
                        <p className="text-gray-300 text-sm md:text-base mb-3 md:mb-4">
                          It's not a bootcamp. It's not a job board. It's not a community.
                        </p>
                        <p className="text-gray-300 text-sm md:text-base mb-3 md:mb-4">
                          It's all three, wrapped in a retro game.
                        </p>
                        <p className="text-yellow-300 font-semibold text-sm md:text-base">
                          Welcome to Kracked Devs. Let's crack the code.
                        </p>
                      </div>

                      <div className="border-t border-yellow-500/30 pt-4 md:pt-6">
                        <h2 className="text-xl md:text-2xl font-bold text-yellow-400 mb-3 md:mb-4">APPENDIX: QUICK FACTS</h2>
                        <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-4 md:mb-6">
                          <li className="text-gray-300 text-sm md:text-base">Founded: 2025 (Malaysia)</li>
                          <li className="text-gray-300 text-sm md:text-base">Team: 3 founders (developers + designer)</li>
                          <li className="text-gray-300 text-sm md:text-base">Product: Retro 2D gamified developer platform</li>
                          <li className="text-gray-300 text-sm md:text-base">Members (Beta): 0 → Target 500 by Dec 2025</li>
                          <li className="text-gray-300 text-sm md:text-base">Platform: Web-based, mobile-responsive</li>
                          <li className="text-gray-300 text-sm md:text-base">Revenue Model: Commission-based (no ads)</li>
                          <li className="text-gray-300 text-sm md:text-base">Pricing: Companies RM500-2000 + 15% on hires, Mentors earn RM30-100/hr, Members earn RM50-500/project</li>
                          <li className="text-gray-300 text-sm md:text-base">Target Market: Malaysia (Year 1), SEA (Year 3), Global (Year 5+)</li>
                          <li className="text-gray-300 text-sm md:text-base">Success Metric: 1,000+ members hired within 18 months</li>
                        </ul>
                        <p className="text-gray-300 text-sm md:text-base mb-2">Kracked Devs Whitepaper v1.0</p>
                        <p className="text-gray-300 text-sm md:text-base mb-2">Status: Public, Community & Investor Edition</p>
                        <p className="text-gray-300 text-sm md:text-base mb-2">Next Update: June 2026 (post-launch metrics)</p>
                        <p className="text-gray-300 text-sm md:text-base">Questions? Email: hello@krackeddevs.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </>
      )}

      {/* System Viewer Overlay */}
      {showSystem && (
        <>
          {/* Backdrop - Desktop only */}
          {!isMobile && <div className="fixed inset-0 bg-black/50 z-30" />}
          <div className="absolute inset-0 bg-transparent z-40 flex items-center justify-center p-2 md:p-4 pointer-events-none">
            <div className="pointer-events-auto">
              <div className={`bg-gray-900 border-4 border-purple-500 max-w-4xl w-full overflow-y-auto p-4 md:p-6 ${
                isMobile ? 'max-h-[60vh] mb-20' : 'max-h-[80vh]'
              }`}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl text-purple-400 font-bold">REWARDS & PROGRESSION SYSTEM</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <div className="text-white space-y-4 md:space-y-6">
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold text-purple-400 mb-2 md:mb-4">KRACKED DEVS - REWARDS & PROGRESSION SYSTEM</h1>
                      <p className="text-gray-300 text-sm md:text-base mb-1">Complete Reference - Google Docs Ready</p>
                      <p className="text-gray-300 text-sm md:text-base mb-1">For: Google Docs, PDF, Discord, Website</p>
                      <p className="text-gray-300 text-sm md:text-base mb-1">Status: Ready to Copy-Paste</p>
                      <p className="text-gray-300 text-sm md:text-base mb-4 md:mb-6">Format: Clean tables, elegant layout</p>
                    </div>

                    <div className="border-t border-purple-500/30 pt-4 md:pt-6">
                      <h2 className="text-xl md:text-2xl font-bold text-purple-400 mb-3 md:mb-4">📊 TABLE OF CONTENTS</h2>
                      <ol className="list-decimal list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-4 md:mb-6">
                        <li className="text-gray-300 text-sm md:text-base">Progression Rewards by Level Bracket</li>
                        <li className="text-gray-300 text-sm md:text-base">Loot Chest System (RNG)</li>
                        <li className="text-gray-300 text-sm md:text-base">Mentoring System & Income</li>
                        <li className="text-gray-300 text-sm md:text-base">Projects Hub & Real Income</li>
                        <li className="text-gray-300 text-sm md:text-base">Leveling Velocity & Engagement Loop</li>
                        <li className="text-gray-300 text-sm md:text-base">Alumni & Legend System</li>
                        <li className="text-gray-300 text-sm md:text-base">Leaderboard & Competition</li>
                        <li className="text-gray-300 text-sm md:text-base">XP Value Quick Reference</li>
                        <li className="text-gray-300 text-sm md:text-base">Implementation Checklist</li>
                        <li className="text-gray-300 text-sm md:text-base">Retention Projections</li>
                      </ol>
                    </div>

                    <div className="border-t border-purple-500/30 pt-4 md:pt-6">
                      <h2 className="text-xl md:text-2xl font-bold text-purple-400 mb-3 md:mb-4">PROGRESSION REWARDS BY LEVEL BRACKET</h2>
                      
                      <div className="mb-4 md:mb-6">
                        <h3 className="text-lg md:text-xl font-semibold text-purple-300 mb-2 md:mb-3">Levels 1-5: Onboarding Phase</h3>
                        <div className="overflow-x-auto mb-3 md:mb-4">
                          <table className="w-full text-xs md:text-sm border-collapse">
                            <thead>
                              <tr className="border-b border-purple-500/30">
                                <th className="text-left text-purple-300 p-2">Reward Type</th>
                                <th className="text-left text-purple-300 p-2">Frequency</th>
                                <th className="text-left text-purple-300 p-2">Examples</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-purple-500/20">
                                <td className="text-gray-300 p-2">Badges</td>
                                <td className="text-gray-300 p-2">Each level</td>
                                <td className="text-gray-300 p-2">Fresh Dev → Social Butterfly → Dev Setup Complete</td>
                              </tr>
                              <tr className="border-b border-purple-500/20">
                                <td className="text-gray-300 p-2">Cosmetics</td>
                                <td className="text-gray-300 p-2">Levels 2, 3, 4</td>
                                <td className="text-gray-300 p-2">Hat cosmetic, Shoes cosmetic, Hair style unlock</td>
                              </tr>
                              <tr className="border-b border-purple-500/20">
                                <td className="text-gray-300 p-2">Feature Unlocks</td>
                                <td className="text-gray-300 p-2">Each level</td>
                                <td className="text-gray-300 p-2">New zones, systems, features unlock</td>
                              </tr>
                              <tr className="border-b border-purple-500/20">
                                <td className="text-gray-300 p-2">Loot Chest</td>
                                <td className="text-gray-300 p-2">Level 5 ONLY</td>
                                <td className="text-gray-300 p-2">🎁 MAJOR MILESTONE - First RNG reward (Bronze Chest)</td>
                              </tr>
                              <tr>
                                <td className="text-gray-300 p-2">Titles/Flair</td>
                                <td className="text-gray-300 p-2">Level 5</td>
                                <td className="text-gray-300 p-2">"[Fresh Dev]" flair next to name</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="mb-4 md:mb-6">
                        <h3 className="text-lg md:text-xl font-semibold text-purple-300 mb-2 md:mb-3">Levels 6-10: Beginner Bootcamp Phase</h3>
                        <div className="overflow-x-auto mb-3 md:mb-4">
                          <table className="w-full text-xs md:text-sm border-collapse">
                            <thead>
                              <tr className="border-b border-purple-500/30">
                                <th className="text-left text-purple-300 p-2">Reward Type</th>
                                <th className="text-left text-purple-300 p-2">Frequency</th>
                                <th className="text-left text-purple-300 p-2">Examples</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-purple-500/20">
                                <td className="text-gray-300 p-2">Badges</td>
                                <td className="text-gray-300 p-2">Level 10</td>
                                <td className="text-gray-300 p-2">"Bootcamp Graduate" badge (permanent)</td>
                              </tr>
                              <tr className="border-b border-purple-500/20">
                                <td className="text-gray-300 p-2">Cosmetics</td>
                                <td className="text-gray-300 p-2">Every 2 levels</td>
                                <td className="text-gray-300 p-2">Avatar clothing, pet skins, accessories</td>
                              </tr>
                              <tr className="border-b border-purple-500/20">
                                <td className="text-gray-300 p-2">Pet Customization</td>
                                <td className="text-gray-300 p-2">Level 8</td>
                                <td className="text-gray-300 p-2">Unlock full pet appearance customization</td>
                              </tr>
                              <tr className="border-b border-purple-500/20">
                                <td className="text-gray-300 p-2">Title/Flair</td>
                                <td className="text-gray-300 p-2">Level 10</td>
                                <td className="text-gray-300 p-2">"[Web Dev in Training]" title next to name</td>
                              </tr>
                              <tr>
                                <td className="text-gray-300 p-2">Loot Chest</td>
                                <td className="text-gray-300 p-2">Level 10</td>
                                <td className="text-gray-300 p-2">Silver Chest (better cosmetics + more gold)</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="mb-4 md:mb-6">
                        <h3 className="text-lg md:text-xl font-semibold text-purple-300 mb-2 md:mb-3">Levels 11-20: Intermediate Development Phase</h3>
                        <div className="overflow-x-auto mb-3 md:mb-4">
                          <table className="w-full text-xs md:text-sm border-collapse">
                            <thead>
                              <tr className="border-b border-purple-500/30">
                                <th className="text-left text-purple-300 p-2">Reward Type</th>
                                <th className="text-left text-purple-300 p-2">Frequency</th>
                                <th className="text-left text-purple-300 p-2">Examples</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-purple-500/20">
                                <td className="text-gray-300 p-2">Specialization Badge</td>
                                <td className="text-gray-300 p-2">Level 15</td>
                                <td className="text-gray-300 p-2">"Frontend Specialist" or "Full-Stack Dev" permanent badge</td>
                              </tr>
                              <tr className="border-b border-purple-500/20">
                                <td className="text-gray-300 p-2">Cosmetics</td>
                                <td className="text-gray-300 p-2">Every level</td>
                                <td className="text-gray-300 p-2">Rare/unique outfits, exclusive pet skins</td>
                              </tr>
                              <tr className="border-b border-purple-500/20">
                                <td className="text-gray-300 p-2">Title Upgrade</td>
                                <td className="text-gray-300 p-2">Level 20</td>
                                <td className="text-gray-300 p-2">"[Intermediate Developer]" title</td>
                              </tr>
                              <tr className="border-b border-purple-500/20">
                                <td className="text-gray-300 p-2">Loot Chests</td>
                                <td className="text-gray-300 p-2">Levels 15, 20</td>
                                <td className="text-gray-300 p-2">Higher rarity items (Rare → Epic)</td>
                              </tr>
                              <tr>
                                <td className="text-gray-300 p-2">Real Reward Preview</td>
                                <td className="text-gray-300 p-2">Level 20</td>
                                <td className="text-gray-300 p-2">"You're hire-ready! Start applying!" notification</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="mb-4 md:mb-6">
                        <h3 className="text-lg md:text-xl font-semibold text-purple-300 mb-2 md:mb-3">Levels 21-30: Advanced & Specialization Phase</h3>
                        <div className="overflow-x-auto mb-3 md:mb-4">
                          <table className="w-full text-xs md:text-sm border-collapse">
                            <thead>
                              <tr className="border-b border-purple-500/30">
                                <th className="text-left text-purple-300 p-2">Reward Type</th>
                                <th className="text-left text-purple-300 p-2">Frequency</th>
                                <th className="text-left text-purple-300 p-2">Examples</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-purple-500/20">
                                <td className="text-gray-300 p-2">Mentor Badge Application</td>
                                <td className="text-gray-300 p-2">Level 25</td>
                                <td className="text-gray-300 p-2">Can now apply to become official mentor</td>
                              </tr>
                              <tr className="border-b border-purple-500/20">
                                <td className="text-gray-300 p-2">Legendary Cosmetics</td>
                                <td className="text-gray-300 p-2">Every 2-3 levels</td>
                                <td className="text-gray-300 p-2">Ultra-rare skins with visual effects</td>
                              </tr>
                              <tr className="border-b border-purple-500/20">
                                <td className="text-gray-300 p-2">In-Game Currency</td>
                                <td className="text-gray-300 p-2">Levels 25, 30+</td>
                                <td className="text-gray-300 p-2">Gold coins (10-50 coins per unlock)</td>
                              </tr>
                              <tr className="border-b border-purple-500/20">
                                <td className="text-gray-300 p-2">Real Currency (Projects)</td>
                                <td className="text-gray-300 p-2">Variable</td>
                                <td className="text-gray-300 p-2">See Projects Hub section below</td>
                              </tr>
                              <tr>
                                <td className="text-gray-300 p-2">Community Recognition</td>
                                <td className="text-gray-300 p-2">Level 30+</td>
                                <td className="text-gray-300 p-2">Monthly leaderboard, hall of fame features</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div className="mb-4 md:mb-6">
                        <h3 className="text-lg md:text-xl font-semibold text-purple-300 mb-2 md:mb-3">Levels 31+: Mastery & Leadership Phase</h3>
                        <div className="overflow-x-auto mb-3 md:mb-4">
                          <table className="w-full text-xs md:text-sm border-collapse">
                            <thead>
                              <tr className="border-b border-purple-500/30">
                                <th className="text-left text-purple-300 p-2">Reward Type</th>
                                <th className="text-left text-purple-300 p-2">Frequency</th>
                                <th className="text-left text-purple-300 p-2">Examples</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-purple-500/20">
                                <td className="text-gray-300 p-2">Legendary Cosmetics</td>
                                <td className="text-gray-300 p-2">Every level</td>
                                <td className="text-gray-300 p-2">Ultra-rare skins, exclusive effects</td>
                              </tr>
                              <tr className="border-b border-purple-500/20">
                                <td className="text-gray-300 p-2">Leadership Titles</td>
                                <td className="text-gray-300 p-2">Level 35, 40, 50+</td>
                                <td className="text-gray-300 p-2">"Senior Mentor", "Mentor Lead", "Kracked Legend"</td>
                              </tr>
                              <tr className="border-b border-purple-500/20">
                                <td className="text-gray-300 p-2">Monthly Stipend</td>
                                <td className="text-gray-300 p-2">Level 35+</td>
                                <td className="text-gray-300 p-2">RM500/month senior mentor stipend</td>
                              </tr>
                              <tr className="border-b border-purple-500/20">
                                <td className="text-gray-300 p-2">Hall of Fame Features</td>
                                <td className="text-gray-300 p-2">Level 40, 50+</td>
                                <td className="text-gray-300 p-2">Featured on homepage, Twitter, case studies</td>
                              </tr>
                              <tr>
                                <td className="text-gray-300 p-2">Employment Offers</td>
                                <td className="text-gray-300 p-2">Level 50+</td>
                                <td className="text-gray-300 p-2">Potential Kracked Devs team position</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-purple-500/30 pt-4 md:pt-6">
                      <h2 className="text-xl md:text-2xl font-bold text-purple-400 mb-3 md:mb-4">LOOT CHEST SYSTEM (RNG Rewards)</h2>
                      <h3 className="text-lg md:text-xl font-semibold text-purple-300 mb-3 md:mb-4">Chest Tier Breakdown</h3>
                      <div className="overflow-x-auto mb-4 md:mb-6">
                        <table className="w-full text-xs md:text-sm border-collapse">
                          <thead>
                            <tr className="border-b border-purple-500/30">
                              <th className="text-left text-purple-300 p-2">Chest Type</th>
                              <th className="text-left text-purple-300 p-2">When Unlocked</th>
                              <th className="text-left text-purple-300 p-2">Rarity Pool</th>
                              <th className="text-left text-purple-300 p-2">Contents</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-purple-500/20">
                              <td className="text-gray-300 p-2">Bronze</td>
                              <td className="text-gray-300 p-2">Level 5</td>
                              <td className="text-gray-300 p-2">Common, Uncommon</td>
                              <td className="text-gray-300 p-2">Basic cosmetics, 2-5 gold coins, XP boost items</td>
                            </tr>
                            <tr className="border-b border-purple-500/20">
                              <td className="text-gray-300 p-2">Silver</td>
                              <td className="text-gray-300 p-2">Level 10, 15</td>
                              <td className="text-gray-300 p-2">Uncommon, Rare</td>
                              <td className="text-gray-300 p-2">Outfit pieces, pet skins, 5-15 gold coins</td>
                            </tr>
                            <tr className="border-b border-purple-500/20">
                              <td className="text-gray-300 p-2">Gold</td>
                              <td className="text-gray-300 p-2">Level 20, 25, 30</td>
                              <td className="text-gray-300 p-2">Rare, Epic</td>
                              <td className="text-gray-300 p-2">Legendary cosmetics, 20-50 gold coins, title flair</td>
                            </tr>
                            <tr>
                              <td className="text-gray-300 p-2">Platinum</td>
                              <td className="text-gray-300 p-2">Level 35, 40, 50+</td>
                              <td className="text-gray-300 p-2">Epic, Legendary</td>
                              <td className="text-gray-300 p-2">Ultra-rare skins, exclusive titles, special effects</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <h3 className="text-lg md:text-xl font-semibold text-purple-300 mb-3 md:mb-4">Example Drop Tables</h3>
                      
                      <div className="mb-4 md:mb-6">
                        <h4 className="text-base md:text-lg font-semibold text-purple-300 mb-2 md:mb-3">Bronze Chest (Level 5)</h4>
                        <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-3 md:mb-4">
                          <li className="text-gray-300 text-sm md:text-base">40% — Common avatar clothing item</li>
                          <li className="text-gray-300 text-sm md:text-base">30% — Pet accessory</li>
                          <li className="text-gray-300 text-sm md:text-base">20% — 5 gold coins</li>
                          <li className="text-gray-300 text-sm md:text-base">10% — 1-hour 1.5x XP boost</li>
                        </ul>
                      </div>

                      <div className="mb-4 md:mb-6">
                        <h4 className="text-base md:text-lg font-semibold text-purple-300 mb-2 md:mb-3">Silver Chest (Level 10)</h4>
                        <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-3 md:mb-4">
                          <li className="text-gray-300 text-sm md:text-base">25% — Rare avatar outfit</li>
                          <li className="text-gray-300 text-sm md:text-base">25% — Unique pet skin</li>
                          <li className="text-gray-300 text-sm md:text-base">30% — 10 gold coins</li>
                          <li className="text-gray-300 text-sm md:text-base">15% — 2-hour 1.5x XP boost</li>
                          <li className="text-gray-300 text-sm md:text-base">5% — Exclusive title: "[Bootcamp Graduate]"</li>
                        </ul>
                      </div>

                      <div className="mb-4 md:mb-6">
                        <h4 className="text-base md:text-lg font-semibold text-purple-300 mb-2 md:mb-3">Gold Chest (Level 20)</h4>
                        <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-3 md:mb-4">
                          <li className="text-gray-300 text-sm md:text-base">20% — Legendary avatar appearance</li>
                          <li className="text-gray-300 text-sm md:text-base">20% — Epic pet skin with visual effects</li>
                          <li className="text-gray-300 text-sm md:text-base">30% — 30 gold coins</li>
                          <li className="text-gray-300 text-sm md:text-base">20% — Skill-specific cosmetic (Frontend/Backend/etc.)</li>
                          <li className="text-gray-300 text-sm md:text-base">10% — "Hire-Ready" banner for profile</li>
                        </ul>
                      </div>

                      <h3 className="text-lg md:text-xl font-semibold text-purple-300 mb-3 md:mb-4">RNG Design Principles</h3>
                      <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-4 md:mb-6">
                        <li className="text-gray-300 text-sm md:text-base">✅ No Pure Duplicates — Second time getting same item = upgrade (better colors/effects)</li>
                        <li className="text-gray-300 text-sm md:text-base">✅ Duplicate Mitigation — Rare drops increase odds of legendary items next time</li>
                        <li className="text-gray-300 text-sm md:text-base">✅ Cosmetic-Only — NO pay-to-win mechanics (all chests = cosmetics + currency)</li>
                        <li className="text-gray-300 text-sm md:text-base">✅ Excitement Moments — Legendary drops trigger animations + social notifications (shareable on Discord)</li>
                      </ul>
                    </div>

                    <div className="border-t border-purple-500/30 pt-4 md:pt-6">
                      <h2 className="text-xl md:text-2xl font-bold text-purple-400 mb-3 md:mb-4">MENTORING SYSTEM & INCOME</h2>
                      <h3 className="text-lg md:text-xl font-semibold text-purple-300 mb-3 md:mb-4">Becoming a Mentor (Level 25+)</h3>
                      <h4 className="text-base md:text-lg font-semibold text-purple-300 mb-2 md:mb-3">Application Requirements</h4>
                      <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-4 md:mb-6">
                        <li className="text-gray-300 text-sm md:text-base">✓ Reach Level 25+ (proven progression)</li>
                        <li className="text-gray-300 text-sm md:text-base">✓ Complete "Mentor Training" bootcamp (10 hours)</li>
                        <li className="text-gray-300 text-sm md:text-base">✓ Submit 2 mentor application essays</li>
                        <li className="text-gray-300 text-sm md:text-base">✓ Background check</li>
                        <li className="text-gray-300 text-sm md:text-base">✓ Approved by Kracked Devs team</li>
                      </ul>

                      <h3 className="text-lg md:text-xl font-semibold text-purple-300 mb-3 md:mb-4">Mentor Tiers & Income</h3>
                      <div className="overflow-x-auto mb-4 md:mb-6">
                        <table className="w-full text-xs md:text-sm border-collapse">
                          <thead>
                            <tr className="border-b border-purple-500/30">
                              <th className="text-left text-purple-300 p-2">Tier</th>
                              <th className="text-left text-purple-300 p-2">Min Level</th>
                              <th className="text-left text-purple-300 p-2">Requirements</th>
                              <th className="text-left text-purple-300 p-2">Income Potential</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-purple-500/20">
                              <td className="text-gray-300 p-2">Apprentice Mentor</td>
                              <td className="text-gray-300 p-2">20</td>
                              <td className="text-gray-300 p-2">Completed bootcamp</td>
                              <td className="text-gray-300 p-2">RM30-50 per 1:1</td>
                            </tr>
                            <tr className="border-b border-purple-500/20">
                              <td className="text-gray-300 p-2">Certified Mentor</td>
                              <td className="text-gray-300 p-2">25</td>
                              <td className="text-gray-300 p-2">Pass mentor training</td>
                              <td className="text-gray-300 p-2">RM50-100 per session</td>
                            </tr>
                            <tr className="border-b border-purple-500/20">
                              <td className="text-gray-300 p-2">Senior Mentor</td>
                              <td className="text-gray-300 p-2">35</td>
                              <td className="text-gray-300 p-2">50+ mentees helped</td>
                              <td className="text-gray-300 p-2">RM500/month stipend</td>
                            </tr>
                            <tr>
                              <td className="text-gray-300 p-2">Mentor Lead</td>
                              <td className="text-gray-300 p-2">50</td>
                              <td className="text-gray-300 p-2">200+ mentees, created module</td>
                              <td className="text-gray-300 p-2">Potential employment offer</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <h3 className="text-lg md:text-xl font-semibold text-purple-300 mb-3 md:mb-4">Mentoring XP Breakdown</h3>
                      <div className="overflow-x-auto mb-4 md:mb-6">
                        <table className="w-full text-xs md:text-sm border-collapse">
                          <thead>
                            <tr className="border-b border-purple-500/30">
                              <th className="text-left text-purple-300 p-2">Activity</th>
                              <th className="text-left text-purple-300 p-2">Duration</th>
                              <th className="text-left text-purple-300 p-2">XP Per Session</th>
                              <th className="text-left text-purple-300 p-2">Income Potential</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-purple-500/20">
                              <td className="text-gray-300 p-2">Quick help (Discord)</td>
                              <td className="text-gray-300 p-2">5-15 min</td>
                              <td className="text-gray-300 p-2">5-10 XP</td>
                              <td className="text-gray-300 p-2">Unpaid (community)</td>
                            </tr>
                            <tr className="border-b border-purple-500/20">
                              <td className="text-gray-300 p-2">Code review</td>
                              <td className="text-gray-300 p-2">15-30 min</td>
                              <td className="text-gray-300 p-2">15-25 XP</td>
                              <td className="text-gray-300 p-2">RM30-50 per 1:1</td>
                            </tr>
                            <tr className="border-b border-purple-500/20">
                              <td className="text-gray-300 p-2">1:1 session</td>
                              <td className="text-gray-300 p-2">1 hour</td>
                              <td className="text-gray-300 p-2">30-50 XP</td>
                              <td className="text-gray-300 p-2">RM50-100 per session</td>
                            </tr>
                            <tr className="border-b border-purple-500/20">
                              <td className="text-gray-300 p-2">Bootcamp group teaching</td>
                              <td className="text-gray-300 p-2">2+ hours</td>
                              <td className="text-gray-300 p-2">50+ XP</td>
                              <td className="text-gray-300 p-2">Potential employment offer</td>
                            </tr>
                            <tr className="border-b border-purple-500/20">
                              <td className="text-gray-300 p-2">Create learning resource</td>
                              <td className="text-gray-300 p-2">Variable</td>
                              <td className="text-gray-300 p-2">40 XP</td>
                              <td className="text-gray-300 p-2">—</td>
                            </tr>
                            <tr>
                              <td className="text-gray-300 p-2">Mentee hired (bonus)</td>
                              <td className="text-gray-300 p-2">(referral)</td>
                              <td className="text-gray-300 p-2">100 XP</td>
                              <td className="text-gray-300 p-2">—</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="border-t border-purple-500/30 pt-4 md:pt-6">
                      <h2 className="text-xl md:text-2xl font-bold text-purple-400 mb-3 md:mb-4">PROJECTS HUB & REAL INCOME</h2>
                      <h3 className="text-lg md:text-xl font-semibold text-purple-300 mb-3 md:mb-4">How It Works</h3>
                      <p className="text-gray-300 text-sm md:text-base mb-3 md:mb-4">Kracked Devs Project Board:</p>
                      <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-4 md:mb-6">
                        <li className="text-gray-300 text-sm md:text-base">Kracked Devs team + partner companies post projects</li>
                        <li className="text-gray-300 text-sm md:text-base">Members solo or team up to apply</li>
                        <li className="text-gray-300 text-sm md:text-base">Contribution-based rewards (in-game + real RM currency)</li>
                        <li className="text-gray-300 text-sm md:text-base">Final submission judged by hiring managers / team leads</li>
                      </ul>

                      <h3 className="text-lg md:text-xl font-semibold text-purple-300 mb-3 md:mb-4">Project Tier System</h3>
                      <div className="overflow-x-auto mb-4 md:mb-6">
                        <table className="w-full text-xs md:text-sm border-collapse">
                          <thead>
                            <tr className="border-b border-purple-500/30">
                              <th className="text-left text-purple-300 p-2">Project Type</th>
                              <th className="text-left text-purple-300 p-2">Scope</th>
                              <th className="text-left text-purple-300 p-2">Reward Type</th>
                              <th className="text-left text-purple-300 p-2">XP</th>
                              <th className="text-left text-purple-300 p-2">Real Currency</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-purple-500/20">
                              <td className="text-gray-300 p-2">Learning</td>
                              <td className="text-gray-300 p-2">Build feature from spec</td>
                              <td className="text-gray-300 p-2">In-game cosmetics</td>
                              <td className="text-gray-300 p-2">50-100</td>
                              <td className="text-gray-300 p-2">None</td>
                            </tr>
                            <tr className="border-b border-purple-500/20">
                              <td className="text-gray-300 p-2">Portfolio</td>
                              <td className="text-gray-300 p-2">Full web app MVP</td>
                              <td className="text-gray-300 p-2">Cosmetics + gold coins</td>
                              <td className="text-gray-300 p-2">100-200</td>
                              <td className="text-gray-300 p-2">None</td>
                            </tr>
                            <tr className="border-b border-purple-500/20">
                              <td className="text-gray-300 p-2">Contract</td>
                              <td className="text-gray-300 p-2">Real work for companies</td>
                              <td className="text-gray-300 p-2">Cosmetics + gold coins</td>
                              <td className="text-gray-300 p-2">200+</td>
                              <td className="text-gray-300 p-2">RM50-500</td>
                            </tr>
                            <tr>
                              <td className="text-gray-300 p-2">Internship Track</td>
                              <td className="text-gray-300 p-2">Ongoing role</td>
                              <td className="text-gray-300 p-2">Cosmetics + gold coins</td>
                              <td className="text-gray-300 p-2">500+</td>
                              <td className="text-gray-300 p-2">RM800-2000/month</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <h3 className="text-lg md:text-xl font-semibold text-purple-300 mb-3 md:mb-4">Example Project Cards</h3>
                      <div className="mb-4 md:mb-6 p-4 bg-gray-800 border border-purple-500/30 rounded">
                        <h4 className="text-base md:text-lg font-semibold text-purple-300 mb-2 md:mb-3">🏆 Build Todo App with AI</h4>
                        <div className="space-y-1 md:space-y-2 text-sm md:text-base">
                          <p className="text-gray-300"><strong className="text-purple-300">Level:</strong> 6-10 (Learning)</p>
                          <p className="text-gray-300"><strong className="text-purple-300">Duration:</strong> 3 days</p>
                          <p className="text-gray-300"><strong className="text-purple-300">Team Size:</strong> Solo or 2 people</p>
                          <p className="text-gray-300"><strong className="text-purple-300">Reward:</strong> 50 XP + Rare cosmetic</p>
                          <p className="text-gray-300"><strong className="text-purple-300">Description:</strong> Build todo list app using vibe coding with ChatGPT</p>
                          <p className="text-gray-300"><strong className="text-purple-300">Requirements:</strong> GitHub repo, deployed link, README documentation</p>
                          <p className="text-gray-300"><strong className="text-purple-300">Submission:</strong> Link to GitHub + working demo</p>
                        </div>
                      </div>

                      <div className="mb-4 md:mb-6 p-4 bg-gray-800 border border-purple-500/30 rounded">
                        <h4 className="text-base md:text-lg font-semibold text-purple-300 mb-2 md:mb-3">💼 E-Commerce Product Filter Feature</h4>
                        <div className="space-y-1 md:space-y-2 text-sm md:text-base">
                          <p className="text-gray-300"><strong className="text-purple-300">Level:</strong> 16-20 (Portfolio)</p>
                          <p className="text-gray-300"><strong className="text-purple-300">Duration:</strong> 1 week</p>
                          <p className="text-gray-300"><strong className="text-purple-300">Team Size:</strong> 1-2 people</p>
                          <p className="text-gray-300"><strong className="text-purple-300">Reward:</strong> 150 XP + 20 gold coins</p>
                          <p className="text-gray-300"><strong className="text-purple-300">Description:</strong> Real project for local startup. Build product filtering system.</p>
                          <p className="text-gray-300"><strong className="text-purple-300">Tech Stack:</strong> React, Node, MongoDB (or equivalent)</p>
                          <p className="text-gray-300"><strong className="text-purple-300">Submission:</strong> Code review + demo + live deployment</p>
                          <p className="text-gray-300"><strong className="text-purple-300">Contact:</strong> [Hiring manager email]</p>
                        </div>
                      </div>

                      <div className="mb-4 md:mb-6 p-4 bg-gray-800 border border-purple-500/30 rounded">
                        <h4 className="text-base md:text-lg font-semibold text-purple-300 mb-2 md:mb-3">💰 Custom CRM Module Development</h4>
                        <div className="space-y-1 md:space-y-2 text-sm md:text-base">
                          <p className="text-gray-300"><strong className="text-purple-300">Level:</strong> 25+ (Contract)</p>
                          <p className="text-gray-300"><strong className="text-purple-300">Duration:</strong> 2 weeks</p>
                          <p className="text-gray-300"><strong className="text-purple-300">Team Size:</strong> 2-3 people</p>
                          <p className="text-gray-300"><strong className="text-purple-300">Reward:</strong> 300 XP + 50 gold coins + RM800</p>
                          <p className="text-gray-300"><strong className="text-purple-300">Description:</strong> Build custom module for CRM tool (real company, real product)</p>
                          <p className="text-gray-300"><strong className="text-purple-300">Tech Stack:</strong> Full-stack (your choice)</p>
                          <p className="text-gray-300"><strong className="text-purple-300">Payment:</strong> RM800 split among team (prorated by hours)</p>
                          <p className="text-gray-300"><strong className="text-purple-300">Contact:</strong> [Company contact]</p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-purple-500/30 pt-4 md:pt-6">
                      <h2 className="text-xl md:text-2xl font-bold text-purple-400 mb-3 md:mb-4">LEVELING VELOCITY & ENGAGEMENT LOOP</h2>
                      <h3 className="text-lg md:text-xl font-semibold text-purple-300 mb-3 md:mb-4">Expected Progression Timeline</h3>
                      <div className="overflow-x-auto mb-4 md:mb-6">
                        <table className="w-full text-xs md:text-sm border-collapse">
                          <thead>
                            <tr className="border-b border-purple-500/30">
                              <th className="text-left text-purple-300 p-2">Levels</th>
                              <th className="text-left text-purple-300 p-2">Duration</th>
                              <th className="text-left text-purple-300 p-2">Playstyle</th>
                              <th className="text-left text-purple-300 p-2">XP/Day Estimate</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-purple-500/20">
                              <td className="text-gray-300 p-2">1-5</td>
                              <td className="text-gray-300 p-2">1-2 days</td>
                              <td className="text-gray-300 p-2">Casual (30 min/day)</td>
                              <td className="text-gray-300 p-2">50-100 XP</td>
                            </tr>
                            <tr className="border-b border-purple-500/20">
                              <td className="text-gray-300 p-2">6-10</td>
                              <td className="text-gray-300 p-2">1-2 weeks</td>
                              <td className="text-gray-300 p-2">Engaged (1-2 hrs/day)</td>
                              <td className="text-gray-300 p-2">100-200 XP</td>
                            </tr>
                            <tr className="border-b border-purple-500/20">
                              <td className="text-gray-300 p-2">11-20</td>
                              <td className="text-gray-300 p-2">3-4 weeks</td>
                              <td className="text-gray-300 p-2">Committed (2-3 hrs/day)</td>
                              <td className="text-gray-300 p-2">200-300 XP</td>
                            </tr>
                            <tr className="border-b border-purple-500/20">
                              <td className="text-gray-300 p-2">21-30</td>
                              <td className="text-gray-300 p-2">4-6 weeks</td>
                              <td className="text-gray-300 p-2">Dedicated (3+ hrs/day)</td>
                              <td className="text-gray-300 p-2">300-400 XP</td>
                            </tr>
                            <tr>
                              <td className="text-gray-300 p-2">31-50+</td>
                              <td className="text-gray-300 p-2">Ongoing</td>
                              <td className="text-gray-300 p-2">Hardcore / Mentor</td>
                              <td className="text-gray-300 p-2">500+ XP/week</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <h3 className="text-lg md:text-xl font-semibold text-purple-300 mb-3 md:mb-4">Daily Engagement Loop (For Level 6+)</h3>
                      <div className="mb-4 md:mb-6 p-4 bg-gray-800 border border-purple-500/30 rounded">
                        <p className="text-gray-300 text-sm md:text-base font-mono mb-2">🎮 USER OPENS KRACKED DEVS</p>
                        <p className="text-gray-300 text-sm md:text-base font-mono mb-2">↓</p>
                        <p className="text-gray-300 text-sm md:text-base font-mono mb-2">💬 CHECK: Daily login (5-10 XP) + Discord notifications</p>
                        <p className="text-gray-300 text-sm md:text-base font-mono mb-2">↓</p>
                        <p className="text-gray-300 text-sm md:text-base font-mono mb-2">🎯 CHOOSE ACTIVITY:</p>
                        <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-2 text-sm md:text-base">
                          <li className="text-gray-300">→ Option A: Complete daily challenge (25 XP)</li>
                          <li className="text-gray-300">→ Option B: Work on bootcamp module (30-40 XP/hr)</li>
                          <li className="text-gray-300">→ Option C: Help someone in Discord (10-20 XP)</li>
                          <li className="text-gray-300">→ Option D: Apply to project (100-300 XP if completed)</li>
                        </ul>
                        <p className="text-gray-300 text-sm md:text-base font-mono mb-2">↓</p>
                        <p className="text-gray-300 text-sm md:text-base font-mono mb-2">🏆 EARN XP → Progress bar fills</p>
                        <p className="text-gray-300 text-sm md:text-base font-mono mb-2">↓</p>
                        <p className="text-gray-300 text-sm md:text-base font-mono mb-2">📊 LEVEL UP?</p>
                        <p className="text-gray-300 text-sm md:text-base font-mono mb-2">YES: Loot chest? Badge? Celebration animation</p>
                        <p className="text-gray-300 text-sm md:text-base font-mono mb-2">NO: Show "X XP to next level"</p>
                        <p className="text-gray-300 text-sm md:text-base font-mono mb-2">↓</p>
                        <p className="text-gray-300 text-sm md:text-base font-mono">🔄 REPEAT NEXT DAY</p>
                      </div>

                      <h3 className="text-lg md:text-xl font-semibold text-purple-300 mb-3 md:mb-4">Anti-Burnout Mechanisms</h3>
                      <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-4 md:mb-6">
                        <li className="text-gray-300 text-sm md:text-base">✅ Difficulty Gates — Every 10 levels, bootcamp sessions slow progression (prevent burnout)</li>
                        <li className="text-gray-300 text-sm md:text-base">✅ Multiple Task Types — Coding fatigue? Switch to community engagement</li>
                        <li className="text-gray-300 text-sm md:text-base">✅ Mentor Support — Stuck? Get help from mentors without losing progress</li>
                        <li className="text-gray-300 text-sm md:text-base">✅ Seasonal Resets — Leaderboards reset monthly (fresh competitive motivation)</li>
                        <li className="text-gray-300 text-sm md:text-base">✅ Real Rewards — XP → cosmetics + real income keeps motivation high</li>
                        <li className="text-gray-300 text-sm md:text-base">✅ Community Dependency — Can't progress alone; need social engagement (creates accountability)</li>
                      </ul>
                    </div>

                    <div className="border-t border-purple-500/30 pt-4 md:pt-6">
                      <h2 className="text-xl md:text-2xl font-bold text-purple-400 mb-3 md:mb-4">XP VALUE QUICK REFERENCE</h2>
                      <h3 className="text-lg md:text-xl font-semibold text-purple-300 mb-3 md:mb-4">Complete Task XP Table</h3>
                      <div className="overflow-x-auto mb-4 md:mb-6">
                        <table className="w-full text-xs md:text-sm border-collapse">
                          <thead>
                            <tr className="border-b border-purple-500/30">
                              <th className="text-left text-purple-300 p-2">Task Category</th>
                              <th className="text-left text-purple-300 p-2">Low</th>
                              <th className="text-left text-purple-300 p-2">Mid</th>
                              <th className="text-left text-purple-300 p-2">High</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-purple-500/20">
                              <td className="text-gray-300 p-2">Onboarding</td>
                              <td className="text-gray-300 p-2">5 XP</td>
                              <td className="text-gray-300 p-2">15 XP</td>
                              <td className="text-gray-300 p-2">25 XP</td>
                            </tr>
                            <tr className="border-b border-purple-500/20">
                              <td className="text-gray-300 p-2">Daily Activity</td>
                              <td className="text-gray-300 p-2">5 XP</td>
                              <td className="text-gray-300 p-2">10 XP</td>
                              <td className="text-gray-300 p-2">20 XP</td>
                            </tr>
                            <tr className="border-b border-purple-500/20">
                              <td className="text-gray-300 p-2">Community Help</td>
                              <td className="text-gray-300 p-2">5 XP</td>
                              <td className="text-gray-300 p-2">15 XP</td>
                              <td className="text-gray-300 p-2">30 XP</td>
                            </tr>
                            <tr className="border-b border-purple-500/20">
                              <td className="text-gray-300 p-2">Learning Module</td>
                              <td className="text-gray-300 p-2">20 XP</td>
                              <td className="text-gray-300 p-2">40 XP</td>
                              <td className="text-gray-300 p-2">60 XP</td>
                            </tr>
                            <tr className="border-b border-purple-500/20">
                              <td className="text-gray-300 p-2">Coding Project</td>
                              <td className="text-gray-300 p-2">30 XP</td>
                              <td className="text-gray-300 p-2">75 XP</td>
                              <td className="text-gray-300 p-2">150 XP</td>
                            </tr>
                            <tr className="border-b border-purple-500/20">
                              <td className="text-gray-300 p-2">Mentoring</td>
                              <td className="text-gray-300 p-2">5 XP</td>
                              <td className="text-gray-300 p-2">25 XP</td>
                              <td className="text-gray-300 p-2">50 XP</td>
                            </tr>
                            <tr className="border-b border-purple-500/20">
                              <td className="text-gray-300 p-2">Resource Creation</td>
                              <td className="text-gray-300 p-2">20 XP</td>
                              <td className="text-gray-300 p-2">50 XP</td>
                              <td className="text-gray-300 p-2">100 XP</td>
                            </tr>
                            <tr className="border-b border-purple-500/20">
                              <td className="text-gray-300 p-2">Project Contribution</td>
                              <td className="text-gray-300 p-2">50 XP</td>
                              <td className="text-gray-300 p-2">150 XP</td>
                              <td className="text-gray-300 p-2">500 XP</td>
                            </tr>
                            <tr>
                              <td className="text-gray-300 p-2">Referral Bonus</td>
                              <td className="text-gray-300 p-2">25 XP</td>
                              <td className="text-gray-300 p-2">50 XP</td>
                              <td className="text-gray-300 p-2">100 XP</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="border-t border-purple-500/30 pt-4 md:pt-6">
                      <h2 className="text-xl md:text-2xl font-bold text-purple-400 mb-3 md:mb-4">RETENTION PROJECTIONS</h2>
                      <h3 className="text-lg md:text-xl font-semibold text-purple-300 mb-3 md:mb-4">User Retention Estimates</h3>
                      <p className="text-gray-300 text-sm md:text-base mb-3 md:mb-4">Based on similar gamified platforms (Duolingo, Codecademy, Discord communities):</p>
                      <div className="overflow-x-auto mb-4 md:mb-6">
                        <table className="w-full text-xs md:text-sm border-collapse">
                          <thead>
                            <tr className="border-b border-purple-500/30">
                              <th className="text-left text-purple-300 p-2">Stage</th>
                              <th className="text-left text-purple-300 p-2">Expected Retention</th>
                              <th className="text-left text-purple-300 p-2">Key Retention Driver</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-purple-500/20">
                              <td className="text-gray-300 p-2">Day 1 → Day 7</td>
                              <td className="text-gray-300 p-2">40-50%</td>
                              <td className="text-gray-300 p-2">Loot chests + avatar customization</td>
                            </tr>
                            <tr className="border-b border-purple-500/20">
                              <td className="text-gray-300 p-2">Week 1 → Week 4</td>
                              <td className="text-gray-300 p-2">25-35%</td>
                              <td className="text-gray-300 p-2">Bootcamp progression + community friendships</td>
                            </tr>
                            <tr className="border-b border-purple-500/20">
                              <td className="text-gray-300 p-2">Month 1 → Month 3</td>
                              <td className="text-gray-300 p-2">15-20%</td>
                              <td className="text-gray-300 p-2">Portfolio building + mentorship relationships</td>
                            </tr>
                            <tr className="border-b border-purple-500/20">
                              <td className="text-gray-300 p-2">Month 3 → Month 6</td>
                              <td className="text-gray-300 p-2">10-15%</td>
                              <td className="text-gray-300 p-2">Projects + real income potential + alumni success stories</td>
                            </tr>
                            <tr>
                              <td className="text-gray-300 p-2">Month 6+</td>
                              <td className="text-gray-300 p-2">8-12%</td>
                              <td className="text-gray-300 p-2">Mentorship income + community leadership + hired members return</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <h3 className="text-lg md:text-xl font-semibold text-purple-300 mb-3 md:mb-4">Estimated Lifetime Value (Per User)</h3>
                      <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-4 md:mb-6">
                        <li className="text-gray-300 text-sm md:text-base">Average stay: 3-6 months</li>
                        <li className="text-gray-300 text-sm md:text-base">If 1 in 50 gets hired: RM300 recruitment commission per hire</li>
                        <li className="text-gray-300 text-sm md:text-base">If 10% become mentors earning RM500/month: ~RM1500 per mentor annually</li>
                        <li className="text-gray-300 text-sm md:text-base">Platform revenue: Job ad fees (RM500-2000 per company) + % of mentorship fees</li>
                      </ul>
                    </div>

                    <div className="border-t border-purple-500/30 pt-4 md:pt-6">
                      <h2 className="text-xl md:text-2xl font-bold text-purple-400 mb-3 md:mb-4">ALUMNI & LEGEND SYSTEM</h2>
                      <h3 className="text-lg md:text-xl font-semibold text-purple-300 mb-3 md:mb-4">Getting Hired = New Game Mode</h3>
                      <h4 className="text-base md:text-lg font-semibold text-purple-300 mb-2 md:mb-3">Alumni Badge (Upon Hiring)</h4>
                      <div className="mb-4 md:mb-6 p-4 bg-gray-800 border border-purple-500/30 rounded">
                        <p className="text-gray-300 text-sm md:text-base font-semibold mb-2">🏆 KRACKED LEGEND: [Name]</p>
                        <p className="text-gray-300 text-sm md:text-base mb-1">━━━━━━━━━━━━━━━━━━━━━━━━━━━</p>
                        <p className="text-gray-300 text-sm md:text-base mb-1">Hired at: [Company Name]</p>
                        <p className="text-gray-300 text-sm md:text-base mb-1">Position: [Job Title]</p>
                        <p className="text-gray-300 text-sm md:text-base mb-1">Salary: [Optional - if they share]</p>
                        <p className="text-gray-300 text-sm md:text-base mb-1">Time in Kracked Devs: [X months]</p>
                        <p className="text-gray-300 text-sm md:text-base mb-1">Mentees Helped: [X]</p>
                        <p className="text-gray-300 text-sm md:text-base">Projects Completed: [X]</p>
                      </div>

                      <h3 className="text-lg md:text-xl font-semibold text-purple-300 mb-3 md:mb-4">Alumni Privileges</h3>
                      <div className="overflow-x-auto mb-4 md:mb-6">
                        <table className="w-full text-xs md:text-sm border-collapse">
                          <thead>
                            <tr className="border-b border-purple-500/30">
                              <th className="text-left text-purple-300 p-2">Privilege</th>
                              <th className="text-left text-purple-300 p-2">Benefit</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-purple-500/20">
                              <td className="text-gray-300 p-2">✅ Special "Alumni" badge</td>
                              <td className="text-gray-300 p-2">Permanent profile badge + prestige</td>
                            </tr>
                            <tr className="border-b border-purple-500/20">
                              <td className="text-gray-300 p-2">✅ Alumni leaderboard</td>
                              <td className="text-gray-300 p-2">Separate from main (all-time earnings tracked)</td>
                            </tr>
                            <tr className="border-b border-purple-500/20">
                              <td className="text-gray-300 p-2">✅ Automatic "Mentor" qualification</td>
                              <td className="text-gray-300 p-2">No application needed, skip to Certified Mentor tier</td>
                            </tr>
                            <tr className="border-b border-purple-500/20">
                              <td className="text-gray-300 p-2">✅ 50% bonus XP</td>
                              <td className="text-gray-300 p-2">All mentoring activities earn 50% more XP</td>
                            </tr>
                            <tr className="border-b border-purple-500/20">
                              <td className="text-gray-300 p-2">✅ Monthly "Alumni Spotlight"</td>
                              <td className="text-gray-300 p-2">Featured on Twitter + website</td>
                            </tr>
                            <tr className="border-b border-purple-500/20">
                              <td className="text-gray-300 p-2">✅ Exclusive alumni Discord channel</td>
                              <td className="text-gray-300 p-2">Private space for success stories + networking</td>
                            </tr>
                            <tr className="border-b border-purple-500/20">
                              <td className="text-gray-300 p-2">✅ First access to senior projects</td>
                              <td className="text-gray-300 p-2">Leadership roles, high-paying contracts</td>
                            </tr>
                            <tr>
                              <td className="text-gray-300 p-2">✅ Referral program</td>
                              <td className="text-gray-300 p-2">Earn RM if you hire other Kracked members</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <h3 className="text-lg md:text-xl font-semibold text-purple-300 mb-3 md:mb-4">Alumni Incentive Tier (Levels 51-100: "Ascended")</h3>
                      <div className="overflow-x-auto mb-4 md:mb-6">
                        <table className="w-full text-xs md:text-sm border-collapse">
                          <thead>
                            <tr className="border-b border-purple-500/30">
                              <th className="text-left text-purple-300 p-2">Milestone</th>
                              <th className="text-left text-purple-300 p-2">Reward Incentive</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-purple-500/20">
                              <td className="text-gray-300 p-2">Hired + 3 months</td>
                              <td className="text-gray-300 p-2">10% XP bonus (all activities) - Continued engagement</td>
                            </tr>
                            <tr className="border-b border-purple-500/20">
                              <td className="text-gray-300 p-2">Hire 1 Kracked member</td>
                              <td className="text-gray-300 p-2">RM100 referral bonus - Advocacy</td>
                            </tr>
                            <tr className="border-b border-purple-500/20">
                              <td className="text-gray-300 p-2">Hire 3+ Kracked members</td>
                              <td className="text-gray-300 p-2">RM1000 total + "Talent Scout" title - Community building</td>
                            </tr>
                            <tr className="border-b border-purple-500/20">
                              <td className="text-gray-300 p-2">Mentor 50+ members</td>
                              <td className="text-gray-300 p-2">"Senior Mentor" promotion + RM500/month stipend - Sustainable income</td>
                            </tr>
                            <tr>
                              <td className="text-gray-300 p-2">Create bootcamp module</td>
                              <td className="text-gray-300 p-2">"Course Creator" title + RM2000 one-time - Content creation</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="border-t border-purple-500/30 pt-4 md:pt-6">
                      <h2 className="text-xl md:text-2xl font-bold text-purple-400 mb-3 md:mb-4">LEADERBOARD & COMPETITION</h2>
                      <h3 className="text-lg md:text-xl font-semibold text-purple-300 mb-3 md:mb-4">Leaderboard Types</h3>
                      <div className="space-y-4 md:space-y-6 mb-4 md:mb-6">
                        <div>
                          <h4 className="text-base md:text-lg font-semibold text-purple-300 mb-2 md:mb-3">1. Experience Points (XP)</h4>
                          <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4">
                            <li className="text-gray-300 text-sm md:text-base"><strong className="text-purple-300">Metric:</strong> Global ranking by total XP</li>
                            <li className="text-gray-300 text-sm md:text-base"><strong className="text-purple-300">Resets:</strong> Never (all-time)</li>
                            <li className="text-gray-300 text-sm md:text-base"><strong className="text-purple-300">Bracket:</strong> All levels together</li>
                            <li className="text-gray-300 text-sm md:text-base"><strong className="text-purple-300">Reward:</strong> Monthly top 10 get cosmetics + gold coins</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-base md:text-lg font-semibold text-purple-300 mb-2 md:mb-3">2. Monthly XP Sprint</h4>
                          <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4">
                            <li className="text-gray-300 text-sm md:text-base"><strong className="text-purple-300">Metric:</strong> Racing for most XP in current month</li>
                            <li className="text-gray-300 text-sm md:text-base"><strong className="text-purple-300">Resets:</strong> 1st of each month</li>
                            <li className="text-gray-300 text-sm md:text-base"><strong className="text-purple-300">Bracket:</strong> By level bracket (1-10, 11-20, 21-30+) for fairness</li>
                            <li className="text-gray-300 text-sm md:text-base"><strong className="text-purple-300">Reward:</strong> Top 3 per bracket get exclusive cosmetics</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-base md:text-lg font-semibold text-purple-300 mb-2 md:mb-3">3. Mentorship Impact</h4>
                          <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4">
                            <li className="text-gray-300 text-sm md:text-base"><strong className="text-purple-300">Metric:</strong> Ranked by # mentees helped</li>
                            <li className="text-gray-300 text-sm md:text-base"><strong className="text-purple-300">Resets:</strong> Quarterly</li>
                            <li className="text-gray-300 text-sm md:text-base"><strong className="text-purple-300">Bracket:</strong> Mentor tier only</li>
                            <li className="text-gray-300 text-sm md:text-base"><strong className="text-purple-300">Reward:</strong> Top mentors get real RM bonuses</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-base md:text-lg font-semibold text-purple-300 mb-2 md:mb-3">4. Project Completion</h4>
                          <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4">
                            <li className="text-gray-300 text-sm md:text-base"><strong className="text-purple-300">Metric:</strong> Ranked by # projects completed</li>
                            <li className="text-gray-300 text-sm md:text-base"><strong className="text-purple-300">Resets:</strong> Monthly</li>
                            <li className="text-gray-300 text-sm md:text-base"><strong className="text-purple-300">Bracket:</strong> By project tier (learning vs contract)</li>
                            <li className="text-gray-300 text-sm md:text-base"><strong className="text-purple-300">Reward:</strong> Top performers featured on jobs board</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-base md:text-lg font-semibold text-purple-300 mb-2 md:mb-3">5. Community Score</h4>
                          <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4">
                            <li className="text-gray-300 text-sm md:text-base"><strong className="text-purple-300">Metric:</strong> Blend of: help responses + Discord messages + referrals + resources</li>
                            <li className="text-gray-300 text-sm md:text-base"><strong className="text-purple-300">Resets:</strong> Monthly</li>
                            <li className="text-gray-300 text-sm md:text-base"><strong className="text-purple-300">Bracket:</strong> All</li>
                            <li className="text-gray-300 text-sm md:text-base"><strong className="text-purple-300">Reward:</strong> Top 20 get recognition + early access to new projects</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-purple-500/30 pt-4 md:pt-6">
                      <h2 className="text-xl md:text-2xl font-bold text-purple-400 mb-3 md:mb-4">METRICS & SUCCESS INDICATORS</h2>
                      <h3 className="text-lg md:text-xl font-semibold text-purple-300 mb-3 md:mb-4">Key Metrics to Track</h3>
                      <div className="overflow-x-auto mb-4 md:mb-6">
                        <table className="w-full text-xs md:text-sm border-collapse">
                          <thead>
                            <tr className="border-b border-purple-500/30">
                              <th className="text-left text-purple-300 p-2">Metric</th>
                              <th className="text-left text-purple-300 p-2">Target</th>
                              <th className="text-left text-purple-300 p-2">Frequency</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-purple-500/20">
                              <td className="text-gray-300 p-2">% reaching Level 5</td>
                              <td className="text-gray-300 p-2">&gt;60%</td>
                              <td className="text-gray-300 p-2">Weekly</td>
                            </tr>
                            <tr className="border-b border-purple-500/20">
                              <td className="text-gray-300 p-2">% reaching Level 10</td>
                              <td className="text-gray-300 p-2">&gt;40%</td>
                              <td className="text-gray-300 p-2">Weekly</td>
                            </tr>
                            <tr className="border-b border-purple-500/20">
                              <td className="text-gray-300 p-2">% reaching Level 25</td>
                              <td className="text-gray-300 p-2">&gt;20%</td>
                              <td className="text-gray-300 p-2">Monthly</td>
                            </tr>
                            <tr className="border-b border-purple-500/20">
                              <td className="text-gray-300 p-2">% reaching Level 30+</td>
                              <td className="text-gray-300 p-2">&gt;10%</td>
                              <td className="text-gray-300 p-2">Monthly</td>
                            </tr>
                            <tr className="border-b border-purple-500/20">
                              <td className="text-gray-300 p-2">% actually hired within 6 months</td>
                              <td className="text-gray-300 p-2">&gt;5-10%</td>
                              <td className="text-gray-300 p-2">Monthly</td>
                            </tr>
                            <tr className="border-b border-purple-500/20">
                              <td className="text-gray-300 p-2">Average time to Level 10</td>
                              <td className="text-gray-300 p-2">4-6 weeks</td>
                              <td className="text-gray-300 p-2">Monthly</td>
                            </tr>
                            <tr className="border-b border-purple-500/20">
                              <td className="text-gray-300 p-2">Mentee satisfaction score</td>
                              <td className="text-gray-300 p-2">&gt;4.5/5</td>
                              <td className="text-gray-300 p-2">Monthly</td>
                            </tr>
                            <tr className="border-b border-purple-500/20">
                              <td className="text-gray-300 p-2">Monthly churn rate</td>
                              <td className="text-gray-300 p-2">&lt;5%</td>
                              <td className="text-gray-300 p-2">Weekly</td>
                            </tr>
                            <tr>
                              <td className="text-gray-300 p-2">Referral conversion</td>
                              <td className="text-gray-300 p-2">&gt;15%</td>
                              <td className="text-gray-300 p-2">Monthly</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="border-t border-purple-500/30 pt-4 md:pt-6">
                      <h2 className="text-xl md:text-2xl font-bold text-purple-400 mb-3 md:mb-4">NOTES & CONSIDERATIONS</h2>
                      
                      <div className="mb-4 md:mb-6">
                        <h3 className="text-lg md:text-xl font-semibold text-purple-300 mb-2 md:mb-3">Difficulty Tuning</h3>
                        <p className="text-gray-300 text-sm md:text-base mb-3 md:mb-4">
                          These XP values should be tested with closed beta. Adjust if users level too fast/slow.
                        </p>
                      </div>

                      <div className="mb-4 md:mb-6">
                        <h3 className="text-lg md:text-xl font-semibold text-purple-300 mb-2 md:mb-3">Seasonality</h3>
                        <p className="text-gray-300 text-sm md:text-base mb-2 md:mb-3">Consider seasonal projects:</p>
                        <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-3 md:mb-4">
                          <li className="text-gray-300 text-sm md:text-base">October: "Hacktober" (GitHub contributions)</li>
                          <li className="text-gray-300 text-sm md:text-base">January: "New Year Bootcamp" (fresh cohorts)</li>
                          <li className="text-gray-300 text-sm md:text-base">July: "Hiring Season" (job application blitz)</li>
                        </ul>
                      </div>

                      <div className="mb-4 md:mb-6">
                        <h3 className="text-lg md:text-xl font-semibold text-purple-300 mb-2 md:mb-3">International Expansion</h3>
                        <p className="text-gray-300 text-sm md:text-base mb-3 md:mb-4">
                          Current system assumes Malaysia focus. Scale regional leaderboards when expanding to Singapore, Thailand, etc.
                        </p>
                      </div>

                      <div className="mb-4 md:mb-6">
                        <h3 className="text-lg md:text-xl font-semibold text-purple-300 mb-2 md:mb-3">API Integration</h3>
                        <p className="text-gray-300 text-sm md:text-base mb-3 md:mb-4">
                          GitHub, Twitter, Instagram verifications should be automated for smooth onboarding.
                        </p>
                      </div>

                      <div className="mb-4 md:mb-6">
                        <h3 className="text-lg md:text-xl font-semibold text-purple-300 mb-2 md:mb-3">Bootcamp Partners</h3>
                        <p className="text-gray-300 text-sm md:text-base mb-3 md:mb-4">
                          Identify 3-5 "vibe coding veterans" to lead Level 5, 10, 15, 20 checkpoint sessions.
                        </p>
                      </div>

                      <div className="mb-4 md:mb-6">
                        <h3 className="text-lg md:text-xl font-semibold text-purple-300 mb-2 md:mb-3">Community Building</h3>
                        <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-3 md:mb-4">
                          <li className="text-gray-300 text-sm md:text-base">Pair Level 5+ mentees with Level 25+ mentors</li>
                          <li className="text-gray-300 text-sm md:text-base">Create accountability groups (small Discord channels, 4-5 people)</li>
                          <li className="text-gray-300 text-sm md:text-base">Weekly "wins" celebrations in #wins channel</li>
                        </ul>
                      </div>

                      <div className="border-t border-purple-500/30 pt-4 md:pt-6">
                        <p className="text-gray-300 text-sm md:text-base mb-2">
                          <strong className="text-purple-300">Total Document Length:</strong> Complete rewards + progression system
                        </p>
                        <p className="text-gray-300 text-sm md:text-base mb-2">
                          <strong className="text-purple-300">Ready to:</strong> Copy, paste, print, share, embed
                        </p>
                        <p className="text-gray-300 text-sm md:text-base mb-2">
                          <strong className="text-purple-300">Last Updated:</strong> December 2, 2025
                        </p>
                        <p className="text-gray-300 text-sm md:text-base mb-2">
                          <strong className="text-purple-300">Version:</strong> 1.0 (Elegant Format - Google Docs Ready)
                        </p>
                        <p className="text-purple-300 font-semibold text-sm md:text-base mt-4 md:mt-6">
                          🎮 Kracked Devs - Complete Rewards & Progression System 🎮
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </>
      )}

      {/* Levels Viewer Overlay */}
      {showLevels && (
        <>
          {/* Backdrop - Desktop only */}
          {!isMobile && <div className="fixed inset-0 bg-black/50 z-30" />}
          <div className="absolute inset-0 bg-transparent z-40 flex items-center justify-center p-2 md:p-4 pointer-events-none">
            <div className="pointer-events-auto">
              <div className={`bg-gray-900 border-4 border-blue-500 max-w-4xl w-full overflow-y-auto p-4 md:p-6 ${
                isMobile ? 'max-h-[60vh] mb-20' : 'max-h-[80vh]'
              }`}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl text-blue-400 font-bold">COMPLETE LEVELING TASKS LIBRARY</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  <div className="text-white space-y-4 md:space-y-6">
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold text-blue-400 mb-2 md:mb-4">KRACKED DEVS - COMPLETE LEVELING TASKS LIBRARY</h1>
                      <p className="text-gray-300 text-sm md:text-base mb-1">All Levels (1-50+) - Master Reference Document</p>
                      <p className="text-gray-300 text-sm md:text-base mb-1">For: Google Docs, PDF, Discord, Website</p>
                      <p className="text-gray-300 text-sm md:text-base mb-1">Status: Ready to Copy-Paste</p>
                      <p className="text-gray-300 text-sm md:text-base mb-4 md:mb-6">Format: Clean tables, easy to share</p>
                    </div>

                    <div className="border-t border-blue-500/30 pt-4 md:pt-6">
                      <h2 className="text-xl md:text-2xl font-bold text-blue-400 mb-3 md:mb-4">📚 TABLE OF CONTENTS</h2>
                      <ol className="list-decimal list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-4 md:mb-6">
                        <li className="text-gray-300 text-sm md:text-base">Levels 1-5 (Onboarding Tutorial)</li>
                        <li className="text-gray-300 text-sm md:text-base">Levels 6-10 (Beginner Bootcamp)</li>
                        <li className="text-gray-300 text-sm md:text-base">Levels 11-20 (Intermediate Development)</li>
                        <li className="text-gray-300 text-sm md:text-base">Levels 21-30 (Advanced & Specialization)</li>
                        <li className="text-gray-300 text-sm md:text-base">Levels 31-50+ (Mastery & Leadership)</li>
                      </ol>
                    </div>

                    <div className="border-t border-blue-500/30 pt-4 md:pt-6">
                      <h2 className="text-xl md:text-2xl font-bold text-blue-400 mb-3 md:mb-4">LEVELS 1-5: ONBOARDING TUTORIAL</h2>
                      <h3 className="text-lg md:text-xl font-semibold text-blue-300 mb-3 md:mb-4">Introduction to Kracked Devs & Developer Foundation</h3>
                      <h4 className="text-base md:text-lg font-semibold text-blue-300 mb-2 md:mb-3">Overview</h4>
                      <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-4 md:mb-6">
                        <li className="text-gray-300 text-sm md:text-base">Duration: 1-2 days (5-10 hours total, non-continuous)</li>
                        <li className="text-gray-300 text-sm md:text-base">Goal: Understand mission, set up dev environment, join community</li>
                        <li className="text-gray-300 text-sm md:text-base">Completion Reward: First Loot Chest + CODE zone unlock</li>
                      </ul>

                      <h4 className="text-base md:text-lg font-semibold text-blue-300 mb-2 md:mb-3">SECTION 1A: LEVEL 1 - WELCOME TO KRACKED DEVS</h4>
                      <div className="overflow-x-auto mb-4 md:mb-6">
                        <table className="w-full text-xs md:text-sm border-collapse">
                          <thead>
                            <tr className="border-b border-blue-500/30">
                              <th className="text-left text-blue-300 p-2">Task</th>
                              <th className="text-left text-blue-300 p-2">XP Reward</th>
                              <th className="text-left text-blue-300 p-2">Category</th>
                              <th className="text-left text-blue-300 p-2">Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-blue-500/20">
                              <td className="text-gray-300 p-2">Create Avatar & Customize</td>
                              <td className="text-gray-300 p-2">20 XP</td>
                              <td className="text-gray-300 p-2">Account Setup</td>
                              <td className="text-gray-300 p-2">Choose avatar appearance, skin, starting outfit</td>
                            </tr>
                            <tr className="border-b border-blue-500/20">
                              <td className="text-gray-300 p-2">Complete Profile Bio</td>
                              <td className="text-gray-300 p-2">15 XP</td>
                              <td className="text-gray-300 p-2">Account Setup</td>
                              <td className="text-gray-300 p-2">Write 50-100 character bio about yourself</td>
                            </tr>
                            <tr className="border-b border-blue-500/20">
                              <td className="text-gray-300 p-2">Watch Mission Video (2 min)</td>
                              <td className="text-gray-300 p-2">25 XP</td>
                              <td className="text-gray-300 p-2">Education</td>
                              <td className="text-gray-300 p-2">"What is Kracked Devs?" intro video</td>
                            </tr>
                            <tr className="border-b border-blue-500/20">
                              <td className="text-gray-300 p-2">Join Community Discord</td>
                              <td className="text-gray-300 p-2">20 XP</td>
                              <td className="text-gray-300 p-2">Social</td>
                              <td className="text-gray-300 p-2">Accept Discord invite, join #introductions</td>
                            </tr>
                            <tr>
                              <td className="text-gray-300 p-2">Post Introduction in Discord</td>
                              <td className="text-gray-300 p-2">20 XP</td>
                              <td className="text-gray-300 p-2">Social/Community</td>
                              <td className="text-gray-300 p-2">Introduce yourself in #introductions channel</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p className="text-gray-300 text-sm md:text-base mb-4 md:mb-6">
                        <strong className="text-blue-300">Level 1 Total: 100 XP | Est. Time: 15-20 minutes</strong><br />
                        <strong className="text-blue-300">Reward:</strong> Fresh Cracked Dev badge + Starter pet
                      </p>

                      <h4 className="text-base md:text-lg font-semibold text-blue-300 mb-2 md:mb-3">SECTION 1B: LEVEL 2 - CONNECT YOUR PRESENCE</h4>
                      <div className="overflow-x-auto mb-4 md:mb-6">
                        <table className="w-full text-xs md:text-sm border-collapse">
                          <thead>
                            <tr className="border-b border-blue-500/30">
                              <th className="text-left text-blue-300 p-2">Task</th>
                              <th className="text-left text-blue-300 p-2">XP Reward</th>
                              <th className="text-left text-blue-300 p-2">Category</th>
                              <th className="text-left text-blue-300 p-2">Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-blue-500/20">
                              <td className="text-gray-300 p-2">Follow Kracked Devs Twitter</td>
                              <td className="text-gray-300 p-2">15 XP</td>
                              <td className="text-gray-300 p-2">Social</td>
                              <td className="text-gray-300 p-2">Link Twitter account, follow @krackeddevs</td>
                            </tr>
                            <tr className="border-b border-blue-500/20">
                              <td className="text-gray-300 p-2">Follow Kracked Devs Instagram</td>
                              <td className="text-gray-300 p-2">15 XP</td>
                              <td className="text-gray-300 p-2">Social</td>
                              <td className="text-gray-300 p-2">Link Instagram account, follow @krackeddevs</td>
                            </tr>
                            <tr className="border-b border-blue-500/20">
                              <td className="text-gray-300 p-2">Retweet/Share Kracked Devs Post</td>
                              <td className="text-gray-300 p-2">25 XP</td>
                              <td className="text-gray-300 p-2">Social/Growth</td>
                              <td className="text-gray-300 p-2">Share any Kracked Devs post to your Twitter</td>
                            </tr>
                            <tr className="border-b border-blue-500/20">
                              <td className="text-gray-300 p-2">Like 3+ Discord messages in #general</td>
                              <td className="text-gray-300 p-2">10 XP</td>
                              <td className="text-gray-300 p-2">Community</td>
                              <td className="text-gray-300 p-2">Engage with community posts</td>
                            </tr>
                            <tr className="border-b border-blue-500/20">
                              <td className="text-gray-300 p-2">Comment on community intro post</td>
                              <td className="text-gray-300 p-2">20 XP</td>
                              <td className="text-gray-300 p-2">Community</td>
                              <td className="text-gray-300 p-2">Welcome a new member in introductions</td>
                            </tr>
                            <tr>
                              <td className="text-gray-300 p-2">Bonus: Read "Why Vibe Coding Matters"</td>
                              <td className="text-gray-300 p-2">15 XP</td>
                              <td className="text-gray-300 p-2">Education</td>
                              <td className="text-gray-300 p-2">5 min article (optional for reach 100 XP)</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p className="text-gray-300 text-sm md:text-base mb-4 md:mb-6">
                        <strong className="text-blue-300">Level 2 Total: 100 XP | Est. Time: 20-30 minutes</strong><br />
                        <strong className="text-blue-300">Reward:</strong> Social Butterfly badge + Hat cosmetic
                      </p>

                      <h4 className="text-base md:text-lg font-semibold text-blue-300 mb-2 md:mb-3">SECTION 1C: LEVEL 3 - JOIN THE DISCORD MOVEMENT</h4>
                      <div className="overflow-x-auto mb-4 md:mb-6">
                        <table className="w-full text-xs md:text-sm border-collapse">
                          <thead>
                            <tr className="border-b border-blue-500/30">
                              <th className="text-left text-blue-300 p-2">Task</th>
                              <th className="text-left text-blue-300 p-2">XP Reward</th>
                              <th className="text-left text-blue-300 p-2">Category</th>
                              <th className="text-left text-blue-300 p-2">Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-blue-500/20">
                              <td className="text-gray-300 p-2">Verify Discord (link email)</td>
                              <td className="text-gray-300 p-2">10 XP</td>
                              <td className="text-gray-300 p-2">Account Setup</td>
                              <td className="text-gray-300 p-2">Connect Discord to Kracked Devs account</td>
                            </tr>
                            <tr className="border-b border-blue-500/20">
                              <td className="text-gray-300 p-2">Accept Discord roles</td>
                              <td className="text-gray-300 p-2">10 XP</td>
                              <td className="text-gray-300 p-2">Community</td>
                              <td className="text-gray-300 p-2">Select your interests (frontend, backend, AI, learning)</td>
                            </tr>
                            <tr className="border-b border-blue-500/20">
                              <td className="text-gray-300 p-2">Read "How to Get Hired" guide</td>
                              <td className="text-gray-300 p-2">20 XP</td>
                              <td className="text-gray-300 p-2">Education</td>
                              <td className="text-gray-300 p-2">5-min guide on career pathway</td>
                            </tr>
                            <tr className="border-b border-blue-500/20">
                              <td className="text-gray-300 p-2">Ask 1 question in #help-desk</td>
                              <td className="text-gray-300 p-2">15 XP</td>
                              <td className="text-gray-300 p-2">Community</td>
                              <td className="text-gray-300 p-2">Post a genuine question about platform</td>
                            </tr>
                            <tr className="border-b border-blue-500/20">
                              <td className="text-gray-300 p-2">Reply helpfully to someone's question</td>
                              <td className="text-gray-300 p-2">25 XP</td>
                              <td className="text-gray-300 p-2">Community/Mentoring</td>
                              <td className="text-gray-300 p-2">Help another member (text/Discord)</td>
                            </tr>
                            <tr className="border-b border-blue-500/20">
                              <td className="text-gray-300 p-2">React to 5 community achievements</td>
                              <td className="text-gray-300 p-2">10 XP</td>
                              <td className="text-gray-300 p-2">Community</td>
                              <td className="text-gray-300 p-2">Celebrate others' wins in #wins channel</td>
                            </tr>
                            <tr>
                              <td className="text-gray-300 p-2">Bonus: Watch "Vibe Coding Intro" video</td>
                              <td className="text-gray-300 p-2">15 XP</td>
                              <td className="text-gray-300 p-2">Education</td>
                              <td className="text-gray-300 p-2">10 min video (optional)</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p className="text-gray-300 text-sm md:text-base mb-4 md:mb-6">
                        <strong className="text-blue-300">Level 3 Total: 100 XP | Est. Time: 30-45 minutes</strong><br />
                        <strong className="text-blue-300">Reward:</strong> Community Member badge + Shoes cosmetic
                      </p>

                      <h4 className="text-base md:text-lg font-semibold text-blue-300 mb-2 md:mb-3">SECTION 1D: LEVEL 4 - DEVELOPER SETUP</h4>
                      <div className="overflow-x-auto mb-4 md:mb-6">
                        <table className="w-full text-xs md:text-sm border-collapse">
                          <thead>
                            <tr className="border-b border-blue-500/30">
                              <th className="text-left text-blue-300 p-2">Task</th>
                              <th className="text-left text-blue-300 p-2">XP Reward</th>
                              <th className="text-left text-blue-300 p-2">Category</th>
                              <th className="text-left text-blue-300 p-2">Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-blue-500/20">
                              <td className="text-gray-300 p-2">Create GitHub Account (if new)</td>
                              <td className="text-gray-300 p-2">30 XP</td>
                              <td className="text-gray-300 p-2">Technical</td>
                              <td className="text-gray-300 p-2">Set up GitHub profile with bio and photo</td>
                            </tr>
                            <tr className="border-b border-blue-500/20">
                              <td className="text-gray-300 p-2">Link GitHub to Kracked Devs</td>
                              <td className="text-gray-300 p-2">10 XP</td>
                              <td className="text-gray-300 p-2">Account Setup</td>
                              <td className="text-gray-300 p-2">OAuth connection to platform</td>
                            </tr>
                            <tr className="border-b border-blue-500/20">
                              <td className="text-gray-300 p-2">Complete GitHub profile</td>
                              <td className="text-gray-300 p-2">15 XP</td>
                              <td className="text-gray-300 p-2">Technical</td>
                              <td className="text-gray-300 p-2">Add photo, bio, link (make professional)</td>
                            </tr>
                            <tr className="border-b border-blue-500/20">
                              <td className="text-gray-300 p-2">Create first GitHub repo</td>
                              <td className="text-gray-300 p-2">25 XP</td>
                              <td className="text-gray-300 p-2">Technical</td>
                              <td className="text-gray-300 p-2">Initialize "kracked-devs-portfolio" repo</td>
                            </tr>
                            <tr className="border-b border-blue-500/20">
                              <td className="text-gray-300 p-2">Watch "Vibe Coding Setup Guide" (15 min)</td>
                              <td className="text-gray-300 p-2">15 XP</td>
                              <td className="text-gray-300 p-2">Education</td>
                              <td className="text-gray-300 p-2">Tools overview (ChatGPT, Cursor, GitHub)</td>
                            </tr>
                            <tr>
                              <td className="text-gray-300 p-2">Set up AI coding tool</td>
                              <td className="text-gray-300 p-2">5 XP</td>
                              <td className="text-gray-300 p-2">Technical</td>
                              <td className="text-gray-300 p-2">Download and authenticate Cursor/ChatGPT</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p className="text-gray-300 text-sm md:text-base mb-4 md:mb-6">
                        <strong className="text-blue-300">Level 4 Total: 100 XP | Est. Time: 45-60 minutes</strong><br />
                        <strong className="text-blue-300">Reward:</strong> Dev Setup Complete badge + Hair style unlock
                      </p>

                      <h4 className="text-base md:text-lg font-semibold text-blue-300 mb-2 md:mb-3">SECTION 1E: LEVEL 5 - READY FOR BOOTCAMP (MILESTONE)</h4>
                      <div className="overflow-x-auto mb-4 md:mb-6">
                        <table className="w-full text-xs md:text-sm border-collapse">
                          <thead>
                            <tr className="border-b border-blue-500/30">
                              <th className="text-left text-blue-300 p-2">Task</th>
                              <th className="text-left text-blue-300 p-2">XP Reward</th>
                              <th className="text-left text-blue-300 p-2">Category</th>
                              <th className="text-left text-blue-300 p-2">Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-blue-500/20">
                              <td className="text-gray-300 p-2">Complete onboarding checklist</td>
                              <td className="text-gray-300 p-2">25 XP</td>
                              <td className="text-gray-300 p-2">Checkpoint</td>
                              <td className="text-gray-300 p-2">Verify all previous tasks done</td>
                            </tr>
                            <tr className="border-b border-blue-500/20">
                              <td className="text-gray-300 p-2">Make first commit to GitHub</td>
                              <td className="text-gray-300 p-2">25 XP</td>
                              <td className="text-gray-300 p-2">Technical</td>
                              <td className="text-gray-300 p-2">Push "Hello World" or simple code</td>
                            </tr>
                            <tr className="border-b border-blue-500/20">
                              <td className="text-gray-300 p-2">Build simple project with AI</td>
                              <td className="text-gray-300 p-2">30 XP</td>
                              <td className="text-gray-300 p-2">Technical/Education</td>
                              <td className="text-gray-300 p-2">Small project (todo list, calculator) with vibe coding</td>
                            </tr>
                            <tr className="border-b border-blue-500/20">
                              <td className="text-gray-300 p-2">Document your learning</td>
                              <td className="text-gray-300 p-2">15 XP</td>
                              <td className="text-gray-300 p-2">Education</td>
                              <td className="text-gray-300 p-2">Write "What I learned so far" reflection</td>
                            </tr>
                            <tr>
                              <td className="text-gray-300 p-2">Schedule 1:1 with Kracked Devs staff</td>
                              <td className="text-gray-300 p-2">5 XP</td>
                              <td className="text-gray-300 p-2">Mentorship</td>
                              <td className="text-gray-300 p-2">Book intro mentoring session</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p className="text-gray-300 text-sm md:text-base mb-4 md:mb-6">
                        <strong className="text-blue-300">Level 5 Total: 100 XP | Est. Time: 45-90 minutes</strong><br />
                        <strong className="text-blue-300">Reward:</strong> 🎉 MAJOR MILESTONE - First Loot Chest + Level 5 Legend badge + CODE zone unlock
                      </p>
                    </div>

                    <div className="border-t border-blue-500/30 pt-4 md:pt-6">
                      <h2 className="text-xl md:text-2xl font-bold text-blue-400 mb-3 md:mb-4">LEVELS 6-10: BEGINNER BOOTCAMP</h2>
                      <h3 className="text-lg md:text-xl font-semibold text-blue-300 mb-3 md:mb-4">Learning Vibe Coding & Building First Portfolio</h3>
                      <h4 className="text-base md:text-lg font-semibold text-blue-300 mb-2 md:mb-3">Overview</h4>
                      <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-4 md:mb-6">
                        <li className="text-gray-300 text-sm md:text-base">Duration: 4-6 weeks (2-5 hours/week depending on pace)</li>
                        <li className="text-gray-300 text-sm md:text-base">Goal: Complete bootcamp, build 2-3 portfolio projects, get first mentor</li>
                        <li className="text-gray-300 text-sm md:text-base">Completion Reward: Bootcamp Graduate badge + Portfolio ready + Mentor recommendation</li>
                      </ul>
                      <p className="text-gray-300 text-sm md:text-base mb-4 md:mb-6">
                        <strong className="text-blue-300">Key Tasks:</strong> Daily login (5-10 XP), Weekly challenges (25 XP), Bootcamp modules (20-40 XP each), Build projects (40-60 XP), Code reviews (12-15 XP), Mentor sessions (15-25 XP)
                      </p>
                      <p className="text-gray-300 text-sm md:text-base mb-4 md:mb-6">
                        <strong className="text-blue-300">Level 10 Total: ~900 XP | Est. Time: 4-6 weeks</strong><br />
                        <strong className="text-blue-300">Reward:</strong> 🎉 Bootcamp Graduate badge + Silver Loot Chest + Level 10 title
                      </p>
                    </div>

                    <div className="border-t border-blue-500/30 pt-4 md:pt-6">
                      <h2 className="text-xl md:text-2xl font-bold text-blue-400 mb-3 md:mb-4">LEVELS 11-20: INTERMEDIATE DEVELOPMENT</h2>
                      <h3 className="text-lg md:text-xl font-semibold text-blue-300 mb-3 md:mb-4">Specialization & Real Portfolio Building</h3>
                      <h4 className="text-base md:text-lg font-semibold text-blue-300 mb-2 md:mb-3">Overview</h4>
                      <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-4 md:mb-6">
                        <li className="text-gray-300 text-sm md:text-base">Duration: 6-8 weeks (3-5 hours/week)</li>
                        <li className="text-gray-300 text-sm md:text-base">Goal: Choose specialization, build 3-5 complex projects, start earning</li>
                        <li className="text-gray-300 text-sm md:text-base">Completion Reward: Specialization badge + Hire-ready status + Project revenue possible</li>
                      </ul>
                      <p className="text-gray-300 text-sm md:text-base mb-4 md:mb-6">
                        <strong className="text-blue-300">Key Tasks:</strong> Choose specialization (25 XP), Build specialization projects (50 XP each), Advanced modules (30 XP), Deploy to production (20 XP), Technical blog posts (40 XP), Open source contributions (40 XP), Help bootcamp members (30 XP)
                      </p>
                      <p className="text-gray-300 text-sm md:text-base mb-4 md:mb-6">
                        <strong className="text-blue-300">Levels 11-20 Total: ~1,800 XP | Est. Time: 6-8 weeks</strong><br />
                        <strong className="text-blue-300">Reward at 20:</strong> Intermediate Developer title + Hire-Ready status notification
                      </p>
                    </div>

                    <div className="border-t border-blue-500/30 pt-4 md:pt-6">
                      <h2 className="text-xl md:text-2xl font-bold text-blue-400 mb-3 md:mb-4">LEVELS 21-30: ADVANCED & SPECIALIZATION</h2>
                      <h3 className="text-lg md:text-xl font-semibold text-blue-300 mb-3 md:mb-4">Interview Ready & Real Income</h3>
                      <h4 className="text-base md:text-lg font-semibold text-blue-300 mb-2 md:mb-3">Overview</h4>
                      <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-4 md:mb-6">
                        <li className="text-gray-300 text-sm md:text-base">Duration: 8-12 weeks (3-5 hours/week)</li>
                        <li className="text-gray-300 text-sm md:text-base">Goal: Perfect portfolio, start contract work, apply for jobs</li>
                        <li className="text-gray-300 text-sm md:text-base">Completion Reward: Job board features + Mentor qualification + Real income starting</li>
                      </ul>
                      <p className="text-gray-300 text-sm md:text-base mb-4 md:mb-6">
                        <strong className="text-blue-300">Key Tasks:</strong> Polish showcase projects (50 XP), Create portfolio website (60 XP), Mentor training (80 XP), First paid mentoring session (25 XP), Contract projects (100 XP), Leetcode challenges (100 XP), Mock interviews (50 XP), System design (80 XP)
                      </p>
                      <p className="text-gray-300 text-sm md:text-base mb-4 md:mb-6">
                        <strong className="text-blue-300">Levels 21-30 Total: ~2,700 XP | Est. Time: 8-12 weeks</strong><br />
                        <strong className="text-blue-300">Reward at 30:</strong> Job-Ready badge + Featured on job board
                      </p>
                    </div>

                    <div className="border-t border-blue-500/30 pt-4 md:pt-6">
                      <h2 className="text-xl md:text-2xl font-bold text-blue-400 mb-3 md:mb-4">LEVELS 31-50+: MASTERY & LEADERSHIP</h2>
                      <h3 className="text-lg md:text-xl font-semibold text-blue-300 mb-3 md:mb-4">Mentors, Leaders, & Alumni Builders</h3>
                      <h4 className="text-base md:text-lg font-semibold text-blue-300 mb-2 md:mb-3">Overview</h4>
                      <ul className="list-disc list-inside space-y-1 md:space-y-2 ml-2 md:ml-4 mb-4 md:mb-6">
                        <li className="text-gray-300 text-sm md:text-base">Timeline: Ongoing (2-5 hours/week as income allows)</li>
                        <li className="text-gray-300 text-sm md:text-base">Goal: Mentor others, earn significant income, get hired or build influence</li>
                        <li className="text-gray-300 text-sm md:text-base">Completion Reward: Leadership roles, RM500-2000+/month potential income</li>
                      </ul>
                      <p className="text-gray-300 text-sm md:text-base mb-4 md:mb-6">
                        <strong className="text-blue-300">Key Tasks:</strong> Mentor 20+ members (200 XP), Lead bootcamp sessions (150 XP), Create mentoring resources (120 XP), Lead team projects (150 XP), Complete contract projects (200 XP), Create bootcamp modules (200 XP), Get hired (100 XP), Alumni badge unlock (200 XP), Referral bonuses (100-300 XP)
                      </p>
                      <p className="text-gray-300 text-sm md:text-base mb-4 md:mb-6">
                        <strong className="text-blue-300">Levels 31-50+ Total: 3,000+ XP | Est. Time: Ongoing</strong><br />
                        <strong className="text-blue-300">Reward at 50+:</strong> Legendary badge + Hall of Fame + Potential employment offer from Kracked Devs team
                      </p>
                    </div>

                    <div className="border-t border-blue-500/30 pt-4 md:pt-6">
                      <h2 className="text-xl md:text-2xl font-bold text-blue-400 mb-3 md:mb-4">QUICK REFERENCE SUMMARY</h2>
                      <div className="overflow-x-auto mb-4 md:mb-6">
                        <table className="w-full text-xs md:text-sm border-collapse">
                          <thead>
                            <tr className="border-b border-blue-500/30">
                              <th className="text-left text-blue-300 p-2">Level Range</th>
                              <th className="text-left text-blue-300 p-2">Duration</th>
                              <th className="text-left text-blue-300 p-2">XP Total</th>
                              <th className="text-left text-blue-300 p-2">Key Focus</th>
                              <th className="text-left text-blue-300 p-2">Completion Reward</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-blue-500/20">
                              <td className="text-gray-300 p-2">1-5</td>
                              <td className="text-gray-300 p-2">1-2 days</td>
                              <td className="text-gray-300 p-2">500 XP</td>
                              <td className="text-gray-300 p-2">Onboarding + Account Setup</td>
                              <td className="text-gray-300 p-2">Fresh Dev badge + First Loot Chest</td>
                            </tr>
                            <tr className="border-b border-blue-500/20">
                              <td className="text-gray-300 p-2">6-10</td>
                              <td className="text-gray-300 p-2">4-6 weeks</td>
                              <td className="text-gray-300 p-2">900 XP</td>
                              <td className="text-gray-300 p-2">Bootcamp + Learn Vibe Coding</td>
                              <td className="text-gray-300 p-2">Bootcamp Graduate badge + Silver Chest</td>
                            </tr>
                            <tr className="border-b border-blue-500/20">
                              <td className="text-gray-300 p-2">11-20</td>
                              <td className="text-gray-300 p-2">6-8 weeks</td>
                              <td className="text-gray-300 p-2">1,800 XP</td>
                              <td className="text-gray-300 p-2">Intermediate + Specialization</td>
                              <td className="text-gray-300 p-2">Specialization badge + Hire-Ready</td>
                            </tr>
                            <tr className="border-b border-blue-500/20">
                              <td className="text-gray-300 p-2">21-30</td>
                              <td className="text-gray-300 p-2">8-12 weeks</td>
                              <td className="text-gray-300 p-2">2,700 XP</td>
                              <td className="text-gray-300 p-2">Advanced + Mentoring Start</td>
                              <td className="text-gray-300 p-2">Job-Ready badge + Mentor certified</td>
                            </tr>
                            <tr>
                              <td className="text-gray-300 p-2">31-50+</td>
                              <td className="text-gray-300 p-2">Ongoing</td>
                              <td className="text-gray-300 p-2">3,000+ XP</td>
                              <td className="text-gray-300 p-2">Mastery + Leadership + Income</td>
                              <td className="text-gray-300 p-2">Legendary badge + Alumni benefits</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p className="text-gray-300 text-sm md:text-base mb-4 md:mb-6">
                        <strong className="text-blue-300">TOTAL (1-50+):</strong> 6-8 months | ~9,700 XP | Journey to Hired & Beyond | Kracked Legend + Income
                      </p>
                    </div>

                    <div className="border-t border-blue-500/30 pt-4 md:pt-6">
                      <h2 className="text-xl md:text-2xl font-bold text-blue-400 mb-3 md:mb-4">CONTENT CALENDAR</h2>
                      <h3 className="text-lg md:text-xl font-semibold text-blue-300 mb-3 md:mb-4">Sample Weekly Task Rotations</h3>
                      <h3 className="text-lg md:text-xl font-semibold text-blue-300 mb-3 md:mb-4">Monthly Challenge Themes</h3>
                      <div className="overflow-x-auto mb-4 md:mb-6">
                        <table className="w-full text-xs md:text-sm border-collapse">
                          <thead>
                            <tr className="border-b border-blue-500/30">
                              <th className="text-left text-blue-300 p-2">Month</th>
                              <th className="text-left text-blue-300 p-2">Focus Theme</th>
                              <th className="text-left text-blue-300 p-2">Featured Challenge</th>
                              <th className="text-left text-blue-300 p-2">Community Event</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-blue-500/20">
                              <td className="text-gray-300 p-2">Jan</td>
                              <td className="text-gray-300 p-2">New Year Bootcamp</td>
                              <td className="text-gray-300 p-2">"Start 2026 Right" challenge</td>
                              <td className="text-gray-300 p-2">New cohort kickoff</td>
                            </tr>
                            <tr className="border-b border-blue-500/20">
                              <td className="text-gray-300 p-2">Feb</td>
                              <td className="text-gray-300 p-2">Valentine Code</td>
                              <td className="text-gray-300 p-2">"Love Your Code" refactor challenge</td>
                              <td className="text-gray-300 p-2">Code review party</td>
                            </tr>
                            <tr className="border-b border-blue-500/20">
                              <td className="text-gray-300 p-2">Mar</td>
                              <td className="text-gray-300 p-2">Spring Sprint</td>
                              <td className="text-gray-300 p-2">"3 Projects in 30 Days"</td>
                              <td className="text-gray-300 p-2">Portfolio showcase</td>
                            </tr>
                            <tr className="border-b border-blue-500/20">
                              <td className="text-gray-300 p-2">Apr</td>
                              <td className="text-gray-300 p-2">API April</td>
                              <td className="text-gray-300 p-2">"Build with 5 Different APIs"</td>
                              <td className="text-gray-300 p-2">Hack-a-thon</td>
                            </tr>
                            <tr className="border-b border-blue-500/20">
                              <td className="text-gray-300 p-2">May</td>
                              <td className="text-gray-300 p-2">Mentor May</td>
                              <td className="text-gray-300 p-2">"Help 5 People" challenge</td>
                              <td className="text-gray-300 p-2">Mentorship matching event</td>
                            </tr>
                            <tr className="border-b border-blue-500/20">
                              <td className="text-gray-300 p-2">Jun</td>
                              <td className="text-gray-300 p-2">Summer Siesta</td>
                              <td className="text-gray-300 p-2">Chill challenges, low-stress vibe</td>
                              <td className="text-gray-300 p-2">Casual meetups</td>
                            </tr>
                            <tr className="border-b border-blue-500/20">
                              <td className="text-gray-300 p-2">Jul</td>
                              <td className="text-gray-300 p-2">Hiring Season</td>
                              <td className="text-gray-300 p-2">Job application blitz</td>
                              <td className="text-gray-300 p-2">Company Q&A sessions</td>
                            </tr>
                            <tr className="border-b border-blue-500/20">
                              <td className="text-gray-300 p-2">Aug</td>
                              <td className="text-gray-300 p-2">Anniversary</td>
                              <td className="text-gray-300 p-2">Celebration challenges</td>
                              <td className="text-gray-300 p-2">"Kracked Devs 1 Year" event</td>
                            </tr>
                            <tr className="border-b border-blue-500/20">
                              <td className="text-gray-300 p-2">Sep</td>
                              <td className="text-gray-300 p-2">Skill Specialization</td>
                              <td className="text-gray-300 p-2">Choose/deepen specialization</td>
                              <td className="text-gray-300 p-2">Tech talks by specialization</td>
                            </tr>
                            <tr className="border-b border-blue-500/20">
                              <td className="text-gray-300 p-2">Oct</td>
                              <td className="text-gray-300 p-2">Hacktober</td>
                              <td className="text-gray-300 p-2">GitHub contributions focus</td>
                              <td className="text-gray-300 p-2">Hacktoberfest participation</td>
                            </tr>
                            <tr className="border-b border-blue-500/20">
                              <td className="text-gray-300 p-2">Nov</td>
                              <td className="text-gray-300 p-2">Gratitude</td>
                              <td className="text-gray-300 p-2">"Thank Your Mentor"</td>
                              <td className="text-gray-300 p-2">Alumni celebration</td>
                            </tr>
                            <tr>
                              <td className="text-gray-300 p-2">Dec</td>
                              <td className="text-gray-300 p-2">Year End Wrap</td>
                              <td className="text-gray-300 p-2">Reflection + Achievements</td>
                              <td className="text-gray-300 p-2">Year-end gala/celebration</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="border-t border-blue-500/30 pt-4 md:pt-6">
                        <p className="text-gray-300 text-sm md:text-base mb-2">
                          <strong className="text-blue-300">Total Document Length:</strong> All levels complete reference
                        </p>
                        <p className="text-gray-300 text-sm md:text-base mb-2">
                          <strong className="text-blue-300">Ready to:</strong> Copy, paste, print, share, embed
                        </p>
                        <p className="text-gray-300 text-sm md:text-base mb-2">
                          <strong className="text-blue-300">Last Updated:</strong> December 2, 2025
                        </p>
                        <p className="text-gray-300 text-sm md:text-base mb-2">
                          <strong className="text-blue-300">Version:</strong> 1.0 (Master Reference)
                        </p>
                        <p className="text-blue-300 font-semibold text-sm md:text-base mt-4 md:mt-6">
                          🎮 Kracked Devs - The Complete Leveling Journey 🎮
                        </p>
                      </div>
                    </div>
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


