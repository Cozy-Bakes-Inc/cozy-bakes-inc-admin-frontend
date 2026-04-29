export interface AuthenticatedUserProfile {
  id: number;
  user_id: string;
  phone_number: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  created_at: string;
  updated_at: string;
}

export interface AuthenticatedUser {
  slug: string;
  first_name: string;
  last_name: string;
  email: string;
  profile: AuthenticatedUserProfile | null;
}

export interface AuthenticatedUserShop {
  id: number;
  slug: string;
  store_description: string;
  name: string;
  phone_number: string;
  email: string;
  address_line: string;
  is_active: number | string;
}

export interface AuthenticatedUserData {
  user: AuthenticatedUser | null;
  shop: AuthenticatedUserShop | null;
}

export interface AuthenticatedUserResponse {
  status: string;
  message?: string;
  data: AuthenticatedUserData;
}
