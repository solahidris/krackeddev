import React from 'react';
import { RpgBox, PixelButton } from './PixelComponents';
import CharacterHUD from './CharacterHUD';
import { CharacterStats } from '../../types/jobs';

interface Props {
    stats: CharacterStats;
    onVisitGuild: () => void;
    onRest: () => void;
    onVisitTraining: () => void;
}

const TownSquare: React.FC<Props> = ({ stats, onVisitGuild, onRest, onVisitTraining }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full p-4">
            <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Main Illustration Area - The Scene */}
                <div className="aspect-video bg-gradient-to-b from-sky-400 via-sky-300 to-blue-200 border-4 border-black relative overflow-hidden shadow-2xl group rounded-sm ring-4 ring-gray-800 pointer-events-none">

                    {/* --- AMBIENCE LAYERS --- */}

                    {/* Sun */}
                    <div className="absolute top-6 right-8">
                        <div className="w-12 h-12 bg-yellow-300 rounded-full blur-[2px] animate-pulse"></div>
                        <div className="absolute inset-0 bg-yellow-400/30 rounded-full blur-xl animate-pulse"></div>
                    </div>

                    {/* Mountains (CSS Shapes) */}
                    <div className="absolute bottom-1/3 left-0 right-0 h-24 z-0">
                        {/* Mountain 1 */}
                        <div className="absolute bottom-0 left-[-20px] w-0 h-0 border-l-[100px] border-l-transparent border-r-[100px] border-r-transparent border-b-[150px] border-b-gray-700"></div>
                        {/* Mountain 2 */}
                        <div className="absolute bottom-0 left-[120px] w-0 h-0 border-l-[80px] border-l-transparent border-r-[80px] border-r-transparent border-b-[120px] border-b-gray-600"></div>
                        {/* Mountain 3 */}
                        <div className="absolute bottom-0 right-[-50px] w-0 h-0 border-l-[150px] border-l-transparent border-r-[150px] border-r-transparent border-b-[200px] border-b-gray-800"></div>
                    </div>

                    {/* Clouds */}
                    <div className="absolute top-4 left-0 w-full h-full pointer-events-none z-0">
                        <div className="absolute top-2 w-24 text-4xl text-white opacity-80 animate-move-clouds-slow">☁️</div>
                        <div className="absolute top-12 w-32 text-6xl text-white opacity-60 animate-move-clouds-medium delay-1000">☁️</div>
                        <div className="absolute top-24 w-16 text-3xl text-white opacity-40 animate-move-clouds-fast delay-75">☁️</div>
                    </div>

                    {/* Flying Dragon */}
                    <div className="absolute top-10 left-[-10%] z-10 animate-fly-across pointer-events-none">
                        <div className="text-4xl filter drop-shadow-md">🐉</div>
                    </div>

                    {/* Ground */}
                    <div className="absolute bottom-0 w-full h-1/3 bg-green-600 border-t-4 border-green-800 z-10">
                        {/* Grass details */}
                        <div className="absolute top-2 left-10 text-green-800 text-xs">ww</div>
                        <div className="absolute top-6 left-1/4 text-green-800 text-xs">w</div>
                        <div className="absolute top-4 right-20 text-green-800 text-xs">www</div>
                        <div className="absolute top-12 left-1/2 text-green-800 text-xs">ww</div>
                    </div>

                    {/* --- WALKING PEOPLE (Bottom Layer) --- */}
                    <div className="absolute bottom-2 left-0 w-full z-20 pointer-events-none overflow-hidden h-12">

                        {/* Walker 1: Wizard */}
                        <div className="absolute animate-walk" style={{ animationDuration: '40s', animationDelay: '0s' }}>
                            <div className="text-3xl animate-walk-bob">🧙‍♂️</div>
                        </div>

                        {/* Walker 2: Dev */}
                        <div className="absolute animate-walk" style={{ animationDuration: '35s', animationDelay: '10s' }}>
                            <div className="text-3xl animate-walk-bob" style={{ animationDelay: '0.1s' }}>👩‍💻</div>
                        </div>

                        {/* Walker 3: Zombie (Legacy Code) */}
                        <div className="absolute animate-walk" style={{ animationDuration: '60s', animationDelay: '5s' }}>
                            <div className="text-3xl animate-walk-bob grayscale opacity-80" style={{ animationDelay: '0.2s' }}>🧟</div>
                        </div>

                        {/* Walker 4: Fairy */}
                        <div className="absolute animate-walk" style={{ animationDuration: '25s', animationDelay: '20s' }}>
                            <div className="text-2xl animate-bounce" style={{ animationDuration: '1s' }}>🧚</div>
                        </div>

                    </div>

                    {/* --- INTERACTIVE BUILDINGS (Sprites) --- */}

                    {/* Guild Castle */}
                    <div
                        className="absolute bottom-16 left-12 z-20 flex flex-col items-center cursor-pointer group/guild transition-transform hover:scale-110 active:scale-95 pointer-events-auto"
                        onClick={onVisitGuild}
                    >
                        <div className="text-6xl mb-[-10px] filter drop-shadow-lg relative animate-bounce-idle">
                            🏰
                            {/* Notification Badge */}
                            <div className="absolute -top-2 -right-2 text-xs animate-bounce">❗️</div>
                        </div>
                        <div className="bg-black/80 text-white text-[8px] px-2 py-1 border border-white mt-4 opacity-0 group-hover/guild:opacity-100 transition-opacity">
                            GUILD HALL
                        </div>
                    </div>

                    {/* Training Camp (Target) */}
                    <div
                        className="absolute bottom-24 left-1/2 -translate-x-12 z-15 flex flex-col items-center cursor-pointer group/camp transition-transform hover:scale-110 active:scale-95 pointer-events-auto"
                        onClick={onVisitTraining}
                    >
                        <div className="text-5xl mb-[-50px] filter drop-shadow-lg relative animate-bounce-idle" style={{ animationDelay: '0.5s' }}>
                            🎯
                        </div>
                        <div className="bg-black/80 text-orange-200 text-[8px] px-2 py-1 border border-orange-400 mt-2 opacity-0 group-hover/camp:opacity-100 transition-opacity whitespace-nowrap">
                            TRAINING CAMP
                        </div>
                    </div>

                    {/* Inn Cottage */}
                    <div
                        className="absolute bottom-14 right-16 z-20 flex flex-col items-center cursor-pointer group/inn transition-transform hover:scale-110 active:scale-95 pointer-events-auto"
                        onClick={onRest}
                    >
                        <div className="relative animate-bounce-idle" style={{ animationDelay: '1s' }}>
                            <div className="text-5xl filter drop-shadow-lg">🛖</div>
                            {/* Smoke particles */}
                            <div className="absolute -top-4 right-2 text-gray-300 text-[10px] animate-smoke">o</div>
                            <div className="absolute -top-6 right-1 text-gray-300 text-[10px] animate-smoke" style={{ animationDelay: '0.5s' }}>o</div>
                        </div>
                        <div className="bg-black/80 text-white text-[8px] px-2 py-1 border border-white mt-1 opacity-0 group-hover/inn:opacity-100 transition-opacity">
                            REST INN
                        </div>
                    </div>

                    {/* Overlay Text */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 text-center pointer-events-none z-40">
                        <h2 className="text-lg md:text-xl text-white font-bold mb-1 drop-shadow-[2px_2px_0_rgba(0,0,0,1)] uppercase tracking-wider">
                            Kracked Valley
                        </h2>
                        <p className="text-[10px] text-yellow-300 drop-shadow-[1px_1px_0_rgba(0,0,0,1)] bg-black/40 px-2 rounded">
                            Day 1 • Sunny
                        </p>
                    </div>
                </div>

                {/* Menu Controls (Bottom / Right Side) */}
                <div className="flex flex-col gap-4 justify-center">
                    {/* Character HUD */}
                    <CharacterHUD stats={stats} />

                    <RpgBox title="Town Directory">
                        <div className="flex flex-col gap-4">
                            <PixelButton onClick={onVisitGuild}>
                                <div className="flex items-center gap-4">
                                    <span className="text-2xl">🏰</span>
                                    <div className="text-left">
                                        <div className="text-yellow-300 text-sm">Adventurer's Guild</div>
                                        <div className="text-[10px] text-gray-300">Browse Job Board</div>
                                    </div>
                                </div>
                            </PixelButton>

                            <PixelButton onClick={onRest} variant="success">
                                <div className="flex items-center gap-4">
                                    <span className="text-2xl">🛖</span>
                                    <div className="text-left">
                                        <div className="text-yellow-300 text-sm">Traveler's Inn</div>
                                        <div className="text-[10px] text-gray-300">Inventory & Skills</div>
                                    </div>
                                </div>
                            </PixelButton>

                            <PixelButton onClick={onVisitTraining} variant="warning">
                                <div className="flex items-center gap-4">
                                    <span className="text-2xl">🎯</span>
                                    <div className="text-left">
                                        <div className="text-yellow-900 text-sm">Training Camp</div>
                                        <div className="text-[10px] text-yellow-800">Job Tips & Guides</div>
                                    </div>
                                </div>
                            </PixelButton>
                        </div>
                    </RpgBox>

                    <div className="bg-black/60 p-4 border-2 border-gray-600 text-[10px] text-green-400 font-mono shadow-inner leading-relaxed">
                        <span className="text-yellow-500">SYSTEM:</span> Welcome to Kracked Jobs.<br />
                        <span className="opacity-70">&gt; Clouds are moving west. Good omen for deployment.</span><br />
                        <span className="opacity-70">&gt; Guild Master is accepting new resumes.</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TownSquare;
