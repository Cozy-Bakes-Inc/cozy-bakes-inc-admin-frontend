"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import AddProductModal from "./add-product-modal";

function AddProduct() {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  return (
    <>
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
    </>
  );
}

export default AddProduct;
