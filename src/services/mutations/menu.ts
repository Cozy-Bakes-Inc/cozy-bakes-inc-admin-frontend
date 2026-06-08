"use server";

import { safeApi } from "..";

export const createMenuAPI = async (payload: FormData) =>
  await safeApi("POST", "/menu/create", payload, { isForm: true });

export const updateMenuAPI = async (slug: string, payload: FormData) =>
  await safeApi("POST", `/menu/${slug}/update`, payload, { isForm: true });

export const deleteMenuAPI = async (slug: string) =>
  await safeApi("DELETE", `/menu/${slug}/delete`);
