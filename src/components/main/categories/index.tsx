"use client";

import { useMemo, useState } from "react";
import { bakeryCategoryDetails } from "@/data/main/categories";
import { useSubCategoriesList } from "@/hooks/api";
import type {
  BakerySubCategoryRecord,
  SubCategoryListItem,
} from "@/interfaces/main/categories";
import type { CategoryViewMode } from "@/types/main/categories";
import { CategoriesEmptyState } from "./categories-empty-state";
import { CategoriesCardGridShimmer } from "./categories-card-grid-shimmer";
import { CategoriesShowMoreButton } from "./categories-show-more-button";
import { CategoriesTableShimmer } from "./categories-table-shimmer";
import { CategoryHeader } from "./category-header";
import { CategorySearchToolbar } from "./category-search-toolbar";
import { CategoryTable } from "./category-table";
import { SubCategoryCardGrid } from "./subcategory-card-grid";
import AddCategory from "./add-category";

function mapSubCategoryToRecord(
  item: SubCategoryListItem,
): BakerySubCategoryRecord {
  return {
    id: `#CATE-${item.id}`,
    slug: item.slug,
    name: item.title,
    description: item.description,
    coverImage: item.image ?? "/images/logo.svg",
  };
}

function Categories() {
  const [searchValue, setSearchValue] = useState("");
  const [viewMode, setViewMode] = useState<CategoryViewMode>("table");
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useSubCategoriesList(searchValue);

  const visibleItems = useMemo(
    () =>
      data?.pages
        ?.flatMap((page) => page?.data?.data ?? [])
        .map(mapSubCategoryToRecord) ?? [],
    [data],
  );
  const hasEmptyState = !isLoading && visibleItems.length === 0;

  return (
    <section className="space-y-4 md:space-y-6">
      <CategoryHeader
        title={bakeryCategoryDetails.title}
        description={bakeryCategoryDetails.description}
        onAddCategoryClick={() => setIsAddCategoryOpen(true)}
      />

      <CategorySearchToolbar
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {isLoading ? (
        viewMode === "table" ? (
          <CategoriesTableShimmer />
        ) : (
          <CategoriesCardGridShimmer />
        )
      ) : hasEmptyState ? (
        <CategoriesEmptyState searchValue={searchValue} />
      ) : viewMode === "table" ? (
        <CategoryTable items={visibleItems} />
      ) : (
        <SubCategoryCardGrid items={visibleItems} />
      )}

      {!isLoading && !hasEmptyState && hasNextPage ? (
        <CategoriesShowMoreButton
          isFetchingNextPage={isFetchingNextPage}
          onClick={() => fetchNextPage()}
        />
      ) : null}

      <AddCategory
        open={isAddCategoryOpen}
        onClose={() => setIsAddCategoryOpen(false)}
        onSubmit={async () => {
          setIsAddCategoryOpen(false);
        }}
      />
    </section>
  );
}

export default Categories;
