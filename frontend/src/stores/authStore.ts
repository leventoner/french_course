import { create } from 'zustand';
import api from '../api/client';

interface User {
    id: number;
    username: string;
    email: string;
    current_level: number;
    total_xp: number;
    streak_days: number;
    avatar_url?: string;
    preferred_daily_goal: number;
    is_admin: boolean;
}

interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
    login: (username: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string) => Promise<void>;
    fetchMe: () => Promise<void>;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: localStorage.getItem('token'),
    loading: false,
    error: null,
    login: async (username, password) => {
        set({ loading: true });
        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);

            const response = await api.post('/auth/login', formData);
            const { access_token } = response.data;
            localStorage.setItem('token', access_token);
            set({ token: access_token, loading: false });

            // After login, fetch user data
            const userResponse = await api.get('/auth/me'); // Assuming there's a /me endpoint
            set({ user: userResponse.data });
        } catch (err: any) {
            set({ error: err.message, loading: false });
            throw err;
        }
    },
    register: async (username, email, password) => {
        set({ loading: true });
        try {
            await api.post('/auth/register', { username, email, password });
            set({ loading: false });
        } catch (err: any) {
            set({ error: err.message, loading: false });
            throw err;
        }
    },
    fetchMe: async () => {
        if (!localStorage.getItem('token')) return;
        try {
            const response = await api.get('/auth/me');
            set({ user: response.data });
        } catch (err) {
            localStorage.removeItem('token');
            set({ token: null, user: null });
        }
    },
    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null });
    },
}));
