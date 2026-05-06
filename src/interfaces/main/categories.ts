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
  onViewDetails: (item: BakerySubCategoryRecord) => void;
  onEditDetails: (item: BakerySubCategoryRecord) => void;
  onDeleteDetails: (item: BakerySubCategoryRecord) => void;
}

export interface SubCategoryCardGridProps {
  items: BakerySubCategoryRecord[];
  onViewDetails: (item: BakerySubCategoryRecord) => void;
  onEditDetails: (item: BakerySubCategoryRecord) => void;
  onDeleteDetails: (item: BakerySubCategoryRecord) => void;
}

export interface CategoryActionButtonProps {
  label: string;
  tone: CategoryActionTone;
  icon: ReactNode;
  href?: string;
  onClick?: () => void;
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

export interface SubCategoryDetailsCategory {
  id: number;
  title: string;
}

export interface SubCategoryDetailsItem {
  id: number;
  title: string;
  description: string;
  image: string | null;
  category: SubCategoryDetailsCategory;
}

export interface SubCategoryDetailsResponse {
  status: string;
  data: {
    sub_category: SubCategoryDetailsItem;
  };
}
