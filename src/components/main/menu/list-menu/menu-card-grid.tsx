import { Eye, FileText, PencilLine, Trash2 } from "lucide-react";
import { CategoryActionButton } from "@/components/main/categories/category-action-button";
import type { MenuRecord } from "@/interfaces/main/menu";
import { MenuStatusBadge } from "./menu-status-badge";

interface MenuCardGridProps {
  items: MenuRecord[];
  onViewDetails: (item: MenuRecord) => void;
  onEditDetails: (item: MenuRecord) => void;
  onDeleteDetails: (item: MenuRecord) => void;
}

export function MenuCardGrid({
  items,
  onViewDetails,
  onEditDetails,
  onDeleteDetails,
}: MenuCardGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
      {items.map((item) => (
        <article
          key={item.slug}
          className="rounded-[20px] border border-border/10 bg-white p-5 shadow-[0_18px_35px_rgba(61,44,30,0.05)]"
        >
          <div className="mb-3 flex items-start justify-between gap-3">
            <h2 className="text-lg font-semibold text-dark">{item.title}</h2>
            <MenuStatusBadge isActive={item.isActive} />
          </div>

          <p className="mb-4 line-clamp-2 min-h-10 text-sm leading-5 text-muted-text">
            {item.description}
          </p>

          {item.pdfFileLink ? (
            <a
              href={item.pdfFileLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-2 hover:underline"
            >
              <FileText className="size-4" strokeWidth={2.1} />
              View PDF
            </a>
          ) : (
            <p className="mb-4 text-sm text-muted-text">No PDF attached</p>
          )}

          <div className="flex items-center justify-end gap-2">
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
        </article>
      ))}
    </div>
  );
}
