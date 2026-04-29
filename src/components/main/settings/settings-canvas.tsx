"use client";

import { Shimmer } from "@/components/ui/shimmer";
import type {
  AdminSettingsData,
  SettingsCanvasProps,
  SettingsFieldSection,
  SettingsSection,
} from "@/interfaces/main/settings";
import { useAdminSettings } from "@/hooks/api";
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
): SettingsSection[] {
  const passwordSection = sections.find(
    (section) => section.id === "change-password",
  );
  const user = settingsData?.user;
  const profile = user?.profile;
  const shop = settingsData?.shop;

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
    {
      id: "profile-phone-number",
      label: "Phone Number",
      value: profile?.phone_number ?? "",
      layout: "half",
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
    },
    fields: accountFields,
  };

  return [
    storeSection,
    accountSection,
    ...(passwordSection ? [passwordSection] : []),
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
            <Shimmer className="h-[58px] w-full rounded-lg" />
          </div>
          <div className="space-y-2">
            <Shimmer className="h-5 w-24 rounded-md" />
            <Shimmer className="h-[58px] w-full rounded-lg" />
          </div>
          <div className="space-y-2">
            <Shimmer className="h-5 w-24 rounded-md" />
            <Shimmer className="h-[58px] w-full rounded-lg" />
          </div>
        </div>
      </div>
    </article>
  );
}

export function SettingsCanvas({ ariaLabel, sections }: SettingsCanvasProps) {
  const { data, isLoading } = useAdminSettings();
  const settingsData = data?.data;
  const resolvedSections = buildResolvedSections(sections, settingsData);

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
    <section aria-label={ariaLabel} className="space-y-4">
      {resolvedSections.map((section) => (
        <SettingsSectionCard key={section.id} section={section} />
      ))}
    </section>
  );
}
