import { productListAPI } from "@/services/queries";
import { useCustomInfiniteQuery } from "..";

export function useProductList(search?: string) {
  return useCustomInfiniteQuery(
    ["products", search],
    async ({ pageParam = 1 }) => {
      return productListAPI(pageParam, search);
    },
    {
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const pagination = lastPage?.data;
        if (!pagination) return undefined;
        if (
          pagination.next_page_url &&
          pagination.current_page < pagination.last_page
        ) {
          return pagination.current_page + 1;
        }
        return undefined;
      },
    },
  );
}
