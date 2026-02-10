import React, { useEffect, useState } from 'react';
import { useAdminStore } from '../../stores/adminStore';
import { Plus, Search, Trash2, Edit2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminWordsPage = () => {
    const { words, fetchWords, loading, addWord } = useAdminStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newWord, setNewWord] = useState({
        french: '',
        turkish: '',
        word_type: 'noun',
        category_id: 1,
        level_id: 1
    });

    useEffect(() => {
        fetchWords();
    }, [fetchWords]);

    const filteredWords = words.filter(w =>
        w.french.toLowerCase().includes(searchTerm.toLowerCase()) ||
        w.turkish.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddWord = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addWord(newWord);
            setIsAddModalOpen(false);
            setNewWord({
                french: '',
                turkish: '',
                word_type: 'noun',
                category_id: 1,
                level_id: 1
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black mb-2">Kelime Yönetimi</h1>
                    <p className="text-slate-500 font-medium">Sistemdeki tüm kelimeleri düzenleyin veya yenilerini ekleyin.</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-primary text-white px-6 py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-xl shadow-primary/20"
                >
                    <Plus size={20} />
                    <span>Yeni Kelime Ekle</span>
                </button>
            </div>

            {/* Search and Filters */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                    type="text"
                    placeholder="Kelime ara (Fransızca veya Türkçe)..."
                    className="w-full bg-white dark:bg-dark-card border border-slate-200 dark:border-slate-800 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary transition-all shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Words Table */}
            <div className="bg-white dark:bg-dark-card rounded-[2rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Fransızca</th>
                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Türkçe</th>
                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Tür</th>
                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-slate-400 font-medium">
                                        <div className="flex items-center justify-center gap-2">
                                            <Loader2 className="animate-spin" />
                                            Yükleniyor...
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredWords.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-slate-400 font-medium">
                                        Kelime bulunamadı.
                                    </td>
                                </tr>
                            ) : filteredWords.map((word) => (
                                <tr key={word.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-lg">{word.french}</td>
                                    <td className="px-6 py-4 font-medium text-slate-600 dark:text-slate-400">{word.turkish}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-black uppercase tracking-widest">
                                            {word.word_type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-xl transition-all">
                                                <Edit2 size={18} />
                                            </button>
                                            <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-all">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Word Modal */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white dark:bg-dark-card w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden"
                        >
                            <h2 className="text-2xl font-black mb-6">Yeni Kelime Kaydet</h2>
                            <form onSubmit={handleAddWord} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Fransızca</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary outline-none"
                                        value={newWord.french}
                                        onChange={(e) => setNewWord({ ...newWord, french: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Türkçe</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary outline-none"
                                        value={newWord.turkish}
                                        onChange={(e) => setNewWord({ ...newWord, turkish: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Tür</label>
                                        <select
                                            className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary outline-none appearance-none"
                                            value={newWord.word_type}
                                            onChange={(e) => setNewWord({ ...newWord, word_type: e.target.value })}
                                        >
                                            <option value="noun">İsim</option>
                                            <option value="verb">Fiil</option>
                                            <option value="adjective">Sıfat</option>
                                            <option value="adverb">Zarf</option>
                                            <option value="expression">İfade</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Seviye</label>
                                        <select
                                            className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary outline-none appearance-none"
                                            value={newWord.level_id}
                                            onChange={(e) => setNewWord({ ...newWord, level_id: parseInt(e.target.value) })}
                                        >
                                            <option value={1}>A1.1</option>
                                            <option value={2}>A1.2</option>
                                            <option value={3}>A2</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsAddModalOpen(false)}
                                        className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold py-4 rounded-2xl hover:bg-slate-200 transition-all"
                                    >
                                        İptal
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 bg-primary text-white font-black py-4 rounded-2xl shadow-lg shadow-primary/20 hover:scale-105 transition-all"
                                    >
                                        Kaydet
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminWordsPage;
