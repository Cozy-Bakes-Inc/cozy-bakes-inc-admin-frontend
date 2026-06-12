import { subCategoriesListAPI, subCategoryAPI } from "@/services/queries";
import { useCustomInfiniteQuery, useCustomQuery } from "..";

export function useSubCategoriesList(page: number, search?: string) {
  return useCustomQuery(["sub-categories", page, search], () =>
    subCategoriesListAPI(page, search),
  );
}

export function useInfiniteSubCategoriesList(search?: string) {
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

export function useSubCategory(slug: string) {
  return useCustomQuery(["sub-category", slug], () => subCategoryAPI(slug), {
    enabled: !!slug,
  });
}
