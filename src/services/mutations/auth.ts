"use server";

import { AuthResponse } from "@/types";
import { safeApi } from "..";
import {
  LoginSchemaValues,
  ResetPasswordSchemaValues,
  ResendOtpSchemaValues,
  VerifyOtpSchemaValues,
} from "@/schemas";

export const loginAPI = async (payload: LoginSchemaValues) =>
  await safeApi<AuthResponse>("POST", "/login", payload);

export const sendOrResendOtpAPI = async (payload: ResendOtpSchemaValues) =>
  await safeApi("POST", "/resend-otp", payload);

export const verifyOtpAPI = async (payload: VerifyOtpSchemaValues) =>
  await safeApi<AuthResponse>("POST", "/verify-otp", payload);

export const resetPasswordAPI = async (payload: ResetPasswordSchemaValues) =>
  await safeApi("POST", "/reset-password", payload);

export const logoutAPI = async () => await safeApi("POST", "/logout");
