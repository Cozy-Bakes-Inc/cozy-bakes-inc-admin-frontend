import { baseAPI } from "..";
import type { MenuAnalyticsApiResponse, MenuListApiResponse, MenuViewApiResponse } from "@/types/main/menu";

export const menuAnalyticsAPI = async () =>
  await baseAPI<MenuAnalyticsApiResponse>("GET", "/menu/analytics");

export const listMenusAPI = async () =>
  await baseAPI<MenuListApiResponse>("GET", "/menu/list");

export const viewMenuAPI = async (slug: string) =>
  await baseAPI<MenuViewApiResponse>("GET", `/menu/${slug}/view`);
