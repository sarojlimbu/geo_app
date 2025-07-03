import { create } from "zustand";

import type { PortfolioProject } from "@/types/portfolio.types";

import { fetchPortfolioProjectsAPI } from "./portfolio.api";

interface PortfolioState {
  projects: PortfolioProject[];
  loading: boolean;
  error: string | null;
  // eslint-disable-next-line no-unused-vars
  fetchProjects: (signal?: AbortSignal) => Promise<void>;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  projects: [],
  loading: false,
  error: null,

  fetchProjects: async (signal?: AbortSignal) => {
    try {
      set({ loading: true, error: null });
      const data = await fetchPortfolioProjectsAPI(signal);
      set({ projects: data, loading: false });
    } catch (error: any) {
      if (error.name === "AbortError") {
        return;
      }
      set({
        error: error.message || "Failed to load projects",
        loading: false,
      });
    }
  },
}));
