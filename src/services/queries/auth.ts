
import { AuthenticatedUserResponse } from "@/interfaces";
import { baseAPI } from "..";

export const authenticatedUserAPI = async () =>
  await baseAPI<AuthenticatedUserResponse>("GET", "/auth/me");
