import type { Menu } from "@/types/main/menu";
import type { MenuRecord } from "@/interfaces/main/menu";

export function mapMenuToRecord(item: Menu): MenuRecord {
  return {
    slug: item.slug,
    title: item.title,
    description: item.description,
    pdfFileLink: item.pdf_file_link,
    isActive: item.is_active as 0 | 1,
    createdAt: item.created_at,
  };
}
