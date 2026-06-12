import type { PickupLocationSchemaValues } from "@/schemas";

export interface PickupLocationsAnalytics {
  data: {
    total_shops: number;
    active_shops: number;
    inactive_shops: number;
    active_percentage: number;
  };
}
export interface PickupLocationShop {
  id: number;
  name: string;
  phone_number: string;
  email: string;
  address_line: string;
  is_active: number;
  store_description: string;
  slug: string;
  map_link: string | null;
  latitude: string | null;
  longitude: string | null;
  created_at: string;
  updated_at: string;
}

export interface PickupLocationShopDetails extends PickupLocationShop {
  apt_villa: string;
  building_cluster: string;
  street_landmark: string;
}

export interface ShopListPaginationLink {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
}

export interface ShopListData {
  current_page: number;
  data: PickupLocationShop[];
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  links: ShopListPaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}

export interface PickupListApiResponse {
  status: string;
  message: string;
  data: ShopListData;
}

export interface SinglePickupApiResponse {
  status: string;
  data: PickupLocationShopDetails;
}

export type PickupLocationFormValues = PickupLocationSchemaValues;

export interface PickupLocationMutationPayload {
  name: string;
  phone_number: string;
  email: string;
  address_line: string;
  is_active: number;
  store_description: string;
  map_link?: string;
  latitude?: string;
  longitude?: string;
  apt_villa?: string;
  building_cluster?: string;
  street_landmark?: string;
}
