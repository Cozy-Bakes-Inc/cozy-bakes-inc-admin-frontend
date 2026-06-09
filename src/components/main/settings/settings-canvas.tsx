"use client";

import { useState } from "react";
import { Shimmer } from "@/components/ui/shimmer";
import type {
  AdminSettingsData,
  SettingsCanvasProps,
  SettingsFieldSection,
  SettingsNotificationSection,
  SettingsSection,
} from "@/interfaces/main/settings";
import { useAdminSettings } from "@/hooks/api";
import { UpdateAccountDialog } from "./update-account/update-account-dialog";
import { UpdateCompanyDialog } from "./update-company/update-company-dialog";
import { UpdateDeliveryDialog } from "./update-delivery/update-delivery-dialog";
import { ChangePasswordDialog } from "./change-password/change-password-dialog";
import { SettingsSectionCard } from "./settings-section-card";

function hasValue(value: string | null | undefined) {
  return Boolean(value && value.trim().length > 0);
}

function hasFieldValues(fields: readonly { value: string }[]) {
  return fields.some((field) => hasValue(field.value));
}

function buildResolvedSections(
  sections: readonly SettingsSection[],
  settingsData?: AdminSettingsData,
  onEditCompany?: () => void,
  onEditAccount?: () => void,
  onEditDelivery?: () => void,
  onChangePassword?: () => void,
): SettingsSection[] {
  const passwordSection = sections.find(
    (section) => section.id === "change-password",
  );
  const user = settingsData?.user;
  const shop = settingsData?.shop;
  const delivery = settingsData?.delivery_settings;

  const storeFields: SettingsFieldSection["fields"] = [
    {
      id: "store-name",
      label: "Store Name",
      value: shop?.name ?? "",
      layout: "full",
      valueTone: "md",
    },
    {
      id: "store-description",
      label: "Store Description",
      value: shop?.store_description ?? "",
      layout: "full",
      multiline: true,
      valueTone: "md",
    },
    {
      id: "contact-email",
      label: "Contact Email",
      value: shop?.email ?? "",
      layout: "half",
      valueTone: "sm",
    },
    {
      id: "phone-number",
      label: "Phone Number",
      value: shop?.phone_number ?? "",
      layout: "half",
      valueTone: "sm",
    },
    {
      id: "store-location",
      label: "Store Location",
      value: shop?.address_line ?? "",
      layout: "full",
      valueTone: "sm",
    },
    {
      id: "map-link",
      label: "Map Link",
      value: shop?.map_link ?? "",
      layout: "full",
      valueTone: "sm",
      href: shop?.map_link ?? undefined,
    },
  ];
  const hasStoreValues = hasFieldValues(storeFields);

  const storeSection: SettingsFieldSection = {
    id: "store-information",
    kind: "fields",
    icon: "store",
    title: "Store Information",
    description: "management your store information",
    action: {
      label: hasStoreValues ? "Edit Store Information" : "Add Store Information",
      onClick: onEditCompany,
    },
    fields: storeFields,
  };

  const accountFields: SettingsFieldSection["fields"] = [
    {
      id: "first-name",
      label: "First Name",
      value: user?.first_name ?? "",
      layout: "half",
      valueTone: "sm",
    },
    {
      id: "last-name",
      label: "Last Name",
      value: user?.last_name ?? "",
      layout: "half",
      valueTone: "sm",
    },
    {
      id: "email-address",
      label: "Email Address",
      value: user?.email ?? "",
      layout: "full",
      valueTone: "sm",
    },
  ];
  const hasAccountValues = hasFieldValues(accountFields);

  const accountSection: SettingsFieldSection = {
    id: "account-information",
    kind: "fields",
    icon: "account",
    title: "Account Information",
    description: "management your account information",
    action: {
      label: hasAccountValues
        ? "Edit Account Information"
        : "Add Account Information",
      onClick: onEditAccount,
    },
    fields: accountFields,
  };

  const deliveryFields: SettingsFieldSection["fields"] = [
    {
      id: "delivery-fee",
      label: "Delivery Fee ($)",
      value: delivery?.fee != null ? String(delivery.fee) : "",
      layout: "half",
      valueTone: "sm",
    },
    {
      id: "delivery-miles",
      label: "Delivery Radius (miles)",
      value: delivery?.miles != null ? String(delivery.miles) : "",
      layout: "half",
      valueTone: "sm",
    },
  ];
  const hasDeliveryValues = hasFieldValues(deliveryFields);

  const deliverySection: SettingsFieldSection = {
    id: "delivery-settings",
    kind: "fields",
    icon: "delivery",
    title: "Delivery Settings",
    description: "Manage your delivery fee and radius",
    action: {
      label: hasDeliveryValues ? "Edit Delivery Settings" : "Add Delivery Settings",
      onClick: onEditDelivery,
    },
    fields: deliveryFields,
  };

  const notifPrefs = settingsData?.notification_preferences;
  const notificationSection: SettingsNotificationSection = {
    id: "notification-preferences",
    kind: "notifications",
    icon: "notification",
    title: "Notification Preferences",
    description: "Manage how you receive notifications",
    preferences: [
      {
        id: "new-orders",
        title: "New Orders",
        description: "Get notified when a new order is placed",
        enabled: Number(notifPrefs?.new_orders ?? 0) === 1,
      },
      {
        id: "customer-messages",
        title: "Customer Messages",
        description: "Receive alerts for new customer messages",
        enabled: Number(notifPrefs?.customer_messages ?? 0) === 1,
      },
      {
        id: "weekly-reports",
        title: "Weekly Reports",
        description: "Receive a weekly summary of orders and revenue",
        enabled: Number(notifPrefs?.weekly_reports ?? 0) === 1,
      },
    ],
  };

  const resolvedPasswordSection: SettingsSection | undefined = passwordSection
    ? ({ ...passwordSection, action: { ...passwordSection.action, onClick: onChangePassword } } as SettingsSection)
    : undefined;

  return [
    storeSection,
    accountSection,
    deliverySection,
    notificationSection,
    ...(resolvedPasswordSection ? [resolvedPasswordSection] : []),
  ];
}

function SettingsSectionCardSkeleton() {
  return (
    <article className="rounded-2xl border-2 border-white/15 bg-[rgba(250,248,243,0.32)] p-4 shadow-[0_1px_0_rgba(255,255,255,0.06)_inset]">
      <div className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <Shimmer className="size-10 rounded-lg" />
            <div className="space-y-2">
              <Shimmer className="h-5 w-44 rounded-md" />
              <Shimmer className="h-4 w-56 rounded-md" />
            </div>
          </div>
          <Shimmer className="h-10 w-44 rounded-full" />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <Shimmer className="h-5 w-28 rounded-md" />
            <Shimmer className="h-14.5 w-full rounded-lg" />
          </div>
          <div className="space-y-2">
            <Shimmer className="h-5 w-24 rounded-md" />
            <Shimmer className="h-14.5 w-full rounded-lg" />
          </div>
          <div className="space-y-2">
            <Shimmer className="h-5 w-24 rounded-md" />
            <Shimmer className="h-14.5 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </article>
  );
}

export function SettingsCanvas({ ariaLabel, sections }: SettingsCanvasProps) {
  const [companyDialogOpen, setCompanyDialogOpen] = useState(false);
  const [accountDialogOpen, setAccountDialogOpen] = useState(false);
  const [deliveryDialogOpen, setDeliveryDialogOpen] = useState(false);
  const [changePasswordDialogOpen, setChangePasswordDialogOpen] = useState(false);
  const { data, isLoading } = useAdminSettings();
  const settingsData = data?.data;
  const resolvedSections = buildResolvedSections(
    sections,
    settingsData,
    () => setCompanyDialogOpen(true),
    () => setAccountDialogOpen(true),
    () => setDeliveryDialogOpen(true),
    () => setChangePasswordDialogOpen(true),
  );

  if (isLoading) {
    return (
      <section aria-label={ariaLabel} className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <SettingsSectionCardSkeleton key={index} />
        ))}
      </section>
    );
  }

  return (
    <>
      <section aria-label={ariaLabel} className="space-y-4">
        {resolvedSections.map((section) => (
          <SettingsSectionCard key={section.id} section={section} />
        ))}
      </section>

      <UpdateCompanyDialog
        open={companyDialogOpen}
        shop={settingsData?.shop ?? null}
        onClose={() => setCompanyDialogOpen(false)}
      />

      <UpdateAccountDialog
        open={accountDialogOpen}
        user={settingsData?.user ?? null}
        onClose={() => setAccountDialogOpen(false)}
      />

      <UpdateDeliveryDialog
        open={deliveryDialogOpen}
        delivery={settingsData?.delivery_settings}
        onClose={() => setDeliveryDialogOpen(false)}
      />

      <ChangePasswordDialog
        open={changePasswordDialogOpen}
        onClose={() => setChangePasswordDialogOpen(false)}
      />
    </>
  );
}
