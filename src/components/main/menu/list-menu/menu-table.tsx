import { Eye, PencilLine, Trash2 } from "lucide-react";
import { CategoryActionButton } from "@/components/main/categories/category-action-button";
import type { MenuRecord } from "@/interfaces/main/menu";
import { MenuStatusBadge } from "./menu-status-badge";

interface MenuTableProps {
  items: MenuRecord[];
  onViewDetails: (item: MenuRecord) => void;
  onEditDetails: (item: MenuRecord) => void;
  onDeleteDetails: (item: MenuRecord) => void;
}

export function MenuTable({
  items,
  onViewDetails,
  onEditDetails,
  onDeleteDetails,
}: MenuTableProps) {
  console.log(items);
  return (
    <div className="overflow-hidden rounded-2xl border border-border/10 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0">
          <thead>
            <tr className="bg-bg-creamy">
              {["Title", "Description", "PDF", "Status", "Actions"].map((h) => (
                <th
                  key={h}
                  className={`px-5 py-5 text-left text-base font-semibold text-dark ${h === "Actions" ? "text-center" : ""}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item.slug} className="bg-[rgba(250,248,243,0.08)]">
                <td className="border-b border-border/15 px-5 py-4 align-middle text-base font-semibold text-dark">
                  {item.title}
                </td>

                <td className="max-w-[260px] border-b border-border/15 px-5 py-4 align-middle text-sm font-medium text-muted-text">
                  <p className="line-clamp-2">{item.description}</p>
                </td>

                <td className="border-b border-border/15 px-5 py-4 align-middle">
                  {item.pdfFileLink ? (
                    <a
                      href={item.pdfFileLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-primary underline-offset-2 hover:underline"
                    >
                      View PDF
                    </a>
                  ) : (
                    <span className="text-sm text-muted-text">No PDF</span>
                  )}
                </td>

                <td className="border-b border-border/15 px-5 py-4 align-middle">
                  <MenuStatusBadge isActive={item.isActive} />
                </td>

                <td className="border-b border-border/15 px-5 py-4 align-middle">
                  <div className="flex items-center justify-center gap-2">
                    <CategoryActionButton
                      label={`Delete ${item.title}`}
                      tone="danger"
                      icon={<Trash2 className="size-4" strokeWidth={2.1} />}
                      onClick={() => onDeleteDetails(item)}
                    />
                    <CategoryActionButton
                      label={`Edit ${item.title}`}
                      tone="info"
                      icon={<PencilLine className="size-4" strokeWidth={2.1} />}
                      onClick={() => onEditDetails(item)}
                    />
                    <CategoryActionButton
                      label={`View ${item.title}`}
                      tone="primary"
                      icon={<Eye className="size-4" strokeWidth={2.1} />}
                      onClick={() => onViewDetails(item)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
