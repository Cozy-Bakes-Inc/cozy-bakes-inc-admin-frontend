import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib";

interface PickupLocationsToolbarProps {
  searchValue: string;
  activeFilter: number | undefined;
  onSearchChange: (value: string) => void;
  onActiveFilterChange: (value: number | undefined) => void;
}

const filterOptions = [
  { label: "All", value: undefined },
  { label: "Active", value: 1 },
  { label: "Inactive", value: 0 },
] as const;

export function PickupLocationsToolbar({
  searchValue,
  activeFilter,
  onSearchChange,
  onActiveFilterChange,
}: PickupLocationsToolbarProps) {
  return (
    <div className="rounded-2xl border border-border/10 bg-bg-creamy/30 p-4 md:p-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <label className="flex h-[52px] w-full items-center gap-3 rounded-full border border-[#d0d5dd] bg-[rgba(251,248,235,0.08)] px-6 text-sm text-gray transition-colors focus-within:border-primary/60 xl:max-w-[455px]">
          <Search className="size-5 text-primary" strokeWidth={2.1} />
          <input
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search pickup locations..."
            className="w-full bg-transparent font-medium text-dark outline-none placeholder:text-gray"
          />
        </label>

        <div className="inline-flex h-[52px] w-full items-center gap-1.5 rounded-full bg-bg-creamy px-1.5 py-1.5 sm:w-fit">
          {filterOptions.map((option) => {
            const isActive = option.value === activeFilter;

            return (
              <Button
                key={option.label}
                type="button"
                variant="ghost"
                onClick={() => onActiveFilterChange(option.value)}
                className={cn(
                  "inline-flex flex-1 items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold transition-colors sm:flex-none sm:min-w-[92px]",
                  isActive
                    ? "bg-primary text-white shadow-[0_12px_24px_rgba(209,150,40,0.24)]"
                    : "text-muted-text hover:bg-white/70 hover:text-dark",
                )}
              >
                {option.label}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
