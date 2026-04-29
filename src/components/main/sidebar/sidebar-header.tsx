"use client";

import { sidebarProfile } from "@/data";
import { Button } from "@/components/ui/button";
import { HeaderBellIcon, HeaderMenuIcon } from "./sidebar-icons";

type SidebarHeaderProps = {
  currentLabel: string;
  onOpenMobileMenu: () => void;
};

export function SidebarHeader({
  currentLabel,
  onOpenMobileMenu,
}: SidebarHeaderProps) {
  return (
    <header className="border-b border-primary/15 bg-background/90 px-4 py-3 backdrop-blur md:px-6 xl:px-8">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onOpenMobileMenu}
            className="inline-flex size-10 items-center justify-center rounded-full border border-primary/70 bg-bg-creamy text-primary md:hidden"
            aria-label="Open sidebar"
          >
            <HeaderMenuIcon />
          </Button>

          <div className="md:hidden">
            <p className="truncate text-base font-semibold text-chocolate">
              {currentLabel}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 rounded-full border border-primary/70 bg-bg-creamy/60 px-1 py-1 sm:pr-2 sm:pl-1">
          <div className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white shadow-[0_2px_8px_rgba(209,150,40,0.25)]">
            {sidebarProfile.initials}
          </div>
          <div className="hidden min-w-0 sm:block">
            <p className="truncate text-sm font-semibold leading-4 text-chocolate">
              {sidebarProfile.name}
            </p>
            <p className="truncate text-xs leading-4 text-muted-text">
              {sidebarProfile.role}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
