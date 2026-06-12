"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";

interface AuthLayoutContentProps {
  children: ReactNode;
}

export function AuthLayoutContent({ children }: AuthLayoutContentProps) {
  const pathname = usePathname();
  const imageSrc =
    pathname === "/forget-password"
      ? "/images/reset-password.png"
      : pathname === "/new-password"
        ? "/images/new-password.png"
        : "/images/login.png";

  return (
    <main className="min-h-svh">
      <section className="mx-auto max-w-360 rounded-[24px] bg-background p-2 sm:p-3">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="rounded-[18px] px-4 py-4 sm:px-8 sm:py-6">
            <div className="mb-6 flex items-center gap-2">
              <div className="relative h-17.5 w-17.5 shrink-0">
                <Image src="/images/logo.png" alt="Cozy Bakes Inc." fill />
              </div>
              <div className="leading-tight">
                <p className="text-lg font-bold text-light-chocolate">
                  Cozy Bakes Inc.
                </p>
                <p className="text-xs font-medium text-[#BB4D00]">By Marwa</p>
              </div>
            </div>

            <div className="mx-auto w-full max-w-xl">{children}</div>
          </div>

          <div className="hidden lg:block relative h-[calc(100svh-16px)] overflow-hidden rounded-[18px] sm:h-[calc(100svh-24px)]">
            <Image
              src={imageSrc}
              alt="Cozy bakes auth visual"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
