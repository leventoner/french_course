import React, { useEffect, useState } from 'react';
import { useLevelStore } from '../stores/levelStore';
import { useWordStore } from '../stores/wordStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Search, Filter, Book, Heart } from 'lucide-react';

const WordsPage: React.FC = () => {
    const { levels, fetchLevels } = useLevelStore();
    const { words, fetchWords, loading } = useWordStore();
    const [search, setSearch] = useState('');
    const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

    useEffect(() => {
        fetchLevels();
    }, [fetchLevels]);

    useEffect(() => {
        fetchWords(selectedLevel || undefined, undefined, search || undefined);
    }, [selectedLevel, search, fetchWords]);

    const playAudio = (url: string) => {
        const audio = new Audio(url);
        audio.play();
    };

    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Kelime Hazinesi</h1>
                    <p className="text-gray-400">Yeni kelimeler öğren ve telaffuzlarını dinle.</p>
                </div>
            </header>

            <div className="flex flex-col md:flex-row gap-4 items-center bg-gray-800/30 p-4 rounded-2xl border border-gray-700/50">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                    <input
                        type="text"
                        placeholder="Kelime ara..."
                        className="w-full bg-gray-900/50 border border-gray-700/50 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
                    <button
                        onClick={() => setSelectedLevel(null)}
                        className={`px-6 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${!selectedLevel ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                    >
                        Tümü
                    </button>
                    {levels.map(l => (
                        <button
                            key={l.id}
                            onClick={() => setSelectedLevel(l.id)}
                            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${selectedLevel === l.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                        >
                            {l.title_fr}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence>
                    {words.map((word, index) => (
                        <motion.div
                            key={word.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-gray-800/40 backdrop-blur-md border border-gray-700/50 p-6 rounded-3xl group hover:border-blue-500/30 transition-all shadow-xl"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-[10px] font-black text-blue-400 bg-blue-500/10 px-3 py-1 rounded-lg uppercase tracking-widest">
                                    {word.word_type}
                                </span>
                                <button className="text-gray-600 hover:text-red-500 transition-colors">
                                    <Heart size={20} />
                                </button>
                            </div>

                            <h3 className="text-2xl font-black text-white mb-1 group-hover:text-blue-400 transition-colors tracking-tight">
                                {word.french}
                            </h3>
                            <p className="text-sm text-gray-500 font-mono italic mb-4">{word.phonetic_ipa}</p>

                            <div className="h-px bg-gray-700/30 w-full mb-4" />

                            <p className="text-gray-300 font-bold text-lg mb-6">{word.turkish}</p>

                            <button
                                onClick={() => playAudio(word.audio_url)}
                                className="w-full flex items-center justify-center gap-3 bg-gray-900/50 hover:bg-blue-600 py-3 rounded-2xl text-gray-400 hover:text-white transition-all border border-gray-700/50 hover:border-blue-500 shadow-lg group-hover:shadow-blue-900/20"
                            >
                                <Volume2 size={20} />
                                <span className="text-sm font-black uppercase tracking-widest">Telaffuz</span>
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {!loading && words.length === 0 && (
                <div className="text-center py-20 bg-gray-800/20 rounded-[3rem] border border-dashed border-gray-700">
                    <p className="text-gray-500 font-bold">Kelime bulunamadı.</p>
                </div>
            )}

            {loading && (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 shadow-lg shadow-blue-500/20"></div>
                </div>
            )}
        </div>
    );
};

export default WordsPage;
