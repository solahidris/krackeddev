import React, { useState } from 'react';
import { RpgBox, PixelButton, LoadingSpinner } from './PixelComponents';
import { generateTrainingTip } from '../../services/mockJobService';
import { Scroll, ExternalLink, Target, RefreshCw } from 'lucide-react';

interface Props {
    onBack: () => void;
}

const TrainingCamp: React.FC<Props> = ({ onBack }) => {
    const [tip, setTip] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const getTip = async () => {
        setLoading(true);
        try {
            const result = await generateTrainingTip();
            setTip(result);
        } catch (e) {
            setTip("The Drill Sergeant is on a coffee break. Try again later.");
        } finally {
            setLoading(false);
        }
    };

    const links = [
        {
            title: "The Indeed Chronicles",
            desc: "A vast archive of knowledge on how to hunt for quests.",
            url: "https://www.indeed.com/career-advice/finding-a-job/job-hunting"
        },
        {
            title: "The Maukerja Manuscripts",
            desc: "Ancient wisdom for career advancement in distant lands.",
            url: "https://www.maukerja.my/career-advice"
        }
    ];

    return (
        <div className="h-full flex flex-col p-4 max-w-5xl mx-auto w-full">
            <div className="flex justify-between items-center mb-6">
                <PixelButton onClick={onBack} className="text-xs">
                    ⬅ Leave Camp
                </PixelButton>
                <div className="text-center">
                    <h2 className="text-2xl text-orange-500 text-shadow-lg underline decoration-4 decoration-black">
                        TRAINING CAMP
                    </h2>
                    <div className="text-xs text-orange-300">Sharpen Your Skills</div>
                </div>
                <div className="w-24"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full overflow-y-auto retro-scrollbar">

                {/* Left Column: Drill Sergeant */}
                <div className="flex flex-col gap-6">
                    <RpgBox title="Drill Instructor" className="bg-orange-900 border-orange-500">
                        <div className="flex flex-col items-center text-center p-4">
                            <div className="text-6xl mb-4 animate-bounce-idle">🥋</div>
                            <p className="text-orange-200 mb-6 text-sm leading-relaxed min-h-[100px] flex items-center justify-center">
                                {loading ? <LoadingSpinner /> : (tip ? `"${tip}"` : "Recruit! Do you want to survive the job market? Ask for a combat tactic!")}
                            </p>
                            <PixelButton onClick={getTip} disabled={loading} variant="warning">
                                <div className="flex items-center gap-2">
                                    {loading ? <RefreshCw className="animate-spin" size={16} /> : <Target size={16} />}
                                    {tip ? "Next Tactic" : "Get Advice"}
                                </div>
                            </PixelButton>
                        </div>
                    </RpgBox>

                    <div className="bg-black/40 p-4 border-2 border-orange-800 text-orange-200 text-xs font-mono">
                        <h4 className="text-orange-400 mb-2 uppercase border-b border-orange-800 pb-1">Camp News</h4>
                        <p>• The Job Market Boss has increased HP this season.</p>
                        <p>• Networking Buffs are currently 2x effective.</p>
                        <p>• Don't forget to repair your Resume durability.</p>
                    </div>
                </div>

                {/* Right Column: Library */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-orange-400 text-lg uppercase tracking-wider mb-2 flex items-center gap-2">
                        <Scroll size={20} /> The Library
                    </h3>
                    {links.map((link, idx) => (
                        <a
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block group"
                        >
                            <div className="bg-orange-950/50 border-2 border-orange-700 p-4 hover:bg-orange-900 hover:border-yellow-400 transition-all active:translate-y-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="text-yellow-400 text-sm font-bold mb-1 group-hover:underline">{link.title}</h4>
                                        <p className="text-orange-200 text-xs">{link.desc}</p>
                                    </div>
                                    <ExternalLink size={16} className="text-orange-500 group-hover:text-white" />
                                </div>
                            </div>
                        </a>
                    ))}

                    <div className="mt-auto p-4 border-2 border-dashed border-orange-800 text-center opacity-60">
                        <div className="text-4xl mb-2">🛡️</div>
                        <div className="text-xs text-orange-300">More scrolls being transcribed...</div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TrainingCamp;
