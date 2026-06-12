"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AddProductModal from "./add-product/add-product-modal";
import { CategoryHeader } from "./product-header";
import { ProductSearchToolbar } from "./product-search-toolbar";
import { ViewMode } from "@/types";
import { useProductList } from "@/hooks/api/products";
import { mapProductToRecord } from "./product.mapper";
import { ProductCardGrid } from "./product-card-grid";
import { ProductTable } from "./product-table";
import { ProductEmptyState } from "./product-empty-state";
import { ProductTableShimmer } from "./product-table-shimmer";
import { ProductCardGridShimmer } from "./product-card-grid-shimmer";
import type { ProductRecord } from "@/interfaces";
import { ProductPagination } from "./product-pagination";
import { ProductDetailsModal } from "./view-product";
import { UpdateProductModal } from "./update-product";
import { DeleteProductModal } from "./delete-product";

function Products() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const shouldOpenAddProduct = searchParams.get("addProduct") === "1";
  const [isAddProductOpen, setIsAddProductOpen] =
    useState(shouldOpenAddProduct);
  const [selectedProductSlug, setSelectedProductSlug] = useState<string | null>(
    null,
  );
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [editProductSlug, setEditProductSlug] = useState<string | null>(null);
  const [deleteProduct, setDeleteProduct] = useState<{
    slug: string;
    name: string;
  } | null>(null);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("table");

  const { data, isLoading, isFetching } = useProductList(
    page,
    debouncedSearchValue,
  );

  const pagination = data?.data;
  const showShimmer = isLoading;

  const visibleItems = useMemo(
    () => pagination?.data.map(mapProductToRecord) ?? [],
    [pagination?.data],
  );
  const hasEmptyState = !showShimmer && visibleItems.length === 0;
  const changeSearchValue = (value: string) => {
    setSearchValue(value);
  };
  const changeViewMode = (mode: ViewMode) => {
    setViewMode(mode);
  };

  function handleViewProduct(item: ProductRecord) {
    setSelectedProductSlug(item.slug);
    setIsDetailsOpen(true);
  }

  function handleEditProduct(item: ProductRecord) {
    setEditProductSlug(item.slug);
  }

  function handleDeleteProduct(item: ProductRecord) {
    setDeleteProduct({ slug: item.slug, name: item.name });
  }

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

  useEffect(() => {
    if (!shouldOpenAddProduct) {
      return;
    }

    router.replace("/products", { scroll: false });
  }, [router, shouldOpenAddProduct]);

  return (
    <div className="space-y-4 md:space-y-6">
      <CategoryHeader
        title={"Products Management"}
        description={"Organize and manage your products by category"}
        onAddCategoryClick={() => setIsAddProductOpen(true)}
      />
      <ProductSearchToolbar
        searchValue={searchValue}
        onSearchChange={changeSearchValue}
        viewMode={viewMode}
        onViewModeChange={changeViewMode}
      />
      {showShimmer ? (
        viewMode === "table" ? (
          <ProductTableShimmer />
        ) : (
          <ProductCardGridShimmer />
        )
      ) : hasEmptyState ? (
        <ProductEmptyState searchValue={searchValue} />
      ) : viewMode === "table" ? (
        <div className="space-y-4">
          <ProductTable
            items={visibleItems}
            onViewDetails={handleViewProduct}
            onEditDetails={handleEditProduct}
            onDeleteDetails={handleDeleteProduct}
          />

          <div className="flex flex-col items-center justify-center gap-3 text-center">
            <ProductPagination
              currentPage={pagination?.current_page ?? page}
              lastPage={pagination?.last_page ?? 1}
              onPageChange={handlePageChange}
            />
            <p className="text-sm font-medium text-muted-text">
              Showing {pagination?.from ?? 0}-{pagination?.to ?? 0} of{" "}
              {pagination?.total ?? 0} products
              {isFetching ? " ..." : ""}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <ProductCardGrid
            items={visibleItems}
            onViewDetails={handleViewProduct}
            onEditDetails={handleEditProduct}
            onDeleteDetails={handleDeleteProduct}
          />

          <div className="flex flex-col items-center justify-center gap-3 text-center">
            <ProductPagination
              currentPage={pagination?.current_page ?? page}
              lastPage={pagination?.last_page ?? 1}
              onPageChange={handlePageChange}
            />
            <p className="text-sm font-medium text-muted-text">
              Showing {pagination?.from ?? 0}-{pagination?.to ?? 0} of{" "}
              {pagination?.total ?? 0} products
              {isFetching ? " ..." : ""}
            </p>
          </div>
        </div>
      )}
      <AddProductModal
        open={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
        onSubmit={() => setIsAddProductOpen(false)}
      />
      {editProductSlug ? (
        <UpdateProductModal
          open={!!editProductSlug}
          slug={editProductSlug}
          onClose={() => setEditProductSlug(null)}
          onSubmit={() => setEditProductSlug(null)}
        />
      ) : null}
      <DeleteProductModal
        open={!!deleteProduct}
        slug={deleteProduct?.slug ?? null}
        name={deleteProduct?.name ?? ""}
        onClose={() => setDeleteProduct(null)}
        onDeleted={() => setDeleteProduct(null)}
      />
      <ProductDetailsModal
        slug={selectedProductSlug}
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false);
          setSelectedProductSlug(null);
        }}
      />
    </div>
  );
}

export default Products;
