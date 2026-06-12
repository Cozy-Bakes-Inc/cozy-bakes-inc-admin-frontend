import type { ReactNode } from "react";
import type {
  SettingsFieldLayout,
  SettingsFieldValueTone,
  SettingsNotificationPreferenceId,
  SettingsSectionIcon,
  SettingsSectionKind,
} from "@/types/main/settings";

export interface SettingsScreenConfig {
  title: string;
  description: string;
  ariaLabel: string;
}

export interface SettingsShellProps {
  children: ReactNode;
}

export interface SettingsHeaderProps {
  title: string;
  description: string;
}

export interface SettingsSectionAction {
  label: string;
  onClick?: () => void;
}

export interface SettingsField {
  id: string;
  label: string;
  value: string;
  layout: SettingsFieldLayout;
  multiline?: boolean;
  valueTone?: SettingsFieldValueTone;
  href?: string;
}

export interface SettingsNotificationPreference {
  id: SettingsNotificationPreferenceId;
  title: string;
  description: string;
  enabled: boolean;
}

interface SettingsSectionBase {
  id: string;
  kind: SettingsSectionKind;
  icon: SettingsSectionIcon;
  title: string;
  description: string;
  action?: SettingsSectionAction;
}

export interface SettingsFieldSection extends SettingsSectionBase {
  kind: "fields";
  fields: readonly SettingsField[];
}

export interface SettingsActionSection extends SettingsSectionBase {
  kind: "action";
}

export interface SettingsNotificationSection extends SettingsSectionBase {
  kind: "notifications";
  preferences: readonly SettingsNotificationPreference[];
}

export type SettingsSection =
  | SettingsFieldSection
  | SettingsActionSection
  | SettingsNotificationSection;

export interface SettingsCanvasProps {
  ariaLabel: string;
  sections: readonly SettingsSection[];
}

export interface SettingsSectionCardProps {
  section: SettingsSection;
}

export interface SettingsSectionHeaderProps {
  icon: SettingsSectionIcon;
  title: string;
  description: string;
  action?: SettingsSectionAction;
}

export interface SettingsFieldGridProps {
  fields: readonly SettingsField[];
}

export interface SettingsFieldCardProps {
  field: SettingsField;
}

export interface SettingsNotificationGridProps {
  preferences: readonly SettingsNotificationPreference[];
}

export interface SettingsNotificationItemProps {
  preference: SettingsNotificationPreference;
  enabled: boolean;
  onToggle: (id: SettingsNotificationPreferenceId) => void;
}

export interface AdminSettingsUserData {
  slug: string;
  first_name: string;
  last_name: string;
  email: string;
  profile: AdminSettingsUserProfileData | null;
}

export interface AdminSettingsUserProfileData {
  id: number;
  user_id: string;
  phone_number: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  created_at: string;
  updated_at: string;
}

export interface AdminSettingsShopData {
  id: number;
  slug: string;
  store_description: string;
  name: string;
  phone_number: string;
  email: string;
  address_line: string;
  is_active: number | string;
  latitude?: number | null;
  longitude?: number | null;
  apt_villa?: string | null;
  building_cluster?: string | null;
  street_landmark?: string | null;
  map_link?: string | null;
}

export interface AdminNotificationPreferencesData {
  id: number;
  new_orders: number | string;
  customer_messages: number | string;
  weekly_reports: number | string;
  created_at: string;
  updated_at: string;
}

export interface AdminDeliverySettingsData {
  fee: number | string;
  miles: number | string;
  is_active?: number | string;
}

export interface AdminSettingsData {
  user: AdminSettingsUserData | null;
  shop: AdminSettingsShopData | null;
  notification_preferences: AdminNotificationPreferencesData | null;
  delivery_fee?: AdminDeliverySettingsData | null;
  delivery_settings?: AdminDeliverySettingsData | null;
}

export interface AdminSettingsResponse {
  status: string;
  message?: string;
  data: AdminSettingsData;
}
