import {
  saleOverviewChartAPI,
  summaryDataSetsAPI,
  topProductsAPI,
} from "@/services/queries";
import { useCustomInfiniteQuery, useCustomQuery } from "..";

export function useSummaryDataSets() {
  return useCustomQuery(["summary-data-sets"], summaryDataSetsAPI);
}

export function useSaleOverviewChart() {
  return useCustomQuery(["sale-overview-chart"], saleOverviewChartAPI);
}

export function useTopProducts() {
  return useCustomInfiniteQuery(
    ["top-products"],
    async ({ pageParam = 1 }) => {
      return topProductsAPI(pageParam);
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
