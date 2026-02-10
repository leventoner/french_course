import React from 'react';
import {
    LayoutDashboard,
    BookOpen,
    Type,
    FileText,
    Users,
    Settings,
    PlusCircle,
    TrendingUp
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAdminStore } from '../../stores/adminStore';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const { stats, fetchStats, loading } = useAdminStore();

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    if (loading && !stats) return <div className="p-8 text-center">Yükleniyor...</div>;

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 dark:text-white mb-2">Yönetim Paneli</h1>
                    <p className="text-slate-500 font-medium">İçerik ve kullanıcı yönetimini buradan yapabilirsiniz.</p>
                </div>
                <Link to="/admin/generate" className="bg-primary text-white px-6 py-3 rounded-2xl font-bold flex items-center space-x-2 hover:scale-105 transition-all shadow-lg shadow-primary/20">
                    <PlusCircle size={20} />
                    <span>Hızlı İçerik Ekle</span>
                </Link>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <AdminStatCard icon={Users} label="Toplam Kullanıcı" value={stats?.total_users.toString() || '0'} color="blue" />
                <AdminStatCard icon={BookOpen} label="Aktif Dersler" value={stats?.total_lessons.toString() || '0'} color="purple" />
                <AdminStatCard icon={Type} label="Kelimeler" value={stats?.total_words.toString() || '0'} color="emerald" />
                <AdminStatCard icon={TrendingUp} label="Bugünkü Aktivite" value="+0%" color="orange" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Content */}
                <div className="bg-white dark:bg-dark-card rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <FileText className="text-primary" size={24} />
                        Son Eklenen Dersler
                    </h2>
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-transparent hover:border-primary/20 transition-all cursor-pointer">
                                <div>
                                    <p className="font-bold">A1: Selamlaşma Temelleri</p>
                                    <p className="text-xs text-slate-500">2 gün önce eklendi</p>
                                </div>
                                <span className="text-xs font-black uppercase tracking-widest bg-blue-100 text-blue-600 px-3 py-1 rounded-full">Kelime</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* System Health / Quick Links */}
                <div className="bg-white dark:bg-dark-card rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Settings className="text-primary" size={24} />
                        Hızlı Bağlantılar
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <QuickLink label="Dersleri Yönet" icon={BookOpen} color="indigo" path="/admin/lessons" />
                        <QuickLink label="Kelimeleri Yönet" icon={Type} color="emerald" path="/admin/words" />
                        <QuickLink label="Kullanıcılar" icon={Users} color="orange" path="/admin/users" />
                        <QuickLink label="Sistem Ayarları" icon={Settings} color="slate" path="/admin/settings" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const AdminStatCard = ({ icon: Icon, label, value, color }: any) => (
    <div className="bg-white dark:bg-dark-card rounded-[2rem] p-6 border border-slate-100 dark:border-slate-800 flex items-center space-x-4">
        <div className={`p-4 rounded-2xl bg-${color}-500/10 text-${color}-500`}>
            <Icon size={24} />
        </div>
        <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">{label}</p>
            <p className="text-2xl font-black">{value}</p>
        </div>
    </div>
);

const QuickLink = ({ label, icon: Icon, color, path }: any) => (
    <Link to={path} className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-transparent hover:border-primary/20 transition-all cursor-pointer group flex flex-col items-center text-center space-y-3">
        <div className={`p-3 rounded-xl bg-white dark:bg-slate-700 shadow-sm group-hover:scale-110 transition-transform text-${color}-50`}>
            <Icon size={20} className={`text-${color}-500`} />
        </div>
        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{label}</span>
    </Link>
);

export default AdminDashboard;
