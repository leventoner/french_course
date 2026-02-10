import React, { useState } from 'react';
import { Search, History, TrendingUp, ChevronRight, Book, MessageSquare, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const recentSearches = ['Bonjour', 'Comment allez-vous', 'Teşekkürler', 'Aile'];
const trending = ['Past Perfect', 'Irregular Verbs', 'Paris Culture', 'Food'];

const SearchPage: React.FC = () => {
    const [query, setQuery] = useState('');

    return (
        <div className="max-w-4xl mx-auto space-y-10">
            <div className="relative group">
                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                    <Search size={24} />
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Kelime, kural veya ders ara..."
                    className="w-full bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-[2rem] py-6 pl-16 pr-8 text-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-gray-800/60 transition-all shadow-2xl overflow-hidden"
                />
                {/* Animated Background Glow */}
                <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full -z-10 group-focus-within:bg-blue-500/10 transition-colors" />
            </div>

            <AnimatePresence>
                {!query && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-10"
                    >
                        <section className="space-y-6">
                            <h2 className="text-sm font-black text-gray-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                <History size={16} />
                                Son Aramalar
                            </h2>
                            <div className="space-y-2">
                                {recentSearches.map((s, idx) => (
                                    <button
                                        key={idx}
                                        className="w-full flex items-center justify-between text-left p-4 rounded-2xl bg-gray-800/20 hover:bg-gray-800/40 border border-transparent hover:border-gray-700/50 transition-all group"
                                    >
                                        <span className="text-gray-300 font-medium">{s}</span>
                                        <ChevronRight size={18} className="text-gray-600 group-hover:text-blue-400 transition-colors" />
                                    </button>
                                ))}
                            </div>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-sm font-black text-gray-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                <TrendingUp size={16} />
                                Popüler Konular
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {trending.map((t, idx) => (
                                    <button
                                        key={idx}
                                        className="px-6 py-3 rounded-full bg-blue-500/5 border border-blue-500/20 text-blue-400 font-bold text-sm hover:bg-blue-500/10 hover:border-blue-500/40 transition-all"
                                    >
                                        #{t}
                                    </button>
                                ))}
                            </div>

                            <div className="mt-10 space-y-4">
                                <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 p-6 rounded-3xl">
                                    <div className="flex gap-4 items-start">
                                        <div className="p-3 bg-indigo-500 rounded-2xl shadow-lg shadow-indigo-500/20">
                                            <GraduationCap className="text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold mb-1">A1 Seviye Rehberi</h3>
                                            <p className="text-gray-400 text-sm">Nereden başlayacağınızı bilmiyor musunuz? Başlangıç rehberimizi inceleyin.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </motion.div>
                )}
            </AnimatePresence>

            {query && (
                <div className="text-center py-20 bg-gray-800/20 rounded-[3rem] border border-dashed border-gray-700">
                    <div className="text-6xl mb-6">🔍</div>
                    <h3 className="text-xl font-bold text-white mb-2">"{query}" için sonuç bulunamadı</h3>
                    <p className="text-gray-500">Farklı bir anahtar kelime denemeye ne dersiniz?</p>
                </div>
            )}
        </div>
    );
};

export default SearchPage;
