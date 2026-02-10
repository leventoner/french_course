import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Brain, Zap, Target, Layers, Languages } from 'lucide-react';

const games = [
    {
        title: 'Kelime Eşleştirme',
        description: 'Fransızca ve Türkçe kelimeleri birbiriyle eşleştirerek puan topla.',
        icon: <Layers className="text-pink-400" size={32} />,
        color: 'from-pink-500/20 to-purple-500/20',
        borderColor: 'border-pink-500/50',
        xp: 30
    },
    {
        title: 'Hızlı Çeviri',
        description: 'Zamana karşı yarışarak verilen kelimenin doğru çevirisini seç.',
        icon: <Zap className="text-yellow-400" size={32} />,
        color: 'from-yellow-500/20 to-orange-500/20',
        borderColor: 'border-yellow-500/50',
        xp: 50
    },
    {
        title: 'Kelime Avı',
        description: 'Tablo içindeki gizli Fransızca kelimeleri bul.',
        icon: <Search className="text-green-400" size={32} />,
        color: 'from-green-500/20 to-emerald-500/20',
        borderColor: 'border-green-500/50',
        xp: 40
    },
    {
        title: 'Cümle Kurma',
        description: 'Karışık verilen kelimeleri doğru sıraya dizerek cümle oluştur.',
        icon: <Languages className="text-blue-400" size={32} />,
        color: 'from-blue-500/20 to-cyan-500/20',
        borderColor: 'border-blue-500/50',
        xp: 60
    }
];

// Helper to fix the missing Search icon in the array
import { Search } from 'lucide-react';

const GamesPage: React.FC = () => {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-white mb-2">Eğlence & Pratik</h1>
                <p className="text-gray-400">Oyun oynayarak Fransızcanı geliştir ve daha fazla XP kazan.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {games.map((game, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ scale: 1.02 }}
                        className={`relative overflow-hidden bg-gradient-to-br ${game.color} backdrop-blur-xl border ${game.borderColor} rounded-3xl p-8 group cursor-pointer`}
                    >
                        <div className="relative z-10">
                            <div className="mb-6 inline-block p-4 bg-gray-900/50 rounded-2xl shadow-xl border border-white/5">
                                {game.icon}
                            </div>

                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-2xl font-bold text-white uppercase tracking-tight">{game.title}</h2>
                                <div className="bg-white/10 px-3 py-1 rounded-full text-xs font-black text-white uppercase tracking-widest border border-white/10">
                                    +{game.xp} XP
                                </div>
                            </div>

                            <p className="text-gray-300 font-medium leading-relaxed mb-8 max-w-sm">
                                {game.description}
                            </p>

                            <button className="flex items-center gap-2 bg-white text-black font-bold px-6 py-3 rounded-2xl group-hover:bg-blue-500 group-hover:text-white transition-all transform active:scale-95 shadow-xl">
                                Oyna
                                <Gamepad2 size={20} />
                            </button>
                        </div>

                        {/* Decorative background element */}
                        <div className="absolute -right-10 -bottom-10 opacity-10 blur-2xl group-hover:opacity-20 transition-opacity">
                            {game.icon}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="bg-blue-600/10 border border-blue-500/30 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-6">
                <div className="p-4 bg-blue-600 rounded-2xl">
                    <Brain className="text-white" size={32} />
                </div>
                <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl font-bold text-white mb-1">Haftalık Turnuva</h3>
                    <p className="text-blue-200">En çok puanı topla, lig birincisi ol ve özel başarılar kazan!</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-2xl transition-all shadow-lg shadow-blue-600/20">
                    Liderlik Tablosu
                </button>
            </div>
        </div>
    );
};

export default GamesPage;
