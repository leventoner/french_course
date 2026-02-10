import { create } from 'zustand';
import api from '../api/client';

interface AdminStats {
    total_users: number;
    total_lessons: number;
    total_words: number;
}

interface AdminState {
    stats: AdminStats | null;
    loading: boolean;
    error: string | null;
    fetchStats: () => Promise<void>;
}

export const useAdminStore = create<AdminState>((set) => ({
    stats: null,
    loading: false,
    error: null,
    fetchStats: async () => {
        set({ loading: true });
        try {
            const response = await api.get('/admin/stats');
            set({ stats: response.data, loading: false });
        } catch (err: any) {
            set({ error: err.message, loading: false });
        }
    },
}));
