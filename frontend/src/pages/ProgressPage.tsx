import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, TrendingUp, Calendar, Zap, Award, Target } from 'lucide-react';

const stats = [
    { label: 'Öğrenilen Kelime', value: '142', icon: <Zap className="text-yellow-400" />, sub: '+12 bu hafta' },
    { label: 'Tamamlanan Ders', value: '18', icon: <Award className="text-blue-400" />, sub: '1 seviye tamam' },
    { label: 'En Uzun Seri', value: '7 Gün', icon: <Calendar className="text-orange-400" />, sub: 'Şu an: 3 gün' },
    { label: 'Toplam XP', value: '4,850', icon: <Trophy className="text-purple-400" />, sub: 'Bir sonraki seviye: 150 XP' },
];

const achievements = [
    { title: 'İlk Adım', description: 'İlk dersini tamamla.', icon: '👶', status: 'earned', date: '2 Şub' },
    { title: 'Dil Avcısı', description: '50 farklı kelime öğren.', icon: '🔍', status: 'earned', date: '4 Şub' },
    { title: 'Haftalık Seri', description: '7 gün üst üste pratik yap.', icon: '🔥', status: 'pending', progress: 80 },
    { title: 'Gramer Ustası', description: 'Tüm A1 gramer kurallarını öğren.', icon: '🎓', status: 'locked' },
    { title: 'Konuşkan', description: 'Sözlü derslerin hepsini geç.', icon: '🗣️', status: 'locked' },
    { title: 'Gece Kuşu', description: 'Gece saat 12den sonra pratik yap.', icon: '🦉', status: 'earned', date: '10 Şub' },
];

const ProgressPage: React.FC = () => {
    return (
        <div className="space-y-10 pb-10">
            <header>
                <h1 className="text-3xl font-bold text-white mb-2">Gelişim ve Başarılar</h1>
                <p className="text-gray-400">İstatistiklerini takip et ve yeni başarılar keşfet.</p>
            </header>

            {/* Level Progress Card */}
            <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 backdrop-blur-xl border border-blue-500/30 rounded-[2rem] p-8 relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <div className="relative">
                        <div className="w-32 h-32 rounded-full border-8 border-gray-800 flex items-center justify-center bg-gray-900 shadow-inner">
                            <span className="text-4xl font-black text-white italic">A1</span>
                        </div>
                        <motion.div
                            initial={{ rotate: 0 }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-[-8px] rounded-full border-8 border-transparent border-t-blue-500 opacity-50"
                        />
                    </div>

                    <div className="flex-1 space-y-4 text-center md:text-left">
                        <h2 className="text-3xl font-black text-white uppercase tracking-tight">Başlangıç Seviyesi</h2>
                        <div className="w-full h-4 bg-gray-900/80 rounded-full p-1 border border-white/5">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '65%' }}
                                className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full shadow-lg shadow-blue-500/20"
                            />
                        </div>
                        <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                            <span>Seviye 1</span>
                            <span>850 / 1000 XP</span>
                            <span>Seviye 2</span>
                        </div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 text-center">
                        <Star className="text-yellow-500 mx-auto mb-2" size={32} />
                        <p className="text-gray-400 text-xs font-bold uppercase mb-1">Puanın</p>
                        <p className="text-2xl font-black text-white">4.8</p>
                    </div>
                </div>

                {/* Decorative Circles */}
                <div className="absolute top-[-50px] left-[-50px] w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-[-50px] right-[-50px] w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-gray-800/40 border border-gray-700/50 p-6 rounded-3xl group hover:border-blue-500/30 transition-all shadow-xl"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-gray-900/50 rounded-2xl group-hover:scale-110 transition-transform">
                                {stat.icon}
                            </div>
                            <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">{stat.label}</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-black text-white tracking-tight">{stat.value}</span>
                            <span className="text-xs font-medium text-emerald-400">{stat.sub}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Achievements Section */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Trophy className="text-yellow-500" />
                        Başarılar
                    </h2>
                    <button className="text-blue-400 text-sm font-bold hover:underline">Tümünü Gör</button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {achievements.map((ach, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -5 }}
                            className={`p-4 rounded-3xl border text-center transition-all ${ach.status === 'earned'
                                ? 'bg-gray-800/40 border-gray-700/50'
                                : ach.status === 'pending'
                                    ? 'bg-blue-600/5 border-blue-500/30'
                                    : 'bg-gray-900/20 border-gray-800/50 grayscale opacity-50'
                                }`}
                        >
                            <div className="text-4xl mb-3 flex justify-center">{ach.icon}</div>
                            <h3 className="text-xs font-black text-white mb-1 uppercase tracking-tight">{ach.title}</h3>
                            {ach.status === 'earned' && (
                                <p className="text-[10px] font-bold text-blue-400 uppercase">{ach.date}</p>
                            )}
                            {ach.status === 'pending' && (
                                <div className="mt-2 w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500" style={{ width: `${ach.progress}%` }} />
                                </div>
                            )}
                            {ach.status === 'locked' && (
                                <div className="mt-2 text-[10px] font-bold text-gray-500 uppercase tracking-tighter cursor-not-allowed">
                                    KİLİTLİ
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProgressPage;
