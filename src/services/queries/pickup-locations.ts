import { PAGE_SIZE } from "@/constants";
import { baseAPI } from "..";

// export const shopAnalyticsAPI = async () =>
//   await baseAPI<>("GET", `/shop/analytics`);

// export const shopListAPI = async (
//   page: number,
//   search?: string,
//   is_active?: number,
// ) => {
//   const params = new URLSearchParams();

//   if (search) {
//     params.append("q", search);
//   }

//   if (is_active !== undefined) {
//     params.append("is_active", String(is_active));
//   }

//   params.append("page", String(page));
//   params.append("per_page", String(PAGE_SIZE));

//   return await baseAPI(
//     "GET",
//     `/shop/list?${params.toString()}`,
//   );
// };
// export const singleShopAPI = async (slug: string) =>
//   await baseAPI<>("GET", `/shop/${slug}/view`);
