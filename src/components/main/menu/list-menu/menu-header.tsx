import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface MenuHeaderProps {
  onAddMenuClick: () => void;
}

export function MenuHeader({ onAddMenuClick }: MenuHeaderProps) {
  return (
    <header className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
      <div className="space-y-0.5">
        <h1 className="text-[28px] font-bold tracking-[-0.03em] text-dark md:text-[32px]">
          Menu Management
        </h1>
        <p className="text-sm font-medium text-gray md:text-base">
          Organize and manage your bakery menus and PDF files
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button
          type="button"
          variant="ghost"
          onClick={onAddMenuClick}
          className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
        >
          <Plus className="size-4" strokeWidth={2.4} />
          <span>Add Menu</span>
        </Button>
      </div>
    </header>
  );
}
