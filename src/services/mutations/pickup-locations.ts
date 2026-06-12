"use server";

import { safeApi } from "..";
import type { PickupLocationMutationPayload } from "@/types/main";

export const createShop = async (payload: PickupLocationMutationPayload) =>
  await safeApi("POST", "/shop/create", payload);

export const updateShop = async (
  slug: string,
  payload: Partial<PickupLocationMutationPayload>,
) =>
  await safeApi("POST", `/shop/${slug}/update`, payload);

export const deleteShop = async (slug: string) =>
  await safeApi("DELETE", `/shop/${slug}/delete`);
