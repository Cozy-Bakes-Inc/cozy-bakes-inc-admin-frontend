"use client";

import { useEffect, useMemo, useState } from "react";
import { useSubCategoriesList } from "@/hooks/api";
import type {
  SubCategoryRecord,
  SubCategoryListItem,
} from "@/interfaces/main/categories";
import { CategoriesEmptyState } from "./categories-empty-state";
import { CategoriesCardGridShimmer } from "./categories-card-grid-shimmer";
import { CategoriesPagination } from "./categories-pagination";
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
    coverImage: item.image ?? "/images/logo.png",
  };
}

function Categories() {
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
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
  const { data, isLoading, isFetching } = useSubCategoriesList(
    page,
    debouncedSearchValue,
  );

  const pagination = data?.data;
  const visibleItems = useMemo(
    () => pagination?.data.map(mapSubCategoryToRecord) ?? [],
    [pagination?.data],
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

  function handlePageChange(nextPage: number) {
    const lastPage = pagination?.last_page ?? 1;
    setPage(Math.min(Math.max(nextPage, 1), lastPage));
  }

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearchValue(searchValue.trim());
      setPage(1);
    }, 500);

    return () => window.clearTimeout(timeoutId);
  }, [searchValue]);

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
        <div className="space-y-4">
          <CategoryTable
            items={visibleItems}
            onViewDetails={handleViewCategory}
            onEditDetails={handleEditCategory}
            onDeleteDetails={handleDeleteCategory}
          />

          <div className="flex flex-col items-center justify-center gap-3 text-center">
            <CategoriesPagination
              currentPage={pagination?.current_page ?? page}
              lastPage={pagination?.last_page ?? 1}
              onPageChange={handlePageChange}
            />
            <p className="text-sm font-medium text-muted-text">
              Showing {pagination?.from ?? 0}-{pagination?.to ?? 0} of{" "}
              {pagination?.total ?? 0} categories
              {isFetching ? " ..." : ""}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <SubCategoryCardGrid
            items={visibleItems}
            onViewDetails={handleViewCategory}
            onEditDetails={handleEditCategory}
            onDeleteDetails={handleDeleteCategory}
          />

          <div className="flex flex-col items-center justify-center gap-3 text-center">
            <CategoriesPagination
              currentPage={pagination?.current_page ?? page}
              lastPage={pagination?.last_page ?? 1}
              onPageChange={handlePageChange}
            />
            <p className="text-sm font-medium text-muted-text">
              Showing {pagination?.from ?? 0}-{pagination?.to ?? 0} of{" "}
              {pagination?.total ?? 0} categories
              {isFetching ? " ..." : ""}
            </p>
          </div>
        </div>
      )}

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
