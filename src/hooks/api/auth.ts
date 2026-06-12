import { authenticatedUserAPI } from "@/services/queries";
import { useCustomQuery } from "../useCustomQuery";

export function useAuthenticatedUser() {
  return useCustomQuery(["authenticatedUser"], authenticatedUserAPI, {
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    retry: false,
  });
}
