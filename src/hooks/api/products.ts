import { productListAPI, singleProductAPI } from "@/services/queries";
import { useCustomQuery } from "..";

export function useProductList(page: number, search?: string) {
  return useCustomQuery(["products", page, search], () =>
    productListAPI(page, search),
  );
}

export function useProduct(slug: string) {
  return useCustomQuery(["product", slug], () => singleProductAPI(slug), {
    enabled: !!slug,
  });
}
