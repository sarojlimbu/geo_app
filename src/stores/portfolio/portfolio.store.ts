import { create } from "zustand";

import type { PortfolioProject } from "@/types/portfolio.types";

import { fetchPortfolioProjectsAPI } from "./portfolio.api";

interface PortfolioState {
  projects: PortfolioProject[];
  loading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  projects: [],
  loading: false,
  error: null,

  fetchProjects: async () => {
    try {
      set({ loading: true, error: null });
      const data = await fetchPortfolioProjectsAPI();
      set({ projects: data, loading: false });
    } catch (error: any) {
      set({
        error: error.message || "Failed to load projects",
        loading: false,
      });
    }
  },
}));
