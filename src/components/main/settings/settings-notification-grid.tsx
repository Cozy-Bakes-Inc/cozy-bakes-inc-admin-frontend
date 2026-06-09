"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type {
  SettingsNotificationGridProps,
  SettingsNotificationPreference,
} from "@/interfaces/main/settings";
import type {
  SettingsNotificationPreferenceId,
  UpdateNotificationPreferencesPayload,
} from "@/types/main/settings";
import { updateNotificationPreferencesAPI } from "@/services/mutations/settings";
import { SettingsNotificationItem } from "./settings-notification-item";

type NotificationState = Record<SettingsNotificationPreferenceId, boolean>;

function buildInitialState(
  preferences: readonly SettingsNotificationPreference[],
): NotificationState {
  return preferences.reduce<NotificationState>(
    (acc, pref) => {
      acc[pref.id] = pref.enabled;
      return acc;
    },
    {
      "new-orders": false,
      "customer-messages": false,
      "weekly-reports": false,
    },
  );
}

function buildPayload(state: NotificationState): UpdateNotificationPreferencesPayload {
  return {
    new_orders: state["new-orders"] ? 1 : 0,
    customer_messages: state["customer-messages"] ? 1 : 0,
    weekly_reports: state["weekly-reports"] ? 1 : 0,
  };
}

export function SettingsNotificationGrid({
  preferences,
}: SettingsNotificationGridProps) {
  const queryClient = useQueryClient();
  const [state, setState] = useState(() => buildInitialState(preferences));
  const [saving, setSaving] = useState(false);

  async function handleToggle(id: SettingsNotificationPreferenceId) {
    if (saving) return;

    const prevState = state;
    const newState = { ...state, [id]: !state[id] };
    setState(newState);
    setSaving(true);

    const result = await updateNotificationPreferencesAPI(buildPayload(newState));
    setSaving(false);

    if (result?.ok) {
      toast.success(result.message || "Notification preferences updated");
      await queryClient.invalidateQueries({ queryKey: ["adminSettings"] });
      return;
    }

    setState(prevState);
    toast.error(result?.message || "Failed to update notification preferences");
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {preferences.map((preference) => (
        <SettingsNotificationItem
          key={preference.id}
          preference={preference}
          enabled={state[preference.id]}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
}
