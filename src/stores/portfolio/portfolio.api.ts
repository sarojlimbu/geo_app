import type { PortfolioProject } from "@/types/portfolio.types";

import api from "../../api/axios.config";

export const fetchPortfolioProjectsAPI = async (): Promise<
  PortfolioProject[]
> => {
  const response = await api.get("/projects");
  return response.data;
};
