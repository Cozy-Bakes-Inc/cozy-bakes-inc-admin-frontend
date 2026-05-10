import { PAGE_SIZE } from "@/constants";
import type { ProductListResponse } from "@/interfaces";
import { baseAPI } from "..";

export const productListAPI = async (page: number, search?: string) => {
  const params = new URLSearchParams();

  if (search) {
    params.append("search", search);
  }

  params.append("page", String(page));
  params.append("per_page", String(PAGE_SIZE));

  return await baseAPI<ProductListResponse>(
    "GET",
    `/product/list?${params.toString()}`,
  );
};
