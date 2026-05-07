import { PAGE_SIZE } from "@/constants";
import { baseAPI } from "..";

export const subCategoriesListAPI = async (page: number, search?: string) => {
  const params = new URLSearchParams();

  if (search) {
    params.append("search", search);
  }

  params.append("page", String(page));
  params.append("per_page", String(PAGE_SIZE));

  return await baseAPI(
    "GET",
    `/product/list?${params.toString()}`,
  );
};
