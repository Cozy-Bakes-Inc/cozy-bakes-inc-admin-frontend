import type {
  ProductListItem,
  ProductRecord,
} from "@/interfaces/main/products";

export function mapProductToRecord(item: ProductListItem): ProductRecord {
  return {
    slug: item.slug,
    name: item.title,
    description: item.description,
    ingredients: item.description_ingredient,
    status: item.status,
    subCategoryName: item.sub_category?.title ?? "—",
    categoryName: item.sub_category?.category?.title ?? "—",
    coverImage: item.images?.[0] ?? "/images/logo.png",
    flavors: item.flavors ?? [],
    prices: item.prices ?? {},
    createdAt: item.created_at,
  };
}
