import React from 'react';
import { Quest } from '../../types/jobs';
import { RpgBox, PixelButton } from './PixelComponents';

interface Props {
    quest: Quest;
    onBack: () => void;
    onAccept: () => void;
}

const QuestDetail: React.FC<Props> = ({ quest, onBack, onAccept }) => {
    return (
        <div className="h-full flex flex-col items-center justify-center p-4">
            <RpgBox className="max-w-3xl w-full flex flex-col gap-6 animate-in zoom-in duration-300">
                {/* Header */}
                <div className="border-b-2 border-white/20 pb-4 text-center">
                    <div className="text-xs text-gray-400 uppercase tracking-widest mb-2">Wanted by {quest.company}</div>
                    <h2 className="text-2xl md:text-3xl text-yellow-400 mb-2 leading-relaxed">{quest.title}</h2>
                    <div className="text-green-400 bg-green-900/30 inline-block px-4 py-1 border border-green-600 rounded">
                        Reward: {quest.reward}
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-6 text-sm md:text-base leading-loose text-gray-100">
                    <div>
                        <h4 className="text-blue-300 mb-2 uppercase text-xs">Quest Briefing</h4>
                        <p className="font-mono text-gray-300">{quest.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h4 className="text-blue-300 mb-2 uppercase text-xs">Required Abilities</h4>
                            <ul className="list-none space-y-2">
                                {quest.requirements.map((req, idx) => (
                                    <li key={idx} className="flex items-center gap-2">
                                        <span className="text-yellow-500">⚡</span>
                                        <span>{req}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-blue-300 mb-2 uppercase text-xs">Quest Details</h4>
                            <div className="space-y-2 text-xs font-mono">
                                <div className="flex justify-between border-b border-gray-700 pb-1">
                                    <span>Class:</span> <span className="text-white">{quest.realTitle}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-700 pb-1">
                                    <span>Difficulty:</span> <span className="text-red-300">{quest.difficulty}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-700 pb-1">
                                    <span>Location:</span> <span className="text-blue-200">{quest.location}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 justify-center mt-4 pt-4 border-t-2 border-white/20">
                    <PixelButton onClick={onBack} variant="danger">Decline</PixelButton>
                    <PixelButton onClick={onAccept} variant="success">Accept Quest</PixelButton>
                </div>
            </RpgBox>
        </div>
    );
};

export default QuestDetail;
