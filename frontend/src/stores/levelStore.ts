import { create } from 'zustand';
import api from '../api/client';

export interface Level {
    id: number;
    level_number: number;
    title_tr: string;
    title_fr: string;
    description_tr: string;
    min_xp_required: number;
    color_theme: string;
    icon_name: string;
    total_lessons: number;
}

interface LevelState {
    levels: Level[];
    loading: boolean;
    error: string | null;
    fetchLevels: () => Promise<void>;
}

export const useLevelStore = create<LevelState>((set) => ({
    levels: [],
    loading: false,
    error: null,
    fetchLevels: async () => {
        set({ loading: true });
        try {
            const response = await api.get('/levels');
            set({ levels: response.data, loading: false, error: null });
        } catch (err: any) {
            set({ error: err.message, loading: false });
        }
    },
}));
