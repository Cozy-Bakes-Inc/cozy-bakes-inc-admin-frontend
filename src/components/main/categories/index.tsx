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
import DeleteCategory from "./delete-category";
import UpdateCategory from "./update-category";
import ViewCategory from "./view-category";

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
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<
    string | null
  >(null);
  const [selectedUpdateCategorySlug, setSelectedUpdateCategorySlug] = useState<
    string | null
  >(null);
  const [selectedDeleteCategory, setSelectedDeleteCategory] =
    useState<BakerySubCategoryRecord | null>(null);
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
  const isViewCategoryOpen = Boolean(selectedCategorySlug);
  const isUpdateCategoryOpen = Boolean(selectedUpdateCategorySlug);
  const isDeleteCategoryOpen = Boolean(selectedDeleteCategory);

  function handleViewCategory(item: BakerySubCategoryRecord) {
    setSelectedCategorySlug(item.slug);
  }

  function handleEditCategory(item: BakerySubCategoryRecord) {
    setSelectedUpdateCategorySlug(item.slug);
  }

  function handleDeleteCategory(item: BakerySubCategoryRecord) {
    setSelectedDeleteCategory(item);
  }

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
        <CategoryTable
          items={visibleItems}
          onViewDetails={handleViewCategory}
          onEditDetails={handleEditCategory}
          onDeleteDetails={handleDeleteCategory}
        />
      ) : (
        <SubCategoryCardGrid
          items={visibleItems}
          onViewDetails={handleViewCategory}
          onEditDetails={handleEditCategory}
          onDeleteDetails={handleDeleteCategory}
        />
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

      <ViewCategory
        open={isViewCategoryOpen}
        slug={selectedCategorySlug}
        onClose={() => setSelectedCategorySlug(null)}
      />

      <UpdateCategory
        open={isUpdateCategoryOpen}
        slug={selectedUpdateCategorySlug}
        onClose={() => setSelectedUpdateCategorySlug(null)}
        onSubmit={async () => {
          setSelectedUpdateCategorySlug(null);
        }}
      />

      <DeleteCategory
        open={isDeleteCategoryOpen}
        slug={selectedDeleteCategory?.slug ?? null}
        name={selectedDeleteCategory?.name ?? ""}
        onClose={() => setSelectedDeleteCategory(null)}
        onDeleted={async () => {
          setSelectedDeleteCategory(null);
        }}
      />
    </section>
  );
}

export default Categories;
