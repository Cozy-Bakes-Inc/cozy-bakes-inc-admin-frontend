import type { SingleProduct } from "@/interfaces/main/products";

interface ProductBasicInfoProps {
  product: SingleProduct;
}

const valueTextClassName =
  "min-w-0 max-w-full break-words whitespace-pre-wrap [overflow-wrap:anywhere]";

function ProductReadOnlyField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0 max-w-full">
      <p className="mb-2 block text-[16px] font-medium leading-6 text-dark">
        {label}
      </p>
      <div
        className={`flex min-h-[68px] items-center overflow-hidden rounded-xl border border-border/20 bg-white px-5 py-4 text-base font-semibold leading-relaxed text-dark ${valueTextClassName}`}
      >
        {value}
      </div>
    </div>
  );
}

function ProductReadOnlyTextArea({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-h-0 min-w-0 max-w-full flex-1 flex-col">
      <p className="mb-2 block text-[16px] font-medium leading-6 text-dark">
        {label}
      </p>
      <div
        className={`min-h-[160px] overflow-y-auto rounded-xl border border-border/20 bg-white px-5 py-4 text-base font-medium leading-relaxed text-dark lg:min-h-0 lg:flex-1 ${valueTextClassName}`}
      >
        {value}
      </div>
    </div>
  );
}

export function ProductBasicInfo({ product }: ProductBasicInfoProps) {
  const subCategoryTitle = product.sub_category?.title ?? "No sub category";

  return (
    <section className="flex min-h-0 min-w-0 max-w-full flex-col gap-6 lg:h-full">
      <div className="grid min-w-0 shrink-0 gap-5 md:grid-cols-2">
        <ProductReadOnlyField label="Product Name" value={product.title} />
        <ProductReadOnlyField label="Category" value={subCategoryTitle} />
      </div>

      <ProductReadOnlyTextArea
        label="Description"
        value={product.description || "No description available"}
      />
    </section>
  );
}
