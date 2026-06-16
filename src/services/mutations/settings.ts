"use server";

import {
  UpdateCompanySettingsSchemaValues,
  UpdateDeliverySettingsSchemaValues,
  UpdateProfileSchemaValues,
} from "@/schemas";
import type { UpdateNotificationPreferencesPayload } from "@/types/main/settings";
import { safeApi } from "..";

export const updateProfileAPI = async (payload: Partial<UpdateProfileSchemaValues>) =>
  await safeApi("POST", "/profile/update", payload);

export const updateDeliverySettingsAPI = async (
  payload: Partial<UpdateDeliverySettingsSchemaValues>,
) => await safeApi("POST", "/setting/delivery/update", payload);

export const updateCompanySettingsAPI = async (
  payload: Partial<UpdateCompanySettingsSchemaValues>,
) => await safeApi("POST", "/setting/company-update", payload);

export const updateNotificationPreferencesAPI = async (
  payload: UpdateNotificationPreferencesPayload,
) => await safeApi("POST", "/notification-preference/update", payload);
