import { create } from 'zustand';
import api from '../api/client';

export interface Lesson {
    id: number;
    level_id: number;
    category_id: number;
    title_tr: string;
    title_fr: string;
    content: string;
    lesson_type: string;
    xp_reward: number;
    order_index: number;
}

interface LessonState {
    lessons: Lesson[];
    loading: boolean;
    error: string | null;
    fetchLessons: (levelId?: number, categoryId?: number) => Promise<void>;
}

export const useLessonStore = create<LessonState>((set) => ({
    lessons: [],
    loading: false,
    error: null,
    fetchLessons: async (levelId, categoryId) => {
        set({ loading: true });
        try {
            let url = '/lessons';
            const params = new URLSearchParams();
            if (levelId) params.append('level_id', levelId.toString());
            if (categoryId) params.append('category_id', categoryId.toString());
            if (params.toString()) url += `?${params.toString()}`;

            const response = await api.get(url);
            set({ lessons: response.data, loading: false, error: null });
        } catch (err: any) {
            set({ error: err.message, loading: false });
        }
    },
}));
