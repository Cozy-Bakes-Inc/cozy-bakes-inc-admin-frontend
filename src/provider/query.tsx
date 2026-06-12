"use client";

import { ReactNode, useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import OfflineBoundary from "@/components/offline-boundary";
import { getQueryClient, handleUnauthorizedSession } from "@/lib";
import { registerUnauthorizedHandler } from "@/services";

interface IProps {
  children: ReactNode;
}
function QueryProvider({ children }: IProps) {
  const queryClient = getQueryClient();

  useEffect(() => {
    registerUnauthorizedHandler(handleUnauthorizedSession);

    return () => {
      registerUnauthorizedHandler(null);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <OfflineBoundary>{children}</OfflineBoundary>
    </QueryClientProvider>
  );
}

export default QueryProvider;
