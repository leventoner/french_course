import React from 'react';
import { Bell, Search, Flame, Award } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

const Navbar = () => {
    const user = useAuthStore((state) => state.user);
    return (
        <header className="h-16 bg-white dark:bg-dark-card border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 sticky top-0 z-10">
            <div className="flex items-center flex-1 max-w-xl">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input type="text" placeholder="Gramer veya kelime ara..." className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-primary" />
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 px-3 py-1 bg-orange-50 dark:bg-orange-900/20 text-orange-600 rounded-full">
                    <Flame size={18} /> <span>{user?.streak_days || 0}</span>
                </div>
                <div className="flex items-center space-x-1 px-3 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-600 rounded-full">
                    <Award size={18} /> <span>{user?.total_xp || 0} XP</span>
                </div>
                <div className="flex items-center space-x-3 pl-4 border-l dark:border-slate-800">
                    <div className="text-right">
                        <p className="text-sm font-semibold dark:text-white">{user?.username || 'Misafir'}</p>
                        <p className="text-xs text-slate-500">Seviye {user?.current_level || 1}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700" />
                </div>
            </div>
        </header>
    );
};
export default Navbar;
