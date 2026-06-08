"use server";

import { safeApi } from "..";

export const createShop = async (payload: unknown) =>
  await safeApi("POST", "/shop/create", payload);

export const updateShop = async (slug: string, payload: unknown) =>
  await safeApi("POST", `/shop/${slug}/update`, payload);

export const deleteShop = async (slug: string) =>
  await safeApi("DELETE", `/shop/${slug}/delete`);
