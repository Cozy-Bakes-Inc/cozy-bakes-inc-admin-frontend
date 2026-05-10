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
import { ProductRecord } from "@/interfaces";
import { ProductShowMoreButton } from "./product-show-more-button";

function Products() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const shouldOpenAddProduct = searchParams.get("addProduct") === "1";
  const [isAddProductOpen, setIsAddProductOpen] =
    useState(shouldOpenAddProduct);
  const [searchValue, setSearchValue] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("table");

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useProductList(searchValue);

  const visibleItems = useMemo(
    () =>
      data?.pages
        ?.flatMap((page) => page?.data?.data ?? [])
        .map(mapProductToRecord) ?? [],
    [data],
  );
  console.log(data);
  const hasEmptyState = !isLoading && visibleItems.length === 0;
  const changeSearchValue = (value: string) => {
    setSearchValue(value);
  };
  const changeViewMode = (mode: ViewMode) => {
    setViewMode(mode);
  };

  function handleViewProduct(item: ProductRecord) {
    console.log("view product", item);
  }

  function handleEditProduct(item: ProductRecord) {
    console.log("edit product", item);
  }

  function handleDeleteProduct(item: ProductRecord) {
    console.log("delete product", item);
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
      {isLoading ? (
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
      {!isLoading && !hasEmptyState && hasNextPage ? (
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
    </div>
  );
}

export default Products;
