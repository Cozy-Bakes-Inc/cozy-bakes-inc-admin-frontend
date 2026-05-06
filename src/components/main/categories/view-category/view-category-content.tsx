import Image from "next/image";
import type { SubCategoryDetailsItem } from "@/interfaces/main/categories";
import { ViewCategoryField } from "./view-category-field";

interface ViewCategoryContentProps {
  category: SubCategoryDetailsItem;
}

export function ViewCategoryContent({ category }: ViewCategoryContentProps) {
  return (
    <div className="px-7 py-3 pb-6">
      <div className="space-y-5">
        <div className="overflow-hidden rounded-[12px] w-fit">
          <Image
            src={category.image ?? "/images/logo.svg"}
            alt={`${category.title} cover`}
            width={125}
            height={125}
            className="size-[125px] object-cover"
            unoptimized
          />
        </div>
        <ViewCategoryField label="Title" value={category.title} />
        <ViewCategoryField
          label="Description"
          value={category.description}
          multiline
        />
      </div>
    </div>
  );
}
