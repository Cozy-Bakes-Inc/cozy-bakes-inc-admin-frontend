"use client";

import Modal from "@/components/ui/modal";
import { useProduct } from "@/hooks/api/products";
import { ProductBasicInfo } from "./product-basic-info";
import { ProductDetailsHeader } from "./product-details-header";
import { ProductDetailsImage } from "./product-details-image";
import { ProductDetailsShimmer } from "./product-details-shimmer";
import { ProductFlavorsSection } from "./product-flavors-section";
import { ProductPricesSection } from "./product-prices-section";
import { ProductTextSection } from "./product-text-section";

export interface ProductDetailsModalProps {
  slug: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductDetailsModal({
  slug,
  isOpen,
  onClose,
}: ProductDetailsModalProps) {
  const querySlug = isOpen ? (slug ?? "") : "";
  const { data, isLoading } = useProduct(querySlug);
  const product = querySlug ? data?.data : undefined;

  if (!isOpen) {
    return null;
  }

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title={<ProductDetailsHeader />}
      contentClassName="w-[calc(100vw-1rem)] max-w-[calc(100vw-1rem)] gap-0 overflow-hidden rounded-[16px] border border-border/10 bg-background p-0 shadow-[0_24px_80px_rgba(61,44,30,0.18)] sm:w-full sm:max-w-[640px] md:max-w-[1080px] [&_[data-slot=dialog-header]]:border-b [&_[data-slot=dialog-header]]:border-black/6 [&_[data-slot=dialog-header]]:px-4 [&_[data-slot=dialog-header]]:pb-4 [&_[data-slot=dialog-header]]:pt-5 sm:[&_[data-slot=dialog-header]]:px-6 md:[&_[data-slot=dialog-header]]:px-8"
      titleClassName="pr-12 text-[26px] font-bold tracking-[-0.04em] text-dark md:text-[32px]"
    >
      {isLoading ? (
        <ProductDetailsShimmer />
      ) : product ? (
        <div className="min-w-0 max-w-full space-y-5 overflow-hidden px-4 py-5 sm:px-6 md:space-y-6 md:px-8 md:py-6">
          <div className="grid min-w-0 max-w-full grid-cols-1 items-start gap-6 lg:h-[400px] lg:grid-cols-[420px_minmax(0,1fr)] lg:items-stretch">
            <ProductDetailsImage
              image={product.images[0]}
              title={product.title}
              className="lg:h-full"
            />
            <ProductBasicInfo product={product} />
          </div>

          <ProductPricesSection prices={product.prices} />
          <ProductFlavorsSection flavors={product.flavors} />
          <ProductTextSection
            title="Ingredients"
            value={product.description_ingredient}
            fallback="No ingredients available"
          />
          <ProductTextSection
            title="Allergens"
            value={product.description_allergens}
            fallback="No allergens available"
          />
        </div>
      ) : (
        <div className="px-4 py-10 text-center sm:px-6 md:px-8">
          <p className="text-base font-medium text-muted-text">
            Product details not available.
          </p>
        </div>
      )}
    </Modal>
  );
}
