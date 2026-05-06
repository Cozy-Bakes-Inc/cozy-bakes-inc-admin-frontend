import Image from "next/image";
import Link from "next/link";
import { Eye, PencilLine, Trash2 } from "lucide-react";
import type { CategoryTableProps } from "@/interfaces/main/categories";
import { CategoryActionButton } from "./category-action-button";

export function CategoryTable({
  items,
  onViewDetails,
  onEditDetails,
  onDeleteDetails,
}: CategoryTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/10 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0">
          <thead>
            <tr className="bg-bg-creamy">
              <th className="px-4 py-5 text-left text-base font-semibold text-dark md:px-5">
                Categories ID
              </th>
              <th className="px-4 py-5 text-left text-base font-semibold text-dark md:px-5">
                Cover
              </th>
              <th className="px-4 py-5 text-left text-base font-semibold text-dark md:px-5">
                Name
              </th>
              <th className="px-4 py-5 text-left text-base font-semibold text-dark md:px-5">
                Description
              </th>
              <th className="px-4 py-5 text-center text-base font-semibold text-dark md:px-5">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => {
              return (
                <tr key={item.id} className="bg-[rgba(250,248,243,0.08)]">
                  <td className="border-b border-border/15 px-4 py-4 align-middle text-base font-medium uppercase text-dark md:px-5">
                    <Link href="/categories" className="hover:text-primary">
                      {item.id}
                    </Link>
                  </td>
                  <td className="border-b border-border/15 px-4 py-4 align-middle md:px-5">
                    <Link href="/categories" className="block w-fit">
                      <Image
                        src={item.coverImage}
                        alt={`${item.name} cover`}
                        width={50}
                        height={50}
                        className="size-[50px] rounded-lg object-cover"
                        unoptimized
                      />
                    </Link>
                  </td>
                  <td className="border-b border-border/15 px-4 py-4 align-middle text-base font-semibold text-dark md:px-5">
                    <Link href="/categories" className="hover:text-primary">
                      {item.name}
                    </Link>
                  </td>
                  <td className="border-b border-border/15 px-4 py-4 align-middle text-xs font-medium leading-4 text-muted-text md:max-w-[340px] md:px-5">
                    {item.description}
                  </td>
                  <td className="border-b border-border/15 px-4 py-4 align-middle md:px-5">
                    <div className="flex items-center justify-center gap-2">
                      <CategoryActionButton
                        label={`Delete ${item.name}`}
                        tone="danger"
                        icon={<Trash2 className="size-4" strokeWidth={2.1} />}
                        onClick={() => onDeleteDetails(item)}
                      />
                      <CategoryActionButton
                        label={`Edit ${item.name}`}
                        tone="info"
                        icon={
                          <PencilLine className="size-4" strokeWidth={2.1} />
                        }
                        onClick={() => onEditDetails(item)}
                      />
                      <CategoryActionButton
                        label={`View ${item.name}`}
                        tone="primary"
                        icon={<Eye className="size-4" strokeWidth={2.1} />}
                        onClick={() => onViewDetails(item)}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
