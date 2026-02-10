import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, AlertCircle, Loader2 } from 'lucide-react';
import api from '../api/client';
import { motion } from 'framer-motion';

const RegisterPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await api.post('/auth/register', { username, email, password });
            navigate('/login');
        } catch (err: any) {
            setError('Kayıt başarısız. Bu e-posta veya kullanıcı adı kullanımda olabilir.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 flex flex-col justify-center items-center p-6 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-gray-900/40 backdrop-blur-2xl border border-gray-800 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
            >
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-pink-600/20 rounded-full blur-3xl" />

                <div className="text-center mb-10 relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl mx-auto flex items-center justify-center mb-6 -rotate-6 shadow-xl shadow-indigo-600/20">
                        <UserPlus className="text-white" size={32} />
                    </div>
                    <h1 className="text-4xl font-black text-white italic tracking-tighter mb-2">FrançApp</h1>
                    <p className="text-gray-400 font-medium">Yeni bir hesap oluştur.</p>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 text-sm font-semibold"
                    >
                        <AlertCircle size={18} />
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div className="space-y-2">
                        <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-4">Kullanıcı Adı</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                            <input
                                type="text"
                                placeholder="parisli_mehmet"
                                className="w-full bg-gray-950/50 border border-gray-800 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-700 focus:outline-none focus:border-indigo-500 transition-all"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-4">E-posta</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                            <input
                                type="email"
                                placeholder="ornek@mail.com"
                                className="w-full bg-gray-950/50 border border-gray-800 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-700 focus:outline-none focus:border-indigo-500 transition-all"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-4">Şifre</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-gray-950/50 border border-gray-800 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-700 focus:outline-none focus:border-indigo-500 transition-all"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-3 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? <Loader2 className="animate-spin" size={24} /> : 'Kayıt Ol'}
                    </button>
                </form>

                <div className="mt-10 text-center relative z-10">
                    <p className="text-gray-500 font-medium">
                        Zaten hesabın var mı?{' '}
                        <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-bold ml-1 hover:underline">
                            Giriş Yap
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default RegisterPage;
