import {
  customersListAPI,
  customersOverviewStatsAPI,
  customersPerformanceOverviewStatsAPI,
  singleCustomerAPI,
} from "@/services/queries";
import type { CustomerSortOption } from "@/types/main/customers";
import { useCustomInfiniteQuery, useCustomQuery } from "..";

export function useCustomersOverviewStats() {
  return useCustomQuery(["customersOverviewStats"], customersOverviewStatsAPI);
}

export function useCustomersPerformanceOverviewStats() {
  return useCustomQuery(
    ["customersPerformanceOverviewStats"],
    customersPerformanceOverviewStatsAPI,
  );
}

export function useCustomersList(
  tab: string = "all",
  sort: CustomerSortOption = "newest",
) {
  return useCustomInfiniteQuery(
    ["customers-list", tab, sort],
    async ({ pageParam = 1 }) => {
      return customersListAPI(tab, pageParam, sort);
    },
    {
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const pagination = lastPage?.data?.customers;
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

export function useSingleCustomer(slug: string) {
  return useCustomQuery(
    ["singleCustomer", slug],
    () => singleCustomerAPI(slug),
    { enabled: Boolean(slug) },
  );
}
