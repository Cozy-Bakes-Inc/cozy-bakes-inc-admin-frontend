export type MenuAnalytics = {
  total_menus: number;
  active_menus: number;
  inactive_menus: number;
  this_month_menus: number;
};

export type MenuAnalyticsApiResponse = {
  status: string;
  message: string;
  data: MenuAnalytics;
};

export type Menu = {
  id: number;
  slug: string;
  title: string;
  description: string;
  pdf_file_link: string;
  shop_id: number | null;
  is_active: 0 | 1;
  created_at: string;
  updated_at: string;
};

type PaginationLink = {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
};

type MenuPagination = {
  current_page: number;
  data: Menu[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
};

export type MenuListApiResponse = {
  status: string;
  message: string;
  data: MenuPagination;
};

export type MenuViewApiResponse = {
  status: string;
  message: string;
  data: Menu;
};

export interface MenuFormValues {
  title: string;
  description: string;
  pdfFile: File | null;
  isActive: boolean;
}
