import { create } from 'zustand';
import api from '../api/client';

export interface Word {
    id: number;
    french: string;
    turkish: string;
    phonetic_ipa: string;
    word_type: string;
    audio_url: string;
    level_id: number;
    category_id: number;
}

interface WordState {
    words: Word[];
    loading: boolean;
    error: string | null;
    fetchWords: (levelId?: number, categoryId?: number, search?: string) => Promise<void>;
}

export const useWordStore = create<WordState>((set) => ({
    words: [],
    loading: false,
    error: null,
    fetchWords: async (levelId, categoryId, search) => {
        set({ loading: true });
        try {
            const params = new URLSearchParams();
            if (levelId) params.append('level_id', levelId.toString());
            if (categoryId) params.append('category_id', categoryId.toString());
            if (search) params.append('search', search);

            const response = await api.get(`/words?${params.toString()}`);
            set({ words: response.data, loading: false, error: null });
        } catch (err: any) {
            set({ error: err.message, loading: false });
        }
    },
}));
