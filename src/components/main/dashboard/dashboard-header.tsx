import Link from "next/link";
import { Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardHeader() {
  return (
    <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-[24px] font-bold tracking-[-0.03em] text-dark md:text-[30px]">
          Dashboard Overview
        </h1>
        <p className="mt-1 text-xs font-medium text-gray md:text-sm">
          Welcome back, Marwa! Here&apos;s what&apos;s happening today.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button
          asChild
          className="h-10 rounded-full bg-primary px-5 text-xs font-semibold text-white hover:bg-primary/90 md:text-sm"
        >
          <Link href="/products?addProduct=1">
            <Plus className="size-4" />
            Add Product
          </Link>
        </Button>

        <Button
          asChild
          variant="outline"
          className="h-10 rounded-full border-primary/20 bg-bg-creamy px-5 text-xs font-semibold text-primary hover:bg-primary/10 hover:text-primary md:text-sm"
        >
          <Link href="/orders">
            <ShoppingBag className="size-4" />
            View Orders
          </Link>
        </Button>
      </div>
    </header>
  );
}
