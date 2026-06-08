import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib";
import { viewToggleOptions } from "@/data";
import type { SearchToolbarProps } from "@/interfaces";

export function MenuSearchToolbar({
  searchValue,
  onSearchChange,
  viewMode,
  onViewModeChange,
}: SearchToolbarProps) {
  return (
    <div className="rounded-2xl border border-border/10 bg-bg-creamy/30 p-4 md:p-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <label className="flex h-[52px] w-full items-center gap-3 rounded-full border border-[#d0d5dd] bg-[rgba(251,248,235,0.08)] px-6 text-sm text-gray transition-colors focus-within:border-primary/60 xl:max-w-[455px]">
          <Search className="size-5 text-primary" strokeWidth={2.1} />
          <input
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by menu title..."
            className="w-full bg-transparent font-medium text-dark outline-none placeholder:text-gray"
          />
        </label>

        <div className="inline-flex h-[52px] w-full items-center gap-1.5 rounded-full bg-bg-creamy px-1.5 py-1.5 xl:w-auto">
          {viewToggleOptions.map((option) => {
            const isActive = option.value === viewMode;
            return (
              <Button
                key={option.value}
                type="button"
                variant="ghost"
                onClick={() => onViewModeChange(option.value)}
                className={cn(
                  "inline-flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors xl:flex-none xl:min-w-[92px]",
                  isActive
                    ? "bg-primary text-white shadow-[0_12px_24px_rgba(209,150,40,0.24)]"
                    : "text-muted-text hover:bg-white/70 hover:text-dark",
                )}
              >
                {option.icon}
                <span>{option.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
