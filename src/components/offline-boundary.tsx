"use client";

import { ReactNode, useEffect, useState } from "react";
import { WifiOff } from "lucide-react";

interface OfflineBoundaryProps {
  children: ReactNode;
}

function OfflineBoundary({ children }: OfflineBoundaryProps) {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    updateOnlineStatus();

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  if (isOnline) {
    return children;
  }

  return (
    <main className="fixed inset-0 z-[9999] flex min-h-dvh items-center justify-center bg-bg-creamy px-6 text-center">
      <section className="flex max-w-md flex-col items-center gap-5">
        <div className="flex size-18 items-center justify-center rounded-full border border-market-outline bg-white text-primary shadow-sm">
          <WifiOff className="size-8" strokeWidth={1.8} aria-hidden="true" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-chocolate">
            You are offline
          </h1>
          <p className="text-base leading-7 text-muted-text">
            Check your network or internet connection.
          </p>
        </div>
      </section>
    </main>
  );
}

export default OfflineBoundary;
