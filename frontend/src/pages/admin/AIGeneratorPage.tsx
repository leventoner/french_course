import React, { useState } from 'react';
import {
    Sparkles,
    Wand2,
    BookOpen,
    Type,
    Check,
    X,
    Loader2,
    Save
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../api/client';
import { useAdminStore } from '../../stores/adminStore';

const AIGeneratorPage = () => {
    const { addWord, addLesson } = useAdminStore();
    const [mode, setMode] = useState<'words' | 'lesson'>('words');
    const [loading, setLoading] = useState(false);
    const [generatedContent, setGeneratedContent] = useState<any>(null);
    const [config, setConfig] = useState({
        category: 'Salutations',
        level: 'A1.1',
        topic: 'Fransa Tatili',
        count: 5
    });

    const handleGenerate = async () => {
        setLoading(true);
        setGeneratedContent(null);
        try {
            if (mode === 'words') {
                const res = await api.post(`/admin/generate/words?category=${config.category}&level=${config.level}&count=${config.count}`);
                setGeneratedContent(res.data);
            } else {
                const res = await api.post(`/admin/generate/lesson?topic=${config.topic}&level=${config.level}`);
                setGeneratedContent(res.data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveGenerated = async () => {
        if (!generatedContent) return;

        try {
            if (mode === 'words') {
                for (const word of generatedContent) {
                    await addWord({
                        ...word,
                        category_id: 1, // Default category for now
                        level_id: 1     // Default level for now
                    });
                }
            } else {
                await addLesson({
                    title_fr: generatedContent.title_fr,
                    title_tr: generatedContent.title_tr,
                    content: generatedContent.content,
                    lesson_type: 'vocabulary',
                    xp_reward: 50,
                    order_index: 0,
                    level_id: 1,
                    category_id: 1
                });
            }
            alert('Başarıyla kaydedildi!');
            setGeneratedContent(null);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black flex items-center gap-3">
                        <Sparkles className="text-primary" />
                        AI İçerik Üretici
                    </h1>
                    <p className="text-slate-500 font-medium mt-1">Yapay zeka desteğiyle saniyeler içinde yeni dersler ve kelimeler oluşturun.</p>
                </div>
            </div>

            {/* Mode Selection */}
            <div className="grid grid-cols-2 gap-4 p-2 bg-slate-100 dark:bg-slate-800 rounded-3xl">
                <button
                    onClick={() => setMode('words')}
                    className={`flex items-center justify-center gap-2 py-4 rounded-2xl font-black transition-all ${mode === 'words' ? 'bg-white dark:bg-dark-card shadow-lg text-primary scale-100' : 'text-slate-500'}`}
                >
                    <Type size={20} />
                    Kelime Paketi
                </button>
                <button
                    onClick={() => setMode('lesson')}
                    className={`flex items-center justify-center gap-2 py-4 rounded-2xl font-black transition-all ${mode === 'lesson' ? 'bg-white dark:bg-dark-card shadow-lg text-primary scale-100' : 'text-slate-500'}`}
                >
                    <BookOpen size={20} />
                    Modüler Ders
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Configuration Panel */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white dark:bg-dark-card rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800 space-y-6">
                        <h2 className="text-lg font-black uppercase tracking-widest text-slate-400">Yapılandırma</h2>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold">Zorluk Seviyesi</label>
                                <select
                                    className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border-none outline-none focus:ring-2 focus:ring-primary"
                                    value={config.level}
                                    onChange={(e) => setConfig({ ...config, level: e.target.value })}
                                >
                                    <option value="A1.1">A1.1 (Başlangıç)</option>
                                    <option value="A1.2">A1.2 (Temel)</option>
                                    <option value="A2">A2 (Orta-Alt)</option>
                                </select>
                            </div>

                            {mode === 'words' ? (
                                <>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold">Kategori</label>
                                        <input
                                            type="text"
                                            className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border-none outline-none focus:ring-2 focus:ring-primary"
                                            placeholder="Örn: Mutfak Gereçleri"
                                            value={config.category}
                                            onChange={(e) => setConfig({ ...config, category: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold">Kelime Sayısı</label>
                                        <input
                                            type="number"
                                            className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border-none outline-none focus:ring-2 focus:ring-primary"
                                            min={1} max={20}
                                            value={config.count}
                                            onChange={(e) => setConfig({ ...config, count: parseInt(e.target.value) })}
                                        />
                                    </div>
                                </>
                            ) : (
                                <div className="space-y-2">
                                    <label className="text-sm font-bold">Ders Konusu</label>
                                    <textarea
                                        className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border-none outline-none focus:ring-2 focus:ring-primary resize-none"
                                        rows={4}
                                        placeholder="Örn: Restoranda yemek siparişi verme"
                                        value={config.topic}
                                        onChange={(e) => setConfig({ ...config, topic: e.target.value })}
                                    />
                                </div>
                            )}

                            <button
                                onClick={handleGenerate}
                                disabled={loading}
                                className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : <Wand2 />}
                                Üretmeye Başla
                            </button>
                        </div>
                    </div>
                </div>

                {/* Preview Panel */}
                <div className="lg:col-span-2">
                    <AnimatePresence mode="wait">
                        {loading ? (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="bg-white dark:bg-dark-card rounded-[2rem] p-12 border border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center space-y-4 min-h-[400px]"
                            >
                                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary relative">
                                    <Wand2 size={32} className="animate-pulse" />
                                    <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black">AI Düşünüyor...</h3>
                                    <p className="text-slate-500">Mükemmel Fransızca içerik hazırlanıyor, lütfen bekleyin.</p>
                                </div>
                            </motion.div>
                        ) : generatedContent ? (
                            <motion.div
                                key="preview"
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                className="space-y-6"
                            >
                                <div className="bg-white dark:bg-dark-card rounded-[2rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
                                    <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
                                        <h2 className="text-lg font-black uppercase tracking-widest text-slate-400">Önizleme</h2>
                                        <button
                                            onClick={handleSaveGenerated}
                                            className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
                                        >
                                            <Save size={18} />
                                            Sisteme Kaydet
                                        </button>
                                    </div>

                                    <div className="p-8">
                                        {mode === 'words' ? (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {generatedContent.map((word: any, i: number) => (
                                                    <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                                                        <div className="flex justify-between items-start mb-2">
                                                            <span className="text-2xl font-black text-primary">{word.french}</span>
                                                            <span className="text-[10px] font-black uppercase tracking-widest bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded-md">{word.word_type}</span>
                                                        </div>
                                                        <p className="font-bold text-slate-600 dark:text-slate-400">{word.turkish}</p>
                                                        <p className="text-sm italic text-slate-400 mt-2">"{word.example_sentence_fr}"</p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="space-y-6">
                                                <div>
                                                    <h3 className="text-3xl font-black mb-1">{generatedContent.title_fr}</h3>
                                                    <p className="text-slate-500 font-bold">{generatedContent.title_tr}</p>
                                                </div>
                                                <div className="prose dark:prose-invert max-w-none bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                                                    {generatedContent.content}
                                                </div>
                                                <div className="space-y-4">
                                                    <h4 className="font-black text-lg">Quiz Soru Taslakları:</h4>
                                                    {generatedContent.quiz?.map((q: any, i: number) => (
                                                        <div key={i} className="p-4 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-dark-card">
                                                            <p className="font-bold">{i + 1}. {q.question}</p>
                                                            <div className="grid grid-cols-2 gap-2 mt-3">
                                                                {q.options.map((opt: string, j: number) => (
                                                                    <div key={j} className={`p-2 rounded-lg text-sm ${opt === q.correct_answer ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 border border-emerald-200 dark:border-emerald-800' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                                                                        {opt}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="bg-white dark:bg-dark-card rounded-[2rem] p-12 border border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center space-y-4 min-h-[400px]"
                            >
                                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400">
                                    <Sparkles size={32} />
                                </div>
                                <div className="max-w-xs">
                                    <h3 className="text-xl font-black">Henüz İçerik Yok</h3>
                                    <p className="text-slate-500">Soldaki panelden ayarları yapın ve 'Üretmeye Başla' butonuna basın.</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default AIGeneratorPage;
