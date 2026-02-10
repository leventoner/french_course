import { create } from 'zustand';
import api from '../api/client';

interface AdminStats {
    total_users: number;
    total_lessons: number;
    total_words: number;
}

interface Word {
    id: number;
    french: string;
    turkish: string;
    word_type: string;
    category_id: number;
    level_id: number;
}

interface Lesson {
    id: number;
    title_tr: string;
    title_fr: string;
    lesson_type: string;
    level_id: number;
    category_id: number;
}

interface AdminState {
    stats: AdminStats | null;
    words: Word[];
    lessons: Lesson[];
    loading: boolean;
    error: string | null;
    fetchStats: () => Promise<void>;
    fetchWords: () => Promise<void>;
    fetchLessons: () => Promise<void>;
    addWord: (word: any) => Promise<void>;
    addLesson: (lesson: any) => Promise<void>;
}

export const useAdminStore = create<AdminState>((set, get) => ({
    stats: null,
    words: [],
    lessons: [],
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
    fetchWords: async () => {
        set({ loading: true });
        try {
            const response = await api.get('/admin/words');
            set({ words: response.data, loading: false });
        } catch (err: any) {
            set({ error: err.message, loading: false });
        }
    },
    fetchLessons: async () => {
        set({ loading: true });
        try {
            const response = await api.get('/admin/lessons');
            set({ lessons: response.data, loading: false });
        } catch (err: any) {
            set({ error: err.message, Defense: err.message, loading: false });
        }
    },
    addWord: async (word) => {
        try {
            await api.post('/admin/words', word);
            get().fetchWords();
            get().fetchStats();
        } catch (err: any) {
            set({ error: err.message });
            throw err;
        }
    },
    addLesson: async (lesson) => {
        try {
            await api.post('/admin/lessons', lesson);
            get().fetchLessons();
            get().fetchStats();
        } catch (err: any) {
            set({ error: err.message });
            throw err;
        }
    },
}));
