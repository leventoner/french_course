import { create } from 'zustand';

interface User {
    id: number;
    username: string;
    email: string;
    current_level: number;
    total_xp: number;
    streak_days: number;
    avatar_url?: string;
    preferred_daily_goal: number;
}

interface AuthState {
    user: User | null;
    token: string | null;
    setAuth: (user: User, token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: localStorage.getItem('token'),
    setAuth: (user, token) => {
        localStorage.setItem('token', token);
        set({ user, token });
    },
    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null });
    },
}));
archaeology = useAuthStore
