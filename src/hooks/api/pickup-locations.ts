import {
  shopAnalyticsAPI,
  shopListAPI,
  singleShopAPI,
} from "@/services/queries";
import { useCustomQuery } from "..";

export function usePickupAnalytics() {
  return useCustomQuery(["pickup-analytics"], shopAnalyticsAPI);
}

export function usePickupList(
  page: number,
  search?: string,
  is_active?: number,
) {
  return useCustomQuery(["pickup-locations", page, search, is_active], () =>
    shopListAPI(page, search, is_active),
  );
}

export function useSingleShop(shopId: string) {
  return useCustomQuery(
    ["pickup-location", shopId],
    () => singleShopAPI(shopId),
    {
      enabled: !!shopId,
    },
  );
}
