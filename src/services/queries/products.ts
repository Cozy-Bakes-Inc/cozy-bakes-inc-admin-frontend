import { PAGE_SIZE } from "@/constants";
import type { ProductListResponse, SingleProductResponse } from "@/interfaces";
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

export const singleProductAPI = async (slug: string) =>
  await baseAPI<SingleProductResponse>(
    "GET",
    `/product/${slug}/view`,
  );
