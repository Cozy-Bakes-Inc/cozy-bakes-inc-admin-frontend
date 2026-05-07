"use server";

import { safeApi } from "..";

export const createProduct = async (payload: FormData) =>
  await safeApi("POST", "/product/create", payload, { isForm: true });
