import type { ReactNode } from "react";
import type {
  CategoryActionTone,
  CategoryViewMode,
} from "@/types/main/categories";

export interface BakeryCategoryDetails {
  slug: string;
  title: string;
  description: string;
  heroTitle: string;
}

export interface BakerySubCategoryRecord {
  id: string;
  slug: string;
  name: string;
  description: string;
  coverImage: string;
}

export interface CategoryHeaderProps {
  title: string;
  description: string;
  onAddCategoryClick: () => void;
}

export interface CategorySearchToolbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  viewMode: CategoryViewMode;
  onViewModeChange: (value: CategoryViewMode) => void;
}

export interface CategoryViewToggleOption {
  value: CategoryViewMode;
  label: string;
  icon: ReactNode;
}

export interface CategoryTableProps {
  items: BakerySubCategoryRecord[];
}

export interface SubCategoryCardGridProps {
  items: BakerySubCategoryRecord[];
}

export interface CategoryActionButtonProps {
  label: string;
  tone: CategoryActionTone;
  icon: ReactNode;
  href?: string;
}

export interface CategoriesPaginationProps {
  pages: number[];
  currentPage: number;
}

export interface SubCategoryCategoryItem {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface SubCategoryListItem {
  id: number;
  slug: string;
  category_id: number;
  title: string;
  description: string;
  image: string | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  products_count: number;
  category: SubCategoryCategoryItem;
}

export interface SubCategoryListPaginationLink {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
}

export interface SubCategoryListData {
  current_page: number;
  data: SubCategoryListItem[];
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  links: SubCategoryListPaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}

export interface SubCategoryListResponse {
  status: string;
  data: SubCategoryListData;
}
