import Image from "next/image";
import Link from "next/link";
import { Eye, PencilLine, Trash2 } from "lucide-react";
import type { SubCategoryCardGridProps } from "@/interfaces/main/categories";
import { CategoryActionButton } from "./category-action-button";

export function SubCategoryCardGrid({
  items,
  onViewDetails,
  onEditDetails,
  onDeleteDetails,
}: SubCategoryCardGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
      {items.map((item) => {
        return (
          <article
            key={item.id}
            className="rounded-[20px] border border-border/10 bg-white p-4 shadow-[0_18px_35px_rgba(61,44,30,0.05)]"
          >
            <Link href="/categories" className="block">
              <div className="mb-4 flex items-start gap-4">
                <Image
                  src={item.coverImage}
                  alt={`${item.name} cover`}
                  width={78}
                  height={78}
                  className="size-[78px] rounded-2xl object-cover"
                  unoptimized
                />

                <div className="min-w-0 space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                    {item.id}
                  </p>
                  <h2 className="text-lg font-semibold text-dark hover:text-primary">
                    {item.name}
                  </h2>
                </div>
              </div>

              <p className="min-h-12 text-sm leading-6 text-muted-text">
                {item.description}
              </p>
            </Link>

            <div className="mt-5 flex items-center justify-end gap-2">
              <CategoryActionButton
                label={`Delete ${item.name}`}
                tone="danger"
                icon={<Trash2 className="size-4" strokeWidth={2.1} />}
                onClick={() => onDeleteDetails(item)}
              />
              <CategoryActionButton
                label={`Edit ${item.name}`}
                tone="info"
                icon={<PencilLine className="size-4" strokeWidth={2.1} />}
                onClick={() => onEditDetails(item)}
              />
              <CategoryActionButton
                label={`View ${item.name}`}
                tone="primary"
                icon={<Eye className="size-4" strokeWidth={2.1} />}
                onClick={() => onViewDetails(item)}
              />
            </div>
          </article>
        );
      })}
    </div>
  );
}
