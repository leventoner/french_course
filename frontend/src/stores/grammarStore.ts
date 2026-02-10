import { create } from 'zustand';
import api from '../api/client';

export interface GrammarRule {
    id: number;
    title_tr: string;
    title_fr: string;
    explanation_tr: string;
    formula: string;
    examples_json: any;
    level_id: number;
    order_index: number;
    difficulty: number;
}

interface GrammarState {
    rules: GrammarRule[];
    loading: boolean;
    error: string | null;
    fetchRules: (levelId?: number) => Promise<void>;
}

export const useGrammarStore = create<GrammarState>((set) => ({
    rules: [],
    loading: false,
    error: null,
    fetchRules: async (levelId) => {
        set({ loading: true });
        try {
            let url = '/grammar';
            if (levelId) url += `?level_id=${levelId}`;
            const response = await api.get(url);
            set({ rules: response.data, loading: false, error: null });
        } catch (err: any) {
            set({ error: err.message, loading: false });
        }
    },
}));
