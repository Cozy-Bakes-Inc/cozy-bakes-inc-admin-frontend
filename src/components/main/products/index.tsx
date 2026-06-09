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
import { ProductShowMoreButton } from "./product-show-more-button";
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
  const [deleteProduct, setDeleteProduct] = useState<{ slug: string; name: string } | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("table");

  const { data, isLoading, isFetching, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useProductList(searchValue);

  const showShimmer = isLoading || (isFetching && !isFetchingNextPage);

  const visibleItems = useMemo(
    () =>
      data?.pages
        ?.flatMap((page) => page?.data?.data ?? [])
        .map(mapProductToRecord) ?? [],
    [data],
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
        <ProductTable
          items={visibleItems}
          onViewDetails={handleViewProduct}
          onEditDetails={handleEditProduct}
          onDeleteDetails={handleDeleteProduct}
        />
      ) : (
        <ProductCardGrid
          items={visibleItems}
          onViewDetails={handleViewProduct}
          onEditDetails={handleEditProduct}
          onDeleteDetails={handleDeleteProduct}
        />
      )}
      {!showShimmer && !hasEmptyState && hasNextPage ? (
        <ProductShowMoreButton
          isFetchingNextPage={isFetchingNextPage}
          onClick={() => fetchNextPage()}
        />
      ) : null}
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
