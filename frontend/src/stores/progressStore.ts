import { create } from 'zustand';

interface ProgressState {
    dailyXP: number;
    totalXP: number;
    streak: number;
    addXP: (amount: number) => void;
    setDailyXP: (amount: number) => void;
}

export const useProgressStore = create<ProgressState>((set) => ({
    dailyXP: 0,
    totalXP: 0,
    streak: 0,
    addXP: (amount) => set((state) => ({
        dailyXP: state.dailyXP + amount,
        totalXP: state.totalXP + amount
    })),
    setDailyXP: (amount) => set({ dailyXP: amount }),
}));
