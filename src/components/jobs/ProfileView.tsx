import React, { useState } from 'react';
import { UserProfile, CharacterStats, Experience, Education, Honor } from '../../types/jobs';
import { RpgBox, PixelButton } from './PixelComponents';
import { Save, Plus, Trash2, Upload, Book, Award, Briefcase, Zap, Moon, Scroll, Medal } from 'lucide-react';

interface Props {
    profile: UserProfile;
    stats: CharacterStats;
    onUpdateProfile: (p: UserProfile) => void;
    onBack: () => void;
    onSleep: () => void;
}

type Tab = 'CHRONICLE' | 'QUEST_LOG' | 'SPELLBOOK' | 'WISDOM';

const ProfileView: React.FC<Props> = ({ profile, stats, onUpdateProfile, onBack, onSleep }) => {
    const [activeTab, setActiveTab] = useState<Tab>('CHRONICLE');
    const [tempSkill, setTempSkill] = useState('');

    // --- Experience Handlers ---
    const addExperience = () => {
        const newExp: Experience = {
            id: Date.now().toString(),
            role: 'New Role',
            company: 'Unknown Guild',
            period: '202X - Present'
        };
        onUpdateProfile({ ...profile, experiences: [...profile.experiences, newExp] });
    };

    const updateExperience = (id: string, field: keyof Experience, value: string) => {
        const updated = profile.experiences.map(e => e.id === id ? { ...e, [field]: value } : e);
        onUpdateProfile({ ...profile, experiences: updated });
    };

    const removeExperience = (id: string) => {
        onUpdateProfile({ ...profile, experiences: profile.experiences.filter(e => e.id !== id) });
    };

    // --- Education Handlers ---
    const addEducation = () => {
        const newEdu: Education = {
            id: Date.now().toString(),
            degree: 'Mastery of Code',
            school: 'Grand Academy',
            year: '202X'
        };
        onUpdateProfile({ ...profile, education: [...profile.education, newEdu] });
    };

    const updateEducation = (id: string, field: keyof Education, value: string) => {
        const updated = profile.education.map(e => e.id === id ? { ...e, [field]: value } : e);
        onUpdateProfile({ ...profile, education: updated });
    };

    const removeEducation = (id: string) => {
        onUpdateProfile({ ...profile, education: profile.education.filter(e => e.id !== id) });
    };

    // --- Honor Handlers ---
    const addHonor = () => {
        const newHonor: Honor = {
            id: Date.now().toString(),
            title: 'Order of Merit',
            issuer: 'Royal Court',
            date: '202X'
        };
        onUpdateProfile({ ...profile, honors: [...profile.honors, newHonor] });
    };

    const updateHonor = (id: string, field: keyof Honor, value: string) => {
        const updated = profile.honors.map(h => h.id === id ? { ...h, [field]: value } : h);
        onUpdateProfile({ ...profile, honors: updated });
    };

    const removeHonor = (id: string) => {
        onUpdateProfile({ ...profile, honors: profile.honors.filter(h => h.id !== id) });
    };


    // --- Skill Handlers ---
    const addSkill = () => {
        if (tempSkill.trim()) {
            onUpdateProfile({ ...profile, skills: [...profile.skills, tempSkill.trim()] });
            setTempSkill('');
        }
    };

    const removeSkill = (s: string) => {
        onUpdateProfile({ ...profile, skills: profile.skills.filter(skill => skill !== s) });
    };

    // --- Resume Handler ---
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onUpdateProfile({ ...profile, resumeName: e.target.files[0].name });
        }
    };

    return (
        <div className="h-full flex flex-col p-4 max-w-5xl mx-auto w-full">
            <div className="flex justify-between items-center mb-6">
                <PixelButton onClick={onBack} className="text-xs">
                    ⬅ Leave Inn
                </PixelButton>
                <div className="text-center">
                    <h2 className="text-2xl text-yellow-400 text-shadow-lg">THE TRAVELER'S INN</h2>
                    <div className="text-xs text-blue-300">Manage your Equipment & Rest</div>
                </div>
                <PixelButton onClick={onSleep} variant="success" className="text-xs">
                    <div className="flex items-center gap-2">
                        <Moon size={14} />
                        <span>Sleep (Heal)</span>
                    </div>
                </PixelButton>
            </div>

            <div className="flex-1 flex gap-4 overflow-hidden">
                {/* Sidebar Tabs */}
                <div className="w-48 flex flex-col gap-2">
                    {[
                        { id: 'CHRONICLE', icon: <Upload size={16} />, label: 'Scrolls' },
                        { id: 'QUEST_LOG', icon: <Briefcase size={16} />, label: 'Quest Log' },
                        { id: 'SPELLBOOK', icon: <Zap size={16} />, label: 'Spellbook' },
                        { id: 'WISDOM', icon: <Book size={16} />, label: 'Wisdom' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as Tab)}
                            className={`
                        p-4 text-left font-bold text-xs uppercase tracking-wider border-2 transition-all
                        flex items-center gap-3
                        ${activeTab === tab.id
                                    ? 'bg-blue-600 border-white text-white translate-x-2 shadow-lg'
                                    : 'bg-gray-800 border-gray-600 text-gray-400 hover:bg-gray-700 hover:text-white hover:translate-x-1'}
                    `}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}

                    <div className="mt-auto p-4 bg-black/40 border-2 border-gray-700 text-xs text-gray-400 font-mono">
                        LVL {stats.level} {stats.class}<br />
                        HP: {stats.hp}/{stats.maxHp}<br />
                        MP: {stats.mp}/{stats.maxMp}
                    </div>
                </div>

                {/* Content Area */}
                <RpgBox className="flex-1 overflow-y-auto retro-scrollbar bg-blue-900/80">
                    {/* The 'key' prop here forces React to remount the div, triggering the CSS animation */}
                    <div key={activeTab} className="h-full animate-retro-wipe">

                        {/* --- RESUME TAB --- */}
                        {activeTab === 'CHRONICLE' && (
                            <div className="space-y-6">
                                <h3 className="text-xl text-yellow-300 border-b-2 border-white/20 pb-2 mb-4">Hero's Scroll (Resume)</h3>

                                <div className="p-8 border-2 border-dashed border-blue-400 bg-blue-900/50 text-center rounded">
                                    <div className="mb-4 text-4xl">📜</div>
                                    <p className="text-sm text-blue-200 mb-4">
                                        {profile.resumeName
                                            ? `Equipped: ${profile.resumeName}`
                                            : "No scroll equipped. Upload your resume to boost charisma."}
                                    </p>
                                    <label className="cursor-pointer inline-block">
                                        <input type="file" className="hidden" onChange={handleFileUpload} accept=".pdf,.doc,.docx" />
                                        <div className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 border-2 border-white text-white text-xs font-bold uppercase shadow-lg active:translate-y-1 transition-transform">
                                            {profile.resumeName ? "Replace Scroll" : "Equip Scroll"}
                                        </div>
                                    </label>
                                </div>

                                <div className="space-y-2">
                                    <h4 className="text-sm text-green-300">Current Stats Summary</h4>
                                    <ul className="text-xs text-gray-300 space-y-1 font-mono">
                                        <li>• Experiences Logged: {profile.experiences.length}</li>
                                        <li>• Spells Memorized: {profile.skills.length}</li>
                                        <li>• Wisdom Acquired: {profile.education.length}</li>
                                    </ul>
                                </div>
                            </div>
                        )}

                        {/* --- EXPERIENCE TAB --- */}
                        {activeTab === 'QUEST_LOG' && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center border-b-2 border-white/20 pb-2 mb-4">
                                    <h3 className="text-xl text-yellow-300">Past Campaigns (Experience)</h3>
                                    <button onClick={addExperience} className="text-green-400 hover:text-green-300 text-xs font-bold flex items-center gap-1 transition-transform active:scale-95">
                                        <Plus size={14} /> ADD LOG
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {profile.experiences.map((exp) => (
                                        <div key={exp.id} className="bg-black/30 p-4 border border-blue-500 relative group transition-all hover:bg-black/50 hover:border-yellow-400">
                                            <button
                                                onClick={() => removeExperience(exp.id)}
                                                className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-400 hover:scale-110"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                            <div className="grid grid-cols-2 gap-4 mb-2">
                                                <div>
                                                    <label className="text-[10px] text-blue-300 uppercase block">Class (Role)</label>
                                                    <input
                                                        value={exp.role}
                                                        onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                                                        className="w-full bg-transparent border-b border-gray-500 text-white text-sm focus:border-yellow-400 outline-none transition-colors"
                                                        placeholder="e.g. Knight Captain"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-[10px] text-blue-300 uppercase block">Faction (Company)</label>
                                                    <input
                                                        value={exp.company}
                                                        onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                                                        className="w-full bg-transparent border-b border-gray-500 text-white text-sm focus:border-yellow-400 outline-none transition-colors"
                                                        placeholder="e.g. Google Empire"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-[10px] text-blue-300 uppercase block">Era (Dates)</label>
                                                <input
                                                    value={exp.period}
                                                    onChange={(e) => updateExperience(exp.id, 'period', e.target.value)}
                                                    className="w-full bg-transparent border-b border-gray-500 text-gray-400 text-xs focus:border-yellow-400 outline-none font-mono transition-colors"
                                                    placeholder="e.g. 2020-2023"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    {profile.experiences.length === 0 && (
                                        <div className="text-center text-gray-500 text-xs italic py-8">No adventures recorded yet.</div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* --- SKILLS TAB --- */}
                        {activeTab === 'SPELLBOOK' && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center border-b-2 border-white/20 pb-2 mb-4">
                                    <h3 className="text-xl text-yellow-300 flex items-center gap-2">
                                        <Zap size={20} className="text-yellow-400" />
                                        Grimoire of Spells
                                    </h3>
                                    <span className="text-xs text-blue-300">{profile.skills.length} / 20 Slots</span>
                                </div>

                                {/* Input Area */}
                                <div className="bg-black/40 p-4 border-2 border-blue-800 flex gap-3 items-center relative group focus-within:border-yellow-400 transition-colors">
                                    <div className="text-blue-500 animate-pulse">✨</div>
                                    <input
                                        value={tempSkill}
                                        onChange={(e) => setTempSkill(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                                        placeholder="Incant a new skill name (e.g. React.js)..."
                                        className="flex-1 bg-transparent border-none text-white placeholder-gray-500 outline-none font-mono"
                                    />
                                    <button
                                        onClick={addSkill}
                                        disabled={!tempSkill.trim()}
                                        className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold px-4 py-2 border-2 border-blue-400 hover:border-white active:translate-y-1 transition-all"
                                    >
                                        SCRIBE
                                    </button>
                                </div>

                                {/* Skill Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {profile.skills.map((skill, idx) => (
                                        <div
                                            key={idx}
                                            className="
                                        relative group
                                        bg-gradient-to-r from-blue-900 to-blue-800 
                                        border-2 border-blue-500 hover:border-yellow-400
                                        p-3 flex items-center justify-between
                                        shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]
                                        active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                                        transition-all duration-200
                                        animate-retro-wipe
                                    "
                                            style={{ animationDelay: `${idx * 0.05}s` }}
                                        >
                                            <div className="flex items-center gap-2 overflow-hidden">
                                                <div className="w-2 h-2 bg-cyan-400 rotate-45 shrink-0"></div>
                                                <span className="text-cyan-100 text-sm font-bold truncate text-shadow-sm">{skill}</span>
                                            </div>

                                            <button
                                                onClick={() => removeSkill(skill)}
                                                className="
                                            ml-2 text-blue-400 hover:text-red-400 
                                            opacity-60 group-hover:opacity-100
                                            transition-colors p-1
                                        "
                                                aria-label={`Remove ${skill}`}
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    ))}
                                    {profile.skills.length === 0 && (
                                        <div className="col-span-full py-12 text-center border-2 border-dashed border-blue-900/50 rounded">
                                            <div className="text-4xl mb-4 opacity-50">📖</div>
                                            <p className="text-gray-500 text-sm">Your grimoire is blank.</p>
                                            <p className="text-gray-600 text-xs mt-1">Scribe spells to increase your power.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* --- EDUCATION & HONORS TAB --- */}
                        {activeTab === 'WISDOM' && (
                            <div className="space-y-8">

                                {/* Education Section */}
                                <div>
                                    <div className="flex justify-between items-center border-b-2 border-white/20 pb-2 mb-4">
                                        <h3 className="text-xl text-yellow-300 flex items-center gap-2"><Scroll size={20} /> Academia</h3>
                                        <button onClick={addEducation} className="text-green-400 hover:text-green-300 text-xs font-bold flex items-center gap-1 transition-transform active:scale-95">
                                            <Plus size={14} /> SCRIBE NEW SCROLL
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        {profile.education.map((edu) => (
                                            <div key={edu.id} className="bg-black/30 p-4 border border-purple-500 relative group transition-all hover:bg-black/50 hover:border-purple-300">
                                                <button
                                                    onClick={() => removeEducation(edu.id)}
                                                    className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-400 hover:scale-110"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                                <div className="grid grid-cols-2 gap-4 mb-2">
                                                    <div>
                                                        <label className="text-[10px] text-purple-300 uppercase block">Scroll (Degree)</label>
                                                        <input
                                                            value={edu.degree}
                                                            onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                                                            className="w-full bg-transparent border-b border-gray-500 text-white text-sm focus:border-purple-400 outline-none transition-colors"
                                                            placeholder="e.g. BS Comp Sci"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-[10px] text-purple-300 uppercase block">Tower (School)</label>
                                                        <input
                                                            value={edu.school}
                                                            onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                                                            className="w-full bg-transparent border-b border-gray-500 text-white text-sm focus:border-purple-400 outline-none transition-colors"
                                                            placeholder="e.g. Stanford Keep"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="text-[10px] text-purple-300 uppercase block">Era (Year)</label>
                                                    <input
                                                        value={edu.year}
                                                        onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                                                        className="w-full bg-transparent border-b border-gray-500 text-gray-400 text-xs focus:border-purple-400 outline-none font-mono transition-colors"
                                                        placeholder="e.g. 2018"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                        {profile.education.length === 0 && (
                                            <div className="text-center text-gray-500 text-xs italic">No scrolls found in the library.</div>
                                        )}
                                    </div>
                                </div>

                                {/* Honors Section */}
                                <div>
                                    <div className="flex justify-between items-center border-b-2 border-white/20 pb-2 mb-4">
                                        <h3 className="text-xl text-yellow-300 flex items-center gap-2"><Medal size={20} /> Achievements (Honors)</h3>
                                        <button onClick={addHonor} className="text-orange-400 hover:text-orange-300 text-xs font-bold flex items-center gap-1 transition-transform active:scale-95">
                                            <Plus size={14} /> FORGE NEW MEDAL
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        {profile.honors.map((honor) => (
                                            <div key={honor.id} className="bg-black/30 p-4 border border-orange-500 relative group transition-all hover:bg-black/50 hover:border-orange-300">
                                                <button
                                                    onClick={() => removeHonor(honor.id)}
                                                    className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-400 hover:scale-110"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                                <div className="grid grid-cols-2 gap-4 mb-2">
                                                    <div>
                                                        <label className="text-[10px] text-orange-300 uppercase block">Award (Title)</label>
                                                        <input
                                                            value={honor.title}
                                                            onChange={(e) => updateHonor(honor.id, 'title', e.target.value)}
                                                            className="w-full bg-transparent border-b border-gray-500 text-white text-sm focus:border-orange-400 outline-none transition-colors"
                                                            placeholder="e.g. Employee of Month"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-[10px] text-orange-300 uppercase block">Patron (Issuer)</label>
                                                        <input
                                                            value={honor.issuer}
                                                            onChange={(e) => updateHonor(honor.id, 'issuer', e.target.value)}
                                                            className="w-full bg-transparent border-b border-gray-500 text-white text-sm focus:border-orange-400 outline-none transition-colors"
                                                            placeholder="e.g. Tech Corp"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="text-[10px] text-orange-300 uppercase block">Date</label>
                                                    <input
                                                        value={honor.date}
                                                        onChange={(e) => updateHonor(honor.id, 'date', e.target.value)}
                                                        className="w-full bg-transparent border-b border-gray-500 text-gray-400 text-xs focus:border-orange-400 outline-none font-mono transition-colors"
                                                        placeholder="e.g. Dec 2023"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                        {profile.honors.length === 0 && (
                                            <div className="text-center text-gray-500 text-xs italic">No medals displayed.</div>
                                        )}
                                    </div>
                                </div>

                            </div>
                        )}

                    </div>
                </RpgBox>
            </div>
        </div>
    );
};

export default ProfileView;
