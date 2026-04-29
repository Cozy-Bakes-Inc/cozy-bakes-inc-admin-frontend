"use client";

import { useMemo, useState } from "react";
import {
  bakeryCategoryDetails,
  bakerySubCategories,
  categoryPagination,
} from "@/data/main/categories";
import type { CategoryViewMode } from "@/types/main/categories";
import { CategoriesPagination } from "./categories-pagination";
import { CategoriesEmptyState } from "./categories-empty-state";
import { CategoryHeader } from "./category-header";
import { CategorySearchToolbar } from "./category-search-toolbar";
import { CategoryTable } from "./category-table";
import { SubCategoryCardGrid } from "./subcategory-card-grid";

function Categories() {
  const [searchValue, setSearchValue] = useState("");
  const [viewMode, setViewMode] = useState<CategoryViewMode>("table");

  const visibleItems = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();

    if (!normalizedSearch) {
      return bakerySubCategories;
    }

    return bakerySubCategories.filter((item) => {
      return (
        item.id.toLowerCase().includes(normalizedSearch) ||
        item.name.toLowerCase().includes(normalizedSearch) ||
        item.description.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [searchValue]);
  const hasSearchValue = searchValue.trim().length > 0;
  const hasVisibleItems = visibleItems.length > 0;

  return (
    <section className="space-y-4 md:space-y-6">
      <CategoryHeader
        title={bakeryCategoryDetails.title}
        description={bakeryCategoryDetails.description}
      />

      <CategorySearchToolbar
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {!hasVisibleItems && hasSearchValue ? (
        <CategoriesEmptyState searchValue={searchValue} />
      ) : viewMode === "table" ? (
        <CategoryTable items={visibleItems} />
      ) : (
        <SubCategoryCardGrid items={visibleItems} />
      )}

      {hasVisibleItems ? (
        <div className="flex justify-center overflow-x-auto pt-2">
          <CategoriesPagination currentPage={1} pages={categoryPagination} />
        </div>
      ) : null}
    </section>
  );
}

export default Categories;
