"use server";

import { safeApi } from "..";

export const createSubCategoryAPI = async (payload: FormData) =>
  await safeApi("POST", "/sub-category/create", payload, { isForm: true });

export const updateSubCategoryAPI = async (slug: string, payload: FormData) =>
  await safeApi("POST", `/sub-category/${slug}/update`, payload, {
    isForm: true,
  });

export const deleteSubCategoryAPI = async (slug: string) =>
  await safeApi("POST", `/sub-category/${slug}/delete`);
