import React from 'react';
import {
    BookOpen,
    Layers,
    FileText,
    Gamepad2,
    BarChart3,
    Search,
    User,
    LogOut
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

const Sidebar = () => {
    const location = useLocation();
    const logout = useAuthStore((state) => state.logout);

    const menuItems = [
        { icon: BookOpen, label: 'Dersler', path: '/lessons' },
        { icon: Layers, label: 'Kelimeler', path: '/words' },
        { icon: FileText, label: 'Gramer', path: '/grammar' },
        { icon: Gamepad2, label: 'Oyunlar', path: '/games' },
        { icon: BarChart3, label: 'İlerleme', path: '/progress' },
        { icon: Search, label: 'Sözlük', path: '/search' },
    ];

    return (
        <div className="w-64 bg-white dark:bg-dark-card border-r border-slate-200 dark:border-slate-800 flex flex-col h-screen sticky top-0">
            <div className="p-6">
                <Link to="/" className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
                        <span className="text-2xl font-bold">F</span>
                    </div>
                    <span className="text-xl font-bold text-slate-800 dark:text-white">FrançApp</span>
                </Link>
            </div>

            <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                                ? 'bg-primary/10 text-primary font-semibold'
                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                                }`}
                        >
                            <Icon size={20} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-1">
                <Link
                    to="/profile"
                    className="flex items-center space-x-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-all"
                >
                    <User size={20} />
                    <span>Profil</span>
                </Link>
                <button
                    onClick={logout}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                >
                    <LogOut size={20} />
                    <span>Çıkış Yap</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
