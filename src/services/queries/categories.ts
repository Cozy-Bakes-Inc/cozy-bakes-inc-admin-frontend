import { PAGE_SIZE } from "@/constants";
import type { SubCategoryListResponse } from "@/interfaces";
import { baseAPI } from "..";

export const subCategoriesListAPI = async (page: number, search?: string) => {
  const params = new URLSearchParams();

  if (search) {
    params.append("q", search);
  }

  params.append("page", String(page));
  params.append("per_page", String(PAGE_SIZE));

  return await baseAPI<SubCategoryListResponse>(
    "GET",
    `/sub-category/list?${params.toString()}`,
  );
};
