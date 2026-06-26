import { create } from "zustand";
import type { StartGameRequest } from "../types/api";

interface SettingsStore {
	statType: string
	statCategory: string
	seasons: string[]

	setStatType: (statType: string) => void
	setStatCategory: (statCategory: string) => void
	setSeasons: (seasons: string[]) => void 

	getGameRequest: () => StartGameRequest
}

export const useSettingsStore = create<SettingsStore>((set, get) => ({
	statType: 'career',
	statCategory: 'ppg',
	seasons: [],

	setStatType: (statType) => set({ statType }),
	setStatCategory: (statCategory) => set({ statCategory }),
	setSeasons: (seasons) => set({ seasons }),

	getGameRequest: () => ({
    type: get().statType,
    category: get().statCategory,
    seasons: get().seasons,
  })
}))