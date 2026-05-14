export interface ProductListPaginationLink {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
}

export interface ProductListCategory {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProductListSubCategory {
  id: number;
  slug: string;
  category_id: number | null;
  title: string;
  description: string;
  image: string | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  pivot: {
    product_id: number;
    sub_category_id: number;
  };
  category: ProductListCategory | null;
}

export interface ProductListPrice {
  id: number;
  type: string;
  product_id: number;
  label: string;
  quantity: number;
  price: string;
  meta: unknown | null;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface ProductSubCategoryPivot {
  product_id: number;
  sub_category_id: number;
}

export interface ProductSubCategoryCategory {
  id: number;
  slug: string;
  category_id: number | null;
  title: string;
  description: string;
  image: string | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProductSubCategory {
  id: number;
  slug: string;
  category_id: number | null;
  title: string;
  description: string;
  image: string | null;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  pivot: ProductSubCategoryPivot;
  category: ProductSubCategoryCategory | null;
}

export interface ProductPriceItem {
  id: number;
  type: string;
  product_id: number;
  label: string;
  quantity: number | string | null;
  price: string;
  meta: unknown | null;
  slug: string;
  created_at: string;
  updated_at: string;
}

export type ProductPrices = Record<string, ProductPriceItem[]>;

export interface SingleProduct {
  slug: string;
  title: string;
  description: string;
  description_ingredient: string;
  description_allergens: string | null;
  flavors: string[];
  status: number | string;
  sub_category: ProductSubCategory | null;
  images: string[];
  prices: ProductPrices;
}

export interface SingleProductResponse {
  status: string;
  data: SingleProduct;
}

export interface ProductListItem {
  slug: string;
  title: string;
  description: string;
  description_ingredient: string;
  status: number;
  sub_category: ProductListSubCategory;
  images: string[];
  flavors: string[];
  prices: Record<string, ProductListPrice[]>;
  created_at: string;
}

export interface ProductListData {
  current_page: number;
  data: ProductListItem[];
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  links: ProductListPaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}

export interface ProductListResponse {
  status: string;
  data: ProductListData;
}

export interface ProductRecord {
  slug: string;
  name: string;
  description: string;
  ingredients: string;
  status: number;
  subCategoryName: string;
  categoryName: string;
  coverImage: string;
  flavors: string[];
  prices: Record<string, ProductListPrice[]>;
  createdAt: string;
}
