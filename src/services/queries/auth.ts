import { AdminSettingsResponse } from "@/interfaces";
import { baseAPI } from "..";

export const authenticatedUserAPI = async () =>
  await baseAPI<AdminSettingsResponse>("GET", "/auth/me");
