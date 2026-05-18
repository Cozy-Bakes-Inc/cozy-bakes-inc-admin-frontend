"use server";

import { safeApi } from "..";

export const createProduct = async (payload: FormData) =>
  await safeApi("POST", "/product/create", payload, { isForm: true });

export const updateProduct = async (slug: string, payload: FormData) =>
  await safeApi("POST", `product/${slug}/update`, payload, { isForm: true });

export const deleteProduct = async (slug: string) =>
  await safeApi("DELETE", `/product/${slug}/destroy`);
