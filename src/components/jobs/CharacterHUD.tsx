import React from 'react';
import { CharacterStats } from '../../types/jobs';
import { User } from 'lucide-react';

interface Props {
    stats: CharacterStats;
}

const CharacterHUD: React.FC<Props> = ({ stats }) => {
    return (
        <div className="flex items-center gap-2 md:gap-3 bg-black/60 border-2 border-yellow-600 px-2 md:px-3 py-2 text-xs max-w-full overflow-hidden">
            {/* Avatar - Hidden on mobile */}
            <div className="hidden md:flex w-10 h-10 bg-gray-800 border border-white shrink-0 items-center justify-center">
                <User className="text-white w-5 h-5" />
            </div>

            {/* Compact Stats */}
            <div className="flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-1 md:gap-2 flex-wrap">
                    <span className="text-yellow-400 font-bold text-[10px] md:text-xs truncate">{stats.name}</span>
                    <span className="text-gray-400 text-[9px] md:text-[10px]">Lv{stats.level}</span>
                    <span className="text-blue-300 text-[8px] md:text-[10px] truncate">{stats.class}</span>
                </div>

                {/* HP/MP Bars - Inline */}
                <div className="flex items-center gap-1 md:gap-2 flex-wrap">
                    {/* HP */}
                    <div className="flex items-center gap-0.5 md:gap-1">
                        <span className="text-green-400 text-[8px] md:text-[10px]">HP</span>
                        <div className="w-10 md:w-16 h-1.5 md:h-2 bg-gray-700 border border-gray-600">
                            <div
                                className="h-full bg-green-500"
                                style={{ width: `${(stats.hp / stats.maxHp) * 100}%` }}
                            />
                        </div>
                        <span className="text-gray-300 text-[8px] md:text-[10px] hidden sm:inline">{stats.hp}/{stats.maxHp}</span>
                    </div>

                    {/* MP */}
                    <div className="flex items-center gap-0.5 md:gap-1">
                        <span className="text-blue-400 text-[8px] md:text-[10px]">MP</span>
                        <div className="w-10 md:w-16 h-1.5 md:h-2 bg-gray-700 border border-gray-600">
                            <div
                                className="h-full bg-blue-500"
                                style={{ width: `${(stats.mp / stats.maxMp) * 100}%` }}
                            />
                        </div>
                        <span className="text-gray-300 text-[8px] md:text-[10px] hidden sm:inline">{stats.mp}/{stats.maxMp}</span>
                    </div>

                    {/* Gold */}
                    <div className="flex items-center gap-0.5 md:gap-1">
                        <span className="text-yellow-400 text-[10px] md:text-sm">🪙</span>
                        <span className="text-yellow-400 font-bold text-[9px] md:text-xs">{stats.gold.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CharacterHUD;
