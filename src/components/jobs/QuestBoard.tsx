import React, {
    useState,
    useCallback,
    useMemo,
    useRef,
    useEffect,
} from 'react';
import { Quest, QuestDifficulty, JobType } from '../../types/jobs';
import { generateQuests } from '../../services/mockJobService';
import { RpgBox, PixelButton, LoadingSpinner } from './PixelComponents';

interface Props {
    onBack: () => void;
    onSelectQuest: (quest: Quest) => void;
}

// Pixel-art style arrow icons using blocky SVG rectangles
const PixelArrowUp: React.FC = () => (
    <svg
        viewBox="0 0 10 10"
        className="w-3 h-3 fill-current"
        aria-hidden="true"
    >
        <rect x="4" y="1" width="2" height="2" />
        <rect x="3" y="3" width="4" height="2" />
        <rect x="2" y="5" width="6" height="2" />
    </svg>
);

const PixelArrowDown: React.FC = () => (
    <svg
        viewBox="0 0 10 10"
        className="w-3 h-3 fill-current"
        aria-hidden="true"
    >
        <rect x="2" y="3" width="6" height="2" />
        <rect x="3" y="5" width="4" height="2" />
        <rect x="4" y="7" width="2" height="2" />
    </svg>
);

const QuestBoard: React.FC<Props> = ({ onBack, onSelectQuest }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [quests, setQuests] = useState<Quest[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Filter States
    const [filterType, setFilterType] = useState<JobType | 'ALL'>('ALL');
    const [filterLocation, setFilterLocation] = useState('');

    // Scroll container ref
    const listRef = useRef<HTMLDivElement | null>(null);

    const handleSearch = useCallback(
        async (e?: React.FormEvent) => {
            e?.preventDefault();

            setLoading(true);
            setError('');
            // Reset filters on new search
            setFilterType('ALL');
            setFilterLocation('');

            try {
                const results = await generateQuests(searchTerm);
                setQuests(results);
            } catch (err) {
                setError('The magic scroll failed to load. Try again.');
            } finally {
                setLoading(false);
            }
        },
        [searchTerm]
    );

    // Scroll helpers
    const scrollUp = useCallback(() => {
        if (listRef.current) {
            listRef.current.scrollBy({ top: -200, behavior: 'smooth' });
        }
    }, []);

    const scrollDown = useCallback(() => {
        if (listRef.current) {
            listRef.current.scrollBy({ top: 200, behavior: 'smooth' });
        }
    }, []);

    // Initial load
    useEffect(() => {
        if (quests.length === 0 && !loading) {
            handleSearch();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Keyboard support: W/S or ArrowUp/ArrowDown
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
                e.preventDefault();
                scrollUp();
            } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
                e.preventDefault();
                scrollDown();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [scrollUp, scrollDown]);

    // Filtering Logic
    const filteredQuests = useMemo(() => {
        return quests.filter((quest) => {
            const matchesType =
                filterType === 'ALL' || quest.jobType === filterType;
            const matchesLocation = quest.location
                .toLowerCase()
                .includes(filterLocation.toLowerCase());
            return matchesType && matchesLocation;
        });
    }, [quests, filterType, filterLocation]);

    const getDifficultyColor = (diff: QuestDifficulty) => {
        switch (diff) {
            case QuestDifficulty.LEGENDARY:
                return 'text-purple-400';
            case QuestDifficulty.EXPERT:
                return 'text-red-400';
            case QuestDifficulty.HARD:
                return 'text-orange-400';
            case QuestDifficulty.MEDIUM:
                return 'text-yellow-400';
            default:
                return 'text-green-400';
        }
    };

    const jobTypes = Object.values(JobType);

    return (
        <div className="h-full flex flex-col p-4 max-w-5xl mx-auto w-full">
            <div className="flex justify-between items-center mb-6">
                <PixelButton onClick={onBack} className="text-xs">
                    ⬅ Town
                </PixelButton>
                <h2 className="text-2xl text-yellow-400 text-shadow-lg underline decoration-4 underline-offset-4 decoration-red-900">
                    GUILD QUEST BOARD
                </h2>
                <div className="w-24"></div> {/* Spacer */}
            </div>

            <RpgBox className="flex-1 flex flex-col gap-4 overflow-hidden min-h-0">
                {/* Search Bar */}
                <form
                    onSubmit={handleSearch}
                    className="flex gap-2 border-b-2 border-white/20 pb-4"
                >
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search for a role..."
                        className="flex-1 bg-blue-900 border-2 border-blue-500 p-3 text-white placeholder-blue-300 outline-none focus:border-yellow-400 font-mono"
                    />
                    <PixelButton onClick={() => handleSearch()} disabled={loading}>
                        {loading ? 'Cast...' : 'Scry'}
                    </PixelButton>
                </form>

                {/* Filters Panel */}
                <div className="flex flex-col gap-3 p-3 bg-blue-900/40 border border-blue-700/50 text-xs font-mono">
                    {/* Job Type Filter (Class) */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 retro-scrollbar">
                        <span className="text-blue-300 uppercase font-bold whitespace-nowrap">
                            Class:
                        </span>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => setFilterType('ALL')}
                                className={`px-3 py-1 border whitespace-nowrap transition-all ${filterType === 'ALL'
                                    ? 'bg-yellow-500 text-black border-white font-bold'
                                    : 'bg-black/50 text-gray-400 border-gray-600 hover:border-gray-400'
                                    }`}
                            >
                                ALL
                            </button>
                            {jobTypes.map((type) => (
                                <button
                                    type="button"
                                    key={type}
                                    onClick={() => setFilterType(type)}
                                    className={`px-3 py-1 border whitespace-nowrap transition-all ${filterType === type
                                        ? 'bg-gray-800 border-white text-white font-bold shadow-inner'
                                        : 'bg-black/50 text-gray-500 border-gray-600 hover:border-gray-400'
                                        }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="h-px w-full bg-blue-700/50"></div>

                    {/* Location Filter */}
                    <div className="flex items-center gap-2">
                        <span className="text-blue-300 uppercase font-bold whitespace-nowrap">
                            Region:
                        </span>
                        <div className="relative flex-1">
                            <input
                                type="text"
                                value={filterLocation}
                                onChange={(e) =>
                                    setFilterLocation(e.target.value)
                                }
                                placeholder="Filter by location..."
                                className="w-full bg-black/50 border border-gray-600 text-white px-2 py-1 outline-none focus:border-yellow-400 placeholder-gray-600"
                            />
                            {filterLocation && (
                                <button
                                    type="button"
                                    onClick={() => setFilterLocation('')}
                                    className="absolute right-1 top-1/2 -translate-y-1/2 text-red-500 hover:text-white px-1"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Scroll buttons row (always visible) */}
                <div className="flex justify-end gap-2 items-center text-[10px]">
                    <PixelButton
                        onClick={scrollUp}
                        className="flex items-center gap-1 px-3 py-1"
                    >
                        <PixelArrowUp />
                        <span>Scroll Up (W / ↑)</span>
                    </PixelButton>
                    <PixelButton
                        onClick={scrollDown}
                        className="flex items-center gap-1 px-3 py-1"
                    >
                        <PixelArrowDown />
                        <span>Scroll Down (S / ↓)</span>
                    </PixelButton>
                </div>

                {/* Quest List – explicit maxHeight so it *must* overflow */}
                <div
                    ref={listRef}
                    className="retro-scrollbar pr-2 space-y-4 pt-2 pb-16 overflow-y-auto"
                    style={{ maxHeight: '60vh' }}
                >
                    {loading && <LoadingSpinner />}

                    {!loading && error && (
                        <div className="text-red-400 text-center p-4 border-2 border-red-800 bg-red-900/20">
                            {error}
                        </div>
                    )}

                    {!loading &&
                        filteredQuests.length === 0 &&
                        !error && (
                            <div className="text-center text-gray-400 py-10 flex flex-col items-center gap-2">
                                <div className="text-4xl opacity-50">🕸️</div>
                                <div>
                                    No quests found matching your criteria...
                                </div>
                                <div className="text-xs text-blue-400">
                                    Try clearing your filters or casting a new
                                    Scry.
                                </div>
                            </div>
                        )}

                    {!loading &&
                        filteredQuests.map((quest) => (
                            <div
                                key={quest.id}
                                onClick={() => onSelectQuest(quest)}
                                className="group relative bg-blue-900/50 border-2 border-blue-400 p-4 hover:bg-blue-800 hover:border-yellow-400 cursor-pointer transition-all active:translate-y-1"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-yellow-300 text-lg mb-1 group-hover:text-white">
                                            {quest.title}
                                        </h3>
                                        <div className="text-xs text-gray-300 font-mono flex items-center gap-2">
                                            <span className="bg-blue-950 px-1 border border-blue-700 text-blue-200">
                                                {quest.jobType}
                                            </span>
                                            <span>{quest.realTitle}</span>
                                        </div>
                                    </div>
                                    <div
                                        className={`text-sm font-bold ${getDifficultyColor(
                                            quest.difficulty
                                        )}`}
                                    >
                                        [{quest.difficulty}]
                                    </div>
                                </div>

                                <div className="flex justify-between items-end text-xs text-gray-200 mt-2">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-blue-200">
                                            📍 {quest.location}
                                        </span>
                                        <span className="text-green-300">
                                            💰 {quest.reward}
                                        </span>
                                    </div>
                                    <div className="text-purple-300">
                                        +{quest.xp} XP
                                    </div>
                                </div>

                                {/* Hover indicator */}
                                <div className="absolute right-2 bottom-2 opacity-0 group-hover:opacity-100 text-yellow-400 animate-bounce">
                                    ⬇ SELECT
                                </div>
                            </div>
                        ))}
                </div>
            </RpgBox>
        </div>
    );
};

export default QuestBoard;
