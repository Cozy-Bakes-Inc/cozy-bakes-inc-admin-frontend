import {
  listMenusAPI,
  menuAnalyticsAPI,
  viewMenuAPI,
} from "@/services/queries";
import { useCustomQuery } from "..";

export function useMenuAnalytics() {
  return useCustomQuery(["menu-analytics"], menuAnalyticsAPI);
}

export function useMenuList() {
  return useCustomQuery(["menu-list"], listMenusAPI);
}

export function useMenuView(slug: string) {
  return useCustomQuery(["menu-view", slug], () => viewMenuAPI(slug), {
    enabled: !!slug,
  });
}
