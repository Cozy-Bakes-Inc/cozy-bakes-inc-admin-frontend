import { sidebarSignOutLabel } from "@/data";
import { Button } from "@/components/ui/button";
import { cn, handleLogoutSession } from "@/lib/utils";
import { SidebarLogoutIcon } from "./sidebar-icons";
import { logoutAPI } from "@/services/mutations";

type SidebarSignOutProps = {
  compact?: boolean;
};

export function SidebarSignOut({ compact = false }: SidebarSignOutProps) {
  const handleLogout = async () => {
    await logoutAPI();
    await handleLogoutSession();
  };
  return (
    <div className="shrink-0 border-t border-primary/15 p-4">
      <Button
        onClick={handleLogout}
        type="button"
        variant="ghost"
        className={cn(
          "flex w-full items-center justify-center bg-red-600 font-medium text-white transition-transform hover:scale-[0.99] hover:bg-[#ff1010]/90",
          compact ? "h-12 rounded-[14px] px-0" : "h-12 rounded-lg px-5",
        )}
        title={compact ? sidebarSignOutLabel : undefined}
      >
        <SidebarLogoutIcon className="shrink-0" />
        <span className={cn("ml-2", compact ? "hidden" : "inline")}>
          {sidebarSignOutLabel}
        </span>
      </Button>
    </div>
  );
}
