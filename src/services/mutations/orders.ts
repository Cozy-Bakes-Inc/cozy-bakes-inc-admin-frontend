"use server";

import { safeApi } from "..";
import type { ApiOrderStatus } from "@/types/main/orders";

export interface UpdateOrderStatusPayload {
  status: ApiOrderStatus;
}

export const updateOrderStatusAPI = async (
  orderNo: string,
  payload: UpdateOrderStatusPayload,
) => await safeApi("POST", `/order/${orderNo}/update-status`, payload);
