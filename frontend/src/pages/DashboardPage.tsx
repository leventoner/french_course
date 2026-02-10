import React, { useEffect } from 'react';
import { Play, TrendingUp, Zap, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../stores/authStore';
import { useLessonStore } from '../stores/lessonStore';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
    const { user } = useAuthStore();
    const { lessons, fetchLessons } = useLessonStore();
    const navigate = useNavigate();

    useEffect(() => {
        fetchLessons();
    }, [fetchLessons]);

    const nextLesson = lessons[0]; // Simplification: just pick first lesson for now

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-primary rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-primary/20">
                        <div className="relative z-10">
                            <h1 className="text-3xl font-bold mb-2">Bonjour, {user?.username}!</h1>
                            <p className="text-primary-foreground/80 mb-6 font-medium">Kaldığın yerden devam et ve bugün Fransızca öğrenmeye odaklan!</p>
                            <button
                                onClick={() => navigate('/lessons')}
                                className="bg-white text-primary px-8 py-4 rounded-2xl font-black flex items-center space-x-3 hover:scale-105 transition-all shadow-xl active:scale-95 group"
                            >
                                <Play size={24} fill="currentColor" className="group-hover:translate-x-1 transition-transform" />
                                <span>{nextLesson ? 'Sıradaki Ders' : 'Dersleri Keşfet'}</span>
                            </button>
                        </div>
                        <div className="absolute right-[-20%] bottom-[-20%] opacity-20 transform -rotate-12 select-none pointer-events-none">
                            <Zap size={300} strokeWidth={1} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <StatCard
                            icon={Zap}
                            label="Toplam XP"
                            value={user?.total_xp || 0}
                            color="indigo"
                        />
                        <StatCard
                            icon={TrendingUp}
                            label="Günlük Seri"
                            value={`${user?.streak_days || 0} Gün`}
                            color="orange"
                        />
                    </div>

                    <div className="bg-white dark:bg-dark-card rounded-[2rem] p-8 shadow-sm border border-slate-100 dark:border-slate-800">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold">Haftalık Aktivite</h2>
                            <div className="flex gap-2">
                                <span className="w-3 h-3 bg-primary rounded-full" />
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">XP Kazanımı</span>
                            </div>
                        </div>
                        <div className="h-48 flex items-end justify-between space-x-4">
                            {[40, 70, 45, 90, 65, 30, 80].map((h, i) => (
                                <div key={i} className="flex-1 space-y-3 group cursor-pointer">
                                    <div className="relative h-full flex items-end">
                                        <div
                                            className="w-full bg-slate-100 dark:bg-slate-800 rounded-2xl transition-all duration-500 overflow-hidden"
                                            style={{ height: `${h}%` }}
                                        >
                                            <div className="absolute inset-0 bg-primary opacity-20 group-hover:opacity-100 transition-opacity" />
                                            <motion.div
                                                initial={{ height: 0 }}
                                                animate={{ height: '100%' }}
                                                className="w-full bg-primary rounded-2xl"
                                                style={{ height: `${h}%` }}
                                            />
                                        </div>
                                    </div>
                                    <p className="text-center text-xs text-slate-500 font-bold uppercase tracking-tighter">
                                        {['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'][i]}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Status */}
                <div className="space-y-8">
                    <div className="bg-white dark:bg-dark-card rounded-[2rem] p-8 shadow-sm border border-slate-100 dark:border-slate-800">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-bold uppercase tracking-widest text-xs text-slate-400">Günlük Hedef</h2>
                            <span className="text-sm font-black text-primary">12/15 XP</span>
                        </div>
                        <div className="w-full h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-1 border border-black/5">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '80%' }}
                                className="h-full bg-primary rounded-full shadow-lg shadow-primary/20"
                            />
                        </div>
                        <p className="mt-4 text-xs text-slate-500 leading-relaxed font-medium">Günlük hedefine ulaşmak için sadece 3 XP daha kazanman gerekiyor!</p>
                    </div>

                    <div className="bg-white dark:bg-dark-card rounded-[2rem] p-8 shadow-sm border border-slate-100 dark:border-slate-800 group hover:border-primary/30 transition-all cursor-pointer">
                        <div className="flex items-center gap-2 mb-6">
                            <Award className="text-yellow-500" size={20} />
                            <h2 className="font-bold uppercase tracking-widest text-xs text-slate-400">Günün Kelimesi</h2>
                        </div>
                        <div className="space-y-6">
                            <div className="aspect-video bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center p-8 group-hover:scale-102 transition-transform shadow-inner">
                                <img src="https://img.icons8.com/clouds/200/croissant.png" alt="word" className="w-full h-full object-contain" />
                            </div>
                            <div className="text-center">
                                <h3 className="text-3xl font-black text-primary italic tracking-tight mb-1">Le Croissant</h3>
                                <p className="text-slate-400 font-medium italic text-sm mb-4">/kʁwa.sɑ̃/</p>
                                <div className="inline-block px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold text-slate-800 dark:text-white">
                                    Kruvasan
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ icon: Icon, label, value, color }: any) => (
    <div className="bg-white dark:bg-dark-card rounded-[2rem] p-8 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center space-x-6 group hover:border-primary/20 transition-all">
        <div className={`p-5 rounded-[1.5rem] bg-${color}-500/10 text-${color}-500 group-hover:scale-110 transition-transform`}>
            <Icon size={32} />
        </div>
        <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-[0.2em] mb-1">{label}</p>
            <p className="text-3xl font-black tracking-tight">{value}</p>
        </div>
    </div>
);

export default DashboardPage;
