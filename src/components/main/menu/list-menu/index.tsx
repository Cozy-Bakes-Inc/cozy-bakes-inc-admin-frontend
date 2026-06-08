"use client";

import { useMemo, useState } from "react";
import { useMenuList } from "@/hooks/api/menu";
import type { ViewMode } from "@/types";
import type { MenuRecord } from "@/interfaces/main/menu";
import { mapMenuToRecord } from "./menu.mapper";
import { MenuHeader } from "./menu-header";
import { MenuSearchToolbar } from "./menu-search-toolbar";
import { MenuTable } from "./menu-table";
import { MenuCardGrid } from "./menu-card-grid";
import { MenuTableShimmer } from "./menu-table-shimmer";
import { MenuCardGridShimmer } from "./menu-card-grid-shimmer";
import { MenuEmptyState } from "./menu-empty-state";

interface MenuListProps {
  onAddMenu: () => void;
  onView: (item: MenuRecord) => void;
  onEdit: (item: MenuRecord) => void;
  onDelete: (item: MenuRecord) => void;
}

export function MenuList({ onAddMenu, onView, onEdit, onDelete }: MenuListProps) {
  const [searchValue, setSearchValue] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("table");

  const { data, isLoading } = useMenuList();

  const allItems = useMemo<MenuRecord[]>(
    () => (data?.data?.data ?? []).map(mapMenuToRecord),
    [data],
  );

  const visibleItems = useMemo(
    () =>
      searchValue.trim()
        ? allItems.filter(
            (item) =>
              item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
              item.description.toLowerCase().includes(searchValue.toLowerCase()),
          )
        : allItems,
    [allItems, searchValue],
  );

  const hasEmptyState = !isLoading && visibleItems.length === 0;

  return (
    <div className="space-y-4 md:space-y-6">
      <MenuHeader onAddMenuClick={onAddMenu} />

      <MenuSearchToolbar
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {isLoading ? (
        viewMode === "table" ? (
          <MenuTableShimmer />
        ) : (
          <MenuCardGridShimmer />
        )
      ) : hasEmptyState ? (
        <MenuEmptyState searchValue={searchValue} />
      ) : viewMode === "table" ? (
        <MenuTable
          items={visibleItems}
          onViewDetails={onView}
          onEditDetails={onEdit}
          onDeleteDetails={onDelete}
        />
      ) : (
        <MenuCardGrid
          items={visibleItems}
          onViewDetails={onView}
          onEditDetails={onEdit}
          onDeleteDetails={onDelete}
        />
      )}
    </div>
  );
}
