import { subCategoriesListAPI } from "@/services/queries";
import { useCustomInfiniteQuery } from "..";

export function useSubCategoriesList(search?: string) {
  return useCustomInfiniteQuery(
    ["sub-categories", search],
    async ({ pageParam = 1 }) => {
      return subCategoriesListAPI(pageParam, search);
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
