import { Suspense } from "react";
import Products from "@/components/main/products";
import SystemLoader from "@/components/ui/system-loader";

function ProductsPage() {
  return (
    <Suspense fallback={<SystemLoader />}>
      <Products />
    </Suspense>
  );
}

export default ProductsPage;
