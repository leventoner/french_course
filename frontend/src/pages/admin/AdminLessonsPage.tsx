import React, { useEffect, useState } from 'react';
import { useAdminStore } from '../../stores/adminStore';
import { Plus, Search, Trash2, Edit2, Loader2, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLessonsPage = () => {
    const { lessons, fetchLessons, loading, addLesson } = useAdminStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newLesson, setNewLesson] = useState({
        title_tr: '',
        title_fr: '',
        content: '',
        lesson_type: 'vocabulary',
        xp_reward: 50,
        order_index: 0,
        level_id: 1,
        category_id: 1
    });

    useEffect(() => {
        fetchLessons();
    }, [fetchLessons]);

    const filteredLessons = lessons.filter(l =>
        l.title_tr.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.title_fr.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddLesson = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addLesson(newLesson);
            setIsAddModalOpen(false);
            setNewLesson({
                title_tr: '',
                title_fr: '',
                content: '',
                lesson_type: 'vocabulary',
                xp_reward: 50,
                order_index: 0,
                level_id: 1,
                category_id: 1
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black mb-2">Ders Yönetimi</h1>
                    <p className="text-slate-500 font-medium">Sistemdeki tüm dersleri düzenleyin veya yenilerini ekleyin.</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-primary text-white px-6 py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-xl shadow-primary/20"
                >
                    <Plus size={20} />
                    <span>Yeni Ders Ekle</span>
                </button>
            </div>

            {/* Search and Filters */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                    type="text"
                    placeholder="Ders ara..."
                    className="w-full bg-white dark:bg-dark-card border border-slate-200 dark:border-slate-800 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary transition-all shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Lessons Table */}
            <div className="bg-white dark:bg-dark-card rounded-[2rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Ders Başlığı (FR)</th>
                                <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Ders Başlığı (TR)</th>
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
                            ) : filteredLessons.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-slate-400 font-medium">
                                        Ders bulunamadı.
                                    </td>
                                </tr>
                            ) : filteredLessons.map((lesson) => (
                                <tr key={lesson.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-lg">{lesson.title_fr}</td>
                                    <td className="px-6 py-4 font-medium text-slate-600 dark:text-slate-400">{lesson.title_tr}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-black uppercase tracking-widest">
                                            {lesson.lesson_type}
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

            {/* Add Lesson Modal */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white dark:bg-dark-card w-full max-w-2xl rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden"
                        >
                            <h2 className="text-2xl font-black mb-6">Yeni Ders Kaydet</h2>
                            <form onSubmit={handleAddLesson} className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Başlık (Fransızca)</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary outline-none"
                                            value={newLesson.title_fr}
                                            onChange={(e) => setNewLesson({ ...newLesson, title_fr: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Başlık (Türkçe)</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary outline-none"
                                            value={newLesson.title_tr}
                                            onChange={(e) => setNewLesson({ ...newLesson, title_tr: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Ders İçeriği (Markdown)</label>
                                    <textarea
                                        required
                                        rows={5}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary outline-none resize-none"
                                        value={newLesson.content}
                                        onChange={(e) => setNewLesson({ ...newLesson, content: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Tür</label>
                                        <select
                                            className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary outline-none appearance-none"
                                            value={newLesson.lesson_type}
                                            onChange={(e) => setNewLesson({ ...newLesson, lesson_type: e.target.value })}
                                        >
                                            <option value="vocabulary">Kelime</option>
                                            <option value="grammar">Gramer</option>
                                            <option value="reading">Okuma</option>
                                            <option value="listening">Dinleme</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">XP Ödülü</label>
                                        <input
                                            type="number"
                                            className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary outline-none"
                                            value={newLesson.xp_reward}
                                            onChange={(e) => setNewLesson({ ...newLesson, xp_reward: parseInt(e.target.value) })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Sıra</label>
                                        <input
                                            type="number"
                                            className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary outline-none"
                                            value={newLesson.order_index}
                                            onChange={(e) => setNewLesson({ ...newLesson, order_index: parseInt(e.target.value) })}
                                        />
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

export default AdminLessonsPage;
