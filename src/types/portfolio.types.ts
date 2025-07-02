export interface PortfolioProject {
  id: number;
  category_title: string[];
  category_description: string[];
  focus_area: string[];
  photo: string;
  title: string;
  subtitle: string;
  clients: string;
  start_date: string;
  end_date: string;
  description: string;
  is_key_highlight: boolean;
  project_order: number;
  created_at: string;
  updated_at: string;
  ongoing: boolean;
  project_url: string | null;
  is_international_projects: boolean;
  category: number[];
}
