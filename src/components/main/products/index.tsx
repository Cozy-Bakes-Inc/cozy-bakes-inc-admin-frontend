"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import AddProductModal from "./add-product/add-product-modal";

function Products() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const shouldOpenAddProduct = searchParams.get("addProduct") === "1";
  const [isAddProductOpen, setIsAddProductOpen] =
    useState(shouldOpenAddProduct);

  useEffect(() => {
    if (!shouldOpenAddProduct) {
      return;
    }

    router.replace("/products", { scroll: false });
  }, [router, shouldOpenAddProduct]);

  return (
    <div>
      <Button
        type="button"
        onClick={() => setIsAddProductOpen(true)}
        className="h-12 rounded-[10px] bg-primary px-6 text-base font-medium text-white hover:bg-primary/90"
      >
        Add Product
      </Button>

      <AddProductModal
        open={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
        onSubmit={() => setIsAddProductOpen(false)}
      />
    </div>
  );
}

export default Products;
