export type SettingsSectionIcon =
  | "store"
  | "account"
  | "password"
  | "notification"
  | "delivery";

export type SettingsSectionKind = "fields" | "action" | "notifications";

export type SettingsFieldLayout = "full" | "half";

export type SettingsFieldValueTone = "sm" | "md";

export type SettingsNotificationPreferenceId =
  | "new-orders"
  | "customer-messages"
  | "weekly-reports";

export type UpdateNotificationPreferencesPayload = {
  new_orders: 0 | 1;
  customer_messages: 0 | 1;
  weekly_reports: 0 | 1;
};
