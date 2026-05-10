"use client";

import { useMemo, useState } from "react";
import { useSubCategoriesList } from "@/hooks/api";
import type {
  SubCategoryRecord,
  SubCategoryListItem,
} from "@/interfaces/main/categories";
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
import { ViewMode } from "@/types";

function mapSubCategoryToRecord(item: SubCategoryListItem): SubCategoryRecord {
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
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<
    string | null
  >(null);
  const [selectedUpdateCategorySlug, setSelectedUpdateCategorySlug] = useState<
    string | null
  >(null);
  const [selectedDeleteCategory, setSelectedDeleteCategory] =
    useState<SubCategoryRecord | null>(null);
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

  function handleViewCategory(item: SubCategoryRecord) {
    setSelectedCategorySlug(item.slug);
  }

  function handleEditCategory(item: SubCategoryRecord) {
    setSelectedUpdateCategorySlug(item.slug);
  }

  function handleDeleteCategory(item: SubCategoryRecord) {
    setSelectedDeleteCategory(item);
  }

  const changeSearchValue = (value: string) => {
    setSearchValue(value);
  };
  const changeViewMode = (mode: ViewMode) => {
    setViewMode(mode);
  };
  return (
    <section className="space-y-4 md:space-y-6">
      <CategoryHeader
        title={"Categories Management"}
        description={"Organize your products into Categories"}
        onAddCategoryClick={() => setIsAddCategoryOpen(true)}
      />

      <CategorySearchToolbar
        searchValue={searchValue}
        onSearchChange={changeSearchValue}
        viewMode={viewMode}
        onViewModeChange={changeViewMode}
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
