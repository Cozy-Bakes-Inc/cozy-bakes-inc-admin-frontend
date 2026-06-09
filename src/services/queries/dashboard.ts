import {
  DashboardChartsApiResponse,
  DashboardSummaryApiResponse,
  DashboardTopProductsApiResponse,
} from "@/interfaces";
import { baseAPI } from "..";
import { PAGE_SIZE } from "@/constants";

export const summaryDataSetsAPI = async () =>
  await baseAPI<DashboardSummaryApiResponse>("GET", "/dashboard/summary");

export const saleOverviewChartAPI = async () =>
  await baseAPI<DashboardChartsApiResponse>(
    "GET",
    "/dashboard/sale-overview-chart",
  );

export const topProductsAPI = async (page: number) =>
  await baseAPI<DashboardTopProductsApiResponse>(
    "GET",
    `/product/top-products?sort_by=revenue&page=${page}&per_page=${PAGE_SIZE}`,
  );
