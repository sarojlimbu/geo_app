import type { PortfolioProject } from "@/types/portfolio.types";

import api from "../../api/axios.config";

export const fetchPortfolioProjectsAPI = async (
  signal?: AbortSignal,
): Promise<PortfolioProject[]> => {
  const response = await api.get("/projects", {
    signal,
  });
  return response.data;
};
