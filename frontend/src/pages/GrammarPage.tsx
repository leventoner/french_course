import React, { useEffect, useState } from 'react';
import { useLevelStore } from '../stores/levelStore';
import { useGrammarStore } from '../stores/grammarStore';
import { motion } from 'framer-motion';
import { FileText, ChevronRight, Info, Lightbulb } from 'lucide-react';

const GrammarPage: React.FC = () => {
    const { levels, fetchLevels } = useLevelStore();
    const { rules, fetchRules, loading } = useGrammarStore();
    const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

    useEffect(() => {
        fetchLevels();
    }, [fetchLevels]);

    useEffect(() => {
        fetchRules(selectedLevel || undefined);
    }, [selectedLevel, fetchRules]);

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-white mb-2">Dilbilgisi Kuralları</h1>
                <p className="text-gray-400">Fransızca dilbilgisini mantığıyla kavra.</p>
            </header>

            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                <button
                    onClick={() => setSelectedLevel(null)}
                    className={`whitespace-nowrap px-8 py-3 rounded-2xl text-sm font-black uppercase tracking-widest transition-all ${!selectedLevel ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'bg-gray-800/50 text-gray-500 hover:bg-gray-800'}`}
                >
                    Tüm Seviyeler
                </button>
                {levels.map(l => (
                    <button
                        key={l.id}
                        onClick={() => setSelectedLevel(l.id)}
                        className={`whitespace-nowrap px-8 py-3 rounded-2xl text-sm font-black uppercase tracking-widest transition-all ${selectedLevel === l.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'bg-gray-800/50 text-gray-500 hover:bg-gray-800'}`}
                    >
                        {l.title_tr}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-8">
                {rules.map((rule, idx) => (
                    <motion.div
                        key={rule.id}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-gray-800/20 backdrop-blur-2xl border border-gray-700/50 rounded-[2.5rem] overflow-hidden shadow-2xl"
                    >
                        <div className="p-8 md:p-12 flex flex-col lg:flex-row gap-12">
                            <div className="flex-1 space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-4 bg-purple-500/10 rounded-2xl text-purple-400 shadow-xl shadow-purple-900/10">
                                        <FileText size={28} />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-black text-white italic tracking-tighter">{rule.title_fr}</h2>
                                        <p className="text-purple-400 font-bold uppercase tracking-widest text-xs mt-1">{rule.title_tr}</p>
                                    </div>
                                </div>

                                <div className="bg-gray-900/40 p-6 rounded-3xl border border-white/5">
                                    <p className="text-gray-400 leading-relaxed font-medium">
                                        {rule.explanation_tr}
                                    </p>
                                </div>

                                {rule.formula && (
                                    <div className="bg-blue-500/5 border border-blue-500/20 p-6 rounded-3xl">
                                        <div className="flex items-center gap-2 text-[10px] font-black text-blue-500/80 uppercase tracking-[0.2em] mb-3">
                                            <ChevronRight size={14} className="text-blue-500" />
                                            Kullanım Yapısı
                                        </div>
                                        <code className="text-blue-400 font-mono text-lg font-bold">{rule.formula}</code>
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 space-y-6">
                                <div className="flex items-center gap-2 text-sm font-black text-white uppercase tracking-widest mb-2 px-2">
                                    <Lightbulb size={20} className="text-yellow-500" />
                                    Örnek Cümleler
                                </div>
                                <div className="space-y-4">
                                    {rule.examples_json && Array.isArray(rule.examples_json) && rule.examples_json.map((ex: any, i: number) => (
                                        <div key={i} className="bg-gray-900/60 p-6 rounded-3xl border border-transparent hover:border-gray-700 transition-all group">
                                            <p className="text-white font-bold text-lg mb-2 group-hover:text-blue-400 transition-colors uppercase tracking-tight">{ex.fr}</p>
                                            <p className="text-sm text-gray-500 font-medium">{ex.tr}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-900/50 border-t border-white/5 px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-3 text-xs text-gray-500 font-medium italic">
                                <Info size={16} className="text-blue-500/50" />
                                <span>Bu kuralı pekiştirmek için ilgili derslere göz atabilirsin.</span>
                            </div>
                            <button className="bg-white/5 hover:bg-white/10 text-white px-6 py-2 rounded-xl text-sm font-black uppercase tracking-widest transition-all flex items-center gap-2 border border-white/5">
                                Uygulamaya Git
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {loading && (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 shadow-lg shadow-purple-500/20"></div>
                </div>
            )}
        </div>
    );
};

export default GrammarPage;
