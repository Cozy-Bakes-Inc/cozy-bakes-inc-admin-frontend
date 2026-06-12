import {
  customersListAPI,
  customersOverviewStatsAPI,
  customersPerformanceOverviewStatsAPI,
  singleCustomerAPI,
} from "@/services/queries";
import type { CustomerSortOption } from "@/types/main/customers";
import { useCustomQuery } from "..";

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
  page: number,
  tab: string = "all",
  sort: CustomerSortOption = "newest",
) {
  return useCustomQuery(["customers-list", page, tab, sort], () =>
    customersListAPI(tab, page, sort),
  );
}

export function useSingleCustomer(slug: string) {
  return useCustomQuery(
    ["singleCustomer", slug],
    () => singleCustomerAPI(slug),
    { enabled: Boolean(slug) },
  );
}
